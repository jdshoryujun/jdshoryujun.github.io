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
  const btn = form.querySelector('.form-submit');
  const inputs = [
    document.getElementById('contact-name'),
    document.getElementById('contact-email'),
    document.getElementById('contact-message')
  ];

  // 初期状態：ボタンを無効化
  btn.disabled = true;

  // 3つ全部入力されているかチェック
  function checkInputs() {
    const allFilled = inputs.every(input => input.value.trim() !== '');
    btn.disabled = !allFilled;
  }

  // 各入力欄の変化を監視
  inputs.forEach(input => input.addEventListener('input', checkInputs));

 // 送信処理
  form.addEventListener('submit', () => {
    btn.textContent = '送信しました！';
    btn.classList.add('sent');
    btn.disabled = true;
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