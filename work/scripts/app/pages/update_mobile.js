/**
 * Created by wudi on 15/11/30.
 */
define(['zepto', 'template', 'ui', 'ycaptcha'], function ($, templatem, ui, ycaptcha) {
	//init page
	var pageInitObj = {
		$rootDom: APP.config.$rootRouter,
		config: {
			sms: {
				glAppId: "1138",
				templateId: "1182",
				tag: "citypartner",
				length: "6",
				glCaptchaToken: ""
			},
			weChatKey: APP.profileInfo.unionId || ''
		},
		ready: function (stateObj, data) {
		},
		show: function (tplScript) {
			var self = this;
			self.$rootDom.html(tplScript);
			self.bindUI();
		},
		bindUI: function () {
			var self = this;
			var form = self.config.form = self.$rootDom.find('form')[0];
			var $pic = $('.pic');
			self.setBtnStatus();

			form.get_sms_code.addEventListener(
				"click",
				self.getImgCard.bind(self, form.mobile.value)
			);

			form.submit_btn.addEventListener("click", function (e) {
				e.preventDefault();
				self.savePartnerMobileInfo(form);
				return false;
			});

			APP.setPointBodyData('changephonenumber');
			APP.goPointUrl();
		},
		init: function (stateObj) {
			var self = this;
			APP.selectBottomNav(-2);
			var html = require('./tpl/update_mobile.html');
			this.show(html)
		},
		destroy: function () {
		},
		checkMobile: function () {
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
		checkSmsCode: function(){
			var $smsCode = this.$rootDom.find('form')[0].sms_code.value;
			if ($smsCode.length != 6) {
				ui.showPrompt("验证码格式错误");
				return false;
			}
			return true;
		},
		getImgCard: function (mobileVal) {
			var self = this;
			if (!self.checkMobile(mobileVal)) return false;
			self.config.dialog = ui.Dialog({
				className: "get-numcode-dialog",
				content:
					'<input class="ipt" placeHolder="请输入右侧验证码"><img id="get_img_code" class="pic" src=""><div class="tip"></div>',
				foot: '<button class="btn-dialog-ok">确定</button>',
				//canMaskClose: false,
				afterOk: function () {
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
				afterOpen: function () {
					var $pic = $("#get_img_code");
					$pic.ycaptcha({
						glAppId: self.config.sms.glAppId, //此处填申请的appId
						onCheck: function (result) { }
					});
				},
				afterClose: function () {
					var that = this;
					self.config.dialog = undefined;
				}
			});
		},
		imgCheck: function ($img, valueData, btn, tip) {
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
				function (data) {
					if (data.result) {
						self.config.sms.glCaptchaToken = data.glCaptchaToken;
						self.config.dialog && self.config.dialog.destory();
						self.getSmsNextTick();
					} else {
						$img.ycaptcha({
							glAppId: self.config.sms.appId, //此处填申请的appId
							onCheck: function (result) { }
						});
						tip.classList.add("show");
						tip.innerHTML = "图形验证码输入有误";
						btn.removeAttribute("disabled");
					}
				}
			);
		},
		getSmsNextTick: function () {
			var self = this;
			var _that = self.config.form.get_sms_code;
			self.getSmsAjax(self.config.form.mobile.value);
			var counting = 60;
			if (_that.innerHTML == "重新发送" || _that.innerHTML == "获取验证码") {
				_that.setAttribute("disabled", true);
				_that.innerHTML =
					'<span class="counting">59</span><span>s后重发</span>';
				timeOutFlag = setInterval(function () {
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
		getSmsAjax: function (phone) {
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
				success: function (data) {
					if (data.result == true) {
						ui.showPrompt("发送成功");
					} else {
						ui.showPrompt("发送失败,请稍后重试!");
					}
				}
			});
		},
		setBtnStatus: function () {
			var that = this;
			var $submitBtn = $("#submit_join_btn");
			if (that.isReady()) {
				$submitBtn.removeAttr("disabled");
			} else {
				$submitBtn.attr("disabled", true);
			}

			that.reqId = requestAnimationFrame(that.setBtnStatus.bind(that));
		},
		isReady: function () {
			var self = this;
			var config = self.config.form;
			return (
				config.mobile.value &&
				config.sms_code.value
			);
		},
		savePartnerMobileInfo: function (form) {
			var self = this;
			var mobileVal = self.config.form.mobile.value;
			if (!self.checkMobile(mobileVal)) return false;
			if (!self.checkSmsCode()) return false;
			var data = {
				oldMobile: APP.profileInfo.mobile,
				newMobile: $.trim(form.mobile.value),
				unionId: self.config.weChatKey,
				smsCode: $.trim(form.sms_code.value)
			};
			APP.commonAjax.savePartnerMobileInfo(data, {
				func: function (res) {
					if(res.code == 0){
						return ui.showPrompt({
							msg: res.msg,
							cb : function() {
								APP.router.go('personal_center');
							}
						});
						return;
					}
					return ui.showPrompt(res.msg);

				}
			});
		}

	}

	return pageInitObj;
})