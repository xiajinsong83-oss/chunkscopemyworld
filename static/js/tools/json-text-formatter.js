/* json-text-formatter.js */
(function () {
  'use strict';
  var ui = document.getElementById('jfResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var raw = ((document.getElementById('jfText') || {}).value || '');
    var lines = raw.split('\n').filter(function (l) { return l.trim() !== ''; });
    var comps = lines.map(function (l) { return '{\"text\":\"' + l.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '\"}'; });
    var joined = comps.join(',');
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">JSON components</div><code class="cmd">' + joined + '</code>' +
      '<div class="dim">Escape your quotes & backslashes. Paste into custom_name / lore / pages.</div>';
  });
})();
