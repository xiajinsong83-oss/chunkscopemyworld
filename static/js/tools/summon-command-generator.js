/* summon-command-generator.js */
(function () {
  'use strict';
  var ui = document.getElementById('scResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var entity = ((document.getElementById('scEntity') || {}).value || 'minecraft:creeper');
    var name = ((document.getElementById('scName') || {}).value || '').trim();
    var ai = ((document.getElementById('scAI') || {}).value || '1') === '0' ? '0b' : '1b';
    var nbt = [];
    if (name) nbt.push("CustomName:'\\\"" + name.replace(/"/g, '') + "\\\"'");
    nbt.push('NoAI:' + ai);
    var cmd = '/summon ' + entity + ' ~ ~1 ~ {' + nbt.join(',') + '}';
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">Command</div><code class="cmd">' + cmd + '</code>' +
      '<div class="dim">Java 1.21. Entity appears ~1 block above your position.</div>';
  });
})();
