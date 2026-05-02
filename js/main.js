/* =========================================
   にっしー＆かっほー幼児園 - UI制御
   ========================================= */

(function () {
  'use strict';

  // -------- AOS (scroll fade) --------
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }

  // -------- Header scroll state --------
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // -------- Hamburger menu --------
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('.nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', open);
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // -------- Swiper: Story --------
  if (window.Swiper) {
    new Swiper('.story-swiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: {
        el: '.story-pagination',
        clickable: true,
      },
    });

    // -------- Swiper: Letter (surprise) --------
    if (document.querySelector('.letter-swiper')) {
      new Swiper('.letter-swiper', {
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: {
          el: '.letter-swiper .swiper-pagination',
          clickable: true,
        },
      });
    }

    // -------- Swiper: Voice (Dくん) --------
    if (document.querySelector('.voice-swiper-d')) {
      new Swiper('.voice-swiper-d', {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: {
          el: '.voice-d-pagination',
          clickable: true,
        },
      });
    }
    // -------- Swiper: Voice (Yくん) --------
    if (document.querySelector('.voice-swiper-y')) {
      new Swiper('.voice-swiper-y', {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: {
          el: '.voice-y-pagination',
          clickable: true,
        },
      });
    }
  }

  // -------- Photo zoom (クリックで画面中央に拡大／もう一度で戻る) --------
  const togglableSelectors = [
    '.concept__img',
    '.teacher__img',
    '.voice__photo',
    '.story__photos',
    '.staff-card__photo',
    '.gallery__item',
    '.surprise__photos'
  ];
  const togglables = document.querySelectorAll(togglableSelectors.join(','));
  togglables.forEach(el => {
    el.addEventListener('click', (e) => {
      // ページネーション操作は除外
      if (e.target.classList.contains('swiper-pagination-bullet')) return;
      if (el.classList.contains('is-full')) {
        // 拡大中：写真本体（img）をクリックしたら何もしない、外側なら閉じる
        if (e.target.tagName.toLowerCase() === 'img') return;
        el.classList.remove('is-full');
        document.body.style.overflow = '';
      } else {
        // 他を閉じてから開く
        togglables.forEach(o => o.classList.remove('is-full'));
        el.classList.add('is-full');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  // ESCキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      togglables.forEach(el => el.classList.remove('is-full'));
      document.body.style.overflow = '';
    }
  });
})();
