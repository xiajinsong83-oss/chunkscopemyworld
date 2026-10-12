(function () {
  'use strict';
  var ui = document.getElementById('npResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var dir = (document.getElementById('npDir') || {}).value || 'to-nether';
    var x = Math.floor(parseFloat((document.getElementById('npX') || {}).value) || 0);
    var z = Math.floor(parseFloat((document.getElementById('npZ') || {}).value) || 0);
    var nx = dir === 'to-nether' ? Math.floor(x / 8) : x * 8;
    var nz = dir === 'to-nether' ? Math.floor(z / 8) : z * 8;
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">' + nx + ', ' + nz + '</div>' +
      '<div>Nether portals link using the 1:8 ratio. Build the ' +
      (dir === 'to-nether' ? 'Nether' : 'Overworld') + ' portal at these coordinates.</div>' +
      '<div class="dim">Keep portals 1,024 Overworld blocks apart to avoid cross-linking.</div>';
  });
})();
