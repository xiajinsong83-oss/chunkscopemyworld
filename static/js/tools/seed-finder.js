/* ChunkScope seed-finder.js
 * Reverse seed search UI, two modes:
 *  - Structure: deterministic structure-near-spawn seeds (Worker + core-structures).
 *  - Biome (experimental Beta): approximate-climate seeds near spawn (see core-biome-noise).
 */
(function () {
  'use strict';
  var ui = document.getElementById('sfdUi');
  if (!ui) return;

  var modeSel = document.getElementById('sfdMode');
  var typeSel = document.getElementById('sfdType');
  var biomeSel = document.getElementById('sfdBiome');
  var radiusSel = document.getElementById('sfdRadius');
  var countSel = document.getElementById('sfdCount');
  var startInput = document.getElementById('sfdStart');
  var runBtn = document.getElementById('sfdRun');
  var statusEl = document.getElementById('sfdStatus');
  var progressEl = document.getElementById('sfdProgress');
  var resultsEl = document.getElementById('sfdResults');
  var biomeNote = document.getElementById('sfdBiomeNote');

  var st = URLState.read();
  if (startInput) startInput.value = st.start || '0';

  /* --- dropdowns --- */
  if (MCStructures && MCStructures.OVERWORLD_STRUCTURES) {
    typeSel.innerHTML = '';
    MCStructures.OVERWORLD_STRUCTURES.forEach(function (c) {
      var o = document.createElement('option');
      o.value = c.id;
      o.textContent = c.name + ' (every ' + c.spacing + ' chunks)';
      typeSel.appendChild(o);
    });
    if (MCStructures.CONFIG[st.type]) typeSel.value = st.type;
  }
  if (BiomeClim && BiomeClim.BIOMES) {
    biomeSel.innerHTML = '';
    BiomeClim.BIOMES.forEach(function (b) {
      var o = document.createElement('option');
      o.value = b.id;
      o.textContent = b.name;
      biomeSel.appendChild(o);
    });
    if (st.biome) biomeSel.value = st.biome;
  } else {
    statusEl.textContent = '⚠ core-biome-noise not loaded';
  }

  var worker = ComputeWorker.create('/js/tools/seed-finder-worker.js');
  var busy = false;

  function currentMode() { return modeSel.value === 'biome' ? 'biome' : 'structure'; }

  function applyMode() {
    var biome = currentMode() === 'biome';
    typeSel.style.display = biome ? 'none' : '';
    biomeSel.style.display = biome ? '' : 'none';
    if (biomeNote) biomeNote.style.display = biome ? '' : 'none';
  }
  if (modeSel) modeSel.addEventListener('change', applyMode);
  if (st.mode) modeSel.value = st.mode;
  applyMode();

  function viewSeedLink(seed) {
    return '/apps/seed-map/#seed=' + encodeURIComponent(seed) + '&x=0&z=0&layers=s';
  }

  function renderHits(data) {
    var hits = data.hits || [];
    var mode = data.mode || 'structure';
    if (!hits.length) {
      resultsEl.innerHTML = '<div class="sf-empty">No seed in this range matched. Try a larger seed range or, for biomes, a different climate target (the model is approximate).</div>';
      return;
    }
    var h = '<div class="sf-summary">' + hits.length + ' candidate seed' + (hits.length > 1 ? 's' : '') + ' (' + data.scanned + ' scanned, ~' + ((hits.length / data.scanned) * 100).toFixed(2) + '%):</div>';
    hits.forEach(function (s) {
      if (mode === 'biome') {
        var pct = Math.round((s.match / s.samples) * 100);
        h += '<div class="sf-row" style="--sc:#7ee787">' +
          '<span class="sf-rank">#</span>' +
          '<div class="sf-main"><b>Seed ' + s.seed + '</b>' +
          '<div class="sf-sub">' + data.label + ' climate match: ' + s.match + ' / ' + s.samples + ' sample points (' + pct + '%) near spawn</div></div>' +
          '<a class="sf-copy" href="' + viewSeedLink(s.seed) + '">Open in Seed Map</a></div>';
      } else {
        var blocks = Math.round(s.dist * 16);
        h += '<div class="sf-row" style="--sc:#ffd166">' +
          '<span class="sf-rank">#</span>' +
          '<div class="sf-main"><b>Seed ' + s.seed + '</b>' +
          '<div class="sf-sub">' + data.label + ' at chunk (' + s.cx + ', ' + s.cz + ') · block (' + s.bx + ', ' + s.bz + ') · ' + blocks.toLocaleString() + ' blocks from spawn</div></div>' +
          '<a class="sf-copy" href="' + viewSeedLink(s.seed) + '">Open in Seed Map</a></div>';
      }
    });
    resultsEl.innerHTML = h;
  }

  runBtn.addEventListener('click', function () {
    if (busy) return;
    var mode = currentMode();
    var count = parseInt(countSel.value, 10) || 500;
    var start = parseInt(startInput.value, 10) || 0;
    var radius = parseInt(radiusSel.value, 10) || 8;
    var structureId = typeSel.value;
    var biome = biomeSel.value;
    busy = true;
    runBtn.disabled = true;
    progressEl.style.display = '';
    progressEl.textContent = 'Scanning…';
    resultsEl.innerHTML = '';
    URLState.write({ mode: mode, type: structureId, biome: biome, radius: radius, count: count, start: start });
    if (mode === 'biome') {
      statusEl.textContent = 'Scanning seeds ' + start + '–' + (start + count - 1) + ' for ' + biomeSel.options[biomeSel.selectedIndex].text + ' climate near spawn (experimental model — verify in game).';
    } else {
      statusEl.textContent = 'Scanning seeds ' + start + '–' + (start + count - 1) + ' for ' + typeSel.options[typeSel.selectedIndex].text + ' within ' + radius + ' chunks of spawn (deterministic, identical Java & Bedrock).';
    }
    ComputeWorker.request(worker, {
      mode: mode, structureId: structureId, biome: biome,
      radius: radius, count: count, startSeed: start
    }, function (done, total) {
      progressEl.textContent = 'Scanning seeds… ' + done + ' / ' + total;
    }, function (data) {
      busy = false; runBtn.disabled = false;
      progressEl.textContent = ''; progressEl.style.display = 'none';
      renderHits(data);
      statusEl.textContent = data.hits && data.hits.length
        ? '✓ Found ' + data.hits.length + ' candidate seed' + (data.hits.length > 1 ? 's' : '') + ' — ' + data.label + '.'
        : 'No matches in ' + data.scanned + ' seeds scanned.';
    }, function (msg) {
      busy = false; runBtn.disabled = false;
      progressEl.textContent = ''; progressEl.style.display = 'none';
      statusEl.textContent = '⚠ Error: ' + msg;
    });
  });
})();
