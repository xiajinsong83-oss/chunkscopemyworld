/* armor-trim-designer.js */
(function () {
  'use strict';
  var ui = document.getElementById('atResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var armor = ((document.getElementById('atArmor') || {}).value || 'minecraft:iron_helmet');
    var mat = ((document.getElementById('atMat') || {}).value || 'amethyst');
    var pat = ((document.getElementById('atPat') || {}).value || 'sentry');
    var cmd = '/give @p ' + armor + '[trim={material:"minecraft:' + mat + '",pattern:"minecraft:' + pat + '"}] 1';
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">Command</div><code class="cmd">' + cmd + '</code>' +
      '<div class="dim">Java 1.20+. Cosmetic trim — armor stats unchanged.</div>';
  });
})();
