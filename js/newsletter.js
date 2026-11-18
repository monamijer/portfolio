/**
 * newsletter.js
 * Newsletter signup posting to the Brevo hosted-form endpoint.
 *
 * Brevo's own embed script sends a multipart POST to the form action with
 * "?isAjax=1" and reads a JSON reply ({ success, message, errors }).
 * This module does the same, so the form keeps the site's look and i18n.
 */

import { i18n } from "./i18n.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Locales Brevo knows for its own messages; everything else falls back to "en".
const BREVO_LOCALES = ["en", "fr", "es", "de"];

export function setupNewsletter() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;

  const email = document.getElementById("nlEmail");
  const consent = document.getElementById("nlConsent");
  const locale = form.elements.locale;
  const button = form.querySelector("button[type='submit']");
  const label = button.querySelector("span");
  const feedback = document.getElementById("newsletterFeedback");
  const endpoint = `${form.getAttribute("action")}?isAjax=1`;

  const setFeedback = (type, key) => {
    feedback.className = `form-feedback ${type}`;
    feedback.setAttribute("data-i18n", key); // re-translated on language change
    feedback.textContent = i18n.t(key);
  };

  const clearFeedback = () => {
    feedback.className = "form-feedback";
    feedback.removeAttribute("data-i18n");
    feedback.textContent = "";
  };

  const setLabel = (key) => {
    label.setAttribute("data-i18n", key);
    label.textContent = i18n.t(key);
  };

  const syncLocale = () => {
    locale.value = BREVO_LOCALES.includes(i18n.currentLang)
      ? i18n.currentLang
      : "en";
  };

  syncLocale();
  document.addEventListener("languageChanged", syncLocale);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (button.disabled) return;

    clearFeedback();

    const address = email.value.trim();

    if (!EMAIL_RE.test(address)) {
      setFeedback("error", "newsletter.invalidEmail");
      email.focus();
      return;
    }

    if (!consent.checked) {
      setFeedback("error", "newsletter.consentRequired");
      consent.focus();
      return;
    }

    email.value = address;
    button.disabled = true;
    setLabel("newsletter.sending");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data || data.success !== true) {
        throw new Error("Subscription failed");
      }

      form.reset();
      syncLocale();
      setFeedback("success", "newsletter.success");
    } catch {
      setFeedback("error", "newsletter.error");
    } finally {
      button.disabled = false;
      setLabel("newsletter.submit");
    }
  });
}
