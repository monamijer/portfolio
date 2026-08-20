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
  "/portfolio/images/jer_logo.png",
  "/portfolio/images/monami.png",
  "/portfolio/images/portfolio.png",
  "/portfolio/images/psag.png",
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

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Skip API calls
  if (event.request.url.includes("/api/")) return;

  // Skip form submissions
  if (event.request.url.includes("formsubmit.co")) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
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

// Handle push notifications (future)
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New notification",
    icon: "/portfolio/images/jer_logo.png",
    badge: "/portfolio/images/jer_logo.png",
  };

  event.waitUntil(self.registration.showNotification("MJ Portfolio", options));
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(clients.openWindow("/portfolio/"));
});
