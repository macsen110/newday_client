/* eslint-disable no-new */
/* eslint-disable no-unused-vars */

import Vue from 'vue';
import indextemplate from './index.vue';

const vm = new Vue({
  el: '#app',
  template: '<indextemplate />',
  components: { indextemplate },
  computed: {},
  mounted() {
  }
});
window.rns = {};
