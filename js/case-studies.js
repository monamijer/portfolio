/**
 * case-studies.js
 * Content of the detailed project pages (route: /projects/<slug>/).
 * Plain data: edit the text here, the view in views.js renders it.
 */

import { assetUrl } from "./paths.js";

export const CASE_STUDIES = {
  optimal: {
    title: "Optimal",
    tagline:
      "A documentation platform that turns university course notes, written in Markdown, into clean, navigable study pages.",
    repo: "https://github.com/monamijer/optimal",
    facts: [
      ["Status", "In development"],
      ["Type", "Personal project"],
      ["Stack", "Angular 19 · TypeScript · Signals · Marked · DOMPurify · Bootstrap"],
      ["Content", "4 sample courses in Markdown"],
      ["Tests", "20 unit-test files"],
    ],
    why: "I wanted one place to learn and train on my university courses and the topics I teach myself, instead of juggling scattered PDFs and notes. Optimal is the tool I am building for that, and the project where I practise modern Angular and clean software architecture.",
    works: [
      ["Markdown to safe HTML", "Courses are plain Markdown files. Marked renders them and DOMPurify sanitises the result before it reaches the page, so course content cannot inject scripts."],
      ["A table of contents that follows you", "Every heading gets an anchor, and an “On this page” panel highlights the section being read, using a ScrollSpy built on IntersectionObserver."],
      ["Easy navigation", "A sidebar lists the courses, breadcrumbs show where you are, and a catalogue page presents every course."],
      ["Light and dark theme", "A toggle switches themes, and the first visit follows the system preference."],
      ["Access levels", "Courses are free or premium. A route guard sends visitors to the login page and brings them back to the course afterwards."],
      ["Modern Angular", "Standalone components, signals for state, lazy-loaded feature routes and unit tests."],
    ],
    architecture: {
      intro: "A feature-based structure keeps the app easy to grow:",
      folders: [
        ["core/", "Global services: Markdown parsing, ScrollSpy, theme, breadcrumbs, language"],
        ["layout/", "Header, sidebar and the main layout shell"],
        ["shared/", "Reusable UI pieces"],
        ["features/courses/", "Models, services, pages and components of the course catalogue and reader"],
        ["public/courses/", "Course content: one folder per course, with Markdown files and an index.json"],
      ],
      note: "The UML diagrams in the repository describe a CourseProvider abstraction, so the same interface can read Markdown files today and a Java REST API later.",
    },
    next: [
      "Replace the front-end login mock (hard-coded demo users) with real authentication on a Java API.",
      "Build the professor area for publishing courses (currently a stub).",
      "Add full-text search across all courses.",
      "Deploy a public demo on GitHub Pages.",
      "Add more courses, including self-taught topics.",
    ],
    learned: [
      "Angular signals, standalone components and lazy loading",
      "Handling untrusted HTML safely with sanitisation",
      "Tracking scroll position efficiently with IntersectionObserver",
      "Designing first: UML diagrams for the front end and the future API",
    ],
    screenshots: [
      { src: assetUrl("images/optimal/course.webp"), alt: "Optimal course page with a table of contents highlighting the section being read", caption: "Course page: the table of contents follows the reader." },
      { src: assetUrl("images/optimal/course-dark.webp"), alt: "Optimal course page in dark mode", caption: "The same page in dark mode." },
      { src: assetUrl("images/optimal/catalog.webp"), alt: "Optimal course catalogue showing free and premium courses", caption: "Course catalogue with access levels." },
      { src: assetUrl("images/optimal/home.webp"), alt: "Optimal landing page", caption: "Landing page." },
    ],
  },
};
