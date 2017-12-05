/**
* detail.vue
* Created by cc on 17/11/6.
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
            <ele-block :field="field" :domainObject="domainObject" :inputKey="inputKey" :editable="field.editable" :uploadUrl="uploadUrl"></ele-block>
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
  import { edit, add, get } from '../../api/ChargeItemService';

  // 引入tab跳转
  require('../public.js');

  const axios = require('axios');

  export default {
    data() {
      return {
        objectName: '费用科目配置',
        domainObject: {},
        uploadUrl: `${ApiConst.apiPlatformDomain}`,
        logType: '',
        listUrl: '/chargeItem/list.html',
        listTitle: '费用科目配置列表',
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
      showEdit() {
        this.fields.forEach((val) => {
          if (val.fieldConfigCode === 'ownerOrgName' || val.fieldConfigCode === 'code') {
            val.editable = false;
          } else {
            val.editable = true;
          }
        });
      },
      showDetail() {
        this.fields.forEach((val) => {
          val.editable = false;
        });
      },
      editPage() {
        this.editable = true;
        this.showEdit();
      },
      cancelEdit() {
        this.resetForm('domainObject');
        this.editable = false;
        this.showDetail();
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
                  self.showDetail();
                }
              });
            } else {
              // const localStorage = window.localStorage,
              //   orgCode = JSON.parse(localStorage.getItem('userInfo')).orgCode;
              // self.$set(self.domainObject, 'ownerOrgCode', orgCode);
              console.log('domainObject is', self.domainObject);
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
                    showName: '公司名称',
                    fieldConfigCode: 'ownerOrgName',
                    elementCode: 'popSelectCompany',
                    extraParams: '{"field1":"ownerOrgName","field2":"ownerOrgCode","field3":"ownerOrgCode","placeholder1":"请选择公司", "inputKey1": "company.orgName", "inputKey2": "company.orgCode", "outputKey3": "company", "required": "true"}'
                  },
                  {
                    showName: '序号',
                    fieldConfigCode: 'sort',
                    elementCode: 'text',
                    extraParams: '{"field1": "sort", "required": "false"}'
                  },
                  {
                    showName: '科目名称',
                    fieldConfigCode: 'chargeItemName',
                    elementCode: 'text',
                    extraParams: '{"field1": "chargeItemName", "required": "true"}'
                  },
                  {
                    showName: '科目代码',
                    fieldConfigCode: 'code',
                    elementCode: 'text',
                    extraParams: '{"field1": "code", "required": "false"}'
                  },
                  {
                    showName: '状态',
                    fieldConfigCode: 'disabled',
                    elementCode: 'radio',
                    extraParams: '{"field1": "disabled","default1":"false","required":"false","detailLinkVisiable":"false","optionsValue1":["false","true"],"options1":["启用","禁用"]}'
                  },
                  {
                    showName: '数量单位',
                    fieldConfigCode: 'chargeItemNumberUnitCode',
                    elementCode: 'chargeItemNumber',
                    extraParams: '{"field1": "chargeItemNumberUnitCode", "field2": "chargeItemNumberUnitName", "required": "false","inputKey2": "chargeItemNumber.codeName", "outputKey1": "chargeItemNumber"}'
                  },
                  {
                    showName: '价格单位',
                    fieldConfigCode: 'chargeItemPriceUnitCode',
                    elementCode: 'chargeItemPrice',
                    extraParams: '{"field1": "chargeItemPriceUnitCode","field2": "chargeItemPriceUnitName", "required": "false","inputKey2": "chargeItemPrice.codeName", "outputKey1": "chargeItemPrice"}'
                  },
                  {
                    showName: '金额单位',
                    fieldConfigCode: 'chargeItemAmountsUnitCode',
                    elementCode: 'chargeItemAmount',
                    extraParams: '{"field1": "chargeItemAmountsUnitCode","field2": "chargeItemAmountsUnitName", "required": "false","inputKey2": "chargeItemAmount.codeName", "outputKey1": "chargeItemAmount"}'
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
                if (self.editable) {
                  if (field.fieldConfigCode === 'ownerOrgName' || field.fieldConfigCode === 'code') {
                    field.editable = false;
                  } else {
                    field.editable = true;
                  }
                } else {
                  field.editable = false;
                }
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
              field.editable = true;
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
    .tableImg {
      width: 146px;
      height: 146px;
      border: solid 1px #c0ccda;
      border-radius: 6px;
    }
  }
</style>
