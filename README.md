# Monami Jerome — Developer Portfolio

<div align="center">

**A lightweight, framework-independent developer portfolio built for performance, clarity, and maintainability.**

[Live Portfolio](https://monamijer.github.io/portfolio) · [Report an Issue](https://github.com/monamijer/portfolio/issues) · [GitHub Repository](https://github.com/monamijer/portfolio)

![Last Commit](https://img.shields.io/github/last-commit/monamijer/portfolio?style=flat-square)
![License](https://img.shields.io/github/license/monamijer/portfolio?style=flat-square)
![Visitors](https://komarev.com/ghpvc/?username=monamijer&repo=portfolio&style=flat-square&color=blueviolet)

</div>

---

## Overview

A personal developer portfolio designed to present projects, technical skills, and professional work through a clean and responsive interface.

Built with vanilla JavaScript, semantic HTML5, and modular CSS3, the application prioritizes lightweight architecture, efficient navigation, and long-term maintainability without relying on a heavy frontend framework.

## Key Features

- **Lightweight Architecture:** Vanilla JavaScript with minimal runtime overhead.
- **Client-Side Routing:** SPA navigation using the History API.
- **Internationalization:** Dynamic language switching and localized content.
- **Modular Design:** Separated data, application logic, routing, and presentation.
- **Responsive Interface:** Adaptive layouts powered by Bootstrap 5 and custom CSS.
- **Development Workflow:** Vite, ESLint, Prettier, and automated GitHub Actions deployment.

## Technology Stack

| Category | Technologies |
|---|---|
| Structure | HTML5 |
| Styling | CSS3, Bootstrap 5 |
| Application Logic | JavaScript (ES6+) |
| Build Tool | Vite |
| Code Quality | ESLint, Prettier |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |

## Project Structure

```text
portfolio/
├── .github/
│   └── workflows/       # CI/CD workflows
├── css/                 # Stylesheets
├── images/              # Visual assets
├── public/              # Static public assets
├── js/
│   ├── data.js          # Portfolio content and configuration
│   ├── i18n.js           # Localization
│   ├── main.js           # Application entry point
│   ├── router.js         # Client-side routing
│   └── views.js          # Dynamic view rendering
├── index.html            # Main HTML document
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/monamijer/portfolio.git

# Navigate to the project
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Generate the production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the code with Prettier |
| `npm run reinstall` | Reinstall project dependencies |

## Production Build

```bash
npm run build
```

The optimized production files are generated in the `dist/` directory.

## Contributing

Contributions, bug reports, and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

## GitHub Statistics

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
