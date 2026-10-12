(function () {
  'use strict';

  // Toast
  var toast = document.getElementById('toast');
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }

  // FAQ accordion
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function (item) {
    var btn = item.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      items.forEach(function (o) { o.classList.remove('open'); o.querySelector('button').setAttribute('aria-expanded', 'false'); });
      if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  // Version tabs (tool pages): toggle edition-specific blocks
  var verTabs = document.getElementById('verTabs');
  if (verTabs) {
    verTabs.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        verTabs.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var ed = btn.getAttribute('data-edition');
        document.querySelectorAll('[data-edition-panel]').forEach(function (p) {
          p.style.display = (p.getAttribute('data-edition-panel') === ed) ? '' : 'none';
        });
      });
    });
  }

  // Search (homepage)
  var input = document.getElementById('searchInput');
  var sug = document.getElementById('suggest');
  var form = document.getElementById('searchForm');
  if (input && sug) {
    function getData() {
      var el = document.getElementById('searchData');
      if (!el) return [];
      try { return JSON.parse(el.textContent); } catch (e) { return []; }
    }
    function render(list) {
      sug.innerHTML = '';
      if (!list.length) {
        var d = document.createElement('div'); d.className = 'none';
        d.textContent = 'No matches — try "seed map", "iron farm" or "enchant"';
        sug.appendChild(d);
      } else {
        list.slice(0, 8).forEach(function (t) {
          var a = document.createElement('a');
          a.href = t.url; a.setAttribute('role', 'option');
          var tag = document.createElement('span'); tag.className = 'tag'; tag.textContent = t.cat;
          var txt = document.createElement('span'); txt.textContent = t.title;
          a.appendChild(tag); a.appendChild(txt);
          sug.appendChild(a);
        });
      }
    }
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      if (!q) { sug.classList.remove('open'); return; }
      var hits = getData().filter(function (t) { return (t.title + ' ' + t.cat).toLowerCase().indexOf(q) !== -1; });
      render(hits);
      sug.classList.add('open');
    });
    input.addEventListener('focus', function () { if (input.value.trim()) input.dispatchEvent(new Event('input')); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.hero-search')) sug.classList.remove('open'); });
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var q = input.value.trim().toLowerCase();
        if (!q) { showToast('Type a tool or guide name to search'); return; }
        var hits = getData().filter(function (t) { return (t.title + ' ' + t.cat).toLowerCase().indexOf(q) !== -1; });
        render(hits); sug.classList.add('open');
      });
    }
  }

  // Newsletter
  var newsForm = document.getElementById('newsForm');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('Thanks for subscribing!');
      newsForm.querySelector('input').value = '';
    });
  }

  // Tool run buttons with data-output target
  document.querySelectorAll('[data-run]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-output') || 'toolResult');
      var msg = btn.getAttribute('data-run') || '';
      if (target) {
        target.classList.add('show');
        if (msg && !btn.getAttribute('data-js')) target.innerHTML = msg;
      }
    });
  });
})();
