/**
 * paths.js
 * URL helpers for clean routes served under Vite's base (e.g. "/portfolio/").
 */

export const BASE = import.meta.env?.BASE_URL ?? "/portfolio/"; // fallback for Node scripts

/** Route ("/about") for a pathname ("/portfolio/about/"). Defaults to the current URL. */
export function currentRoute(pathname = window.location.pathname) {
  let p = pathname;
  if (p === BASE.slice(0, -1)) return "/";
  if (p.startsWith(BASE)) p = "/" + p.slice(BASE.length);
  p = p.replace(/\/index\.html$/, "/").replace(/\/+$/, "");
  return p || "/";
}

/** Public URL path for a route: "/about" → "/portfolio/about/". */
export function routeHref(route) {
  return route === "/" ? BASE : `${BASE}${route.replace(/^\//, "")}/`;
}

/** Public URL path for a static asset: "images/x.png" → "/portfolio/images/x.png". */
export function assetUrl(path) {
  return `${BASE}${path.replace(/^\//, "")}`;
}
