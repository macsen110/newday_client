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
          <div slot="driverInfo">
            <driver :popData="popData"></driver>
          </div>
          <el-button type="primary" v-show="!editable && isEdit" @click="editForm()" slot="buttonEdit">编辑</el-button>
          <el-button v-show="editable && isEdit" @click="cancelEdit()" slot="buttonCancel">取消编辑</el-button>
          <el-button v-show="editable && isEdit" @click="submitForm('domainObject')" slot="buttonSave">保存</el-button>
          <el-button v-show="!editable && isEdit" @click="changeLog()" slot="buttonChangeLog">{{ objectName }}变更记录</el-button>
          <el-button v-show='editable && !isEdit' type="primary" @click="submitForm('domainObject')" size="large" slot="buttonSubmit" :disabled="btnDisabled">提交</el-button>
          <el-button v-show='editable && !isEdit' @click="resetForm('domainObject')" size="large" slot="buttonReset" :disabled="btnDisabled">重置</el-button>
        </layout>
      </ele-form>
    </div>
    <el-tabs type="border-card" slot="moreRecords" v-if="isEdit">
      <el-tab-pane label="挂车信息">
        <el-row class="form-page">
          <el-form :model="trailerdomainObject" ref="trailerdomainObject" label-width="100px" :inline="false">
            <el-col :span="6" v-for="field in trailerfields" :key="field.fieldConfigCode">
              <el-form-item :label="field.showName">
                <ele-block :field="field" :domainObject="trailerdomainObject" :editable="trailereditable"></ele-block>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="运单记录">
        <waybill :selectable="false" :operatable="false" :customColumn="customColumnWaybill" :isAdvanced="false" :params="params" :needPage="false" :needMore="true"></waybill>
      </el-tab-pane>
      <el-tab-pane label="证照管理">
        <attachment :selectable="false" :customColumn="customColumnAttachment" :isAdvanced="true" :params="params" :needPage="false"></attachment>
      </el-tab-pane>
      <el-tab-pane label="保险信息">
        <insurance :selectable="false" :customColumn="customColumnInsurance" :isAdvanced="false" :params="params" :needPage="false" :needMore="true"></insurance>
      </el-tab-pane>
      <el-tab-pane label="维修记录">
        <maintenance :selectable="false" :customColumn="customColumnMaintenance" :isAdvanced="false" :params="params" :needPage="false" :needMore="true"></maintenance>
      </el-tab-pane>
      <el-tab-pane label="保养记录">
        <car-care :selectable="false" :customColumn="customColumnCarcare" :isAdvanced="false" :params="params" :needPage="false" :needMore="true"></car-care>
      </el-tab-pane>
      <el-tab-pane label="违章记录">
        <peccancy :selectable="false" :customColumn="customColumnPeccancy" :isAdvanced="false" :params="params" :needPage="false" :needMore="true"></peccancy>
      </el-tab-pane>
      <el-tab-pane label="事故记录">
        <accident :selectable="false" :customColumn="customColumnAccident" :isAdvanced="false" :params="params" :needPage="false" :needMore="true"></accident>
      </el-tab-pane>
      <el-tab-pane label="轮胎清单">
        <tyre :selectable="false" :customColumn="customColumnTyre" :isAdvanced="false" :params="params" :needPage="false" :needMore="true"></tyre>
      </el-tab-pane>
      <el-tab-pane label="轮胎巡检">
        <tyre-inspection :selectable="false" :customColumn="customColumnTyreInspection" :isAdvanced="false" :params="params" :needPage="false" :needMore="true"></tyre-inspection>
      </el-tab-pane>
      <el-tab-pane label="附件">
        附件
      </el-tab-pane>
      <el-tab-pane label="变更记录">
        <logs :selectable="false" :operatable="false" :domain="uploadUrl" :type="logType" :code="code" :isAdvanced="false" :params="params" :needPage="true"></logs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
// import detailLayout from '../layout/detail/detailLayout.vue';
import eleForm from '../components/ele-form/eleForm.vue';
import layout from './layout.vue';
// import eleBlock from '../components/ele-block/eleBlock.vue';
import eleBlock from '../components/ele-block/eleBlock.vue';
import driver from './driver/driver.vue';
import { add as truckAdd, edit as truckEdit, get as truckGet } from '../../api/TruckService';
import { list as transportList } from '../../api/TransportService';
import { get as trailerGet } from '../../api/TrailerService';
import maintenance from '../maintenance/list.vue';
import insurance from '../insurance/list.vue';
import carCare from '../care/list.vue';
import peccancy from '../peccancy/list.vue';
import accident from '../accident/list.vue';
import tyre from '../tyre/list.vue';
import tyreInspection from '../tyreInspection/list.vue';
import attachment from '../attachment/list.vue';
import waybill from '../waybill/list.vue';
import logs from '../logs/list.vue';
import ApiConst from '../../api/ApiConst';
import {
  removeClass
} from '../../api/classUtil';
import {
  getParamsFromURL,
  urlRedirect
} from '../../api/Utils';
/* eslint-disable quotes */
export default {
  components: {
    'ele-form': eleForm,
    // 'detailLayout': detailLayout,
    maintenance,
    carCare,
    driver,
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
      code: '',
      popData: {
        datasource: 'driver',
        mainTruckCode: '',
        mainTruckLicenseNo: '',
        powerType: ''
      },
      objectName: '车辆',
      configUrl: '',
      fieldCount: 0,
      domainObject: {},
      editable: true,
      isEdit: false,
      btnDisabled: false,
      fieldConfig: Array,
      fields: Array,
      inputKey: Array,
      addFun: truckAdd,
      editFun: truckEdit,
      getInfo: truckGet,
      uploadUrl: ApiConst.apiTruckDomain,
      logType: 'truck',
      listUrl: '/truck/list.html',
      listTitle: '车辆管理',
      customColumnWaybill: ['waybillNo', 'waybillStatus', 'trailerTruckLicenseNo', 'driverFullName', 'goodsName', 'loadingTime', 'loadingGoodsWeight', 'unloadingTime', 'unloadingGoodsWeight'],
      customColumnAttachment: ['truckLicenseNo', 'attachmentTypeCode', 'attachmentNo', 'attachmentIssuanceDate', 'attachmentExpirationDate', 'attachmentResourceCode', 'description', 'attachmentRemindDate', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnInsurance: ['truckLicenseNo', 'insuranceType', 'insuranceCompany', 'insuranceDate', 'expireDate', 'remindDate', 'insuranceAmount', 'insuranceNo', 'premiumAmount', 'attachmentResourceCode1', 'description', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnMaintenance: ['truckLicenseNo', 'driverName', 'maintenanceDate', 'maintenanceAddress', 'maintenanceUser', 'maintenanceItem', 'description', 'maintenanceCharge', 'currentMileage', 'attachmentResourceCode1', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnCarcare: ['truckLicenseNo', 'driverName', 'careDate', 'careAddress', 'totalAmount', 'currentMileage', 'nextCareMileage', 'nextCareDate', 'remindDate', 'careItemName', 'careItemNumber', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnPeccancy: ['truckLicenseNo', 'driverName', 'type', 'ticketNumber', 'peccancyDate', 'peccancyAddress', 'peccancyPoints', 'peccancyFine', 'agencyFee', 'lateFee', 'takeDate', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnAccident: ['truckLicenseNo', 'driverName', 'accidentDate', 'accidentAddress', 'description', 'damagesAmount', 'insuranceCompany', 'takeCasePeople', 'actualCompensationAmount', 'gapAmount', 'drivingResponsibility', 'drivingResponsibilityAmount', 'projectPeople', 'endDate', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnTyre: ['truckLicenseNo', 'tyreNo', 'tyreBrand', 'purchasePrice', 'onDate', 'onMileage', 'changeTyreNo', 'status', 'offDate', 'offMileage', 'tyreSalvage', 'totalMileage', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
      customColumnTyreInspection: ['truckLicenseNo', 'tyreNo', 'inspectionDate', 'tyreMileage', 'deepWrinkles', 'description', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
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
    formReady(formData) {
      console.log('formReady', formData);
      this.inputKey = formData.paramData.inputKey;
      this.fields = formData.paramData.field;
      this.isEdit = formData.isEdit;
      this.editable = formData.editable;
      this.code = formData.code;
      if (this.isEdit) {
        this.loadTrailerConfig();
        const baseParams = { page: 1, size: 1 },
          searchParams = Object.assign({
            mainTruckCode: this.code
          }, baseParams);
        transportList(searchParams, (data) => {
          if (data.content.length) {
            const trailerTruckCode = data.content[0].trailerTruckCode;
            if (trailerTruckCode) {
              trailerGet({
                code: trailerTruckCode
              }, (res) => {
                if (res && res.content) {
                  Object.assign(this.trailerdomainObject, res.content);
                }
              });
            }
          }
        });
        this.popData.mainTruckCode = this.code;
      }
    },
    editSuccess() {
      this.editable = false;
    },
    submitDone() {
      this.btnDisabled = false;
    },
    loadFinish() {
      //        console.log('load finish');
      const keys = Object.keys(window.rns);
      //        console.log(keys);
      keys.forEach((key) => {
        //          console.log(key);
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
      //        console.log(url, title);
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
      console.log(this.$refs[formName]);
      this.$refs[formName].resetForm();
    },
    loadTrailerConfig() {
      this.trailerfields = [{
        "elementCode": "text",
        "showName": "挂车牌号",
        "detailLinkVisiable": "true",
        "fieldConfigCode": "truckLicenseNo",
        "extraParams": [{
          "controlType": "text",
          "field": "truckLicenseNo",
          "value": ""
        }]
      },
      {
        "elementCode": "text",
        "showName": "品牌型号",
        "fieldConfigCode": "brandName",
        "extraParams": [{
          "controlType": "text",
          "field": "brandName"
        }]
      },
      {
        "elementCode": "text",
        "showName": "识别代号",
        "fieldConfigCode": "idCode",
        "extraParams": [{
          "controlType": "text",
          "field": "idCode"
        }]
      },
      {
        "elementCode": "regTonnage",
        "showName": "总质量",
        "fieldConfigCode": "totalWeight",
        "extraParams": [{
          "controlType": "text",
          "field": "totalWeight"
        },
        {
          "controlType": "select",
          "field": "totalWeightUnitCode",
          "datasource": "truckCarry",
          "default": "kg"
        }
        ]
      },
      {
        "elementCode": "regTonnage",
        "showName": "整备质量",
        "fieldConfigCode": "curbWeight",
        "extraParams": [{
          "controlType": "text",
          "field": "curbWeight"
        },
        {
          "controlType": "select",
          "field": "curbWeightUnitCode",
          "datasource": "truckCarry",
          "default": "kg"
        }
        ]
      },
      {
        "elementCode": "regTonnage",
        "showName": "载重",
        "fieldConfigCode": "regTonnage",
        "extraParams": [{
          "controlType": "text",
          "field": "regTonnage"
        },
        {
          "controlType": "select",
          "field": "regTonnageUnitCode",
          "datasource": "truckCarry",
          "default": "ton"
        }
        ]
      },
      {
        "elementCode": "truckSize",
        "showName": "车长",
        "fieldConfigCode": "truckLength",
        "extraParams": [{
          "controlType": "number",
          "field": "truckLength"
        },
        {
          "controlType": "select",
          "field": "truckLengthUnitCode",
          "datasource": "truckSize",
          "default": "meter"
        }
        ]
      },
      {
        "elementCode": "truckSize",
        "showName": "车宽",
        "fieldConfigCode": "truckWidth",
        "extraParams": [{
          "controlType": "number",
          "field": "truckWidth"
        },
        {
          "controlType": "select",
          "field": "truckWidthUnitCode",
          "datasource": "truckSize",
          "default": "meter"
        }
        ]
      },
      {
        "elementCode": "truckSize",
        "showName": "车高",
        "fieldConfigCode": "truckHeight",
        "extraParams": [{
          "controlType": "number",
          "field": "truckHeight"
        },
        {
          "controlType": "select",
          "field": "truckHeightUnitCode",
          "datasource": "truckSize",
          "default": "meter"
        }
        ]
      },
      {
        "elementCode": "date",
        "showName": "注册日期",
        "fieldConfigCode": "truckRegistrationDate",
        "extraParams": [{
          "controlType": "text",
          "field": "truckRegistrationDate"
        }]
      },
      {
        "elementCode": "text",
        "showName": "产权人",
        "fieldConfigCode": "truckOwner",
        "extraParams": [{
          "controlType": "text",
          "field": "truckOwner"
        }]
      },
      {
        "elementCode": "textarea",
        "showName": "备注",
        "fieldConfigCode": "description",
        "extraParams": [{
          "controlType": "textarea",
          "field": "description"
        }]
      }];
    }
  },
  created() {
    const truckUrl = ApiConst.apiTruckDomain,
      configUrl = `${truckUrl}/detail_render_info/truck/list`;
    this.configUrl = configUrl;
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
.el-tab-pane {
  .page-title, #pageRefresh, .hd-opr .innerblock, .hd-opr .el-button--default, .opr-button {
    display: none;
  }
  .list-page .page-header {
    padding: 0;
    border-bottom: 0;
  }
}
</style>
