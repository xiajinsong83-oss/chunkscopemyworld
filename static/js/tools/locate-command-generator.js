/* locate-command-generator.js */
(function () {
  'use strict';
  var ui = document.getElementById('lcResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var s = ((document.getElementById('lcStruct') || {}).value || 'village');
    var cmd = '/locate structure minecraft:' + s;
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">Command</div><code class="cmd">' + cmd + '</code>' +
      '<div class="dim">Prints the nearest structure coordinates. Cheats/operator required.</div>';
  });
})();
