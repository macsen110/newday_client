/**
 * Created by 梁玉森 on 11/7/30.
 */

define(['zepto','template'], function($, template) {


	var main = {
		openid:'',
		openid_origin:'',
		customerId:'',
		dialog:'',
		checkIsPay:function (stateObj) {
			var that =this;
			if(that.hasPayed != 1 && !that.openid){
				if(that.checkPlatForm() == 'weixin') {
					var authHost = APP.host.environment == 'release' ? 'https://www.macsen318.com' : 'http://www.macsen318.com';
					var url = encodeURIComponent(authHost+'/weixin_auth_callback?redirect_url=' + location.origin + location.pathname+'?openId='+APP.uid+'&appType=1&pageName=package_detail');
					var main_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4f1572bf2c6cdb5c&redirect_uri=' +
						url + '&response_type=code&scope=snsapi_base#wechat_redirect';
					window.location.href = main_url;
					return;
				}else{
					that.openid = that.openid_origin;
				}
			}
			that.ready(stateObj);
		},
		setCustomerId:function () {
			var that =this;
			that.customerId = APP.profileInfo.customerId;
			if(that.hasPayed == 1) $('.container').addClass('payed')
		},
		checkPlatForm:function () {
			var that =this;
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = /micromessenger/i.test(ua) || /windows phone/i.test(ua);
			var trueOrFalse;
			if(isWeixin){
				trueOrFalse = 'weixin';
			}else{
				trueOrFalse = 'alipay';
			}
			return trueOrFalse;
		},
		commonAjax:function (url,data,callback) {
			var main_data = {};
			main_data.system = 'ios';
			main_data.app_version  = '9';
			main_data.system_version = '7.0';
			main_data.request_context=JSON.stringify(data);
			main_data.access_token = localStorage.getItem('token');
			main_data.system = 'mch'
			$.ajax({
				url:APP.host.api + url,
				type:'POST',
				dataType:'json',
				data:JSON.stringify(main_data),
				contentType:'application/json',
				success:function (response) {
					if(+response.ret == 1){
						if (!callback) return;
						var callbackFunc = callback.func,
							callbackContext = callback.context;
						callbackFunc && typeof(callbackFunc) == 'function' && callbackFunc.call(callbackContext, response.data);
					}else{
						alert(response.msg)
					}

				}
			})
		},
		createTrack:function () {
			var date = new Date();
			var month = '',day='',minutes='',hours='',seconds='';
			var year = String(date.getFullYear());
			if((date.getMonth()+1) <10){
				month = "0"+String(date.getMonth()+1);
			}else{
				month =String(date.getMonth()+1);
			}
			if(date.getDay() <10){
				day = "0"+String(date.getDay())
			}else{
				day = String(date.getDay())
			}
			if(date.getHours() <10){
				hours = "0"+String(date.getHours())
			}else{
				hours = String(date.getHours())
			}

			if(date.getMinutes() <10){
				minutes = "0"+String(date.getMinutes())
			}else{
				minutes = String(date.getMinutes())
			}
			if(date.getSeconds() <10){
				seconds = "0"+String(date.getSeconds())
			}else{
				seconds = String(date.getSeconds())
			}


			var str = year+month+day+hours+minutes+seconds;
			return str;
		},
		goToPayFunc:function () {
			var that =this;
			var data = {
				openId_chanjian:that.openid_origin,
				openId_yizhen:that.openid,
				customerId : that.customerId,
				tradeId : "YCJ"+that.createTrack()
			};
			if(that.checkPlatForm()== 'weixin'){
				data.paymentType = 1;
				that.commonAjax('/infanthospital/v1/do_pay',data,{
					func: that.weiXinPay,
					context:that
				})
			}else if(that.checkPlatForm()== 'alipay'){
				data.paymentType = 2;
				that.commonAjax('/infanthospital/v1/do_pay',data,{
					func: that.alipay,
					context:that
				})
			}else{
				console.log("没有任何返回")
			}
		},
		alipay:function (data) {
			$(".pay_form").html(data.sign);
			$("#alipaysubmit").submit()

		},
		weiXinPay:function(data){
			var that =this;
			that.weixin = data.js_wx_pay;
			var weixin  = that.weixin;
			var postData = {
				request_context: {
					system:'ios',
					app_version:'9',
					access_token:'123',
					system_version:'7.0',
					phone_model:'iphone6',
					meid:'SASDASDSD',
					p_version:'1.1.2',
					url:window.location.href
				},
				access_token: localStorage.getItem('token'),
				system: 'mch'
			}
			try {
				$.ajax({
					url:APP.host.api + '/infanthospital/v1/getTicket',
					type:'POST',
					data: JSON.stringify(postData),
					contentType : 'application/json',
					success:function (response) {
						if(+response.ret == 1){
							var data = response.data.data;
							wx.config({
								debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								appId: data.appid, // 必填，公众号的唯一标识
								timestamp: data.timestamp, // 必填，生成签名的时间戳
								nonceStr: data.nonceStr, // 必填，生成签名的随机串
								signature: data.signature,// 必填，签名，见附录1
								jsApiList: [
									'chooseWXPay',
									'hideOptionMenu',
								]
							});
							wx.ready(function () {
								wx.chooseWXPay({
									timestamp: weixin.timeStamp,
									nonceStr: weixin.nonceStr,
									package: weixin.package,
									signType: "MD5",
									paySign:  weixin.paySign,
									success: function (res) {
										that.openDialog.destory();
										APP.profileInfo.superMm = 1;
										APP.router._gotoPage({pageName: 'package_detail', replace: 1})
									},
									error:function (res) {
										that.openDialog.destory();
									},
									cancel:function (res) {
										that.openDialog.destory();
									}
								});
							})
						}else{
							alert(response.msg)
						}

					}
				})
			}
			catch(e) {
				alert(e)
			}
			
		},
		bindUI:function () {
			var that =this;
			// var width = window.innerWidth ;
			// var html = document.getElementsByTagName('html')[0].style.fontSize = width/10+'px';
			/**
			 * 标题点击
			 */
			$(".content-item").on('click',function () {
				var content_body = $(this).find('.content-body');
				if(content_body.hasClass('active')){
					$(this).find('.content-status').text('v');
					content_body.removeClass('active');
					$(this).find('.content-more-title ').text('查看详情')
				}else{
					$(this).find('.content-status').text('^');
					$(this).find('.content-more-title ').text('点击收起')
					content_body.addClass('active');
				}

			});
			/**
			 * 阻止 内容点击 冒泡
			 */
			$(".content-body").on("click",function (e) {
				e.preventDefault();

				return false;
			});
			/**
			 * 播放声音
			 */
			$(".grow-voice-main").on('click',function (e) {
				e.preventDefault();
				var audio = $(".voice-main")[0];
				if(audio.paused){
					audio.play();
				}else{
					audio.pause();
				}

				return false;
			});
			/**
			 * 点击支付
			 */
			$(".goPay, .update-package-btn").on('click',function (e) {
				e.preventDefault();
				if (!APP.profileInfo.dateLmpChange) that._editLmp()
				else that._showAgreement()
				return false;
			})
			var dateLmp = APP.profileInfo.dateLmpChange ? APP.profileInfo.dateLmpChange : APP.profileInfo.dateLmp;
			var dateChildbirth = APP.profileInfo.dateChildbirthChange ? APP.profileInfo.dateChildbirthChange : APP.profileInfo.dateChildbirth;
			//绑卡非孕妇,隐藏购买入口
			if (!dateLmp) that.$rootDom.find(".goPay, .update-package-btn").hide();
			that.$rootDom.find('.select-childBirth-date').val(dateChildbirth);
			that.$rootDom.find('.select-lmp-date').val(dateLmp);
			APP.tools.selectValueChange(that.$rootDom.find('.select-childBirth-date'), that._changeDateChildbirth.bind(that))
			APP.tools.selectValueChange(that.$rootDom.find('.select-lmp-date'), that._changeDateLmp.bind(that))
			
		},
		 _getSerializeDate: function (date) {
			var newArr = date.split('-');
			return newArr
		},
		_showAgreement: function () {
			var that = this;
			var agInnerHtml =  require('./tpl/package_ag.html');
			that.openDialog && that.openDialog.close();
			that.openDialog = APP.ui.Dialog({
				isMask: true,
				title: '<i class="icon-dialog-cancel">X</i>',
				className: 'dialog-pay page-package-ag',
				content: agInnerHtml,
				foot: '<button class="btn-dialog-ok">同意条款并升级</button>',
				afterOpen:function () {
					var self =this;
				},
				afterOk: function () {
					that.goToPayFunc();
				}
			});

		},
		_editLmp: function () {
			var self = this;
			var dateLmp = APP.profileInfo.dateLmpChange ? APP.profileInfo.dateLmpChange : APP.profileInfo.dateLmp;
			var dateLmpArr = self._getSerializeDate(dateLmp);
			self.openDialog && self.openDialog.close();
			self.openDialog = APP.ui.Dialog({
				isMask: true,
				title: '<i class="icon-dialog-cancel">X</i>',
				className: 'edit-profile-dialog',
				content: '<p>您的末次月经是</p><p class="time">'+dateLmpArr[0]+'年'+dateLmpArr[1]+'月'+dateLmpArr[2]+'日</p><p class="tip">末次月经只能修改一次</p>',
				foot: '<label for="profile_select_date_lmp" class="btn btn-label">我要修改</label><button class="btn btn-dialog-ok">已核实</button>',
				afterOpen: function () {
					var that = this;
					if (APP.tools.platform() == 2) {//设备为ios时,触发时间选择器, 弹框消失
						$(that.container).find('.btn-label').on('click', function () {
							setTimeout(function () {
								that.destory()
							},200)
						})
					}
				},
				afterOk: function () {
					// var that = this;
					// that.destory()
					self._saveDateLmp(dateLmp)
				}    
			})

		},
		_editBirth: function (channel) {
			var self = this;
			var dateChildbirth = APP.profileInfo.dateChildbirthChange ? APP.profileInfo.dateChildbirthChange : APP.profileInfo.dateChildbirth;
			var dateBirthArr = self._getSerializeDate(dateChildbirth);
			self.openDialog && self.openDialog.close();
			self.openDialog = APP.ui.Dialog({
				isMask: true,
				title: '<i class="icon-dialog-cancel">X</i>',
				className: 'edit-profile-dialog',
				content: '<p>您的预产期是否正确</p><p class="time">'+dateBirthArr[0]+'年'+dateBirthArr[1]+'月'+dateBirthArr[2]+'日</p>',
				foot: '<label for="profile_select_date_birth" class="btn btn-label">修改</label><button class="btn btn-dialog-ok">就是这天</button>',
				afterOpen: function () {
					var that = this;
					if (APP.tools.platform() == 2) {//设备为ios时,触发时间选择器, 弹框消失
						$(that.container).find('.btn-label').on('click', function () {
							setTimeout(function () {
								that.destory()
							},200)
						})
					}
				},
				afterOk: function () {
					var that = this;
					that.destory();
					self._showAgreement()
				}
			})
		},

		_changeDateChildbirth: function (val) {
			var self = this;
			var dateChildbirth = APP.profileInfo.dateChildbirthChange ? APP.profileInfo.dateChildbirthChange : APP.profileInfo.dateChildbirth;
			var dateLmp = APP.profileInfo.dateLmpChange ? APP.profileInfo.dateLmpChange : APP.profileInfo.dateLmp;
			if (APP.tools.platform() == 2 && (!val || val == dateChildbirth)) {
				self._editBirth();
				return;
			}
			if (val.length > 0 && val!= dateChildbirth) {
				if (val <= dateLmp) {
					APP.ui.showPrompt('预产期不能小于或者等于末次月经');
					return;
				}
				var valArr = self._getSerializeDate(val);
				self.openDialog && self.openDialog.close();
				self.openDialog = APP.ui.Dialog({
					isMask: true,
					title: '<i class="icon-dialog-cancel">X</i>',
					className: 'edit-profile-dialog',
					content: '<p>是否修改预产期为</p><p class="time">'+valArr[0]+'年'+valArr[1]+'月'+valArr[2]+'日</p>',
					foot: '<label for="profile_select_date_birth" class="btn btn-label">我要修改</label><button class="btn btn-dialog-ok">已核实</button>',
					afterOpen: function () {
						var that = this;
						if (APP.tools.platform() == 2) {//设备为ios时,触发时间选择器, 弹框消失
							$(that.container).find('.btn-label').on('click', function () {
								setTimeout(function () {
									that.destory()
								},200)
							})
						}
					},
					afterOk: function () {
						self._saveDateChildBirth(val)
					}    
				 })
				
			}
		},
		_saveDateChildBirth: function (val) {
			var self = this;
			var data = {
				request_context: {
					customerId: APP.profileInfo.customerId,
					uid : APP.uid,
					dateChildbirthChange: val
				},
				access_token: localStorage.getItem('token'),
				system: 'mch'
			}
			$.ajax({
				url : APP.host.api + '/infanthospital/v1/changeChildbirth',
				data: JSON.stringify(data),
				type : 'post',
				contentType : 'application/json',
				success : function(response) {
					APP.router.endLoading();
					if (response.ret == 1) {
						//APP.ui.showPrompt('修改成功');
						APP.profileInfo.dateChildbirthChange = val;
						self.openDialog && self.openDialog.close();
						self._showAgreement()
					}
				}
			})            
		},
		_changeDateLmp: function (val) {
			var self = this;
			var dateChildbirth = APP.profileInfo.dateChildbirthChange ? APP.profileInfo.dateChildbirthChange : APP.profileInfo.dateChildbirth;
			var dateLmp = APP.profileInfo.dateLmpChange ? APP.profileInfo.dateLmpChange : APP.profileInfo.dateLmp;
			if (APP.tools.platform() == 2 && (!val || val == dateLmp)) {
				self._editLmp();
				return;
			}
			if (val.length > 0 && val!= dateLmp) {
				if (val >= dateChildbirth) {
					APP.ui.showPrompt('末次月经不能大于或者等于预产期');
					return;
				}
				var today =  new Date().getFullYear() + '-' + (new Date().getMonth()+1 >= 10 ? (+new Date().getMonth()+1) : '0'+(+new Date().getMonth()+1)) + '-'+(new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate());
				if (val > today) {
					APP.ui.showPrompt('末次月经不能大于今天');
					return;
				}
				var valArr = self._getSerializeDate(val);
				self.openDialog && self.openDialog.close();
				self.openDialog = APP.ui.Dialog({
					isMask: true,
					title: '<i class="icon-dialog-cancel">X</i>',
					className: 'edit-profile-dialog',
					content: '<p>是否修改末次月经为</p><p class="time">'+valArr[0]+'年'+valArr[1]+'月'+valArr[2]+'日</p><p class="tip">末次月经只能修改一次</p>',
					foot: '<label for="profile_select_date_lmp" class="btn btn-label">我要修改</label><button class="btn btn-dialog-ok">已核实</button>',
					afterOpen: function () {
						var that = this;
						if (APP.tools.platform() == 2) {//设备为ios时,触发时间选择器, 弹框消失
							$(that.container).find('.btn-label').on('click', function () {
								setTimeout(function () {
									that.destory()
								},200)
							})
						}
					},
					afterOk: function () {
						self._saveDateLmp(val)
					}    
				 })
			}
		},
		_saveDateLmp: function (val) {
			var self = this;
			var $dateChildbirthIpt = self.$rootDom.find('.select-childBirth-date')
			var data = {
				request_context: {
					customerId: APP.profileInfo.customerId,
					uid : APP.uid,
					dateLmpChange: val,
				},
				access_token: localStorage.getItem('token'),
				system: 'mch'                
			}
			$.ajax({
				url : APP.host.api + '/infanthospital/v1/changeDateLmp',
				data: JSON.stringify(data),
				type : 'post',
				contentType : 'application/json',
				success : function(response) {
					self.openDialog.close();
					APP.router.endLoading();
					if (response.ret == 1) {
						sessionStorage.clear();
						APP.profileInfo.dateLmpChange = val;
						APP.profileInfo.dateChildbirthChange = response.data.dateChildbirthChange;
						$dateChildbirthIpt.val(response.data.dateChildbirthChange);
						self._editBirth(1)
					}
					else APP.ui.showPrompt(response.msg);
				},
				error: function () {
					self.openDialog.close();
				}
			}) 
		},
		getLocationParam :function () {
			var url = window.location.search;
			var params = url.toString().slice(1).split("&");
			var returnObject = {};
			for(var i = 0; i != params.length; i++) {
				var index = params[i].indexOf("=");
				returnObject[params[i].slice(0, index)] = params[i].slice(index+1);
			}
			return returnObject;
		},
		$rootDom: $('#page_container'),
		ready: function (stateObj) {
			var html = require('./tpl/package_detail.html');
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, this)
				this.show(html)
			}
		},
		show: function (html) {
			this.$rootDom.addClass('visibile');
			this.$rootDom.append(html);
			this.$rootDom.addClass('page-package-detail visibile');
			this.bindUI();
			this.setCustomerId();
			APP.selectBottomNav(-2)
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.openDialog && this.openDialog.destory();
			this.$rootDom.removeClass('visibile page-package-detail');
			this.$rootDom.html('');
			
		}

	};
	main.init = function (stateObj) {
		var that =this;
		if(that.getLocationParam().openId != ''){
			that.openid_origin = APP.uid;
		}
		if(that.getLocationParam().open_id != ''){
			that.openid = that.getLocationParam().open_id;
		}
		that.hasPayed = APP.profileInfo.superMm;
		that.checkIsPay(stateObj);
	};
	return main;
});