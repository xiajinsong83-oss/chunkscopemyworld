/* loot-table-generator.js */
(function () {
  'use strict';
  var ui = document.getElementById('ltResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var item = ((document.getElementById('ltItem') || {}).value || 'minecraft:diamond');
    var min = parseInt((document.getElementById('ltMin') || {}).value, 10) || 1;
    var max = parseInt((document.getElementById('ltMax') || {}).value, 10) || 3;
    var rolls = parseInt((document.getElementById('ltRolls') || {}).value, 10) || 1;
    min = Math.max(1, Math.min(64, min)); max = Math.max(min, Math.min(64, max)); rolls = Math.max(1, Math.min(10, rolls));
    var json = {
      type: 'minecraft:chest',
      pools: [{
        rolls: rolls,
        entries: [{ type: 'minecraft:item', name: item, weight: 1 }],
        functions: [{ function: 'minecraft:set_count', count: { min: min, max: max } }]
      }]
    };
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">Loot table JSON</div><code class="cmd">' + JSON.stringify(json) + '</code>' +
      '<div class="dim">Save to data/mypack/loot_table/blocks/&lt;name&gt;.json in a datapack.</div>';
  });
})();
