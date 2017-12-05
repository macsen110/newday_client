/**
* add.vue
* Created by cc on 17/8/10.
*/
<template>
  <div>
    <div class="form-page">
      <!-- <detailLayout :objectName="objectName" :configUrl="configUrl" :domainObject="domainObject" :addFun="addFun" :editFun="editFun" :getInfo="getInfo" :uploadUrl="uploadUrl" :logType="logType" :listUrl="listUrl" :listTitle="listTitle"></detailLayout> -->
      <ele-form :domainObject="domainObject" ref="domainObject"
                :configUrl="configUrl" :listUrl="listUrl" :listTitle="listTitle"
                :getInfo="getInfo" :addFun="addFun" :editFun="editFun"
                :editable="editable" :isEdit="isEdit"
                @formReady="formReady" @editSuccess="editSuccess" @submitDone="submitDone"
                :objectName="objectName"
                label-width="100px" :inline="false">
        <layout :isEdit="isEdit" :editable="editable" :objectName="objectName">
          <div v-for="field in fields" :key='field.fieldConfigCode' :slot="field.fieldConfigCode">
            <el-form-item :label="field.showName" :required="field.required ==='true'">
              <ele-block :field="field" :domainObject="domainObject" :editable="editable" :uploadUrl="uploadUrl" :inputKey="inputKey"></ele-block>
            </el-form-item>
          </div>
          <el-button type="primary" v-show="!editable && isEdit" @click="editForm()" slot="buttonEdit">编辑</el-button>
          <el-button v-show="editable && isEdit" @click="cancelEdit()" slot="buttonCancel">取消编辑</el-button>
          <el-button v-show="editable && isEdit" @click="submitForm('domainObject')" slot="buttonSave">保存</el-button>
          <el-button v-show="!editable && isEdit" @click="changeLog()" slot="buttonChangeLog">{{ objectName }}变更记录</el-button>
          <el-button v-show='editable && !isEdit'  type="primary" @click="submitForm('domainObject')" size="large" slot="buttonSubmit" :disabled="btnDisabled">提交</el-button>
          <el-button v-show='editable && !isEdit'  @click="resetForm('domainObject')" size="large" slot="buttonReset" :disabled="btnDisabled">重置</el-button>
        </layout>
      </ele-form>

    </div>
    <el-tabs type="border-card" v-if="isEdit">
      <el-tab-pane label="证照管理">
        <attachment :selectable="false" :customColumn="customColumnAttachment" :isAdvanced="false" :params="params" :needPage="false"></attachment>
      </el-tab-pane>
      <el-tab-pane label="保险管理">
        <insurance :selectable="false" :customColumn="customColumnInsurance" :isAdvanced="false" :params="params" :needPage="false"></insurance>
      </el-tab-pane>
      <el-tab-pane label="维修管理">
        <maintenance :selectable="false" :customColumn="customColumnMaintenance" :isAdvanced="false" :params="params" :needPage="false"></maintenance>
      </el-tab-pane>
      <el-tab-pane label="保养记录">
        <car-care :selectable="false" :customColumn="customColumnCarcare" :isAdvanced="false" :params="params" :needPage="false"></car-care>
      </el-tab-pane>
      <el-tab-pane label="违章记录">
        <peccancy :selectable="false" :customColumn="customColumnPeccancy" :isAdvanced="false" :params="params" :needPage="false"></peccancy>
      </el-tab-pane>
      <el-tab-pane label="事故记录">
        <accident :selectable="false" :customColumn="customColumnAccident" :isAdvanced="false" :params="params" :needPage="false"></accident>
      </el-tab-pane>
      <el-tab-pane label="轮胎清单">
        <tyre :selectable="false" :customColumn="customColumnTyre" :isAdvanced="false" :params="params" :needPage="false"></tyre>
      </el-tab-pane>
      <el-tab-pane label="轮胎巡检">
        <tyre-inspection :selectable="false" :customColumn="customColumnTyreInspection" :isAdvanced="false" :params="params" :needPage="false"></tyre-inspection>
      </el-tab-pane>
      <el-tab-pane label="变更记录">
        <logs :selectable="false" :operatable="false" :domain="uploadUrl" :type="logType" :code="code" :isAdvanced="false" :params="params" :needPage="true"></logs>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import eleForm from '../components/ele-form/eleForm.vue';
// import detailLayout from '../layout/detail/detailLayout.vue';
import * as TrailerService from '../../api/TrailerService';

// import ApiConst from '../../api/ApiConst';

import detailLayout from '../layout/detail/detailLayout.vue';
import layout from './layout.vue';
import eleBlock from '../components/ele-block/eleBlock.vue';
// import driver from './driver/driver.vue';
import {
  add as truckAdd,
  edit as truckEdit,
  get as truckGet
} from '../../api/TruckService';
import {
  list as transportList
} from '../../api/TransportService';
import maintenance from '../maintenance/list.vue';
import insurance from '../insurance/list.vue';
import carCare from '../care/list.vue';
import peccancy from '../peccancy/list.vue';
import accident from '../accident/list.vue';
import tyre from '../tyre/list.vue';
import logs from '../logs/list.vue';
import tyreInspection from '../tyreInspection/list.vue';
import attachment from '../attachment/list.vue';
import waybill from '../waybill/list.vue';
import ApiConst from '../../api/ApiConst';
import {
  initForEdit,
  initForAdd
} from '../common/formHelper';
import {
  removeClass
} from '../../api/classUtil';
import {
  getParamsFromURL,
  urlRedirect
} from '../../api/Utils';

export default {
  components: {
    'ele-form': eleForm,
    'detailLayout': detailLayout,
    maintenance,
    carCare,
    insurance,
    peccancy,
    accident,
    tyre,
    tyreInspection,
    attachment,
    waybill,
    eleBlock,
    logs,
    layout
  },
  data() {
    return {
      objectName: '挂车',
      code: '',
      configUrl: '',
      domainObject: {},
      addFun: TrailerService.add,
      editFun: TrailerService.edit,
      getInfo: TrailerService.get,
      uploadUrl: ApiConst.apiTruckDomain,
      params: {
        trailerCode: getParamsFromURL(window.location.search).code,
        size: 10
      },
      editable: true,
      isEdit: false,
      btnDisabled: false,
      logType: 'trailer',
      listUrl: '/trailer/list.html',
      listTitle: '挂车管理',
      fieldConfig: Array,
      fields: Array,
      customColumnAttachment: ['truckLicenseNo', 'attachmentTypeCode', 'attachmentNo', 'attachmentIssuanceDate', 'attachmentExpirationDate', 'attachmentResourceCode', 'description', 'attachmentRemindDate', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnInsurance: ['truckLicenseNo', 'insuranceType', 'insuranceCompany', 'insuranceDate', 'expireDate', 'remindDate', 'insuranceAmount', 'insuranceNo', 'premiumAmount', 'attachmentResourceCode1', 'description', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnMaintenance: ['truckLicenseNo', 'driverName', 'maintenanceDate', 'maintenanceAddress', 'maintenanceUser', 'maintenanceItem', 'description', 'maintenanceCharge', 'currentMileage', 'attachmentResourceCode1', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnCarcare: ['truckLicenseNo', 'driverName', 'careDate', 'careAddress', 'totalAmount', 'currentMileage', 'nextCareMileage', 'nextCareDate', 'remindDate', 'careItemName', 'careItemNumber', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnPeccancy: ['truckLicenseNo', 'driverName', 'type', 'ticketNumber', 'peccancyDate', 'peccancyAddress', 'peccancyPoints', 'peccancyFine', 'agencyFee', 'lateFee', 'takeDate', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnAccident: ['truckLicenseNo', 'driverName', 'accidentDate', 'accidentAddress', 'description', 'damagesAmount', 'insuranceCompany', 'takeCasePeople', 'actualCompensationAmount', 'gapAmount', 'drivingResponsibility', 'drivingResponsibilityAmount', 'projectPeople', 'endDate', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnTyre: ['truckLicenseNo', 'tyreNo', 'tyreBrand', 'purchasePrice', 'onDate', 'onMileage', 'changeTyreNo', 'status', 'offDate', 'offMileage', 'tyreSalvage', 'totalMileage', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnTyreInspection: ['truckLicenseNo', 'tyreNo', 'inspectionDate', 'tyreMileage', 'deepWrinkles', 'description', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime']
    };
  },
  created() {
    const trailerUrl = ApiConst.apiTruckDomain,
      configUrl = `${trailerUrl}/detail_render_info/trailer/list`;
    this.configUrl = configUrl;
  },
  methods: {
    formReady(formData) {
      console.log('formReady', formData);
      this.inputKey = formData.paramData.inputKey;
      this.fields = formData.paramData.field;
      this.isEdit = formData.isEdit;
      this.editable = formData.editable;
      this.code = formData.code;
    },
    editSuccess() {
      this.editable = false;
    },
    submitDone() {
      this.btnDisabled = false;
    },
    loadFinish() {
      const keys = Object.keys(window.rns);
      keys.forEach((key) => {
        window.rns[key].init();
      });
    },
    editForm() {
      console.log('edit from');
      this.editable = true;
      this.isEdit = true;
    },
    cancelEdit() {
      this.$refs.domainObject.resetForm();
      this.editable = false;
      this.isEdit = true;
    },
    changeLog() {
      const url = `/logs/list.html?domain=${this.uploadUrl}&type=${this.logType}&code=${this.code}`,
        title = `${this.objectName}变更记录`;
      urlRedirect(url, title);
    },
    isArray(val) {
      if (typeof Array.isArray === 'function') {
        return Array.isArray(val);
      }
      return Object.prototype.toString.call(val) === '[object Array]';
    },
    submitForm(formName) {
      this.$refs[formName].submitForm();
    },
    resetForm(formName) {
      if (document.querySelector('#pictureResourceCode')) {
        const imglist = document.querySelector('#pictureResourceCode .el-upload-list').querySelectorAll('li'),
          uploadCard = document.querySelector('#pictureResourceCode .el-upload--picture-card');
        if (imglist.length > 0) {
          document.querySelector('#pictureResourceCode .el-upload-list').innerHTML = '';
          removeClass(uploadCard, 'hide');
        }
      }
      this.$refs[formName].resetFields();
    }
  }
};
</script>

