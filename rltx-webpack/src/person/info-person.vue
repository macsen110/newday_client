<template>
  <div>
    <div class="form-page">
      <el-form :model="domainObject" ref="domainObject" label-width="100px" :inline="false">
        <layout :isEdit="isEdit" :editable="editable" :objectName="objectName">
          <div v-for="field in fields" :key="field.fieldConfigCode" :slot="field.fieldConfigCode">
            <el-form-item :label="field.showName" :required="field.required ==='true'">
              <ele-block :field="field" :domainObject="domainObject" :editable="editable" :uploadUrl="uploadUrl" :inputKey="inputKey"></ele-block>
            </el-form-item>
          </div>
          <el-button type="primary" v-show="!editable && isEdit" @click="editPage()" slot="buttonEdit">编辑</el-button>
          <el-button v-show="editable && isEdit" @click="cancelEdit()" slot="buttonCancel">取消编辑</el-button>
          <el-button v-show="!editable && isEdit" @click="changeLog()" slot="buttonChangeLog">{{ objectName }}变更记录</el-button>
          <el-button type="primary" @click="submitForm('domainObject')" size="large" slot="buttonSubmit" :disabled="btnDisabled">提交</el-button>
          <el-button @click="resetForm('domainObject')" size="large" slot="buttonReset" :disabled="btnDisabled">重置</el-button>

        </layout>
      </el-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import eleBlock from '../components/ele-block/eleBlock.vue';
import * as PersonService from '../../api/PersonService';
import layout from './layout.vue';
import * as ApiConst from '../../api/ApiConst';
import { initForEdit, initForAdd } from '../common/formHelper';
import { removeClass } from '../../api/classUtil';
import { getParamsFromURL, urlRedirect } from '../../api/Utils';

export default {
  name: 'person-info',
  components: {
    eleBlock,
    layout
  },
  data() {
    return {
      objectName: '个人信息',
      domainObject: {},
      editable: false,
      isEdit: true,
      btnDisabled: false,
      fieldConfig: Array,
      fields: Array,
      inputKey: Array,
      editFun: PersonService.edit,
      getInfo: PersonService.get
    };
  },
  methods: {
    editPage() {
      this.editable = true;
    },
    cancelEdit() {
      this.resetForm('domainObject');
      this.editable = false;
    },
    submitForm(formName) {
      const self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          self.btnDisabled = true;
          const event = new Event('submitDone');
          if (self.isEdit) {
            self.editFun(this.code, this.domainObject, (success, error) => {
              if (error || success.code !== 200) {
                this.$message({
                  type: 'error',
                  message: error.content,
                  duration: 500
                });
                self.btnDisable = false;
                return false;
              }
              if (success) {
                this.$message({
                  type: 'success',
                  message: '提交成功',
                  duration: 1000
                });
                self.btnDisabled = false;
                self.isEdit = true;
                self.editable = false;
                document.dispatchEvent(event);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style>

</style>
