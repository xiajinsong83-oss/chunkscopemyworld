/* villager-trade-calculator.js */
(function () {
  'use strict';
  var ui = document.getElementById('vtResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  btn.addEventListener('click', function () {
    var em = parseInt((document.getElementById('vtEmeralds') || {}).value, 10) || 0;
    var price = parseInt((document.getElementById('vtPrice') || {}).value, 10) || 1;
    var stock = parseInt((document.getElementById('vtStock') || {}).value, 10) || 1;
    em = Math.max(0, Math.min(9999, em)); price = Math.max(1, Math.min(64, price)); stock = Math.max(1, Math.min(12, stock));
    var trades = Math.floor(em / price);
    var items = trades * stock;
    var restocks = Math.ceil(trades / 4); /* each villager restocks ~2x/day, ~4 trades per cycle */
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">' + trades + ' trade' + (trades > 1 ? 's' : '') + ' → ' + items + ' items</div>' +
      '<div>' + em.toLocaleString() + ' emeralds at ' + price + '/each → <b>' + trades + '</b> trades (×' + stock + ' stock = ' + items + ' items).</div>' +
      '<div>Expect ~<b>' + restocks + '</b> restock' + (restocks > 1 ? 's' : '') + ' to clear it all (villagers restock ~2×/day via workstation).</div>' +
      '<div class="dim">Prices fluctuate with demand; curing a zombie villager gives permanent discounts.</div>';
  });
})();
