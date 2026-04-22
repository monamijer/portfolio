

import { Router }       from './router.js';
import { homeView, aboutView, projectsView, contactView } from './views.js';
import { vaultView, initVault } from './nexus.js';

/* ── Router setup ────────────────────────────────────────────── */
const app = document.getElementById('app');

const router = new Router(app)
  .on('/',         homeView)
  .on('/about',    aboutView)
  .on('/projects', projectsView)
  .on('/contact',  contactView)
  .on('/vault',    vaultView);

router.start();

/* ── Theme toggle ────────────────────────────────────────────── */
const themeBtn = document.getElementById('themeToggle');
const icon     = themeBtn.querySelector('i');

const applyTheme = (dark) => {
  document.documentElement.dataset.theme = dark ? 'dark' : '';
  icon.className = dark ? 'bi bi-sun' : 'bi bi-moon-stars';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
};

// Restore saved preference (or OS default)
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

themeBtn.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme !== 'dark');
});

/* ── Mobile nav hamburger ────────────────────────────────────── */
const burger   = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});

// Close menu when a link is tapped
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  }
});

/* ── Footer year ─────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Post-render hooks (run after each route render) ─────────── */
window.addEventListener('route:changed', () => {
  animateSkillBars();
  wireContactForm();

  if(detail.path === '/vault') initVault();
});

/** Animate skill progress bars when they enter the viewport. */
function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('animate')),
    { threshold: 0.3 }
  );
  fills.forEach((el) => observer.observe(el));
}

/** Intercept the contact form to show inline feedback (no page reload). */
function wireContactForm() {
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body:   new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        feedback.className = 'form-feedback success';
        feedback.textContent = '✓ Message sent! I\'ll get back to you soon.';
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch {
      feedback.className = 'form-feedback error';
      feedback.textContent = '✗ Something went wrong. Please try again or email me directly.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="bi bi-send"></i> Send Message';
    }
  });
}
