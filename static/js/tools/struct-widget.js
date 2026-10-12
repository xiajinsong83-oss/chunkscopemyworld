/* struct-widget.js — drives every .struct-widget on /structures/* pages.
   Reads the page's data-struct-id, scans the nearest structure region for the
   entered seed, and shows block coords + distance with a Seed Map link.
   Depends on core-java-random + core-structures (loaded by the shortcode). */
(function () {
  'use strict';
  if (typeof MCStructures === 'undefined') return;
  var NAMES = {
    village: 'Village', desert_pyramid: 'Desert Pyramid', igloo: 'Igloo',
    jungle_pyramid: 'Jungle Pyramid', swamp_hut: 'Swamp Hut', monument: 'Ocean Monument',
    mansion: 'Woodland Mansion', outpost: 'Pillager Outpost', ruined_portal: 'Ruined Portal',
    shipwreck: 'Shipwreck', ocean_ruin: 'Ocean Ruin', ancient_city: 'Ancient City',
    trial_chambers: 'Trial Chambers'
  };
  function scanNearest(seed, id) {
    var cfg = MCStructures.CONFIG[id];
    if (!cfg) return null;
    var rg = 10; /* search ±10 regions around spawn chunk 0,0 */
    var best = Infinity, bestPos = null;
    for (var rx = -rg; rx <= rg; rx++) {
      for (var rz = -rg; rz <= rg; rz++) {
        var pos = MCStructures.structureChunkInRegion(seed, rx, rz, cfg);
        var d = Math.hypot(pos.x, pos.z);
        if (d < best) { best = d; bestPos = pos; }
      }
    }
    return bestPos ? { dist: best, cx: bestPos.x, cz: bestPos.z } : null;
  }
  var widgets = document.querySelectorAll('.struct-widget');
  widgets.forEach(function (w) {
    var btn = w.querySelector('[data-run="sw"]');
    var seedInput = w.querySelector('.sw-seed');
    var result = w.querySelector('.sw-result');
    var id = w.getAttribute('data-struct-id');
    if (!btn || !seedInput || !result || !id) return;
    btn.addEventListener('click', function () {
      var seed;
      try { seed = MCAlgo.parseSeed(seedInput.value || '12345'); } catch (e) { seed = MCAlgo.parseSeed('12345'); }
      var r = scanNearest(seed, id);
      result.classList.add('show');
      if (!r) {
        result.innerHTML = '<div class="big">Not found</div><div>No ' + (NAMES[id] || id) + ' region near spawn for this seed.</div>';
        return;
      }
      var blocks = Math.round(r.dist * 16);
      var bx = r.cx * 16 + 8, bz = r.cz * 16 + 8;
      result.innerHTML =
        '<div class="big">Nearest ' + (NAMES[id] || id) + '</div>' +
        '<div>Chunk (<b>' + r.cx + '</b>, <b>' + r.cz + '</b>) · block (<b>' + bx + '</b>, <b>' + bz + '</b>) · ~' + blocks.toLocaleString() + ' blocks from spawn.</div>' +
        '<div class="sf-summary"><a class="sf-copy" href="/apps/seed-map/#seed=' + encodeURIComponent(seedInput.value) + '&x=' + r.cx + '&z=' + r.cz + '&layers=s">Open in Seed Map →</a></div>' +
        '<div class="dim">Deterministic — identical on Java & Bedrock 1.18+.</div>';
    });
  });
})();
