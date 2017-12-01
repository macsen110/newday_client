<template>
  <div id="template">
    <!-- top -->
    <div class="topbar">
      <div class="inner">
        <span class="hotline fr"><i class="ico-tel"></i>24小时客服热线：<strong class="tel">021-20534899</strong></span>
        <a href="" class="wlqr"><i class="ico-qr"></i>关注融链<div class="qrbox"></div></a>
        <!-- <a href="app-down.html" class="wlapp"><i class="ico-phone"></i>下载APP</a> -->
      </div>
    </div>
    <!-- logreg page -->
    <div class="logreg">
      <!-- header -->
      <header class="header">
        <div class="inner clearfix">
          <h1 class="logo fl"><!-- <a href="index.html" title=""></a> --></h1>
        </div>
      </header>
      <!-- logreg -->
      <div class="logregfm">
        <div class="inner clearfix">
          <!-- register form -->
          <div class="regform">
            <div class="reghd clearfix">
              <h2 class="logtit fl">免费注册<em>FREE REGISTRATION</em></h2><p class="lognow fr">已有账号？直接去 <a href="/login/login.html">登录</a></p>
            </div>
            <div class="steps">
              <ul>
                <li class="step1 sibg">1、填写个人信息</li>
                <li class="step2 focus">2、填写公司信息</li>
                <li class="step3">3、注册成功</li>
              </ul>
            </div>
            <div class="regbd">
              <!-- register feedback -->
              <div class="reg-feedback clearfix">
                <!-- result 1 -->
                <div class="reg-result bg-green tc">
                  <i class="ico-success"></i>
                  <h3 class="reg-tit green">恭喜您，个人信息注册成功！</h3>
                </div>
                <!-- result 2 -->
                <div class="reg-result bg-org tc hide">
                  <i class="ico-info"></i>
                  <h3 class="reg-tit org">很抱歉，注册失败！</h3>
                </div>
                <!-- result 3 -->
                <div class="reg-result bg-red tc hide">
                  <i class="ico-error"></i>
                  <h3 class="reg-tit red">很抱歉，服务器内部错误！</h3>
                </div>
                <!-- join-section -->
                <div class="join-section">
                  <div id="orgWrap">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="reg-form formlist">
                      <el-form-item label="邀请码" prop="inviteCode">
                        <el-row>
                          <el-col :span="6">
                            <el-input v-model='ruleForm.inviteCode' placeholder="请输入邀请码" name="inviteCode"></el-input>
                          </el-col>
                          <el-col :span="18">
                            <span class="light">目前平台处于邀请试用阶段。如想体验，请拨打热线021-20534899，以获取邀请码！</span>
                          </el-col>
                        </el-row>
                      </el-form-item>
                      <el-form-item label="公司全称" prop="orgFullName">
                        <el-input v-model='ruleForm.orgFullName' placeholder="请输入工商局注册的公司全称" name="orgFullName"></el-input>
                      </el-form-item>
                      <!-- <el-form-item label="公司所在地区" class="is-required">
                        <el-row>
                          <el-col :span="6">
                            <el-form-item prop="province">
                              <el-select v-model="ruleForm.province" placeholder="请选择省" @change="provinceChange">
                                <el-option
                                  v-for="item in province"
                                  :key="item.id"
                                  :label="item.value"
                                  :value="item.id"
                                  name="province">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item prop="city">
                              <el-select v-model="ruleForm.city" placeholder="请选择市" @change="cityChange">
                                <el-option
                                  v-for="item in city"
                                  :key="item.id"
                                  :label="item.value"
                                  :value="item.id"
                                  name="city">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item prop="county">
                              <el-select v-model="ruleForm.county" placeholder="请选择区">
                                <el-option
                                  v-for="item in county"
                                  :key="item.id"
                                  :label="item.value"
                                  :value="item.id"
                                  name="county">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item prop="address">
                              <el-input v-model='ruleForm.address' placeholder="请输入详细地址" name="address"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-form-item> -->
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" :disabled="btnDisabled">提交注册信息</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <footer class="footer">
        <p>
            为了您可以更好的使用融链天下系统，请使用 Chrome或Firefox 浏览器<br>
            为了能够浏览或下载融链天下系统内的文档，您需要在浏览器设置中允许来自http://member.rltx.com 的弹出窗口。
        </p>
        <p class="copyright">
            &copy; Copyright 上海融链科技有限公司 rltx.com All Rights Reserved. <br> 沪ICP备15012288号
        </p>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">

  // import * as apiConst from '../../api/ApiConst';

  import * as registerService from '../../api/registerService';

  import * as DataSourceService from '../../api/DataSourceService';

  // import * as Utils from '../../api/Utils';

  // const axios = require('axios');

  export default {
    data() {
      const checkInviteCode = (rule, value, callback) => {
          const paramObj = {
            inviteCode: value
          };
          registerService.checkInviteCode(paramObj, (success, error) => {
            if (success) {
              const result = success.content.status;
              if (result === false) {
                callback(new Error('请输入正确的邀请码'));
              } else {
                callback();
              }
            }
            if (error) {
              console.log(error);
            }
          });
        },
        checkOrgName = (rule, value, callback) => {
          const paramObj = {
            'field': 'orgFullName',
            'value': value
          };
          registerService.checkOrgName(paramObj, (success, error) => {
            if (success) {
              const result = success.content.status;
              if (result === false) {
                callback(new Error('该公司已存在'));
              } else {
                callback();
              }
            }
            if (error) {
              console.log(error);
            }
          });
        };
      return {
        ruleForm: {
          inviteCode: '',
          orgFullName: ''
          // province: '',
          // city: '',
          // county: '',
          // address: '',
          // loginAccount: window.localStorage.loginAccount
        },
//         province: [],
//         city: [],
//         county: [],
        rules: {
          inviteCode: [
            { required: true, message: '请输入邀请码', trigger: 'blur' },
            { validator: checkInviteCode, trigger: 'blur' }
          ],
          orgFullName: [
            { required: true, message: '请输入公司全称', trigger: 'blur' },
            { min: 2, max: 50, message: '公司全称至少输入2个字，最多50个字', trigger: 'blur' },
            { validator: checkOrgName, trigger: 'blur' }
          ]
          // province: [
          //   { required: true, message: '请选择省', trigger: 'change', type: 'string' }
          // ],
          // city: [
          //   { required: true, message: '请选择市', trigger: 'change', type: 'string' }
          // ],
          // county: [
          //   { required: true, message: '请选择区', trigger: 'change', type: 'string' }
          // ],
          // address: [
          //   { required: true, message: '请输入详细地址', trigger: 'blur' }
          // ]
        },
        btnDisabled: false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnDisabled = true;
            registerService.addCompany(this.ruleForm, (success, error) => {
              if (success) {
                window.location.href = '/register/success.html';
                this.btnDisabled = false;
              }
              if (error) {
                this.btnDisabled = false;
                console.log(error);
              }
            });
          } else {
            return false;
          }
        });
      },
      provinceChange(item) {
        DataSourceService.city.getData({ keyword: item }, (dataSource) => {
          console.log(dataSource);
          this.city = dataSource;
        });
      },
      cityChange(item) {
        DataSourceService.county.getData({ keyword: item }, (dataSource) => {
          console.log(dataSource);
          this.county = dataSource;
        });
      }
    },
    created() {
      // DataSourceService.province('', (dataSource) => {
      //   this.province = dataSource;
      // });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
