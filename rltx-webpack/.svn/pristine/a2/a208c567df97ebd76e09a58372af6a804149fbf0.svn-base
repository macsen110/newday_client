import Vue from 'vue';
import * as VerifyService from '../../api/VerifyService';
import { removeClass } from '../../api/classUtil';
import cert from './cert.vue';

require('../public.js');

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
const vm = new Vue({
  el: '#app',
  template: '<cert />',
  components: { cert }
});
window.rns = {};

VerifyService.getInfo((data, error) => {
  // 认证成功
  if (data) {
    if (data.content.certStatus === 3) {
      removeClass(document.getElementById('verify3'), 'hide');
    } else if (data.content.certStatus === 2) {
      removeClass(document.getElementById('verify2'), 'hide');
    } else {
      removeClass(document.getElementById('verify1'), 'hide');
    }
    const orgNameList = document.getElementsByClassName('orgName'),
      orgFullNameList = document.getElementsByClassName('orgFullName');
    orgNameList[0].innerHTML = data.content.orgName;
    orgNameList[1].innerHTML = data.content.orgName;
    orgFullNameList[0].innerHTML = data.content.orgFullName;
    orgFullNameList[1].innerHTML = data.content.orgFullName;
  }
  if (error) {
    console.error(error);
  }
});
