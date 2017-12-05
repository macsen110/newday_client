/**
 * Created by WebStorm
 * Project: webpack
 * Author:  sailengsi
 * Date:    2017/11/6
 * Time:    上午10:34
 */

import Vue from 'vue';
import { Input, Select, Button, Form, FormItem, Option, row, col, Radio, RadioGroup, Checkbox, CheckboxGroup,
  Autocomplete, DatePicker, Upload, Dialog, Alert, MessageBox, Message, Loading, Table, TableColumn, Pagination } from 'element-ui';
import create from './create.vue';

Vue.use(Input);
Vue.use(Select);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Option);
Vue.use(row);
Vue.use(col);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Autocomplete);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Alert);
Vue.use(Loading);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.confirm = MessageBox.confirm;
/* eslint-disable no-new */
/* eslint-disable no-unused-vars */

Vue.filter('currency', (value) => {
  if (typeof value === 'number') {
    return `￥${value.toFixed(2)}`;
  }
  if (!value) {
    return '';
  }
  return value;
});
const vm = new Vue({
  el: '#app',
  template: '<create/>',
  components: { create },

  computed: {},
  mounted() {
  }
});
window.rns = {};

