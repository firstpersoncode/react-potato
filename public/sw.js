const CACHE_NAME = 'react-potato-cache-v1';

const assetList = (assetObject) => {
  const assetArray = [];
  Object.keys(assetObject).map((key) => Object.keys(assetObject[key]).map((i) => {
    assetArray.push(assetObject[key][i]);
    return i;
  }));
  return assetArray;
};

// Register the service worker
self.addEventListener('install', (event) => {
  console.log('Service worker installed');

  event.waitUntil(caches.open(CACHE_NAME)
    .then((cache) => {
      fetch('/assets/assets.json')
        .then((response) => response.json())
        .then((result) => {
          const assetsArray = assetList(result);
          cache.addAll(assetsArray);
        });
    })
    .then(() => self.skipWaiting()));
});

// Remove old cache
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  // Remove old cache if the name the not the same as cache name
  event.waitUntil(caches.keys()
      .then((keyList) =>
        Promise.all(keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        }))
      )
      .then(() => self.clients.claim())
  );

  // Check for the cache item for file that are not in the asset
  event.waitUntil(caches.open(CACHE_NAME)
    .then((cache) => cache.keys()
      .then((files) => fetch('/assets/assets.json')
        .then((response) => response.json())
        .then((response) => assetList(response))
        .then((assets) => {
          // Loop the files
          files.map((file) => {
            const fileName = file.url.replace(/^(?:\/\/|[^/]+)*\//, '/');
            // Check if file name and asset name is the staticMiddleware
            if (!assets.includes(fileName) && fileName !== '/') {
              // Delete all old cache that is not in the assets list
              cache.delete(fileName)
                .then(() => console.log('Old cache deleted', fileName));
            }
          });
        })
      )
    )
    .then(() => self.clients.claim())
  );
});

/*
 * Cacheable request failing to cache strategy is reasonable default for network-first apps.
 * If connection is available we try to fetch the resource and then cache it.
 * Keep in mind that there is no reason to pollute cache with failure responses.
 */
function throwOnError(response) {
  if ((response.status >= 200 && response.status < 300) || response.status === 0) {
    return response;
  }
  throw new Error(response.statusText);
}

function cacheableRequestFailingToCacheStrategy({ event, cache }) {
  return fetch(event.request)
    .then(throwOnError) // do not cache errors
    .then((response) => {
      cache.put(event.request, response.clone());
      return response;
    })
    .catch(() => cache.match(event.request));
}

/*
 * Cache-first approach is a great default for modern, offline-first webapps.
 * ServiceWorker fetches from cache and when request doesn’t match anything stored in cache
 * we perform a request which in case of success will be cached.
 */
function cacheFailingToCacheableRequestStrategy({ event, cache }) {
  return cache.match(event.request)
    .then(throwOnError)
    .catch(() => fetch(event.request)
      .then(throwOnError)
      .then((response) => {
        cache.put(event.request, response.clone());
        return response;
      })
    );
}

// It’s possible you may not want to cache some set of responses by default, like articles
function requestFailingToCacheStrategy({ event, cache }) {
  return fetch(event.request)
    .catch(() => cache.match(event.request));
}

/*
 * Side effect requests (POST, PUT, DELETE) cannot be cached.
 * In case of user being offline we can “respond” with 404 Not Found error
 * with generic message which we can display to the user.
 */
function requestFailingWithNotFoundStrategy({ event }) {
  return fetch(event.request)
    .catch(() => {
      const body = JSON.stringify({ error: 'Sorry, you are offline. Please, try later.' });
      const headers = { 'Content-Type': 'application/json' };
      const response = new Response(body, { status: 404, statusText: 'Not Found', headers });
      return response;
    });
}

// Handle request
function isRequestForStatic(request) {
  return /.(png|jpg|jpeg|gif|css|js)$/.test(request.url);
}

function isSideEffectRequest(request) {
  return ['POST', 'PUT', 'DELETE'].includes(request.method);
}

function isRequestForAnArticle(request) {
  return request.url.match(/\/articles\/[1-9a-z-]+/);
}

self.addEventListener('fetch', (event) => {
  if (isSideEffectRequest(event.request)) {
    event.respondWith(requestFailingWithNotFoundStrategy({ event }));
    return;
  }

  if (isRequestForStatic(event.request)) {
    event.respondWith(
      caches.open(CACHE_NAME)
        .then((cache) => cacheFailingToCacheableRequestStrategy({ event, cache }))
    );
    return;
  }

  if (isRequestForAnArticle(event.request)) {
    event.respondWith(
      caches.open(CACHE_NAME)
        .then((cache) => requestFailingToCacheStrategy({ event, cache }))
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME)
      .then((cache) => cacheableRequestFailingToCacheStrategy({ event, cache }))
  );
});

// Listen to postMessage to lazyLoad cache of code splitting
self.addEventListener('message', (event) => {
  const command = event.data;
  // eslint-disable-next-line
  switch(command.type) {
    case 'ADD_CHUNK': {
      const request = new Request(command.payload);
      fetch(request).then(throwOnError).then((response) => {
        caches.open(CACHE_NAME).then((cache) => cache.put(request, response));
      });
    }
  }
});
