<template>
  <div id="template" class="form-page">
    <div class="page-header clearfix">
      <h2 class="page-title fl">审核</h2>
    </div>
    <el-row v-loading.fullscreen.lock="loading" element-loading-text="加载中">
      <el-form :model="domainObject" ref="domainObject" label-width="140px" :inline="false">
        <el-col :span="12" v-for="field in fields" :key="field.fieldConfigCode" :class="field.area">
          <el-form-item :label="field.showName" :required="field.required ==='true'">
            <ele-block :field="field" :domainObject="domainObject" :inputKey="inputKey" :editable="editable" :uploadUrl="uploadUrl"></ele-block>
          </el-form-item>
        </el-col>
        <h3 class="tit" v-if="imgData.length > 0">图片附件</h3>
        <div class="img-wrap" v-if="imgData.length > 0">
          <ul class="img-list">
            <li v-for="item in imgData">
              <img :src="item.src" alt="" class="img">
              <span class="img-name">{{item.name}}</span>
            </li>
          </ul>
        </div>
        <el-col :span="24" v-show='isEdit' class="el-col-button">
          <el-form-item v-show="!loading">
            <el-button @click="dialogFormVisible = true" size="large" :disabled="btnDisabled">审核不通过</el-button>
            <el-button type="primary" @click="handleApprovalSuccess()" size="large" :disabled="btnDisabled">审核通过</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-dialog title="审核不通过" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="审核不通过原因">
          <el-input type="textarea" v-model="form.failReason" placeholder="请输入内容" :rows="10" :autosize="{ minRows: 10 }"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleApprovalFail()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable object-shorthand */

  import eleBlock from '../../components/ele-block/eleBlock.vue';
  import ApiConst from '../../../api/ApiConst';
  import * as utils from '../../../api/Utils';
  import { certPersonDetail, certPersonInfo, certPersonApproval, getImage } from '../../../api/PlatformService';

  // 引入tab跳转
  require('../../public.js');

  export default {
    components: {
      'ele-block': eleBlock
    },
    data() {
      return {
        domainObject: {},
        imgData: [],
        uploadUrl: ApiConst.apiPlatformDomain,
        fields: [],
        isEdit: false,
        editable: false, // 控制页面状态
        loading: true,
        code: '',
        btnDisabled: false,
        dialogFormVisible: false,
        form: {
          failReason: ''
        }
      };
    },
    methods: {
      loadFinish() {
        const keys = Object.keys(window.rns);
        keys.forEach((key) => {
          window.rns[key].init();
        });
      },
      isArray(val) {
        if (typeof Array.isArray === 'function') {
          return Array.isArray(val);
        }
        return Object.prototype.toString.call(val) === '[object Array]';
      },
      handleApprovalSuccess() {
        certPersonApproval(this.code, { certStatus: 'authenticated' }, (success, error) => {
          if (error || success.code !== 200) {
            this.$message({
              type: 'error',
              message: error.content,
              duration: 5000
            });
            this.btnDisabled = false;
            return false;
          }
          if (success) {
            this.$message({
              type: 'success',
              message: '提交成功',
              duration: 1000
            });
            this.btnDisabled = true;
            this.isEdit = false;
          }
        });
      },
      handleApprovalFail() {
        certPersonApproval(this.code, { certStatus: 'failed', failReason: this.form.failReason }, (success, error) => {
          if (error || success.code !== 200) {
            this.$message({
              type: 'error',
              message: error.content,
              duration: 5000
            });
            this.btnDisabled = false;
            this.dialogFormVisible = false;
            return false;
          }
          if (success) {
            this.$message({
              type: 'success',
              message: '提交成功',
              duration: 1000
            });
            this.btnDisabled = true;
            this.isEdit = false;
            this.dialogFormVisible = false;
          }
        });
      }
    },
    created() {
      document.addEventListener('loadDone', this.loadFinish, false);
      const self = this,
        params = utils.getParamsFromURL(window.location.search),
        urlCode = params.code,
        localStorage = window.localStorage,
        eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
      certPersonDetail((eleConfig) => {
        const paramData = utils.getParam(eleConfig, eleDefine, eleInfo);
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
        if (urlCode) {
          const paramObj = {
            code: urlCode
          };
          self.code = urlCode;
          certPersonInfo(paramObj, (success, error) => {
            if (error) {
              self.loading = false;
              self.$message({
                type: 'error',
                message: error.content,
                duration: 5000
              });
            }
            if (success) {
              if (!success.content.code) {
                self.loading = false;
                self.$message({
                  type: 'error',
                  message: '记录不存在',
                  duration: 5000
                });
                return;
              }
              if (success.content.certStatus === 'authenticating') {
                this.isEdit = true;
              }
              if (!self.code && success.content.code) {
                self.code = success.content.code;
              }
              Object.keys(success.content).forEach((key) => {
                if (self.isArray(success.content[key])) {
                  self.$set(self.domainObject, key, success.content[key]);
                } else {
                  self.$set(self.domainObject, key, utils.NumtoStr(success.content[key]));
                }
              });
              // success.content.platformCertPersonAttachmentInfoList.forEach((img) => {
              //   switch (img.attachmentName) {
              //     case '身份证正面': self.$set(self.domainObject, 'id1ResourceCode', img.attachmentResourceCode); break;
              //     case '身份证反面': self.$set(self.domainObject, 'id2ResourceCode', img.attachmentResourceCode); break;
              //     case '驾驶证': self.$set(self.domainObject, 'driverLicenseCode', img.attachmentResourceCode); break;
              //     case '营运从业资格证': self.$set(self.domainObject, 'operateLicenseCode', img.attachmentResourceCode); break;
              //     case '危险货物运输从业资格证': self.$set(self.domainObject, 'dangerousTransportLicenseCode', img.attachmentResourceCode); break;
              //     default: break;
              //   }
              // });
              // 图片数据
              const attachmentList = success.content.platformCertPersonAttachmentInfoList;
              if (attachmentList.length > 0) {
                attachmentList.forEach((val) => {
                  const imgObj = {};
                  imgObj.name = val.attachmentName;
                  getImage(val.attachmentResourceCode, {}, (result) => {
                    if (result && result.content.thumbnailList.length > 0) {
                      imgObj.src = result.content.thumbnailList[0].url;
                      this.imgData.push(imgObj);
                    }
                  });
                  // console.log('imgObj is', imgObj);
                });
              }
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
      });
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/sass/base.scss";
  .form-page {
    .tit {
      clear: both;
      padding: 10px;
      font-size: 14px;
      font-weight: 700;
      background-color: #f9fafc;
    }
    .img-list {
      font-size: 0;
      li {
        display: inline-block;
        width: 148px;
        padding: 20px;
        font-size: 14px;
        text-align: center;
        line-height: 1.5;
      }
    }
    .img {
      width: 146px;
      height: 146px;
      border: solid 1px #c0ccda;
      border-radius: 6px;
    }
  }
</style>
