/**
* add.vue
* Created by cc on 17/8/10.
*/
<template>
  <div>
    <div class="form-page">
      <el-form :model="domainObject" ref="domainObject" label-width="100px" :inline="false">
        <layout :isEdit="isEdit" :editable="editable" :objectName="objectName">
          <div v-for="field in fields" :slot="field.fieldConfigCode">
            <el-form-item :label="field.showName" :required="field.required ==='true'">
              <ele-block :field="field" :domainObject="domainObject" :editable="editable" :uploadUrl="uploadUrl" :inputKey="inputKey"></ele-block>
            </el-form-item>
          </div>
          <div slot="driverInfo">
            <driver :popData="popData"></driver>
          </div>
          <el-button type="primary" v-show="!editable && isEdit" @click="editPage()" slot="buttonEdit">编辑</el-button>
          <el-button v-show="editable && isEdit" @click="cancelEdit()" slot="buttonCancel">取消编辑</el-button>
          <el-button v-show="!editable && isEdit" @click="changeLog()" slot="buttonChangeLog">{{ objectName }}变更记录</el-button>
          <el-button type="primary" @click="submitForm('domainObject')" size="large" slot="buttonSubmit" :disabled="btnDisabled">提交</el-button>
          <el-button @click="resetForm('domainObject')" size="large" slot="buttonReset" :disabled="btnDisabled">重置</el-button>
        </layout>
      </el-form>
    </div>
    <!-- <el-tabs type="border-card" slot="moreRecords" v-if="isEdit">
      <el-tab-pane label="证照管理">
        <attachment :selectable="false" :customColumn="customColumnAttachment" :isAdvanced="false" :params="params" :needPage="false"></attachment>
      </el-tab-pane>
      <el-tab-pane label="变更记录">
        <logs :selectable="false" :operatable="false" :domain="uploadUrl" :type="logType" :code="code" :isAdvanced="false" :params="params" :needPage="true"></logs>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script type="text/ecmascript-6">
import detailLayout from '../layout/detail/detailLayout.vue';
import layout from './layout.vue';
// import eleBlock from '../components/ele-block/eleBlock.vue';
import eleBlock from '../components/ele-block/eleBlock.vue';
import { get as truckGet } from '../../api/TruckManagementService';
// import attachment from '../attachment/list.vue';
// import logs from '../logs/list.vue';
import ApiConst from '../../api/ApiConst';
import {
  initForEdit,
  initForAdd
} from '../common/formHelper';
import {
  getParamsFromURL,
  urlRedirect
} from '../../api/Utils';
/* eslint-disable quotes */
export default {
  components: {
    'detailLayout': detailLayout,
    // attachment,
    eleBlock,
    // logs,
    layout
  },
  data() {
    return {
      popData: {
        datasource: 'driver',
        mainTruckCode: '',
        mainTruckLicenseNo: '',
        powerType: ''
      },
      objectName: '车辆',
      configUrl: '',
      fieldCount: 0,
      code: '',
      domainObject: {},
      editable: true,
      isEdit: false,
      btnDisabled: false,
      fieldConfig: Array,
      fields: Array,
      inputKey: Array,
      getInfo: truckGet,
      uploadUrl: ApiConst.apiTruckDomain,
      logType: 'truck',
      listUrl: '/truck/list.html',
      listTitle: '车辆管理',
      customColumnAttachment: ['truckLicenseNo', 'attachmentTypeCode', 'attachmentNo', 'attachmentIssuanceDate', 'attachmentExpirationDate', 'attachmentResourceCode', 'description', 'attachmentRemindDate', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      waybillParams: {
        size: 50
      },
      trailereditable: false,
      params: {
        truckCode: getParamsFromURL(window.location.search).code,
        size: 10
      },
      trailerdomainObject: {},
      trailerfields: Array
    };
  },
  methods: {
    loadFinish() {
      //        console.log('load finish');
      const keys = Object.keys(window.rns);
      //        console.log(keys);
      keys.forEach((key) => {
        //          console.log(key);
        window.rns[key].init();
      });
    },
    editPage() {
      this.editable = true;
    },
    cancelEdit() {
      this.resetForm('domainObject');
      this.editable = false;
    },
    changeLog() {
      const url = `/logs/list.html?domain=${this.uploadUrl}&type=${this.logType}&code=${this.code}`,
        title = `${this.objectName}变更记录`;
      //        console.log(url, title);
      urlRedirect(url, title);
    },
    isArray(val) {
      if (typeof Array.isArray === 'function') {
        return Array.isArray(val);
      }
      return Object.prototype.toString.call(val) === '[object Array]';
    }
  },
  created() {
    const truckUrl = ApiConst.apiTruckDomain,
      self = this,
      params = getParamsFromURL(window.location.search),
      urlCode = params.code,
      urlEditable = params.editable,
      configUrl = `${truckUrl}/detail_render_info/truck/list`;

    let eleInitCounter = 0;

    this.configUrl = configUrl;

    function initEleCallback() {
      eleInitCounter += 1;
      // console.log('init element', eleInitCounter, self.fieldCount);
      if (eleInitCounter === self.fieldCount) {
        const event = new Event('loadDone');
        document.dispatchEvent(event);
      }
    }

    function initCallback(fieldConfig, fieldCount) {
      self.fieldCount = fieldCount;
      document.addEventListener('loadEleDone', initEleCallback, false);
      self.inputKey = fieldConfig.inputKey;
      self.fields = fieldConfig.field;
    }

    this.editable = urlEditable !== 'false';
    // console.log('editable =', this.editable, urlEditable);

    if (urlCode) {
      self.isEdit = true;
      // this.waybillParams.driverCode = urlCode;
      // this.attachmentParams.driverCode = urlCode;
      // this.insuranceParams.driverCode = urlCode;
      // this.maintenanceParams.driverCode = urlCode;
      // this.carcareParams.driverCode = urlCode;
      // this.peccancyParams.driverCode = urlCode;
      // this.accidentParams.driverCode = urlCode;
      // this.tyreParams.driverCode = urlCode;
      // this.tyreInspectionParams.driverCode = urlCode;

      this.getInfo({
        code: urlCode
      }, (success, error) => {
        if (error) {
          self.$message({
            type: 'error',
            message: error.content,
            duration: 5000
          });
        } else {
          if (!self.code && success.content.code) {
            self.code = success.content.code;
          }
          initForEdit(self, self.domainObject, self.configUrl, success.content, initCallback);

          self.popData.mainTruckCode = success.content.code;
          self.popData.mainTruckLicenseNo = success.content.truckLicenseNo;
          self.popData.powerType = success.content.powerType;
        }
      });
    } else {
      initForAdd(self, self.domainObject, self.configUrl, initCallback);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.list-page {
  height: auto !important;
  .fix-table-wrap {
    height: auto !important;
    max-height: 607px;
    .rl-fix-table {
      margin-left: 0 !important;
    }
  }
}
</style>
