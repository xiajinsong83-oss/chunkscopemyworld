/* ChunkScope slime-chunk-finder.js
 * Interactive slime chunk map: seed -> chunk grid -> green slime chunks.
 * Reuses core-urlstate / core-worker / core-renderer / core-java-random (in worker).
 */
(function () {
  'use strict';
  var ui = document.getElementById('slimeUi');
  if (!ui) return;
  var cv = document.getElementById('slimeMap');
  if (!cv) return;

  var seedInput = document.getElementById('scSeed');
  var runBtn = document.getElementById('scRun');
  var statusEl = document.getElementById('scStatus');
  var statsEl = document.getElementById('scStats');
  var hintEl = document.getElementById('scHint');

  var st = URLState.read();
  if (seedInput) seedInput.value = st.seed || '12345';

  var worker = ComputeWorker.create('/js/tools/slime-chunk-worker.js');
  var loaded = { byKey: {} };          // key x,z -> 1/0
  var loadedSeed = null;
  var pending = false;
  var loadTimer = null;

  var version = 'java';

  function key(x, z) { return x + ',' + z; }

  function drawFrame(r) {
    var ctx = r.ctx;
    var i, j, p, k;
    var rect = r.getVisibleRange();
    // background tiles: slime bright green, others dark
    for (i = rect.minX; i <= rect.maxX; i++) {
      for (j = rect.minZ; j <= rect.maxZ; j++) {
        p = r.chunkToScreen(i, j);
        var isSlime = loaded.byKey[key(i, j)];
        if (isSlime === undefined) {
          ctx.fillStyle = 'rgba(120,140,120,0.08)';   // not yet computed
        } else if (isSlime === 1) {
          ctx.fillStyle = '#5ec96b';
        } else {
          ctx.fillStyle = 'rgba(35,48,35,0.55)';
        }
        ctx.fillRect(p.x, p.y, r.scale + 0.5, r.scale + 0.5);
      }
    }
    // spawn marker at chunk (0,0) area
    var s = r.chunkToScreen(0, 0);
    ctx.fillStyle = '#ff5252';
    ctx.fillRect(s.x, s.y, r.scale + 0.5, r.scale + 0.5);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px Nunito, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Spawn', s.x + r.scale / 2, s.y + r.scale / 2 + 2);
  }

  function rendererDraw(r) { drawFrame(r); }

  function scheduleLoad() {
    if (loadTimer) clearTimeout(loadTimer);
    loadTimer = setTimeout(loadVisible, 250);
  }

  function loadVisible() {
    if (pending) return;              // worker busy; next view change will retry
    var seedText = (seedInput ? seedInput.value : '12345') || '0';
    if (seedText !== loadedSeed) {
      loaded.byKey = {};
      loadedSeed = seedText;
    }
    var rect = window.map.getVisibleRange();
    pending = true;
    if (statusEl) statusEl.textContent = 'Computing chunks…';
    ComputeWorker.request(worker, {
      seedText: seedText,
      minX: rect.minX, maxX: rect.maxX,
      minZ: rect.minZ, maxZ: rect.maxZ
    }, function (done, total) {
      if (statusEl) statusEl.textContent = 'Computing chunks… ' + done + ' / ' + total;
    }, function (data) {
      pending = false;
      if (data.seed !== undefined && loadedSeed !== data.seed) {
        loaded.byKey = {};
        loadedSeed = data.seed;
      }
      var arr = data.chunks || [];
      for (var i = 0; i < arr.length; i++) {
        loaded.byKey[key(arr[i].x, arr[i].z)] = arr[i].slime ? 1 : 0;
      }
      if (statusEl) statusEl.textContent = 'Map ready — seed ' + data.seed + ' (' + version + ')';
      if (window.map) window.map.draw();
      updateStats();
    }, function (msg) {
      pending = false;
      if (statusEl) statusEl.textContent = 'Error: ' + msg;
    });
  }

  function updateStats() {
    if (!statsEl) return;
    var rect = window.map.getVisibleRange();
    var total = 0, slime = 0, i, j, k;
    for (i = rect.minX; i <= rect.maxX; i++) {
      for (j = rect.minZ; j <= rect.maxZ; j++) {
        k = loaded.byKey[key(i, j)];
        if (k === undefined) continue;
        total++;
        if (k === 1) slime++;
      }
    }
    var pct = total ? Math.round((slime / total) * 100) : 0;
    statsEl.textContent = 'Visible chunks: ' + total + ' · Slime chunks: ' + slime + ' (' + pct + '%) · Drag to move, scroll/pinch to zoom';
  }

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
  window.map = new ChunkMapRenderer(cv, opts);

  if (runBtn) {
    runBtn.addEventListener('click', function () {
      window.map.centerX = 0;
      window.map.centerZ = 0;
      window.map.scale = 16;
      URLState.write({ seed: seedInput.value, x: 0, z: 0, zoom: 16 });
      loadVisible();
      window.map.draw();
      updateStats();
    });
  }

  // edition tabs (Java / Bedrock 1.18+ share the same formula)
  var tabs = document.getElementById('verTabs');
  if (tabs) {
    tabs.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        version = (b.getAttribute('data-edition') || 'java').toLowerCase();
        if (version === 'bedrock' && hintEl) {
          hintEl.style.display = '';
        } else if (hintEl) {
          hintEl.style.display = 'none';
        }
        if (statusEl) statusEl.textContent = 'Map ready — seed ' + (loadedSeed || '') + ' (' + version + ')';
      });
    });
  }

  // initial load
  loadVisible();
  updateStats();
})();
