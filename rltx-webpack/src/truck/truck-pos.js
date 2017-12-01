import Vue from 'vue';


import BaiduMap from 'vue-baidu-map';
import truckpostemplate from './truck-pos.vue';


Vue.use(BaiduMap, {
  ak: '0splGL787be69VgsOZX2t3vMvw016i0F'
});


Vue.config.productionTip = false;

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
const vm = new Vue({
  el: '#app',
  template: '<truckpostemplate />',
  components: { truckpostemplate },
  computed: {},
  mounted() {
  }
});
window.rns = {};
