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
                @formReady="formReady" @formMounted="formMounted" @editSuccess="editSuccess" @submitDone="submitDone"
                :objectName="objectName"
                label-width="100px" :inline="false">
        <layout :isEdit="isEdit" :editable="editable" :objectName="objectName">
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

          <acceptRecord slot="tabAcceptRecord" :selectable="true"
                :code="code" :isAdvanced="true" :needPage="true" :params="acceptParams">
          </acceptRecord>

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
  import layout from './layout.vue';

  import eleBlock from '../components/ele-block/eleBlock.vue';
  import eleForm from '../components/ele-form/eleForm.vue';
  import { add as freightAdd, edit as freightEdit, get as freightGet } from '../../api/FreightService';

  import logs from '../logs/list.vue';
  import acceptRecord from '../freightAcceptRecord/list.vue';

  import ApiConst from '../../api/ApiConst';
  import { getParamsFromURL } from '../../api/Utils';

  export default {
    components: {
      'ele-form': eleForm,
      'ele-block': eleBlock,
      layout,
      acceptRecord,
      logs
    },
    data() {
      return {
        objectName: '货源',
        configUrl: `${ApiConst.apiFreightDomain}/detail_render_info/freight/list`,
        domainObject: {},
        addFun: freightAdd,
        editFun: freightEdit,
        getInfo: freightGet,
        uploadUrl: ApiConst.apiFreightDomain,
        logType: 'freight',
        listUrl: '/freight/list.html',
        listTitle: '货源管理',
        status: false,
        code: '',
        'goto': null,
        fields: [],
        isEdit: false, // 控制编辑添加按钮
        editable: true, // 控制页面状态
        btnDisabled: false,
        changeLogParams: {
          code: getParamsFromURL(window.location.search).code,
          size: 10
        },
        acceptParams: {
          freightCode: getParamsFromURL(window.location.search).code,
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
      },
      formMounted() {
        // if (this.goto) {
        //   let url = window.location.href;
        //   url += `#${this.goto}`;
        //   window.location.href = url;
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
    },
    mounted() {
      this.$nextTick(() => {
        if (this.goto) {
          let url = window.location;
          url += `#${this.goto}`;
          window.location = url;
        }
      });
    },
    created() {
      this.goto = getParamsFromURL(window.location.search).goto;
    }
  };
</script>

