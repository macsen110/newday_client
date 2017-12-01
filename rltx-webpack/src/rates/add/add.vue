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
        <layout :isEdit="isEdit" :editable="editable" :objectName="objectName" :fields="fields">
          <div v-for="field in fields" :slot="field.fieldConfigCode">
            <el-form-item :label="field.showName" :required="field.required ==='true'">
              <ele-block :field="field" :domainObject="domainObject" :editable="editable" :uploadUrl="uploadUrl" :inputKey="inputKey"></ele-block>
            </el-form-item>
          </div>

          <el-button type="primary" v-show="!editable && isEdit" @click="editForm()" slot="buttonEdit">编辑</el-button>
          <el-button v-show="editable && isEdit" @click="cancelEdit()" slot="buttonCancel">取消编辑</el-button>
          <el-button v-show="editable && isEdit" @click="submitForm()" slot="buttonSave">保存</el-button>
          <!--<el-button v-show="!editable && isEdit" @click="changeLog()" slot="buttonChangeLog">{{ objectName }}变更记录</el-button>-->

          <el-button v-show='editable && !isEdit' type="primary" @click="submitForm()" size="large" slot="buttonSubmit" :disabled="btnDisabled">提交</el-button>
          <el-button v-show='editable && !isEdit' @click="resetForm()" size="large" slot="buttonReset" :disabled="btnDisabled">重置</el-button>

          <logs slot="tabChangeLog" :selectable="false" :operatable="false"
                :domain="uploadUrl" :type="logType" :code="code" :isAdvanced="false"
                :params="changeLogParams" :needPage="true">
          </logs>

        </layout>
      </ele-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import layout from '../layout.vue';

  import eleBlock from '../../components/ele-block/eleBlock.vue';
  import eleForm from '../../components/ele-form/eleForm.vue';
  import { add as ratesAdd, edit as ratesEdit, get as ratesGet } from '../../../api/rateService';

  import logs from '../../logs/list.vue';

  import ApiConst from '../../../api/ApiConst';
  import { getParamsFromURL } from '../../../api/Utils';

  export default {
    components: {
      'ele-form': eleForm,
      'ele-block': eleBlock,
      layout,
      logs
    },
    data() {
      return {
        objectName: '运价',
        configUrl: `${ApiConst.apiResourceDomain}/detail_render_info/rates/list`,
        domainObject: {},
        addFun: ratesAdd,
        editFun: ratesEdit,
        getInfo: ratesGet,
        uploadUrl: ApiConst.apiResourceDomain,
        logType: 'rates',
        listUrl: '/rates/list.html',
        listTitle: '运价列表',
        status: false,
        code: '',
        fields: [],
        isEdit: false, // 控制编辑添加按钮
        editable: true, // 控制页面状态
        btnDisabled: false,
        changeLogParams: {
          code: getParamsFromURL(window.location.search).code,
          size: 10
        },
        loading: true
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
        // const params = getParamsFromURL(window.location.search),
        //   self = this;
        // if (params.logisticsCode) {
        //   LogisticsService.get({ code: params.logisticsCode }, (success) => {
        //     if (success) {
        //       self.$refs.form.dispatchEvent('logisticsNo', 'change', success.content);
        //     }
        //   });
        // }
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
      },
      submitDone() {
        this.btnDisabled = false;
      }
    }
  };
</script>
