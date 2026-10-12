/* beacon-range-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('bcResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  var TIERS = {
    1: { blocks: 9,  radius: 20, dur: 9 },
    2: { blocks: 34, radius: 30, dur: 17 },
    3: { blocks: 83, radius: 40, dur: 26 },
    4: { blocks: 164, radius: 50, dur: 34 }
  };
  btn.addEventListener('click', function () {
    var lv = ((document.getElementById('bcLevel') || {}).value || '4');
    var t = TIERS[lv] || TIERS[4];
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">Radius: ' + t.radius + ' blocks · ' + t.dur + 's effect</div>' +
      '<div>Level ' + lv + ' pyramid = <b>' + t.blocks + ' mineral blocks</b> (' + (t.blocks === 9 ? '3×3' : t.blocks === 34 ? '5×5+3×3' : t.blocks === 83 ? '7×7+5×5+3×3' : '9×9+7×7+5×5+3×3') + ')</div>' +
      '<div class="dim">Radius ≈ level × 10 blocks; duration is approximate and re-triggered on walking into range.</div>';
  });
})();
