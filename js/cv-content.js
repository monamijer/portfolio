/**
 * cv-content.js
 * Content of the downloadable CV (English and French), built from the same
 * data as the site so it never drifts. Pure module: used by scripts/cv.mjs
 * at build time. Studies come from studies.js, so the level is always current.
 */

import { PROFILE, PROJECTS, SKILL_GROUPS, KEY_PROJECTS } from "./data.js";
import { studyStatus } from "./studies.js";

const SITE = "https://monamijer.github.io/portfolio/";

const COPY = {
  en: {
    role: "Full-Stack Web Developer",
    profile:
      "Full-stack oriented web developer who cares about well-structured code, thoughtful UI and products that actually serve people. Open to freelance work.",
    education: "Education",
    projects: "Key projects",
    skills: "Skills",
    current: "current",
    diploma: "Secondary school diploma",
    inDevelopment: "in development",
    levels: { advanced: "Advanced", proficient: "Proficient", working: "Working knowledge", also: "Also used in projects" },
  },
  fr: {
    role: "Développeur web full-stack",
    profile:
      "Développeur web orienté full-stack, attaché à un code bien structuré, à une interface réfléchie et à des produits qui servent réellement les gens. Ouvert aux missions freelance.",
    education: "Formation",
    projects: "Projets clés",
    skills: "Compétences",
    current: "en cours",
    diploma: "Diplôme de fin d'études secondaires",
    inDevelopment: "en développement",
    levels: { advanced: "Avancé", proficient: "Solide", working: "Notions pratiques", also: "Aussi utilisé dans les projets" },
  },
};

const PROJECT_TEXT = {
  optimal: {
    en: "Academic documentation platform: Markdown courses rendered as sanitised HTML, table of contents with scroll tracking, dark mode and route guards.",
    fr: "Plateforme de documentation académique : cours en Markdown rendus en HTML assaini, sommaire avec suivi du défilement, mode sombre et gardes de routes.",
  },
  serieTracker: {
    en: "Spring Boot web API to find films and series by name or actor and to track what you have watched, using the TMDB API.",
    fr: "API web Spring Boot pour trouver films et séries par nom ou acteur et suivre ce que l'on a vu, via l'API TMDB.",
  },
  psag: {
    en: "Parish management web application: activities, users, catechumens and administration, with authentication and role-based access control.",
    fr: "Application web de gestion paroissiale : activités, utilisateurs, catéchumènes et administration, avec authentification et contrôle d'accès par rôles.",
  },
};

const bare = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function buildCv(lang = "en", now = new Date()) {
  const t = COPY[lang];
  const study = studyStatus(now);

  return {
    lang,
    name: PROFILE.name,
    role: t.role,
    contact: [
      { text: PROFILE.location },
      { text: PROFILE.email, url: `mailto:${PROFILE.email}` },
      { text: bare(SITE), url: SITE },
      { text: "github.com/monamijer", url: PROFILE.socials.github },
      { text: "LinkedIn", url: PROFILE.socials.linkedin },
    ],
    profile: t.profile,
    headings: { education: t.education, projects: t.projects, skills: t.skills },
    education: [
      {
        title: study.school,
        detail: `${study.level} · ${study.field}`,
        when: `${study.academicYear} (${t.current})`,
      },
      { title: t.diploma, detail: "", when: "2021" },
    ],
    projects: KEY_PROJECTS.map((key) => {
      const p = PROJECTS.find((x) => x.key === key);
      const url = p.slug ? p.repo : (p.repo ?? p.demo);
      return {
        title: p.title,
        status: p.status ? t.inDevelopment : "",
        tags: p.tags.join(" · "),
        text: PROJECT_TEXT[key][lang],
        link: { text: bare(url), url },
      };
    }),
    skills: SKILL_GROUPS.map(({ level, items }) => ({
      label: t.levels[level],
      items: items.map((i) => i.name).join(", "),
    })),
  };
}
