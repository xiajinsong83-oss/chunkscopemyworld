/* ChunkScope core-java-random.js
 * Shared algorithm module — works on the main thread AND inside a Web Worker.
 * Game-fact implementations: Java Random (48-bit LCG), Java String.hashCode seed
 * parsing, slime chunk predicate. Facts from community-verified MC mechanics.
 */
(function (root) {
  'use strict';
  var MASK48 = 0xFFFFFFFFFFFFn;
  var MASK64 = 0xFFFFFFFFFFFFFFFFn;
  var MULT = 0x5DEECE66Dn;
  var ADD = 0xBn;

  /* Java String.hashCode(): h = 31*h + charCode (32-bit signed overflow).
   * Minecraft uses this for text seeds in Java AND Bedrock. */
  function javaHashCode(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = (31 * h + str.charCodeAt(i)) | 0;
    }
    return h;
  }

  /* Parse a seed the way Minecraft does:
   * - pure number inside signed 64-bit range  -> exact 64-bit value
   * - anything else                           -> String.hashCode()
   * Returns a BigInt. */
  function parseSeed(input) {
    var s = String(input).trim();
    if (/^[+-]?\d+$/.test(s)) {
      var v = BigInt(s);
      if (v >= -9223372036854775808n && v <= 9223372036854775807n) {
        return v;
      }
    }
    return BigInt(javaHashCode(s));
  }

  /* Java java.util.Random, single nextInt(bound) draw from a 48-bit state.
   * bound must be a positive Number (safe < 2^31). Returns the int result. */
  function javaNextInt(bound, state) {
    var s = state;
    var bits, val;
    do {
      s = (s * MULT + ADD) & MASK48;
      bits = Number(s >> 17n);          // next(31)
      val = bits % bound;
    } while ((bits - val + (bound - 1)) < 0);   // rejection sampling (non-power-of-2 bound)
    return val;
  }

  /* Slime chunk predicate: 1 in 10 chunks, fixed by seed.
   * new Random(worldSeed + chunkX*341873128712 + chunkZ*132897987541).nextInt(10) == 0
   * Java and Bedrock 1.18+ share the same formula. */
  function isSlimeChunk(worldSeed, chunkX, chunkZ) {
    var chunkSeed = (worldSeed + BigInt(chunkX) * 341873128712n + BigInt(chunkZ) * 132897987541n) & MASK64;
    var state = (chunkSeed ^ MULT) & MASK48;   // java.util.Random(seed) initialisation
    return javaNextInt(10, state) === 0;
  }

  var api = {
    javaHashCode: javaHashCode,
    parseSeed: parseSeed,
    isSlimeChunk: isSlimeChunk
  };
  root.MCAlgo = api;
})(typeof self !== 'undefined' ? self : window);
