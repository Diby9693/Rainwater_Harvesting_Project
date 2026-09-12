document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('siteHeader');
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);
    toTop.classList.toggle('show', window.scrollY > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navMap = {};
  navLinks.forEach(l => navMap[l.getAttribute('href').slice(1)] = l);

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (navMap[id]) {
          navLinks.forEach(l => l.classList.remove('active'));
          navMap[id].classList.add('active');
        }
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => sectionObserver.observe(s));

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.split-text, .split-visual, .info-card, .type-card, .photo-grid figure, .flow-step, .acc-item, .benefit-card, .equip-item, .cost-table, .calc-box'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Accordion ---------- */
  document.querySelectorAll('.acc-item').forEach(item => {
    const head = item.querySelector('.acc-head');
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- Water harvesting calculator ---------- */
  const roofArea = document.getElementById('roofArea');
  const rainfall = document.getElementById('rainfall');
  const runoff = document.getElementById('runoff');
  const runoffVal = document.getElementById('runoffVal');
  const resultM3 = document.getElementById('resultM3');
  const resultLitres = document.getElementById('resultLitres');

  function calculate() {
    const area = parseFloat(roofArea.value) || 0;
    const rain = parseFloat(rainfall.value) || 0;
    const coeff = parseFloat(runoff.value) || 0;

    // Water Harvested (m3) = Roof Area (m2) x Rainfall (m) x Runoff Coefficient
    const m3 = area * (rain / 1000) * coeff;
    const litresLakh = (m3 * 1000) / 100000; // 1 m3 = 1000 litres; 1 lakh = 100000

    runoffVal.textContent = coeff.toFixed(2);
    resultM3.textContent = m3.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    resultLitres.textContent = litresLakh.toLocaleString('en-IN', { maximumFractionDigits: 1 });
  }

  [roofArea, rainfall, runoff].forEach(el => el.addEventListener('input', calculate));
  calculate();

});
