/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'your-pwa-cache-v1'
const cacheUrls = ['/index.html', '/style.css', '/index.js', '/logo.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(async (cache) => { await cache.addAll(cacheUrls) })
      .catch((err) => { console.log('install error: ' + err) })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(async (response) => await (response || fetch(event.request)))
  )
})
