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

<script type="text/ecmascript-6">
import eleBlock from '../components/ele-block/eleBlock.vue';
import * as PersonBankAccountService from '../../api/PersonBankAccountService';
import detailLayout from '../layout/detail/detailLayout.vue';
import layout from './account-layout.vue';
import * as ApiConst from '../../api/ApiConst';
import { initForEdit, initForAdd } from '../common/formHelper';
import { removeClass } from '../../api/classUtil';
import { getParamsFromURL, urlRedirect } from '../../api/Utils';

export default {
  name: 'account-add',
  components: {
    eleBlock,
    'detailLayout': detailLayout,
    layout
  },
  data() {
    return {
      objectName: '银行账户',
      configUrl: '',
      domainObject: {},
      editable: true,
      isEdit: false,
      btnDisabled: false,
      fieldConfig: Array,
      fields: Array,
      inputKey: Array,
      addFun: PersonBankAccountService.add,
      editFun: PersonBankAccountService.edit,
      getInfo: PersonBankAccountService.get,
      uploadUrl: ApiConst.apiPersonDomain,
      logType: 'driver-account',
      listUrl: '/driver/account-list.html',
      listTitle: '司机银行账号管理'
    };
  },
  methods: {
    loadFinish() {
      const keys = Object.keys(window.rns);
      keys.forEach((key) => {
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
            // this.domainObject.personCode =
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
    const driverUrl = ApiConst.apiPersonDomain,
      self = this,
      params = getParamsFromURL(window.location.search),
      urlCode = params.code,
      personCode = params.personCode,
      urlEditable = params.editable,
      configUrl = `${driverUrl}/detail_render_info/driver/list`;
    let eleInitCounter = 0;
    this.configUrl = configUrl;

    function initEleCallback() {
      eleInitCounter += 1;
      if (eleInitCounter === self.fieldCount) {
        const event = new Event('loadDone');
        document.dispatchEvent(event);
      }
    }

    function initCallback(fieldConfig, fieldCount) {
      self.fieldCount = fieldCount;
      document.addEventListener('loadEleDone', initEleCallback, false);
      self.inputKey = fieldConfig.inputKey;
      // self.fields = fieldConfig.field;

      self.fields = [{
        'elementCode': 'text',
        'showName': '银行账户姓名',
        'detailLinkVisiable': 'true',
        'fieldConfigCode': 'bankAccountName',
        'extraParams': [{
          'controlType': 'text',
          'field': 'bankAccountName',
          'value': ''
        }]
      }, {
        'elementCode': 'text',
        'showName': '开户行',
        'detailLinkVisiable': 'true',
        'fieldConfigCode': 'bankName',
        'extraParams': [{
          'controlType': 'text',
          'field': 'bankName',
          'value': ''
        }]
      }, {
        'elementCode': 'text',
        'showName': '银行账号',
        'detailLinkVisiable': 'true',
        'fieldConfigCode': 'bankAccountNo',
        'extraParams': [{
          'controlType': 'text',
          'field': 'bankAccountNo',
          'value': ''
        }]
      }, {
        'elementCode': 'text',
        'showName': '描述',
        'detailLinkVisiable': 'true',
        'fieldConfigCode': 'description',
        'extraParams': [{
          'controlType': 'text',
          'field': 'description',
          'value': ''
        }]
      }];
    }
    this.editable = urlEditable !== 'false';
    // self.domainObject.personCode = params.personCode;
    if (urlCode) {
      self.isEdit = true;
      this.getInfo({
        code: urlCode
      }, (success, error) => {
        if (error) {
          self.$message({
            type: 'error',
            message: error.content,
            duration: 5000
          });
        } else {
          if (!self.code && success.content.code) {
            self.code = success.content.code;
          }
          initForEdit(self, self.domainObject, self.configUrl, success.content, initCallback);
        }
      });
    } else {
      if (personCode) {
        self.domainObject.personCode = personCode;
      }
      console.log('initForAdd');
      initForAdd(self, self.domainObject, self.configUrl, initCallback);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
