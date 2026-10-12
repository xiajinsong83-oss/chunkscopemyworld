(function () {
  'use strict';
  var ui = document.getElementById('beResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var base = (document.getElementById('beBase') || {}).value || 'white';
    var pat = (document.getElementById('bePattern') || {}).value || 'stripe';
    var col = (document.getElementById('beColor') || {}).value || 'red';
    var P = { stripe: 'stripe', cross: 'cross', border: 'border', chief: 'chief', diagonal: 'diagonal_right', skull: 'skull' };
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">' + col + ' ' + P[pat] + ' on ' + base + ' banner</div>' +
      '<div>Loom recipe: <b>' + base + ' banner</b> + <b>' + P[pat] + ' banner pattern</b> + <b>' + col + ' dye</b></div>' +
      '<div class="dim">Java command:</div>' +
      '<pre>/give @p minecraft:' + base + '_banner{BlockEntityTag:{Patterns:[{Pattern:"' + P[pat].toUpperCase() + '",Color:' + col.toUpperCase() + '}]}}</pre>' +
      '<div class="dim">Add up to 6 patterns by repeating layers; the last pattern renders on top.</div>';
  });
})();
