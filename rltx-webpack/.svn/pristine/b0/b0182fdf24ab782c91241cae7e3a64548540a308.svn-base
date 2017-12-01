<template>
  <div id="template">
    <div class="security-page">
      <div class="page-header clearfix">
        <h2 class="page-title fl">
          安全设置
        </h2>
        <!-- <span class="page-refresh fr" id="pageRefresh">
          <i class="ico-refresh"></i>刷新
        </span> -->
      </div>
      <!-- last-login -->
      <div class="last-login">
          <p>用户名：<strong class="bold" id="userName"></strong></p>
      </div>
      <!-- security-setting -->
      <div class="security-setting">
          <dl class="setlist clearfix">
              <dt><i class="ico-st st1"></i>登录密码</dt>
              <dd>
                  <p class="ftred">互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</p>
              </dd>
              <dd class="operate">
                <a href="javascript:;" id="pwd_update">修改</a>
              </dd>
          </dl>
          <dl class="setlist clearfix">
              <dt>
                <i class="ico-st st1"></i>手机验证
              </dt>
              <dd>
                <p>您验证的手机号：<strong class="bold" id="Phone"></strong> 若已丢失或停用，请更换，避免账户被盗。</p>
              </dd>
              <dd class="operate">
                <a href="javascript:;" id="phone_update">修改</a>
              </dd>
          </dl>
          <!--  TODO 未做功能隐藏 -->
          <!-- <dl class="setlist clearfix hide">
              <dt><i class="ico-st st2"></i>邮箱验证</dt>
              <dd><p>您验证的邮箱：<span class="ftorange">暂无</span> 若已丢失或停用，请立即更换，避免账户被盗</p></dd>
              <dd class="operate"><a href="javascript:;">修改</a></dd>
          </dl>
          <dl class="setlist clearfix hide">
              <dt><i class="ico-st st2"></i>支付密码</dt>
              <dd><p>您尚未设置支付密码，请先启用资金账户。</p></dd>
              <dd class="operate"><span class="btn-a-white"><a href="javascript:;">立即启用</a></span></dd>
          </dl>
          <dl class="setlist clearfix hide">
              <dt><i class="ico-st st2"></i>数字证书</dt>
              <dd><p>安装数字证书后，即使密码被盗，对方也不能使用您的账户资产。</p></dd>
              <dd class="operate"><span class="btn-a-white"><a href="javascript:;">立即启用</a></span></dd>
          </dl> -->
      </div>
      <!-- security notice -->
      <div class="security-notice">
          <h3>安全服务提示</h3>
          <ol>
              <li>确认您登录的是融链网址http://www.rltx.com，注意防范进入钓鱼网站。</li>
              <li>建议您安装杀毒软件，并定期更新操作系统等软件补丁，确保账户及交易安全。</li>
          </ol>
      </div>
    </div>
    <password></password>
    <mobile></mobile>
    <div id="maskLayer" class="blackmask hide"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import * as HTTP from '../../api/httpUtil';
/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
const apiDomain = require('../../api/ApiConst');

import password from './password.vue';
import mobile from './mobile.vue';

export default{
  name: 'waybillList',
  components: {
    password,
    mobile
  },
  props: {

  },
  data() {
    return {

    };
  },
  mounted() {
    HTTP.get(`${apiDomain.apiPersonDomain}/person/self/info`, {}, (response) => {
      document.getElementById('userName').innerHTML = response.content.fullName;
      document.getElementById('Phone').innerHTML = response.content.loginAccount.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    });
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../assets/sass/base.scss";
@import './safe.scss';
</style>
