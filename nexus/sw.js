/* ネクサス専用PWA（スコープ: /primussystem/nexus/ ） */
const CACHE = 'purims-nexus-dir-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  '../nexus-icon-192.png',
  '../nexus-icon-512.png',
  '../nexus-apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
