/**
 * i18n.js
 * Internationalization system with English, French, Swahili, Spanish, German and Lingala support.
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
      downloadCv: "Download CV",
      caseStudy: "Case study",
      inDevelopment: "In development",
      backToProjects: "Back to projects",
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
      darkModeEnabled: "Dark Mode Enabled",
      lightModeEnabled: "Light Mode Enabled",
    },
    profile: {
      tagline: "I craft clean, fast<br>and purposeful<br>digital experiences.",
      bio: "I'm a full-stack oriented web developer. I care about well-structured code, thoughtful UI, and products that actually serve people. I'm studying Software Engineering at Bujumbura International University.",
      bioShort: "I'm a full-stack oriented web developer.",
      location: "Bujumbura, Burundi",
      expertise: "Angular · Express · Node.js",
      activity: "Student & Freelancer",
    },
    skills: {
      levels: {
        advanced: "Advanced",
        proficient: "Proficient",
        working: "Working knowledge",
        also: "Also used in projects",
      },
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
      optimal: {
        title: "Optimal",
        desc: "Academic documentation platform that turns course Markdown into clean study pages, with a live table of contents, scroll tracking and dark mode.",
      },
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
      selfDriving: {
        title: "Self-Driving Academy",
        desc: "A WordPress-powered platform for a self-driving school — course listings, online booking, instructor profiles and a custom admin dashboard.",
      },
      serieTracker: {
        title: "Serie Tracker",
        desc: "A SpringBoot web app challenges, incremental projects, helping users to find films and series, series by name, actors and manages his views using TMDB API",
      },
    },
    newsletter: {
      title: "Newsletter",
      text: "Occasional notes on web development, new projects and lessons learned. No spam.",
      label: "Email address",
      placeholder: "you@example.com",
      consent: "I agree to receive the newsletter by email.",
      submit: "Subscribe",
      sending: "Subscribing…",
      success: "✓ Thank you for subscribing!",
      error: "✗ Subscription failed. Please try again later.",
      invalidEmail: "Please enter a valid email address.",
      consentRequired: "Please tick the consent box to subscribe.",
    },
    privacy: {
      link: "Privacy notice",
      title: "Privacy notice",
      intro: "This site is a personal portfolio. It collects only the data described below.",
      newsletterTitle: "Newsletter",
      newsletterText: "If you subscribe, your email address is stored by Brevo, my email service provider based in France, only to send you the newsletter. Your consent is the legal basis. I never sell or share your address.",
      contactTitle: "Contact form",
      contactText: "Messages sent through the contact form are delivered to me by FormSubmit and used only to reply to you.",
      storageTitle: "Local data",
      storageText: "Your theme, language and reading-mode choices are saved in your browser only. No analytics or advertising cookies are used. Fonts and icons are loaded from Google Fonts and jsDelivr.",
      rightsTitle: "Your rights",
      rightsText: "You can unsubscribe with the link in every email, and ask me to access or delete your data at any time by writing to the address on the Contact page.",
      back: "Back to home",
    },
    journey: {
      title: "Journey",
      primary: "Started primary school",
      secondary: "Secondary school diploma",
      university: "Studying at Bujumbura International University",
      keyProjects: "Key projects",
    },
    notFound: {
      title: "Page Not Found",
      message:
        "Oops! The page you're looking for doesn't exist or has been moved.",
      backHome: "Back to Home",
      viewProjects: "View Projects",
    },
    filters: {
      all: "All",
      web: "Web Apps",
      fullstack: "Full Stack",
      backend: "Backend",
      noResults: "No projects found in this category.",
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
      downloadCv: "Télécharger le CV",
      caseStudy: "Étude de cas",
      inDevelopment: "En développement",
      backToProjects: "Retour aux projets",
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

      darkModeEnabled: "Mode sombre activé",
      lightModeEnabled: "Mode clair activé",
    },
    profile: {
      tagline:
        "Je crée des expériences<br>numériques propres,<br>rapides et utiles.",
      bio: "Je suis un développeur web orienté full-stack. Je me soucie d'un code bien structuré, d'une UI réfléchie et de produits qui servent réellement les gens. J'étudie le génie logiciel à Bujumbura International University.",
      bioShort: "Je suis un développeur web orienté full-stack.",
      location: "Bujumbura, Burundi",
      expertise: "Angular · Express · Node.js",
      activity: "Étudiant & Freelance",
    },
    skills: {
      levels: {
        advanced: "Avancé",
        proficient: "Solide",
        working: "Notions pratiques",
        also: "Aussi utilisé dans les projets",
      },
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
      optimal: {
        title: "Optimal",
        desc: "Plateforme de documentation académique qui transforme des cours en Markdown en pages d'étude claires, avec sommaire dynamique, suivi du défilement et mode sombre.",
      },
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
      selfDriving: {
        title: "Auto-École de Conduite",
        desc: "Une plateforme WordPress pour une auto-école — catalogue de cours, réservation en ligne, profils des instructeurs et tableau de bord d'administration personnalisé.",
      },
      serieTracker: {
        title: "Suivi de Films & Séries",
        desc: "Une application web développée avec SpringBoot qui permet aux utilisateurs de trouver des films et séries, de rechercher des séries par nom ou par acteurs, et de gérer leurs visionnages grâce à l'API TMDB.",
      },
    },
    newsletter: {
      title: "Newsletter",
      text: "Des notes occasionnelles sur le développement web, mes nouveaux projets et ce que j'apprends. Pas de spam.",
      label: "Adresse email",
      placeholder: "vous@exemple.com",
      consent: "J'accepte de recevoir la newsletter par email.",
      submit: "S'abonner",
      sending: "Inscription…",
      success: "✓ Merci pour votre inscription !",
      error: "✗ L'inscription a échoué. Veuillez réessayer plus tard.",
      invalidEmail: "Veuillez saisir une adresse email valide.",
      consentRequired: "Veuillez cocher la case de consentement pour vous abonner.",
    },
    privacy: {
      link: "Confidentialité",
      title: "Confidentialité",
      intro: "Ce site est un portfolio personnel. Il ne collecte que les données décrites ci-dessous.",
      newsletterTitle: "Newsletter",
      newsletterText: "Si vous vous abonnez, votre adresse email est conservée par Brevo, mon prestataire d'envoi d'emails basé en France, uniquement pour vous envoyer la newsletter. Votre consentement est la base légale. Je ne vends ni ne partage jamais votre adresse.",
      contactTitle: "Formulaire de contact",
      contactText: "Les messages envoyés via le formulaire de contact me sont transmis par FormSubmit et servent uniquement à vous répondre.",
      storageTitle: "Données locales",
      storageText: "Vos choix de thème, de langue et de mode lecture sont enregistrés uniquement dans votre navigateur. Aucun cookie d'analyse ou de publicité n'est utilisé. Les polices et icônes sont chargées depuis Google Fonts et jsDelivr.",
      rightsTitle: "Vos droits",
      rightsText: "Vous pouvez vous désabonner via le lien présent dans chaque email, et me demander d'accéder à vos données ou de les supprimer à tout moment en écrivant à l'adresse indiquée sur la page Contact.",
      back: "Retour à l'accueil",
    },
    journey: {
      title: "Parcours",
      primary: "Début de l'école primaire",
      secondary: "Diplôme de fin d'études secondaires",
      university: "Études à Bujumbura International University",
      keyProjects: "Projets clés",
    },
    notFound: {
      title: "Page Introuvable",
      message:
        "Oups ! La page que vous recherchez n'existe pas ou a été déplacée.",
      backHome: "Retour à l'Accueil",
      viewProjects: "Voir les Projets",
    },
    filters: {
      all: "Tous",
      web: "Apps Web",
      fullstack: "Full Stack",
      backend: "Backend",
      noResults: "Aucun projet trouvé dans cette catégorie.",
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
      downloadCv: "Pakua wasifu (CV)",
      caseStudy: "Uchunguzi wa mradi",
      inDevelopment: "Inaendelezwa",
      backToProjects: "Rudi kwenye miradi",
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

      darkModeEnabled: "Hali ya giza imewashwa",
      lightModeEnabled: "Hali ya mwanga imewashwa",
    },
    profile: {
      tagline:
        "Ninaunda safi, haraka<br>na zenye kusudi<br>uzoefu wa kidijitali.",
      bio: "Mimi ni msanidi wa web mwenye mwelekeo wa full-stack. Ninajali code iliyopangwa vizuri, UI yenye kufikiriwa, na bidhaa zinazohudumia watu kweli. Ninasoma uhandisi wa programu katika Bujumbura International University.",
      bioShort: "Mimi ni msanidi wa web mwenye mwelekeo wa full-stack.",
      location: "Bujumbura, Burundi",
      expertise: "Angular · Express · Node.js",
      activity: "Mwanafunzi & Mfanyakazi huru",
    },
    skills: {
      levels: {
        advanced: "Ya juu",
        proficient: "Imara",
        working: "Ufahamu wa kazi",
        also: "Pia imetumika katika miradi",
      },
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
      selfDriving: {
        title: "Akademia ya Udereva",
        desc: "Jukwaa linalotumia WordPress kwa shule ya udereva — orodha ya kozi, kuweka nafasi mtandaoni, wasifu wa wakufunzi na dashibodi maalum ya usimamizi.",
      },
      serieTracker: {
        title: "Kifuatiliaji cha Series",
        desc: "Programu ya web ya SpringBoot inayosaidia watumiaji kupata filamu na series, series kwa jina, waigizaji na kusimamia maoni yao kwa kutumia API ya TMDB.",
      },
    },
    newsletter: {
      title: "Jarida",
      text: "Maelezo ya hapa na pale kuhusu uundaji wa tovuti, miradi mipya na mambo ninayojifunza. Hakuna barua taka.",
      label: "Anwani ya barua pepe",
      placeholder: "wewe@mfano.com",
      consent: "Nakubali kupokea jarida kwa barua pepe.",
      submit: "Jiandikishe",
      sending: "Inajisajili…",
      success: "✓ Asante kwa kujiandikisha!",
      error: "✗ Usajili umeshindwa. Tafadhali jaribu tena baadaye.",
      invalidEmail: "Tafadhali weka anwani halali ya barua pepe.",
      consentRequired: "Tafadhali weka alama kwenye kisanduku cha idhini ili ujiandikishe.",
    },
    privacy: {
      link: "Taarifa ya faragha",
    },
    journey: {
      title: "Safari yangu",
      primary: "Kuanza shule ya msingi",
      secondary: "Cheti cha kuhitimu sekondari",
      university: "Masomo katika Bujumbura International University",
      keyProjects: "Miradi muhimu",
    },
    notFound: {
      title: "Ukurasa Haupatikani",
      message: "Lo! Ukurasa unaoutafuta haupo au umehamishwa.",
      backHome: "Rudi Nyumbani",
      viewProjects: "Tazama Miradi",
    },
    filters: {
      all: "Zote",
      web: "Programu za Web",
      fullstack: "Full Stack",
      backend: "Backend",
      noResults: "Hakuna miradi iliyopatikana katika kitengo hiki.",
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
      downloadCv: "Descargar CV",
      caseStudy: "Caso de estudio",
      inDevelopment: "En desarrollo",
      backToProjects: "Volver a proyectos",
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
      darkModeEnabled: "Modo oscuro activado",
      lightModeEnabled: "Modo claro activado",
    },
    profile: {
      tagline:
        "Creo experiencias<br>digitales limpias,<br>rápidas y con propósito.",
      bio: "Soy un desarrollador web orientado a full-stack. Me preocupo por el código bien estructurado, UI reflexiva y productos que realmente sirven a las personas. Estudio ingeniería de software en Bujumbura International University.",
      bioShort: "Soy un desarrollador web orientado a full-stack.",
      location: "Bujumbura, Burundi",
      expertise: "Angular · Express · Node.js",
      activity: "Estudiante & Freelancer",
    },
    skills: {
      levels: {
        advanced: "Avanzado",
        proficient: "Sólido",
        working: "Conocimiento práctico",
        also: "También usado en proyectos",
      },
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
      selfDriving: {
        title: "Autoescuela de Conducción",
        desc: "Una plataforma basada en WordPress para una autoescuela — listado de cursos, reserva en línea, perfiles de instructores y panel de administración personalizado.",
      },
      serieTracker: {
        title: "Rastreador de Series",
        desc: "Una aplicación web SpringBoot que ayuda a los usuarios a encontrar películas y series, series por nombre, actores y gestionar sus visualizaciones usando la API de TMDB.",
      },
    },
    newsletter: {
      title: "Boletín",
      text: "Notas ocasionales sobre desarrollo web, nuevos proyectos y lo que voy aprendiendo. Sin spam.",
      label: "Correo electrónico",
      placeholder: "tu@ejemplo.com",
      consent: "Acepto recibir el boletín por correo electrónico.",
      submit: "Suscribirme",
      sending: "Suscribiendo…",
      success: "✓ ¡Gracias por suscribirte!",
      error: "✗ No se pudo completar la suscripción. Inténtalo de nuevo más tarde.",
      invalidEmail: "Introduce una dirección de correo válida.",
      consentRequired: "Marca la casilla de consentimiento para suscribirte.",
    },
    privacy: {
      link: "Aviso de privacidad",
    },
    journey: {
      title: "Trayectoria",
      primary: "Inicio de la escuela primaria",
      secondary: "Diploma de educación secundaria",
      university: "Estudios en Bujumbura International University",
      keyProjects: "Proyectos clave",
    },
    notFound: {
      title: "Página No Encontrada",
      message: "¡Ups! La página que buscas no existe o ha sido movida.",
      backHome: "Volver al Inicio",
      viewProjects: "Ver Proyectos",
    },
    filters: {
      all: "Todos",
      web: "Apps Web",
      fullstack: "Full Stack",
      backend: "Backend",
      noResults: "No se encontraron proyectos en esta categoría.",
    },
  },
  de: {
    nav: {
      home: "Startseite",
      about: "Über mich",
      projects: "Projekte",
      contact: "Kontakt",
    },
    common: {
      downloadCv: "Lebenslauf herunterladen",
      caseStudy: "Fallstudie",
      inDevelopment: "In Entwicklung",
      backToProjects: "Zurück zu den Projekten",
      available: "Verfügbar für Freelance",
      scrollToExplore: "Scrollen zum Entdecken",
      selectedWork: "Ausgewählte Arbeiten",
      allProjects: "Alle Projekte →",
      viewWork: "Arbeit ansehen",
      letsTalk: "Lass uns reden",
      aboutMe: "Über mich",
      location: "Standort",
      education: "Ausbildung",
      expertise: "Expertise",
      status: "Status",
      email: "E-Mail",
      getInTouch: "Kontakt aufnehmen",
      skills: "Fähigkeiten",
      services: "Dienstleistungen",
      portfolio: "Portfolio",
      contact: "Kontakt",
      letsWorkTogether: "Lass uns<br>zusammenarbeiten.",
      contactText:
        "Haben Sie ein Projekt im Kopf oder möchten Sie einfach Hallo sagen? Mein Posteingang ist offen.",
      yourName: "Ihr Name",
      yourEmail: "Ihre E-Mail",
      message: "Nachricht",
      messagePlaceholder: "Erzählen Sie mir von Ihrem Projekt…",
      sendMessage: "Nachricht senden",
      live: "Live",
      code: "Code",
      sending: "Senden…",
      success: "✓ Nachricht gesendet! Ich werde mich bald melden.",
      error:
        "✗ Etwas ist schief gelaufen. Bitte versuchen Sie es erneut oder senden Sie mir eine E-Mail.",
      darkModeEnabled: "Dunkelmodus aktiviert",
      lightModeEnabled: "Hellmodus aktiviert",
    },
    profile: {
      tagline:
        "Ich gestalte saubere,<br>schnelle und zielgerichtete<br>digitale Erfahrungen.",
      bio: "Ich bin ein Full-Stack-orientierter Webentwickler. Ich lege Wert auf gut strukturierten Code, durchdachte UI und Produkte, die den Menschen wirklich dienen. Ich studiere Softwaretechnik an der Bujumbura International University.",
      bioShort: "Ich bin ein Full-Stack-orientierter Webentwickler.",
      location: "Bujumbura, Burundi",
      expertise: "Angular · Express · Node.js",
      activity: "Student & Freelancer",
    },
    skills: {
      levels: {
        advanced: "Fortgeschritten",
        proficient: "Solide",
        working: "Grundkenntnisse",
        also: "Außerdem in Projekten genutzt",
      },
      htmlCss: "HTML & CSS",
      javascript: "JavaScript",
      angular: "Angular",
      nodeExpress: "Node / Express",
      gitCicd: "Git & CI/CD",
    },
    services: {
      webDev: {
        title: "Webentwicklung",
        desc: "Responsive, leistungsstarke Websites von Grund auf.",
      },
      ecommerce: {
        title: "E-Commerce",
        desc: "Online-Shops mit Zahlungsintegration.",
      },
      maintenance: {
        title: "Wartung",
        desc: "Laufende Unterstützung und Verbesserungen.",
      },
      apiIntegration: {
        title: "API-Integration",
        desc: "REST-APIs mit Node.js & Express.",
      },
    },
    projects: {
      portfolio: {
        title: "Portfolio-Website",
        desc: "Diese Website — eine SPA ohne Abhängigkeiten, gebaut mit Vanilla JS, eigenem Router und CSS Custom Properties.",
      },
      psag: {
        title: "PSAG Gemeindeverwaltung",
        desc: "Webanwendung zur Verwaltung von Gemeindeaktivitäten, Benutzern, Katechumenen und Administration mit Authentifizierung und rollenbasierter Zugriffskontrolle.",
      },
      django: {
        title: "Django Lokale Bibliothek",
        desc: "Skalierbare Lernbibliothek, gebaut mit Django.",
      },
      selfDriving: {
        title: "Fahrschule Akademie",
        desc: "Eine WordPress-basierte Plattform für eine Fahrschule — Kurslisten, Online-Buchung, Fahrlehrerprofile und ein individuelles Admin-Dashboard.",
      },
      serieTracker: {
        title: "Serien-Tracker",
        desc: "Eine SpringBoot-Webanwendung, die Benutzern hilft, Filme und Serien zu finden, Serien nach Namen und Schauspielern zu suchen und ihre Ansichten über die TMDB-API zu verwalten.",
      },
    },
    filters: {
      all: "Alle",
      web: "Web-Apps",
      fullstack: "Full Stack",
      backend: "Backend",
      noResults: "Keine Projekte in dieser Kategorie gefunden.",
    },
    newsletter: {
      title: "Newsletter",
      text: "Gelegentliche Notizen zu Webentwicklung, neuen Projekten und Gelerntem. Kein Spam.",
      label: "E-Mail-Adresse",
      placeholder: "du@beispiel.de",
      consent: "Ich möchte den Newsletter per E-Mail erhalten.",
      submit: "Abonnieren",
      sending: "Wird angemeldet…",
      success: "✓ Danke für deine Anmeldung!",
      error: "✗ Anmeldung fehlgeschlagen. Bitte versuche es später erneut.",
      invalidEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
      consentRequired: "Bitte setze das Häkchen bei der Einwilligung, um dich anzumelden.",
    },
    privacy: {
      link: "Datenschutz",
    },
    journey: {
      title: "Werdegang",
      primary: "Beginn der Grundschule",
      secondary: "Abschluss der Sekundarschule",
      university: "Studium an der Bujumbura International University",
      keyProjects: "Wichtige Projekte",
    },
    notFound: {
      title: "Seite nicht gefunden",
      message:
        "Hoppla! Die gesuchte Seite existiert nicht oder wurde verschoben.",
      backHome: "Zurück zur Startseite",
      viewProjects: "Projekte ansehen",
    },
  },
  ln: {
    nav: {
      home: "Ebandeli",
      about: "Ngai",
      projects: "Misala",
      contact: "Bosolo",
    },
    common: {
      downloadCv: "Kozwa CV",
      caseStudy: "Etude ya projet",
      inDevelopment: "Ezali kobongisama",
      backToProjects: "Zonga na misala",
      available: "Nazali kosala mosala",
      scrollToExplore: "Gumba mpo na kotala",
      selectedWork: "Misala miye miponami",
      allProjects: "Misala nyonso →",
      viewWork: "Tala misala",
      letsTalk: "Tosolo",
      aboutMe: "Mpo na ngai",
      location: "Esika",
      education: "Kelasi",
      expertise: "Nkita",
      status: "Ezali",
      email: "Email",
      getInTouch: "Solo na ngai",
      skills: "Mayele",
      services: "Misala",
      portfolio: "Portfolio",
      contact: "Bosolo",
      letsWorkTogether: "Tosala<br>esika moko.",
      contactText:
        "Ozali na likanisi ya mosala to olingi kosolo? Email na ngai ezali ofungoli.",
      yourName: "Kombo na yo",
      yourEmail: "Email na yo",
      message: "Nsango",
      messagePlaceholder: "Loba ngai mpo na mosala na yo…",
      sendMessage: "Tinda nsango",
      live: "Live",
      code: "Code",
      sending: "Ezali kotinda…",
      success: "✓ Nsango etindi! Nakozongela yo na noki.",
      error: "✗ Mabe esalemi. Mekola lisusu to tinda ngai email.",
      darkModeEnabled: "Mode ya molili efungoli",
      lightModeEnabled: "Mode ya mwinda efungoli",
    },
    profile: {
      tagline: "Nasalaka biloko<br>ya pete, ya noki<br>mpe ya ntina.",
      bio: "Nazali mosali ya web full-stack. Natalelaka code oyo ebongisami malamu, UI oyo ekanisi malamu, mpe biloko oyo esalisaka bato. Nazali koyekola génie logiciel na Bujumbura International University.",
      bioShort: "Nazali mosali ya web full-stack.",
      location: "Bujumbura, Burundi",
      expertise: "Angular · Express · Node.js",
      activity: "Moyekoli & Mosali ya ndenge na ye",
    },
    skills: {
      levels: {
        advanced: "Makasi",
        proficient: "Malamu",
        working: "Boyebi ya mosala",
        also: "Esalelami lisusu na misala",
      },
      htmlCss: "HTML & CSS",
      javascript: "JavaScript",
      angular: "Angular",
      nodeExpress: "Node / Express",
      gitCicd: "Git & CI/CD",
    },
    services: {
      webDev: {
        title: "Kosala Web",
        desc: "Ba sites oyo ezali kosala malamu na ba appareils nyonso.",
      },
      ecommerce: {
        title: "E-Commerce",
        desc: "Ba magasins na internet na paiement.",
      },
      maintenance: {
        title: "Kobongisa",
        desc: "Kosunga na kobongisa mbala na mbala.",
      },
      apiIntegration: {
        title: "Kokanga API",
        desc: "Ba API REST na Node.js & Express.",
      },
    },
    projects: {
      portfolio: {
        title: "Site ya Portfolio",
        desc: "Site oyo — SPA oyo esalemi na vanilla JS, router na biso moko, mpe ba propriétés CSS.",
      },
      psag: {
        title: "Koyangela Paroisse PSAG",
        desc: "Application web mpo na koyangela misala ya paroisse, bato, ba catéchumènes mpe administration na authentification mpe contrôle ya accès.",
      },
      django: {
        title: "Bibliothèque Django",
        desc: "Bibliothèque ya koyekola oyo ekoki kokola, esalemi na Django.",
      },
      selfDriving: {
        title: "Ecole ya Kotambwisa Moto",
        desc: "Plateforme oyo esalemi na WordPress mpo na école ya kotambwisa moto — ba cours, réservation na internet, ba profils ya ba instructeurs mpe tableau de bord ya administration.",
      },
      serieTracker: {
        title: "Molandi ya Ba Series",
        desc: "Application web esalemi na SpringBoot oyo esalisaka bato ezwaka ba films mpe ba series, koluka series na kombo, ba acteurs mpe kobatela ba vues na bango na API ya TMDB.",
      },
    },
    filters: {
      all: "Nyonso",
      web: "Ba Apps Web",
      fullstack: "Full Stack",
      backend: "Backend",
      noResults: "Misala moko te ezwami na catégorie oyo.",
    },
    newsletter: {
      title: "Newsletter",
      text: "Bamoko ya mikanda mpo na kosala ba site web, misala ya sika mpe makambo nazali koyekola. Spam te.",
      label: "Adresse email",
      placeholder: "yo@exemple.com",
      consent: "Nandimi kozwa newsletter na email.",
      submit: "Kokota",
      sending: "Ezali kokota…",
      success: "✓ Matondi mpo na kokota!",
      error: "✗ Kokota esimbi te. Meká lisusu na sima.",
      invalidEmail: "Pesa adresse email ya malamu.",
      consentRequired: "Tia elembo na case ya bondimi mpo na kokota.",
    },
    privacy: {
      link: "Politiki ya makambo ya moko",
    },
    journey: {
      title: "Nzela na ngai",
      primary: "Kobanda ekolo ya liboso (primaire)",
      secondary: "Diplome ya suka ya secondaire",
      university: "Koyekola na Bujumbura International University",
      keyProjects: "Misala ya ntina",
    },
    notFound: {
      title: "Lokasa ezwami te",
      message: "Ee! Lokasa oyo ozali koluka ezali te to esili kotambola.",
      backHome: "Zonga na Ebandeli",
      viewProjects: "Tala Misala",
    },
  },
};

const languages = {
  en: { flag: "🇬🇧", name: "English" },
  fr: { flag: "🇫🇷", name: "Français" },
  sw: { flag: "🇹🇿", name: "Kiswahili" },
  es: { flag: "🇪🇸", name: "Español" },
  ln: { flag: "🇨🇩", name: "Lingala" },
  de: { flag: "🇩🇪", name: "Deutsch" },
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
    const lookup = (lang) => keys.reduce((v, k) => v?.[k], translations[lang]);
    return lookup(this.currentLang) || lookup("en") || key;
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
      <button class="lang-toggle" id="langToggle" aria-label="${this.currentLang.toUpperCase()}, Change language" aria-haspopup="true" aria-expanded="false">
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

    toggle.setAttribute("aria-label", `${this.currentLang.toUpperCase()}, Change language`);
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