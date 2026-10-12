/* ChunkScope structure-finder.js
 * Enter a seed + your coordinates, pick a structure type → get the nearest
 * structures with block coords, distance, direction, plus a map view.
 * Reuses core-java-random + core-structures + ChunkMapRenderer.
 */
(function () {
  'use strict';
  var ui = document.getElementById('sfUi');
  if (!ui) return;
  var cv = document.getElementById('sfMap');
  if (!cv) return;

  var seedInput = document.getElementById('sfSeed');
  var xInput = document.getElementById('sfX');
  var zInput = document.getElementById('sfZ');
  var typeSel = document.getElementById('sfType');
  var runBtn = document.getElementById('sfRun');
  var statusEl = document.getElementById('sfStatus');
  var resultsEl = document.getElementById('sfResults');
  var selectedId = document.getElementById('sfSelected');

  var st = URLState.read();
  seedInput.value = st.seed || '12345';
  xInput.value = st.x !== undefined ? st.x : '0';
  zInput.value = st.z !== undefined ? st.z : '0';

  var player = { x: parseFloat(xInput.value) || 0, z: parseFloat(zInput.value) || 0 };
  var version = (st.ver === 'bedrock') ? 'bedrock' : 'java';
  var type = st.type || 'village';
  var seed = 0n; /* BigInt: core-structures requires a BigInt worldSeed */

  /* --- structure dropdown --- */
  typeSel.innerHTML = '';
  MCStructures.OVERWORLD_STRUCTURES.forEach(function (c) {
    var o = document.createElement('option');
    o.value = c.id;
    o.textContent = c.name;
    typeSel.appendChild(o);
  });
  if (MCStructures.CONFIG[type]) typeSel.value = type;

  var cursor = { structures: [] };

  /* --- nearest structures --- */
  function nearest(seedText, p, cfg, n) {
    seed = MCAlgo.parseSeed(seedText);
    var pxc = Math.floor(p.x / 16);
    var pzc = Math.floor(p.z / 16);
    var prx = Math.floor(pxc / cfg.spacing);
    var prz = Math.floor(pzc / cfg.spacing);
    var out = [];
    var rx, rz, pos, bx, bz, d;
    for (rx = prx - 4; rx <= prx + 4; rx++) {
      for (rz = prz - 4; rz <= prz + 4; rz++) {
        pos = MCStructures.structureChunkInRegion(seed, rx, rz, cfg);
        bx = pos.x * 16 + 8;
        bz = pos.z * 16 + 8;
        d = Math.hypot(p.x - bx, p.z - bz);
        out.push({ id: cfg.id, name: cfg.name, color: cfg.color, cx: pos.x, cz: pos.z, bx: bx, bz: bz, d: d });
      }
    }
    out.sort(function (a, b) { return a.d - b.d; });
    return out.slice(0, n);
  }

  function directionOf(dx, dz) {
    var ang = Math.atan2(dx, dz) * 180 / Math.PI;
    if (ang < 0) ang += 360;
    var dirs = ['S', 'SW', 'W', 'NW', 'N', 'NE', 'E', 'SE'];
    return dirs[Math.round(ang / 45) % 8];
  }

  /* --- compute + render --- */
  function compute(centerOn) {
    var cfg = MCStructures.CONFIG[typeSel.value];
    var list = nearest(seedInput.value, player, cfg, 6);
    cursor.structures = list;
    URLState.write({ seed: seedInput.value, x: Math.round(player.x), z: Math.round(player.z), type: typeSel.value, ver: version });
    renderResults(list, centerOn);
    statusEl.textContent = 'Nearest ' + cfg.name + ' (seed ' + seed + ', ' + version + ', 1.18+): shown below — click markers on the map for details.';
  }

  function renderResults(list, centerOn) {
    if (!list.length) { resultsEl.innerHTML = '<div class="sf-empty">No structures found nearby.</div>'; return; }
    var h = '';
    list.forEach(function (s, i) {
      var dir = directionOf(s.bx - player.x, s.bz - player.z);
      var block = s.bx + ' ' + s.bz;
      h += '<div class="sf-row" data-idx="' + i + '" style="--sc:' + s.color + '">' +
        '<span class="sf-rank">' + (i === 0 ? '★' : (i + 1)) + '</span>' +
        '<div class="sf-main"><b>' + s.name + '</b>' +
        '<div class="sf-sub">' + block + ' · ' + Math.round(s.d).toLocaleString() + ' blocks ' + dir + ' of you</div></div>' +
        '<button class="sf-copy" data-coords="' + block + '">Copy</button></div>';
    });
    resultsEl.innerHTML = h;
    bindRows(list, centerOn);
  }

  function bindRows(list, centerOn) {
    resultsEl.querySelectorAll('.sf-row').forEach(function (row) {
      var idx = parseInt(row.getAttribute('data-idx'), 10);
      row.addEventListener('click', function () { focusStructure(list[idx]); });
      row.querySelector('.sf-copy').addEventListener('click', function (e) {
        e.stopPropagation();
        var btn = this;
        var coords = btn.getAttribute('data-coords');
        function done(ok) { btn.textContent = ok ? 'Copied!' : 'Ctrl+C: ' + coords; setTimeout(function () { btn.textContent = 'Copy'; }, 1500); }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(coords).then(function () { done(true); }, function () { done(false); });
        else done(false);
      });
    });
  }

  function focusStructure(s) {
    selectedId.textContent = s.name + ' at block ' + s.bx + ' ' + s.bz + ' · ' + Math.round(s.d).toLocaleString() + ' blocks away';
    selectedId.classList.add('show');
    window.sfmap.centerX = s.cx;
    window.sfmap.centerZ = s.cz;
    window.sfmap.scale = clamp(18, 3, 60);
    window.sfmap.draw();
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /* --- map --- */
  function drawFrame(r) {
    var ctx = r.ctx;
    var cfg = MCStructures.CONFIG[typeSel.value];
    var rect = r.getVisibleRange();
    var attempts = MCStructures.structuresInRange(seed, rect.minX, rect.maxX, rect.minZ, rect.maxZ, [cfg.id]);
    var i, p, s;

    // structure markers
    for (i = 0; i < attempts.length; i++) {
      p = r.chunkToScreen(attempts[i].x, attempts[i].z);
      var cx = p.x + r.scale / 2, cy = p.y + r.scale / 2;
      var sz = Math.max(5, Math.min(11, r.scale * 0.42));
      ctx.fillStyle = attempts[i].color;
      ctx.fillRect(cx - sz / 2, cy - sz / 2, sz, sz);
      ctx.strokeStyle = 'rgba(0,0,0,0.55)';
      ctx.lineWidth = 1;
      ctx.strokeRect(cx - sz / 2, cy - sz / 2, sz, sz);
      if (r.scale >= 12) {
        ctx.font = 'bold 10px Nunito, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = '#e8f2e8';
        ctx.fillText(attempts[i].name, cx, cy - sz / 2 - 3);
      }
    }

    // player marker
    p = r.chunkToScreen(Math.floor(player.x / 16), Math.floor(player.z / 16));
    var px = p.x + r.scale / 2, py = p.y + r.scale / 2;
    ctx.strokeStyle = '#ff5252';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#ff5252';
    ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px Nunito, Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText('You', px + 8, py + 8);
  }

  var opts = {
    centerX: Math.floor(player.x / 16),
    centerZ: Math.floor(player.z / 16),
    scale: 18,
    onDraw: drawFrame,
    onViewChange: function (x, z, scale) { URLState.write({ x: Math.round(player.x), z: Math.round(player.z) }); }
  };
  try { window.sfmap = new ChunkMapRenderer(cv, opts); }
  catch (err) { statusEl.textContent = '⚠ map init error: ' + (err && err.message); return; }

  /* --- actions --- */
  runBtn.addEventListener('click', function () {
    player.x = parseFloat(xInput.value) || 0;
    player.z = parseFloat(zInput.value) || 0;
    window.sfmap.centerX = Math.floor(player.x / 16);
    window.sfmap.centerZ = Math.floor(player.z / 16);
    var cfg = MCStructures.CONFIG[typeSel.value];
    window.sfmap.scale = clamp(Math.round(560 / (cfg.spacing * 1.6)), 3, 60);
    compute(true);
    selectedId.classList.remove('show');
    window.sfmap.draw();
  });

  // click detection
  var downAt = null;
  cv.addEventListener('pointerdown', function (e) { downAt = { x: e.offsetX, y: e.offsetY }; });
  cv.addEventListener('pointerup', function (e) {
    if (!downAt) return;
    var dx = e.offsetX - downAt.x, dy = e.offsetY - downAt.y;
    downAt = null;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) return;
    onMapClick(e.offsetX, e.offsetY);
  });
  function onMapClick(px, py) {
    var best = null, bestD = 14, i, p, d;
    var cfg = MCStructures.CONFIG[typeSel.value];
    var rect = window.sfmap.getVisibleRange();
    var attempts = MCStructures.structuresInRange(seed, rect.minX, rect.maxX, rect.minZ, rect.maxZ, [cfg.id]);
    for (i = 0; i < attempts.length; i++) {
      p = window.sfmap.chunkToScreen(attempts[i].x, attempts[i].z);
      d = Math.hypot(px - (p.x + window.sfmap.scale / 2), py - (p.y + window.sfmap.scale / 2));
      if (d < bestD) { bestD = d; best = attempts[i]; }
    }
    if (best) focusStructure({ bx: best.x * 16 + 8, bz: best.z * 16 + 8, name: best.name, d: Math.hypot(player.x - (best.x * 16 + 8), player.z - (best.z * 16 + 8)), cx: best.x, cz: best.z });
  }

  // version tabs
  var tabs = document.getElementById('verTabs');
  if (tabs) {
    tabs.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        version = (b.getAttribute('data-edition') || 'java').toLowerCase();
        compute(false);
      });
    });
  }

  // init
  runBtn.click();
})();
