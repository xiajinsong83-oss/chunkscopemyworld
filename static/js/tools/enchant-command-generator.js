/* enchant-command-generator.js */
(function () {
  'use strict';
  var ui = document.getElementById('ecResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var ench = ((document.getElementById('ecEnch') || {}).value || 'sharpness');
    var level = parseInt((document.getElementById('ecLevel') || {}).value, 10) || 5;
    level = Math.max(1, Math.min(255, level));
    var id = ench === 'silktouch' ? 'silk_touch' : ench;
    var cmd = '/enchant @p minecraft:' + id + ' ' + level;
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">Command</div><code class="cmd">' + cmd + '</code>' +
      '<div class="dim">Java 1.21. Hold the item in your main hand before running.</div>';
  });
})();
