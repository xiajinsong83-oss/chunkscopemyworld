/* redstone-clock-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('rcResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var segs = parseInt((document.getElementById('rcSegs') || {}).value, 10) || 5;
    var delay = parseInt((document.getElementById('rcDelay') || {}).value, 10) || 2;
    segs = Math.max(1, Math.min(200, segs)); delay = Math.max(1, Math.min(4, delay));
    var rt = 2 * segs * delay;
    var sec = rt * 0.1;
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">Period: ' + rt + ' redstone ticks = ' + sec.toFixed(1) + 's</div>' +
      '<div>' + segs + ' segments × ' + delay + ' ticks × 2 = <b>' + rt + ' rt</b> (' + sec.toFixed(1) + 's) per full cycle.</div>' +
      '<div class="dim">A comparator/observer loop sustains the pulse.</div>';
  });
})();
