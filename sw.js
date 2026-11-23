// Service Worker for Offline Support
const CACHE_VERSION = 'myfittracker-v1.0.0';
const ASSETS = [
    './',
    './index.html',
    './css/styles.css',
    './js/exercises.js',
    './js/data.js',
    './js/svg-animations.js',
    './js/ui.js',
    './js/app.js',
    './manifest.json'
];

// Install
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION).then((cache) => {
            return cache.addAll(ASSETS).catch(() => {
                console.log('Some assets could not be cached');
            });
        })
    );
    self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_VERSION) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch - Cache First, then Network
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }

                return fetch(event.request).then((response) => {
                    if (!response || response.status !== 200 || response.type === 'error') {
                        return response;
                    }

                    const responseToCache = response.clone();
                    caches.open(CACHE_VERSION).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                });
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
