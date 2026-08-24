document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('theme', 'light');
});
