const cacheName = 'todo-app-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
