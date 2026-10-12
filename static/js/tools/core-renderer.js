/* ChunkScope core-renderer.js
 * Reusable Canvas map renderer: pan / zoom (wheel + pinch + drag) / debounced
 * view-change callbacks / grid + axis labels / chunk-space coordinate helpers.
 * Coordinate space: X/Z are CHUNK indices. scale = pixels per chunk.
 */
(function (root) {
  'use strict';

  var MIN_SCALE = 2;    // px per chunk (overview)
  var MAX_SCALE = 48;   // px per chunk (close-up)
  var VIEW_DEBOUNCE = 300;

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  function ChunkMapRenderer(canvas, opts) {
    opts = opts || {};
    this.cv = canvas;
    this.ctx = canvas.getContext('2d');
    this.centerX = (opts.centerX === undefined ? 0 : opts.centerX);
    this.centerZ = (opts.centerZ === undefined ? 0 : opts.centerZ);
    this.scale = clamp(opts.scale || 16, MIN_SCALE, MAX_SCALE);
    this.onDraw = opts.onDraw || function () {};
    this.onViewChange = opts.onViewChange || function () {};
    this.onStats = opts.onStats || function () {};
    this.dpr = (typeof window.devicePixelRatio !== 'undefined' ? window.devicePixelRatio : 1) || 1;
    this.gridOn = (opts.gridOn === undefined ? true : opts.gridOn);
    this._vt = null;
    this._pt = null;
    this._pinch = null;
    this._bind();
    this._resize();
    this.draw();
  }

  ChunkMapRenderer.prototype._resize = function () {
    var w = this.cv.clientWidth || 600;
    var h = Math.max(320, Math.round(w * 0.62));
    var dpr = this.dpr;
    this.cw = w;
    this.ch = h;
    this.cv.style.height = h + 'px';
    this.cv.width = Math.round(w * dpr);
    this.cv.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  ChunkMapRenderer.prototype._bind = function () {
    var self = this;
    var cv = this.cv;

    cv.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      cv.setPointerCapture(e.pointerId);
      self._pt = self._pt || {};
      self._pt[e.pointerId] = { x: e.offsetX, y: e.offsetY };
      if (Object.keys(self._pt).length === 2) {
        var ids = Object.keys(self._pt);
        self._pinch = {
          d: Math.hypot(self._pt[ids[0]].x - self._pt[ids[1]].x, self._pt[ids[0]].y - self._pt[ids[1]].y),
          scale: self.scale
        };
      }
    });

    cv.addEventListener('pointermove', function (e) {
      if (!self._pt) return;
      var ids = Object.keys(self._pt);
      if (ids.length === 1 && self._pt[e.pointerId] !== undefined) {
        var prev = self._pt[e.pointerId];
        var dx = e.offsetX - prev.x;
        var dy = e.offsetY - prev.y;
        self._pt[e.pointerId] = { x: e.offsetX, y: e.offsetY };
        self.centerX -= dx / self.scale;
        self.centerZ -= dy / self.scale;
        self.draw();
        self._emitStats();
      } else if (ids.length === 2 && self._pinch) {
        var a = self._pt[ids[0]];
        var b = self._pt[ids[1]];
        var d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d > 0 && self._pinch.d > 0) {
          var factor = d / self._pinch.d;
          var midX = (a.x + b.x) / 2;
          var midY = (a.y + b.y) / 2;
          self.zoomAt(midX, midY, factor, false);
        }
        self._pinch.d = d;
      }
    });

    function endPointer(e) {
      if (!self._pt) return;
      delete self._pt[e.pointerId];
      if (Object.keys(self._pt).length === 0) {
        self._scheduleView();
      }
    }
    cv.addEventListener('pointerup', endPointer);
    cv.addEventListener('pointercancel', endPointer);

    cv.addEventListener('wheel', function (e) {
      e.preventDefault();
      var factor = Math.pow(1.0015, -e.deltaY);
      self.zoomAt(e.offsetX, e.offsetY, factor, true);
    }, { passive: false });

    cv.addEventListener('dblclick', function (e) {
      self.zoomAt(e.offsetX, e.offsetY, 2, true);
    });

    window.addEventListener('resize', function () {
      self._resize();
      self.draw();
    });
  };

  /* Zoom keeping the world point under (px, py) fixed. */
  ChunkMapRenderer.prototype.zoomAt = function (px, py, factor, schedule) {
    var halfW = this.cw / 2;
    var halfH = this.ch / 2;
    var wx = this.centerX + (px - halfW) / this.scale;
    var wz = this.centerZ + (py - halfH) / this.scale;
    this.scale = clamp(this.scale * factor, MIN_SCALE, MAX_SCALE);
    this.centerX = wx - (px - halfW) / this.scale;
    this.centerZ = wz - (py - halfH) / this.scale;
    this.draw();
    this._emitStats();
    if (schedule) this._scheduleView();
  };

  ChunkMapRenderer.prototype._scheduleView = function () {
    var self = this;
    if (this._vt) clearTimeout(this._vt);
    this._vt = setTimeout(function () {
      self._vt = null;
      self.onViewChange(self.centerX, self.centerZ, self.scale);
    }, VIEW_DEBOUNCE);
  };

  ChunkMapRenderer.prototype._emitStats = function () {
    var r = this.getVisibleRange();
    this.onStats(r, this.centerX, this.centerZ, this.scale);
  };

  /* Visible chunk range (rounded outward). */
  ChunkMapRenderer.prototype.getVisibleRange = function () {
    var halfW = (this.cw / 2) / this.scale;
    var halfH = (this.ch / 2) / this.scale;
    return {
      minX: Math.floor(this.centerX - halfW) - 1,
      maxX: Math.ceil(this.centerX + halfW) + 1,
      minZ: Math.floor(this.centerZ - halfH) - 1,
      maxZ: Math.ceil(this.centerZ + halfH) + 1
    };
  };

  /* Chunk index -> screen px. */
  ChunkMapRenderer.prototype.chunkToScreen = function (cx, cz) {
    return {
      x: (cx - this.centerX) * this.scale + this.cw / 2,
      y: (cz - this.centerZ) * this.scale + this.ch / 2
    };
  };

  ChunkMapRenderer.prototype.draw = function () {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.cw, this.ch);
    this.onDraw(this);
    if (this.gridOn) this._drawGrid();
  };

  ChunkMapRenderer.prototype._drawGrid = function () {
    var ctx = this.ctx;
    var r = this.getVisibleRange();
    var step = this.scale >= 16 ? 1 : this.scale >= 6 ? 2 : this.scale >= 3 ? 4 : 8;
    var firstX = Math.ceil(r.minX / step) * step;
    var firstZ = Math.ceil(r.minZ / step) * step;

    ctx.strokeStyle = 'rgba(180,210,180,0.18)';
    ctx.lineWidth = 1;
    ctx.font = '10px Nunito, Arial, sans-serif';
    ctx.fillStyle = 'rgba(200,225,200,0.55)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    var i, p, label;
    for (i = firstX; i <= r.maxX; i += step) {
      p = this.chunkToScreen(i, 0);
      if (p.x < -20 || p.x > this.cw + 20) continue;
      ctx.beginPath();
      ctx.moveTo(Math.round(p.x) + 0.5, 0);
      ctx.lineTo(Math.round(p.x) + 0.5, this.ch);
      ctx.stroke();
      if (this.scale >= 6) {
        label = i * 16;
        ctx.fillText(label, p.x, 6);
      }
    }
    for (i = firstZ; i <= r.maxZ; i += step) {
      p = this.chunkToScreen(0, i);
      if (p.y < -20 || p.y > this.ch + 20) continue;
      ctx.beginPath();
      ctx.moveTo(0, Math.round(p.y) + 0.5);
      ctx.lineTo(this.cw, Math.round(p.y) + 0.5);
      ctx.stroke();
      if (this.scale >= 6) {
        label = i * 16;
        ctx.fillText(label, 6, p.y);
      }
    }
  };

  root.ChunkMapRenderer = ChunkMapRenderer;
})(window);
