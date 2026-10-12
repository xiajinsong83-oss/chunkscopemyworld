/* bastion-finder.js */
(function () {
  'use strict';
  var ui = document.getElementById('bfResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">Use /locate to find one</div>' +
      '<div>Run <code class="cmd">/locate structure minecraft:bastion_remnant</code> in the nether (cheats on).</div>' +
      '<div>Bastions hold the richest <b>netherite</b> loot (ancient debris, netherite gear) plus gold.</div>' +
      '<div class="dim">Wear gold armor — opening chests angers piglins otherwise.</div>';
  });
})();
