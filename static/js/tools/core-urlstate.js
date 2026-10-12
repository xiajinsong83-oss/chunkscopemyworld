/* ChunkScope core-urlstate.js
 * URL hash state sync: seed / version / center coords / zoom.
 * Shareable links like:  #seed=12345&ver=java&x=0&z=0&zoom=16
 */
(function (root) {
  'use strict';
  var timer = null;

  function read() {
    var out = {};
    var h = window.location.hash.replace(/^#/, '');
    if (!h) return out;
    h.split('&').forEach(function (pair) {
      var i = pair.indexOf('=');
      if (i < 0) return;
      var k = pair.slice(0, i).trim();
      var v = pair.slice(i + 1).trim();
      if (k) {
        try { v = decodeURIComponent(v); } catch (e) { /* keep raw on malformed */ }
        out[k] = v;
      }
    });
    return out;
  }

  /* Write a partial state, merged with the current hash. Debounced 250 ms. */
  function write(partial) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      var cur = read();
      var merged = {};
      var k, v;
      for (k in cur) merged[k] = cur[k];
      for (k in partial) {
        v = partial[k];
        if (v === undefined || v === null || v === '') delete merged[k];
        else merged[k] = String(v);
      }
      var keys = Object.keys(merged);
      if (!keys.length) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
        return;
      }
      var q = keys.map(function (key) { return key + '=' + encodeURIComponent(merged[key]); }).join('&');
      history.replaceState(null, '', '#' + q);
    }, 250);
  }

  root.URLState = { read: read, write: write };
})(window);
