/* give-command-generator.js */
(function () {
  'use strict';
  var ui = document.getElementById('gcResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var item = ((document.getElementById('gcItem') || {}).value || 'minecraft:diamond_pickaxe');
    var count = parseInt((document.getElementById('gcCount') || {}).value, 10) || 1;
    var ench = ((document.getElementById('gcEnch') || {}).value || '');
    count = Math.max(1, Math.min(64, count));
    var cmd = '/give @p ' + item;
    if (ench) {
      var parts = ench.split('=');
      cmd += '[enchantments={id:"minecraft:' + parts[0] + '",level:' + parts[1] + '}]';
    }
    cmd += ' ' + count;
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">Command</div><code class="cmd">' + cmd + '</code>' +
      '<div class="dim">Java 1.20.5+ components syntax. For Bedrock, use the base give without the [enchantments=…] part.</div>';
  });
})();
