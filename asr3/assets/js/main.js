/* AGAWA SR OFFICE - asr3 / dark modern interactions */

(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const closeNav = () => {
    nav?.classList.remove('is-open');
    toggle?.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  toggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.querySelectorAll('.site-nav a').forEach((a) => a.addEventListener('click', closeNav));

  const targets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && targets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach((t) => io.observe(t));
  } else {
    targets.forEach((t) => t.classList.add('is-visible'));
  }

  document.querySelectorAll('.bento-card').forEach((card) => {
    card.addEventListener('pointermove', (ev) => {
      const rect = card.getBoundingClientRect();
      const x = ((ev.clientX - rect.left) / rect.width) * 100;
      const y = ((ev.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals);
      };
      requestAnimationFrame(tick);
    };
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { run(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => cio.observe(c));
  }

  document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('お問い合わせありがとうございます。\n※ このフォームはデモです。');
  });

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
