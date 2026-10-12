/* nether-fortress-finder.js */
(function () {
  'use strict';
  var ui = document.getElementById('nfResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">Use /locate to find one</div>' +
      '<div>Run <code class="cmd">/locate structure minecraft:fortress</code> in the nether (cheats on).</div>' +
      '<div>Fortresses give <b>wither skeletons</b> (skulls → netherite/beacons) and <b>blaze spawners</b> (rods → potions/end).</div>' +
      '<div class="dim">Fly high in the nether to spot the dark-brick fortress; multiple exist per world.</div>';
  });
})();
