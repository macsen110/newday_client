/**
 * add.js
 * 添加运单
 * Created by dsky on 17/7/6.
 */
import Vue from 'vue';
import {
  Input, Select, Button, Form, FormItem, Option, row, col, Radio, RadioGroup, Checkbox, CheckboxGroup,
  Autocomplete, DatePicker, Upload, Dialog, Alert, MessageBox, Message, Loading, Table, TableColumn, Tabs, TabPane,
  Dropdown, DropdownMenu, DropdownItem
} from 'element-ui';
import add from './add.vue';
import PublicArea from '../../api/PublicArea';

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
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false;

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-one-var */
new Vue({
  el: '#app',
  template: '<add/>',
  components: { add },
  computed: {},
  mounted() {
  }
});
window.rns = {};

// console.log(PublicArea);
PublicArea.addSetObservers('aaa', (value) => {
  // console.log(`set observer ${value}`);
});
PublicArea.set('aaa', 'bbb');
// console.log(PublicArea.get('aaa'));

// const newLine = '<br />',
//   obj = {},
//   objValues = {};
//
// Object.defineProperty(obj, 'newAccessorProperty', {
//   set: (x) => {
//     document.write('in property set accessor');
//     objValues.newaccpropvalue = x;
//   },
//   get: () => {
//     document.write('in property get accessor');
//     return objValues.newaccpropvalue;
//   },
//   enumerable: true,
//   configurable: true
// });
//
// obj.newAccessorProperty = 30;
// document.write(obj.newAccessorProperty);
