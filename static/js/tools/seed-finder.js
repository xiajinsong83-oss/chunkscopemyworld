/* ChunkScope seed-finder.js
 * Reverse structure search UI: pick a structure + max distance from spawn,
 * scan a range of seeds in a Worker, list the ones that qualify.
 * Deterministic (same seed always yields the same structure pattern).
 */
(function () {
  'use strict';
  var ui = document.getElementById('sfdUi');
  if (!ui) return;

  var typeSel = document.getElementById('sfdType');
  var radiusSel = document.getElementById('sfdRadius');
  var countSel = document.getElementById('sfdCount');
  var startInput = document.getElementById('sfdStart');
  var runBtn = document.getElementById('sfdRun');
  var statusEl = document.getElementById('sfdStatus');
  var progressEl = document.getElementById('sfdProgress');
  var resultsEl = document.getElementById('sfdResults');

  var st = URLState.read();
  if (startInput) startInput.value = st.start || '0';

  /* --- structure dropdown --- */
  if (MCStructures && MCStructures.OVERWORLD_STRUCTURES) {
    typeSel.innerHTML = '';
    MCStructures.OVERWORLD_STRUCTURES.forEach(function (c) {
      var o = document.createElement('option');
      o.value = c.id;
      o.textContent = c.name + ' (every ' + c.spacing + ' chunks)';
      typeSel.appendChild(o);
    });
    if (MCStructures.CONFIG[st.type]) typeSel.value = st.type;
  } else {
    statusEl.textContent = '⚠ core-structures not loaded';
    return;
  }

  var worker = ComputeWorker.create('/js/tools/seed-finder-worker.js');
  var busy = false;

  function viewSeedLink(seed, bx, bz) {
    return '/apps/seed-map/#seed=' + encodeURIComponent(seed) + '&x=' + Math.floor(bx / 16) + '&z=' + Math.floor(bz / 16) + '&layers=s';
  }

  function renderHits(hits, structure) {
    if (!hits.length) {
      resultsEl.innerHTML = '<div class="sf-empty">No seed in this range had a ' + structure + ' within ' + radiusSel.value + ' chunks of spawn. Try a larger radius or seed range.</div>';
      return;
    }
    var h = '<div class="sf-summary">' + hits.length + ' matching seed' + (hits.length > 1 ? 's' : '') + ' found in ' + countSel.value + ' scanned:</div>';
    hits.forEach(function (s) {
      var blocks = Math.round(s.dist * 16);
      h += '<div class="sf-row" style="--sc:#ffd166">' +
        '<span class="sf-rank">#</span>' +
        '<div class="sf-main"><b>Seed ' + s.seed + '</b>' +
        '<div class="sf-sub">' + structure + ' at chunk (' + s.cx + ', ' + s.cz + ') · block (' + s.bx + ', ' + s.bz + ') · ' + blocks.toLocaleString() + ' blocks from spawn</div></div>' +
        '<a class="sf-copy" href="' + viewSeedLink(s.seed, s.bx, s.bz) + '">Open in Seed Map</a></div>';
    });
    resultsEl.innerHTML = h;
  }

  runBtn.addEventListener('click', function () {
    if (busy) return;
    var structureId = typeSel.value;
    var radius = parseInt(radiusSel.value, 10) || 8;
    var count = parseInt(countSel.value, 10) || 500;
    var start = parseInt(startInput.value, 10) || 0;
    busy = true;
    runBtn.disabled = true;
    progressEl.style.display = '';
    progressEl.textContent = 'Scanning…';
    statusEl.textContent = 'Searching for ' + typeSel.options[typeSel.selectedIndex].text + ' within ' + radius + ' chunks of spawn. Scanning seeds ' + start + '–' + (start + count - 1) + ' (deterministic, identical in Java & Bedrock).';
    resultsEl.innerHTML = '';
    URLState.write({ type: structureId, radius: radius, count: count, start: start });
    ComputeWorker.request(worker, {
      structureId: structureId, radius: radius, count: count, startSeed: start
    }, function (done, total) {
      progressEl.textContent = 'Scanning seeds… ' + done + ' / ' + total;
    }, function (data) {
      busy = false;
      runBtn.disabled = false;
      progressEl.textContent = '';
      progressEl.style.display = 'none';
      renderHits(data.hits || [], data.structure || structureId);
      if (data.hits && data.hits.length) {
        statusEl.textContent = '✓ Found ' + data.hits.length + ' matching seed' + (data.hits.length > 1 ? 's' : '') + ' (' + data.scanned + ' scanned, ~' + ((data.hits.length / data.scanned) * 100).toFixed(2) + '% hit rate). Click a seed to open it in the Seed Map.';
      } else {
        statusEl.textContent = 'No matches in ' + data.scanned + ' seeds scanned (deterministic — results are exact).';
      }
    }, function (msg) {
      busy = false;
      runBtn.disabled = false;
      progressEl.textContent = '';
      progressEl.style.display = 'none';
      statusEl.textContent = '⚠ Error: ' + msg;
    });
  });
})();
