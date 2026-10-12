(function () {
  'use strict';
  var ui = document.getElementById('fwResult');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !btn) return;
  var DYE = { red: 'red_dye', green: 'green_dye', gold: 'gold_dye', blue: 'blue_dye', purple: 'purple_dye', cyan: 'cyan_dye' };
  var SHAPE = { small: '', large: 'large_ball', star: 'star', creeper: 'creeper', burst: 'burst' };
  btn.addEventListener('click', function () {
    var fl = (document.getElementById('fwFlight') || {}).value || '1';
    var col = (document.getElementById('fwColor') || {}).value || 'red';
    var shp = (document.getElementById('fwShape') || {}).value || 'small';
    var nbt = 'Flight:' + fl + ',Explosions:[{Colors:[' + DYE[col].replace('_dye', '').toUpperCase() + ']' +
      (SHAPE[shp] ? ',Shape:' + SHAPE[shp].toUpperCase() : '') + '}]';
    ui.classList.add('show');
    ui.innerHTML =
      '<div class="big">Firework rocket · flight ' + fl + '</div>' +
      '<div class="dim">Java / Bedrock command:</div>' +
      '<pre>/give @p minecraft:firework_rocket{Fireworks:{' + nbt + '}} 64</pre>' +
      '<div class="dim">Elytra tip: flight 3 + any explosion keeps you flying; craft with 3 gunpowder + 7 paper for a full stack.</div>';
  });
})();
