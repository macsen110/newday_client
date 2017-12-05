<template>
<div class="container new-frame clearfix">
    <div class="innerwp">
        <div class="company-cert" id="company_safe_cert">
            <div class="uchd">
                <div class="mwhd clearfix">
                    <span class="fr"></span>
                    <h2 class="mwtit">公司认证 </h2>
                </div>
            </div>
            <div class="uc-tablist">
                <div class="uc-main">
                    <div class="compverify">
                        <div class="copmp-hd clearfix">
                            <h3 class="comptit fl">认证情况</h3>
                            <span class="v-status" v-if="certStatus === 'unauthenticated'">
                              未认证
                            </span>
                            <span class="v-status" v-if="certStatus === 'authenticating'">
                              认证中
                            </span>
                            <span class="v-status" v-if="certStatus === 'authenticated'">
                              认证成功
                            </span>
                            <span class="v-status" v-if="certStatus === 'failed'">
                              认证失败
                            </span>
                        </div>
                        <div class="verify unverify" id="upload_img_">
                            <div>
                              <form id="form1" data-changed="false" class="certificate">
                                <div class="editinfo pr">
                                <h4 class="verbgtit">公司资料</h4>
                                <ul class="formlist" id="edit_org_form1">
                                  <li>
                                    <label for="" class="fmtit">公司名称：<span class="ftorange">*</span></label>
                                    <div class="fmcont">
                                      <div class="pr">
                                        <input type="text" :disabled="verifyStatus" class="txtbox br3" name="orgName" v-model="orgName">
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <label for="" class="fmtit">公司全称：<span class="ftorange">*</span></label>
                                    <div class="fmcont">
                                      <div class="pr">
                                        <input type="text" :disabled="verifyStatus" class="txtbox br3" name="loginName" v-model="orgFullName">
                                      </div>
                                      <span class="ml20">注：请输入工商局登记的完整企业名称</span>
                                    </div>
                                  </li>
                                </ul>
                                </div>
                              </form>
                              <div class="uploadcerti compcerti pr">
                                <h4 class="verbgtit pa" style="line-height:49px;">营业执照</h4>
                                <ul class="formlist">
                                  <li>
                                    <div>
                                      <p style="margin-top:30px;">发证时间:</p>
                                        <el-date-picker v-model="value1" :disabled="verifyStatus" id="timeStart" type="date" :picker-options="pickerOption1" placeholder="选择日期"></el-date-picker>
                                      <p>截止时间:</p>
                                        <el-date-picker v-model="value2" :disabled="verifyStatus" id="timeEnd" type="date" :picker-options="pickerOption2" placeholder="选择日期"></el-date-picker>
                                    </div>
                                    <div class="avatar-uploader-box">
                                      <el-upload
                                        class="avatar-uploader"
                                        :action=actionUrl
                                        :show-file-list="false"
                                        with-credentials
                                        :data=actionParams
                                        :disabled="verifyStatus"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                      </el-upload>
                                      <p style="margin: -20px 0 0 10px;">请上传jpg,png或者gif图片</p>
                                    </div>
                                  </li>
                                </ul>
                                <p class="fmnoti" v-if="certStatus === 'unauthenticated'">
                                  <span class="btn-a-blue fr">
                                    <button href="javascript:void(0);" class="br3 submit-btn" :disabled="isDisabled" @click="verify()" title="提交公司认证">提交公司认证</button>
                                  </span>
                                </p>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  
</template>

<style>
  @import './verify.css';

  #fmtit1{
    text-align: left;
  }

  .submit-btn {
    padding: 0 12px;
    height: 26px;
    line-height: 26px;
    color: #fff;
    border: 0;
  }

  .submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .avatar {
    width: 150px;
    height: 150px;
  }
</style>

<script>
  import * as apiConst from '../../api/ApiConst';
  // import * as Utils from '../../api/Utils';
  import * as HTTP from '../../api/httpUtil';

  const axios = require('axios');

  axios.defaults.withCredentials = true;

  export default {
    data() {
      const self = this;
      return {
        imageUrl: '',
        actionUrl: `${apiConst.apiOrgDomain}/fw/image/update`,
        actionParams: {
          type: 'certWeb',
          premission: false
        },
        attachmentName: '',
        attachmentIssuanceDate: '',
        attachmentExpirationDate: '',
        certStatus: '',
        params: {},
        orgFullName: '',
        orgName: '',
        pickerOption1: {
          disabledDate(date) {
            // console.log('结束日期', value2);
            return date.getTime() > new Date(self.value2).getTime();
          }
        },
        pickerOption2: {
          disabledDate(date) {
            // console.log('开始日期', value1);
            return date.getTime() < new Date(self.value1).getTime();
          }
        },
        value1: '',
        value2: '',
        isDisabled: false,
        verifyStatus: false
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(res);
        if (res.code === 200) {
          this.$message({
            message: '营业证书上传成功',
            type: 'success'
          });
          this.params.CertResourceCode = res.content.resourceCode;
          this.imageUrl = URL.createObjectURL(file.raw);
        }
      },
      beforeAvatarUpload(file) {
        const isType = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png',
          isLt3M = file.size / 1024 / 1024 < 3;
        if (!isType) {
          this.$message.error('上传头像图片仅限JPG、GIF、PNG格式!');
        }
        if (!isLt3M) {
          this.$message.error('上传头像图片大小不能超过 3MB!');
        }
        return isType && isLt3M;
      },
      verify() {
        this.isDisabled = true;
        const url = `${apiConst.apiOrgDomain}/org/verify`,
          params = {
            orgName: this.orgName,
            orgFullName: this.orgFullName,
            attachmentResourceCode: this.params.CertResourceCode,
            attachmentIssuanceDate: this.value1,
            attachmentExpirationDate: this.value2
          };
        HTTP.post(url, params, (res) => {
          if (res.code === 200) {
            this.$message({
              message: '认证中',
              type: 'success'
            });
            this.isDisabled = false;
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        });
      }
    },
    mounted() {
      HTTP.get(`${apiConst.apiOrgDomain}/org/self`, {}, (success, error) => {
        if (success && success.content) {
          this.orgFullName = success.content.orgFullName;
          this.orgName = success.content.orgName;
          this.certStatus = success.content.certStatus;
          this.verifyStatus = this.certStatus !== 'unauthenticated';
        }
        if (error) {
          console.error(error);
        }
      });
      HTTP.get(`${apiConst.apiOrgDomain}/org/att_list`, {}, (success) => {
        if (success.content && success.content.length > 0) {
          console.log(success);
          const verifyCode = success.content[0].attachmentResourceCode;
          this.value1 = success.content[0].attachmentIssuanceDate;
          this.value2 = success.content[0].attachmentExpirationDate;
          this.params.CertResourceCode = success.content[0].attachmentResourceCode;
          // 获取运营证书地址
          HTTP.get(`${apiConst.apiOrgDomain}/fw/image/${verifyCode}/get`, {}, (suc) => {
            if (suc.content.thumbnailList && suc.content.thumbnailList.length > 0) {
              this.imageUrl = suc.content.thumbnailList[0].url;
            }
          });
        }
      });
    }
  };
</script>
