# Monami Jerome — Developer Portfolio

<div align="center">

**A fast, accessible, multilingual developer portfolio built without a frontend framework.**

[Live Portfolio](https://monamijer.github.io/portfolio/) · [Report an Issue](https://github.com/monamijer/portfolio/issues) · [GitHub Repository](https://github.com/monamijer/portfolio)

![Last Commit](https://img.shields.io/github/last-commit/monamijer/portfolio?style=flat-square)
![License](https://img.shields.io/github/license/monamijer/portfolio?style=flat-square)
![Deploy](https://img.shields.io/github/deployments/monamijer/portfolio/github-pages?style=flat-square&label=deploy)
![Visitors](https://komarev.com/ghpvc/?username=monamijer&repo=portfolio&style=flat-square&color=blueviolet)

</div>

---

## 🚀 Overview

A personal site presenting projects, skills, a study journey and a case study of [Optimal](https://github.com/monamijer/optimal). Vanilla JavaScript, semantic HTML and modular CSS, bundled with Vite and deployed to GitHub Pages.

## ✨ Key Features

- 🧭 **Clean-URL SPA** on the History API (`/about/`, `/projects/optimal/`), with a build-time prerender: one static HTML file per route, `404.html` and `sitemap.xml`.
- 🔎 **SEO and sharing:** per-route title, description and canonical URL, JSON-LD, Open Graph / Twitter card image.
- 🌐 **6 languages:** English, French, Swahili, Spanish, German, Lingala (English fallback).
- ♿ **Accessibility:** WCAG 2.1 AA contrast, skip link, visible focus, focus moved to the content on navigation, `prefers-reduced-motion` support. axe-core: 0 violations.
- 🎓 **Dynamic content:** study level computed from the current academic year; skills grouped by level and linked to projects.
- 📄 **Downloadable CV (EN/FR)** generated as a PDF at build time (`scripts/cv.mjs`).
- 💌 **Newsletter** through a Brevo hosted form, with honeypot, consent checkbox and a privacy notice page.
- 📱 **PWA:** manifest and service worker; light/dark theme and reader mode.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Language | JavaScript (ES modules), HTML5, CSS3 |
| Build | Vite 5, custom Node scripts (prerender, CV) |
| Icons / fonts | Bootstrap Icons, Google Fonts |
| Quality | ESLint, Prettier |
| CI/CD | GitHub Actions → GitHub Pages |

## 📁 Project Structure

```text
portfolio/
├── .github/workflows/   # Build and deploy to GitHub Pages
├── css/style.css        # Design tokens and styles
├── js/
│   ├── main.js          # App bootstrap, theme, UI behaviour
│   ├── router.js        # History API router + per-route meta
│   ├── routes-meta.js   # SEO metadata per route
│   ├── paths.js         # URL helpers (base path aware)
│   ├── views.js         # Page templates
│   ├── data.js          # Profile, skills, projects
│   ├── studies.js       # Academic path and level calculation
│   ├── case-studies.js  # Case study content
│   ├── cv-content.js    # CV content (EN/FR)
│   ├── newsletter.js    # Brevo form handling
│   ├── privacy.js       # Privacy notice
│   └── i18n.js          # Translations
├── public/              # Static assets (images, icons, manifest, service worker)
├── scripts/
│   ├── prerender.mjs    # Static HTML per route, 404, sitemap
│   └── cv.mjs           # PDF CV generation
└── index.html
```

## ⚡ Getting Started

Requires Node.js 20+.

```bash
git clone https://github.com/monamijer/portfolio.git
cd portfolio
npm ci
npm run dev        # http://localhost:5173/portfolio/
```

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build + prerender + CV PDFs in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint on `js/` |
| `npm run format` | Prettier |

## 🌍 Deployment

Every push to `main` that changes site files (`css/`, `js/`, `public/`, `scripts/`, `index.html`, package files or the workflow) builds and deploys to GitHub Pages. Documentation-only commits do not deploy. Pull requests only run the build. The site is also rebuilt on the 1st of each month so the generated CV stays current.

## 🤝 Contributing

Bug reports and suggestions are welcome: open an issue, or fork, branch from `main` and open a pull request.

## 📄 License

MIT. See [LICENSE](LICENSE).

---

## 📊 GitHub Statistics

<div align="center">

### Repository Overview

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=monamijer&show_icons=true&hide_border=true&theme=transparent&rank_icon=github)

### Most Used Languages

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=monamijer&layout=compact&hide_border=true&theme=transparent)

### Contribution Activity

![GitHub Streak](https://streak-stats.demolab.com?user=monamijer&hide_border=true&theme=transparent)

</div>

---

<div align="center">

**Designed with simplicity, built with intention.**

</div>
