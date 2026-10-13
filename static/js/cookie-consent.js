(function () {
  var KEY = 'cs-cookie-consent';
  var el = document.getElementById('cookie-consent');
  var btn = document.getElementById('cookie-accept');
  if (!el || !btn) return;
  var accepted = false;
  try { accepted = localStorage.getItem(KEY) === 'accepted'; } catch (e) {}
  if (accepted) { el.remove(); return; }
  btn.addEventListener('click', function () {
    try { localStorage.setItem(KEY, 'accepted'); } catch (e) {}
    el.classList.add('cookie-hidden');
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 450);
  });
})();
