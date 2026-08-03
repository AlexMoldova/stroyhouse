// ============================================================
//  STROYHOUSE — Main JS
//  Header scroll, nav scroll, form handling, slider
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ───── Header & Nav shrink on scroll ─────
  const header = document.querySelector('.header');
  const nav = document.querySelector('.nav');
  
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 80) {
      header.classList.add('scrolled');
      nav.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
      nav.classList.remove('scrolled');
    }
  });

  // ───── Active nav link on scroll ─────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // ───── Form submit ─────
  const form = document.querySelector('.contact-form');
  const successMsg = document.querySelector('.form-success');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
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

  document.querySelectorAll('.feature-card, .work-card, .process-step, .safety-item, .testimonial-card, .showcase-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

});
