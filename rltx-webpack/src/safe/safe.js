import { Message, Form, FormItem, button, Input } from 'element-ui';
import Vue from 'vue';
import safe from './safe.vue';
import { removeClass } from '../../api/classUtil';

Vue.prototype.$message = Message;
Vue.use(Form);
Vue.use(FormItem);
Vue.use(button);
Vue.use(Input);

require('../public.js');

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
const vm = new Vue({
  el: '#app',
  data: {
    type: 1
  },
  template: '<safe :type="type"/>',
  components: { safe }
});

function showDialog() {
  const masklayer = document.getElementById('maskLayer'),
    dialog = document.getElementById('dialog');
  removeClass(masklayer, 'hide');
  removeClass(dialog, 'hide');
}

function showDialog1() {
  const masklayer = document.getElementById('maskLayer'),
    dialog = document.getElementById('dialog1');
  removeClass(masklayer, 'hide');
  removeClass(dialog, 'hide');
}

document.getElementById('pwd_update').onclick = function () {
  showDialog();
};

document.getElementById('phone_update').onclick = function () {
  showDialog1();
};
