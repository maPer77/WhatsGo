var CACHE_NAME = 'pwa-cache-v7.83';
var urlsToCache = [
  './index.html',
  './image/whatsgo.svg',
  './css/index.css',
  './css/countries-list.css',
  './css/reset.css',
  './css/switch.css',
  './js/whatsapplink.js',
  './js/country-code.js',
  './node_modules/normalize.css/normalize.css',
  './data/countries.json',
  'https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap'
];


self.addEventListener('install', (event) => {
  // prevents the waiting, meaning the service worker activates
  // as soon as it's finished installing
  // NOTE: don't use this if you don't want your sw to control pages
  // that were loaded with an older version
  self.skipWaiting();

  event.waitUntil((async () => {
    try {
      // self.CACHE_NAME and self.urlsToCache are imported via a script
      const cache = await caches.open(self.CACHE_NAME);
      const total = self.urlsToCache.length;
      let installed = 0;

      await Promise.all(self.urlsToCache.map(async (url) => {
        let controller;

        try {
          controller = new AbortController();
          const { signal } = controller;
          // the cache option set to reload will force the browser to
          // request any of these resources via the network,
          // which avoids caching older files again
          const req = new Request(url, { cache: 'reload' });
          const res = await fetch(req, { signal });

          if (res && res.status === 200) {
            await cache.put(req, res.clone());
            installed += 1;
          } else {
            console.info(`unable to fetch ${url} (${res.status})`);
          }
        } catch (e) {
          console.info(`unable to fetch ${url}, ${e.message}`);
          // abort request in any case
          controller.abort();
        }
      }));

      if (installed === total) {
        console.info(`application successfully installed (${installed}/${total} files added in cache)`);
      } else {
        console.info(`application partially installed (${installed}/${total} files added in cache)`);
      }
    } catch (e) {
      console.error(`unable to install application, ${e.message}`);
    }
  })());
});


// remove old cache if any
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const CACHE_NAMEs = await caches.keys();

    await Promise.all(CACHE_NAMEs.map(async (CACHE_NAME) => {
      if (self.CACHE_NAME !== CACHE_NAME) {
        await caches.delete(CACHE_NAME);
      }
    }));
  })());
});






// self.addEventListener('fetch', async function (event) {

//   try {
//     const cachedResponse = await caches.match(event.request);

//     if (exists(cachedResponse)) {
//       const expiredDate = new Date(cachedResponse.headers.get('Expires'));

//       if (expiredDate.toString() !== 'Invalid Date' && new Date() <= expiredDate) {
//         return cachedResponse.clone();
//       }
//     }

//     // expired or not in cache, request via network...
//   } catch (e) {
//     // Coloca arquivo no cache do SW
//     // do something...
//     // IMPORTANT: Clone the request. A request is a stream and
//     // can only be consumed once. Since we are consuming this
//     // once by cache and once by the browser for fetch, we need
//     // to clone the response.
//     var fetchRequest = event.request.clone();

//     return fetch(fetchRequest).then(
//       function(response) {
//         // Check if we received a valid response
//         if(!response || response.status !== 200 || response.type !== 'basic') {
//           return response;
//         }

//         // IMPORTANT: Clone the response. A response is a stream
//         // and because we want the browser to consume the response
//         // as well as the cache consuming the response, we need
//         // to clone it so we have two streams.
//         var responseToCache = response.clone();

//         caches.open(CACHE_NAME)
//           .then(function(cache) {
//             cache.put(event.request, responseToCache);
//           });

//         return response;
//       }
//     );
//   }


// });





self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          const expiredDate = new Date(response.headers.get('Expires'));

          if (expiredDate.toString() !== 'Invalid Date' && new Date() <= expiredDate) {
            return response.clone();
          }
          
          // return response;
        }
        // para fazer cache de todas solicitacoes além das infomadas em CACHE_NAME, comenta a póxima linha e descomenta o codigo abaixo
        return fetch(event.request);

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        // var fetchRequest = event.request.clone();

        // return fetch(fetchRequest).then(
        //   function(response) {
        //     // Check if we received a valid response
        //     if(!response || response.status !== 200 || response.type !== 'basic') {
        //       return response;
        //     }

        //     // IMPORTANT: Clone the response. A response is a stream
        //     // and because we want the browser to consume the response
        //     // as well as the cache consuming the response, we need
        //     // to clone it so we have two streams.
        //     var responseToCache = response.clone();

        //     caches.open(CACHE_NAME)
        //       .then(function(cache) {
        //         cache.put(event.request, responseToCache);
        //       });

        //     return response;
        //   }
        // );


      })
    );
});