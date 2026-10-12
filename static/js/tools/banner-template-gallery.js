/* banner-template-gallery.js — classic banner designs. */
(function () {
  'use strict';
  var ui = document.getElementById('bgResult');
  var search = document.getElementById('bgSearch');
  var TEMPLATES = [
    { name: 'Creeper Face', base: 'Green', patterns: 'base(green) + creeper(skull, dark green)', id: 'creeper' },
    { name: 'Classic Skull', base: 'White', patterns: 'base(white) + skull(black)', id: 'skull' },
    { name: 'Sunrise / Stripe', base: 'Yellow', patterns: 'base(yellow) + stripe_center(red)', id: 'stripe' },
    { name: 'Flower Field', base: 'Lime', patterns: 'base(lime) + flower(white)', id: 'flower' },
    { name: 'Cross of Honor', base: 'White', patterns: 'base(white) + cross(blue) + bordure(blue)', id: 'cross' },
    { name: 'Royal Tri-Color', base: 'Blue', patterns: 'base(blue) + stripe_center(white) + bordure(gold)', id: 'royal' },
    { name: 'Spooky Skull', base: 'Black', patterns: 'base(black) + skull(white) + bordure(gray)', id: 'spooky' },
    { name: 'Guard Stripe', base: 'Gray', patterns: 'base(gray) + stripe_center(black) + creeper(white)', id: 'guard' }
  ];
  function render(q) {
    var list = TEMPLATES.filter(function (t) { return !q || t.name.toLowerCase().indexOf(q) >= 0 || t.patterns.indexOf(q) >= 0; });
    ui.classList.add('show');
    if (!list.length) { ui.innerHTML = '<div class="sf-empty">No templates match "' + q + '".</div>'; return; }
    var h = '<div class="sf-summary">' + list.length + ' classic design' + (list.length > 1 ? 's' : '') + ':</div>';
    list.forEach(function (t) {
      h += '<div class="sf-row"><div class="sf-main"><b>' + t.name + '</b>' +
        '<div class="sf-sub">' + t.patterns + '</div></div>' +
        '<a class="sf-copy" href="/apps/creative-tools/banner-editor/#template=' + t.id + '">Customize in Banner Editor →</a></div>';
    });
    ui.innerHTML = h;
  }
  if (search) search.addEventListener('input', function () { render(search.value.toLowerCase().trim()); });
  render('');
})();
