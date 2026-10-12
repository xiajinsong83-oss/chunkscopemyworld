/* armor-stand-poser.js */
(function () {
  'use strict';
  var ui = document.getElementById('asResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  var POSES = {
    stand: {},
    sit: { RightLeg: '[-10f,0f,0f]', LeftLeg: '[-10f,0f,0f]' },
    salute: { RightArm: '[90f,0f,0f]' },
    tpose: { RightArm: '[-90f,0f,0f]', LeftArm: '[90f,0f,0f]' },
    wave: { RightArm: '[90f,0f,0f]', LeftArm: '[180f,0f,0f]' }
  };
  btn.addEventListener('click', function () {
    var pose = ((document.getElementById('asPose') || {}).value || 'stand');
    var plate = ((document.getElementById('asPlate') || {}).value || '1') === '0';
    var arms = ((document.getElementById('asArms') || {}).value || '1') === '1';
    var nbt = [];
    var p = POSES[pose] || {};
    var keys = Object.keys(p);
    if (keys.length) nbt.push('Pose:{' + keys.map(function (k) { return k + ':' + p[k]; }).join(',') + '}');
    if (arms) nbt.push('ShowArms:1b');
    if (plate) nbt.push('NoBasePlate:1b');
    var cmd = '/summon minecraft:armor_stand ~ ~1 ~ {' + nbt.join(',') + '}';
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">Command</div><code class="cmd">' + cmd + '</code>' +
      '<div class="dim">Java 1.21. Fine-tune angles in the Pose NBT if needed.</div>';
  });
})();
