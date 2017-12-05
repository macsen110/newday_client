/**
* ele-action.vue
* Created by cc on 17/11/24.
*/
<template>
  <div class="form-page">
    <el-row v-loading.fullscreen.lock="loading" element-loading-text="加载中">
      <el-form :model="domainObject" ref="domainObject" label-width="140px" class="demo-ruleForm" :inline="true">
        <el-col :span="12" v-for="field in fields" :key="field.fieldConfigCode" :class="[field.fieldConfigCode === 'uploadAttachment' ? 'el-col-auto' : '']">
          <el-form-item :label="field.showName">
            <ele-block :field="field" :domainObject="domainObject" :inputKey="inputKey" :uploadUrl="uploadUrl"></ele-block>
          </el-form-item>
        </el-col>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('domainObject')" v-show="isEdit">提交</el-button>
          <el-button @click="handleCancel" v-show="isEdit">取消</el-button>
        </div> -->
      </el-form>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import eleBlock from '../ele-block/eleBlock.vue';
  import * as utils from '../../../api/Utils';

  const axios = require('axios');

  function elementConfig(url, type, actionType, code, action) {
    return axios({
      method: 'get',
      url: `${url}/${type}/${actionType}/${code}/action/${action}/render/list`,
      headers: { 'Accept': 'application/json' }
    });
  }

  export default {
    data() {
      return {
        domainObject: {},
        inputKey: [],
        fields: [],
        loading: true,
        code: '',
        tableData: [],
        isEdit: false,
        isAction: false,
        uploadUrl: '',
        actionCode: ''
      };
    },
    props: {
      type: '',
      actionType: '',
      actionDomain: '',
      actionExecuteFun: Function,
      id: '',
      action: '',
      isDialog: {
        type: Boolean,
        'default': false
      }
    },
    components: {
      'ele-block': eleBlock
    },
    computed: {
    },
    methods: {
      execute() {
        console.log('execute action');
        this.submitForm('domainObject');
      },
      submitForm(formName) {
        const self = this,
          h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '确认提交吗？ ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              self.actionExecuteFun(self.code, self.action, self.domainObject, self.tableData, (success, error) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '提交成功',
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  if (!this.isDialog) {
                    self.resetForm(formName);
                  }
                  this.$emit('success');
                }
                if (error) {
                  this.$message({
                    type: 'warning',
                    message: `${error}`,
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  console.error(error);
                  this.$emit('fail');
                }
              });
            } else {
              done();
            }
          }
        }).then(() => {
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      //   先从partnerConfig拿到数据，然后根据拿到的elementCode匹配element_type_define里面的组合信息，然后再到element_type_info里面拿到对应的数据
      const self = this,
        params = utils.getParamsFromURL(window.location.search),
        localStorage = window.localStorage,
        eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
      this.code = this.id ? this.id : params.code;
      this.actionCode = this.action ? this.action : params.actionCode;
      this.uploadUrl = this.actionDomain;
      axios.all([elementConfig(this.actionDomain, this.type, this.actionType, this.code, this.actionCode)])
        .then(axios.spread((eleConfig) => {
          if (eleConfig.data.content.length) {
            const paramData = utils.getParam(eleConfig, eleDefine, eleInfo);
            this.inputKey = paramData.inputKey;
            paramData.field.forEach((field) => {
              field.extraParams.forEach((property) => {
                self.$set(self.domainObject, property.field, null);
              });
            });
//            console.log('self.domainObject: ', self.domainObject);
            this.isAction = true;
            this.fields = paramData.field;
            this.loading = false;
          } else {
            this.loading = false;
          }
        })
      );
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
