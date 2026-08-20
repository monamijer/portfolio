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

// Fallback: hide preloader after 3 seconds maximum
setTimeout(() => {
  if (preloader && !preloader.classList.contains("hidden")) {
    progress = 100;
    updatePreloader(100);
    setTimeout(hidePreloader, 300);
  }
}, 3000);

/* ── Typing Effect ───────────────────────────────────────────── */

/*
 * Stores the cleanup function of the current typing animation.
 *
 * This allows us to completely cancel an existing animation
 * before starting a new one.
 *
 * This is especially important when:
 * - changing language
 * - leaving the home page
 * - returning to the home page
 * - rendering a new view
 */
let typingCleanup = null;

function setupTypingEffect() {
  /*
   * Cancel any previous typing animation.
   *
   * This prevents old setTimeout callbacks from continuing
   * to modify the DOM after the page has changed.
   */
  if (typingCleanup) {
    typingCleanup();
    typingCleanup = null;
  }

  /*
   * Find the typing elements in the current DOM.
   *
   * The home view can be destroyed and recreated by the router,
   * so these elements must always be queried again.
   */
  const typingElement = document.getElementById("typing-text");
  const typingCursor = document.querySelector(".typing-cursor");

  /*
   * If the typing element does not exist, we are not on
   * the home page.
   */
  if (!typingElement) {
    return;
  }

  /*
   * Get the currently translated tagline.
   *
   * i18n.t() uses the currently selected language.
   */
  const getTagline = () => {
    return i18n.t("profile.tagline");
  };

  /*
   * Get the current translated phrase.
   */
  let currentPhrase = getTagline();

  /*
   * Convert <br> tags into newline characters.
   *
   * Example:
   *
   * "I craft clean<br>digital experiences"
   *
   * becomes:
   *
   * "I craft clean\ndigital experiences"
   *
   * This makes character counting easier.
   */
  let plainText = currentPhrase.replace(/<br\s*\/?>/gi, "\n");

  /*
   * Current character position.
   */
  let charIndex = 0;

  /*
   * Reference to the current timeout.
   */
  let typingTimeout = null;

  /*
   * Indicates whether this typing animation has been cancelled.
   *
   * Once true, old callbacks will stop immediately.
   */
  let cancelled = false;

  /*
   * Escape HTML before inserting partially typed text.
   *
   * This prevents translated text from accidentally being
   * interpreted as HTML while the animation is running.
   *
   * Newlines are converted back into <br>.
   */
  function escapeHtml(text) {
    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML.replace(/\n/g, "<br>");
  }

  /*
   * Render the characters that have already been typed.
   */
  function renderText() {
    const visibleText = plainText.slice(0, charIndex);

    typingElement.innerHTML = escapeHtml(visibleText);
  }

  /*
   * Finish the typing animation.
   *
   * At the end, we insert the complete translated phrase.
   * This guarantees that the final text exactly matches
   * the translation stored in i18n.
   */
  function finishTyping() {
    if (cancelled) {
      return;
    }

    /*
     * Make sure the character index represents the
     * complete phrase.
     */
    charIndex = plainText.length;

    /*
     * Display the complete translated phrase.
     */
    typingElement.innerHTML = currentPhrase;

    /*
     * Hide the cursor after typing has finished.
     */
    if (typingCursor) {
      typingCursor.classList.add("hidden");
    }

    /*
     * No active timer remains.
     */
    typingTimeout = null;
  }

  /*
   * Type one character and schedule the next one.
   */
  function typeNextCharacter() {
    /*
     * Stop immediately if this animation was cancelled.
     */
    if (cancelled) {
      return;
    }

    /*
     * If all characters have already been typed,
     * finish the animation.
     */
    if (charIndex >= plainText.length) {
      finishTyping();
      return;
    }

    /*
     * Add one character.
     */
    charIndex++;

    /*
     * Render the updated text.
     */
    renderText();

    /*
     * If this was the final character, finish immediately.
     */
    if (charIndex >= plainText.length) {
      finishTyping();
      return;
    }

    /*
     * Schedule the next character.
     *
     * 60ms controls the typing speed.
     */
    typingTimeout = setTimeout(typeNextCharacter, 60);
  }

  /*
   * Start a new typing animation.
   *
   * The default 1000ms delay gives the preloader/page transition
   * time to finish before typing begins.
   */
  function startTyping(delay = 1000) {
    if (cancelled) {
      return;
    }

    /*
     * Reset the typing state.
     */
    charIndex = 0;

    /*
     * Clear any existing text.
     */
    typingElement.innerHTML = "";

    /*
     * Show the cursor while typing.
     */
    if (typingCursor) {
      typingCursor.classList.remove("hidden");
    }

    /*
     * Wait before starting the first character.
     */
    typingTimeout = setTimeout(() => {
      if (!cancelled) {
        typeNextCharacter();
      }
    }, delay);
  }

  /*
   * Create the cleanup function for this typing cycle.
   *
   * This function:
   * - cancels the animation
   * - clears the active timeout
   * - prevents old callbacks from touching the DOM
   */
  const cleanup = () => {
    cancelled = true;

    if (typingTimeout !== null) {
      clearTimeout(typingTimeout);
      typingTimeout = null;
    }
  };

  /*
   * Store the cleanup function globally.
   *
   * The next call to setupTypingEffect() will use it to
   * cancel this animation before starting a new one.
   */
  typingCleanup = cleanup;

  /*
   * Start the typing animation.
   */
  startTyping(1000);
}

/* ── Router Setup ────────────────────────────────────────────── */

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

  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (scrollProgress) {
    scrollProgress.style.width = scrollPercent + "%";
  }
}

/* ── Back to Top Button ──────────────────────────────────────── */

const backToTop = document.getElementById("backToTop");
let hasAnimated = false;

function updateBackToTop() {
  if (!backToTop) {
    return;
  }

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

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

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

  if (readerToggle) {
    readerToggle.classList.toggle("active", readerModeEnabled);
  }

  localStorage.setItem("readerMode", readerModeEnabled);

  const message = readerModeEnabled
    ? "Reader Mode Enabled"
    : "Reader Mode Disabled";

  showToast(message);

  if (!readerToggle) {
    return;
  }

  const icon = readerToggle.querySelector("i");

  if (!icon) {
    return;
  }

  if (readerModeEnabled) {
    icon.className = "bi bi-book-half";

    readerToggle.setAttribute("aria-label", "Disable reader mode");
  } else {
    icon.className = "bi bi-book";

    readerToggle.setAttribute("aria-label", "Enable reader mode");
  }
}

/*
 * Restore reader mode preference.
 */
if (readerModeEnabled && readerToggle) {
  document.body.classList.add("reader-mode");

  readerToggle.classList.add("active");

  const icon = readerToggle.querySelector("i");

  if (icon) {
    icon.className = "bi bi-book-half";
  }

  readerToggle.setAttribute("aria-label", "Disable reader mode");
}

if (readerToggle) {
  readerToggle.addEventListener("click", toggleReaderMode);
}

/* ── Project Filters ─────────────────────────────────────────── */

function setupProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  const projectCards = document.querySelectorAll(".project-card");

  const noResults = document.getElementById("noResults");

  if (!filterButtons.length || !projectCards.length) {
    return;
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

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

      if (noResults) {
        if (visibleCount === 0) {
          noResults.style.display = "block";
        } else {
          noResults.style.display = "none";
        }
      }

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

  if (!form) {
    return;
  }

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

    if (!field || !field.element) {
      return true;
    }

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

    if (!charCounter || !messageField) {
      return;
    }

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

  Object.keys(fields).forEach((fieldName) => {
    const field = fields[fieldName];

    if (!field.element) {
      return;
    }

    field.element.addEventListener("blur", () => {
      validateField(fieldName);
    });

    field.element.addEventListener("input", () => {
      if (field.element.classList.contains("invalid")) {
        validateField(fieldName);
      }

      if (fieldName === "message") {
        updateCharCounter();
      }
    });
  });

  updateCharCounter();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let allValid = true;

    Object.keys(fields).forEach((fieldName) => {
      if (!validateField(fieldName)) {
        allValid = false;
      }
    });

    if (!allValid) {
      const firstInvalid = form.querySelector(".invalid");

      if (firstInvalid) {
        firstInvalid.focus();
      }

      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');

    const feedback = document.getElementById("formFeedback");

    if (!submitBtn) {
      return;
    }

    submitBtn.disabled = true;

    submitBtn.innerHTML = `<i class="bi bi-hourglass-split"></i> ${i18n.t(
      "common.sending",
    )}`;

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        if (feedback) {
          feedback.className = "form-feedback success";

          feedback.textContent = i18n.t("common.success");
        }

        form.reset();

        Object.keys(fields).forEach((fieldName) => {
          if (!fields[fieldName].element) {
            return;
          }

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
      if (feedback) {
        feedback.className = "form-feedback error";

        feedback.textContent = i18n.t("common.error");
      }
    } finally {
      submitBtn.disabled = false;

      submitBtn.innerHTML = `<i class="bi bi-send"></i> ${i18n.t(
        "common.sendMessage",
      )}`;
    }
  });
}

/* ── Scroll Reveal Animations ────────────────────────────────── */

function setupScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale",
  );

  if (!revealElements.length) {
    return;
  }

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

  revealElements.forEach((el) => {
    observer.observe(el);
  });
}

/* ── Combined Scroll Handler ─────────────────────────────────── */

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

/* ── Theme Toggle with Auto Dark Mode ────────────────────────── */

const themeBtn = document.getElementById("themeToggle");
const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;

const themeColor = document.getElementById("themeColor");

const applyTheme = (dark, animate = true) => {
  if (animate) {
    document.body.classList.add("theme-transitioning");

    setTimeout(() => {
      document.body.classList.remove("theme-transitioning");
    }, 500);
  }

  document.documentElement.dataset.theme = dark ? "dark" : "";

  if (themeIcon) {
    themeIcon.className = dark ? "bi bi-sun" : "bi bi-moon-stars";
  }

  // Update theme color meta tag
  if (themeColor) {
    themeColor.setAttribute("content", dark ? "#141210" : "#f5f3ee");
  }
};

/*
 * Check if the user has a saved theme preference.
 */
const savedTheme = localStorage.getItem("theme");

/*
 * Detect whether it is night time.
 *
 * Night time is considered to be between 6 PM and 6 AM.
 */
const isNightTime = () => {
  const hour = new Date().getHours();

  return hour < 6 || hour >= 18;
};

/*
 * Detect the system theme preference.
 */
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

/*
 * Apply theme based on priority:
 *
 * 1. Saved user preference
 * 2. System preference
 * 3. Time of day
 */
if (savedTheme) {
  applyTheme(savedTheme === "dark", false);
} else if (prefersDark) {
  applyTheme(true, false);
} else if (isNightTime()) {
  applyTheme(true, false);
} else {
  applyTheme(false, false);
}

/*
 * Listen for system theme changes.
 */
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches || isNightTime());
    }
  });

/*
 * Check every hour for time-based theme changes.
 */
setInterval(() => {
  if (!localStorage.getItem("theme")) {
    applyTheme(isNightTime());
  }
}, 3600000);

/*
 * Manual theme toggle.
 */
if (themeBtn) {
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
}

/* ── Mobile Navigation Hamburger ─────────────────────────────── */

const burger = document.getElementById("navBurger");

const navLinks = document.getElementById("navLinks");

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("open");

    navLinks.classList.toggle("open", open);

    burger.setAttribute("aria-expanded", open);
  });

  /*
   * Close the mobile navigation when a link is clicked.
   */
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      burger.classList.remove("open");
      navLinks.classList.remove("open");

      burger.setAttribute("aria-expanded", false);
    }
  });
}

/* ── Footer Year ─────────────────────────────────────────────── */

const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ── Post-Render Hooks ───────────────────────────────────────── */

/*
 * This is the single route:changed listener.
 *
 * It is intentionally kept in one place so that page-specific
 * initialization does not get duplicated.
 */
window.addEventListener("route:changed", ({ detail }) => {
  const currentPath = detail?.path || "/";

  /*
   * If we are leaving the home page, cancel any active
   * typing animation.
   */
  if (currentPath !== "/") {
    if (typingCleanup) {
      typingCleanup();
      typingCleanup = null;
    }
  }

  /*
   * Apply translations to the current DOM.
   *
   * This must happen before starting the typing effect so
   * the typing animation uses the current language.
   */
  i18n.applyTranslations();

  /*
   * Re-initialize page-specific functionality.
   */
  animateSkillBars();
  wireContactForm();

  updateScrollProgress();
  updateBackToTop();

  setupScrollReveal();
  setupProjectFilters();
  setupFormValidation();

  /*
   * Home page:
   *
   * Every time the home route is entered, create a fresh
   * typing animation.
   *
   * This handles:
   * - initial home page load
   * - returning to home from another page
   * - changing language while on the home page
   */
  if (currentPath === "/") {
    setupTypingEffect();
  }

  /*
   * Vault page initialization.
   */
  if (currentPath === "/vault") {
    initVault();
  }
});

/* ── Language Changed ────────────────────────────────────────── */

/*
 * i18n.js dispatches "languageChanged" on DOCUMENT.
 *
 * We therefore listen on DOCUMENT rather than WINDOW.
 *
 * When the language changes, we trigger route:changed for
 * the current route.
 *
 * If the current route is "/", the route handler will start
 * a completely new typing animation using the new language.
 */
document.addEventListener("languageChanged", ({ detail }) => {
  const currentPath = window.location.hash.replace("#", "") || "/";

  window.dispatchEvent(
    new CustomEvent("route:changed", {
      detail: {
        path: currentPath,
        reason: "languageChanged",
        lang: detail?.lang,
      },
    }),
  );
});

/* ── Initial Setup ───────────────────────────────────────────── */

/*
 * These functions initialize the current DOM.
 */
setupScrollReveal();
setupProjectFilters();
setupFormValidation();

/*
 * router.start() normally renders the initial route before
 * the code above reaches this point.
 *
 * We explicitly initialize the typing effect if the initial
 * route is the home page.
 *
 * This guarantees that the typing effect works even if the
 * router does not emit route:changed during its initial start.
 */
const initialPath = window.location.hash.replace("#", "") || "/";

if (initialPath === "/") {
  setupTypingEffect();
}

/* ── Skill Bar Animation ─────────────────────────────────────── */

/**
 * Animate skill progress bars when they enter the viewport.
 */
function animateSkillBars() {
  const fills = document.querySelectorAll(".skill-fill");

  if (!fills.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach(
        (e) => e.isIntersecting && e.target.classList.add("animate"),
      ),
    {
      threshold: 0.3,
    },
  );

  fills.forEach((el) => observer.observe(el));
}

/* ── Contact Form Hook ───────────────────────────────────────── */

/**
 * Intercept the contact form to show inline feedback
 * without a page reload.
 */
function wireContactForm() {
  return;
}

/* ── Service Worker Registration ─────────────────────────────── */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/portfolio/sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration.scope);

        /*
         * Check for service worker updates.
         */
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;

          if (!newWorker) {
            return;
          }

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              /*
               * A new service worker is available.
               * Force it to activate immediately.
               */
              newWorker.postMessage("skipWaiting");

              window.location.reload();
            }
          });
        });
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
