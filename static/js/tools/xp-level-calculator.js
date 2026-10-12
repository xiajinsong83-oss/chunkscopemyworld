/* xp-level-calculator.js — exact Minecraft level↔XP formula (Java & Bedrock 1.18+). */
(function () {
  'use strict';
  var ui = document.getElementById('xpResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  function totalXP(level) {
    if (level < 16) return level * level + 6 * level;
    if (level <= 30) return level * level - 14 * level + 160;
    return level * level - 44 * level + 760;
  }
  function levelFromXP(xp) {
    var lo = 0, hi = 1000;
    while (lo < hi) { var mid = (lo + hi + 1) >> 1; if (totalXP(mid) <= xp) lo = mid; else hi = mid - 1; }
    return lo;
  }
  btn.addEventListener('click', function () {
    var mode = (document.getElementById('xpMode') || {}).value || 'level';
    var val = parseInt((document.getElementById('xpVal') || {}).value, 10) || 0;
    val = Math.max(0, Math.min(9999, val));
    ui.classList.add('show');
    if (mode === 'level') {
      var xp = totalXP(val);
      ui.innerHTML =
        '<div class="big">' + val.toLocaleString() + ' levels = ' + xp.toLocaleString() + ' XP</div>' +
        '<div>Total experience points needed to reach level <b>' + val + '</b> from level 0.</div>' +
        '<div class="dim">Enchanting 3 times at level ' + val + ' costs ' + (3 * val) + ' levels of your XP pool.</div>';
    } else {
      var lv = levelFromXP(val), spent = totalXP(lv), left = val - spent;
      ui.innerHTML =
        '<div class="big">' + val.toLocaleString() + ' XP = level ' + lv + '</div>' +
        '<div>You reach level <b>' + lv + '</b>, with <b>' + left.toLocaleString() + '</b> XP left over.</div>' +
        '<div class="dim">Exact formula (Java & Bedrock 1.18+).</div>';
    }
  });
})();
