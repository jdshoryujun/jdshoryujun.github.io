/* =============================================
   むくろじゅ — main.js
   ============================================= */

// ── ナビ: ハンバーガーメニュー ──
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  // ナビリンクをクリックしたら閉じる
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── スクロール: フェードイン ──
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // stagger: data-delay属性があれば遅らせる
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Number(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ── お問い合わせフォーム ──
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = '送信しました！';
    btn.style.background = '#4DCFCF';
    btn.disabled = true;

    // 3秒後にリセット
    setTimeout(() => {
      form.reset();
      btn.textContent = '送信する';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
}

// ── ナビ: スクロールで影を追加 ──
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 2px 24px rgba(30, 74, 138, 0.45)';
  } else {
    nav.style.boxShadow = '0 2px 16px rgba(30, 74, 138, 0.3)';
  }
}, { passive: true });