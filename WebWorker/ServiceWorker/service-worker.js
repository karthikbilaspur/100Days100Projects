// service-worker.js
// This script runs in a separate Service Worker thread, independent of the main page.

const CACHE_NAME = 'offline-cache-v2'; // Increment cache version to force update
const urlsToCache = [
    '/', // Cache the root path (index.html)
    'index.html',
    'script.js',
    'styles.css',
    // Add any other assets like images, fonts that you want to cache
    // 'assets/image.jpg',
    // 'fonts/roboto.woff2'
];

// 1. Install Event: Caching static assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('[Service Worker] Caching failed:', error);
            })
    );
});

// 2. Activate Event: Cleaning up old caches and taking control
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                    return null;
                })
            );
        })
    );
    // Ensure the Service Worker takes control of clients immediately upon activation
    return self.clients.claim();
});

// 3. Fetch Event: Intercepting network requests
self.addEventListener('fetch', (event) => {
    // console.log('[Service Worker] Fetching:', event.request.url); // Can be noisy
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    console.log('[Service Worker] Serving from cache:', event.request.url);
                    return response;
                }
                console.log('[Service Worker] Fetching from network:', event.request.url);
                return fetch(event.request);
            })
            .catch(error => {
                console.error('[Service Worker] Fetch failed:', error);
                // This is where you could serve an offline fallback page/image
                // For example: return caches.match('/offline.html');
                // Or a generic offline response:
                // return new Response('<h1>You are offline!</h1><p>Please connect to the internet.</p>', {
                //     headers: { 'Content-Type': 'text/html' }
                // });
            })
    );
});
