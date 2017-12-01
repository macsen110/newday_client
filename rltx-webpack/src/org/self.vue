/**
* add.vue
* Created by dsky on 17/5/26.
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
          <el-button type="primary" v-show="!editable && isEdit" @click="editPage()" slot="buttonEdit">编辑</el-button>
          <el-button v-show="editable && isEdit" @click="cancelEdit()" slot="buttonCancel">取消编辑</el-button>
          <el-button v-show="editable && isEdit" @click="submitForm('domainObject')" slot="buttonSave">保存</el-button>
          <!-- <el-button v-show="!editable && isEdit" @click="changeLog()" slot="buttonChangeLog">{{ objectName }}变更记录</el-button> -->
          <el-button v-show='editable && !isEdit' type="primary" @click="submitForm('domainObject')" size="large" slot="buttonSubmit" :disabled="btnDisabled">提交</el-button>
          <el-button v-show='editable && !isEdit' @click="resetForm('domainObject')" size="large" slot="buttonReset" :disabled="btnDisabled">重置</el-button>

          <bank-account slot="tabBankAccount" :selectable="false"
                        :customColumn="customColumnBankAccount"
                        :addFrom="addFrom"
                        :isAdvanced="true"
                        :params="params"
                        :needPage="false">
          </bank-account>

          <logs slot="tabChangeLog" :selectable="false" :operatable="false"
                :domain="uploadUrl" :type="logType" :code="changeLogParams.code" :isAdvanced="false"
                :params="changeLogParams" :needPage="true">
          </logs>
        </layout>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import detailLayout from '../layout/detail/detailLayout.vue';
  import layout from './layout.vue';
  import eleBlock from '../components/ele-block/eleBlock.vue';
  import { edit as companyEdit, get as companyGet } from '../../api/OrgService';

  import bankAccount from '../bankAccount/list.vue';
  import logs from '../logs/list.vue';

  import ApiConst from '../../api/ApiConst';
  import { removeClass } from '../../api/classUtil';
  import { urlRedirect, getParamsFromURL, getParam, NumtoStr as numtoStr } from '../../api/Utils';

  const axios = require('axios');

  export default {
    components: {
      'detailLayout': detailLayout,
      'ele-block': eleBlock,
      layout,
      logs,
      'bank-account': bankAccount
    },
    data() {
      return {
        objectName: '公司',
        configUrl: '',
        domainObject: {},
        fields: [],
        editable: true,
        isEdit: false,
        btnDisabled: false,
        loading: true,
        code: '',
        getData: {},
        addFun: Function,
        editFun: companyEdit,
        getInfo: companyGet,
        uploadUrl: ApiConst.apiOrgDomain,
        logType: 'partner',
        listUrl: '',
        listTitle: '',
        customColumnBankAccount: ['bankAccountName', 'bankName', 'bankAccountNo', 'creatorUsername', 'createTime', 'updateUsername', 'updateTime'],
        addFrom: 'company',
        params: {
          orgCode: JSON.parse(localStorage.getItem('userInfo')).orgCode,
          size: 10
        },
        changeLogParams: {
          code: JSON.parse(localStorage.getItem('userInfo')).orgCode,
          size: 10
        }
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
      },
      submitForm(formName) {
        const self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            self.btnDisabled = true;
            const event = new Event('submitDone');
            if (this.isEdit) {
              this.editFun(this.code, this.domainObject, (success, error) => {
                if (error || success.code !== 200) {
                  this.$message({
                    type: 'error',
                    message: error.content,
                    duration: 5000
                  });
                  self.btnDisabled = false;
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
            } else {
              // console.log('domainObject is', self.domainObject);
              this.addFun(this.domainObject, (success, error) => {
                if (error || success.code !== 200) {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    message: error.content,
                    duration: 5000
                  });
                  self.btnDisabled = false;
                  return false;
                }
                if (success) {
                  //                  self.resetForm(formName);
                  self.btnDisabled = false;
                  this.$confirm(`恭喜您,新建${this.objectName}成功！ 是否继续新建${this.objectName}?`, '提示', {
                    confirmButtonText: '继续新建',
                    cancelButtonText: `返回${this.objectName}列表`,
                    type: 'success',
                    customClass: 'confirm-dialog'
                  }).then(() => {
                    window.location.reload();
                  }).catch(() => {
                    let url = this.listUrl;
                    const qindex = url.indexOf('?'),
                      title = this.listTitle;
                    // console.log(url, title);
                    if (qindex > -1) {
                      url = url.substring(0, qindex);
                    }
                    // console.log(url, title);
                    urlRedirect(url, title);
                  });
                  document.dispatchEvent(event);
                }
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /*      resetForm() {
              Object.keys(this.initData).forEach((key) => {
                this.$set(this.domainObject, key, this.initData[key]);
              });
            },*/
      resetForm(formName) {
        if (document.querySelector('#pictureResourceCode')) {
          const imglist = document.querySelector('#pictureResourceCode .el-upload-list').querySelectorAll('li'),
            uploadCard = document.querySelector('#pictureResourceCode .el-upload--picture-card');
          if (imglist.length > 0) {
            document.querySelector('#pictureResourceCode .el-upload-list').innerHTML = '';
            removeClass(uploadCard, 'hide');
          }
        }
        this.$refs[formName].resetFields();
      }
    },
    created() {
      document.addEventListener('loadDone', this.loadFinish, false);
      const self = this,
        companyUrl = ApiConst.apiOrgDomain,
        configUrl = `${companyUrl}/detail_render_info/company/list`,
        params = getParamsFromURL(window.location.search),
        urlCode = params.code,
        urlEditable = params.editable,
        localStorage = window.localStorage,
        eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
      // console.log(this.configUrl);
      function elementConfig() {
        return axios({
          method: 'get',
          url: configUrl,
          headers: { 'Accept': 'application/json' }
        });
      }
      //   先从partnerConfig拿到数据，然后根据拿到的elementCode匹配element_type_define里面的组合信息，然后再到element_type_info里面拿到对应的数据
      axios.all([elementConfig()])
        .then(axios.spread((eleConfig) => {
          const paramData = getParam(eleConfig, eleDefine, eleInfo);
          //          console.log(paramData);
          self.inputKey = paramData.inputKey;
          let count = 0,
            len = 0;
          function cb() {
            count += 1;
            if (count === len) {
              const event = new Event('loadDone');
              document.dispatchEvent(event);
            }
          }
          if (urlCode || urlEditable) {
            const paramObj = {
              code: urlCode
            };
            // console.log(urlCode, urlEditable);
            self.code = urlCode;
            self.isEdit = true;
            if (urlEditable === 'false') {
              self.editable = false;
            }
            // self.editable = urlEditable === 'true';
            this.getInfo(paramObj, (success, error) => {
              if (error) {
                self.loading = false;
                self.$message({
                  type: 'error',
                  message: error.content,
                  duration: 5000
                });
              }
              if (success) {
                if (!self.code && success.content.code) {
                  self.code = success.content.code;
                  self.params = {
                    orgCode: success.content.code,
                    size: 10
                  };
                }
                Object.keys(success.content).forEach((key) => {
                  // console.log('key is', key, 'value is', success.content[key]);
                  if (self.isArray(success.content[key])) {
                    self.$set(self.domainObject, key, success.content[key]);
                  } else {
                    self.$set(self.domainObject, key, numtoStr(success.content[key]));
                  }
                });
                // console.log('domainObject is', self.domainObject);
                paramData.field.forEach((field) => {
                  field.extraParams.forEach((property) => {
                    if (!(property.field in self.domainObject)) {
                      if (property.default) {
                        self.$set(self.domainObject, property.field, property.default);
                      } else {
                        self.$set(self.domainObject, property.field, null);
                      }
                    }
                    len += 1;
                  });
                });
                self.fields = paramData.field;
                self.loading = false;
                document.addEventListener('loadEleDone', cb, false);
              }
            });
          } else {
            paramData.field.forEach((field) => {
              field.extraParams.forEach((property) => {
                if (property.default) {
                  self.$set(self.domainObject, property.field, property.default);
                } else {
                  self.$set(self.domainObject, property.field, null);
                }
                len += 1;
              });
            });
            self.fields = paramData.field;
            self.loading = false;
            document.addEventListener('loadEleDone', cb, false);
          }
        })
      );
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
  #pageRefresh {
    display: none;
  }
}
</style>
