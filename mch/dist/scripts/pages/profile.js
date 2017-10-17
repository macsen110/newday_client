/**
 * Created by wudi on 15/11/30.
 */
 define(['zepto','template'], function($, template) {  

	//init page
	var pageInitObj = {
		$rootDom: $('#page_container'),
		ready: function (stateObj, data) {
			template.helper('dataPhone',function(phone){
				var newPhone = phone.slice(0,3)+"******"+phone.slice(9);
				return newPhone;
			});
			var self = this;
			var tplScript = require("./tpl/profile.html"); 
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, self);
				self.show(tplScript, data)
			}
		},
		show: function (tplScript, data) {
			APP.recordsObj.record({page_id: 600000});
			var self = this;
			APP.tools.pageCount();
			self.$rootDom.html(tplScript);
			var html = template('profile_template', data);
			self.$rootDom.prepend(html);
			APP.selectBottomNav(2);
			self.bindUI(); 
		},
		setPageInfo: function () {
			APP.tools.setPageTitle('个人中心')
		},
		
		bindUI: function () {
			var self = this; 
			self.setPageInfo();
			self.$rootDom.addClass('page-profile visibile'); 
			var $changeCard = self.$rootDom.find('.change-card');
			var $adviceReturn = self.$rootDom.find('.advice-return');
			//修改日期弹框
			self.$rootDom.find('.edit-lmp-focus').on('click', self._editLmp.bind(this));
			self.$rootDom.find('.edit-birth-focus').on('click', self._editBirth.bind(this));
			APP.tools.selectValueChange(self.$rootDom.find('.select-childBirth-date'), self._changeDateChildbirth.bind(self))
			APP.tools.selectValueChange(self.$rootDom.find('.select-lmp-date'), self._changeDateLmp.bind(self))
		},
		_getSerializeDate: function (date) {
			var newArr = date.split('-');
			return newArr
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
					that.destory()
					//self._saveDateChildBirth(dateChildbirth)
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
			var $dateChildbirth = self.$rootDom.find('.date-child-birth')
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
						self.openDialog && self.openDialog.close();
						//APP.ui.showPrompt('修改成功');
						$dateChildbirth.text(val)
						APP.profileInfo.dateChildbirthChange = val;
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
			var $dateLmp = self.$rootDom.find('.date-lmp');
			var $dateChildbirth = self.$rootDom.find('.date-child-birth')
			var $selectDateFocus = self.$rootDom.find('.edit-lmp-focus');
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
						$selectDateFocus.remove();
						//APP.ui.showPrompt('修改成功');
						sessionStorage.clear();
						$dateLmp.text(val);
						APP.profileInfo.dateLmpChange = val;
						$dateChildbirth.text(response.data.dateChildbirthChange);
						self.$rootDom.find('.select-childBirth-date').val(response.data.dateChildbirthChange);
						APP.profileInfo.dateChildbirthChange = response.data.dateChildbirthChange;
						self._editBirth(1)
					}
					else APP.ui.showPrompt(response.msg);
				},
				error: function () {
					self.openDialog.close();
				}
			}) 
		},
		bindCard: function (stateObj, data) {
			var self = this;
			self.isBindCard = true;
			self.ready(stateObj, data);
		},
		unbindCard: function (stateObj, data) {
			var self = this;
			self.isBindCard = false;
			data.bindCardUrl = APP.openType  == 1 ? 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe9b29693633b2e6f&redirect_uri=https%3A%2F%2Fh5.shqmxx.com%2FResource.aspx%3FCustomerId%3D77%26Pri%3D2F6242724A346747504136312B2F53773568446C4A4A504F754B3467667775574351314D4262352B564236576444514158486E4150664155726172343274686A665537303654587444435274424B4832347530415032654B58655A7A61376B3551534958757666477474314F4B42704E704F64624C3333756B5358783476722B54756A64366B3657346B576C63636A2F6455784C56673D3D%26UiServiceId%3Dgh_f6090761f9dc%26UItype%3Dwx%26IsMenu%3D1%26Version%3D1.1%26ForwardUIUserId%3DoTqovuCyWUNksPVsdOzvIGaUhnOk&response_type=code&scope=snsapi_base&state=d3hlOWIyOTY5MzYzM2IyZTZmJTJjYTAxMjk3YjExYmZmZTI2YzE4ZTcxZjQyNGQ3YWUwNmMlMmMw#wechat_redirect' : 'http://alipay.51mch.com/HTML/myCardList.html?userID='+encodeURIComponent(APP.uid);
			self.ready(stateObj, data);
		},
		init: function (stateObj) {
			var self = this;
			var profileInfo = APP.profileInfo;
			if (profileInfo.emStatus == 1) self.unbindCard(stateObj, profileInfo) 
			if (profileInfo.emStatus == 2) self.bindCard(stateObj, profileInfo);
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.removeClass('visibile page-profile'); 
			this.$rootDom.html('');
			var self = this;
			self.openDialog && self.openDialog.close();
			Object.keys(self).forEach(function (key) {
				if (typeof self[key] != 'function' && key != '$rootDom') delete self[key];
			})
		}
	}

	return pageInitObj;
})