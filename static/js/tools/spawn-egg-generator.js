/* spawn-egg-generator.js */
(function () {
  'use strict';
  var ui = document.getElementById('seResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var mob = ((document.getElementById('seMob') || {}).value || 'creeper');
    var count = parseInt((document.getElementById('seCount') || {}).value, 10) || 1;
    count = Math.max(1, Math.min(64, count));
    var cmd = '/give @p minecraft:' + mob + '_spawn_egg ' + count;
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">Command</div><code class="cmd">' + cmd + '</code>' +
      '<div class="dim">Java & Bedrock. Place the egg to spawn the mob.</div>';
  });
})();
