/* item-sorter-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('isResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var types = parseInt((document.getElementById('isTypes') || {}).value, 10) || 20;
    var stack = parseInt((document.getElementById('isStack') || {}).value, 10) || 64;
    types = Math.max(1, Math.min(200, types));
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">' + types + ' filter hopper' + (types > 1 ? 's' : '') + '</div>' +
      '<div>One filter hopper + chest per type → a sorter wall <b>' + types + ' block' + (types > 1 ? 's' : '') + ' wide</b>, ~2 tall (hopper + chest + comparator + torch).</div>' +
      '<div>Total storage: <b>' + (types * 27).toLocaleString() + ' slots</b> (1 chest each, stack ' + stack + ').</div>' +
      '<div class="dim">Non-stackables need a dedicated slot each — add a row for them.</div>';
  });
})();
