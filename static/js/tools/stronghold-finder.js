/* stronghold-finder.js */
(function () {
  'use strict';
  var ui = document.getElementById('shResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var seed = ((document.getElementById('shSeed') || {}).value || '').trim();
    ui.classList.add('show');
    var locate = seed ? '/locate structure minecraft:stronghold' : '';
    ui.innerHTML =
      '<div class="big">3 strongholds, ~1280 blocks out</div>' +
      '<div>Three End-portal strongholds generate on a ring ~1280 blocks (80 chunks) from spawn, spaced 120° apart.</div>' +
      (locate ? '<div>Run <code class="cmd">' + locate + '</code> in-game (cheats on) for the nearest.</div>' : '<div>Enter your seed and run /locate in-game (cheats on) for the nearest.</div>') +
      '<div class="dim">Ender Eyes fly toward the nearest stronghold — dig when they point straight down.</div>';
  });
})();
