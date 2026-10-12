/* motd-builder.js */
(function () {
  'use strict';
  var ui = document.getElementById('mbResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var l1 = ((document.getElementById('mbLine1') || {}).value || '').trim();
    var c1 = ((document.getElementById('mbColor1') || {}).value || 'gold');
    var l2 = ((document.getElementById('mbLine2') || {}).value || '').trim();
    var c2 = ((document.getElementById('mbColor2') || {}).value || 'gray');
    var c1j = JSON.stringify({ text: l1 || 'Welcome', color: c1 });
    var c2j = JSON.stringify({ text: l2 || '', color: c2 });
    var motd = c1j + '\\n' + c2j;
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">MOTD JSON</div><code class="cmd">motd=' + motd + '</code>' +
      '<div class="dim">Paste into server.properties. Java edition only.</div>';
  });
})();
