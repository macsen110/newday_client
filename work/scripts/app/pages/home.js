/**
 * Created by liangyusen 18/02/01
 */
define(["zepto", "ui", "ycaptcha"], function($, ui, ycaptcha) {
  //初始化page
  /**
   **@isAgreeAccredit 请求接口,验证是否授权绑卡
   **@ready 验证接口请求完成后,如果未授权调用ready，
   **@bindUI 绑定业务逻辑
   **@reqAccredit 同意授权,请求后端接口
   **@dialog 页面弹框元素,默认为undefined
   ***/
  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      var id = window.setTimeout(callback, 1000 / 60);
      return id;
    };
  var cancelAnimationFrame =
    window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function(id) {
      clearTimeout(id);
    };
  var pageInitObj = {
    config: {
      sms: {
        glAppId: "1138",
        templateId: "1182",
        tag: "citypartner",
        length: "6",
        glCaptchaToken: ""
      }
    },
    $rootDom: APP.config.$rootRouter,
    ui: {},
    
    ready: function(stateObj) {
      var html = require("./tpl/home.html");
      
      this.show(html);
    },
    show: function(html) {
      this.$rootDom.addClass("visibile");
      this.$rootDom.append(html);
      this.bindUI();
      APP.selectBottomNav(-2);
    },
    bindUI: function() {
			var self = this;
			var form = self.config.form = self.$rootDom.find('form')[0];
      self.setBtnStatus();
      form.get_sms_code.addEventListener(
        "click",
        function () {
          self.checkMobileUsed(form.mobile.value)
        }.bind(self)
      );
      form.submit_btn.addEventListener("click", function(e) {
        e.preventDefault();
        self.submitInfo(form);
        return false;
      });
    },
    checkMobileUsed: function (mobile) {
      var self = this;
      if (!self.checkMobile(mobile)) return false;
      APP.commonAjax.checkMobileUsed({mobile: mobile}, {
        func: function(res) {
          if (res.code == 0) return self.getImgCard(mobile)
          else return ui.showPrompt(res.msg)
        }
      })

    }, 
    checkMobile: function() {
      var $phone = this.config.form.mobile.value;
      if (!$phone) {
        ui.showPrompt("请输入手机号");
        return false;
      }
      if (!/^1\d{10}$/.test($phone)) {
        ui.showPrompt("手机号码错误");
        return false;
      }
      return true;
    },
    getImgCard: function(mobileVal) {
      var self = this;
      if (!self.checkMobile(mobileVal)) return false;
      
      self.config.dialog = ui.Dialog({
        className: "get-numcode-dialog",
        content:
          '<input class="ipt" placeHolder="请输入右侧验证码"><img id="get_img_code" class="pic" src=""><div class="tip"></div>',
        foot: '<button class="btn-dialog-ok">确定</button>',
        //canMaskClose: false,
        afterOk: function() {
          var ipt = this.container.querySelector(".ipt");
          var tip = this.container.querySelector(".tip");
          var btn = this.container.querySelector(".btn-dialog-ok");
          var $pic = $("#get_img_code");
          if ($.trim(ipt.value) == "") {
            tip.classList.add("show");
            tip.innerHTML = "图形验证码不能为空";
            return;
          }
          btn.setAttribute("disabled", true);
          self.imgCheck($pic, $.trim(ipt.value), btn, tip);
        },
        afterOpen: function() {
          var $pic = $("#get_img_code");
          $pic.ycaptcha({
            glAppId: self.config.sms.glAppId, //此处填申请的appId
            onCheck: function(result) {}
          });
        },
        afterClose: function() {
          var that = this;
          self.config.dialog = undefined;
        }
      });
    },
    imgCheck: function($img, valueData, btn, tip) {
      var self = this;
      var src = $img.attr("src");
      var glCaptchaId = APP.common.getParam(src);
      var data = {
        glCaptchaCode: valueData,
        glCaptchaId: glCaptchaId.glCaptchaId,
        glAppId: self.config.sms.glAppId,
        templateId: self.config.sms.templateId
      };
      $.getJSON(
        "https://web-ycaptcha.111.com.cn/checkfrontjsonp?jsoncallback=?",
        data,
        function(data) {
          if (data.result) {
            self.config.sms.glCaptchaToken = data.glCaptchaToken;
            self.config.dialog && self.config.dialog.destory();
            self.getSmsNextTick();
          } else {
            $img.ycaptcha({
              glAppId: self.config.sms.appId, //此处填申请的appId
              onCheck: function(result) {}
            });
            tip.classList.add("show");
            tip.innerHTML = "图形验证码输入有误";
            btn.removeAttribute("disabled");
          }
        }
      );
    },
    getSmsNextTick: function() {
      var self = this;
      var _that = self.config.form.get_sms_code;
      self.getSmsAjax(self.config.form.mobile.value);
      var counting = 60;
      if (_that.innerHTML == "重新发送" || _that.innerHTML == "获取验证码") {
        _that.setAttribute("disabled", true);
        _that.innerHTML =
          '<span class="counting">59</span><span>s后重发</span>';
        timeOutFlag = setInterval(function() {
          counting = _that.querySelector(".counting").innerHTML;
          if (counting == 0) {
            clearInterval(timeOutFlag);
            _that.removeAttribute("disabled");
            _that.innerHTML = "重新发送";
          } else {
            _that.querySelector(".counting").innerHTML = --counting;
          }
        }, 1000);
      }
    },
    getSmsAjax: function(phone) {
      var self = this;
      var sms = self.config.sms;

      $.ajax({
        url: "https://arch-sms.111.com.cn/sendsms?jsoncallback=?",
        type: "get",
        data: {
          glAppId: sms.glAppId,
          templateId: "8",
          tag: sms.tag,
          phone: phone,
          length: sms.length,
          glCaptchaToken: sms.glCaptchaToken
        },
        dataType: "jsonp",
        success: function(data) {
          if (data.result == true) {
            ui.showPrompt("发送成功");
          } else {
            ui.showPrompt("发送失败,请稍后重试!");
          }
        }
      });
    },
    submitInfo: function(form) {
      var self = this;
      var data = {
        mobile: $.trim(form.mobile.value),
        weChatKey: self.config.weChatKey,
        smsCode: $.trim(form.sms_code.value)
      };
      APP.commonAjax.unionidBindMobile(data, {
        func: function(res) {
          if (res.code == 0) return ui.showPrompt({
            msg: '恭喜您,绑定成功',
            cb: function() {
              APP.profileInfo = res.data;
              APP.router.go('my_customer')
            }
          })
          if (res.code == -2) return ui.showPrompt({
            msg: res.msg,
            cb: function() {
              location.href= '//m.yaoex.com/web/h5/city_partner/index.html?platform=wechat'
            }
          })
          ui.showPrompt(res.msg)
        }
      })
    },
    init: function(stateObj) {
      var weChatKey = localStorage.getItem("city_partner_weChatKey");
      if (weChatKey) {
        this.config.weChatKey = weChatKey;
        return this.ready();
      }
      
    },
    setBtnStatus: function() {
      var that = this;
      var $submitBtn = $("#submit_join_btn");
      if (that.isReady()) {
        $submitBtn.removeAttr("disabled");
      } else {
        $submitBtn.attr("disabled", true);
      }
      that.reqId = requestAnimationFrame(that.setBtnStatus.bind(that));
		},
		isReady: function() {
			var that = this;
			var config = that.config.form;
			return (
				config.mobile.value &&
				config.sms_code.value
			);
		},
    goNext: function() {
      APP.router.replace("personal_center");
    },
    destroy: function() {
      //如果有事件绑定的话, 解除事件绑定
      APP.selectBottomNav(0);
    },
    
  };

  return pageInitObj;
});
