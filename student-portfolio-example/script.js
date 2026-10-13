// 절제된 등장 효과: 화면에 들어올 때 한 번만 살짝 떠오릅니다.
// 타자 효과, 스크롤 진행 바, 큰 슬라이드 같은 연출은 쓰지 않습니다.
// 운영체제의 "동작 줄이기" 설정이 켜져 있으면 CSS에서 자동으로 꺼집니다.
(() => {
  const targets = document.querySelectorAll('.hero-copy, .snapshot, .metrics article, .section-heading, .project-card, .capability-grid article, .contact');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js-motion');
  targets.forEach((el, i) => { el.classList.add('reveal'); el.style.setProperty('--d', `${(i % 4) * 0.06}s`); });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  targets.forEach((el) => io.observe(el));
})();
