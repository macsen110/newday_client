/**
* add.vue
* Created by cc on 17/8/10.
*/
<template>
  <div>
    <div class="form-page">
      <ele-form :domainObject="domainObject" ref="domainObject"
                :configUrl="configUrl" :listUrl="listUrl" :listTitle="listTitle"
                :getInfo="getInfo" :addFun="addFun" :editFun="editFun"
                :editable="editable" :isEdit="isEdit"
                @formReady="formReady" @editSuccess="editSuccess" @submitDone="submitDone"
                :objectName="objectName"
                label-width="100px" :inline="false">
        <layout :isEdit="isEdit" :editable="editable" :objectName="objectName">
          <div v-for="field in fields" :key="field.fieldConfigCode" :slot="field.fieldConfigCode">
            <el-form-item :label="field.showName" :required="field.required ==='true'">
              <ele-block :field="field" :domainObject="domainObject" :editable="editable" :uploadUrl="uploadUrl" :inputKey="inputKey"></ele-block>
            </el-form-item>
          </div>
          <el-button type="primary" v-show="!editable && isEdit" @click="editForm('domainObject')" slot="buttonEdit">编辑</el-button>
          <el-button v-show="editable && isEdit" @click="cancelEdit('domainObject')" slot="buttonCancel">取消编辑</el-button>
          <el-button v-show="editable && isEdit" @click="submitForm('domainObject')" slot="buttonCancel">保存</el-button>
          <el-button v-show="!editable && isEdit" @click="changeLog()" slot="buttonChangeLog">{{ objectName }}变更记录</el-button>
          <el-button v-show='editable && !isEdit' type="primary" @click="submitForm('domainObject')" size="large" slot="buttonSubmit" :disabled="btnDisabled">提交</el-button>
          <el-button v-show='editable && !isEdit' @click="resetForm('domainObject')" size="large" slot="buttonReset" :disabled="btnDisabled">重置</el-button>

        </layout>
      </ele-form>
    </div>
    <el-tabs type="border-card" v-if="isEdit">
      <el-tab-pane label="银行账户">
        <account-list :selectable="false" :operatable="false" :customColumn="customColumnAccount" :isAdvanced="true" :params="bankAccountParams" :needPage="false" :needMore="true"></account-list>
      </el-tab-pane>
      <el-tab-pane label="运单记录">
        <waybill :selectable="false" :operatable="false" :customColumn="customColumnWaybill" :isAdvanced="false" :params="params" :needPage="false" :needMore="true"></waybill>
      </el-tab-pane>
      <el-tab-pane label="附件">
        <attachment :selectable="false" :operatable="false" :customColumn="customColumnAttachment" :isAdvanced="false" :params="params" :needPage="false"></attachment>
      </el-tab-pane>
      <el-tab-pane label="变更记录">
        <logs :selectable="false" :operatable="false" :domain="uploadUrl" :type="logType" :code="code" :isAdvanced="false" :params="params" :needPage="true"></logs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable import/no-unresolved */
import eleForm from '../components/ele-form/eleForm.vue';
import eleBlock from '../components/ele-block/eleBlock.vue';
import layout from './layout.vue';
import { add, edit, get } from '../../api/DriverService';
import attachment from '../attachment/list.vue';
import waybill from '../waybill/list.vue';
import accountList from './account-list.vue';
import logs from '../logs/list.vue';
import ApiConst from '../../api/ApiConst';
import { removeClass } from '../../api/classUtil';
import { getParamsFromURL, urlRedirect } from '../../api/Utils';

export default {
  components: {
    'ele-form': eleForm,
    waybill,
    eleBlock,
    attachment,
    accountList,
    logs,
    layout
  },
  data() {
    return {
      objectName: '司机',
      code: '',
      configUrl: '',
      domainObject: {},
      editable: true,
      isEdit: false,
      btnDisabled: false,
      fieldConfig: Array,
      fields: Array,
      inputKey: Array,
      addFun: add,
      editFun: edit,
      getInfo: get,
      uploadUrl: ApiConst.apiPersonDomain,
      params: {
        driverCode: getParamsFromURL(window.location.search).code,
        size: 10
      },
      bankAccountParams: {
        personCode: getParamsFromURL(window.location.search).code,
        size: 10
      },
      logType: 'driver',
      listUrl: '/driver/list.html',
      listTitle: '司机管理',
      customColumnAccount: ['bankAccountName', 'bankName', 'bankAccountNo', 'description'],
      customColumnWaybill: ['waybillNo', 'waybillStatus', 'trailerTruckLicenseNo', 'driverFullName', 'goodsName', 'loadingTime', 'loadingGoodsWeight', 'unloadingTime', 'unloadingGoodsWeight'],
      customColumnAttachment: ['truckLicenseNo', 'attachmentTypeCode', 'attachmentNo', 'attachmentIssuanceDate', 'attachmentExpirationDate', 'attachmentResourceCode', 'description', 'attachmentRemindDate', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime']
    };
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
  },
  created() {
    const driverUrl = ApiConst.apiPersonDomain,
      configUrl = `${driverUrl}/detail_render_info/driver/list`;
    this.configUrl = configUrl;
  }
};
</script>

