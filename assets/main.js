(function () {

  // Mobile nav
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const navClose  = document.getElementById('nav-close');

  function openMobileNav() {
    navMobile.removeAttribute('hidden');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    navMobile.setAttribute('hidden', '');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', openMobileNav);
  navClose.addEventListener('click', closeMobileNav);
  navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

  // Header scroll border
  const header = document.getElementById('topHeader');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Work expand
  document.querySelectorAll('#workList .work-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      item.classList.toggle('open');
    });
  });

  // Archive expand
  document.querySelectorAll('#archiveList .archive-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      row.classList.toggle('open');
    });
  });

  // Active nav on scroll
  const sectionIds = ['about', 'work', 'capabilities', 'archive', 'education', 'contact'];
  const sections   = sectionIds.map(id => document.getElementById(id));
  function setActive() {
    const y = window.scrollY + window.innerHeight * 0.35;
    let cur = null;
    sections.forEach(s => {
      if (!s) return;
      const top = window.scrollY + s.getBoundingClientRect().top;
      if (y >= top && y < top + s.offsetHeight) cur = s.id;
    });
    document.querySelectorAll('header nav a, #nav-mobile a').forEach(a => {
      a.classList.toggle('active', a.dataset.link === cur);
    });
  }
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

})();
