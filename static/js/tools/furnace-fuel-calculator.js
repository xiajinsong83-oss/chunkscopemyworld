/* furnace-fuel-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('ffResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  var FUEL = {
    coal: { t: 80, i: 8, n: 'Coal / Charcoal' },
    coal_block: { t: 800, i: 80, n: 'Coal block' },
    lava: { t: 1000, i: 100, n: 'Lava bucket' },
    dried_kelp: { t: 200, i: 20, n: 'Dried kelp block' },
    log: { t: 15, i: 1.5, n: 'Log / Plank' },
    plank: { t: 15, i: 1.5, n: 'Plank' },
    stick: { t: 5, i: 0.5, n: 'Stick' }
  };
  btn.addEventListener('click', function () {
    var f = ((document.getElementById('ffFuel') || {}).value || 'coal');
    var n = parseInt((document.getElementById('ffCount') || {}).value, 10) || 1;
    n = Math.max(1, Math.min(64, n));
    var r = FUEL[f] || FUEL.coal;
    var totalItems = r.i * n;
    var totalSec = r.t * n;
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">' + totalSec.toLocaleString() + 's · ~' + (Number.isInteger(totalItems) ? totalItems.toLocaleString() : totalItems) + ' items</div>' +
      '<div>' + n + ' × ' + r.n + ' burns for <b>' + totalSec.toLocaleString() + ' seconds</b> (~' + (totalSec / 60).toFixed(1) + ' min), smelting ~<b>' + (Number.isInteger(totalItems) ? totalItems : totalItems.toFixed(1)) + '</b> items.</div>' +
      '<div class="dim">Exact burn times (Java & Bedrock identical).</div>';
  });
})();
