import Vue from 'vue'
import App from './App'
import router from './routes'


/**创建全局对象
 * 存储相关信息
 */

Object.defineProperty(window, 'STORE', {
  value: {}
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

