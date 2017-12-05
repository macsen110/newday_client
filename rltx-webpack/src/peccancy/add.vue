<template>
  <ele-form :domainObject="domainObject" ref="form"
            :configUrl="configUrl" :listUrl="listUrl" :listTitle="listTitle"
            :getInfo="getInfo" :addFun="addFun" :editFun="editFun"
            :editable="editable" :isEdit="isEdit"
            @formReady="formReady" @editSuccess="editSuccess" @submitDone="submitDone"
            :objectName="objectName"
            label-width="100px" :inline="false">
    <layout :isEdit="isEdit" :editable="editable" :objectName="objectName">
      <div v-for="field in fields" :slot="field.fieldConfigCode">
        <el-form-item :label="field.showName" :required="field.required ==='true'">
          <ele-block :field="field" :domainObject="domainObject" :editable="editable" :uploadUrl="uploadUrl"
                     :inputKey="inputKey"></ele-block>
        </el-form-item>
      </div>

      <el-button type="primary" v-show="!editable && isEdit" @click="editForm()" slot="buttonEdit">编辑</el-button>
      <el-button v-show="editable && isEdit" @click="cancelEdit()" slot="buttonCancel">取消编辑</el-button>
      <el-button v-show="editable && isEdit" @click="submitForm()" slot="buttonSave">保存</el-button>
      <!--<el-button v-show="!editable && isEdit" @click="changeLog()" slot="buttonChangeLog">{{ objectName }}变更记录</el-button>-->

      <el-button v-show='editable && !isEdit' type="primary" @click="submitForm()" size="large" slot="buttonSubmit"
                 :disabled="btnDisabled">提交
      </el-button>
      <el-button v-show='editable && !isEdit' @click="resetForm()" size="large" slot="buttonReset"
                 :disabled="btnDisabled">重置
      </el-button>

      <logs slot="tabChangeLog" :selectable="false" :operatable="false"
            :domain="uploadUrl" :type="logType" :code="code" :isAdvanced="false"
            :params="changeLogParams" :needPage="true">
      </logs>
    </layout>
  </ele-form>
</template>

<script type="text/ecmascript-6">
  import logs from '../logs/list.vue';
  import layout from './layout.vue';
  import eleBlock from '../components/ele-block/eleBlock.vue';
  import eleForm from '../components/ele-form/eleForm.vue';
  import { add, edit, get } from '../../api/PeccancyService';

  import ApiConst from '../../api/ApiConst';
  import { getParamsFromURL } from '../../api/Utils';

  export default {
    name: 'peccancyEdit',
    components: {
      'ele-block': eleBlock,
      layout,
      logs,
      'ele-form': eleForm
    },
    data() {
      return {
        objectName: '违章记录',
        configUrl: `${ApiConst.apiMaintenaceDomain}/detail_render_info/peccancy/list`,
        domainObject: {},
        addFun: add,
        editFun: edit,
        getInfo: get,
        uploadUrl: ApiConst.apiMaintenaceDomain,
        logType: 'peccancy',
        listUrl: '/peccancy/list.html',
        listTitle: '违章记录列表',
        status: false,
        fields: [],
        inputKey: [],
        code: '',
        isEdit: false, // 控制编辑添加按钮
        editable: true, // 控制页面状态
        btnDisabled: false,
        changeLogParams: {
          waybillCode: getParamsFromURL(window.location.search).code,
          size: 10
        },
        loading: true
      };
    },
    methods: {
      formReady(formData) {
        console.log('formReady', formData);
//        let tempArr = [];
//        formData.paramData.field.forEach((field) => {
//          console.log(field.fieldConfigCode);
//          tempArr.push(field.fieldConfigCode);
//        });
//        console.log(tempArr.join(' '));
        this.inputKey = formData.paramData.inputKey;
        this.fields = formData.paramData.field;
        this.isEdit = formData.isEdit;
        this.editable = formData.editable;
        this.code = formData.code;
        const params = getParamsFromURL(window.location.search);
        if (params.logisticsCode) {
          console.log('logisticsCode', window.rns.logisticsCode);
          window.rns.logisticsCode.$emit('select', { name: params.logisticsNo, value: params.logisticsCode });
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
    },
    mounted() {
      console.log('child mounted', this.$slots);
    },
    created() {
      console.log('child created');
    }
  };
</script>
