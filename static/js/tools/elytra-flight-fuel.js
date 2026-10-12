/* elytra-flight-fuel.js */
(function () {
  'use strict';
  var ui = document.getElementById('efResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var n = parseInt((document.getElementById('efFireworks') || {}).value, 10) || 64;
    var dur = parseFloat((document.getElementById('efDuration') || {}).value) || 1.8;
    n = Math.max(1, Math.min(256, n));
    var sec = n * dur;
    var min = sec / 60;
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">≈' + Math.round(sec) + 's of glide (' + min.toFixed(1) + ' min)</div>' +
      '<div>' + n + ' rockets × ≈' + dur + 's each ≈ <b>' + Math.round(sec) + 's</b> near-continuous flight.</div>' +
      '<div class="dim">Estimate — glide speed & terrain affect actual time.</div>';
  });
})();
