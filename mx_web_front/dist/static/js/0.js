webpackJsonp([0],{17:function(t,o,s){"use strict";function e(t){s(24)}Object.defineProperty(o,"__esModule",{value:!0});var i=s(25),a=s(26),n=s(4),l=e,r=n(i.a,a.a,!1,l,null,null);o.default=r.exports},24:function(t,o){},25:function(t,o,s){"use strict";var e=s(5);s.n(e);o.a={data:function(){return{loopPayTime:60,loopPayTimeId:null,loopCloseTime:5,loopCloseTimeId:null,mockPayStatus:1,orderInfo:{number:4,price:"40.00",status:0},pageUxState:{dialog:null}}},methods:{openDialog:function(t){var o=this;this.destoryDialog();var s;switch(t){case 4:s='支付时间超时，<em id="loopCloseTimeEle">'+this.loopCloseTime+"</em>秒后将关闭交易",this.loopCloseTimeId=setInterval(function(){return o.loopCloseTimeFun()},1e3);break;case 5:s="支付异常"}this.pageUxState.dialog=e.Dialog({parentEle:document.body.querySelector(".container"),content:s,foot:'<button class="btn-dialog-cancel">立即关闭</button><button class="btn-dialog-ok">重新支付</button>',afterOk:function(){o.destoryDialog(),o.reflushLoopPay()},afterClose:function(){o.destoryDialog(),o.goHomePage()}})},destoryDialog:function(){this.pageUxState.dialog&&this.pageUxState.dialog.destory()},reflushLoopPay:function(){this.destroyCloseTimeLoop(),this.destroyPayTimeLoop(),this.loopPayTime=60,this.loopCloseTime=5,this.loopPayTimeId=setInterval(this.loopPayTimeFun,1e3)},loopPayTimeFun:function(){this.loopPayTime>0?this.loopPayTime--:this.loopPayTimeEndCb()},loopPayTimeEndCb:function(){this.destroyPayTimeLoop(),0==this.orderInfo.status&&this.openDialog(4)},loopCloseTimeFun:function(){if(this.loopCloseTime>0){var t=document.getElementById("loopCloseTimeEle");t&&(t.innerText=--this.loopCloseTime)}else this.loopCloseTimeEndCb()},loopCloseTimeEndCb:function(){this.destoryDialog(),this.destroyCloseTimeLoop(),this.goHomePage()},destroyPayTimeLoop:function(){this.loopPayTimeId&&clearInterval(this.loopPayTimeId)},destroyCloseTimeLoop:function(){this.loopCloseTimeId&&clearInterval(this.loopCloseTimeId)},toPay:function(){var t=this;this.orderInfo.status=1,this.mockPayStatus&&setTimeout(function(){return t.payOver()},3e3),this.mockPayStatus=null},payOver:function(){var t=this;this.orderInfo.status=2,setTimeout(function(){return t.finish()},3e3)},finish:function(){var t=this;this.orderInfo.status=3,setTimeout(function(){return e.showPrompt({msg:"已完成,正在返回首页...",cb:function(){return t.goHomePage()}})},3e3)},goHomePage:function(){this.$router.push({path:"/"})},goBack:function(){history.back()}},created:function(){this.reflushLoopPay()},beforeDestroy:function(){this.destroyCloseTimeLoop(),this.destroyPayTimeLoop(),this.destoryDialog()}}},26:function(t,o,s){"use strict";var e=function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",{staticClass:"container page-pay"},[s("h3",{staticClass:"header"},[s("span",{staticClass:"btn-go-back",on:{click:t.goBack}},[t._v("取消")])]),t._v(" "),s("div",{staticClass:"body"},[s("div",{staticClass:"pay-box-header"},[t.orderInfo.status<=1?s("div",{staticClass:"unpay-header"},[s("div",{staticClass:"left"},[t._v("\n          我的订单"),s("span",{staticClass:"num"},[t._v(t._s(t.orderInfo.number))]),t._v("件\n        ")]),t._v(" "),s("div",{staticClass:"right"},[t._v("\n          ¥"),s("em",{staticClass:"price"},[t._v(t._s(t.orderInfo.price))])])]):t._e(),t._v(" "),2==t.orderInfo.status||3==t.orderInfo.status?s("div",{staticClass:"payed-header"},[s("p",{staticClass:"tit"},[t._v("支付成功")]),t._v(" "),s("p",{staticClass:"sub-tit"},[t._v("感谢惠顾，欢迎下次光临")])]):t._e()]),t._v(" "),s("div",{staticClass:"pay-result"},[t.orderInfo.status<=1?s("div",{staticClass:"unpay-result"},[s("p",{staticClass:"remian"},[t._v(t._s(t.loopPayTime)+"s")]),t._v(" "),s("p",{staticClass:"result-text"},[t._v("等待支付")]),t._v(" "),s("p",{staticClass:"tip"},[t._v("请打开盒马App的付款码，对准下方扫码口")]),t._v(" "),s("span",{staticClass:"qrcode",style:{backgroundImage:"url(./tmp/qrcode.png)"},on:{click:t.toPay}})]):t._e(),t._v(" "),2==t.orderInfo.status||3==t.orderInfo.status?s("div",{staticClass:"payed-result"},[s("h3",{staticClass:"result-text"},[t._v("\n          "+t._s(2==t.orderInfo.status?"正在出货…":"已出货")+"\n        ")]),t._v(" "),s("p",{class:"result-sub-text "+t.orderInfo.status==3?"visibile":""},[t._v("请在屏幕下方的取货口提取您的餐食")]),t._v(" "),3==t.orderInfo.status?s("div",{staticClass:"bg-result-finished"}):s("div",{staticClass:"bg-result-payed"})]):t._e()])])])},i=[],a={render:e,staticRenderFns:i};o.a=a}});