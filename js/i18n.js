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
    profile: {
      tagline: "I craft clean, fast<br>and purposeful<br>digital experiences.",
      bio: "I'm a full-stack oriented web developer. I care about well-structured code, thoughtful UI, and products that actually serve people. Currently pursuing an MSc in Software Engineering.",
      location: "Bujumbura, Burundi",
      education: "MSc Software Engineering",
      expertise: "Angular · Express · Node.js",
      activity: "Student & Freelancer",
    },
    skills: {
      htmlCss: "HTML & CSS",
      javascript: "JavaScript",
      angular: "Angular",
      nodeExpress: "Node / Express",
      gitCicd: "Git & CI/CD",
    },
    services: {
      webDev: {
        title: "Web Development",
        desc: "Responsive, performant sites from scratch.",
      },
      ecommerce: {
        title: "E-Commerce",
        desc: "Storefronts with payment integration.",
      },
      maintenance: {
        title: "Maintenance",
        desc: "Ongoing support and improvements.",
      },
      apiIntegration: {
        title: "API Integration",
        desc: "REST APIs with Node.js & Express.",
      },
    },
    projects: {
      portfolio: {
        title: "Portfolio Website",
        desc: "This very site — a zero-dependency SPA built with vanilla JS, custom router, and CSS custom properties.",
      },
      psag: {
        title: "PSAG Parish Management",
        desc: "Web application for managing parish activities, users, cathechumens and administration with authentication and rol-based access control.",
      },
      django: {
        title: "Django Local Library",
        desc: "Scalable learning Library built in django.",
      },
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
    profile: {
      tagline:
        "Je crée des expériences<br>numériques propres,<br>rapides et utiles.",
      bio: "Je suis un développeur web orienté full-stack. Je me soucie d'un code bien structuré, d'une UI réfléchie et de produits qui servent réellement les gens. Actuellement en Master en Génie Logiciel.",
      location: "Bujumbura, Burundi",
      education: "MSc Génie Logiciel",
      expertise: "Angular · Express · Node.js",
      activity: "Étudiant & Freelance",
    },
    skills: {
      htmlCss: "HTML & CSS",
      javascript: "JavaScript",
      angular: "Angular",
      nodeExpress: "Node / Express",
      gitCicd: "Git & CI/CD",
    },
    services: {
      webDev: {
        title: "Développement Web",
        desc: "Sites responsives et performants à partir de zéro.",
      },
      ecommerce: {
        title: "E-Commerce",
        desc: "Boutiques avec intégration de paiement.",
      },
      maintenance: {
        title: "Maintenance",
        desc: "Support continu et améliorations.",
      },
      apiIntegration: {
        title: "Intégration API",
        desc: "APIs REST avec Node.js & Express.",
      },
    },
    projects: {
      portfolio: {
        title: "Site Portfolio",
        desc: "Ce site même — une SPA sans dépendance construite avec vanilla JS, routeur personnalisé et propriétés CSS personnalisées.",
      },
      psag: {
        title: "Gestion Paroissiale PSAG",
        desc: "Application web pour gérer les activités paroissiales, utilisateurs, catéchumènes et administration avec authentification et contrôle d'accès basé sur les rôles.",
      },
      django: {
        title: "Bibliothèque Locale Django",
        desc: "Bibliothèque d'apprentissage évolutive construite avec Django.",
      },
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
    profile: {
      tagline:
        "Ninaunda safi, haraka<br>na zenye kusudi<br>uzoefu wa kidijitali.",
      bio: "Mimi ni msanidi wa web mwenye mwelekeo wa full-stack. Ninajali code iliyopangwa vizuri, UI yenye kufikiriwa, na bidhaa zinazohudumia watu kweli. Kwa sasa ninafanya MSc katika Uhandisi wa Programu.",
      location: "Bujumbura, Burundi",
      education: "MSc Uhandisi wa Programu",
      expertise: "Angular · Express · Node.js",
      activity: "Mwanafunzi & Mfanyakazi huru",
    },
    skills: {
      htmlCss: "HTML & CSS",
      javascript: "JavaScript",
      angular: "Angular",
      nodeExpress: "Node / Express",
      gitCicd: "Git & CI/CD",
    },
    services: {
      webDev: {
        title: "Uendelezaji wa Web",
        desc: "Tovuti responsive na zenye utendaji mzuri kutoka mwanzo.",
      },
      ecommerce: {
        title: "Biashara ya Mtandaoni",
        desc: "Maduka yenye uunganisho wa malipo.",
      },
      maintenance: {
        title: "Matengenezo",
        desc: "Msaada unaoendelea na maboresho.",
      },
      apiIntegration: {
        title: "Uunganisho wa API",
        desc: "APIs za REST na Node.js & Express.",
      },
    },
    projects: {
      portfolio: {
        title: "Tovuti ya Portfolio",
        desc: "Tovuti hii haswa — SPA isiyo na utegemezi iliyojengwa kwa vanilla JS, router maalum, na sifa za CSS.",
      },
      psag: {
        title: "Usimamizi wa Parokia ya PSAG",
        desc: "Programu ya web kwa kusimamia shughuli za parokia, watumiaji, katekumeni na usimamizi kwa uthibitisho na udhibiti wa ufikiaji kulingana na majukumu.",
      },
      django: {
        title: "Maktaba ya Ndani ya Django",
        desc: "Maktaba ya kujifunza inayoweza kupanuka iliyojengwa kwa Django.",
      },
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
    profile: {
      tagline:
        "Creo experiencias<br>digitales limpias,<br>rápidas y con propósito.",
      bio: "Soy un desarrollador web orientado a full-stack. Me preocupo por el código bien estructurado, UI reflexiva y productos que realmente sirven a las personas. Actualmente cursando un MSc en Ingeniería de Software.",
      location: "Bujumbura, Burundi",
      education: "MSc Ingeniería de Software",
      expertise: "Angular · Express · Node.js",
      activity: "Estudiante & Freelancer",
    },
    skills: {
      htmlCss: "HTML & CSS",
      javascript: "JavaScript",
      angular: "Angular",
      nodeExpress: "Node / Express",
      gitCicd: "Git & CI/CD",
    },
    services: {
      webDev: {
        title: "Desarrollo Web",
        desc: "Sitios responsivos y de alto rendimiento desde cero.",
      },
      ecommerce: {
        title: "Comercio Electrónico",
        desc: "Tiendas con integración de pagos.",
      },
      maintenance: {
        title: "Mantenimiento",
        desc: "Soporte continuo y mejoras.",
      },
      apiIntegration: {
        title: "Integración de API",
        desc: "APIs REST con Node.js & Express.",
      },
    },
    projects: {
      portfolio: {
        title: "Sitio Portfolio",
        desc: "Este mismo sitio — una SPA sin dependencias construida con vanilla JS, router personalizado y propiedades CSS personalizadas.",
      },
      psag: {
        title: "Gestión Parroquial PSAG",
        desc: "Aplicación web para gestionar actividades parroquiales, usuarios, catecúmenos y administración con autenticación y control de acceso basado en roles.",
      },
      django: {
        title: "Biblioteca Local Django",
        desc: "Biblioteca de aprendizaje escalable construida con Django.",
      },
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
          if (key.includes("placeholder")) {
            el.placeholder = translation;
          } else {
            el.value = translation;
          }
        } else if (translation.includes("<br>")) {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
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
