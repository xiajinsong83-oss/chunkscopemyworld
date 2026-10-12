/* ChunkScope seed-map.js
 * Seed Map: unified interactive map — structure attempts, slime chunks,
 * spawn chunks, grid. Multi-layer toggles, click details, URL state.
 */
(function () {
  'use strict';
  var ui = document.getElementById('seedMapUi');
  if (!ui) return;
  var cv = document.getElementById('seedMap');
  if (!cv) return;

  var seedInput = document.getElementById('smSeed');
  var runBtn = document.getElementById('smRun');
  var statusEl = document.getElementById('smStatus');
  var statsEl = document.getElementById('smStats');
  var hintEl = document.getElementById('smHint');
  var detailEl = document.getElementById('smDetail');
  var detailClose = document.getElementById('smDetailClose');
  var copyBtn = document.getElementById('smCopy');
  var shareBtn = document.getElementById('smShare');

  var st = URLState.read();
  if (seedInput) seedInput.value = st.seed || '12345';
  var version = (st.ver === 'bedrock') ? 'bedrock' : 'java';

  /* layers: URL value is the SET of enabled layers. Missing param = default all on;
     empty string = all off (must be distinguished from "no param"). */
  var _hasLayers = typeof st.layers === 'string';
  var layers = {
    structures: _hasLayers ? (st.layers.indexOf('s') >= 0) : true,
    slime: _hasLayers ? (st.layers.indexOf('m') >= 0) : true,
    spawn: _hasLayers ? (st.layers.indexOf('p') >= 0) : true
  };
  var GRID_ON = _hasLayers ? (st.layers.indexOf('g') >= 0) : true;

  var worker = ComputeWorker.create('/js/tools/seed-map-worker.js');
  var loaded = { structures: [], slime: [], byKey: {} };
  var loadedSeed = null;
  var pending = false;
  var loadTimer = null;

  function key(x, z) { return x + ',' + z; }

  /* ---------- rendering ---------- */
  function drawFrame(r) {
    var ctx = r.ctx;
    var rect = r.getVisibleRange();
    var i, j, k, p;

    // slime layer (background tint per chunk)
    if (layers.slime) {
      for (i = rect.minX; i <= rect.maxX; i++) {
        for (j = rect.minZ; j <= rect.maxZ; j++) {
          p = r.chunkToScreen(i, j);
          k = loaded.byKey[key(i, j)];
          if (k === 1) ctx.fillStyle = 'rgba(94,201,107,0.85)';
          else if (k === 0) ctx.fillStyle = 'rgba(35,48,35,0.5)';
          else ctx.fillStyle = 'rgba(120,140,120,0.08)';
          ctx.fillRect(p.x, p.y, r.scale + 0.5, r.scale + 0.5);
        }
      }
    }

    // spawn chunks (3x3 around chunk 0,0)
    if (layers.spawn) {
      p = r.chunkToScreen(-1, -1);
      ctx.strokeStyle = '#ff5252';
      ctx.lineWidth = 2;
      ctx.strokeRect(p.x + 1, p.y + 1, r.scale * 3 - 2, r.scale * 3 - 2);
      ctx.fillStyle = 'rgba(255,82,82,0.12)';
      ctx.fillRect(p.x + 2, p.y + 2, r.scale * 3 - 4, r.scale * 3 - 4);
      p = r.chunkToScreen(0, 0);
      ctx.fillStyle = '#ff5252';
      ctx.fillRect(p.x, p.y, r.scale + 0.5, r.scale + 0.5);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px Nunito, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('Spawn', p.x + r.scale / 2, p.y + r.scale / 2 + 2);
    }

    // structure icons
    if (layers.structures) {
      var arr = loaded.structures;
      for (i = 0; i < arr.length; i++) {
        p = r.chunkToScreen(arr[i].x, arr[i].z);
        var cx = p.x + r.scale / 2;
        var cy = p.y + r.scale / 2;
        var s = Math.max(5, Math.min(11, r.scale * 0.42));
        ctx.fillStyle = arr[i].color;
        ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
        ctx.strokeStyle = 'rgba(0,0,0,0.55)';
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - s / 2, cy - s / 2, s, s);
        if (r.scale >= 14) {
          ctx.font = 'bold 10px Nunito, Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillStyle = '#e8f2e8';
          ctx.fillText(arr[i].name, cx, cy - s / 2 - 3);
        }
      }
    }
  }

  function rendererDraw(r) { drawFrame(r); }

  /* ---------- data loading ---------- */
  function scheduleLoad() {
    if (loadTimer) clearTimeout(loadTimer);
    loadTimer = setTimeout(loadVisible, 250);
  }

  function loadVisible() {
    if (pending) return;
    var seedText = (seedInput ? seedInput.value : '12345') || '0';
    if (seedText !== loadedSeed) {
      loaded.structures = [];
      loaded.slime = [];
      loaded.byKey = {};
      loadedSeed = seedText;
    }
    var rect = window.smap.getVisibleRange();
    pending = true;
    if (statusEl) statusEl.textContent = 'Computing…';
    ComputeWorker.request(worker, {
      seedText: seedText,
      minX: rect.minX, maxX: rect.maxX,
      minZ: rect.minZ, maxZ: rect.maxZ,
      layers: ['structures', 'slime']
    }, function (done, total) {
      if (statusEl) statusEl.textContent = 'Computing… ' + done + ' / ' + total;
    }, function (data) {
      pending = false;
      loaded.structures = data.structures || [];
      loaded.slime = data.slime || [];
      var i;
      for (i = 0; i < loaded.slime.length; i++) {
        loaded.byKey[key(loaded.slime[i].x, loaded.slime[i].z)] = 1;
      }
      if (statusEl) statusEl.textContent = 'Map ready — seed ' + data.seed + ' (' + version + ', 1.18+)';
      window.smap.draw();
      updateStats();
    }, function (msg) {
      pending = false;
      if (statusEl) statusEl.textContent = 'Error: ' + msg;
    });
  }

  function updateStats() {
    if (!statsEl) return;
    var stCount = loaded.structures.length;
    var sl = loaded.slime.length;
    statsEl.textContent = 'Structures: ' + stCount + ' · Slime chunks: ' + sl + ' · Drag to move, scroll/pinch to zoom, click a marker for details';
  }

  /* ---------- map setup ---------- */
  var opts = {
    centerX: parseFloat(st.x) || 0,
    centerZ: parseFloat(st.z) || 0,
    scale: parseFloat(st.zoom) || 16,
    onDraw: rendererDraw,
    onViewChange: function (x, z, scale) {
      scheduleLoad();
      URLState.write({ x: Math.round(x), z: Math.round(z), zoom: Math.round(scale) });
    },
    onStats: function () { updateStats(); }
  };
  window.smap = new ChunkMapRenderer(cv, opts);

  /* ---------- interactions ---------- */
  if (runBtn) {
    runBtn.addEventListener('click', function () {
      window.smap.centerX = 0;
      window.smap.centerZ = 0;
      window.smap.scale = 16;
      URLState.write({ seed: seedInput.value, x: 0, z: 0, zoom: 16 });
      loadVisible();
      window.smap.draw();
      updateStats();
    });
  }

  // layer toggles
  var checks = ui.querySelectorAll('[data-layer]');
  checks.forEach(function (chk) {
    chk.checked = chk.getAttribute('data-layer') === 'grid' ? GRID_ON : layers[chk.getAttribute('data-layer')];
    chk.addEventListener('change', function () {
      var L = chk.getAttribute('data-layer');
      if (L === 'grid') { window.smap.gridOn = chk.checked; }
      else { layers[L] = chk.checked; }
      /* codes must reflect the CURRENT toggle state (not the init constant),
         and an empty string means "all layers off". */
      var codes = (layers.structures ? 's' : '') + (layers.slime ? 'm' : '') + (layers.spawn ? 'p' : '') + (window.smap.gridOn ? 'g' : '');
      URLState.write({ layers: codes || '' });
      if (L !== 'grid') scheduleLoad();
      window.smap.draw();
      updateStats();
    });
  });

  // click detection (short press = click, drag = pan)
  var downAt = null;
  cv.addEventListener('pointerdown', function (e) { downAt = { x: e.offsetX, y: e.offsetY }; });
  cv.addEventListener('pointerup', function (e) {
    if (!downAt) return;
    var dx = e.offsetX - downAt.x;
    var dy = e.offsetY - downAt.y;
    downAt = null;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) return;
    onMapClick(e.offsetX, e.offsetY);
  });

  function onMapClick(px, py) {
    var best = null;
    var bestD = 14;
    var arr = loaded.structures;
    var i, p, d;
    for (i = 0; i < arr.length; i++) {
      p = window.smap.chunkToScreen(arr[i].x, arr[i].z);
      d = Math.hypot(px - (p.x + window.smap.scale / 2), py - (p.y + window.smap.scale / 2));
      if (d < bestD) { bestD = d; best = arr[i]; }
    }
    if (best) {
      showDetail(best);
    } else if (detailEl) {
      detailEl.classList.remove('show');
    }
  }

  function showDetail(s) {
    if (!detailEl) return;
    var bx = s.x * 16 + 8;
    var bz = s.z * 16 + 8;
    var dist = Math.round(Math.hypot(bx, bz));
    detailEl.querySelector('.sm-name').textContent = s.name;
    detailEl.querySelector('.sm-coords').textContent = 'Chunk (' + s.x + ', ' + s.z + ')  ·  Block (' + bx + ', ' + bz + ')';
    detailEl.querySelector('.sm-dist').textContent = 'Distance from world spawn: ~' + dist.toLocaleString() + ' blocks';
    copyBtn.setAttribute('data-coords', bx + ' ' + bz);
    detailEl.classList.add('show');
  }

  if (detailClose) {
    detailClose.addEventListener('click', function () { detailEl.classList.remove('show'); });
  }
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var coords = copyBtn.getAttribute('data-coords') || '0 0';
      function done(ok) {
        copyBtn.textContent = ok ? 'Copied!' : 'Press Ctrl+C: ' + coords;
        setTimeout(function () { copyBtn.textContent = 'Copy coordinates'; }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(coords).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  }
  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      var url = window.location.href.split('#')[0] + '#' + location.hash.replace(/^#/, '');
      function done(ok) {
        shareBtn.textContent = ok ? 'Link copied!' : url;
        setTimeout(function () { shareBtn.textContent = 'Copy share link'; }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  }

  // edition tabs
  var tabs = document.getElementById('verTabs');
  if (tabs) {
    tabs.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        version = (b.getAttribute('data-edition') || 'java').toLowerCase();
        URLState.write({ ver: version });
        if (version === 'bedrock' && hintEl) hintEl.style.display = '';
        else if (hintEl) hintEl.style.display = 'none';
        if (statusEl) statusEl.textContent = 'Map ready — seed ' + (loadedSeed || '') + ' (' + version + ', 1.18+)';
      });
    });
  }

  // initial load
  if (version === 'bedrock' && hintEl) hintEl.style.display = '';
  loadVisible();
  updateStats();
})();
