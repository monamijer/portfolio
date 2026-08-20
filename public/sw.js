/**
 * sw.js
 * Service Worker for offline support and caching.
 */

const CACHE_NAME = "mj-portfolio-v2.0.0";
const RUNTIME_CACHE = "mj-portfolio-runtime";

// Assets to cache on install
const PRECACHE_ASSETS = [
  "/portfolio/",
  "/portfolio/index.html",
  "/portfolio/css/style.css",
  "/portfolio/css/nexus.css",
  "/portfolio/js/main.js",
  "/portfolio/js/router.js",
  "/portfolio/js/views.js",
  "/portfolio/js/data.js",
  "/portfolio/js/i18n.js",
  "/portfolio/js/nexus.js",
  "/portfolio/manifest.json",
];

// Install event - precache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Precaching assets...");
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting()),
  );
});

// Activate event - clean old caches
self.addEventListener("activate", (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName),
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip cross-origin requests (fonts, icons, form submissions)
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Skip form submissions
  if (url.pathname.includes("formsubmit.co")) return;

  // For images - use cache-first strategy
  if (event.request.destination === "image") {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((response) => {
            // Cache successful image responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Fallback image if offline
            return new Response("", {
              status: 200,
              headers: { "Content-Type": "image/svg+xml" },
            });
          });
      }),
    );
    return;
  }

  // For navigation and other requests - network-first with cache fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Fallback for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/portfolio/index.html");
          }

          return new Response("Offline - Content not available", {
            status: 503,
            statusText: "Service Unavailable",
            headers: { "Content-Type": "text/plain" },
          });
        });
      }),
  );
});
