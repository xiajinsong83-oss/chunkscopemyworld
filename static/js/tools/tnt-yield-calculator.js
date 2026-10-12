/* tnt-yield-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('tyResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  var MAT = {
    dirt:     { radius: 6.5, blocks: 200, label: 'dirt / grass' },
    stone:    { radius: 4.5, blocks: 90,  label: 'stone / cobble' },
    obsidian: { radius: 0,   blocks: 0,   label: 'obsidian (immune)' }
  };
  btn.addEventListener('click', function () {
    var mode = ((document.getElementById('tyMode') || {}).value || 'single');
    var count = parseInt((document.getElementById('tyCount') || {}).value, 10) || 1;
    var block = ((document.getElementById('tyBlock') || {}).value || 'dirt');
    count = Math.max(1, Math.min(100, count));
    var m = MAT[block] || MAT.dirt;
    ui.classList.add('show');
    if (m.radius === 0) {
      ui.innerHTML = '<div class="big">Obsidian: immune</div><div>Obsidian and bedrock resist all TNT blast damage.</div>';
      return;
    }
    var effRadius = m.radius * (mode === 'chain' ? Math.min(1.6, 1 + count * 0.12) : 1);
    var blocks = Math.round(m.blocks * count * (mode === 'chain' ? 0.85 : 1));
    ui.innerHTML =
      '<div class="big">~' + blocks.toLocaleString() + ' blocks destroyed</div>' +
      '<div>' + count + ' TNT (' + (mode === 'chain' ? 'chained' : 'single') + ') vs ' + m.label + ' → blast radius ≈ <b>' + effRadius.toFixed(1) + '</b> blocks.</div>' +
      '<div class="dim">Rough estimate — chains overlap blast areas, so it\'s not a clean multiplier.</div>';
  });
})();
