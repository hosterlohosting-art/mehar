(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelectorAll('.site-header nav a');
  if (header && toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.forEach(link => link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const revealTargets = document.querySelectorAll('.statement, .capabilities, .featured-work, .gallery-section, .archive-section, .full-portfolio-section, .motion-section, .testimonials-section, .principles, .credibility, .support-note, .contact');
  revealTargets.forEach(target => target.setAttribute('data-reveal', ''));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .08 });
    revealTargets.forEach(target => observer.observe(target));
  } else {
    revealTargets.forEach(target => target.classList.add('is-visible'));
  }
})();
const motionVideos = document.querySelectorAll('.motion-video');
motionVideos.forEach((video) => {
  const resetVideo = () => { video.pause(); video.currentTime = 0; };
  video.addEventListener('mouseenter', () => video.play().catch(() => {}));
  video.addEventListener('mouseleave', resetVideo);
  video.addEventListener('focus', () => video.play().catch(() => {}));
  video.addEventListener('blur', resetVideo);
});