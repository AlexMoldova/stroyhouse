// ============================================================
//  STROYHOUSE — Main JS
//  Header scroll, nav scroll, quiz, form, popup
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

  // ───── Contact form submit ─────
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

  document.querySelectorAll('.feature-card, .work-card, .process-step, .safety-item, .testimonial-card, .showcase-item, .stairs-type-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

});

// ───── Quiz logic ─────
let quizStep = 1;

function quizNext() {
  // Check if current step has a selection (for steps 1-4)
  if (quizStep < 5) {
    const currentStep = document.querySelector(`.quiz-step[data-step="${quizStep}"]`);
    const checked = currentStep.querySelector('input[type="radio"]:checked');
    if (!checked) {
      // Shake the options to indicate selection needed
      const options = currentStep.querySelector('.quiz-options');
      options.style.animation = 'shake 0.3s';
      setTimeout(() => options.style.animation = '', 300);
      return;
    }
  }

  if (quizStep < 5) {
    document.querySelector(`.quiz-step[data-step="${quizStep}"]`).classList.remove('active');
    quizStep++;
    document.querySelector(`.quiz-step[data-step="${quizStep}"]`).classList.add('active');
    updateQuizDots();
  }
}

function quizPrev() {
  if (quizStep > 1) {
    document.querySelector(`.quiz-step[data-step="${quizStep}"]`).classList.remove('active');
    quizStep--;
    document.querySelector(`.quiz-step[data-step="${quizStep}"]`).classList.add('active');
    updateQuizDots();
  }
}

function updateQuizDots() {
  document.querySelectorAll('.quiz-dot').forEach(dot => {
    dot.classList.remove('active');
  });
  document.querySelector(`.quiz-dot[data-dot="${quizStep}"]`).classList.add('active');
}

function submitQuiz() {
  const name = document.getElementById('quiz-name').value.trim();
  const phone = document.getElementById('quiz-phone').value.trim();
  if (!name || !phone) {
    const form = document.querySelector('.quiz-form');
    form.style.animation = 'shake 0.3s';
    setTimeout(() => form.style.animation = '', 300);
    return;
  }
  const success = document.querySelector('.quiz-success');
  success.classList.add('show');
  document.querySelector('.quiz-form').reset();
  setTimeout(() => {
    success.classList.remove('show');
    // Reset to step 1
    document.querySelector(`.quiz-step[data-step="${quizStep}"]`).classList.remove('active');
    quizStep = 1;
    document.querySelector('.quiz-step[data-step="1"]').classList.add('active');
    updateQuizDots();
    // Uncheck all radios
    document.querySelectorAll('.quiz-option input[type="radio"]').forEach(r => r.checked = false);
  }, 5000);
}

// ───── Popup logic ─────
function openPopup(id) {
  document.getElementById('popup-overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closePopup(event) {
  if (event && event.target !== document.getElementById('popup-overlay')) return;
  document.getElementById('popup-overlay').classList.remove('show');
  document.body.style.overflow = '';
  document.querySelector('.popup-success').classList.remove('show');
}

function submitPopup() {
  const name = document.getElementById('popup-name').value.trim();
  const phone = document.getElementById('popup-phone-input').value.trim();
  if (!name || !phone) return;
  
  document.querySelector('.popup-success').classList.add('show');
  document.querySelector('.popup-form').reset();
  setTimeout(() => {
    closePopup();
  }, 3000);
}

// Close popup on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopup();
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);
