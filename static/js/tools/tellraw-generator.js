/* tellraw-generator.js */
(function () {
  'use strict';
  var ui = document.getElementById('tgResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var text = ((document.getElementById('tgText') || {}).value || 'Hello').trim();
    var color = ((document.getElementById('tgColor') || {}).value || 'white');
    var bold = ((document.getElementById('tgBold') || {}).value || 'false') === 'true';
    var action = ((document.getElementById('tgClick') || {}).value || '');
    var clickVal = ((document.getElementById('tgClickVal') || {}).value || '').trim();
    var obj = { text: text, color: color };
    if (bold) obj.bold = true;
    if (action && clickVal) obj.clickEvent = { action: action, value: clickVal };
    var cmd = '/tellraw @a ' + JSON.stringify(obj);
    ui.classList.add('show');
    ui.innerHTML = '<div class="big">Command</div><code class="cmd">' + cmd + '</code>' +
      '<div class="dim">Java 1.21. Run in chat or a command block.</div>';
  });
})();
