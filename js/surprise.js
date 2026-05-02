/* =========================================
   サプライズ演出（誕生日 + 猪川家イースターエッグ）
   ※ 本格運用時はこのファイルごと削除＋
      index.htmlから関連セクション/オーバーレイを削除する
   ========================================= */

(function () {
  'use strict';

  const TITLE_TEXT = 'Happy Birthday, Kaho.';
  const SUB_TEXT = 'いつも、ありがとう。';
  const STORAGE_KEY = 'nk_surprise_seen_v1';

  // ---------- ENTRY OVERLAY (?from=takeshi) ----------
  const params = new URLSearchParams(location.search);
  const fromTakeshi = params.get('from') === 'takeshi';
  const alreadySeen = (() => {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; }
    catch (e) { return false; }
  })();

  const overlay = document.getElementById('surpriseOverlay');
  const overlayTitle = document.getElementById('overlayTitle');
  const overlaySub = document.getElementById('overlaySub');
  const overlayBtn = document.getElementById('overlayBtn');

  if (overlay && fromTakeshi && !alreadySeen) {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => overlay.classList.add('is-visible'));

    // typewriter
    const typewrite = (el, text, delay = 70) => new Promise(resolve => {
      let i = 0;
      const tick = () => {
        if (i < text.length) {
          el.textContent += text[i++];
          setTimeout(tick, delay);
        } else {
          resolve();
        }
      };
      setTimeout(tick, 600);
    });

    typewrite(overlayTitle, TITLE_TEXT, 90).then(() => {
      overlayTitle.classList.add('is-done');
      // confetti burst
      if (window.confetti) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: .55 },
          colors: ['#F5A65B', '#7BAE7F', '#E8B86A', '#FFFFFF']
        });
        setTimeout(() => confetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: .6 }
        }), 300);
        setTimeout(() => confetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: .6 }
        }), 600);
      }
      overlaySub.textContent = SUB_TEXT;
      overlaySub.classList.add('is-visible');
      setTimeout(() => overlayBtn.classList.add('is-visible'), 600);
    });

    overlayBtn.addEventListener('click', () => {
      overlay.classList.add('is-leaving');
      overlay.classList.remove('is-visible');
      document.body.style.overflow = '';
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
      setTimeout(() => {
        overlay.hidden = true;
        // smooth scroll to surprise section
        const target = document.getElementById('surprise');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 700);
    });
  }

  // ---------- SURPRISE SECTION CLOSE BUTTON ----------
  const surpriseSection = document.getElementById('surprise');
  const surpriseClose = document.getElementById('surpriseClose');
  if (surpriseClose && surpriseSection) {
    surpriseClose.addEventListener('click', () => {
      surpriseSection.style.transition = 'opacity .4s, max-height .6s';
      surpriseSection.style.opacity = '0';
      surpriseSection.style.maxHeight = surpriseSection.scrollHeight + 'px';
      requestAnimationFrame(() => {
        surpriseSection.style.maxHeight = '0';
        surpriseSection.style.padding = '0';
        surpriseSection.style.overflow = 'hidden';
      });
      setTimeout(() => {
        surpriseSection.classList.add('is-collapsed');
      }, 700);
    });
  }

  // ---------- INOKAWA EASTER EGG (©マーク5回クリック) ----------
  const copyMark = document.getElementById('copyMark');
  const inokawaOverlay = document.getElementById('inokawaOverlay');
  const inokawaClose = document.getElementById('inokawaClose');

  if (copyMark && inokawaOverlay) {
    let clickCount = 0;
    let resetTimer;
    let toastEl;

    const showToast = (msg) => {
      if (toastEl) toastEl.remove();
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.textContent = msg;
      document.body.appendChild(toastEl);
      requestAnimationFrame(() => toastEl.classList.add('is-visible'));
      setTimeout(() => {
        toastEl.classList.remove('is-visible');
        setTimeout(() => toastEl && toastEl.remove(), 600);
      }, 2200);
    };

    const triggerOverlay = () => {
      inokawaOverlay.hidden = false;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => inokawaOverlay.classList.add('is-visible'));
      if (window.confetti) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: .6 },
          colors: ['#7BAE7F', '#F5A65B', '#E8B86A']
        });
      }
    };

    const handleClick = () => {
      clickCount++;
      copyMark.classList.add('is-clicked');
      setTimeout(() => copyMark.classList.remove('is-clicked'), 300);

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => clickCount = 0, 2000);

      if (clickCount === 3) {
        showToast('あと2回...？');
      } else if (clickCount === 4) {
        showToast('もう1回！');
      } else if (clickCount >= 5) {
        clickCount = 0;
        triggerOverlay();
      }
    };

    copyMark.addEventListener('click', handleClick);
    copyMark.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    });

    if (inokawaClose) {
      inokawaClose.addEventListener('click', () => {
        inokawaOverlay.classList.remove('is-visible');
        document.body.style.overflow = '';
        setTimeout(() => inokawaOverlay.hidden = true, 400);
      });
    }
    // Click outside to close
    inokawaOverlay.addEventListener('click', (e) => {
      if (e.target === inokawaOverlay) {
        inokawaOverlay.classList.remove('is-visible');
        document.body.style.overflow = '';
        setTimeout(() => inokawaOverlay.hidden = true, 400);
      }
    });
  }
})();
