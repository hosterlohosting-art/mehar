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
        observer.unobserve(entry.target);
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
      submitBtn.textContent = 'Sending Message...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        const cardParent = form.closest('.glass-card') || form.closest('.cta-box');
        if (cardParent) {
          const nameInput = form.querySelector('input[type="text"]')?.value || 'Guest';
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
      
      const spans = menuBtn.querySelectorAll('span');
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (menuBtn.classList.contains('menu-active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
        
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'fixed';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = isDark ? 'rgba(11, 17, 32, 0.95)' : 'rgba(255, 255, 255, 0.95)';
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
    
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (menuBtn.classList.contains('menu-active')) {
          menuBtn.click();
        }
      });
    });
  }

  // 5. Dynamic Floating WhatsApp Button
  const floatWs = document.createElement('a');
  floatWs.href = "https://wa.me/923224437730?text=Hi%20Mehar,%20I'm%20interested%20in%20your%20web%20services";
  floatWs.target = "_blank";
  floatWs.rel = "noopener";
  floatWs.className = "whatsapp-floating";
  floatWs.setAttribute('aria-label', 'Chat with Mehar Hassan on WhatsApp');
  floatWs.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.907h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.202-.1-1.195-.59-1.378-.654-.182-.064-.315-.1-.447.1-.132.196-.512.654-.627.784-.114.13-.228.144-.43.045-.202-.1-.853-.314-1.624-1.002-.599-.535-1.004-1.197-1.122-1.4-.117-.195-.013-.3.088-.4.09-.09.202-.236.3-.354.097-.118.13-.2.196-.334.066-.134.033-.252-.017-.353-.05-.1-.447-1.077-.611-1.472-.16-.388-.323-.335-.447-.341-.115-.006-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.196-.693.677-.693 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.195-.488 1.362-.96.166-.472.166-.875.117-.96-.05-.085-.18-.13-.382-.23z"/>
    </svg>
  `;
  document.body.appendChild(floatWs);

  // 6. Dark Mode Toggle
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggle.textContent = isDark ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
      }
    });
  }

  // 7. Animated Stats Counter
  const statNums = document.querySelectorAll('.stat-num');
  if (statNums.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent.trim();
          const match = text.match(/^(\d+)(.*)$/);
          if (match) {
            const target = parseInt(match[1], 10);
            const suffix = match[2] || '';
            let current = 0;
            const duration = 2000;
            const step = Math.max(1, Math.floor(target / (duration / 30)));
            const interval = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(interval);
              }
              el.innerHTML = `${current}<span>${suffix}</span>`;
            }, 30);
          }
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => counterObserver.observe(el));
  }

  // 8. Back-to-Top Button
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '↑';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 9. Newsletter Form Handling
  const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-newsletter');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('.newsletter-input');
      const btn = form.querySelector('.newsletter-btn');
      if (emailInput && emailInput.value) {
        btn.textContent = 'Subscribed ✓';
        btn.disabled = true;
        btn.style.background = '#10b981';
        btn.style.color = 'white';
        emailInput.disabled = true;
        emailInput.value = '';
        emailInput.placeholder = 'Thank you!';
      }
    });
  });

  // 10. Dynamic Typing Animation Loop
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const wordsAttr = typingText.getAttribute('data-words');
    if (wordsAttr) {
      const words = JSON.parse(wordsAttr);
      let wordIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let currentText = '';
      
      function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
          currentText = currentWord.substring(0, charIndex - 1);
          charIndex--;
        } else {
          currentText = currentWord.substring(0, charIndex + 1);
          charIndex++;
        }
        
        typingText.textContent = currentText;
        
        let typeSpeed = isDeleting ? 40 : 80;
        
        if (!isDeleting && currentText === currentWord) {
          typeSpeed = 1800; // Pause at full word
          isDeleting = true;
        } else if (isDeleting && currentText === '') {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          typeSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(type, typeSpeed);
      }
      
      // Start the typing loop
      setTimeout(type, 800);
    }
  }

  // 11. 3D Glass Card Hover Tilt Effect (Desktop Only)
  if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        
        const dx = x - xc;
        const dy = y - yc;
        
        const tiltX = -(dy / yc) * 6; // max 6 degrees tilt
        const tiltY = (dx / xc) * 6;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
        card.style.transition = 'transform 0.1s ease, box-shadow var(--transition-smooth), border-color var(--transition-smooth), background var(--transition-smooth)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = '';
      });
    });
  }
});
