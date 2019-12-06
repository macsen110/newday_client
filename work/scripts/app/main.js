/**
 * Created by liangyusen on 18/02/01.
 */
define(["zepto", "common", "commonAjax", "ui"], function (
  $,
  common,
  commonAjax,
  ui
) {
  //localStorage.city_partner_weChatKey = 'oMdGIw1HMMafCpr_JLLJ6EtTSCUM';
  var router = require("yao-easy-router");
  var asyncRouterConfig = require("./routes");
  var APP = {};
  window.onerror = function handleErr(msg, url, l) {
    txt = "本页中存在错误。\n\n";
    txt += "错误：" + msg + "\n";
    txt += "URL: " + url + "\n";
    txt += "行：" + l + "\n\n";
    txt += "点击“确定”继续。\n\n";
    //alert(txt);
    //return true;
  };
  APP.common = common;
  APP.commonAjax = commonAjax;
  APP.version = "1.0.0";
  APP.router = router;
  APP.config = {
    $root: $("#root_page_container"),
    $rootRouter: $("#root_router_box"),
    $bottomNav: $("#bottom_nav_box")
  };
  /**
   * 选择底部导航高亮
   * @param i//-2 隐藏底部按钮,-1 reset底部按钮, else 触发当前按钮高亮
   */
  APP.selectBottomNav = function (i) {
    var self = this;
    if (i == -2) {
      self.config.$root.removeClass('with-bottom-nav')
      self.config.$bottomNav.hide();
    }
    else if (i == -1) {
      self.config.$root.addClass('with-bottom-nav')
      self.config.$bottomNav.show();
      self.config.$bottomNav.find(".item").forEach(function (item, index) {
        $(item)
          .addClass("bind-location")
          .removeClass("active");
      });
    } else {
      self.config.$root.addClass('with-bottom-nav')
      self.config.$bottomNav.show();
      self.config.$bottomNav.find(".item").forEach(function (item, index) {
        if (index == i) {
          $(item)
            .addClass("active")
            .removeClass("bind-location");
        } else {
          $(item)
            .addClass("bind-location")
            .removeClass("active");
        }
      });
    }
  };

  APP.tools = {
    updateVesion: function (version) {
      var storeVesion = localStorage.getItem("storeVesion");
      if (version !== storeVesion) {
        localStorage.clear();
        localStorage.setItem("storeVesion", version);
      }
    },
    //页面添加路由跳转标签
    bindLocation: function () {
      var self = this;
      var isMove = false;
      //解决ios 下delegate 不能点击bug
      var tapEvent = "ontouchstart" in window ? "touchend" : "click";
      document.body.addEventListener("touchmove", function () {
        isMove = true;
      });
      document.body.addEventListener(tapEvent, function (e) {
        var bindLocationDom = self.getDomByEle(e.target, ".bind-location");
        if (bindLocationDom) {
          if (bindLocationDom.dataset.href) {
            e.preventDefault();
            e.stopPropagation();
            if (!isMove) {
              var stateObj = {};
              if (bindLocationDom.dataset.options) {
                stateObj = JSON.parse(bindLocationDom.dataset.options);
              }

              stateObj.pageName = bindLocationDom.dataset.href;
              APP.router.go(stateObj, stateObj);
            } else isMove = false;
          }
        }
      });
    },
    getDomByEle: function (curentEl, selector) {
      var sign = selector[0];
      function getId() {
        while (curentEl) {
          if (curentEl.id === selector.slice(1)) return curentEl;
          curentEl = curentEl.parentNode;
        }
        return undefined;
      }
      function getClass() {
        while (curentEl) {
          if (
            curentEl.classList &&
            curentEl.classList.contains(selector.slice(1))
          )
            return curentEl;
          curentEl = curentEl.parentNode;
        }
        return undefined;
      }
      function getEleName() {
        while (curentEl) {
          if (curentEl.tagName === selector.toUpperCase()) return curentEl;
          curentEl = curentEl.parentNode;
        }
        return undefined;
      }
      switch (sign) {
        case ".":
          return getClass();
        case "#":
          return getId();
        default:
          return getEleName();
      }
    },

    //日期控件change方法在ios和android下表现不一样
    selectValueChange: function ($dom, cb) {
      var self = this;
      var eventName =
        self.platform() == 2
          ? "blur"
          : self.getEnvironment() == 2 ? "input" : "change";
      $dom.on(eventName, function () {
        cb($dom.val());
      });
    } //正则表达式对象
  };
  APP.profileInfo = null;
  APP.mobileIsBind = function (weChatKey) {
    var self = this;
    APP.commonAjax.mobileIsBind(
      {
        weChatKey: weChatKey
      },
      {
        func: function (res) {
          if (res.code == 0) {
            APP.profileInfo = res.data;
            var pageName = APP.common.getLocationParam().pageName;
            //alert(pageName)
            if (!pageName || pageName == "home") {
              history.replaceState(
                "",
                "",
                location.pathname + "?pageName=my_customer"
              );
            }
            return APP.goNext();
          }
          if (res.code == 1) {
            history.replaceState(
              "",
              "",
              location.pathname + "?pageName=home"
            );
            return APP.goNext(1);
          }
          return ui.showPrompt(res.msg);
        }
      }
    );
  };
  APP.applyAuth = function () {
    return false;
    var p = location.protocol;
    var locationParam = APP.common.getLocationParam();
    var redirectUrl = encodeURIComponent(location.href);
    var encodeUrl = encodeURIComponent(p + redirectUrl);
    var jumpUrl =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ffc126c73788d14&redirect_uri=" +
      redirectUrl +
      "&response_type=code&scope=snsapi_userinfo&state=STATE##wechat_redirect";

    location.replace(jumpUrl);
  };
  APP.getInitId = function () {
    var that = this;

    if (
      sessionStorage.getItem("hasOpen") &&
      APP.common.getLocalStorage("token")
    ) {
      sessionStorage.removeItem("hasOpen");
      if (history.length > 3) return history.go(-3);
      else wx && wx.closeWindow();
    }
    var locationParam = APP.common.getLocationParam();
    if (locationParam.code) {
      that.getWechatInfo(locationParam.code);
    } else {
      that.applyAuth();
    }
  };
  APP.refreshWxKey = function () {
    localStorage.removeItem("city_partner_weChatKey");
    location.reload();
  };
  APP.getWechatInfo = function (code) {
    var self = this;
    APP.commonAjax.getWechatInfo(
      { code: code },
      {
        func: function (res) {
          if (res.code == 0) {
            var data = JSON.parse(res.data);
            localStorage.setItem("city_partner_weChatKey", data.weChatKey);
            return self.mobileIsBind(data.weChatKey);
          }
          return ui.showPrompt({
            msg: res.msg
          });
        }
      }
    );
  };
  APP.goHome = function () {
    history.replaceState("", "", location.pathname + "?pageName=home");
    APP.goNext();
  };
  APP.goNext = function () {
    var self = this;
    self.router._config._rootDom = self.config.$rootRouter[0];
    self.router._init(asyncRouterConfig);
  };
  APP.setPointBodyData = function (value) {
    var self = this;
    $('body').attr('data-ywid', value);
  };
  APP.goPointUrl = function () {
    ywPoint && ywPoint._url();
  }
  APP.hideWxShare = function () {
    wx.config({
      jsApiList: ['hideOptionMenu']
    })
    wx.ready(function () {
      wx.hideOptionMenu();
    })
  }
    APP.init = function () {
      var self = this;
      self._originUrl = location.href;
      self.selectBottomNav(-2);
      self.tools.updateVesion(self.version);
      self.tools.bindLocation();
      self.hideWxShare();
      
      var weChatKey = localStorage.getItem("city_partner_weChatKey");
      if (weChatKey) {
        return this.mobileIsBind(weChatKey);
      }
      return this.getInitId();
    };
    Object.defineProperty(window, "APP", {
      value: APP
    });
    APP.init();
    return {};

  });