import Vue from 'vue';
import { Input, Select, Button, Form, FormItem, Option, row, col, DatePicker, Dialog, Alert, MessageBox, Message, Loading } from 'element-ui';
import list from './driver_summary.vue';

Vue.use(Input);
Vue.use(Select);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Option);
Vue.use(row);
Vue.use(col);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Alert);
Vue.use(Loading);

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
window.rns = {};
const vm = new Vue({
  el: '#app',
  template: '<list/>',
  components: { list },
  computed: {},
  mounted() {
  }
});
