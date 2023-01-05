importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "Mouo",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.17cb8970303c24e4e6af42e8116531a7.css",
    "revision": "17cb8970303c24e4e6af42e8116531a7"
  },
  {
    "url": "/_nuxt/app.d3605bbca8f688e1df29.js",
    "revision": "19c5233fdcabb11f900a24897cd0750d"
  },
  {
    "url": "/_nuxt/layouts_default.98262cff99337bf8fcca.js",
    "revision": "1313fcdecff3dc00ce1886c9f39e14ba"
  },
  {
    "url": "/_nuxt/manifest.8659ea008327a6515230.js",
    "revision": "1d0786a728c7fbd33a71e644763d4cd7"
  },
  {
    "url": "/_nuxt/pages_closet__clothing.e32c3bba2e9a605441d9.js",
    "revision": "d3ec0ae3ddfcdf6119325eb4ae42dc51"
  },
  {
    "url": "/_nuxt/pages_closet_index.72ae19fc6324ab0a9461.js",
    "revision": "55149d9c306330e6f073e3a8005da139"
  },
  {
    "url": "/_nuxt/pages_conditions.baa97bdf94a3d6e2d757.js",
    "revision": "8aadc86dcf3c4f2ad971a34617565b5d"
  },
  {
    "url": "/_nuxt/pages_faq.70ffd35f2bd3b872c90a.js",
    "revision": "751cadda0e048c98e573e2a9e34ac165"
  },
  {
    "url": "/_nuxt/pages_index.bda6b17b50d068be8e84.js",
    "revision": "53cce365bbde107261c3fe0d16d19326"
  },
  {
    "url": "/_nuxt/vendor.6a6a298f8f7dcfc36a0015924ba56a23.css",
    "revision": "6a6a298f8f7dcfc36a0015924ba56a23"
  },
  {
    "url": "/_nuxt/vendor.ebc9dd1cd326e5a23f3c.js",
    "revision": "a4963842dbdaacbb0efdc35e74f90c34"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

