import { baseURL, loginAuthentication as login, myProfile } from './utils/urls'
const pkg = require('./package')

module.exports = {
  mode: 'universal',

  // Headers of the page
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700' }
    ]
  },

  // Customize the progress-bar color
  // loading: { color: '#fff' },
  loading: '~/components/common/BitmalLoader.vue',

  // Global CSS
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/style/main.less'
  ],

  router: {
    middleware: ['auth']
  },

  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios'
  ],

  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    [
      'nuxt-mq',
      {
        defaultBreakpoint: 'xs',
        breakpoints: {
          xs: 576,
          sm: 768,
          md: 992,
          lg: 1200,
          xl: Infinity
        }
      }
    ]
  ],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL
  },

  auth: {
    // See: https://auth.nuxtjs.org/getting-started/options
    strategies: {
      local: {
        endpoints: {
          login: { url: login, method: 'post', propertyName: 'data.access_token' },
          user: { url: myProfile, method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    },
    redirect: {
      login: '/login-request',
      logout: '/',
      home: '/'
    },
    resetOnError: true
  },

  build: {
    // You can extend webpack config here
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
