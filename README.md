# Bitmal Front-End

## Environment
Other than the dependencies included through YARN, the following installations are required on any given environment:

- [Node.js](https://nodejs.org/en/) development environment (v8.12 during development)
- [Yarn](https://yarnpkg.com/en/docs/install) package manager (v1.12.3 during development)

## Primary Front-End Stack
- JavaScript (es6 with [Babel](https://babeljs.io/))
- [Vue.js](https://vuejs.org/) with [Nuxt](https://nuxtjs.org/guide) framework ([reactivity](https://vuejs.org/v2/guide/reactivity.html), [single file components](https://vuejs.org/v2/guide/single-file-components.html), [SSR](https://nuxtjs.org/guide#server-rendered-universal-ssr-), [routing](https://nuxtjs.org/guide/routing/))
- [Webpack](https://webpack.js.org/) as bundler & build tool, using various loaders
- CSS generated from [Less](http://lesscss.org/)
- [Vuex](https://vuex.vuejs.org/), responsible for client-side state management
- [Axios](https://github.com/axios/axios) through [Nuxt-axios](https://github.com/nuxt-community/axios-module) is handling ajax request both on server and client side
- [Nuxt-auth](https://github.com/nuxt-community/auth-module) for easier user handling
- [Element-Ui](https://element.eleme.io/#/en-US/guide/design), which is a Vue-based UI component library
- [date-fns](https://date-fns.org/) for managing date and time, tree-shaken
- [lodash](https://lodash.com/docs) as utility library, tree-shaken
- [nuxt-mq](https://github.com/vanhoofmaarten/nuxt-mq#readme) for reactive responsive breakpoints, and classes
- [vue-scroll-class](https://github.com/jasepellerin/vue-scroll-class#readme) for reactive classes based on scroll position
- [eslint](https://eslint.org/) for linting
  - javascript, based on [standard JS](https://standardjs.com/)
  - Vue single file components (templates included) with [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)'s least permissive option: `recommended`

## 3rd party dependencies
Other than
- GIT
- Node.js
- YARN
- the Google font [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro)

every javascript dependency is listed in the `./yarn.lock` file.

You can get more information about these packages with running the following commands in the client root directory:
``` bash
# listing full dependency module tree
$ yarn list

# listing dependency modules grouped by their licence types
$ yarn licenses list

# generating verbose license information for every dependency module
$ yarn licenses generate-disclaimer
```

The 3 commands above yielded the following results at the time of writing this:
- [dependency tree](dependency_tree.txt)
- [license list](licenses_list.txt)
- [licenses disclaimer](licenses_disclaimer.txt)
> !! Please note, that this is an initial state. It can, and most definitely will change. For up-to-date information, you have to re-run the commands above.


## Build Setup

``` bash
# while inside client root directory (contains package.json & yarn.lock), having node and yarn installed

# to install dependencies
$ yarn

# to serve for development (with hot reload at localhost:3000)
$ yarn dev

# to build for production
$ yarn build

# launch production server on port 3000
$ yarn start
```

For additional information about deploying Nuxt.js applications, please check out the [corresponding Nuxt.js documentation](https://nuxtjs.org/guide/commands).
