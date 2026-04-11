/**
 * data.js
 * Single source of truth — edit this file to update your portfolio content.
 */

export const PROFILE = {
  name:       'Monami Jerome',
  title:      'Web Developer & Designer',
  tagline:    'I craft clean, fast\nand purposeful\ndigital experiences.',
  bio:        "I'm a full-stack oriented web developer. I care about well-structured code, thoughtful UI, and products that actually serve people. Currently pursuing an MSc in Software Engineering.",
  location:   'Bujumbura, Burundi',
  email:      'monamijer2005@gmail.com',
  photo:      'images/jer-profile.jpg',
  education:  'MSc Software Engineering',
  expertise:  'Angular · Express · Node.js',
  activity:   'Student & Freelancer',
  socials: {
    github:   'https://github.com/monamijer',
    linkedin: 'https://www.linkedin.com/in/monami-j%C3%A9r%C3%B4me-025038275/',
    twitter:  'https://x.com/JeromeMonami',
    facebook: 'https://www.facebook.com/profile.php?id=100064694379155',
    instagram:'https://www.instagram.com/monamijerome/',
  },
};

export const SKILLS = [
  { name: 'HTML & CSS',   level: 90 },
  { name: 'JavaScript',   level: 75 },
  { name: 'Angular',      level: 65 },
  { name: 'Node / Express', level: 60 },
  { name: 'Git & CI/CD',  level: 70 },
];

export const SERVICES = [
  { icon: 'bi-code-slash',      title: 'Web Development',  desc: 'Responsive, performant sites from scratch.' },
  { icon: 'bi-cart3',           title: 'E-Commerce',       desc: 'Storefronts with payment integration.' },
  { icon: 'bi-tools',           title: 'Maintenance',      desc: 'Ongoing support and improvements.' },
  { icon: 'bi-plug',            title: 'API Integration',  desc: 'REST APIs with Node.js & Express.' },
];

export const PROJECTS = [
  {
    title: 'Portfolio Website',
    desc:  'This very site — a zero-dependency SPA built with vanilla JS, custom router, and CSS custom properties.',
    tags:  ['HTML', 'CSS', 'Vanilla JS'],
    demo:  'https://monamijer.github.io/portfolio',
    repo:  'https://github.com/monamijer/portfolio',
    emoji: '⛩️',   // shown as placeholder if no image
    // image: 'images/projects/portfolio.jpg',
  },
  {
    title: 'PSAG Parish Management',
    desc:  'Web application for managing parish activities, users, cathechumens and administration with authentication and rol-based access control.',
    tags:  ['PHP', 'MySQL', 'JavaScript', 'AJAX'],
    demo:  'https://mjerome.alwaysdata.net/psag_parish',
    repo:  null,
    emoji: '⛪',
  },
  {
    title: 'REST API Backend',
    desc:  'Scalable REST API built with Express and PostgreSQL, documented with Swagger.',
    tags:  ['Express', 'PostgreSQL', 'Swagger'],
    demo:  null,
    repo:  null,
    emoji: '⚡',
  },
];
