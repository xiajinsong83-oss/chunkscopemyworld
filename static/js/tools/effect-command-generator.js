/* effect-command-generator.js */
(function () {
  'use strict';
  var ui = document.getElementById('efResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var effect = ((document.getElementById('efEffect') || {}).value || 'speed');
    var dur = parseInt((document.getElementById('efDur') || {}).value, 10) || 60;
    var amp = parseInt((document.getElementById('efAmp') || {}).value, 10) || 0;
    var hide = ((document.getElementById('efHide') || {}).value || 'false') === 'true';
    dur = Math.max(1, Math.min(100000, dur)); amp = Math.max(0, Math.min(255, amp));
    var cmd = '/effect give @p minecraft:' + effect + ' ' + dur + ' ' + amp + ' ' + hide;
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">Command</div><code class="cmd">' + cmd + '</code>' +
      '<div class="dim">Java 1.21. Amplifier 0 = level I.</div>';
  });
})();
