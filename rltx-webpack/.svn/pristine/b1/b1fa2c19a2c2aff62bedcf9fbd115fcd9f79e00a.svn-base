/**
* table.vue
* Created by cc on 17/6/30.
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
                <!-- join-section -->
                <div class="join-section">
                  <p class="tc">平台检测到以下公司邀请您成为企业员工，您可以选择一个公司加入：</p>
                  <el-form class="reg-form formlist" label-width="150px">
                    <el-form-item label="公司名称">
                      <el-select v-model="code">
                        <el-option :key="x.code" :value="x.code" :label="x.ownerOrgName" v-for="x in listData"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit" :disabled="btnDisabled">接受邀请</el-button>
                    </el-form-item>
                  </el-form>
                  <!-- <div class="block">
                    <el-select v-model="code">
                      <el-option :key="x.code" :value="x.code" :label="x.ownerOrgName" v-for="x in listData"></el-option>
                    </el-select>
                    <el-button type="primary" @click="onSubmit" :disabled="btnDisabled">提交</el-button>
                  </div> -->
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

  import * as EmployeeService from '../../api/EmployeeService';

  import * as PlatformService from '../../api/PlatformService';

  export default {
    data() {
      return {
        listData: [],
        code: '',
        btnDisabled: false,
        paramObj: {},
        loginAccount: ''
      };
    },
    created() {
      this.loginAccount = window.location.search.substr(1).split('=')[1];
      // console.log(url);
      // console.log(EmployeeService);
      EmployeeService.registerList({ size: 20, phone: this.loginAccount }, (success) => {
        // console.log(success.content);
        this.listData = success.content;
      });
    },
    methods: {
      onSubmit() {
        this.btnDisabled = true;
        // console.log(this.code);
        this.listData.forEach((value) => {
          if (value.code === this.code) {
            this.paramObj.ownerOrgName = value.ownerOrgName;
            this.paramObj.ownerOrgCode = value.ownerOrgCode;
            this.paramObj.fullName = value.fullName;
            this.paramObj.phone = this.loginAccount;
          }
        });
        PlatformService.setUserInfoCode(this.code, this.paramObj, (success, error) => {
          if (success) {
            const userInfo = {
                'orgCode': this.paramObj.ownerOrgCode,
                'orgFullName': this.paramObj.ownerOrgName,
                'userFullName': this.paramObj.fullName,
                'loginAccount': this.loginAccount
              },
              userInfoObj = JSON.stringify(userInfo);
            localStorage.setItem('userInfo', userInfoObj);
            window.location.href = '/menu/menu.html';
            this.btnDisabled = false;
          }
          if (error) {
            this.btnDisabled = false;
            console.log(error);
          }
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/base";
  @import "register";
  
  .join-section {
    .formlist {
      height: auto;
      margin: 20px 180px;
    }
  }

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
