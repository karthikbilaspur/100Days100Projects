self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('offline-cache')
            .then((cache) => {
                return cache.addAll([
                    'index.html',
                    'script.js',
                    'styles.css',
                ]);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('offline', () => {
    document.getElementById('status-output').textContent = 'Status: Offline';
});