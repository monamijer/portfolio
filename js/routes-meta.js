/**
 * routes-meta.js
 * Per-route SEO metadata. Pure data (no Vite APIs) so that both the browser
 * router and the Node prerender script (scripts/prerender.mjs) can import it.
 */

export const SITE = "https://monamijer.github.io/portfolio/";

export const ROUTES = {
  "/": {
    title: "Monami Jerome · Web Developer & Designer",
    description:
      "Monami Jerome — Web Developer & Designer, Full-stack developer specializing in Angular, Node.js, and PHP.",
  },
  "/about": {
    title: "About · Monami Jerome",
    description:
      "About Monami Jerome: full-stack web developer based in Bujumbura, studying Software Engineering at Bujumbura International University and building with Angular, Node.js and PHP.",
  },
  "/projects": {
    title: "Projects · Monami Jerome",
    description:
      "Selected projects by Monami Jerome: Optimal learning platform, parish management app, driving school platform, Django library, Spring Boot series tracker and this portfolio.",
  },
  "/projects/optimal": {
    title: "Optimal · Case study · Monami Jerome",
    description:
      "Optimal, an Angular 19 documentation platform that turns Markdown course notes into navigable study pages. Architecture, features and roadmap.",
  },
  "/contact": {
    title: "Contact · Monami Jerome",
    description:
      "Get in touch with Monami Jerome for freelance web development, e-commerce, API integration and maintenance.",
  },
  "/privacy": {
    title: "Privacy notice · Monami Jerome",
    description:
      "How this portfolio handles your data: newsletter, contact form and local storage.",
  },
};

/** Absolute public URL of a route: "/about" → ".../portfolio/about/". */
export const routeUrl = (route) =>
  route === "/" ? SITE : `${SITE}${route.replace(/^\//, "")}/`;
