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
                <li class="step1">1、填写个人信息</li>
                <li class="step2 sibg">2、填写公司信息</li>
                <li class="step3 focus">3、注册成功</li>
              </ul>
            </div>
            <div id="regSuccess">
              <div class="init" v-show="isShow===true">
                <h3 class="init-tit"><span class="loading"></span>功能初始化中，请稍后……</h3>
                <ol class="init-list" id="initText">
                  <li v-for="(item,index) in initText" class="hide">
                    {{index}}、{{item}}
                    <div class="init-progress">
                      <!-- <div :class="['init-run amd-' + index]"></div> -->
                      <div class="init-run"></div>
                    </div>
                  </li>
                </ol>
              </div>
              <div class="regbd" v-show="isShow===false">
                <!-- register feedback -->
                <div class="reg-feedback clearfix">
                  <!-- result 1 -->
                  <div class="reg-result bg-green tc">
                    <i class="ico-success"></i>
                    <h3 class="reg-tit green">恭喜您，已成功注册公司！！</h3>
                  </div>
                  <!-- wel-section -->
                  <div class="wel-section">
                    <p class="tc">欢迎加入融链天下，您的用户名是：<strong class="org" id="userName"></strong>，公司名称是：<strong class="org" id="orgName"></strong>。</p>
                    <p class="tc">系统将会在 <strong class="red" id="number">10</strong> 秒后自动跳转至会员中心首页</p>
                    <p class="tc">
                      <a href="/menu/menu.html" class="btn-highlight">进入会员中心</a>
                    </p>
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

  import * as initService from '../../api/initService';

  import * as platformService from '../../api/PlatformService';

  import * as classUtil from '../../api/classUtil';

  // const axios = require('axios');

  // // 人服务
  // const apiPersonDomain = apiConst.apiPersonDomain,
  //   // 组织服务
  //   apiOrgDomain = apiConst.apiOrgDomain,
  //   // 车服务
  //   apiTruckDomain = apiConst.apiTruckDomain,
  //   // lbs
  //   apiLbsDomain = apiConst.apiLbsDomain,
  //   // 组织配置服务
  //   apiOrgConfigDomain = apiConst.apiOrgConfigDomain,
  //   // 运单服务
  //   apiWayBillDomain = apiConst.apiWayBillDomain,
  //   // 订单服务
  //   apiLogisticsDomain = apiConst.apiLogisticsDomain,
  //   // 运力服务
  //   apiTransportDomain = apiConst.apiTransportDomain,
  //   // 权限服务
  //   apiPermissionDomain = apiConst.apiPermissionDomain,
  //   // 资源库服务
  //   apiResourceDomain = apiConst.apiLineDomain,
  //   // 维保服务
  //   apiMaintenanceDomain = apiConst.apiMaintenaceDomain,
  //   // 货源服务
  //   apiFreightDomain = apiConst.apiFreightDomain;

  export default {
    data() {
      return {
        isShow: true,
        runTime: 10500,
        initText: [],
        number: 0,
        counter: 0,
        flag: true
      };
    },
    methods: {
      showSuccess() {
        initService.get((success, error) => {
          if (success) {
            const content = success.content,
              userInfo = {
                'orgCode': content.orgCode,
                'orgFullName': content.orgName,
                'userFullName': content.fullName,
                'loginAccount': content.phone
              },
              userInfoObj = JSON.stringify(userInfo);
            localStorage.setItem('userInfo', userInfoObj);
            document.querySelector('#userName').innerHTML = content.phone;
            document.querySelector('#orgName').innerHTML = content.orgName;
            this.isShow = false;
            this.timeCount(10);
          }
          if (error) {
            console.log(error);
          }
        });
      },
      timer() {
        window.setInterval(() => {
          this.counter += 1;
          const list = document.querySelectorAll('#initText li'),
            preIndex = this.counter - 1,
            preLi = list[preIndex],
            nextIndex = 8 + this.counter,
            nextLi = list[nextIndex];
          // console.log(preIndex, nextIndex);
          if (this.flag) {
            list.forEach((key, index) => {
              if (index < 9) {
                classUtil.removeClass(key, 'hide');
              }
            });
            this.flag = false;
          }
          if (nextIndex < this.initText.length) {
            classUtil.removeClass(nextLi, 'hide');
          }
          if (preIndex < this.initText.length - 9) {
            classUtil.addClass(preLi, 'hide');
          }
          if (preIndex === this.initText.length - 6) {
            this.showSuccess();
          }
          // console.log(this.counter);
          // console.log(this.initText);
        }, 1000);
        // window.setTimeout(this.showSuccess, this.runTime);
      },
      timeCount(time) {
        window.setTimeout(() => {
          let t = time;
          t -= 1;
          if (t === 0) {
            window.location.href = '/menu/menu.html';
          } else {
            document.querySelector('#number').innerHTML = t;
            this.timeCount(t);
          }
        }, 1000);
      },
      initRootRole() {
        initService.initRole((success, error) => {
          if (success) {
            const result = success.code,
              content = success.content;
            if (result === 200) {
              console.log('init root role finished');
            } else {
              console.log(content);
            }
          }
          if (error) {
            console.log(error);
          }
        });
      }
    },
    created() {
      // const initTypes = [
      //   {
      //     url: `${apiPersonDomain}/register/driver/init`,
      //     type: 'driver',
      //     text: '司机'
      //   },
      //   {
      //     url: `${apiPersonDomain}/register/employee/init`,
      //     type: 'employee',
      //     text: '人员'
      //   },
      //   {
      //     url: `${apiOrgDomain}/register/partner/init`,
      //     type: 'partner',
      //     text: '伙伴'
      //   },
      //   {
      //     url: `${apiOrgDomain}/register/company/init`,
      //     type: 'company',
      //     text: '公司'
      //   },
      //   {
      //     url: `${apiOrgDomain}/register/actionTemplate/init`,
      //     type: 'actionTemplate',
      //     text: '组织'
      //   },
      //   {
      //     url: `${apiTruckDomain}/register/truck/init`,
      //     type: 'truck',
      //     text: '车辆'
      //   },
      //   {
      //     url: `${apiTruckDomain}/register/trailer/init`,
      //     type: 'trailer',
      //     text: '挂车'
      //   },
      //   {
      //     url: `${apiLbsDomain}/register/device/init`,
      //     type: 'device',
      //     text: '设备'
      //   },
      //   {
      //     url: `${apiOrgConfigDomain}/register/element/init`,
      //     type: 'element',
      //     text: '组织配置'
      //   },
      //   {
      //     url: `${apiOrgConfigDomain}/register/measureUnit/init`,
      //     type: 'measureUnit',
      //     text: '组织配置'
      //   },
      //   {
      //     url: `${apiWayBillDomain}/register/waybill/init`,
      //     type: 'waybill',
      //     text: '运单'
      //   },
      //   {
      //     url: `${apiWayBillDomain}/register/ticket/init`,
      //     type: 'ticket',
      //     text: '货单'
      //   },
      //   {
      //     url: `${apiWayBillDomain}/register/settle/init`,
      //     type: 'settle',
      //     text: '结算'
      //   },
      //   {
      //     url: `${apiLogisticsDomain}/register/logistics/init`,
      //     type: 'logistics',
      //     text: '订单'
      //   },
      //   {
      //     url: `${apiLogisticsDomain}/register/outsourcing/init`,
      //     type: 'outsourcing',
      //     text: '订单'
      //   },
      //   {
      //     url: `${apiTransportDomain}/register/transport/init`,
      //     type: 'transport',
      //     text: '运力'
      //   },
      //   {
      //     url: `${apiPermissionDomain}/register/permission/init`,
      //     type: 'permission',
      //     text: '权限'
      //   },
      //   {
      //     url: `${apiResourceDomain}/register/route/init`,
      //     type: 'route',
      //     text: '线路'
      //   },
      //   {
      //     url: `${apiResourceDomain}/register/rates/init`,
      //     type: 'rates',
      //     text: '运价'
      //   },
      //   {
      //     url: `${apiMaintenanceDomain}/register/tyre/init`,
      //     type: 'tyre',
      //     text: '车辆轮胎'
      //   },
      //   {
      //     url: `${apiMaintenanceDomain}/register/insurance/init`,
      //     type: 'insurance',
      //     text: '保险记录'
      //   },
      //   {
      //     url: `${apiMaintenanceDomain}/register/maintenance/init`,
      //     type: 'maintenance',
      //     text: '维修记录'
      //   },
      //   {
      //     url: `${apiMaintenanceDomain}/register/care/init`,
      //     type: 'care',
      //     text: '保养记录'
      //   },
      //   {
      //     url: `${apiMaintenanceDomain}/register/peccancy/init`,
      //     type: 'peccancy',
      //     text: '违章记录'
      //   },
      //   {
      //     url: `${apiMaintenanceDomain}/register/accident/init`,
      //     type: 'accident',
      //     text: '事故记录'
      //   },
      //   {
      //     url: `${apiMaintenanceDomain}/register/tyreInspection/init`,
      //     type: 'tyreInspection',
      //     text: '轮胎巡检'
      //   },
      //   {
      //     url: `${apiMaintenanceDomain}/register/remind/init`,
      //     type: 'remind',
      //     text: '待办提醒'
      //   },
      //   {
      //     url: `${apiFreightDomain}/register/freight/init`,
      //     type: 'freight',
      //     text: '货源'
      //   }
      //   ],
      //   tempArray = [];
      // 初始化配置
      // initTypes.forEach((obj) => {
      //   initService.initConfig(obj, (success, error) => {
      //     this.number += 1;
      //     if (this.number === initTypes.length) {
      //       this.initRootRole();
      //     }
      //     if (success) {
      //       // if (!this.initText.includes(obj.text)) {
      //       //   this.initText.push(obj.text);
      //       // }
      //       if (!tempArray.includes(obj.text)) {
      //         tempArray.push(obj.text);
      //       }
      //     } else {
      //       console.log(error);
      //     }
      //     // console.log(this.number, initTypes.length);
      //     if (this.number === initTypes.length) {
      //       // console.log(tempArray);
      //       this.initText = tempArray;
      //       // console.log(this.initText);
      //       this.timer();
      //     }
      //   });
      // });
      platformService.registerInit((success, error) => {
        if (error || success.code !== 200) {
          this.$message({
            type: 'error',
            showClose: true,
            message: error.content,
            duration: 5000
          });
          return false;
        }
        if (success) {
          this.initRootRole();
          this.initText = ['司机', '人员', '伙伴', '公司', '组织', '车辆', '挂车', '设备', '组织配置', '运单', '货单', '结算', '订单', '运力', '权限', '线路', '运价', '车辆轮胎', '保险记录', '维修记录', '保养记录', '违章记录', '事故记录', '轮胎巡检', '待办提醒', '货源'];
          this.timer();
        }
      });
    },
    mounted() {
      // this.timer();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/base";
  @import "register";
  .wel-section {
    strong {
      font-size: 18px;
      font-weight: 700;
    }
  }
  #userName {
    font-size: 20px;
  }
</style>
