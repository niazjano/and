// assets/js/autoImages.js
(function () {
  // Use Unsplash Source for fill images (no API key)
  const SIZES = {
    sm: '800x600',
    md: '1200x900',
    lg: '1600x1200'
  };

  function unsplash(topic, sig, size) {
    const q = encodeURIComponent(`${topic}, home renovation, construction, interior, uk`);
    return `https://source.unsplash.com/${size}/?${q}&sig=${sig}`;
  }
  function placeholder(size, text='Adrian & Sons') {
    return `https://placehold.co/${size}?text=${encodeURIComponent(text)}`;
  }

  function apply(img) {
    if (img.getAttribute('src')) return; // already has a local src
    const topic = img.dataset.imgTopic || 'home renovation';
    const sig   = img.dataset.imgIndex || Math.floor(Math.random()*1000);
    const sm = unsplash(topic, sig, SIZES.sm);
    const md = unsplash(topic, sig, SIZES.md);
    const lg = unsplash(topic, sig, SIZES.lg);

    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = sm;
    img.srcset = `${sm} 800w, ${md} 1200w, ${lg} 1600w`;
    img.sizes = img.getAttribute('sizes') || '(max-width: 768px) 100vw, 50vw';
    img.onerror = () => {
      img.src = placeholder(SIZES.md);
      img.srcset = '';
    };
  }

  function init() {
    document.querySelectorAll('img[data-img-topic]').forEach(apply);
  }
  (document.readyState === 'loading')
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
