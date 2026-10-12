/* gen-seeds.js — scan real seeds and verify structure-near-spawn matches using
   the same algorithms as the live tools, so seed pages are fact-checkable. */
const fs = require('fs');
global.self = global;
eval(fs.readFileSync('static/js/tools/core-java-random.js', 'utf8'));
eval(fs.readFileSync('static/js/tools/core-structures.js', 'utf8'));

function nearStructure(seed, id, radiusChunks) {
  const cfg = MCStructures.CONFIG[id];
  const rg = Math.ceil(radiusChunks / cfg.spacing) + 1;
  let best = Infinity, bestPos = null;
  for (let rx = -rg; rx <= rg; rx++)
    for (let rz = -rg; rz <= rg; rz++) {
      const pos = MCStructures.structureChunkInRegion(seed, rx, rz, cfg);
      const d = Math.hypot(pos.x, pos.z);
      if (d < best) { best = d; bestPos = pos; }
    }
  return { dist: best, pos: bestPos };
}

function countVillagesNear(seed, radiusChunks) {
  const cfg = MCStructures.CONFIG.village;
  const rg = Math.ceil(radiusChunks / cfg.spacing) + 1;
  let n = 0, list = [];
  for (let rx = -rg; rx <= rg; rx++)
    for (let rz = -rg; rz <= rg; rz++) {
      const pos = MCStructures.structureChunkInRegion(seed, rx, rz, cfg);
      if (Math.hypot(pos.x, pos.z) < radiusChunks) { n++; if (n <= 4) list.push([pos.x, pos.z]); }
    }
  return { n, list };
}

function slimeNear(seed, radiusChunks) {
  let list = [];
  for (let cx = 0; cx < radiusChunks; cx++)
    for (let cz = 0; cz < radiusChunks; cz++) {
      if (MCAlgo.isSlimeChunk(seed, cx, cz)) { list.push([cx, cz]); if (list.length >= 4) return list; }
    }
  return list;
}

const targets = [
  { key: 'ancient-city', id: 'ancient_city', radius: 8, name: 'Ancient City' },
  { key: 'mansion', id: 'mansion', radius: 10, name: 'Woodland Mansion' },
  { key: 'trial-chambers', id: 'trial_chambers', radius: 8, name: 'Trial Chambers' },
  { key: 'monument', id: 'monument', radius: 12, name: 'Monument' }
];
const out = {};
targets.forEach(t => out[t.key] = { found: [] });

const RANGE_START = 10000, RANGE_END = 30000;
for (let s = RANGE_START; s < RANGE_END; s++) {
  const seed = BigInt(s);
  targets.forEach(t => {
    if (out[t.key].found.length >= 2) return;
    const r = nearStructure(seed, t.id, t.radius);
    if (r.pos && r.dist < t.radius) {
      // keep seeds spread out so worlds differ
      const last = out[t.key].found[out[t.key].found.length - 1];
      if (!last || s - last.seed > 3000) {
        out[t.key].found.push({ seed: s, dist: Math.round(r.dist), cx: r.pos.x, cz: r.pos.z,
          bx: r.pos.x * 16 + 8, bz: r.pos.z * 16 + 8 });
      }
    }
  });
  // combo: ancient city AND village both within 8 chunks
  if (out['city-village-combo'] === undefined) out['city-village-combo'] = { found: [] };
  if (out['city-village-combo'].found.length < 2) {
    const c = nearStructure(seed, 'ancient_city', 8);
    const v = nearStructure(seed, 'village', 8);
    if (c.pos && c.dist < 8 && v.pos && v.dist < 8) {
      const last = out['city-village-combo'].found[out['city-village-combo'].found.length - 1];
      if (!last || s - last.seed > 3000) {
        out['city-village-combo'].found.push({ seed: s, cityDist: Math.round(c.dist), villageDist: Math.round(v.dist),
          city: [c.pos.x * 16 + 8, c.pos.z * 16 + 8], village: [v.pos.x * 16 + 8, v.pos.z * 16 + 8] });
      }
    }
  }
  // slime spawn
  if (out['slime-spawn'] === undefined) out['slime-spawn'] = { found: [] };
  if (out['slime-spawn'].found.length < 2) {
    const sl = slimeNear(seed, 6);
    if (sl.length >= 3) {
      const last = out['slime-spawn'].found[out['slime-spawn'].found.length - 1];
      if (!last || s - last.seed > 3000) out['slime-spawn'].found.push({ seed: s, chunks: sl });
    }
  }
}

console.log(JSON.stringify(out, null, 1));
