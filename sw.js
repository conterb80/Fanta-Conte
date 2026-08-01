const CACHE = 'fanta-conte-rc4-v2';
const BASE = '/Fanta-Conte/';
const ASSETS = [
  BASE, BASE+'index.html', BASE+'style.css', BASE+'data.js', BASE+'xlsx-lite.js',
  BASE+'app.js', BASE+'manifest.json', BASE+'icons/icon-192.png', BASE+'icons/icon-512.png',
  BASE+'icons/maskable-192.png', BASE+'icons/maskable-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match(BASE+'index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response && response.ok && new URL(event.request.url).origin === self.location.origin) {
      const clone = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, clone));
    }
    return response;
  })));
});
