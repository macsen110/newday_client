<template>
<div class="showdialog uc-uinfoverify uc-updatepwd hide" id="dialog1">
    <div class="sd-hd">
        <h2 class="sdtit">修改手机号</h2>
        <span class="close" title="点击关闭窗口" id="closePhonePwdWinId" @click="closeWin()">关闭</span>
    </div>
    <div class="sd-bd">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
        <el-form-item label="原手机号" prop="originalPhone">
          <div class="row clearfix">
            <div class="col6">
              {{ ruleForm.originalPhone }}
            </div>
            <div class="col4">
              <el-button v-if="!verifyType1" disabled="disabled">{{getPhoneCodeHtml1}}</el-button>
              <el-button type="primary" v-if="verifyType1" :disabled="isGetCodeDisabled1" @click="getPhoneCode1()" >获取验证码</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="验证码" prop="originalPhoneCode">
          <el-input v-model='ruleForm.originalPhoneCode' placeholder="请输入原手机号验证码"></el-input>
        </el-form-item>
        <el-form-item label="新手机号" prop="newPhone">
          <div class="row clearfix">
            <div class="col6">
              <el-input v-model='ruleForm.newPhone' placeholder="请输入新手机号"></el-input>
            </div>
            <div class="col4">
              <el-button v-if="!verifyType" disabled="disabled">{{getPhoneCodeHtml}}</el-button>
              <el-button type="primary" v-if="verifyType" :disabled="isGetCodeDisabled" @click="getPhoneCode()" >获取验证码</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="验证码" prop="phoneCode">
          <el-input v-model='ruleForm.phoneCode' placeholder="请输入新手机号验证码"></el-input>
        </el-form-item>
        <p class="fmbtm">
  	      <el-button @click="closeWin()" id="cancel_update_phone">取消</el-button>
  	      <el-button type="primary" @click="updatePhone('ruleForm')">确认</el-button>
  	    </p>
	    </el-form>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import * as HTTP from '../../api/httpUtil';
import apiDomain from '../../api/ApiConst';
import { addClass } from '../../api/classUtil';
import * as registerService from '../../api/registerService';

export default{
  name: 'partnerList',
  data() {
    const checkPhone = (rule, value, callback) => {
      if (this.validateType === null) {
        const reg = /^1\d{10}$/;
        if (value.length === 11) {
          if (reg.test(value) === false) {
            callback(new Error('请输入正确的手机号'));
            this.isGetCodeDisabled = true;
          } else {
            const paramObj = {
              loginAccount: value
            };
            registerService.checkUser(paramObj, (success) => {
              if (success) {
                callback();
                this.isGetCodeDisabled = false;
              } else {
                // callback(new Error(error.content));
                callback(new Error('帐号已存在，请直接登录'));
              }
            });
          }
        } else {
          // callback(new Error('请输入正确的手机号'));
          this.isGetCodeDisabled = true;
        }
      } else {
        this.isGetCodeDisabled = true;
        callback();
      }
    };
    return {
      originalPhone: '',
      getPhoneCodeHtml: '',
      getPhoneCodeHtml1: '',
      number: 60,
      number1: 60,
      ruleForm: {
        originalPhone: '',
        originalPhoneCode: '',
        newPhone: '',
        phoneCode: ''
      },
      validateType: null,
      isGetCodeDisabled: true,
      isGetCodeDisabled1: false,
      verifyType: true,
      verifyType1: true,
      rules: {
        originalPhoneCode: [
          { required: true, message: '请输入原手机号验证码', trigger: 'blur' }
        ],
        newPhone: [
          { required: true, message: '请输入新手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'change' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        phoneCode: [
          { required: true, message: '请输入新手机号验证码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    closeWin() {
      const masklayer = document.getElementById('maskLayer'),
        dialog = document.getElementById('dialog1');
      addClass(masklayer, 'hide');
      addClass(dialog, 'hide');
      this.clear();
      // this.number = 0;
      // this.verifyType = true;
    },
    phoneCodeTime() {
      this.isGetCodeDisabled = true;
      this.verifyType = false;
      this.getPhoneCodeHtml = this.getPhoneCodeHtml ? this.getPhoneCodeHtml : '还剩60秒';
      setTimeout(() => {
        if (this.number > 0) {
          this.number -= 1;
          this.getPhoneCodeHtml = `还剩${this.number}秒`;
          this.phoneCodeTime();
        } else {
          if (this.ruleForm.newPhone) {
            this.isGetCodeDisabled = false;
          }
          this.verifyType = true;
          this.number = 60;
          this.getPhoneCodeHtml = '还剩60秒';
        }
      }, 1000);
    },
    phoneCodeTime1() {
      this.isGetCodeDisabled1 = true;
      this.verifyType1 = false;
      this.getPhoneCodeHtml1 = this.getPhoneCodeHtml1 ? this.getPhoneCodeHtml1 : '还剩60秒';
      setTimeout(() => {
        if (this.number1 > 0) {
          this.number1 -= 1;
          this.getPhoneCodeHtml1 = `还剩${this.number1}秒`;
          this.phoneCodeTime1();
        } else {
          this.isGetCodeDisabled1 = false;
          this.verifyType1 = true;
          this.number1 = 60;
          this.getPhoneCodeHtml1 = '还剩60秒';
        }
      }, 1000);
    },
    getPhoneCode() {
      this.phoneCodeTime();
      this.isGetCodeDisabled = true;
      HTTP.post(`${apiDomain.apiDomain}/account/send/verify_code`, { mobilePhone: this.ruleForm.newPhone }, (success, error) => {
        if (success) {
          console.log('success');
        } else {
          this.$message({
            message: success.message,
            type: 'success'
          });
        }
        if (error) {
          this.$message.error(error.content);
          this.isGetCodeDisabled = false;
        }
      });
    },
    getPhoneCode1() {
      this.phoneCodeTime1();
      this.isGetCodeDisabled1 = true;
      HTTP.post(`${apiDomain.apiDomain}/account/send/self/verify_code`, { }, (success, error) => {
        if (success) {
          console.log('success');
        } else {
          this.$message({
            message: success.message,
            type: 'success'
          });
        }
        if (error) {
          this.$message.error(error.content);
          this.isGetCodeDisabled1 = false;
        }
      });
    },
    updatePhone(ruleForm) {
      const storage = window.localStorage;
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          HTTP.post(`${apiDomain.apiAccountDomain}/account/modify_login_account`, {
            oldVerifyCode: this.ruleForm.originalPhoneCode,
            newVerifyCode: this.ruleForm.phoneCode,
            newLoginAccount: this.ruleForm.newPhone
          }, (response, error) => {
            if (response) {
              const newAccount = this.ruleForm.newPhone,
                newText = newAccount.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
                userInfo = storage.getItem('userInfo'),
                userInfoObj = JSON.parse(userInfo);
              userInfoObj.loginAccount = newAccount;
              storage.setItem('userInfo', JSON.stringify(userInfoObj));
              document.getElementById('Phone').innerHTML = newText;
              this.ruleForm.originalPhone = newAccount;
              this.closeWin();
              this.$message({
                message: '手机修改成功',
                type: 'success'
              });
            }
            if (error) {
              this.$message.error(error.content);
            }
          });
        } else {
          return false;
        }
      });
    },
    clear() {
      this.ruleForm.originalPhoneCode = '';
      this.ruleForm.newPhone = '';
      this.ruleForm.phoneCode = '';
      if (this.number < 60) {
        this.number = 0;
      }
      if (this.number1 < 60) {
        this.number1 = 0;
      }
    }
  },
  created() {
    const userInfo = window.localStorage.getItem('userInfo'),
      userInfoObj = JSON.parse(userInfo);
    this.originalPhone = userInfoObj.loginAccount;
    this.ruleForm.originalPhone = userInfoObj.loginAccount.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  }
};
</script>

<style>
  #dialog1 {
    width: 330px;
    margin-left: -195px;
  }
  #dialog1 .sd-bd {
    padding-top: 10px;
  }
  #dialog1 .col4 .el-button {
    width: 90px;
    float: right;
  }
  .el-input .el-icon-loading{
    display: none;
  }
</style>
