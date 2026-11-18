/**
 * views.js
 * Each exported function returns an HTML string for a route.
 */

import { PROFILE, SKILL_GROUPS, SERVICES, PROJECTS } from "./data.js";
import { routeHref } from "./paths.js";
import { CASE_STUDIES } from "./case-studies.js";

/* ── Shared marquee strip ────────────────────────────────────── */
const marquee = () => {
  const items = [
    "Web Development",
    "·",
    "UI Design",
    "·",
    "Angular",
    "·",
    "Node.js",
    "·",
    "Open to Work",
    "·",
    "PHP",
	"·",
      ];
  // Duplicate for seamless loop
  const inner = [...items, ...items]
    .map((t, i) => `<span${t === "·" ? ' class="accent"' : ""}>${t}</span>`)
    .join("");
  return `
    <div class="marquee-track" aria-hidden="true">
      <div class="marquee-inner">${inner}</div>
    </div>`;
};

/* ── HOME ───────────────────────────────────────────────────── */
export const homeView = () => /* html */ `
  <div class="container page">
    <section class="home-hero">

      <div class="hero-text reveal reveal-left">
        <span class="section-label" data-i18n="common.available">Available for freelance</span>
        <h1>
          <span class="typing-container">
            <span id="typing-text"></span>
            <span class="typing-cursor">|</span>
          </span>
        </h1>
        <p data-i18n="profile.bioShort">${PROFILE.bio.split(".")[0]}.</p>
        <div class="hero-cta">
          <a class="btn btn-primary" href="${routeHref('/projects')}">
            <i class="bi bi-grid-3x3-gap"></i> <span data-i18n="common.viewWork">View Work</span>
          </a>
          <a class="btn btn-outline" href="${routeHref('/contact')}"><span data-i18n="common.letsTalk">Let's Talk</span></a>
        </div>
      </div>

      <div class="hero-image-wrap reveal reveal-right reveal-delay-2">
        <img
          src="${PROFILE.photo}"
          alt="Portrait of ${PROFILE.name}"
          loading="eager"
          onerror="this.style.display='none'"
        />
        <p class="hero-scroll-hint" data-i18n="common.scrollToExplore">Scroll to explore</p>
      </div>

    </section>
  </div>

  ${marquee()}

  <!-- Teaser: latest projects -->
  <div class="container" style="padding-bottom: var(--space-xl)">
    <div class="reveal" style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:var(--space-md)">
      <h2 style="font-size:clamp(1.6rem,3vw,2.5rem)" data-i18n="common.selectedWork">Selected Work</h2>
      <a href="${routeHref('/projects')}" class="btn btn-outline" style="font-size:0.7rem" data-i18n="common.allProjects">All Projects →</a>
    </div>
    <div class="projects-grid">
      ${PROJECTS.slice(0, 2)
        .map((project, index) => projectCard(project, index, true))
        .join("")}
    </div>
  </div>
`;

/* ── ABOUT ──────────────────────────────────────────────────── */
export const aboutView = () => /* html */ `
  <div class="container page">
    <div class="about-grid">

      <div class="about-photo reveal reveal-left">
        <img
          src="${PROFILE.photo}"
          alt="Portrait of ${PROFILE.name}"
          loading="lazy"
          onerror="this.parentElement.style.background='var(--surface)'"
        />
      </div>

      <div class="about-content">
        <div class="reveal">
          <span class="section-label" data-i18n="common.aboutMe">About me</span>
          <h1>${PROFILE.name}</h1>
          <p data-i18n="profile.bio">${PROFILE.bio}</p>
        </div>

        <div class="info-grid reveal reveal-delay-1">
          <div class="info-item"><strong data-i18n="common.location">Location</strong><span data-i18n="profile.location">${PROFILE.location}</span></div>
          <div class="info-item"><strong data-i18n="common.education">Education</strong><span data-i18n="profile.education">${PROFILE.education}</span></div>
          <div class="info-item"><strong data-i18n="common.expertise">Expertise</strong><span data-i18n="profile.expertise">${PROFILE.expertise}</span></div>
          <div class="info-item"><strong data-i18n="common.status">Status</strong><span data-i18n="profile.activity">${PROFILE.activity}</span></div>
          <div class="info-item">
            <strong data-i18n="common.email">Email</strong>
            <a href="mailto:${PROFILE.email}" style="color:var(--accent)">${PROFILE.email}</a>
          </div>
        </div>

        <div class="reveal reveal-delay-2">
          <a class="btn btn-primary" href="${routeHref('/contact')}">
            <i class="bi bi-send"></i> <span data-i18n="common.getInTouch">Get in touch</span>
          </a>
        </div>

        <!-- Skills -->
        <div class="skills-section reveal">
          <h2 data-i18n="common.skills">Skills</h2>
          <div class="skill-groups">
            ${SKILL_GROUPS.map(
              ({ level, items }) => `
              <section class="skill-group">
                <h3 data-i18n="skills.levels.${level}">${level}</h3>
                <ul>
                  ${items.map(skillItem).join("")}
                </ul>
              </section>`,
            ).join("")}
          </div>
        </div>

        <!-- Services -->
        <div class="services-section reveal reveal-delay-1">
          <h2 data-i18n="common.services">Services</h2>
          <div class="services-grid">
            ${SERVICES.map(({ icon, title, desc }, index) => {
              const serviceKey = getServiceKey(index);
              return `
              <div class="service-card reveal reveal-delay-${index + 1}">
                <i class="bi ${icon}"></i>
                <h5 data-i18n="services.${serviceKey}.title">${title}</h5>
                <p style="font-size:.8rem;color:var(--muted);margin-top:.4rem" data-i18n="services.${serviceKey}.desc">${desc}</p>
              </div>`;
            }).join("")}
          </div>
        </div>

      </div>
    </div>
  </div>
`;

/* ── PROJECTS ───────────────────────────────────────────────── */
export const projectsView = () => /* html */ `
  <div class="container page">
    <div class="projects-header reveal">
      <span class="section-label" data-i18n="common.portfolio">Portfolio</span>
      <h1 data-i18n="common.selectedWork">Selected Work</h1>
    </div>
    
    <!-- Project Filters -->
    <div class="project-filters reveal reveal-delay-1" role="tablist" aria-label="Filter projects">
      <button class="filter-btn active" data-filter="all" role="tab" aria-selected="true">
        <span data-i18n="filters.all">All</span>
      </button>
      <button class="filter-btn" data-filter="web" role="tab" aria-selected="false">
        <i class="bi bi-globe"></i>
        <span data-i18n="filters.web">Web Apps</span>
      </button>
      <button class="filter-btn" data-filter="fullstack" role="tab" aria-selected="false">
        <i class="bi bi-layers"></i>
        <span data-i18n="filters.fullstack">Full Stack</span>
      </button>
      <button class="filter-btn" data-filter="backend" role="tab" aria-selected="false">
        <i class="bi bi-server"></i>
        <span data-i18n="filters.backend">Backend</span>
      </button>
    </div>

    <div class="projects-grid" id="projectsGrid">
      ${PROJECTS.map((project, index) => projectCard(project, index, true)).join("")}
    </div>
    
    <!-- No results message -->
    <div class="no-results" id="noResults" style="display:none">
      <i class="bi bi-search"></i>
      <p data-i18n="filters.noResults">No projects found in this category.</p>
    </div>
  </div>
`;

/* ── CONTACT ────────────────────────────────────────────────── */
export const contactView = () => /* html */ `
  <div class="container page">
    <div class="contact-grid">

      <div class="contact-info reveal reveal-left">
        <span class="section-label" data-i18n="common.contact">Contact</span>
        <h1 data-i18n="common.letsWorkTogether">Let's work<br>together.</h1>
        <p data-i18n="common.contactText">Have a project in mind or just want to say hi? My inbox is open.</p>

        <div class="contact-links">
          <a class="contact-link-item" href="mailto:${PROFILE.email}">
            <i class="bi bi-envelope"></i> ${PROFILE.email}
          </a>
          <a class="contact-link-item" href="${PROFILE.socials.github}" target="_blank" rel="noopener">
            <i class="bi bi-github"></i> github.com/monamijer
          </a>
          <a class="contact-link-item" href="${PROFILE.socials.linkedin}" target="_blank" rel="noopener">
            <i class="bi bi-linkedin"></i> LinkedIn
          </a>
          <a class="contact-link-item" href="${PROFILE.socials.instagram}" target="_blank" rel="noopener">
            <i class="bi bi-instagram"></i> Instagram
          </a>
        </div>
      </div>

      <form
        class="contact-form reveal reveal-right reveal-delay-1"
        id="contactForm"
        action="https://formsubmit.co/monamijer2005@gmail.com"
        method="POST"
        novalidate
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New message from portfolio" />

        <div class="form-group">
          <label for="name" data-i18n="common.yourName">Your Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="" 
            required 
            minlength="2"
            maxlength="50"
            autocomplete="name"
          />
          <small class="error-message" data-error-for="name"></small>
        </div>

        <div class="form-group">
          <label for="email" data-i18n="common.yourEmail">Your Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="" 
            required 
            autocomplete="email"
          />
          <small class="error-message" data-error-for="email"></small>
        </div>

        <div class="form-group">
          <label for="message" data-i18n="common.message">Message</label>
          <textarea 
            id="message" 
            name="message" 
            data-i18n="common.messagePlaceholder" 
            placeholder="Tell me about your project…" 
            required 
            minlength="10"
            maxlength="1000"
          ></textarea>
          <small class="error-message" data-error-for="message"></small>
          <small class="char-counter" data-char-for="message"></small>
        </div>

        <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">
          <i class="bi bi-send"></i> <span data-i18n="common.sendMessage">Send Message</span>
        </button>

        <div class="form-feedback" id="formFeedback"></div>
      </form>

    </div>
  </div>
`;

/* ── 404 NOT FOUND ──────────────────────────────────────────── */
export const notFoundView = () => /* html */ `
  <div class="container page not-found-page">
    <div class="not-found-content reveal reveal-scale">
      <div class="not-found-code">404</div>
      <h1 class="not-found-title" data-i18n="notFound.title">Page Not Found</h1>
      <p class="not-found-message" data-i18n="notFound.message">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div class="not-found-actions">
        <a href="${routeHref('/')}" class="btn btn-primary">
          <i class="bi bi-house"></i>
          <span data-i18n="notFound.backHome">Back to Home</span>
        </a>
        <a href="${routeHref('/projects')}" class="btn btn-outline">
          <i class="bi bi-grid-3x3-gap"></i>
          <span data-i18n="notFound.viewProjects">View Projects</span>
        </a>
      </div>
    </div>
  </div>
`;

/* ── Helper functions ───────────────────────────────────────── */
function skillItem({ name, i18n, projects }) {
  const label = i18n
    ? `<strong data-i18n="skills.${i18n}">${name}</strong>`
    : `<strong>${name}</strong>`;
  const used = projects
    .map((key) => PROJECTS.find((p) => p.key === key)?.title)
    .filter(Boolean)
    .join(" · ");
  return `<li>${label}${used ? `<span class="skill-used">${used}</span>` : ""}</li>`;
}

function getServiceKey(index) {
  const keys = ["webDev", "ecommerce", "maintenance", "apiIntegration"];
  return keys[index] || `service${index}`;
}

/* ── Shared project card component ──────────────────────────── */
function projectCard(
  { key, title, desc, tags, demo, repo, emoji, image, slug, status, categories = ["web"] },
  index,
  withReveal = false,
) {
  const projectKey = key;
  const thumb = image
    ? `<img src="${image}" alt="${title}" loading="lazy" />`
    : `<div class="project-thumb-placeholder">${emoji ?? "◆"}</div>`;

  const links = [
    slug
      ? `<a class="project-case-link" href="${routeHref(`/projects/${slug}`)}"><i class="bi bi-journal-text"></i> <span data-i18n="common.caseStudy">Case study</span></a>`
      : "",
    demo
      ? `<a href="${demo}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> <span data-i18n="common.live">Live</span></a>`
      : "",
    repo
      ? `<a href="${repo}" target="_blank" rel="noopener"><i class="bi bi-github"></i> <span data-i18n="common.code">Code</span></a>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  const revealClass = withReveal
    ? ` reveal reveal-delay-${Math.min(index + 1, 5)}`
    : "";

  return /* html */ `
    <article class="project-card${revealClass}" data-categories="${categories.join(",")}">
      <div class="project-thumb">${thumb}${
        status
          ? `<span class="project-status" data-i18n="common.inDevelopment">In development</span>`
          : ""
      }</div>
      <div class="project-body">
        <h3 data-i18n="projects.${projectKey}.title">${title}</h3>
        <p data-i18n="projects.${projectKey}.desc">${desc}</p>
        <div class="tag-list">${tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        ${links ? `<div class="project-links">${links}</div>` : ""}
      </div>
    </article>`;
}

/* ── CASE STUDY (detailed project page) ─────────────────────── */
export const caseStudyView = (slug) => {
  const c = CASE_STUDIES[slug];
  if (!c) return notFoundView();

  return /* html */ `
  <div class="container page case-study">
    <a class="case-back" href="${routeHref("/projects")}">
      <i class="bi bi-arrow-left"></i> <span data-i18n="common.backToProjects">Back to projects</span>
    </a>

    <header class="case-hero reveal">
      <span class="section-label">Case study</span>
      <h1>${c.title}</h1>
      <p class="case-tagline">${c.tagline}</p>
      <div class="case-actions">
        <a class="btn btn-primary" href="${c.repo}" target="_blank" rel="noopener">
          <i class="bi bi-github"></i> Source code
        </a>
        <span class="case-demo-note">Public demo: coming soon</span>
      </div>
    </header>

    <dl class="case-facts reveal">
      ${c.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}
    </dl>

    <figure class="case-shot case-shot-main reveal">
      <img src="${c.screenshots[0].src}" alt="${c.screenshots[0].alt}" width="1200" height="750" />
      <figcaption>${c.screenshots[0].caption}</figcaption>
    </figure>

    <section class="case-section reveal">
      <h2>Why I am building it</h2>
      <p>${c.why}</p>
    </section>

    <section class="case-section reveal">
      <h2>What works today</h2>
      <ul class="case-cards">
        ${c.works.map(([t, d]) => `<li><h3>${t}</h3><p>${d}</p></li>`).join("")}
      </ul>
    </section>

    <section class="case-section reveal">
      <h2>Architecture</h2>
      <p>${c.architecture.intro}</p>
      <ul class="case-folders">
        ${c.architecture.folders.map(([f, d]) => `<li><code>${f}</code><span>${d}</span></li>`).join("")}
      </ul>
      <p class="case-note">${c.architecture.note}</p>
    </section>

    <section class="case-section reveal">
      <h2>More screens</h2>
      <div class="case-gallery">
        ${c.screenshots
          .slice(1)
          .map(
            (s) => `<figure class="case-shot"><img src="${s.src}" alt="${s.alt}" loading="lazy" width="1200" height="750" /><figcaption>${s.caption}</figcaption></figure>`,
          )
          .join("")}
      </div>
      <p class="case-note">Screenshots are taken from a local development build.</p>
    </section>

    <section class="case-section case-two reveal">
      <div>
        <h2>What I am practising</h2>
        <ul class="case-list">${c.learned.map((l) => `<li>${l}</li>`).join("")}</ul>
      </div>
      <div>
        <h2>What is next</h2>
        <ul class="case-list">${c.next.map((n) => `<li>${n}</li>`).join("")}</ul>
      </div>
    </section>

    <div class="reveal">
      <a class="btn btn-outline" href="${routeHref("/projects")}">
        <i class="bi bi-grid-3x3-gap"></i> <span data-i18n="common.backToProjects">Back to projects</span>
      </a>
    </div>
  </div>
`;
};
