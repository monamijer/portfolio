/**
 * prerender.mjs
 * Post-build step: emit one real HTML file per route (dist/about/index.html …)
 * with its own <title>, description and canonical, plus 404.html and
 * sitemap.xml. GitHub Pages serves these with HTTP 200, so every route is
 * indexable and deep links work without a client-side redirect hack.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { ROUTES, SITE, routeUrl } from "../js/routes-meta.js";

const dist = new URL("../dist/", import.meta.url);
const template = readFileSync(new URL("index.html", dist), "utf8");

const esc = (text) =>
  text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function swap(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender: "${label}" not found in dist/index.html`);
  return html.replace(pattern, () => replacement);
}

function render(route) {
  const { title, description } = ROUTES[route];
  const url = routeUrl(route);
  let html = template;
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`, "title");
  html = swap(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(description)}" />`, "description");
  html = swap(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(description)}" />`, "og:description");
  html = swap(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${esc(description)}" />`, "twitter:description");
  html = swap(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${esc(title)}" />`, "og:title");
  html = swap(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${esc(title)}" />`, "twitter:title");
  html = swap(html, /<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`, "canonical");
  html = swap(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`, "og:url");
  return html;
}

for (const route of Object.keys(ROUTES)) {
  if (route === "/") continue;
  const dir = new URL(`${route.slice(1)}/`, dist);
  mkdirSync(dir, { recursive: true });
  writeFileSync(new URL("index.html", dir), render(route));
}

// Home keeps its own metadata (same values), written back for consistency.
writeFileSync(new URL("index.html", dist), render("/"));

// 404.html: same SPA shell (renders the in-app 404 view), never indexed.
let notFound = swap(template, /<title>[^<]*<\/title>/, "<title>Page not found · Monami Jerome</title>", "title");
notFound = swap(notFound, /<meta\s+name="robots"\s+content="[^"]*"\s*\/>/, '<meta name="robots" content="noindex" />', "robots");
writeFileSync(new URL("404.html", dist), notFound);

const urls = Object.keys(ROUTES)
  .map((route) => `  <url>\n    <loc>${routeUrl(route)}</loc>\n    <priority>${route === "/" ? "1.0" : "0.8"}</priority>\n  </url>`)
  .join("\n");
writeFileSync(
  new URL("sitemap.xml", dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

console.log(`prerender: ${Object.keys(ROUTES).length} routes + 404.html + sitemap.xml (${SITE})`);
