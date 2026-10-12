/* ChunkScope ore-finder.js
 * Ore distribution by Y level (Java 1.18+ worldgen constants).
 * Data from Minecraft's official Caves & Cliffs ore distribution notes and
 * community-verified ore level charts. Pure data render on main thread.
 */
(function () {
  'use strict';
  var ui = document.getElementById('oreUi');
  if (!ui) return;
  var cv = document.getElementById('oreChart');
  if (!cv) return;

  /* --- ore facts: {range:[minY,maxY], peaks:[[y,rel],...]} --- */
  var ORES = [
    { id: 'diamond', name: 'Diamond', color: '#6fe6ff', range: [-64, 16], peaks: [[-59, 100]], biome: '', tip: 'Triangular peak at Y=-59, densest just above bedrock. Air-exposed veins are often removed — branch mine in solid stone.' },
    { id: 'iron', name: 'Iron', color: '#e6c29c', range: [-24, 320], peaks: [[15, 100], [232, 70]], biome: '', tip: 'Two peaks: Y=15 (most below Y=72) and Y=232 (mountains). The deeper peak is great for large iron farms.' },
    { id: 'coal', name: 'Coal', color: '#434343', range: [0, 320], peaks: [[96, 100]], biome: '', tip: 'Common Y=0–96; more coal the higher you go in mountains. None below Y=0.' },
    { id: 'copper', name: 'Copper', color: '#ff9b85', range: [0, 96], peaks: [[48, 100]], biome: '', tip: 'Strong bias to Y=48. Larger veins in dripstone caves and near deepslate copper.' },
    { id: 'gold', name: 'Gold', color: '#ffe680', range: [-64, 30], peaks: [[-16, 100]], biome: 'Extra veins in Badlands', tip: 'Peaks at Y=-16. Badlands get extra gold regardless of depth.' },
    { id: 'lapis', name: 'Lapis Lazuli', color: '#3f7fe0', range: [-64, 64], peaks: [[0, 100]], biome: '', tip: 'Widest band: Y=-64 to 64, densest right at Y=0.' },
    { id: 'redstone', name: 'Redstone', color: '#e84242', range: [-64, 16], peaks: [[-59, 100]], biome: '', tip: 'Shares diamond\'s band. Mine both together at Y=-59 / branch line Y=-54.' },
    { id: 'emerald', name: 'Emerald', color: '#55d16b', range: [0, 128], peaks: [[90, 100]], biome: 'Mountains only', tip: 'Generates only in mountain biomes (e.g. peaks, groves, slopes). Best around Y=90.' },
    { id: 'debris', name: 'Ancient Debris', color: '#7a4a2e', range: [8, 22], peaks: [[15, 100]], biome: 'Nether only', tip: 'Nether-exclusive. Concentrated Y=8–22, peak ~Y=15. ~1 vein per chunk.' }
  ];

  /* --- UI refs --- */
  var chipWrap = document.getElementById('oreChips');
  var canvasWrap = document.getElementById('oreChartWrap');
  var infoEl = document.getElementById('oreInfo');
  var hoverEl = document.getElementById('oreHover');
  var allToggle = document.getElementById('oreAll');

  var dpr = window.devicePixelRatio || 1;
  var Y_MIN = -64, Y_MAX = 320;
  var MARGIN_L = 34, MARGIN_B = 22, MARGIN_T = 10, MARGIN_R = 12;
  var hoverY = null;
  var activeId = 'diamond';
  var showAll = false;

  /* --- canvas sizing --- */
  function resize() {
    var w = cv.clientWidth || 620;
    var h = Math.max(360, Math.round(w * 0.62));
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    cv.style.height = h + 'px';
  }
  function geom() {
    var w = cv.clientWidth || 620;
    var h = Math.max(360, Math.round(w * 0.62));
    var plotW = w - MARGIN_L - MARGIN_R;
    var plotH = h - MARGIN_T - MARGIN_B;
    return { w: w, h: h, pw: plotW, ph: plotH };
  }
  function yToPx(y, g) { return MARGIN_T + (Y_MAX - y) / (Y_MAX - Y_MIN) * g.ph; }
  function pToPx(p, g) { return MARGIN_L + p / 100 * g.pw; }
  function pxToY(px, g) { return Y_MAX - (px - MARGIN_T) / g.ph * (Y_MAX - Y_MIN); }

  function curve(o, g) {
    // build polygon points from peaks
    var pts = [[o.range[0], 0]];
    var i;
    for (i = 0; i < o.peaks.length; i++) {
      var py = o.peaks[i][0], ph = o.peaks[i][1];
      pts.push([py, ph]);
    }
    pts.push([o.range[1], 0]);
    return pts.map(function (pt) { return [pToPx(pt[1], g), yToPx(pt[0], g)]; });
  }

  function draw() {
    var g = geom();
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, g.w, g.h);

    // deepslate region (Y<0)
    ctx.fillStyle = 'rgba(40,45,40,0.85)';
    ctx.fillRect(MARGIN_L, yToPx(0, g), g.pw, yToPx(Y_MIN, g) - yToPx(0, g));
    ctx.strokeStyle = 'rgba(180,200,180,0.25)';
    ctx.strokeRect(MARGIN_L, yToPx(0, g), g.pw, yToPx(Y_MIN, g) - yToPx(0, g));

    // y grid + labels
    var ctx2 = ctx;
    ctx2.font = '10px Nunito, Arial, sans-serif';
    ctx2.fillStyle = 'rgba(200,225,200,0.55)';
    ctx2.textAlign = 'right';
    ctx2.textBaseline = 'middle';
    var yTicks = [-64, 0, 32, 64, 96, 128, 192, 256, 320];
    yTicks.forEach(function (y) {
      var py = yToPx(y, g);
      ctx2.strokeStyle = y === 0 ? 'rgba(255,82,82,0.4)' : 'rgba(180,200,180,0.15)';
      ctx2.beginPath(); ctx2.moveTo(MARGIN_L, py); ctx2.lineTo(MARGIN_L + g.pw, py); ctx2.stroke();
      ctx2.fillText('Y=' + y, MARGIN_L - 6, py);
    });
    ctx2.fillText('Y', MARGIN_L - 20, MARGIN_T + 6);
    ctx2.fillText('relative frequency →', MARGIN_L + g.pw / 2, g.h - 8);
    ctx2.textAlign = 'left';

    // deepslate label
    ctx2.fillStyle = 'rgba(180,200,180,0.5)';
    ctx2.fillText('Deepslate layer', MARGIN_L + 6, yToPx(-10, g));

    // curve(s)
    var list = showAll ? ORES : ORES.filter(function (o) { return o.id === activeId; });
    list.forEach(function (o) {
      var pts = curve(o, g);
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.strokeStyle = o.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = showAll ? 0.9 : 1;
      ctx.stroke();
      ctx.fillStyle = o.color;
      ctx.globalAlpha = showAll ? 0.10 : 0.16;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.lineTo(pts[pts.length - 1][0], yToPx(o.range[1], g));
      ctx.lineTo(pts[0][0], yToPx(o.range[0], g));
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // hover marker
    if (hoverY !== null) {
      var hy = yToPx(hoverY, g);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(MARGIN_L, hy); ctx.lineTo(MARGIN_L + g.pw, hy); ctx.stroke();
    }
  }

  /* --- chips --- */
  chipWrap.innerHTML = '';
  ORES.forEach(function (o) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'ore-chip' + (o.id === activeId ? ' active' : '');
    b.style.setProperty('--oc', o.color);
    b.textContent = o.name;
    b.addEventListener('click', function () {
      activeId = o.id;
      showAll = false;
      allToggle.checked = false;
      refreshChips();
      setInfo(o);
      hoverY = o.peaks[o.peaks.length - 1][0];
      draw();
    });
    chipWrap.appendChild(b);
  });

  function refreshChips() {
    chipWrap.querySelectorAll('.ore-chip').forEach(function (b) {
      b.classList.remove('active');
    });
    var el = Array.prototype.find.call(chipWrap.querySelectorAll('.ore-chip'), function (b) { return b.textContent === ORES.find(function (o) { return o.id === activeId; }).name; });
    if (el) el.classList.add('active');
  }

  /* --- info card --- */
  function setInfo(o) {
    var best = o.peaks[o.peaks.length - 1][0];
    var block = best < 0 ? 'deepslate ' : 'stone ';
    infoEl.innerHTML =
      '<div class="ore-head"><span class="ore-swatch" style="background:' + o.color + '"></span><b>' + o.name + '</b>' +
      (o.biome ? ' <span class="ore-biome">' + o.biome + '</span>' : '') + '</div>' +
      '<div class="ore-line">Best Y: <b>' + best + '</b> · Range: Y ' + o.range[0] + ' to ' + o.range[1] + '</div>' +
      '<div class="ore-line">Mine ' + block + 'here for the highest yield.</div>' +
      '<div class="ore-tip">' + o.tip + '</div>';
  }

  /* --- hover --- */
  cv.addEventListener('mousemove', function (e) {
    var rect = cv.getBoundingClientRect();
    var g = geom();
    var y = Math.round(pxToY(e.clientY - rect.top, g));
    if (y < Y_MIN || y > Y_MAX) { hoverY = null; hoverEl.textContent = ''; }
    else {
      hoverY = y;
      var block = y < 0 ? 'Deepslate' : 'Stone';
      var probs = ORES.map(function (o) {
        // find probability at this y from peak triangle(s)
        var p = probAt(o, y);
        return p > 0 ? o.name + ' ' + Math.round(p) + '%' : null;
      }).filter(Boolean);
      hoverEl.textContent = 'Y=' + y + ' (' + block + ') — ' + (probs.length ? probs.join(' · ') : 'no ore');
    }
    draw();
  });
  cv.addEventListener('mouseleave', function () { hoverY = null; hoverEl.textContent = ''; draw(); });

  function probAt(o, y) {
    if (y < o.range[0] || y > o.range[1]) return 0;
    // single closest peak triangle
    var best = 0, i;
    for (i = 0; i < o.peaks.length; i++) {
      var py = o.peaks[i][0], ph = o.peaks[i][1];
      var lo = i === 0 ? o.range[0] : o.peaks[i - 1][0];
      var hi = i === o.peaks.length - 1 ? o.range[1] : o.peaks[i + 1][0];
      var p;
      if (y <= py) p = (y - lo) / (py - lo) * ph;
      else p = (hi - y) / (hi - py) * ph;
      if (p > best) best = p;
    }
    return Math.max(0, Math.min(100, best));
  }

  /* --- all-toggle --- */
  if (allToggle) {
    allToggle.addEventListener('change', function () {
      showAll = allToggle.checked;
      if (showAll) {
        infoEl.innerHTML = '<div class="ore-head"><b>All ores</b></div>' +
          '<div class="ore-line">Peaks: Diamond & Redstone -59 · Iron 15 & 232 · Coal 96 · Copper 48 · Gold -16 · Lapis 0 · Emerald 90 (mountains) · Debris 15 (Nether)</div>';
      } else {
        setInfo(ORES.find(function (o) { return o.id === activeId; }));
      }
      draw();
    });
  }

  /* --- init --- */
  window.addEventListener('resize', function () { resize(); draw(); });
  resize();
  setInfo(ORES[0]);
  hoverY = -59;
  draw();
})();
