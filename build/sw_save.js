// https://vaadin.com/learn/tutorials/learn-pwa/turn-website-into-a-pwa
// https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-3-offline-support-and-network-resilience-c84db889162c
const originRegex = /^(http[s]?:\/\/[a-z0-9\-\.\:]+)[\/]?/i
const CACHE_NAME = 'pwa-acds';
const urlsToCache = [
  '/',
  '/styles/styles.css',
  '/script/webpack-bundle.js'
];
if ('workbox' in self) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(req);
  return cachedResponse || networkFirst(req);
};

async function networkFirst(req) {
  console.log("[Service Worker] "+JSON.stringify(req));
  const cache = await caches.open(CACHE_NAME);
  try { 
    const fresh = await fetch(req);
    cache.put(req, fresh.clone());
    return fresh;
  } catch (e) { 
    const cachedResponse = await cache.match(req);
    return cachedResponse;
  }
};

self.addEventListener('install', async event => {
  console.log('[Service Worker] install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        // Open a cache and cache our files
        return cache.addAll(urlsToCache);
      })
  );
});
function isCrossOrigin (url) {
  var match = url.toString().match(originRegex)
  return match && match[1] === origin
}
self.addEventListener('fetch', async event => {
  console.log('[Service Worker] fetch event');
  const req = event.request;
  if (isCrossOrigin(req)) {
    return;
  }
 
  if (/.*(json)$/.test(req.url)) {
    event.respondWith(networkFirst(req));
  } else {
    event.respondWith(cacheFirst(req));
  }
});