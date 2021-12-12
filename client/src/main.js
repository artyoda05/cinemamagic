import Vue from 'vue'
import Router from './router'
import App from './App'
import { store } from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VModal from 'vue-js-modal'
 
Vue.use(VModal)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  //el: '#app',
  router: Router,
  store: store,
  render: h => h(App)
}).$mount('#app');