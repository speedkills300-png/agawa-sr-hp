/* 阿川社会保険労務士事務所 - 共通スクリプト */

(function () {
  'use strict';

  // ------------------------------------------------------------------
  // ヘッダーのスクロール状態
  // ------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ------------------------------------------------------------------
  // モバイルナビ
  // ------------------------------------------------------------------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const overlay = document.querySelector('.nav-overlay');

  const closeNav = () => {
    if (!nav) return;
    nav.classList.remove('is-open');
    toggle?.classList.remove('is-open');
    overlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  const openNav = () => {
    if (!nav) return;
    nav.classList.add('is-open');
    toggle?.classList.add('is-open');
    overlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  toggle?.addEventListener('click', () => {
    nav?.classList.contains('is-open') ? closeNav() : openNav();
  });
  overlay?.addEventListener('click', closeNav);
  document.querySelectorAll('.site-nav__link, .site-nav__cta').forEach((a) => {
    a.addEventListener('click', closeNav);
  });

  // ------------------------------------------------------------------
  // スクロール連動フェードイン
  // ------------------------------------------------------------------
  const targets = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && targets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    targets.forEach((t) => io.observe(t));
  } else {
    targets.forEach((t) => t.classList.add('is-visible'));
  }

  // ------------------------------------------------------------------
  // お問い合わせフォーム（ダミー送信）
  // ------------------------------------------------------------------
  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('お問い合わせありがとうございます。\n※ このフォームはデモです。実運用時はメール送信処理を設定してください。');
  });
})();
