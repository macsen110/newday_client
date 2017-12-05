/**
* detail.vue
* Created by cc on 17/10/20.
*/

<template>
  <div id="template" class="form-page">
    <div class="page-header clearfix">
      <h2 class="page-title fl">
        {{ isEdit ? ( editable ? '编辑' + objectName : objectName + '详情' ): ( '新建' + objectName) }}
      </h2>
      <!-- <span class="page-refresh fr" id="pageRefresh">
        <i class="ico-refresh"></i>刷新
      </span> -->
      <div class="hd-opr fr">
        <el-button type="primary" v-show="!editable && isEdit" @click="editPage()">编辑</el-button>
        <el-button v-show="editable && isEdit" @click="cancelEdit()">取消编辑</el-button>
        <el-button v-show="!editable && isEdit" @click="changeLog()">{{ objectName }}变更记录</el-button>
      </div>
    </div>
    <div id="tmp-wrap"></div>
    <el-row v-loading.fullscreen.lock="loading" element-loading-text="加载中">
      <el-form :model="domainObject" ref="domainObject" label-width="140px" :inline="false">
        <el-col :span="12" v-for="field in fields" :key="field.fieldConfigCode" :class="field.area">
          <el-form-item :label="field.showName" :required="field.required ==='true'">
            <ele-block :field="field" :domainObject="domainObject" :inputKey="inputKey" :editable="editable" :uploadUrl="uploadUrl"></ele-block>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-show='editable || !isEdit' class="el-col-button">
          <el-form-item v-show="!loading">
            <el-button type="primary" @click="submitForm('domainObject')" size="large" :disabled="btnDisabled">提交</el-button>
            <el-button @click="resetForm('domainObject')" size="large">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">

  import eleBlock from '../components/ele-block/eleBlock.vue';
  import { urlRedirect, getParamsFromURL, getParam, NumtoStr as numtoStr } from '../../api/Utils';
  import { removeClass } from '../../api/classUtil';
  import ApiConst from '../../api/ApiConst';
  import { edit, add, get } from '../../api/OrgManagementService';

  // 引入tab跳转
  require('../public.js');

  const axios = require('axios');

  export default {
    data() {
      return {
        objectName: '组织管理',
        domainObject: {},
        uploadUrl: `${ApiConst.apiPlatformDomain}`,
        logType: '',
        listUrl: '/orgManagement/list.html',
        listTitle: '组织管理列表',
        fields: [],
        isEdit: false, // 控制编辑添加按钮
        editable: false, // 控制页面状态
        loading: true,
        code: '',
        getData: {},
        btnDisabled: false
      };
    },
    components: {
      'ele-block': eleBlock
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
            if (this.isEdit) {
              edit(this.code, this.domainObject, (success, error) => {
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
                }
              });
            } else {
              // console.log('domainObject is', self.domainObject);
              add(this.domainObject, (success, error) => {
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
                  self.resetForm(formName);
                  self.btnDisabled = false;
                  this.$confirm(`恭喜您,新建${this.objectName}成功！ 是否继续新建${this.objectName}?`, '提示', {
                    confirmButtonText: '继续新建',
                    cancelButtonText: `返回${this.objectName}列表`,
                    type: 'success',
                    customClass: 'confirm-dialog'
                  }).then(() => {
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
        if (document.querySelectorAll('.avatar-uploader').length > 0) {
          document.querySelectorAll('.avatar-uploader').forEach((val) => {
            const imglist = val.querySelector('.el-upload-list').querySelectorAll('li'),
              uploadCard = val.querySelector('.el-upload--picture-card');
            if (imglist.length > 0) {
              val.querySelector('.el-upload-list').innerHTML = '';
              removeClass(uploadCard, 'hide');
            }
          });
        }
        this.$refs[formName].resetFields();
      }
    },
    created() {
      document.addEventListener('loadDone', this.loadFinish, false);

      const self = this,
        params = getParamsFromURL(window.location.search),
        urlCode = params.code,
        urlEditable = params.editable,
        orgConfigUrl = ApiConst.apiOrgConfigDomain,
        // 获取element type deine
        defineUrl = `${orgConfigUrl}/element_type/define`,
        // 获取element type info
        typeUrl = `${orgConfigUrl}/element_type/info`;
      // console.log(this.configUrl);
      function elementDefine() {
        return axios({
          method: 'get',
          url: defineUrl,
          headers: { 'Accept': 'application/json' }
        });
      }
      function elementInfo() {
        return axios({
          method: 'get',
          url: typeUrl,
          headers: { 'Accept': 'application/json' }
        });
      }
      //   先从partnerConfig拿到数据，然后根据拿到的elementCode匹配element_type_define里面的组合信息，然后再到element_type_info里面拿到对应的数据
      axios.all([elementDefine(), elementInfo()])
        .then(axios.spread((eleDefine, eleInfo) => {
          const eleConfig = {
              code: 200,
              data: {
                content: [
                  {
                    showName: '组织名称',
                    fieldConfigCode: 'orgFullName',
                    elementCode: 'text',
                    extraParams: '{"field1": "orgFullName", "detailLinkVisiable": "true", "required": "true"}'
                  },
                  {
                    showName: '营业执照',
                    fieldConfigCode: 'businessLicenseResourceCode',
                    elementCode: 'image',
                    extraParams: '{"field1": "businessLicenseResourceCode", "required": "true"}'
                  },
                  {
                    showName: '法人',
                    fieldConfigCode: 'legalPerson',
                    elementCode: 'text',
                    extraParams: '{"field1": "legalPerson", "required": "false"}'
                  },
                  {
                    showName: '身份证照片',
                    fieldConfigCode: 'idNumberResourceCode',
                    elementCode: 'image',
                    extraParams: '{"field1": "idNumberResourceCode", "required": "false"}'
                  },
                  {
                    showName: '法人联系电话',
                    fieldConfigCode: 'legalPersonPhone',
                    elementCode: 'text',
                    extraParams: '{"field1": "legalPersonPhone", "required": "false"}'
                  },
                  {
                    showName: '组织联系人',
                    fieldConfigCode: 'personFullName',
                    elementCode: 'text',
                    extraParams: '{"field1": "personFullName", "required": "false"}'
                  },
                  {
                    showName: '组织联系人手机号',
                    fieldConfigCode: 'personPhone',
                    elementCode: 'text',
                    extraParams: '{"field1": "personPhone", "required": "false"}'
                  },
                  {
                    showName: '运输类型',
                    fieldConfigCode: 'transportType',
                    elementCode: 'select',
                    extraParams: '{"field1": "transportType", "required": "false","placeholder1":"请选择运输类型","optionsValue1":["long_distance","short_distance"],"options1":["长途运输","短途运输"]}'
                  },
                  // {
                  //   showName: '状态',
                  //   fieldConfigCode: 'certStatus',
                  //   elementCode: 'select',
                  //   extraParams: '{"field1": "certStatus","required": "false","placeholder1":"请选择认证状态","optionsValue1":["unauthenticated","authenticating","authenticated","failed"],"options1":["未认证","认证中","认证成功","认证失败"]}'
                  // },
                  {
                    showName: '开户行',
                    fieldConfigCode: 'bankName',
                    elementCode: 'text',
                    extraParams: '{"field1": "bankName", "required": "false"}'
                  },
                  {
                    showName: '银行户名',
                    fieldConfigCode: 'bankAccountName',
                    elementCode: 'text',
                    extraParams: '{"field1": "bankAccountName", "required": "false"}'
                  },
                  {
                    showName: '银行账号',
                    fieldConfigCode: 'bankAccountNo',
                    elementCode: 'text',
                    extraParams: '{"field1": "bankAccountNo", "required": "false"}'
                  }
                ]
              }
            },
            paramData = getParam(eleConfig, eleDefine, eleInfo);
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
            self.editable = urlEditable === 'true';
            get(paramObj, (success) => {
              if (!self.code && success.content.code) {
                self.code = success.content.code;
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
            self.editable = true;
            document.addEventListener('loadEleDone', cb, false);
          }
        })
      );
    },
    mounted() {
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/base.scss";
  .form-page {
    .el-row .el-col {
      height: auto;
    }
  }
</style>
