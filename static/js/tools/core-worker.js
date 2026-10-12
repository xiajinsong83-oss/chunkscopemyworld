/* ChunkScope core-worker.js
 * Generic Web Worker message protocol for chunk computation.
 *
 * Main -> worker:  {id, type:'compute', payload:{...}}
 * Worker -> main:  {id, type:'progress', done, total}
 *                  {id, type:'result', data}
 *                  {id, type:'error', message}
 *
 * One in-flight request per worker; the renderer serialises view changes.
 */
(function (root) {
  'use strict';

  function create(workerUrl) {
    var w = new Worker(workerUrl);
    return w;
  }

  function request(worker, payload, onProgress, onResult, onError) {
    var id = (Math.random() * 1e9) | 0;
    worker.postMessage({ id: id, type: 'compute', payload: payload });
    worker.onmessage = function (ev) {
      var m = ev.data;
      if (!m || m.id !== id) return;
      if (m.type === 'progress' && onProgress) onProgress(m.done, m.total);
      else if (m.type === 'result' && onResult) onResult(m.data);
      else if (m.type === 'error' && onError) onError(m.message);
    };
    return id;
  }

  root.ComputeWorker = { create: create, request: request };
})(window);
