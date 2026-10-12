/* ChunkScope slime-chunk-worker.js
 * Web Worker: computes slime chunks for a visible chunk range.
 */
importScripts('/js/tools/core-java-random.js');

self.onmessage = function (ev) {
  var m = ev.data;
  if (!m || m.type !== 'compute') return;
  var p = m.payload || {};
  var seed = MCAlgo.parseSeed(p.seedText !== undefined ? p.seedText : '0');
  var minX = p.minX | 0, maxX = p.maxX | 0;
  var minZ = p.minZ | 0, maxZ = p.maxZ | 0;
  var total = (maxX - minX + 1) * (maxZ - minZ + 1);
  var chunks = [];
  var done = 0;
  var x, z;
  for (x = minX; x <= maxX; x++) {
    for (z = minZ; z <= maxZ; z++) {
      chunks.push({ x: x, z: z, slime: MCAlgo.isSlimeChunk(seed, x, z) });
      done++;
      if (done % 128 === 0) {
        self.postMessage({ id: m.id, type: 'progress', done: done, total: total });
      }
    }
  }
  self.postMessage({ id: m.id, type: 'result', data: { seed: String(seed), chunks: chunks } });
};
