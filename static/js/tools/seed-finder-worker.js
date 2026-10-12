/* ChunkScope seed-finder-worker.js
 * Reverse seed search, two modes:
 *  - structure: find seeds where the chosen structure's attempt lands within
 *    `radius` chunks of world spawn (deterministic via core-structures).
 *  - biome: find seeds where the sampled approximate climate near spawn matches
 *    the target biome window (experimental model — see core-biome-noise.js).
 */
importScripts('/js/tools/core-java-random.js');
importScripts('/js/tools/core-structures.js');
importScripts('/js/tools/core-biome-noise.js');

function structureScan(p) {
  var cfg = MCStructures.CONFIG[p.structureId] || MCStructures.CONFIG.village;
  var radius = p.radius | 0;
  var regRange = Math.ceil(radius / cfg.spacing) + 1;
  var hits = [];
  var k, rx, rz, seed, pos, d, best, bestPos;
  for (k = 0; k < p.count; k++) {
    seed = BigInt(p.startSeed) + BigInt(k);
    best = Infinity; bestPos = null;
    for (rx = -regRange; rx <= regRange; rx++) {
      for (rz = -regRange; rz <= regRange; rz++) {
        pos = MCStructures.structureChunkInRegion(seed, rx, rz, cfg);
        d = Math.hypot(pos.x, pos.z);
        if (d < best) { best = d; bestPos = pos; }
      }
    }
    if (bestPos && best < radius) {
      hits.push({ seed: String(seed), dist: best, cx: bestPos.x, cz: bestPos.z, bx: bestPos.x * 16 + 8, bz: bestPos.z * 16 + 8 });
    }
    if (k % 50 === 0) self.postMessage({ id: p.id, type: 'progress', done: k + 1, total: p.count });
  }
  return hits;
}

/* Sample a 5x5-chunk area around spawn (block centers), count how many
   sample points match the target biome's climate window. */
function biomeScan(p) {
  var biome = p.biome || 'cherry_grove';
  var minHits = p.minHits !== undefined ? p.minHits : 9; /* of 25 */
  var hits = [];
  var k, cx, cz, hit, bx, bz, cl;
  for (k = 0; k < p.count; k++) {
    var seed = BigInt(p.startSeed) + BigInt(k);
    hit = 0;
    for (cx = -2; cx <= 2; cx++) {
      for (cz = -2; cz <= 2; cz++) {
        bx = cx * 16 + 8; bz = cz * 16 + 8;
        cl = BiomeClim.sampleClimate(seed, bx, bz);
        if (BiomeClim.biomeMatch(biome, cl)) hit++;
      }
    }
    if (hit >= minHits) {
      hits.push({ seed: String(seed), match: hit, samples: 25 });
    }
    if (k % 50 === 0) self.postMessage({ id: p.id, type: 'progress', done: k + 1, total: p.count });
  }
  return hits;
}

self.onmessage = function (ev) {
  var m = ev.data;
  if (!m || m.type !== 'compute') return;
  var p = m.payload || {};
  p.id = m.id;
  var hits, scanned = p.count | 0, label;
  try {
    if (p.mode === 'biome') {
      label = (BiomeClim.BIOMES.filter(function (b) { return b.id === p.biome; })[0] || {}).name || p.biome;
      hits = biomeScan(p);
      label = label + ' (approx climate, Beta)';
    } else {
      label = (MCStructures.CONFIG[p.structureId] || {}).name || p.structureId;
      hits = structureScan(p);
    }
    self.postMessage({ id: m.id, type: 'result', data: { hits: hits, scanned: scanned, label: label, mode: p.mode || 'structure' } });
  } catch (err) {
    self.postMessage({ id: m.id, type: 'error', message: String(err && err.message) });
  }
};
