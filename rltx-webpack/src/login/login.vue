</**
* list.vue
* 登录
* Created by zhuyi on 17/7/21.
*/
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
        <div class="inner clearfix login-bg">
          <!-- login form -->
          <div class="logform fl">
            <h2 class="logtit">用户登录<em>USER LOGIN</em></h2>
            <fieldset>
              <legend>用户登录表单</legend>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="loglist">
                  <el-form-item prop="loginAccount">
                    <el-input v-model='ruleForm.loginAccount' placeholder="请输入用户名" name="loginAccount" id="loginAccount"></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input type="password" v-model='ruleForm.password' placeholder="请输入密码" name="password" id="password"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="login('ruleForm')">登录</el-button>
                  </el-form-item>
                </el-form>
            </fieldset>
          </div>
          <div class="regrec fr">
              <!-- <h2>融链天下物流平台</h2>
              <p>——中国领先的物流服务整合平台</p>
              <p>随时随地，找货无忧！</p>
              <p>立刻注册，享受更多车源货源信息服务！</p> -->
              <a href="/register/user.html" class="el-button el-button--line">免费注册企业账号</a>
              <a href="/register/personal.html" class="el-button el-button--line">免费注册个人账号</a>
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
  <!-- <div class="login-box-body">
    <p class="login-box-msg">请登录！</p>
    <div class="form-group has-feedback">
      <input type="text" class="form-control username" v-model="username" placeholder="用户名" name="loginUsername" id="loginUsername" required>
      <span class="glyphicon glyphicon-user form-control-feedback"></span>
    </div>
    <div class="form-group has-feedback">
      <input type="password" class="form-control password" v-model="password" placeholder="密码" name="loginPassword" id="loginPassword" required>
      <span class="glyphicon glyphicon-lock form-control-feedback"></span>
    </div>
    <div class="row">
            <div class="col-xs-4">
                <button @click="login()" type="submit" class="btn btn-primary btn-block btn-flat" id="login">登录</button>
            </div>
            <div class="col-xs-8">
                还没有账号？<a href="/register/user.html">企业注册</a>
              <a href="/register/personal.html">个人注册</a>
            </div>

        </div>
    </div> -->
</template>

<script type="text/ecmascript-6">
import { login } from '../../api/LoginService';

export default {
  name: 'LoginList',
  data() {
    return {
      ruleForm: {
        loginAccount: '',
        password: ''
      },
      rules: {
        loginAccount: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm.loginAccount, this.ruleForm.password, this.loginCallback);
        } else {
          return false;
        }
      });
    },
    loginCallback(response, err) {
      if (response.code === 200) {
        if (response.content.loginAccount) {
          const resObj = response.content,
            userInfo = {
              'orgCode': resObj.orgCode,
              'orgFullName': resObj.orgFullName,
              'userFullName': resObj.userFullName,
              'loginAccount': resObj.loginAccount
            },
            userInfoObj = JSON.stringify(userInfo);
          localStorage.setItem('userInfo', userInfoObj);
           // console.log(resObj);
          window.location.href = '/menu/menu.html';
        } else {
          this.$message.error(response.content.message);
        }
      }
      if (err !== null) {
        this.$message.error(err.content);
        return false;
      }
    }
  },
  created() {
    localStorage.clear();
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/base";
  @import "login";

  .el-input__inner {
    width: 300px;
    height: 36px;
    padding-left: 38px;
    border-radius: 3px;
  }

  .el-button {
    width: 300px;
    height: 34px;
    line-height: 32px !important;
    font-size: 16px;
    margin-left: 0 !important;
  }
</style>
