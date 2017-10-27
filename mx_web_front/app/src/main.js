import Vue from 'vue'
import App from './App'
import router from './routes'
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})