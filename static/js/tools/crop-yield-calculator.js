/* crop-yield-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('cyResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  var DROPS = { wheat: 1, carrot: 1, potato: 1, beetroot: 1 };
  btn.addEventListener('click', function () {
    var crop = (document.getElementById('cyCrop') || {}).value || 'wheat';
    var w = parseInt((document.getElementById('cyW') || {}).value, 10) || 9;
    var l = parseInt((document.getElementById('cyL') || {}).value, 10) || 9;
    var water = ((document.getElementById('cyWater') || {}).value || 'yes') === 'yes';
    w = Math.max(1, Math.min(64, w)); l = Math.max(1, Math.min(64, l));
    var tiles = w * l;
    var cycleMin = water ? 10 : 14; // hydrated ~10min, dry ~14min
    var perCycle = tiles * DROPS[crop];
    var perHour = Math.round(perCycle * (60 / cycleMin));
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">~' + perCycle.toLocaleString() + ' crops per cycle</div>' +
      '<div>' + w + '×' + l + ' field (' + tiles.toLocaleString() + ' tiles, ' + (water ? 'watered' : 'dry') + ')</div>' +
      '<div>Harvest ~every <b>' + cycleMin + ' min</b> → about <b>' + perHour.toLocaleString() + '</b> / hour (' + (perHour / 64).toFixed(1) + ' stacks)</div>' +
      '<div class="dim">Estimate — varies with light level and growth randomness.</div>';
  });
})();
