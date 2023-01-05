const firebase = require('firebase')

const config = {
  apiKey: 'AIzaSyA8WTEbA59eCqU_0fv2jL7FdTinNGLGBvA',
  authDomain: 'mouo-app.firebaseapp.com',
  databaseURL: 'https://mouo-app.firebaseio.com',
  projectId: 'mouo-app',
  storageBucket: 'mouo-app.appspot.com',
  messagingSenderId: '52570323093'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
})


module.exports = {
  /*
  ** Headers of the page
  */

  router: {
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          selector: to.hash
          // , offset: { x: 0, y: 10 }
        }
      }
      else if (savedPosition) {
        return savedPosition
      }
    }
  }, 
  
  head: {
    title: 'Tu armario ilimitado · mouo',
    script: [
    {
      src: '/pixel.js',
      type: 'text/javascript'
    },
    {
      src: '/facebook.js',
      type: 'text/javascript'
    },
    {
      src: '/structuredData.json',
      type: 'application/ld+json'
    }

  ],
    meta: [
      { charset: 'utf-8' },
      { property: "fb:app_id", content: "232874200726110" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=2, minimal-ui' },
      {
        hid: 'description',
        name: 'description',
        content: 'Mouo es un armario ilimitado de prendas premium con el cual nunca más tendrás que repetir conjunto ni gastarte una cantidad desorbitada en ropa que no evoluciona con tus gustos. Selecciona las prendas o accesorios que más te gusten, los recibirás en tu casa antes de que te des cuenta, disfrútalas durante un mes y al final del mes cambia las prendas que quieras por otras.'
      },
      { 'property': 'og:type', 'content':  'website' },
      { 'property': 'og:locale', 'content':  'es_ES' },
      { name: 'twitter:card', content: 'summary' },



      { name: 'keywords', content: 'mouo, ropa, armario, prendas, nube, suscripción, prendas, moda' },
      { name: 'robots', content: 'all' },
      { name: 'theme-color', content: '#1c1c1c' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://firestore.googleapis.com' },
      { rel: 'stylesheet', href: "https://use.fontawesome.com/releases/v5.2.0/css/all.css", integrity: "sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ", crossorigin: "anonymous" }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/vue-clipboard.js',
    { src: '~/plugins/vue-masonry.js', ssr: false },
    { src: '~/plugins/v-lazy-image.js', ssr: false }
  ],
  css: [
    '~/assets/style/app.styl',
    '~/assets/style/main.scss'
  ],

  manifest: {
    name: 'Tu armario ilimitado · mouo',
    lang: 'es',
    short_name: 'mouo',
    start_url: '/',
    display: 'standalone',
    background_color: '#1c1c1c',
    theme_color: '#1c1c1c',
    description: 'Mouo es un armario ilimitado de prendas premium con el cual nunca más tendrás que repetir conjunto ni gastarte una cantidad desorbitada en ropa que no evoluciona con tus gustos. Selecciona las prendas o accesorios que más te gusten, los recibirás en tu casa antes de que te des cuenta, disfrútalas durante un mes y al final del mes cambia las prendas que quieras por otras.',
    icons: [
      {
        src: "/icon-72x72.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        src: "/icon-96x96.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
        src: "/icon-144x144.png",
        sizes: "144x144",
        type: "image/png"
      },
      {
        src: "/icon-152x152.png",
        sizes: "152x152",
        type: "image/png"
      },
      {
        "src": "/icon-168x168.png",
        "sizes": "168x168",
        "type": "image/png"
      },
      {
        "src": "/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/icon-384x384.png",
        "sizes": "384x384",
        "type": "image/png"
      },
      {
        "src": "/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://mouo.es',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false, // Enable me when using nuxt generate
    exclude: [
    ],
    routes(callback) {
      db.collection('clothes').get()
        .then(snapshot => {
          var closet = []
          snapshot.docs.forEach(doc => {
            closet.push(doc.data())
          })
          let routes = closet.map(clothing => '/armario/' + clothing.id)
          callback(null, routes)
        })
        .catch(callback)
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    'nuxt-stripe-module',
    '@nuxtjs/google-analytics',
    'nuxt-babel'
  ],

  stripe: {
    version: 'v3',
    publishableKey: 'pk_live_toBl24XdNasF4QtoBDflz1Wp',
  },

  'google-analytics': {
    id: 'UA-123736439-1'
  },

  render: {
    push: true
  },

  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js',
      'v-lazy-image',
      'vue-clipboard2',
      'vue-masonry-css'
    ],

    "presets": ['es2015', 'stage-0',
      "@babel/env",
      {
        targets: {
          "browsers": "> 5%"
        },
        useBuiltIns: "usage",
      },],
    extractCSS: {
      allChunks: true
    },

    "html.minify": {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
    },

    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  }
}
