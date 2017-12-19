import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import App from './App'
import ProgressBar from './components/ProgressBar'
import storeConfig from './store/store-config'
import routerConfig from './router/router-config'
import { sync } from 'vuex-router-sync'
import { timeAgo, host } from './util/filters'
import { titleMixin } from './util/mixins'

Vue.use(Router)
Vue.use(Vuex)

const store = new Vuex.Store(storeConfig)
const router = new Router(routerConfig)

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

sync(store, router)

Vue.config.productionTip = false

Vue.filter('timeAgo', timeAgo)
Vue.filter('host', host)

Vue.mixin(titleMixin)

new Vue({ // eslint-disable-line no-new
  store,
  router,
  render: h => h(App),
  el: '#app'
})
