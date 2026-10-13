/* heightmap-reader.js — ChunkScope
 * Approximate terrain height field around the world spawn for a seed.
 *
 * IMPORTANT: this is an EXPERIMENTAL approximation. It uses the same
 * deterministic noise model as core-biome-noise (splitmix32 + value noise + fbm)
 * to render a smooth RELATIVE height field. It does NOT reproduce Mojang's real
 * terrain generator — heights and biome labels are suggestive, not exact.
 * Always verify in-game. Never represented as exact Minecraft terrain.
 */
(function () {
  'use strict';
  var ui = document.getElementById('hmResult');
  var wrap = document.getElementById('hmCanvasWrap');
  var info = document.getElementById('hmInfo');
  var btn = document.querySelector('.tool-ui button[data-run="js"]');
  if (!ui || !wrap || !btn) return;

  var seedInput = document.getElementById('hmSeed');
  var canvas = document.createElement('canvas');
  canvas.id = 'hmCanvas';
  canvas.width = 480;
  canvas.height = 480;
  wrap.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  /* --- deterministic noise (mirror of core-biome-noise) --- */
  function hash2(x, z, salt) {
    var h = (x * 374761393) ^ (z * 668265263) ^ (salt * 1274126177);
    h = h | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }
  function smooth(t) { return t * t * (3 - 2 * t); }
  function vnoise(x, z, salt) {
    var x0 = Math.floor(x), z0 = Math.floor(z);
    var fx = x - x0, fz = z - z0;
    var sx = smooth(fx), sz = smooth(fz);
    var a = hash2(x0, z0, salt);
    var b = hash2(x0 + 1, z0, salt);
    var c = hash2(x0, z0 + 1, salt);
    var d = hash2(x0 + 1, z0 + 1, salt);
    return a + (b - a) * sx + ((c + (d - c) * sx) - (a + (b - a) * sx)) * sz;
  }
  function fbm(x, z, salt, octaves, lac, gain) {
    var amp = 1, freq = 1, sum = 0, norm = 0, i;
    for (i = 0; i < octaves; i++) {
      sum += amp * vnoise(x * freq, z * freq, salt + i * 7919);
      norm += amp;
      amp *= gain;
      freq *= lac;
    }
    return sum / norm;
  }

  /* --- color ramp: low(water/deep) -> high(snow peak) --- */
  function ramp(v) {
    var stops = [
      [0.00, '#12325a'], [0.15, '#2e6db0'], [0.30, '#3f9a7d'],
      [0.50, '#6fae4d'], [0.70, '#8a6f3d'], [0.85, '#b5a27a'], [1.00, '#e8e6e0']
    ];
    var i = 0;
    while (i < stops.length - 2 && v > stops[i + 1][0]) i++;
    var lo = stops[i], hi = stops[i + 1];
    var t = Math.min(1, Math.max(0, (v - lo[0]) / (hi[0] - lo[0])));
    var hex = function (c) { return [parseInt(c.substr(1, 2), 16), parseInt(c.substr(3, 2), 16), parseInt(c.substr(5, 2), 16)]; };
    var a = hex(lo[1]), b = hex(hi[1]);
    return 'rgb(' + Math.round(a[0] + (b[0] - a[0]) * t) + ',' + Math.round(a[1] + (b[1] - a[1]) * t) + ',' + Math.round(a[2] + (b[2] - a[2]) * t) + ')';
  }

  var SIZE = 21;          /* chunks across (-10..10) */
  var STEP = 6;           /* blocks per sample */
  var SAMP = Math.floor((SIZE * 16) / STEP) + 1;
  var grid = [];

  function seedSalt(seed) {
    /* mirror core-biome-noise: stable small salt from the (BigInt) seed */
    return Number(seed % 1000003n);
  }

  function render(seed) {
    var salt = seedSalt(seed);
    var i, x, z, v;
    grid = [];
    for (i = 0; i < SAMP * SAMP; i++) grid.push(0);
    for (z = 0; z < SAMP; z++) {
      for (x = 0; x < SAMP; x++) {
        var bx = (x - (SAMP - 1) / 2) * STEP;
        var bz = (z - (SAMP - 1) / 2) * STEP;
        var c = fbm(bx / 700, bz / 700, 3000 + salt * 61, 2, 2.0, 0.6);   /* land/sea bands */
        var detail = fbm(bx / 110, bz / 110, 5000 + salt * 83, 4, 2.1, 0.5); /* ridges */
        v = 0.35 * (c * 0.5 + 0.5) + 0.65 * detail;   /* [0,1] relative height */
        grid[z * SAMP + x] = Math.min(1, Math.max(0, v));
      }
    }
    var px = canvas.width / SAMP;
    for (z = 0; z < SAMP; z++) {
      for (x = 0; x < SAMP; x++) {
        ctx.fillStyle = ramp(grid[z * SAMP + x]);
        ctx.fillRect(x * px, z * px, Math.ceil(px), Math.ceil(px));
      }
    }
    /* mark spawn chunk (0,0) centre */
    var cx = canvas.width / 2, cy = canvas.height / 2;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = '#ff5252';
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px system-ui';
    ctx.fillText('Spawn', cx + 10, cy - 8);
  }

  function blockAt(ev) {
    var r = canvas.getBoundingClientRect();
    var x = (ev.clientX - r.left) * (canvas.width / r.width);
    var z = (ev.clientY - r.top) * (canvas.height / r.height);
    var gx = Math.floor(x / (canvas.width / SAMP));
    var gz = Math.floor(z / (canvas.height / SAMP));
    if (gx < 0 || gz < 0 || gx >= SAMP || gz >= SAMP) return null;
    return { gx: gx, gz: gz };
  }

  function biomeAt(seed, bx, bz) {
    var cl = window.BiomeClim && window.BiomeClim.sampleClimate(seed, bx, bz);
    if (!cl) return null;
    var list = window.BiomeClim.BIOMES, i, hit = null;
    for (i = 0; i < list.length; i++) {
      if (window.BiomeClim.biomeMatch(list[i].id, cl)) { hit = list[i].name; break; }
    }
    return { cl: cl, hit: hit };
  }

  canvas.addEventListener('click', function (ev) {
    var b = blockAt(ev);
    if (!b || !info) return;
    var bx = (b.gx - (SAMP - 1) / 2) * STEP;
    var bz = (b.gz - (SAMP - 1) / 2) * STEP;
    var v = grid[b.gz * SAMP + b.gx];
    var Y = Math.round(40 + v * 90);
    var seed = MCAlgo.parseSeed(seedInput.value);
    var bio = biomeAt(seed, bx, bz);
    var t = bio && bio.cl ? 'T ' + (bio.cl.t).toFixed(2) + ' · H ' + (bio.cl.h).toFixed(2) : '';
    info.innerHTML = '<b>Block (' + bx + ', ' + bz + ')</b> · approx Y <b>' + Y + '</b> · ' +
      (bio && bio.hit ? '<b>' + bio.hit + '</b>' : 'Unclassified') +
      (t ? ' <span class="hm-clim">(' + t + ')</span>' : '') +
      ' <span class="hm-hint">· verify in-game</span>';
  });

  btn.addEventListener('click', function () {
    var raw = (seedInput.value || '12345').trim();
    var seed = MCAlgo.parseSeed(raw);
    ui.classList.add('show');
    render(seed);
    info.innerHTML = '<b>Seed ' + raw + '</b> — terrain height field around spawn (chunk 0,0 marked). Click any pixel for approx Y & biome. <span class="hm-hint">Experimental approximation — verify in-game.</span>';
  });
})();
