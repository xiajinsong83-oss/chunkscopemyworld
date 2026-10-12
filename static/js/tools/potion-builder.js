(function () {
  'use strict';
  var ui = document.getElementById('pbResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  var INGR = {
    speed: 'sugar', strength: 'blaze powder', regeneration: 'ghast tear',
    'fire-resistance': 'magma cream', invisibility: 'golden carrot',
    poison: 'spider eye', weakness: 'fermented spider eye', 'slow-falling': 'phantom membrane'
  };
  btn.addEventListener('click', function () {
    var fx = (document.getElementById('pbEffect') || {}).value || 'speed';
    var lvl = (document.getElementById('pbLevel') || {}).value || '1';
    var dur = (document.getElementById('pbDuration') || {}).value || 'base';
    var ing = INGR[fx] || 'sugar';
    var name = fx.replace(/-/g, ' ');
    var steps =
      '1. Water bottle + <b>nether wart</b> → awkward potion<br>' +
      '2. Awkward + <b>' + ing + '</b> → Potion of ' + name.charAt(0).toUpperCase() + name.slice(1) + ' (I)<br>';
    if (lvl === '2') steps += '3. + <b>glowstone dust</b> → Level II (cannot be extended)<br>';
    else if (dur === 'extended') steps += '3. + <b>redstone</b> → Extended (8:00)<br>';
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">Potion of ' + name.charAt(0).toUpperCase() + name.slice(1) + (lvl === '2' ? ' II' : '') + '</div>' +
      '<div>' + steps + '</div>' +
      '<div class="dim">Optional: gunpowder → splash · dragon\'s breath → lingering.</div>';
  });
})();
