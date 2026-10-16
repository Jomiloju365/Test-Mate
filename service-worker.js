const CACHE_NAME = "test-mate-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./index.js",
  "./style.css",
  "./displayPage.html",
  "./display.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./displayPage.css",
  "./settingsPage.html",
  "./settingsPage.css",
  "./settingsPage.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});