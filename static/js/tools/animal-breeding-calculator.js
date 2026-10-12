/* animal-breeding-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('abResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  var FOOD = { cow: 'wheat', sheep: 'wheat', pig: 'carrot/potato/beet', chicken: 'seeds', rabbit: 'carrot/dandelion' };
  btn.addEventListener('click', function () {
    var a = ((document.getElementById('abAnimal') || {}).value || 'cow');
    var start = parseInt((document.getElementById('abStart') || {}).value, 10) || 2;
    var target = parseInt((document.getElementById('abTarget') || {}).value, 10) || 10;
    start = Math.max(2, Math.min(64, start)); target = Math.max(start, Math.min(128, target));
    var babies = target - start;
    var food = babies * 2;
    var fullMature = 20;
    var rounds = Math.ceil(babies / Math.max(1, Math.floor(start / 2))); // how many breeding waves
    var estMinutes = rounds * 5 + fullMature;
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">' + babies + ' babies · ' + food + ' ' + FOOD[a] + '</div>' +
      '<div>Breed <b>' + start + '</b> → <b>' + target + '</b>: feed <b>' + food + '</b> food (2 per baby).</div>' +
      '<div>~' + rounds + ' breeding wave' + (rounds > 1 ? 's' : '') + ' (5-min cooldown each) + 20 min growth ≈ <b>' + estMinutes + ' min</b> to a full herd.</div>' +
      '<div class="dim">Food types: ' + FOOD[a] + '. Babies mature in ~20 min (halved if fed while young).</div>';
  });
})();
