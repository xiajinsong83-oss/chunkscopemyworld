/* ChunkScope core-biome-noise.js
 * Approximate, deterministic climate field for seed screening.
 *
 * IMPORTANT: this is an EXPERIMENTAL approximation of Minecraft's biome
 * climate (temperature / humidity / continentalness). It does NOT reproduce
 * Mojang's real biome generator — it provides a smooth, seed-driven, fully
 * deterministic noise field used to pre-filter candidate seeds. Matches are
 * based on this model and MUST be verified in-game. Never represented as
 * exact Minecraft biomes.
 */
(function (root) {
  'use strict';

  /* --- deterministic 32-bit integer hash (splitmix32-style) --- */
  function hash2(x, z, salt) {
    var h = (x * 374761393) ^ (z * 668265263) ^ (salt * 1274126177);
    h = h | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296; /* [0,1) */
  }

  function smooth(t) { return t * t * (3 - 2 * t); }

  /* Single-octave value noise, continuous in [0,1). */
  function vnoise(x, z, salt) {
    var x0 = Math.floor(x), z0 = Math.floor(z);
    var fx = x - x0, fz = z - z0;
    var sx = smooth(fx), sz = smooth(fz);
    var a = hash2(x0, z0, salt);
    var b = hash2(x0 + 1, z0, salt);
    var c = hash2(x0, z0 + 1, salt);
    var d = hash2(x0 + 1, z0 + 1, salt);
    var top = a + (b - a) * sx;
    var bot = c + (d - c) * sx;
    return top + (bot - top) * sz; /* [0,1) */
  }

  function fbm(x, z, salt, octaves, lacunarity, gain) {
    var amp = 1, freq = 1, sum = 0, norm = 0, i;
    for (i = 0; i < octaves; i++) {
      sum += amp * vnoise(x * freq, z * freq, salt + i * 7919);
      norm += amp;
      amp *= gain;
      freq *= lacunarity;
    }
    return sum / norm; /* [0,1) */
  }

  function toSigned(v) { return v * 2 - 1; } /* -> [-1,1] */

  /* Climate at a block coordinate (bx, bz) for a numeric seed. */
  function sampleClimate(seed, bx, bz) {
    var salt = Number(seed % 1000003n); /* small stable salt from seed */
    /* temperature: 3 octaves, mid scale */
    var t = toSigned(fbm(bx / 380, bz / 380, 1000 + salt * 31, 3, 2.1, 0.5));
    /* humidity: 3 octaves */
    var h = toSigned(fbm(bx / 320, bz / 320, 2000 + salt * 47, 3, 2.2, 0.5));
    /* continentalness: low frequency -> land vs ocean bands */
    var c = toSigned(fbm(bx / 900, bz / 900, 3000 + salt * 61, 2, 2.0, 0.6));
    return { t: t, h: h, c: c };
  }

  /* Approximate climate window for a target biome. Windows were calibrated on
     a 3000-seed distribution so each biome yields a usable candidate rate
     (aiming ~1–4%); the model is still experimental and must be in-game checked. */
  function biomeMatch(biome, cl) {
    var t = cl.t, h = cl.h, c = cl.c;
    var land = c > 0.15;
    switch (biome) {
      case 'cherry_grove':
        return land && h > 0.5 && t > 0.12 && t < 0.62;
      case 'mushroom_island':
        /* coastal/island: mid continentalness, humid, mild temp */
        return h > 0.45 && t > 0.1 && t < 0.55 && c > -0.25 && c < 0.45;
      case 'desert':
        return land && h < -0.2 && t > 0.6;
      case 'snowy_plains':
        return land && t < -0.5;
      case 'jungle':
        return land && t > 0.55 && h > 0.3;
      case 'swamp':
        return land && h > 0.6 && t > -0.1 && t < 0.7;
      case 'plains':
        return land && h > 0.15 && h < 0.55 && t > 0.1 && t < 0.5;
      case 'flower_forest':
        return land && h > 0.4 && h < 0.75 && t > 0.3 && t < 0.6;
      default:
        return false;
    }
  }

  var api = {
    sampleClimate: sampleClimate,
    biomeMatch: biomeMatch,
    BIOMES: [
      { id: 'cherry_grove', name: 'Cherry Grove' },
      { id: 'mushroom_island', name: 'Mushroom Island' },
      { id: 'flower_forest', name: 'Flower Forest' },
      { id: 'jungle', name: 'Jungle' },
      { id: 'swamp', name: 'Swamp' },
      { id: 'plains', name: 'Plains' },
      { id: 'desert', name: 'Desert' },
      { id: 'snowy_plains', name: 'Snowy Plains' }
    ]
  };
  root.BiomeClim = api;
})(typeof self !== 'undefined' ? self : window);
