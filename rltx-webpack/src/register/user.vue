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
                <li class="step1 focus">1、填写个人信息</li>
                <li class="step2">2、填写公司信息</li>
                <li class="step3">3、注册成功</li>
              </ul>
            </div>
            <div class="regbd">
              <div id="userForm">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="reg-form formlist">
                  <el-form-item label="手机号" prop="loginAccount">
                    <el-row>
                      <el-col :span="9">
                        <el-input v-model='ruleForm.loginAccount' placeholder="请输入手机号码" name="loginAccount" id="loginAccount"></el-input>
                      </el-col>
                      <el-col :span="15">
                        <el-button type="primary" @click="getCode()" v-if="isShow===true" id="getValiCode" :disabled="isDisable">获取验证码</el-button>
                        <el-button type="default" disabled v-if="isShow===false">还剩<strong id="number" class="org">60</strong>秒</el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="验证码" prop="verifyCode">
                    <el-input v-model='ruleForm.verifyCode' placeholder="请输入验证码" name="verifyCode" id="verifyCode"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-row>
                      <el-col :span="9">
                        <input type="text" v-model='username' class="fake-input">
                        <el-input type="password" v-model='ruleForm.password' placeholder="密码应该在6-20位字符之间" @keyup.native="checkPwd()" name="regPassword" id="regPassword"></el-input>
                      </el-col>
                      <el-col :span="15">
                        <span class="pwdlevel level-weak" v-if="weak">
                          <i class="level pass"></i>
                          <i class="level"></i>
                          <i class="level"></i>
                          <strong class="strength">弱</strong>
                        </span>
                        <span class="pwdlevel level-centre" v-if="centre">
                          <i class="level pass"></i>
                          <i class="level pass"></i>
                          <i class="level"></i>
                          <strong class="strength">中</strong>
                        </span>
                        <span class="pwdlevel level-strong" v-if="strong">
                          <i class="level pass"></i>
                          <i class="level pass"></i>
                          <i class="level pass"></i>
                          <strong class="strength">强</strong>
                        </span>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="password2">
                    <el-input type="password" v-model='ruleForm.password2' placeholder="再次确认密码" name="regPassword2" id="regPassword2"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" :disabled="btnDisabled">提交并注册</el-button>
                  </el-form-item>
                </el-form>
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

  // import * as Utils from '../../api/Utils';

  // const axios = require('axios');

  export default {
    data() {
      const comparePass = (rule, value, callback) => {
          if (value !== this.ruleForm.password) {
            callback(new Error('两次输入的密码不一致'));
          } else {
            callback();
          }
        },
        checkPhone = (rule, value, callback) => {
          const reg = /^1\d{10}$/;
          if (value.length === 11) {
            if (reg.test(value) === false) {
              callback(new Error('请输入正确的手机号'));
              this.isDisable = true;
            } else {
              const paramObj = {
                loginAccount: value
              };
              // console.log(this.isPhone);
              registerService.checkUser(paramObj, (success) => {
                if (success) {
                  callback();
                  this.isDisable = false;
                  this.username = this.ruleForm.loginAccount;
                } else {
                  // callback(new Error(error.content));
                  callback(new Error('帐号已存在，请直接登录'));
                }
              });
            }
          } else {
            // callback(new Error('请输入正确的手机号'));
            this.isDisable = true;
          }
        },
        checkValicode = (rule, value, callback) => {
          const phoneNumber = this.ruleForm.loginAccount,
            paramObj = {
              mobilePhone: phoneNumber,
              verificationCode: value
            };
          registerService.checkValiCode(paramObj, (success, error) => {
            if (success) {
              const result = success.content.status;
              if (result === false) {
                callback(new Error('请输入正确的验证码'));
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
          loginAccount: '',
          verifyCode: '',
          password: '',
          password2: ''
        },
        rules: {
          loginAccount: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkPhone, trigger: 'change' },
            { validator: checkPhone, trigger: 'blur' }
          ],
          verifyCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { validator: checkValicode, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码应该在6-20位字符之间', trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            { validator: comparePass, trigger: 'blur' }
          ]
        },
        username: '',
        isShow: true,
        isDisable: true,
        weak: false,
        centre: false,
        strong: false,
        btnDisabled: false
      };
    },
    methods: {
      getCode() {
        const loginAccount = this.ruleForm.loginAccount;
        if (loginAccount) {
          this.isDisable = true;
          this.isShow = false;
          this.timeCount(60);
          const paramObj = {
            mobilePhone: loginAccount
          };
          registerService.getValiCode(paramObj, (success, error) => {
            if (error || success.code !== 200) {
              this.$message({
                type: 'error',
                message: error.content || '验证码发送失败',
                duration: 5000
              });
              return false;
            }
            if (success) {
              console.log('success');
            }
          });
        } else {
          return false;
        }
      },
      timeCount(time) {
        window.setTimeout(() => {
          let t = time;
          t -= 1;
          if (t === 0) {
            this.isShow = true;
            if (this.ruleForm.loginAccount) {
              this.isDisable = false;
            }
          } else {
            document.querySelector('#number').innerHTML = t;
            this.timeCount(t);
          }
        }, 1000);
      },
      checkPwd() {
        const pwd = this.ruleForm.password;
        if (pwd.length >= 6) {
          this.pwdlevel(pwd);
        }
        if (pwd.length === 0) {
          this.weak = false;
          this.centre = false;
          this.strong = false;
        }
      },
      pwdlevel(pwd) {
        const regNumber = /\d+/,
          regLowerWords = /[a-z]+/,
          regUpperWords = /[A-Z]+/,
          regSpeChar = /[~!@#$%^&*()_+]/,
          regLen = /\S{12,}/,
          regSame = /^(.)\1{2,}$/;
        let strength = 0;
        if (regNumber.test(pwd)) {
          strength += 10;
        }
        if (regLowerWords.test(pwd)) {
          strength += 10;
        }
        if (regUpperWords.test(pwd)) {
          strength += 10;
        }
        if (regSpeChar.test(pwd)) {
          strength += 10;
        }
        if (regLen.test(pwd)) {
          strength += 10;
        }
        if (regSame.test(pwd)) {
          strength -= 10;
        }
        // console.log(strength);
        switch (strength) {
          case 0:
          case 10:
            this.weak = true;
            this.centre = false;
            this.strong = false;
            break;
          case 20:
            this.weak = true;
            this.centre = false;
            this.strong = false;
            break;
          case 30:
            this.weak = false;
            this.centre = true;
            this.strong = false;
            break;
          case 40:
            this.weak = false;
            this.centre = false;
            this.strong = true;
            break;
          case 50:
            this.weak = false;
            this.centre = false;
            this.strong = true;
            break;
          default:
            this.weak = false;
            this.centre = false;
            this.strong = false;
            break;
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnDisabled = true;
            registerService.addUser(this.ruleForm, (success, error) => {
              if (success) {
                window.location.href = '/register/org.html';
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
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/base";
  @import "register";

  .el-input__inner {
    width: 260px;
    height: 28px;
    border-radius: 3px;
  }

  .fake-input {
    position: absolute;
    z-index: -10;
    opacity: 0;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .el-button {
    height: 28px;
    line-height: 1;
  }
</style>
