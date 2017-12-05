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
                @formReady="formReady" @editSuccess="editSuccess" @submitDone="submitDone"
                :objectName="objectName"
                label-width="100px" :inline="false">
        <settle-layout :isEdit="isEdit" :editable="editable" :objectName="objectName">
          <div v-for="field in fields" :slot="field.fieldConfigCode">
            <el-form-item :label="field.showName" :required="field.required ==='true'">
              <ele-block :field="field" :domainObject="domainObject" :editable="editable"
                         :uploadUrl="uploadUrl" :inputKey="inputKey"></ele-block>
            </el-form-item>
          </div>

          <el-button v-show="!editable && isEdit" type="primary" @click="editForm()" slot="buttonEdit">编辑</el-button>
          <el-button v-show="editable && isEdit" @click="cancelEdit()" slot="buttonCancel">取消编辑</el-button>
          <el-button v-show="editable && isEdit" @click="submitForm()" slot="buttonSave">保存</el-button>
          <el-button v-show="editable && !isEdit" type="primary" @click="submitForm()" size="large" slot="buttonSubmit" :disabled="btnDisabled">提交</el-button>
          <el-button v-show="editable && !isEdit" @click="resetForm()" size="large" slot="buttonReset" :disabled="btnDisabled">重置</el-button>

          <charge-list :uploadUrl="uploadUrl"
                       :domainObject="domainObject"
                       :waybillCode="code"
                       v-if="status" slot="slotChargeList">
          </charge-list>

          <logs slot="tabChangeLog" :selectable="false" :operatable="false"
                :domain="uploadUrl" :type="logType" :code="code" :isAdvanced="false"
                :params="changeLogParams" :needPage="true">
          </logs>

          <voucher-list slot="tabVoucherList" :waybill-code="code" :upload-url="uploadUrl"></voucher-list>
        </settle-layout>
      </ele-form>

    </div>
    <settle-form v-show="isEdit" :editable="editable" :objectName="objectName" :domainObject="domainObject" :fields="fields"
                 :inputKey="inputKey" :uploadUrl="uploadUrl"></settle-form>

  </div>
</template>

<script type="text/ecmascript-6">
  import settleForm from './settleForm.vue';
  import settleLayout from './settleLayout.vue';

  import eleBlock from '../components/ele-block/eleBlock.vue';
  import eleForm from '../components/ele-form/eleForm.vue';
  import chargeList from './chargeList.vue';
  import voucherList from './voucherList.vue';

  import * as waybillService from '../../api/waybillService';

  import ApiConst from '../../api/ApiConst';
  import * as utils from '../../api/Utils';
  import logs from '../logs/list.vue';

  export default {
    components: {
      'ele-form': eleForm,
      'settle-layout': settleLayout,
      'settle-form': settleForm,
      'logs': logs,
      'charge-list': chargeList,
      'voucher-list': voucherList,
      'ele-block': eleBlock
    },
    data() {
      return {
        objectName: '运单结账',
        configUrl: `${ApiConst.apiWayBillDomain}/detail_render_info/settle/list`,
        domainObject: {},
        addFun: waybillService.add,
        editFun: waybillService.edit,
        getInfo: waybillService.get,
        uploadUrl: ApiConst.apiWayBillDomain,
        logType: 'settle',
        listUrl: '/waybill/settleList.html',
        listTitle: '运单结账列表',
        status: false,
        fields: [],
        inputKey: [],
        code: '',
        isEdit: false, // 控制编辑添加按钮
        editable: true, // 控制页面状态
        btnDisabled: false,
        changeLogParams: {
          waybillCode: utils.getParamsFromURL(window.location.search).code,
          size: 10
        },
        loading: true
      };
    },
    methods: {
      getCal() {
        waybillService.getTotalAmount(this.domainObject.code, null, null, (success) => {
          const data = success.content;
          data.forEach((val) => {
            this.domainObject[val.expressionResultFieldName] = val.expressionResult;
          });
          // this.domainObject = success.content;
        });
      },
      formReady(formData) {
        console.log('formReady', formData);
        this.inputKey = formData.paramData.inputKey;
        this.fields = formData.paramData.field;
        this.isEdit = formData.isEdit;
        this.editable = formData.editable;
        this.code = formData.code;
        this.getCal();
      },
      editForm() {
        this.editable = true;
      },
      cancelEdit() {
        this.$refs.form.resetForm();
        this.editable = false;
      },
      submitForm() {
        this.btnDisabled = true;
        this.$refs.form.submitForm();
      },
      resetForm() {
        this.$refs.form.resetForm();
      },
      editSuccess() {
        this.editable = false;
        this.getCal();
      },
      submitDone() {
        this.btnDisabled = false;
      }
    },
    mounted() {
      console.log('child mounted', this.$slots);
    },
    created() {
      console.log('child created');
    }
  };
</script>

