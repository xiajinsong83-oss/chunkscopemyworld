/* chunk-boundary-finder.js */
(function () {
  'use strict';
  var ui = document.getElementById('cbResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var x = parseInt((document.getElementById('cbX') || {}).value, 10) || 0;
    var z = parseInt((document.getElementById('cbZ') || {}).value, 10) || 0;
    var cx = Math.floor(x / 16), cz = Math.floor(z / 16);
    var minX = cx * 16, minZ = cz * 16;
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">Chunk (' + cx + ', ' + cz + ')</div>' +
      '<div>Block (' + x + ', ' + z + ') is in chunk (<b>' + cx + '</b>, <b>' + cz + '</b>), spanning X ' + minX + '–' + (minX + 15) + ', Z ' + minZ + '–' + (minZ + 15) + '.</div>' +
      '<div class="dim">Chunks are 16×16 on both editions.</div>';
  });
})();
