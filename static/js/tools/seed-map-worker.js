/* ChunkScope seed-map-worker.js
 * Computes structure attempts + slime chunks for a visible chunk range.
 */
importScripts('/js/tools/core-java-random.js');
importScripts('/js/tools/core-structures.js');

self.onmessage = function (ev) {
  var m = ev.data;
  if (!m || m.type !== 'compute') return;
  var p = m.payload || {};
  var seed = MCAlgo.parseSeed(p.seedText !== undefined ? p.seedText : '0');
  var minX = p.minX | 0, maxX = p.maxX | 0;
  var minZ = p.minZ | 0, maxZ = p.maxZ | 0;
  var want = p.layers || ['structures', 'slime'];
  var out = { seed: String(seed), structures: [], slime: [] };
  var total = (maxX - minX + 1) * (maxZ - minZ + 1);
  var done = 0;
  var x, z;

  if (want.indexOf('structures') >= 0) {
    out.structures = MCStructures.structuresInRange(seed, minX, maxX, minZ, maxZ);
  }
  if (want.indexOf('slime') >= 0) {
    for (x = minX; x <= maxX; x++) {
      for (z = minZ; z <= maxZ; z++) {
        if (MCAlgo.isSlimeChunk(seed, x, z)) out.slime.push({ x: x, z: z });
        done++;
        if (done % 256 === 0) {
          self.postMessage({ id: m.id, type: 'progress', done: done, total: total });
        }
      }
    }
  }
  self.postMessage({ id: m.id, type: 'result', data: out });
};
