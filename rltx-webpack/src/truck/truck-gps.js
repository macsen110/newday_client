import Vue from 'vue';
import {
  Input, Select, Button, Form, FormItem, Option, row, col, Radio, RadioGroup, Checkbox, CheckboxGroup,
  Autocomplete, DatePicker, Upload, Dialog, Alert, MessageBox, Message, Loading, Table, TableColumn
} from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VCharts from 'v-charts';

import BaiduMap from 'vue-baidu-map';
import truckgpstemplate from './truck-gps.vue';

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
Vue.use(BaiduMap, {
  ak: '0splGL787be69VgsOZX2t3vMvw016i0F'
});
Vue.use(VCharts);
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;

Vue.config.productionTip = false;

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
const vm = new Vue({
  el: '#app',
  template: '<truckgpstemplate />',
  components: { truckgpstemplate },
  computed: {},
  mounted() {
  }
});
window.rns = {};
