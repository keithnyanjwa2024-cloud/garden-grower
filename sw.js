// Service Worker for Garden Grower PWA
const CACHE_NAME = 'garden-grower-v1.0';
const urlsToCache = [
  '/garden-grower/',
  '/garden-grower/index.html',
  '/garden-grower/style.css',
  '/garden-grower/game.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://img.icons8.com/color/192/000000/plant-under-sun.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
