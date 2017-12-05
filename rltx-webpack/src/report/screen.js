import Vue from 'vue';
import screen from './screen.vue';

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
window.rns = {};
const vm = new Vue({
  el: '#app',
  template: '<screen/>',
  components: { screen },
  computed: {},
  mounted() {
  }
});
