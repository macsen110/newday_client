'use strict';
if (!Cache.prototype.add) {
  Cache.prototype.add = function add(request) {
    return this.addAll([request]);
  };
}

if (!Cache.prototype.addAll) {
  Cache.prototype.addAll = function addAll(requests) {
    var cache = this;

    function NetworkError(message) {
      this.name = 'NetworkError';
      this.code = 19;
      this.message = message;
    }
    NetworkError.prototype = Object.create(Error.prototype);

    return Promise.resolve()
      .then(function() {
        if (arguments.length < 1) throw new TypeError();

        requests = requests.map(function(request) {
          if (request instanceof Request) {
            return request;
          } else {
            return String(request);
          }
        });

        return Promise.all(
          requests.map(function(request) {
            if (typeof request === 'string') {
              request = new Request(request);
            }

            return fetch(request.clone());
          })
        );
      })
      .then(function(responses) {
        return Promise.all(
          responses.map(function(response, i) {
            return cache.put(requests[i], response);
          })
        );
      })
      .then(function() {
        return undefined;
      });
  };
}

if (!CacheStorage.prototype.match) {
  CacheStorage.prototype.match = function match(request, opts) {
    var caches = this;
    return caches.keys().then(function(cacheNames) {
      var match;
      return cacheNames.reduce(function(chain, cacheName) {
        return chain.then(function() {
          return (
            match ||
            caches
              .open(cacheName)
              .then(function(cache) {
                return cache.match(request, opts);
              })
              .then(function(response) {
                match = response;
                return match;
              })
          );
        });
      }, Promise.resolve());
    });
  };
}




const version = 'v9000';
const __DEVELOPMENT__ = true;
const __DEBUG__ = true;
const offlineResources = [
  '/',
  './public/sw/offline/offline.html',
  './public/sw/offline/offline.svg',
  './public/sw/offline/404.svg'
];
const ignoreFetch = [
  /https?:\/\/pubapi.111.com.cn\//,
  /https?:\/\/gateway.111.com.cn\//,
  /https?:\/\/nest.111.com.cn\//,
  /https?:\/\/yzm.111.com.cn\/sms\/v2/,
];



//////////
// Install
//////////
function onInstall(event) {
  updateStaticCache()
  event.waitUntil(self.skipWaiting());
}

function updateStaticCache() {
  return caches
    .open(cacheKey('offline'))
    .then((cache) => {
      return cache.addAll(offlineResources);
    })
    .then(() => {
      log('installation complete!');
    });
}




////////
// Fetch
////////
function onFetch(event) {
  const request = event.request;
  if (request.method === 'POST') return;
  if (shouldAlwaysFetch(request)) {
    event.respondWith(networkedOrOffline(request));
    return;
  }
  if (shouldFetchAndCache(request)) {
    event.respondWith(networkedOrCached(request));
    return;
  }
  event.respondWith(cachedOrNetworked(request));
}

function networkedOrCached(request) {
  return networkedAndCache(request)
    .catch(() => { return cachedOrOffline(request) });
}

// Stash response in cache as side-effect of network request
function networkedAndCache(request) {
  return fetch(request)
    .then((response) => {
      console.log('response: ', response)
      if (response.status === 404 || !response.ok) throw response; 
      var copy = response.clone();
      caches.open(cacheKey('resources'))
        .then((cache) => {
          cache.put(request, copy);
        });

      log("(network: cache write)", request.method, request.url);
      return response;
    });
}

function cachedOrNetworked(request) {
  return caches.match(request)
    .then((response) => {
      log((response && response.status != 404) ? '(cached)' : '(network: cache miss)', request.method, request.url);
      return (response && response.status != 404) ? response
        : networkedAndCache(request)
          .catch(() => { return offlineResponse(request) });
    });
}

function networkedOrOffline(request) {
  return fetch(request)
    .then((response) => {
      console.log('(network)', request.method, request.url);
      return response;
    })
    .catch(() => {
      return offlineResponse(request);
    });
}



function cachedOrOffline(request) {
  return caches
    .match(request)
    .then((response) => {
      return response || offlineResponse(request);
    });
}

function offlineResponse(request) {
  log('(offline: )', request.method, request.url);
  if (request.url.match(/\.(jpg|png|gif|svg|jpeg)(\?.*)?$/)) {

    return caches.match('./public/sw/offline/offline.svg');
  } else {
    return caches.match('./public/sw/offline/offline.html');
  }
}

///////////
// Activate
///////////
function onActivate(event) {
  event.waitUntil(removeOldCache());
}

function removeOldCache() {

  if (self.registration && self.registration.active) {
    self.clients.claim()
  }
  return caches
    .keys()
    .then((keys) => {
      return Promise.all( // We return a promise that settles when all outdated caches are deleted.
        keys
          .filter((key) => {
            return !key.startsWith(version); // Filter by keys that don't start with the latest version prefix.
          })
          .map((key) => {
            return caches.delete(key); // Return a promise that's fulfilled when each outdated cache is deleted.
          })
      );
    })
    .then(() => {
      log('removeOldCache completed.');
    });
}

function cacheKey() {
  return [version, ...arguments].join(':');
}

function log() {
  if (developmentMode()) console.log("SW:", ...arguments);
}

function shouldAlwaysFetch(request) {
  return ignoreFetch.some(regex => request.url.match(regex));
}

function shouldFetchAndCache(request) {
  return ~request.headers.get('Accept').indexOf('text/html');
}

function developmentMode() {
  return __DEVELOPMENT__ || __DEBUG__;
}

self.addEventListener('push', event => {
  let body;

  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Default body';
  }

  const options = {
    body: body,
    icon: 'images/notification-flat.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {action: 'explore', title: 'Go to the site',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Close the notification',
        icon: 'images/xmark.png'},
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});

self.addEventListener('install', onInstall);

self.addEventListener('fetch', onFetch);

self.addEventListener("activate", onActivate);
