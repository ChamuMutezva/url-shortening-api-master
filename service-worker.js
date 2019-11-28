const filesToCache = [
  '/',
  'images/bg-boost-desktop.svg',
 'images/bg-boost-mobile.svg',
  'images/bg-shorten-desktop.svg',
  'images/bg-shorten-mobile.svg',
  'images/favicon-32x32.png',
  'images/icon-brand-recognition.svg',
  'images/icon-detailed-records.svg',
  'images/icon-facebook.svg',
  'images/icon-fully-customizable.svg',
   'images/icon-instagram.svg',
  'images/icon-pinterest.svg',
   'images/icon-twitter.svg',
  'images/illustration-working.svg',
  'images/logo.svg',
  'mani/android-chrome-192x192.png',
  'mani/android-chrome-512x512.png',
  'mani/apple-touch-icon.png',
  'mani/favicon-32x32.png',
  'mani/favicon-16x16.png',
  'mani/favicon.ico',
  'mani/mstile-310x310.png',
  'mani/safari-pinned-tab.svg',   
 'main.js',
  'index.html',
  'style.css',
 'manifest.json',
 'browserconfig.xml',
  'README.md',
  'style-guide.md' 
];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      // TODO 4 - Add fetched files to the cache
      .then(response => {
        // TODO 5 - Respond with custom 404 page
        return caches.open(staticCacheName).then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      });      

    }).catch(error => {

      // TODO 6 - Respond with custom offline page

    })
  );
});

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  const cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
