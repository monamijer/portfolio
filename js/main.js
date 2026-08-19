/**
 * main.js
 * Main application bootstrap and logic.
 */

import { Router } from "./router.js";
import {
  homeView,
  aboutView,
  projectsView,
  contactView,
  notFoundView,
} from "./views.js";
import { vaultView, initVault } from "./nexus.js";
import { i18n } from "./i18n.js";

/* ── Preloader ───────────────────────────────────────────────── */
const preloader = document.getElementById("preloader");
const preloaderProgress = document.querySelector(".preloader-progress");
const preloaderText = document.querySelector(".preloader-text");

let progress = 0;
const loadingMessages = [
  "Loading...",
  "Preparing...",
  "Almost there...",
  "Welcome!",
];

function updatePreloader(value) {
  if (preloaderProgress) {
    preloaderProgress.style.width = value + "%";
  }

  if (preloaderText) {
    const messageIndex = Math.floor(
      (value / 100) * (loadingMessages.length - 1),
    );
    preloaderText.textContent = loadingMessages[messageIndex];
  }
}

function hidePreloader() {
  if (preloader) {
    preloader.classList.add("hidden");

    setTimeout(() => {
      preloader.remove();
    }, 500);
  }
}

function simulateLoading() {
  const interval = setInterval(() => {
    progress += Math.random() * 15;

    if (progress >= 100) {
      progress = 100;
      updatePreloader(100);
      clearInterval(interval);

      setTimeout(hidePreloader, 300);
    } else {
      updatePreloader(progress);
    }
  }, 200);
}

// Start preloader
updatePreloader(0);
simulateLoading();

// Fallback: hide preloader after 3 seconds max
setTimeout(() => {
  if (preloader && !preloader.classList.contains("hidden")) {
    progress = 100;
    updatePreloader(100);
    setTimeout(hidePreloader, 300);
  }
}, 3000);

/* ── Typing Effect ───────────────────────────────────────────── */
function setupTypingEffect() {
  const typingElement = document.getElementById("typing-text");
  const typingCursor = document.querySelector(".typing-cursor");
  if (!typingElement) return;

  const getTagline = () => {
    return i18n.t("profile.tagline");
  };

  const currentPhrase = getTagline();
  const plainText = currentPhrase.replace(/<br>/g, "\n");
  const segments = plainText.split("\n");
  let charIndex = 0;
  let hasTyped = false;

  function typeOnce() {
    if (hasTyped) return;

    let totalChars = 0;
    let html = "";

    for (let i = 0; i < segments.length; i++) {
      if (i > 0 && totalChars < charIndex) {
        html += "<br>";
      }

      const remaining = charIndex - totalChars;
      if (remaining > 0) {
        html += segments[i].substring(
          0,
          Math.min(remaining, segments[i].length),
        );
        totalChars += segments[i].length;
      } else {
        break;
      }
    }

    typingElement.innerHTML = html;

    if (charIndex >= plainText.length) {
      hasTyped = true;
      // Hide cursor when typing is complete
      if (typingCursor) {
        typingCursor.classList.add("hidden");
      }
      return;
    }

    charIndex++;
    setTimeout(typeOnce, 60);
  }

  // Start typing after preloader
  setTimeout(() => {
    typeOnce();
  }, 1000);

  // Update when language changes
  window.addEventListener("languageChanged", () => {
    if (!hasTyped) {
      charIndex = 0;
      typingElement.innerHTML = "";
      // Show cursor again if typing restarts
      if (typingCursor) {
        typingCursor.classList.remove("hidden");
      }
    }
  });
}

/* ── Router setup ────────────────────────────────────────────── */
const app = document.getElementById("app");

const router = new Router(app)
  .on("/", homeView)
  .on("/about", aboutView)
  .on("/projects", projectsView)
  .on("/contact", contactView)
  .on("/vault", vaultView)
  .on("/404", notFoundView);

router.start();

/* ── Scroll Progress Bar ─────────────────────────────────────── */
const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  if (scrollProgress) {
    scrollProgress.style.width = scrollPercent + "%";
  }
}

/* ── Back to Top Button ──────────────────────────────────────── */
const backToTop = document.getElementById("backToTop");
let hasAnimated = false;

function updateBackToTop() {
  const scrollTop = window.scrollY;
  const showAfter = 300;

  if (scrollTop > showAfter) {
    backToTop.classList.add("visible");

    if (!hasAnimated) {
      setTimeout(() => {
        backToTop.classList.add("has-animated");
      }, 600);
      hasAnimated = true;
    }
  } else {
    backToTop.classList.remove("visible");
    backToTop.classList.remove("has-animated");
    hasAnimated = false;
  }
}

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ── Reader Mode ─────────────────────────────────────────────── */
const readerToggle = document.getElementById("readerToggle");
let readerModeEnabled = localStorage.getItem("readerMode") === "true";

function createToast() {
  const toast = document.createElement("div");
  toast.className = "reader-toast";
  toast.id = "readerToast";
  document.body.appendChild(toast);
  return toast;
}

const readerToast = createToast();

function showToast(message) {
  readerToast.textContent = message;
  readerToast.classList.add("show");

  setTimeout(() => {
    readerToast.classList.remove("show");
  }, 2000);
}

function toggleReaderMode() {
  readerModeEnabled = !readerModeEnabled;
  document.body.classList.toggle("reader-mode", readerModeEnabled);
  readerToggle.classList.toggle("active", readerModeEnabled);
  localStorage.setItem("readerMode", readerModeEnabled);

  const message = readerModeEnabled
    ? "Reader Mode Enabled"
    : "Reader Mode Disabled";
  showToast(message);

  const icon = readerToggle.querySelector("i");
  if (readerModeEnabled) {
    icon.className = "bi bi-book-half";
    readerToggle.setAttribute("aria-label", "Disable reader mode");
  } else {
    icon.className = "bi bi-book";
    readerToggle.setAttribute("aria-label", "Enable reader mode");
  }
}

// Restore reader mode preference
if (readerModeEnabled) {
  document.body.classList.add("reader-mode");
  readerToggle.classList.add("active");
  const icon = readerToggle.querySelector("i");
  icon.className = "bi bi-book-half";
  readerToggle.setAttribute("aria-label", "Disable reader mode");
}

readerToggle.addEventListener("click", toggleReaderMode);

/* ── Project Filters ─────────────────────────────────────────── */
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const noResults = document.getElementById("noResults");

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Filter projects
      let visibleCount = 0;

      projectCards.forEach((card) => {
        const categories = card.dataset.categories.split(",");

        if (filter === "all" || categories.includes(filter)) {
          card.classList.remove("hidden");
          card.classList.remove("filtering");
          visibleCount++;
        } else {
          card.classList.add("filtering");

          setTimeout(() => {
            card.classList.add("hidden");
          }, 300);
        }
      });

      // Show/hide no results message
      if (noResults) {
        if (visibleCount === 0) {
          noResults.style.display = "block";
        } else {
          noResults.style.display = "none";
        }
      }

      // Re-trigger reveal animations for visible cards
      setTimeout(() => {
        projectCards.forEach((card) => {
          if (!card.classList.contains("hidden")) {
            card.classList.add("visible");
          }
        });
      }, 350);
    });
  });
}

/* ── Form Validation ─────────────────────────────────────────── */
function setupFormValidation() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fields = {
    name: {
      element: document.getElementById("name"),
      validators: [
        {
          validate: (value) => value.length >= 2,
          message: "Name must be at least 2 characters",
        },
        {
          validate: (value) => value.length <= 50,
          message: "Name must be less than 50 characters",
        },
        {
          validate: (value) => /^[a-zA-Z\s'-]+$/.test(value),
          message: "Name contains invalid characters",
        },
      ],
    },
    email: {
      element: document.getElementById("email"),
      validators: [
        {
          validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
          message: "Please enter a valid email address",
        },
      ],
    },
    message: {
      element: document.getElementById("message"),
      validators: [
        {
          validate: (value) => value.length >= 10,
          message: "Message must be at least 10 characters",
        },
        {
          validate: (value) => value.length <= 1000,
          message: "Message must be less than 1000 characters",
        },
      ],
    },
  };

  function validateField(fieldName) {
    const field = fields[fieldName];
    if (!field) return true;

    const value = field.element.value.trim();
    let isValid = true;
    let errorMessage = "";

    for (const validator of field.validators) {
      if (!validator.validate(value)) {
        isValid = false;
        errorMessage = validator.message;
        break;
      }
    }

    // Update UI
    const errorElement = document.querySelector(
      `[data-error-for="${fieldName}"]`,
    );

    if (isValid) {
      field.element.classList.add("valid");
      field.element.classList.remove("invalid");
      if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.remove("show");
      }
    } else {
      field.element.classList.remove("valid");
      field.element.classList.add("invalid");
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add("show");
      }
    }

    return isValid;
  }

  function updateCharCounter() {
    const messageField = fields.message.element;
    const charCounter = document.querySelector('[data-char-for="message"]');
    if (!charCounter || !messageField) return;

    const length = messageField.value.length;
    const maxLength = 1000;
    const remaining = maxLength - length;

    charCounter.textContent = `${length} / ${maxLength}`;

    if (remaining < 100) {
      charCounter.classList.add("warning");
    } else {
      charCounter.classList.remove("warning");
    }

    if (remaining < 20) {
      charCounter.classList.add("danger");
    } else {
      charCounter.classList.remove("danger");
    }
  }

  // Real-time validation
  Object.keys(fields).forEach((fieldName) => {
    const field = fields[fieldName];

    field.element.addEventListener("blur", () => {
      validateField(fieldName);
    });

    field.element.addEventListener("input", () => {
      // Only validate if field was previously invalid
      if (field.element.classList.contains("invalid")) {
        validateField(fieldName);
      }

      if (fieldName === "message") {
        updateCharCounter();
      }
    });
  });

  // Initialize char counter
  updateCharCounter();

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate all fields
    let allValid = true;
    Object.keys(fields).forEach((fieldName) => {
      if (!validateField(fieldName)) {
        allValid = false;
      }
    });

    if (!allValid) {
      // Focus first invalid field
      const firstInvalid = form.querySelector(".invalid");
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const feedback = document.getElementById("formFeedback");

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="bi bi-hourglass-split"></i> ${i18n.t("common.sending")}`;

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        feedback.className = "form-feedback success";
        feedback.textContent = i18n.t("common.success");
        form.reset();

        // Reset validation states
        Object.keys(fields).forEach((fieldName) => {
          fields[fieldName].element.classList.remove("valid", "invalid");
          const errorElement = document.querySelector(
            `[data-error-for="${fieldName}"]`,
          );
          if (errorElement) {
            errorElement.textContent = "";
            errorElement.classList.remove("show");
          }
        });

        updateCharCounter();
      } else {
        throw new Error("Server error");
      }
    } catch {
      feedback.className = "form-feedback error";
      feedback.textContent = i18n.t("common.error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="bi bi-send"></i> ${i18n.t("common.sendMessage")}`;
    }
  });
}

/* ── Scroll Reveal Animations ────────────────────────────────── */
function setupScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale",
  );

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* ── Combined scroll handler ─────────────────────────────────── */
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScrollProgress();
      updateBackToTop();
      ticking = false;
    });
    ticking = true;
  }
});

// Initial calls
updateScrollProgress();
updateBackToTop();

/* ── Theme toggle with auto dark mode ────────────────────────── */
const themeBtn = document.getElementById("themeToggle");
const icon = themeBtn.querySelector("i");

const applyTheme = (dark, animate = true) => {
  if (animate) {
    document.body.classList.add("theme-transitioning");
    setTimeout(() => {
      document.body.classList.remove("theme-transitioning");
    }, 500);
  }

  document.documentElement.dataset.theme = dark ? "dark" : "";
  icon.className = dark ? "bi bi-sun" : "bi bi-moon-stars";
};

// Check if user has a saved preference
const savedTheme = localStorage.getItem("theme");

// Function to detect if it's night time (6 PM - 6 AM)
const isNightTime = () => {
  const hour = new Date().getHours();
  return hour < 6 || hour >= 18;
};

// Function to detect system preference
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Apply theme based on priority: saved > system > time
if (savedTheme) {
  applyTheme(savedTheme === "dark", false);
} else if (prefersDark) {
  applyTheme(true, false);
} else if (isNightTime()) {
  applyTheme(true, false);
} else {
  applyTheme(false, false);
}

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches || isNightTime());
    }
  });

// Check every hour for time-based changes
setInterval(() => {
  if (!localStorage.getItem("theme")) {
    applyTheme(isNightTime());
  }
}, 3600000);

// Manual toggle
themeBtn.addEventListener("click", () => {
  const newTheme = document.documentElement.dataset.theme !== "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme ? "dark" : "light");

  showToast(
    newTheme
      ? i18n.t("common.darkModeEnabled")
      : i18n.t("common.lightModeEnabled"),
  );
});

/* ── Mobile nav hamburger ────────────────────────────────────── */
const burger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  const open = burger.classList.toggle("open");
  navLinks.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
});

// Close menu when a link is tapped
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    burger.classList.remove("open");
    navLinks.classList.remove("open");
    burger.setAttribute("aria-expanded", false);
  }
});

/* ── Footer year ─────────────────────────────────────────────── */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Post-render hooks (run after each route render) ─────────── */
window.addEventListener("route:changed", ({ detail }) => {
  animateSkillBars();
  wireContactForm();
  i18n.applyTranslations();
  updateScrollProgress();
  updateBackToTop();
  setupScrollReveal();
  setupProjectFilters();
  setupFormValidation();
  setupTypingEffect();

  if (detail.path === "/vault") initVault();
});

window.addEventListener("languageChanged", () => {
  const currentPath = window.location.hash.replace("#", "") || "/";
  window.dispatchEvent(
    new CustomEvent("route:changed", { detail: { path: currentPath } }),
  );
});

/** Animate skill progress bars when they enter the viewport. */
function animateSkillBars() {
  const fills = document.querySelectorAll(".skill-fill");
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach(
        (e) => e.isIntersecting && e.target.classList.add("animate"),
      ),
    { threshold: 0.3 },
  );
  fills.forEach((el) => observer.observe(el));
}

/** Intercept the contact form to show inline feedback (no page reload). */
function wireContactForm() {
  // This function is now handled by setupFormValidation
  return;
}

// Initial setup
setupScrollReveal();
setupProjectFilters();
setupFormValidation();
setupTypingEffect();
