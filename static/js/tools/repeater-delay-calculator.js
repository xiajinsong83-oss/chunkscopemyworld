/* repeater-delay-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('rdResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var d = parseInt((document.getElementById('rdDelay') || {}).value, 10) || 4;
    var sec = d * 0.1;
    var gameTicks = d * 2;
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">' + d + ' redstone tick' + (d > 1 ? 's' : '') + ' = ' + gameTicks + ' game tick' + (gameTicks > 1 ? 's' : '') + ' = ' + sec.toFixed(1) + 's</div>' +
      '<div>A redstone tick = 2 game ticks = 0.1s (20 per second).</div>' +
      '<div class="dim">Chain repeaters for longer delays: 10 at setting 1 ≈ 1 second.</div>';
  });
})();
