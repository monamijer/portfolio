/**
 * router.js
 * Lightweight hash-based SPA router.
 * Maps #/path → view render function.
 */

export class Router {
  /** @type {{ [path: string]: () => string }} */
  #routes = {};

  /** @param {HTMLElement} outlet – DOM node where views are injected */
  constructor(outlet) {
    this.outlet = outlet;
    window.addEventListener('hashchange', () => this.#resolve());
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
    this.#resolve();
  }

  #resolve() {
    const hash   = window.location.hash.replace('#', '') || '/';
    const render = this.#routes[hash] ?? this.#routes['/404'] ?? (() => '<p>Page not found.</p>');

    // Swap content with a subtle fade
    this.outlet.style.animation = 'none';
    this.outlet.innerHTML = render();
    void this.outlet.offsetWidth;              // force reflow
    this.outlet.style.animation = '';

    // Highlight active nav link
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href').replace('#', '') || '/';
      a.classList.toggle('active', href === hash);
    });

    // Scroll top on navigation
    window.scrollTo({ top: 0 });

    // Dispatch a custom event so views can run post-render logic
    window.dispatchEvent(new CustomEvent('route:changed', { detail: { path: hash } }));
  }
}
