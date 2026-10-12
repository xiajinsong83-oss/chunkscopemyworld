/* biome-climate-matcher.js — ChunkScope climate-window biome match. */
(function () {
  'use strict';
  var ui = document.getElementById('bcResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  function match(t, h, c) {
    if (c <= 0.15) return 'Ocean / Beach';
    if (t < 0.5) return 'Snowy Plains';
    if (t > 0.6 && h > 0.35) return 'Desert';
    if (t > 0.55 && h > 0.6) return 'Jungle';
    if (h > 0.6) return 'Swamp';
    if (h > 0.4 && t >= 0.3 && t <= 0.6) return 'Flower Forest';
    if (h > 0.35 && t >= 0.12 && t <= 0.62) return 'Cherry Grove';
    if (t >= 0.1 && t <= 0.5 && h >= 0.15 && h <= 0.55) return 'Plains';
    return 'Plains (fallback)';
  }
  btn.addEventListener('click', function () {
    var t = parseFloat((document.getElementById('bcTemp') || {}).value);
    var h = parseFloat((document.getElementById('bcHum') || {}).value);
    var c = parseFloat((document.getElementById('bcCont') || {}).value);
    if (isNaN(t) || isNaN(h) || isNaN(c)) { t = 0.4; h = 0.5; c = 0.5; }
    t = Math.max(0, Math.min(1, t)); h = Math.max(0, Math.min(1, h)); c = Math.max(0, Math.min(1, c));
    var b = match(t, h, c);
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">' + b + '</div>' +
      '<div>temp ' + t.toFixed(2) + ', humidity ' + h.toFixed(2) + ', continent ' + c.toFixed(2) + ' → <b>' + b + '</b>.</div>' +
      '<div class="dim">Approximate model — confirm with F3 in-game.</div>';
  });
})();
