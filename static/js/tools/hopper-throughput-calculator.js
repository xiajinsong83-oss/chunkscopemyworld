/* hopper-throughput-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('htResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var items = parseInt((document.getElementById('htItems') || {}).value, 10) || 64;
    var hops = parseInt((document.getElementById('htHoppers') || {}).value, 10) || 1;
    items = Math.max(1, Math.min(100000, items)); hops = Math.max(1, Math.min(16, hops));
    var perSec = hops * 2.5;
    var sec = items / perSec;
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">' + (sec >= 60 ? Math.round(sec) + 's (' + (sec / 60).toFixed(1) + ' min)' : Math.round(sec) + 's') + '</div>' +
      '<div>' + hops + ' hopper' + (hops > 1 ? 's' : '') + ' × 2.5 items/s → <b>' + items.toLocaleString() + '</b> items in ≈<b>' + (sec >= 60 ? (sec / 60).toFixed(1) + ' min' : Math.round(sec) + 's') + '</b>.</div>' +
      '<div class="dim">Exact: 1 item per 0.4s per hopper (150 items/min each).</div>';
  });
})();
