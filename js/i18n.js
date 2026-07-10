/**
 * i18n.js
 * Internationalization system with English, French, Swahili, and Spanish support.
 */

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    common: {
      available: "Available for freelance",
      scrollToExplore: "Scroll to explore",
      selectedWork: "Selected Work",
      allProjects: "All Projects →",
      viewWork: "View Work",
      letsTalk: "Let's Talk",
      aboutMe: "About me",
      location: "Location",
      education: "Education",
      expertise: "Expertise",
      status: "Status",
      email: "Email",
      getInTouch: "Get in touch",
      skills: "Skills",
      services: "Services",
      portfolio: "Portfolio",
      contact: "Contact",
      letsWorkTogether: "Let's work<br>together.",
      contactText:
        "Have a project in mind or just want to say hi? My inbox is open.",
      yourName: "Your Name",
      yourEmail: "Your Email",
      message: "Message",
      messagePlaceholder: "Tell me about your project…",
      sendMessage: "Send Message",
      live: "Live",
      code: "Code",
      sending: "Sending…",
      success: "✓ Message sent! I'll get back to you soon.",
      error: "✗ Something went wrong. Please try again or email me directly.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      contact: "Contact",
    },
    common: {
      available: "Disponible pour freelance",
      scrollToExplore: "Défiler pour explorer",
      selectedWork: "Travaux sélectionnés",
      allProjects: "Tous les projets →",
      viewWork: "Voir le travail",
      letsTalk: "Discutons",
      aboutMe: "À propos de moi",
      location: "Localisation",
      education: "Formation",
      expertise: "Expertise",
      status: "Statut",
      email: "Email",
      getInTouch: "Me contacter",
      skills: "Compétences",
      services: "Services",
      portfolio: "Portfolio",
      contact: "Contact",
      letsWorkTogether: "Travaillons<br>ensemble.",
      contactText:
        "Un projet en tête ou juste envie de dire bonjour ? Ma boîte mail est ouverte.",
      yourName: "Votre nom",
      yourEmail: "Votre email",
      message: "Message",
      messagePlaceholder: "Parlez-moi de votre projet…",
      sendMessage: "Envoyer le message",
      live: "Live",
      code: "Code",
      sending: "Envoi…",
      success: "✓ Message envoyé ! Je vous répondrai bientôt.",
      error:
        "✗ Une erreur est survenue. Réessayez ou envoyez-moi un email directement.",
    },
  },
  sw: {
    nav: {
      home: "Nyumbani",
      about: "Kuhusu",
      projects: "Miradi",
      contact: "Mawasiliano",
    },
    common: {
      available: "Napatikana kwa kazi",
      scrollToExplore: "Tembeza kuchunguza",
      selectedWork: "Kazi zilizochaguliwa",
      allProjects: "Miradi yote →",
      viewWork: "Tazama kazi",
      letsTalk: "Tuzungumze",
      aboutMe: "Kuhusu mimi",
      location: "Mahali",
      education: "Elimu",
      expertise: "Utaalam",
      status: "Hali",
      email: "Barua pepe",
      getInTouch: "Wasiliana nami",
      skills: "Ujuzi",
      services: "Huduma",
      portfolio: "Portfolio",
      contact: "Mawasiliano",
      letsWorkTogether: "Tufanye kazi<br>pamoja.",
      contactText:
        "Una mradi akilini au unataka tu kusema hello? Barua pepe yangu iko wazi.",
      yourName: "Jina lako",
      yourEmail: "Barua pepe yako",
      message: "Ujumbe",
      messagePlaceholder: "Niambie kuhusu mradi wako…",
      sendMessage: "Tuma ujumbe",
      live: "Moja kwa moja",
      code: "Msimbo",
      sending: "Inatuma…",
      success: "✓ Ujumbe umetumwa! Nitarudi kwako hivi karibuni.",
      error:
        "✗ Kuna tatizo. Tafadhali jaribu tena au nitumie barua pepe moja kwa moja.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      contact: "Contacto",
    },
    common: {
      available: "Disponible para freelance",
      scrollToExplore: "Desplázate para explorar",
      selectedWork: "Trabajos seleccionados",
      allProjects: "Todos los proyectos →",
      viewWork: "Ver trabajo",
      letsTalk: "Hablemos",
      aboutMe: "Sobre mí",
      location: "Ubicación",
      education: "Educación",
      expertise: "Experiencia",
      status: "Estado",
      email: "Correo",
      getInTouch: "Contactarme",
      skills: "Habilidades",
      services: "Servicios",
      portfolio: "Portafolio",
      contact: "Contacto",
      letsWorkTogether: "Trabajemos<br>juntos.",
      contactText:
        "¿Tienes un proyecto en mente o solo quieres saludar? Mi bandeja de entrada está abierta.",
      yourName: "Tu nombre",
      yourEmail: "Tu correo",
      message: "Mensaje",
      messagePlaceholder: "Cuéntame sobre tu proyecto…",
      sendMessage: "Enviar mensaje",
      live: "En vivo",
      code: "Código",
      sending: "Enviando…",
      success: "✓ ¡Mensaje enviado! Te responderé pronto.",
      error:
        "✗ Algo salió mal. Por favor intenta de nuevo o envíame un correo directamente.",
    },
  },
};

const languages = {
  en: { flag: "🇬🇧", name: "English" },
  fr: { flag: "🇫🇷", name: "Français" },
  sw: { flag: "🇹🇿", name: "Kiswahili" },
  es: { flag: "🇪🇸", name: "Español" },
};

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem("lang") || "en";
    this.init();
  }

  init() {
    this.setupLanguageSwitcher();
    this.applyTranslations();
  }

  setLang(lang) {
    if (!translations[lang]) return;
    this.currentLang = lang;
    localStorage.setItem("lang", lang);
    this.applyTranslations();
    this.updateSwitcherUI();
    document.dispatchEvent(
      new CustomEvent("languageChanged", { detail: { lang } }),
    );
  }

  t(key) {
    const keys = key.split(".");
    let value = translations[this.currentLang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }

  applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = this.t(key);
      if (translation) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = translation;
        } else {
          el.innerHTML = translation;
        }
      }
    });

    document.documentElement.lang = this.currentLang;
  }

  setupLanguageSwitcher() {
    const container = document.getElementById("langSwitcher");
    if (!container) return;

    container.innerHTML = `
      <button class="lang-toggle" id="langToggle" aria-label="Change language">
        ${languages[this.currentLang].flag}
        <span>${this.currentLang.toUpperCase()}</span>
        <i class="bi bi-chevron-down"></i>
      </button>
      <div class="lang-dropdown" id="langDropdown">
        ${Object.entries(languages)
          .map(
            ([code, lang]) => `
          <button class="lang-option ${code === this.currentLang ? "active" : ""}" data-lang="${code}">
            <span>${lang.flag}</span>
            <span>${lang.name}</span>
            ${code === this.currentLang ? '<i class="bi bi-check"></i>' : ""}
          </button>
        `,
          )
          .join("")}
      </div>
    `;

    const toggle = document.getElementById("langToggle");
    const dropdown = document.getElementById("langDropdown");

    toggle.addEventListener("click", () => {
      dropdown.classList.toggle("open");
      toggle.setAttribute("aria-expanded", dropdown.classList.contains("open"));
    });

    dropdown.addEventListener("click", (e) => {
      const option = e.target.closest(".lang-option");
      if (option) {
        this.setLang(option.dataset.lang);
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!container.contains(e.target)) {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  updateSwitcherUI() {
    const toggle = document.getElementById("langToggle");
    const dropdown = document.getElementById("langDropdown");
    if (!toggle || !dropdown) return;

    toggle.innerHTML = `
      ${languages[this.currentLang].flag}
      <span>${this.currentLang.toUpperCase()}</span>
      <i class="bi bi-chevron-down"></i>
    `;

    dropdown.innerHTML = Object.entries(languages)
      .map(
        ([code, lang]) => `
      <button class="lang-option ${code === this.currentLang ? "active" : ""}" data-lang="${code}">
        <span>${lang.flag}</span>
        <span>${lang.name}</span>
        ${code === this.currentLang ? '<i class="bi bi-check"></i>' : ""}
      </button>
    `,
      )
      .join("");
  }
}

const i18n = new I18n();
export { i18n, translations };
