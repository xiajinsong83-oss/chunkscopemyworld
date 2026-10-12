/* fortune-ore-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('foResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  var MULT = { 0: 1.0, 1: 1.33, 2: 1.75, 3: 2.2 };
  var ORES = {
    diamond: { n: 'Diamond ore', base: 1 }, coal: { n: 'Coal ore', base: 1 }, emerald: { n: 'Emerald ore', base: 1 },
    iron: { n: 'Iron ore', base: 1 }, redstone: { n: 'Redstone', base: 4.5 }, lapis: { n: 'Lapis lazuli', base: 6.5 },
    gold: { n: 'Nether gold', base: 4 }
  };
  btn.addEventListener('click', function () {
    var ore = ((document.getElementById('foOre') || {}).value || 'diamond');
    var f = parseInt((document.getElementById('foFortune') || {}).value, 10) || 0;
    var r = ORES[ore] || ORES.diamond;
    var avg = r.base * (MULT[f] || 1);
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">≈' + avg.toFixed(1) + ' per block</div>' +
      '<div>' + r.n + ' + Fortune ' + (f || '—') + ' → <b>≈' + avg.toFixed(1) + '</b> per block (' + (MULT[f] || 1).toFixed(2) + '×).</div>' +
      '<div class="dim">Statistical average — actual per-block drops vary.</div>';
  });
})();
