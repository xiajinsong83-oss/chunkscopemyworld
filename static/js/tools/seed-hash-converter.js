/* seed-hash-converter.js — Java String.hashCode() seed conversion. */
(function () {
  'use strict';
  var ui = document.getElementById('shcResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  function javaHash(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) { h = ((h * 31) + s.charCodeAt(i)) | 0; }
    return h; /* signed 32-bit */
  }
  btn.addEventListener('click', function () {
    var raw = ((document.getElementById('shcSeed') || {}).value || '').trim();
    ui.classList.add('show');
    if (/^-?\d+$/.test(raw)) {
      ui.innerHTML = '<div class="big">Numeric seed</div><div><code class="cmd">' + raw + '</code> is already numeric — used as-is.</div>';
      return;
    }
    var h = javaHash(raw);
    var u = h >>> 0;
    ui.innerHTML =
      '<div class="big">' + h + '</div>' +
      '<div>String.hashCode() of "<b>' + raw + '</b>" → <code class="cmd">' + h + '</code> (unsigned: ' + u + ').</div>' +
      '<div>Same world as typing the number. Try in <a class="sf-copy" href="/apps/seed-map/#seed=' + h + '&layers=s">Seed Map →</a></div>';
  });
})();
