<template>
  <div>
    <div class="form-page">
      <el-form :model="domainObject" label-width="100px" :inline="false">
        <settle-form-layout :isEdit="true" :editable="editable" :objectName="objectName">
          <div v-for="field in fields" :slot="field.fieldConfigCode">
            <el-form-item :label="field.showName" :required="field.required ==='true'">
              <ele-block :field="field" :domainObject="domainObject" :editable="isEditable(field.fieldConfigCode)" :uploadUrl="uploadUrl" :inputKey="inputKey"></ele-block>
            </el-form-item>
          </div>


          <el-button type="primary" v-show="editable" @click="submitForm()" size="large" slot="buttonSubmit" :disabled="btnDisabled">提交</el-button>

        </settle-form-layout>
      </el-form>

    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import settleFormLayout from './settleFormLayout.vue';
  import eleBlock from '../components/ele-block/eleBlock.vue';
  import * as waybillService from '../../api/waybillService';

  export default {
    components: {
      'settle-form-layout': settleFormLayout,
      'ele-block': eleBlock
    },
    props: {
      domainObject: Object,
      inputKey: Array,
      uploadUrl: String,
      objectName: String,
      isEdit: Boolean,
      editable: Boolean,
      btnDisabled: Boolean,
      fields: Array
    },
    methods: {
      isEditable(fieldConfigCode) {
        return this.editable && this.editableFields.includes(fieldConfigCode);
      },
      submitForm() {
        waybillService.saveSettle(this.domainObject, (success, error) => {
          if (error) {
            this.$message({
              type: 'error',
              showClose: true,
              message: error.content,
              duration: 5000
            });
          }
          if (success) {
            window.location.reload();
          }
        });
      }
    },
    data() {
      return {
        editableFields: ['settleMethod', 'settleAdjustAmount', 'settleResult', 'settleReason']
      };
    }
  };
</script>
