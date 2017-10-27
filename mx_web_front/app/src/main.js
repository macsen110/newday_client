import Vue from 'vue'
import App from './App'
import router from './routes'
require('./scss/base.scss')
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})