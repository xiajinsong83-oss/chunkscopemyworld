(function () {
  'use strict';
  var ui = document.getElementById('fcResult');
  var btn = document.querySelector('#farmUi button, .tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  // Fallback rates are documented on the page; community-measured 1.21 averages.
  var RATES = {
    iron:      { per: 700,  unit: 'iron ingots' },
    gold:      { per: 240,  unit: 'gold ingots' },
    sugarcane: { per: 2160, unit: 'sugar cane' },
    creeper:   { per: 1500, unit: 'gunpowder' }
  };
  btn.addEventListener('click', function () {
    var type = (document.getElementById('fcType') || {}).value || 'iron';
    var hours = parseFloat((document.getElementById('fcHours') || {}).value) || 4;
    hours = Math.max(0.5, Math.min(24, hours));
    var r = RATES[type] || RATES.iron;
    var total = Math.round(r.per * hours);
    var stacks = (total / 64).toFixed(1);
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">' + r.per.toLocaleString() + ' ' + r.unit + ' / hour</div>' +
      '<div>AFK for <b>' + hours + 'h</b> → about <b>' + total.toLocaleString() + '</b> ' + r.unit +
      ' (' + stacks + ' stacks)</div>' +
      '<div class="dim">Estimate ±15% — depends on spawn conditions, simulation distance and farm design.</div>';
  });
})();
