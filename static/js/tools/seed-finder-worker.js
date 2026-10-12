/* ChunkScope seed-finder-worker.js
 * Reverse structure search: scan candidate seeds and find those where the
 * chosen structure's attempt lands within `radius` chunks of world spawn
 * (chunk 0,0). Deterministic via core-structures; runs in a Web Worker.
 */
importScripts('/js/tools/core-java-random.js');
importScripts('/js/tools/core-structures.js');

self.onmessage = function (ev) {
  var m = ev.data;
  if (!m || m.type !== 'compute') return;
  var p = m.payload || {};
  var cfg = MCStructures.CONFIG[p.structureId] || MCStructures.CONFIG.village;
  var radius = p.radius | 0;          // chunks from spawn
  var count = p.count | 0;            // how many seeds to scan
  var start = p.startSeed === undefined ? 0 : p.startSeed;
  var regRange = Math.ceil(radius / cfg.spacing) + 1;
  var hits = [];
  var k, rx, rz, seed, pos, d, best, bestPos;
  for (k = 0; k < count; k++) {
    seed = BigInt(start) + BigInt(k);
    best = Infinity;
    bestPos = null;
    for (rx = -regRange; rx <= regRange; rx++) {
      for (rz = -regRange; rz <= regRange; rz++) {
        pos = MCStructures.structureChunkInRegion(seed, rx, rz, cfg);
        d = Math.hypot(pos.x, pos.z);
        if (d < best) { best = d; bestPos = pos; }
      }
    }
    if (bestPos && best < radius) {
      hits.push({
        seed: String(seed),
        dist: best,
        cx: bestPos.x, cz: bestPos.z,
        bx: bestPos.x * 16 + 8, bz: bestPos.z * 16 + 8
      });
    }
    if (k % 50 === 0) {
      self.postMessage({ id: m.id, type: 'progress', done: k + 1, total: count });
    }
  }
  self.postMessage({ id: m.id, type: 'result', data: { hits: hits, scanned: count, structure: cfg.name } });
};
