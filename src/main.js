import Vue from 'vue'
import Router from './router'
import App from './App'
import { store } from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: store,
  render: h => h(App)
})