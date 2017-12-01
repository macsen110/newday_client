/**
* add.vue
* Created by cc on 17/8/10.
*/
<template>
  <div>
    <div class="form-page">
      <ele-form :domainObject="domainObject" ref="form"
                :configUrl="configUrl" :listUrl="listUrl" :listTitle="listTitle"
                :getInfo="getInfo" :addFun="addFun" :editFun="editFun"
                :editable="editable" :isEdit="isEdit"
                @beforeSubmit="beforeSubmit"
                @formReady="formReady" @editSuccess="editSuccess" @submitDone="submitDone"
                :objectName="objectName"
                label-width="100px" :inline="false">
      <!--<ele-form :model="domainObject" ref="domainObject" label-width="100px" :inline="false">-->
        <layout :isEdit="isEdit" :editable="editable" :objectName="objectName">
          <div v-for="field in fields" :slot="field.fieldConfigCode">
            <el-form-item :label="field.showName" :required="field.required ==='true'">
              <ele-block :field="field" :domainObject="domainObject" :editable="editable" :uploadUrl="uploadUrl" :inputKey="inputKey"></ele-block>
            </el-form-item>
          </div>
          <el-button type="primary" v-show="!editable && isEdit" @click="editForm()" slot="buttonEdit">编辑</el-button>
          <el-button v-show="editable && isEdit" @click="cancelEdit()" slot="buttonCancel">取消编辑</el-button>
          <el-button v-show="editable && isEdit && tplName === 'eleLogisticsPrice'" @click="submitForm('domainObject')" slot="buttonSave">保存</el-button>
          <el-button v-show="!editable && isEdit" @click="changeLog()" slot="buttonChangeLog">{{ objectName }}变更记录</el-button>
          <template v-show='editable && !isEdit' v-if="!(tplName === 'eleLogisticsPrice' && code)">
            <el-button type="primary" @click="submitForm('domainObject')" size="large" slot="buttonSubmit" :disabled="btnDisabled">提交</el-button>
            <el-button @click="resetForm('domainObject')" size="large" slot="buttonReset" :disabled="btnDisabled">重置</el-button>
          </template>
          <ele-logistics-price slot="logisticsPrice" ref="eleLogisticsPrice" v-if="tplName === 'eleLogisticsPrice'"
                               :code="code" :ratesCodeList="domainObject.ratesCodeList" :codeUnitType="domainObject.meterageType"
                               :ratesCode="domainObject.ratesCode" :editable="editable" @change="onLogisticsPriceChange">
          </ele-logistics-price>
          <waybill slot="tabWaybill" :selectable="false" :operatable="false" :customColumn="customColumnWaybill" :isAdvanced="false" :params="params" :needPage="false" :needMore="true"></waybill>
          <rates-change-list slot="tabPriceChangeLog" :code="code"></rates-change-list>
          <!--<div slot="tabPriceChangeLog" class="list-page">-->
            <!--<v-table :columnsData="columnsData" :listData="listData" :selectable="false" :operatable="false" :toDetail="false">-->
            <!--</v-table>-->
            <!--<v-page :page="page" :pageSize="pageSize" :total="total" v-on:change="change" v-if="needPage"></v-page>-->
          <!--</div>-->
          <logs slot="tabChangeLog" :selectable="false" :operatable="false" :domain="uploadUrl" :type="logType" :code="code" :isAdvanced="false" :params="params" :needPage="true"></logs>
        </layout>
      </ele-form>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import ratesChangeList from './ratesList.vue';
  import detailLayout from '../layout/detail/detailLayout.vue';
  import eleForm from '../components/ele-form/eleForm.vue';
  import layout from './layout.vue';
  import { add, edit, get } from '../../api/LogisticsService';
  import eleBlock from '../components/ele-block/eleBlock.vue';
  import eleLogisticsPrice from '../components/ele-logistics-price/eleLogisticsPrice.vue';
  import { getParamsFromURL } from '../../api/Utils';
  import waybill from '../waybill/list.vue';
  import logs from '../logs/list.vue';

  import ApiConst from '../../api/ApiConst';

  // 引入tab跳转
  require('../public.js');

  export default {
    components: {
      'ele-form': eleForm,
      'detailLayout': detailLayout,
      'ele-block': eleBlock,
      'rates-change-list': ratesChangeList,
      layout,
      eleLogisticsPrice,
      waybill,
      logs
    },
    data() {
      return {
        objectName: '订单',
        configUrl: `${ApiConst.apiLogisticsDomain}/detail_render_info/logistics/list`,
        tplName: 'eleLogisticsPrice',
        domainObject: {},
        addFun: add,
        editFun: edit,
        getInfo: get,
        uploadUrl: ApiConst.apiLogisticsDomain,
        logType: 'logistics',
        listUrl: '/logistics/list.html',
        listTitle: '订单管理',
        fields: [],
        isEdit: false, // 控制编辑添加按钮
        editable: true, // 控制页面状态
        loading: true,
        code: '',
        getData: {},
        btnDisabled: false,
        customColumnWaybill: ['waybillNo', 'waybillStatus', 'truckLicenseNo', 'trailerTruckLicenseNo', 'driverFullName', 'loadingTime', 'unloadingTime', 'loadingGoodsWeight', 'unloadingGoodsWeight', 'createTime'],
        params: {
          logisticsCode: getParamsFromURL(window.location.search).code,
          size: 10
        },
        isAdvanced: {
          type: Boolean,
          'default': true
        },
        needPage: {
          type: Boolean,
          'default': true
        },
        columnsData: [],
        listData: [],
        pageSize: 20,
        page: 1,
        total: null
      };
    },
    methods: {
      getExtraParams(type) {
        switch (type) {
          case 'eleLogisticsPrice' :
            return Object.assign(this.$refs.eleLogisticsPrice.priceModel, {
              ratesCode: this.$refs.eleLogisticsPrice.selectRate,
              logisticsRatesCode: this.$refs.eleLogisticsPrice.rateArray
            });
          default:
            return {};
        }
      },
      formReady(formData) {
        console.log('formReady', formData);
        this.inputKey = formData.paramData.inputKey;
        this.fields = formData.paramData.field;
        this.isEdit = formData.isEdit;
        this.editable = formData.editable;
        this.code = formData.code;
//        if (!this.domainObject.logisticsRatesCode) {
//          this.$set(this.domainObject, 'logisticsRatesCode', []);
//        }
//        if (!this.domainObject.logisticsRatesName) {
//          this.$set(this.domainObject, 'logisticsRatesName', []);
//        }
      },
      onLogisticsPriceChange(model) {
        this.domainObject.clientFreightPrice = model.clientFreightRate;
        this.domainObject.clientFreightPriceUnitCode = model.clientFreightRateUnitCode;
        this.domainObject.driverReferPrice = model.driverReferencePrice;
        this.domainObject.driverReferPriceUnitCode = model.driverReferencePriceUnitCode;
        this.domainObject.goodsPrice = model.goodsPrice;
        this.domainObject.goodsPriceUnitCode = model.goodsPriceUnitCode;
        this.domainObject.goodsLossMethod = model.goodsLossMethod;
        this.domainObject.goodsLoss = model.goodsLoss;
        this.domainObject.goodsLossUnitCode = model.goodsLossUnitCode;
      },
      beforeSubmit(model) {
        if (!this.isEdit) {
          model.logisticsRatesCode = this.$refs.eleLogisticsPrice.rateArray;
          model.ratesCode = this.$refs.eleLogisticsPrice.selectRate;
          console.log('beforeSubmit', model);
        } else {
          model.ratesCode = this.$refs.eleLogisticsPrice.selectRate;
        }
      },
      editForm() {
        this.editable = true;
      },
      cancelEdit() {
        this.$refs.form.resetForm();
        this.editable = false;
      },
      submitForm() {
        if (this.$refs.eleLogisticsPrice.validateAll()) {
          this.btnDisabled = true;
          this.$refs.form.submitForm();
        }
      },
      resetForm() {
        this.$refs.form.resetForm();
      },
      editSuccess() {
        this.editable = false;
      },
      submitDone() {
        this.btnDisabled = false;
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
