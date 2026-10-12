/* map-art-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('maResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  var ZOOM = { 0: 128, 1: 256, 2: 512, 3: 1024, 4: 2048 };
  btn.addEventListener('click', function () {
    var w = parseInt((document.getElementById('maW') || {}).value, 10) || 128;
    var h = parseInt((document.getElementById('maH') || {}).value, 10) || 128;
    var z = ((document.getElementById('maZoom') || {}).value || '0');
    var per = ZOOM[z] || 128;
    w = Math.max(1, Math.min(4096, w)); h = Math.max(1, Math.min(4096, h));
    var mx = Math.ceil(w / per), my = Math.ceil(h / per);
    var maps = mx * my;
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">' + maps + ' map' + (maps > 1 ? 's' : '') + ' needed</div>' +
      '<div>' + w + '×' + h + ' blocks at zoom ' + z + ' (' + per + ' blocks/map) → ' + mx + ' × ' + my + ' maps.</div>' +
      '<div class="dim">Align your build to a 128-block-aligned grid to avoid map splits.</div>';
  });
})();
