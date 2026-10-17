const CACHE_NAME = "test-mate-v3";

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
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});