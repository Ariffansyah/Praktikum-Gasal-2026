// Dark mode support matching Praktikum-Gasal-2026
function initTheme() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  updateThemeButton(isDark);
}

function updateThemeButton(isDark) {
  const btn = document.querySelector('#theme-toggle');
  if (btn) {
    btn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    btn.setAttribute('aria-pressed', String(isDark));
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const isDark = currentTheme !== 'dark';
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('darkMode', String(isDark));
  updateThemeButton(isDark);
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  // Dark mode toggle
  const themeBtn = document.querySelector('#theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Mobile menu toggle
  const menuBtn = document.querySelector('#menu-button');
  const sideBar = document.querySelector('.side-bar');
  if (menuBtn && sideBar) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      sideBar.classList.toggle('nav-open', !expanded);
    });

    // Close menu when a link inside sidebar is clicked
    sideBar.querySelectorAll('.site-nav a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 800) {
          sideBar.classList.remove('nav-open');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Active section spy for sidebar TOC
  const navLinks = document.querySelectorAll('.site-nav .nav-list-link[href^="#"]');
  const sections = Array.from(navLinks)
    .map((link) => {
      const id = link.getAttribute('href').slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
