/* comparator-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('ccResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var rear = parseInt((document.getElementById('ccRear') || {}).value, 10) || 0;
    var side = parseInt((document.getElementById('ccSide') || {}).value, 10) || 0;
    var mode = ((document.getElementById('ccMode') || {}).value || 'compare');
    rear = Math.max(0, Math.min(15, rear)); side = Math.max(0, Math.min(15, side));
    var out;
    if (mode === 'subtract') out = Math.max(0, rear - side);
    else out = (rear >= side) ? rear : 0;
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">Output: ' + out + '</div>' +
      '<div>' + (mode === 'subtract' ? 'Subtract: max(0, ' + rear + ' − ' + side + ')' : 'Compare: rear ' + rear + ' ≥ side ' + side + ' → ' + out) + '</div>' +
      '<div class="dim">Signal strength is 0–15.</div>';
  });
})();
