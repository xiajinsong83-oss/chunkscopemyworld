/* particle-command-generator.js */
(function () {
  'use strict';
  var ui = document.getElementById('pcResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  var dustRow = document.getElementById('pcDustRow');
  var pcType = document.getElementById('pcType');
  function toggleDust() {
    if (dustRow) dustRow.style.display = (pcType.value === 'minecraft:dust') ? '' : 'none';
  }
  if (pcType) pcType.addEventListener('change', toggleDust);
  toggleDust();
  btn.addEventListener('click', function () {
    var type = (pcType || {}).value || 'minecraft:flame';
    var count = parseInt((document.getElementById('pcCount') || {}).value, 10) || 20;
    count = Math.max(1, Math.min(500, count));
    var cmd;
    if (type === 'minecraft:dust') {
      var r = parseInt((document.getElementById('pcR') || {}).value, 10) || 255;
      var g = parseInt((document.getElementById('pcG') || {}).value, 10) || 100;
      var b = parseInt((document.getElementById('pcB') || {}).value, 10) || 50;
      var size = parseFloat((document.getElementById('pcSize') || {}).value) || 1;
      cmd = '/particle minecraft:dust ' + (r / 255).toFixed(2) + ' ' + (g / 255).toFixed(2) + ' ' + (b / 255).toFixed(2) + ' ' + size + ' ~ ~1 ~ 0 0 0 0 ' + count;
    } else {
      cmd = '/particle ' + type + ' ~ ~1 ~ 0 0 0 0 ' + count;
    }
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">Command</div><code class="cmd">' + cmd + '</code>' +
      '<div class="dim">Add <b>force</b> before the count to show particles to everyone.</div>';
  });
})();
