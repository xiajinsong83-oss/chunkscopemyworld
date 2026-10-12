/* ticking-area-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('taResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var d = parseInt((document.getElementById('taDist') || {}).value, 10) || 8;
    d = Math.max(1, Math.min(32, d));
    var side = 2 * d + 1;
    var chunks = side * side;
    var blocks = side * 16;
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">' + side + '×' + side + ' chunks = ' + chunks + '</div>' +
      '<div>Simulation distance ' + d + ' ticks <b>' + chunks + '</b> chunks (' + side + '×' + side + '), ' + blocks + '×' + blocks + ' blocks around the player.</div>' +
      '<div class="dim">Keep redstone/farms within this range or they freeze.</div>';
  });
})();
