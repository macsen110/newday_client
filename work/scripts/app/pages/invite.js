/**
 * Created by wudi on 15/11/30.
 */
define(["zepto", "template", "ui"], function($, template, ui) {
  //init page
  var pageInitObj = {
    config: {
      wechat: {
        title: "【1号药城】欢迎您的加入", // 分享标题
        desc:
          "注册【1号药城】，为您提供高效智慧药品采购平台，还有犹豫什么，快加入吧", // 分享描述
        link:
          "//m.yaoex.com/register.html?share_source=2&content=" +
          APP.profileInfo.referralCode, // 分享链接
        imgUrl: "http://oc8vsittb.bkt.clouddn.com/logo1.png" // 分享图标
      }
    },
    $rootDom: APP.config.$rootRouter,
    ready: function(stateObj, data) {},
    show: function(tplScript) {
      var self = this;
      self.$rootDom.html(tplScript);
      self.bindUI();
    },
    setPageInfo: function() {
      var self = this;
      if (!APP.profileInfo) {
        return;
      }
      var data = {
        id: APP.profileInfo.id,
        toUrl: "http://m.yaoex.com/register.html",
        referralCode: APP.profileInfo.referralCode
      };
      APP.commonAjax.createQrcode(data, {
        func: function(res) {
          if (res.code == 0) {
            $(".img-code").attr("src", res.data);
            
          } else return ui.showPrompt(res.msg);
        }
      });
      $(".page-invite h3 span").html(APP.profileInfo.referralCode);
    },
    bindUI: function() {
      var self = this;
      this.ready();
    },
    init: function(stateObj) {
      if (location.href.indexOf('__replace=wechat') == -1) return this.replace('__replace=wechat')
      
      APP.selectBottomNav(-2);
      var self = this;
      var html = require("./tpl/invite.html");
      this.show(html);
    },
    replace: function (str) {
      location.replace(location.href +'&'+ str)
    },
    destroy: function() {
      //如果有事件绑定的话, 解除事件绑定

      APP.hideWxShare();
    },
    ready: function() {
      this.setPageTitle('我的邀请码');
      this.setPageInfo();
      if (APP.common.inWx()) this.getWxConfig()        
      this.$rootDom.find("#root_container").addClass("ready");
    },
    setPageTitle: function (title) {
			var $body = $('body');
			document.title = title
			// hack在微信等webview中无法修改document.title的情况
			var $iframe = $('<iframe src="/fav.icon" style="height:0px; width: 0px; visibility: hidden"></iframe>').on('load', function() {
				setTimeout(function() {
					$iframe.off('load').remove()
				}, 0)
			}).appendTo($body) 
    },
    _weixinShare: function (data) {
      wx.ready(function() {
        wx.showOptionMenu();
        // 分享到朋友圈
        wx.onMenuShareTimeline({
          title: data.title, // 分享标题
          desc: data.desc, // 分享描述
          link: data.link, // 分享链接
          imgUrl: data.imgUrl // 分享图标
        });
        // 分享给朋友
        wx.onMenuShareAppMessage({
          title: data.title, // 分享标题
          desc: data.desc, // 分享描述
          link: data.link, // 分享链接
          imgUrl: data.imgUrl // 分享图标
        });
      });
    },
    getWxConfig: function() {
      var self = this;
        APP.commonAjax.getWxConfig(
          {
            url: APP._originUrl,
          },
          {
            func: function(res) {
              if (res.code == 0) {
                var data = self.config.wechat;
                var response = res.data;
                //wx = window.wx || {};
                wx = wx || window.wx || {};
                if (APP.router.curPathName != 'invite') return false;
                wx.config({
                  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: response.appId, // 必填，公众号的唯一标识
                  timestamp: response.timestamp, // 必填，生成签名的时间戳
                  nonceStr: response.nonceStr, // 必填，生成签名的随机串
                  signature: response.signature, // 必填，签名，见附录1
                  jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "showOptionMenu"]
                });
                setTimeout(function () {
                  self._weixinShare.bind(self)(data);
                }, 1000)
                
              }
            }
          }
        );      
    }
  };

  return pageInitObj;
});
