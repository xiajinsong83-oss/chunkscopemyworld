/* spawn-chunk-finder.js */
(function () {
  'use strict';
  var ui = document.getElementById('sfResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var seed = ((document.getElementById('sfSeed') || {}).value || '12345').trim();
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">Spawn chunk: (0, 0)</div>' +
      '<div>World spawn is in chunk (0,0), roughly block (8, Y, 8) — the Y is set by terrain.</div>' +
      '<div>Always-loaded <b>spawn chunks</b>: chunks (-1,-1) to (1,1), a 3×3 area of ' + '192×192 blocks. Farms here run while you\'re anywhere.</div>' +
      '<div class="sf-summary"><a class="sf-copy" href="/apps/seed-map/#seed=' + encodeURIComponent(seed) + '&x=0&z=0&layers=s">Open in Seed Map →</a></div>';
  });
})();
