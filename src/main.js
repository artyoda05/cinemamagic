import Vue from 'vue'
import Router from './router'
import App from './App'

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  render: h => h(App)
})