// assets/js/main.js
(function () {
  // Active nav
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if (href && href.endsWith(here)) a.classList.add('active');
  });

  // Simple form success (for contact.html if using Formspree)
  const form = document.querySelector('form[data-simple-form]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const action = form.getAttribute('action');
      const method = form.getAttribute('method') || 'POST';
      try {
        const res = await fetch(action, { method, body: fd, headers: { 'Accept': 'application/json' } });
        if (res.ok) {
          form.reset();
          alert('Thanks! We will get back to you as soon as possible.');
        } else { alert('Something went wrong. Please try again.'); }
      } catch { alert('Network error. Please try again.'); }
    });
  }
})();
