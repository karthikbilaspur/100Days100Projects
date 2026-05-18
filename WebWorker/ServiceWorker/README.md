# Service Worker

HTML Structure: It lays out a basic page with a header, main content sections for status and instructions, and a footer. It includes meta tags for SEO and social sharing.
CSS Styling: The styles.css defines a dark theme, responsive design, and adds subtle animations and transitions for a modern look. It also styles a network status indicator.
script.js (Main Thread): This script registers the service-worker.js. It also dynamically updates a "Network Status" indicator (Online/Offline) based on the browser's navigator.onLine property, providing immediate visual feedback to the user.
service-worker.js (Service Worker Thread): This is the core of the offline demo.
It defines a CACHE_NAME and urlsToCache (including index.html, script.js, styles.css).
During the install event, it opens a cache and adds all urlsToCache to it.
During the activate event, it cleans up older caches to ensure only the latest version is used.
During the fetch event, it intercepts network requests. If a requested resource is found in the cache, it serves it from there (offline first strategy); otherwise, it fetches it from the network.
