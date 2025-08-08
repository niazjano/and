// assets/js/main.js
(function () {
  // Active nav
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a => {
    const h = (a.getAttribute('href') || '').toLowerCase();
    if (h.endsWith(here)) a.classList.add('active');
  });

  // Lightbox (projects) – create simple overlay only if .lb-trigger exists
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-lb]');
    if (!a) return;
    e.preventDefault();
    const src = a.getAttribute('href') || a.querySelector('img')?.src;
    if (!src) return;
    const wrap = document.createElement('div');
    wrap.className = 'lightbox';
    wrap.innerHTML = `<div class="lb-inner"><img src="${src}" alt=""><button class="lb-close" aria-label="Close">×</button></div>`;
    wrap.addEventListener('click', (ev)=>{ if (ev.target===wrap || ev.target.classList.contains('lb-close')) wrap.remove(); });
    document.body.appendChild(wrap);
  });

  // Simple form handler (contact) – optional
  const form = document.querySelector('form[data-simple-form]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const action = form.getAttribute('action') || form.action;
      const method = form.getAttribute('method') || 'POST';
      try {
        const res = await fetch(action, { method, body: fd, headers: { 'Accept': 'application/json' } });
        if (res.ok) { form.reset(); alert('Thanks! We will get back to you as soon as possible.'); }
        else alert('Something went wrong. Please try again.');
      } catch { alert('Network error. Please try again.'); }
    });
  }
})();
