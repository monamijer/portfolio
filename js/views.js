/**
 * views.js
 * Each exported function returns an HTML string for a route.
 */

import { PROFILE, SKILLS, SERVICES, PROJECTS } from './data.js';

/* ── Shared marquee strip ────────────────────────────────────── */
const marquee = () => {
  const items = ['Web Development', '·', 'UI Design', '·', 'Angular', '·', 'Node.js', '·', 'Open to Work', '·', 'PHP', '.'];
  // Duplicate for seamless loop
  const inner = [...items, ...items]
    .map((t, i) => `<span${t === '·' ? ' class="accent"' : ''}>${t}</span>`)
    .join('');
  return `
    <div class="marquee-track" aria-hidden="true">
      <div class="marquee-inner">${inner}</div>
    </div>`;
};

/* ── HOME ───────────────────────────────────────────────────── */
export const homeView = () => /* html */`
  <div class="container page">
    <section class="home-hero">

      <div class="hero-text">
        <span class="section-label">Available for freelance</span>
        <h1>${PROFILE.tagline.replace(/\n/g, '<br>')}</h1>
        <p>${PROFILE.bio.split('.')[0]}.</p>
        <div class="hero-cta">
          <a class="btn btn-primary" href="#/projects">
            <i class="bi bi-grid-3x3-gap"></i> View Work
          </a>
          <a class="btn btn-outline" href="#/contact">Let's Talk</a>
        </div>
      </div>

      <div class="hero-image-wrap">
        <img
          src="${PROFILE.photo}"
          alt="Portrait of ${PROFILE.name}"
          loading="eager"
          onerror="this.style.display='none'"
        />
        <p class="hero-scroll-hint">Scroll to explore</p>
      </div>

    </section>
  </div>

  ${marquee()}

  <!-- Teaser: latest projects -->
  <div class="container" style="padding-bottom: var(--space-xl)">
    <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:var(--space-md)">
      <h2 style="font-size:clamp(1.6rem,3vw,2.5rem)">Selected Work</h2>
      <a href="#/projects" class="btn btn-outline" style="font-size:0.7rem">All Projects →</a>
    </div>
    <div class="projects-grid">
      ${PROJECTS.slice(0, 2).map(projectCard).join('')}
    </div>
  </div>
`;

/* ── ABOUT ──────────────────────────────────────────────────── */
export const aboutView = () => /* html */`
  <div class="container page">
    <div class="about-grid">

      <div class="about-photo">
        <img
          src="${PROFILE.photo}"
          alt="Portrait of ${PROFILE.name}"
          loading="lazy"
          onerror="this.parentElement.style.background='var(--surface)'"
        />
      </div>

      <div class="about-content">
        <span class="section-label">About me</span>
        <h1>${PROFILE.name}</h1>
        <p>${PROFILE.bio}</p>

        <div class="info-grid">
          <div class="info-item"><strong>Location</strong>${PROFILE.location}</div>
          <div class="info-item"><strong>Education</strong>${PROFILE.education}</div>
          <div class="info-item"><strong>Expertise</strong>${PROFILE.expertise}</div>
          <div class="info-item"><strong>Status</strong>${PROFILE.activity}</div>
          <div class="info-item">
            <strong>Email</strong>
            <a href="mailto:${PROFILE.email}" style="color:var(--accent)">${PROFILE.email}</a>
          </div>
        </div>

        <a class="btn btn-primary" href="#/contact">
          <i class="bi bi-send"></i> Get in touch
        </a>

        <!-- Skills -->
        <div class="skills-section">
          <h2>Skills</h2>
          <div class="skill-list" id="skillList">
            ${SKILLS.map(({ name, level }) => `
              <div class="skill-row">
                <header>
                  <span>${name}</span>
                  <span>${level}%</span>
                </header>
                <div class="skill-bar">
                  <div class="skill-fill" style="--target:${level / 100}"></div>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <!-- Services -->
        <div class="services-section">
          <h2>Services</h2>
          <div class="services-grid">
            ${SERVICES.map(({ icon, title, desc }) => `
              <div class="service-card">
                <i class="bi ${icon}"></i>
                <h5>${title}</h5>
                <p style="font-size:.8rem;color:var(--muted);margin-top:.4rem">${desc}</p>
              </div>`).join('')}
          </div>
        </div>

      </div>
    </div>
  </div>
`;

/* ── PROJECTS ───────────────────────────────────────────────── */
export const projectsView = () => /* html */`
  <div class="container page">
    <div class="projects-header">
      <span class="section-label">Portfolio</span>
      <h1>Selected Work</h1>
    </div>
    <div class="projects-grid">
      ${PROJECTS.map(projectCard).join('')}
    </div>
  </div>
`;

/* ── CONTACT ────────────────────────────────────────────────── */
export const contactView = () => /* html */`
  <div class="container page">
    <div class="contact-grid">

      <div class="contact-info">
        <span class="section-label">Contact</span>
        <h1>Let's work<br>together.</h1>
        <p>Have a project in mind or just want to say hi? My inbox is open.</p>

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
        </div>
      </div>

      <form
        class="contact-form"
        id="contactForm"
        action="https://formsubmit.co/monamijer2005@gmail.com"
        method="POST"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New message from portfolio" />

        <div class="form-group">
          <label for="name">Your Name</label>
          <input type="text" id="name" name="name" placeholder="" required />
        </div>

        <div class="form-group">
          <label for="email">Your Email</label>
          <input type="email" id="email" name="email" placeholder="" required />
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" placeholder="Tell me about your project…" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">
          <i class="bi bi-send"></i> Send Message
        </button>

        <div class="form-feedback" id="formFeedback"></div>
      </form>

    </div>
  </div>
`;

/* ── Shared project card component ──────────────────────────── */
function projectCard({ title, desc, tags, demo, repo, emoji, image }) {
  const thumb = image
    ? `<img src="${image}" alt="${title}" loading="lazy" />`
    : `<div class="project-thumb-placeholder">${emoji ?? '◆'}</div>`;

  const links = [
    demo ? `<a href="${demo}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> Live</a>` : '',
    repo ? `<a href="${repo}" target="_blank" rel="noopener"><i class="bi bi-github"></i> Code</a>` : '',
  ].filter(Boolean).join('');

  return /* html */`
    <article class="project-card">
      <div class="project-thumb">${thumb}</div>
      <div class="project-body">
        <h3>${title}</h3>
        <p>${desc}</p>
        <div class="tag-list">${tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        ${links ? `<div class="project-links">${links}</div>` : ''}
      </div>
    </article>`;
}
