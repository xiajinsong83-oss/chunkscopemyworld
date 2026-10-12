/* mob-cap-calculator.js — hostile mob cap estimate. */
(function () {
  'use strict';
  var ui = document.getElementById('mcResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var ed = ((document.getElementById('mcEdition') || {}).value || 'java');
    var sim = parseInt((document.getElementById('mcSim') || {}).value, 10) || 8;
    var players = parseInt((document.getElementById('mcPlayers') || {}).value, 10) || 1;
    players = Math.max(1, Math.min(8, players));
    var cap = ed === 'java' ? 70 * players : 200 * players;
    var chunks = Math.pow(2 * sim + 1, 2);
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">Hostile cap ≈ ' + cap.toLocaleString() + ' (' + ed + ')</div>' +
      '<div>' + players + ' player(s) · simulation ' + sim + ' chunks (' + chunks.toLocaleString() + ' loaded chunks).</div>' +
      '<div class="dim">Estimate — Java uses 70/player world-wide; Bedrock ~200/player across simulation distance. Spawn-proofing redirects this cap to your farm.</div>';
  });
})();
