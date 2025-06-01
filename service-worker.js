const CACHE_NAME = 'book-of-dragons-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/scripts.js',
    '/style.css', // if separate
    '/parchment-texture.jpg',
    '/banner.png',
    '/favicon-96x96.png',
    '/apple-touch-icon.png',
    // add more assets here
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
