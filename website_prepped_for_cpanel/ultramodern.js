document.addEventListener('pointermove', (event) => {
  const hero = document.querySelector('.ultra-hero');
  if (!hero) return;
  hero.style.setProperty('--mx', `${(event.clientX / window.innerWidth) * 100}%`);
  hero.style.setProperty('--my', `${(event.clientY / window.innerHeight) * 100}%`);
});
