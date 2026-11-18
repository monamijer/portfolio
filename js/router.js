/**
 * router.js
 * Lightweight History API router (clean URLs under Vite's base path).
 * Maps "/path" → view render function. Legacy "#/path" URLs are redirected.
 */

import { BASE, currentRoute, routeHref } from "./paths.js";
import { ROUTES, routeUrl } from "./routes-meta.js";

export class Router {
  /** @type {{ [path: string]: () => string }} */
  #routes = {};

  /** @param {HTMLElement} outlet – DOM node where views are injected */
  constructor(outlet) {
    this.outlet = outlet;
    window.addEventListener("popstate", () => this.#resolve());
    document.addEventListener("click", (event) => this.#onClick(event));
  }

  /**
   * Register a route.
   * @param {string}   path   - e.g. '/' or '/about'
   * @param {Function} render - returns an HTML string
   */
  on(path, render) {
    this.#routes[path] = render;
    return this; // chainable
  }

  /** Start the router (call once after all routes are registered). */
  start() {
    // Old shared links like ".../portfolio/#/about" → ".../portfolio/about/"
    const legacy = window.location.hash.match(/^#(\/.*)$/);
    if (legacy) {
      const route = legacy[1].replace(/\/+$/, "") || "/";
      window.history.replaceState(null, "", routeHref(route));
    }
    this.#resolve();
  }

  /** Navigate to a route without a full page load. */
  navigate(path) {
    if (path === currentRoute()) {
      window.scrollTo({ top: 0 });
      return;
    }
    window.history.pushState(null, "", routeHref(path));
    this.#resolve();
  }

  /** Turn clicks on internal route links into client-side navigation. */
  #onClick(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const anchor = event.target.closest("a[href]");
    if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
    if (anchor.getAttribute("href").startsWith("#")) return; // in-page anchors

    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (!url.pathname.startsWith(BASE)) return;

    const route = currentRoute(url.pathname);
    if (!(route in this.#routes)) return; // files, unknown paths: normal load

    event.preventDefault();
    this.navigate(route);
  }

  /** Update <title>, description and canonical for the current route. */
  #applyMeta(path) {
    const meta = ROUTES[path];
    if (!meta) {
      document.title = "Page not found · Monami Jerome";
      return;
    }
    document.title = meta.title;
    const url = routeUrl(path);
    const set = (selector, attr, value) =>
      document.querySelector(selector)?.setAttribute(attr, value);
    set('meta[name="description"]', "content", meta.description);
    set('meta[property="og:description"]', "content", meta.description);
    set('meta[name="twitter:description"]', "content", meta.description);
    set('meta[property="og:title"]', "content", meta.title);
    set('meta[name="twitter:title"]', "content", meta.title);
    set('link[rel="canonical"]', "href", url);
    set('meta[property="og:url"]', "content", url);
  }

  #resolve() {
    const path = currentRoute();
    const render = this.#routes[path] ?? this.#routes["/404"];

    if (!render) {
      // If no 404 route is defined, show a default message
      this.outlet.innerHTML = "<p>Page not found.</p>";
      window.dispatchEvent(
        new CustomEvent("route:changed", { detail: { path: "/404" } }),
      );
      return;
    }

    // Swap content with a subtle fade
    this.outlet.style.animation = "none";
    this.outlet.innerHTML = render();
    void this.outlet.offsetWidth; // force reflow
    this.outlet.style.animation = "";

    // Highlight active nav link
    document.querySelectorAll(".nav-links a").forEach((a) => {
      const linkRoute = currentRoute(new URL(a.href, window.location.href).pathname);
      a.classList.toggle("active", linkRoute === path);
    });

    this.#applyMeta(path);

    // Scroll top on navigation
    window.scrollTo({ top: 0 });

    // Dispatch a custom event so views can run post-render logic
    window.dispatchEvent(
      new CustomEvent("route:changed", { detail: { path } }),
    );
  }
}
