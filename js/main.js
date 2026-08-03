// ============================================================
//  STROYHOUSE — Main JS
//  Form handling, smooth scroll, mobile menu
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ───── Mobile menu toggle ─────
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });
    // Close on nav link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // ───── Header shrink on scroll ─────
  const header = document.querySelector('.header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 80) {
      header.style.padding = '10px 0';
      header.style.background = 'rgba(23, 23, 23, 0.95)';
    } else {
      header.style.padding = '16px 0';
      header.style.background = 'rgba(23, 23, 23, 0.85)';
    }
    lastScroll = current;
  });

  // ───── Form submit (no backend — just show success) ─────
  const form = document.querySelector('.contact-form form');
  const successMsg = document.querySelector('.form-success');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic validation
      const inputs = form.querySelectorAll('input, textarea');
      let valid = true;
      inputs.forEach(inp => {
        if (!inp.value.trim()) valid = false;
      });
      if (valid) {
        form.reset();
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }
    });
  }

  // ───── Intersection Observer for fade-in ─────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.feature-card, .work-card, .process-step, .safety-item, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

});
