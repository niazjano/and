// assets/js/autoImages.js
(function () {
  const S = { sm:'800x600', md:'1200x900', lg:'1600x1200' };
  const u = (topic, sig, size) =>
    `https://source.unsplash.com/${size}/?${encodeURIComponent(topic+', home renovation, interior, uk')}&sig=${sig}`;
  const ph = (size, t='Adrian & Sons') => `https://placehold.co/${size}?text=${encodeURIComponent(t)}`;

  function fill(img) {
    if (img.getAttribute('src')) return; // already local
    const t = img.dataset.imgTopic || 'home renovation';
    const s = img.dataset.imgIndex || Math.floor(Math.random()*10000);
    const sm = u(t, s, S.sm), md = u(t, s, S.md), lg = u(t, s, S.lg);
    img.loading = 'lazy'; img.decoding = 'async';
    img.src = sm; img.srcset = `${sm} 800w, ${md} 1200w, ${lg} 1600w`;
    img.sizes = img.getAttribute('sizes') || '(max-width: 768px) 100vw, 50vw';
    img.onerror = () => { img.src = ph(S.md); img.srcset = ''; };
  }

  const init = () => document.querySelectorAll('img[data-img-topic]').forEach(fill);
  (document.readyState === 'loading') ? document.addEventListener('DOMContentLoaded', init) : init();
})();
