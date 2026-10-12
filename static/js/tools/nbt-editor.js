/* nbt-editor.js */
(function () {
  'use strict';
  var ui = document.getElementById('neResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var item = ((document.getElementById('neItem') || {}).value || 'minecraft:diamond_sword');
    var name = ((document.getElementById('neName') || {}).value || '').trim();
    var lore = ((document.getElementById('neLore') || {}).value || '').trim();
    var parts = [];
    if (name) parts.push("custom_name='{\\\"text\\\":\\\"" + name.replace(/"/g, '') + "\\\",\\\"italic\\\":false}'");
    if (lore) {
      var lines = lore.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
      var loreArr = lines.map(function (l) { return '{\\\"text\\\":\\\"' + l.replace(/"/g, '') + '\\\"}'; }).join(',');
      parts.push("lore=['" + loreArr + "']");
    }
    var cmd = '/give @p ' + item + (parts.length ? '[' + parts.join(',') + ']' : '') + ' 1';
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">Command</div><code class="cmd">' + cmd + '</code>' +
      '<div class="dim">Java 1.20.5+ components. Bedrock uses different NBT.</div>';
  });
})();
