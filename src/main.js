
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import store from './store/index.js'
import './css/reset.css'
import util from './assets/mobile-util.js'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  render: app => app(App)
})
