/* dye-color-mixer.js — Minecraft dye recipes (1.14+). */
(function () {
  'use strict';
  var ui = document.getElementById('dmResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  var RECIPES = [
    { a: 'red', b: 'yellow', out: 'Orange', recipe: 'Red + Yellow' },
    { a: 'blue', b: 'white', out: 'Light Blue', recipe: 'Blue + White' },
    { a: 'green', b: 'white', out: 'Lime', recipe: 'Green + White' },
    { a: 'red', b: 'white', out: 'Pink', recipe: 'Red + White' },
    { a: 'black', b: 'white', out: 'Gray', recipe: 'Black + White' },
    { a: 'green', b: 'blue', out: 'Cyan', recipe: 'Green + Blue' },
    { a: 'red', b: 'blue', out: 'Purple', recipe: 'Red + Blue' },
    { a: 'purple', b: 'white', out: 'Magenta', recipe: 'Purple + White' }
  ];
  var NAME = { red: 'Red', blue: 'Blue', yellow: 'Yellow', green: 'Green', white: 'White', black: 'Black', purple: 'Purple', gray: 'Gray' };
  btn.addEventListener('click', function () {
    var a = ((document.getElementById('dmA') || {}).value || 'red');
    var b = ((document.getElementById('dmB') || {}).value || 'yellow');
    ui.classList.add('show');
    if (a === b) {
      ui.innerHTML = '<div class="big">Same dye</div><div>' + NAME[a] + ' + ' + NAME[b] + ' just gives more ' + NAME[a] + ' dye — no new color.</div>';
      return;
    }
    var hit = RECIPES.filter(function (r) { return (r.a === a && r.b === b) || (r.a === b && r.b === a); });
    if (hit.length) {
      var r = hit[0];
      ui.innerHTML = '<div class="big">' + r.out + ' Dye</div><div>Recipe: <b>' + r.recipe + '</b> → ' + r.out + ' dye.</div>' +
        '<div class="dim">From Minecraft crafting (1.14+). Order doesn\'t matter.</div>';
    } else {
      ui.innerHTML = '<div class="big">No recipe</div><div>' + NAME[a] + ' + ' + NAME[b] + ' has no direct dye recipe — try adding a third dye (e.g. white).</div>' +
        '<div class="dim">Check the table below for valid two-dye recipes.</div>';
    }
  });
})();
