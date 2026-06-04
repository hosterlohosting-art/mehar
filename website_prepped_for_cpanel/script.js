document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Header
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Scroll Animation Observer (Reveal elements on scroll)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 3. Contact Form Submission Handling
  const forms = document.querySelectorAll('.contact-form-element');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.btn-form');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending Message...';
      submitBtn.disabled = true;
      
      // Simulate API submit delay (usually 1s)
      setTimeout(() => {
        // Render Success State inside the form card
        const cardParent = form.closest('.glass-card') || form.closest('.cta-box');
        if (cardParent) {
          const nameInput = form.querySelector('input[type="text"]')?.value || 'Guest';
          
          // Re-render HTML with a premium success state
          const formSection = form.closest('.cta-form') || form;
          formSection.innerHTML = `
            <div class="form-success-message reveal active" style="opacity: 1; transform: translateY(0);">
              <div style="font-size: 50px; color: var(--primary-gold); margin-bottom: 16px;">✓</div>
              <h4>Thank you, ${nameInput}!</h4>
              <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px;">
                Your inquiry has been successfully captured. Mehar will reach out to you within 24 hours.
              </p>
              <a href="mailto:hello@meharhassan.com?subject=Contact%20from%20Portfolio&body=Hi%20Mehar," class="btn-primary" style="padding: 12px 24px; font-size: 13px;">
                Email Mehar Directly
              </a>
            </div>
          `;
        }
      }, 1200);
    });
  });

  // 4. Mobile Menu Navigation Logic
  const menuBtn = document.querySelector('.menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      menuBtn.classList.toggle('menu-active');
      
      // Style toggle for burger menu lines
      const spans = menuBtn.querySelectorAll('span');
      if (menuBtn.classList.contains('menu-active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
        
        // Add full-screen mobile menu styles dynamically
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'fixed';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'rgba(255, 255, 255, 0.95)';
        navMenu.style.backdropFilter = 'blur(15px)';
        navMenu.style.padding = '40px 24px';
        navMenu.style.borderBottom = '1px solid rgba(15, 23, 42, 0.08)';
        navMenu.style.boxShadow = 'var(--shadow-md)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        navMenu.style.display = '';
      }
    });
    
    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (menuBtn.classList.contains('menu-active')) {
          menuBtn.click();
        }
      });
    });
  }
});
