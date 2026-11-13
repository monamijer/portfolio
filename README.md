<div align="center">

# Monami Jerome — Personal Portfolio

*“Code isn't merely a set of instructions — it's a medium for organizing thought.”*

[![Live Demo](https://img.shields.io/badge/Live_Demo-monamijer.github.io-2ea44f?style=for-the-badge&logo=githubpages&logoColor=white)](https://monamijer.github.io/portfolio)
[![GitHub Stars](https://img.shields.io/github/stars/monamijer/portfolio?style=for-the-badge&logo=github&color=yellow)](https://github.com/monamijer/portfolio/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/monamijer/portfolio?style=for-the-badge&logo=github&color=blue)](https://github.com/monamijer/portfolio/network/members)
[![Last Commit](https://img.shields.io/github/last-commit/monamijer/portfolio?style=for-the-badge&logo=git&color=orange)](https://github.com/monamijer/portfolio/commits/main)
[![License: MIT](https://img.shields.io/github/license/monamijer/portfolio?style=for-the-badge&color=lightgrey)](https://opensource.org/licenses/MIT)
[![Visitors](https://komarev.com/ghpvc/?username=monamijer&repo=portfolio&style=for-the-badge&color=blueviolet)](https://github.com/monamijer/portfolio)

**A zero-framework personal portfolio engineered for speed, clarity, and long-term maintainability.**

[View Live Site](https://monamijer.github.io/portfolio) · [Report Bug](https://github.com/monamijer/portfolio/issues) · [Request Feature](https://github.com/monamijer/portfolio/issues)

</div>

---

## 📖 Overview

This repository houses the source code for my personal developer portfolio. Deliberately built without heavy front-end frameworks, it relies on **vanilla JavaScript (ES6+)**, semantic **HTML5**, and modular **CSS3** to achieve sub-second load times and straightforward maintenance.

---

## ✨ Key Features

- **⚡ Zero-Runtime Overhead:** Pure vanilla JavaScript architecture—no virtual DOM or framework bloat.
- **🧭 Custom Client-Side Router:** Seamless Single-Page Application (SPA) navigation without full-page reloads.
- **🌍 Built-in Internationalization (i18n):** Dynamic multi-language switching out of the box.
- **📦 Decoupled Data Layer:** Content and configuration are isolated from view logic for effortless updates.
- **📱 Responsive Design:** Fluid layout powered by Bootstrap 5 and custom CSS.
- **🛠️ Modern DX & CI/CD:** Pre-configured with Vite, ESLint, Prettier, and automated GitHub Actions deployment.

---

## 🧰 Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## 🏗️ Architecture & Project Structure

```text
portfolio/
├── .github/workflows/  # CI/CD deployment pipelines
├── css/                # Modular stylesheets
├── images/             # Optimized static graphics
├── public/             # Static assets served directly at root
├── js/
│   ├── data.js         # Centralized content & portfolio metadata
│   ├── i18n.js         # Localization dictionary & language switcher
│   ├── main.js         # Application bootstrap & event listeners
│   ├── router.js       # Client-side history & route handling
│   └── views.js        # Dynamic DOM rendering templates
├── index.html          # Main entry document
├── package.json        # Dependencies and npm scripts
├── vite.config.js      # Vite bundler configuration
└── README.md           # Project documentation
```

🚀 Getting Started
Prerequisites
Ensure you have the following installed locally:
 * Node.js >= 18.0.0
 * npm >= 9.0.0
Local Development
 * Clone the repository:
   git clone [https://github.com/monamijer/portfolio.git](https://github.com/monamijer/portfolio.git)
cd portfolio

 * Install dependencies:
   npm install

 * Start the development server:
   npm run dev

   Open http://localhost:5173 in your browser to view the application.
Production Build
npm run build

Generates an optimized production bundle in the dist/ directory.
⚙️ Available Scripts
| Command | Action |
|---|---|
| npm run dev | Launches the local Vite development server with HMR |
| npm run build | Bundles and minifies assets for production into dist/ |
| npm run preview | Serves the production build locally for verification |
| npm run lint | Runs ESLint to catch syntax and style issues |
| npm run format | Formats codebase automatically via Prettier |
| npm run reinstall | Wipes node_modules and performs a clean install |
🤝 Contributing
Contributions, bug reports, and feature suggestions are welcome.
 * Fork the project
 * Create your feature branch (git checkout -b feat/amazing-feature)
 * Commit your changes (git commit -m 'feat: add amazing feature')
 * Push to the branch (git push origin feat/amazing-feature)
 * Open a Pull Request
📬 Contact & Links
 * Portfolio: monamijer.github.io/portfolio
 * GitHub: @monamijer
📄 License
Distributed under the MIT License. See LICENSE for more information.