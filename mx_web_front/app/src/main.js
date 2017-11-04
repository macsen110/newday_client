import Vue from 'vue'
import App from './App'
import router from './routes'
import utils from './utils';

/**创建全局对象
 * 存储相关信息
 */

Object.defineProperty(window, 'APP', {
  value: {
    utils
    
  }
})


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

