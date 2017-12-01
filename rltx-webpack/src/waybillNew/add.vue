/**
* detail.vue
* Created by cc on 17/9/18.
*/

<template>
  <div class="layout">
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
      <div id="tmp-wrap">
        <div id="base" v-if="baseArrays.length > 0">
          <h2 class="tmp-title">基本信息</h2>
          <div class="el-row"></div>
        </div>
        <div id="transporter" v-if="transporterArrays.length > 0">
          <h2 class="tmp-title">运力信息</h2>
          <div class="el-row"></div>
        </div>
        <div id="loading" v-if="isEdit && loadingArrays.length > 0">
          <h2 class="tmp-title">装货信息</h2>
          <div class="el-row">
            <div class="el-col el-col-8" id="ld1"></div>
            <div class="el-col el-col-8" id="ld2"></div>
            <div class="el-col el-col-8" id="ld3"></div>
          </div>
        </div>
        <div id="unloading" v-if="isEdit && unloadingArrays.length > 0">
          <h2 class="tmp-title">卸货信息</h2>
          <div class="el-row">
            <div class="el-col el-col-8" id="uld1"></div>
            <div class="el-col el-col-8" id="uld2"></div>
            <div class="el-col el-col-8" id="uld3"></div>
          </div>
        </div>
      </div>
      <el-row v-loading.fullscreen.lock="loading" element-loading-text="加载中">
        <el-form :model="domainObject" ref="domainObject" label-width="140px" :inline="false">
          <el-col :span="8" v-for="field in fields" :key="field.fieldConfigCode" class="hide" :class="field.area" :id="field.fieldConfigCode">
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
    <cost-record :uploadUrl="uploadUrl" :domainObject="domainObject" :waybillCode="code" :getTotalAmount="getTotalAmount" :expressionArray="expressionArray" v-if="status"></cost-record>
  </div>
</template>

<script type="text/ecmascript-6">

  import eleBlock from '../components/ele-block/eleBlock.vue';
  import { getParamsFromURL, urlRedirect, getParam, NumtoStr as numtoStr } from '../../api/Utils';
  import * as classUtil from '../../api/classUtil';
  import ApiConst from '../../api/ApiConst';

  import costRecord from '../waybill/costRecord.vue';

  import * as waybillService from '../../api/waybillService';

  // 引入tab跳转
  require('../public.js');

  const axios = require('axios');

  export default {
    data() {
      return {
        objectName: '运单',
        domainObject: {},
        uploadUrl: `${ApiConst.apiWayBillDomain}`,
        logType: '',
        listUrl: '/waybill/list.html',
        listTitle: '运单列表',
        fields: [],
        isEdit: false, // 控制编辑添加按钮
        editable: false, // 控制页面状态
        loading: true,
        code: '',
        getData: {},
        btnDisabled: false,
        status: false,
        expressionArray: [],
        urlGoto: '',
        baseArrays: ['waybillNo', 'waybillStatus', 'settleStatus', 'meterageType', 'logisticsCode', 'clientOrg', 'route', 'rates', 'goodsName', 'goodsPrice', 'freightLoss', 'description', 'clientFreightPrice', 'driverPrice', 'loadingOrgName', 'unloadingOrgName', 'loadingArea', 'unloadingArea', 'loadingAddr', 'unloadingAddr', 'loadingUserFullName', 'unloadingUserFullName', 'loadingUserPhone', 'unloadingUserPhone'],
        transporterArrays: ['truckLicenseNo', 'truckPowerType', 'trailerTruckLicenseNo', 'driverFullName', 'driverPhone', 'viceDriverName', 'viceDriverPhone'],
        loadingArrays: [['loadingGoodsWeight', 'loadingGoodsVolume', 'loadingGoodsNum'], ['loadingTime', 'departDate', 'departMileage'], ['loadingAttachment']],
        unloadingArrays: [['unloadingGoodsWeight', 'unloadingGoodsVolume', 'unloadingGoodsNum'], ['unloadingTime', 'returnDate', 'returnMileage'], ['unloadingAttachment']]
      };
    },
    components: {
      'ele-block': eleBlock,
      'cost-record': costRecord
    },
    methods: {
      getTotalAmount(waybillCode, domainObject, tableDate) {
        // 获取运费总金额
        waybillService.getTotalAmount(waybillCode, domainObject, tableDate, (res) => {
          this.expressionArray = res.content;
          // console.log('expressionArray: ', this.expressionArray);
        });
      },
      loadFinish() {
//        console.log('load finish');
        const keys = Object.keys(window.rns),
          baseWrap = document.querySelector('#base .el-row'),
          transporterWrap = document.querySelector('#transporter .el-row'),
          tmpWrap = document.querySelector('#tmp-wrap'),
          params = getParamsFromURL(window.location.search);
        this.urlGoto = params.goto;
        let url = window.location;
//        console.log(keys);
        keys.forEach((key) => {
//          console.log(key);
          window.rns[key].init();
        });
        // base section
        if (this.baseArrays.length > 0) {
          this.baseArrays.forEach((value) => {
            if (document.querySelector(`#${value}`)) {
              baseWrap.appendChild(document.querySelector(`#${value}`));
            }
          });
          tmpWrap.appendChild(document.querySelector('#base'));
        }
        // transporter section
        if (this.transporterArrays.length > 0) {
          this.transporterArrays.forEach((value) => {
            transporterWrap.appendChild(document.querySelector(`#${value}`));
          });
          tmpWrap.appendChild(document.querySelector('#transporter'));
        }
        // loading section
        if (this.isEdit && this.loadingArrays.length > 0) {
          this.loadingArrays.forEach((value, index) => {
            if (value.length > 0) {
              value.forEach((val) => {
                document.querySelector(`#ld${index + 1}`).appendChild(document.querySelector(`#${val}`));
              });
            }
          });
          tmpWrap.appendChild(document.querySelector('#loading'));
        }
        // unloading section
        if (this.isEdit && this.unloadingArrays.length > 0) {
          this.unloadingArrays.forEach((value, index) => {
            if (value.length > 0) {
              value.forEach((val) => {
                document.querySelector(`#uld${index + 1}`).appendChild(document.querySelector(`#${val}`));
              });
            }
          });
          tmpWrap.appendChild(document.querySelector('#unloading'));
        }
        if (this.urlGoto) {
          url += `#${this.urlGoto}`;
          window.location = url;
        }
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
              waybillService.edit(this.code, this.domainObject, (success, error) => {
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
              waybillService.add(this.domainObject, (success, error) => {
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
            classUtil.removeClass(uploadCard, 'hide');
          }
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
        waybillUrl = ApiConst.apiWayBillDomain,
        configUrl = `${waybillUrl}/detail_render_info/waybill/list`,
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
          /* eslint-disable no-useless-escape */
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
            self.status = true;
            self.isEdit = true;
            self.editable = urlEditable === 'true';
            waybillService.get(paramObj, (success) => {
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
  #tmp-wrap {
    .hide {
      display: block !important;
    }
    .avatar-uploader {
      .hide {
        display: none !important;
      }
    }
    .el-col-8 {
      .el-col-8 {
        width: 100%;
      }
    }
  }
  .form-page {
    .el-row .el-col-12:nth-child(6n), .el-row .el-col-12:nth-child(6n-1) {
      margin-bottom: 0;
      border-bottom: 0;
    }
    .tableImg {
      width: 146px;
      height: 146px;
      border: solid 1px #c0ccda;
      border-radius: 6px;
    }
  }
  .el-table {
    .el-input {
      width: 100px;
      margin-right: 5px;
    }
  }
  @media (max-width: 1366px) {
    .form-page {
      .tmp-title {
        margin: 20px 10px 10px;
      }
      .el-row {
        padding: 10px;
      }
      .el-form-item__label {
        width: 100px !important;
        font-size: 13px;
      }
      .el-form-item__content {
        margin-left: 100px !important;
        .el-form-item__content {
          margin-left: 0 !important;
        }
      }
      .el-textarea__inner {
        min-width: auto;
      }
      .complex-control-2 {
        .el-input {
          width: 150px;
        }
        .el-select {
          width: 82px;
          .el-input {
            width: 94px;
          }
        }
      }
      .selectArea {
        .el-select {
          width: 82px;
        }
      }
      #freightLoss {
        .complex-control-3 {
          .innerblock {
            margin-right: 5px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
        .el-radio__label {
          font-size: 12px;
          padding-left: 0;
        }
        .el-radio+.el-radio {
          margin-left: 3px;
        }
        .el-select, .goodsLoss {
          width: 71px;
        }
      }
    }
  }
</style>
