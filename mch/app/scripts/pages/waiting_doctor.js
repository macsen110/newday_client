/**
 * Created by liangyusen on 15/11/30.
 */
 define(['zepto','template'], function($, template) {    
	//init page
	var pageInitObj = {
		$rootDom: $('#page_container'),
		isBindCard: false,
		ready: function (stateObj, data) {
			var self = this;
			var tplScript = require("./tpl/waiting_doctor.html");
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, self);
				self.show(tplScript, data);
			}
		},
		show: function (tplScript, data) {
			var self = this;
			APP.tools.pageCount();
			self.$rootDom.html(tplScript);
			var html;
			if (data.isToday == 1) html = template('wait_unbind_card_template', data) 
			else html = self.isBindCard ? template('wait_bind_card_template', data) : template('wait_unbind_card_template', data);   
			self.$rootDom.prepend(html);
			APP.selectBottomNav(1);
			self.bindUI(); 
		},
		setPageInfo: function () {
			APP.tools.setPageTitle('我的候诊')
		},
		bindUI: function () {
			var self = this;
			self.setPageInfo();
			self.$rootDom.addClass('page-wait-doctor visibile');
			$('.unbind-card-container .widget-tip-box').on('click',function(){
				var hrefvalue = $(this).attr('data-href');
				setTimeout(function(){
					window.location.href = hrefvalue;
				},800)
			})
			if (self.isBindCard && !sessionStorage.getItem('queueIsToday')) self._startTimeCount();
		},
		init: function (stateObj) {
			var self = this;
			var profileInfo = APP.profileInfo;
			if (profileInfo.emStatus == 1) self.unbindCard(stateObj) 
			if (profileInfo.emStatus == 2) self.bindCard(stateObj);
		},
		bindCard: function (stateObj) {
			//this need to request bindCard ajax
			var self = this;
			self.isBindCard = true;
			var profileInfo = APP.profileInfo;
			if (sessionStorage.getItem('queueIsToday')) {
				var data = {
					isToday: 1
				}
				self.ready(stateObj, data);
				return;
			}
			var postData = {
				request_context: {
					uid: profileInfo.uid,
					customerId: profileInfo.customerId,
					appType : APP.openType
				},
				access_token: localStorage.getItem('token'),
				system: 'mch'
			}
			$.ajax({
				url: APP.host.api + '/infanthospital/v1/getQueueInfo',
				type: 'post',
				data: JSON.stringify(postData),
				contentType: 'application/json',
				success: function (res) {
					if (res.ret == 1) {
						res = self._todoResult(res.data);
						if (res.isToday == 1) {
							sessionStorage.setItem('queueIsToday', res.isToday)
						}
						self.ready(stateObj, res);
						return;
					}
					APP.router.endLoading();
					APP.ui.showPrompt(res.msg);
				},
				error: function () {
					APP.router.endLoading();
					APP.ui.showPrompt('网络错误,<br>请稍后重试')
				}
			})
			
		},
		unbindCard: function (stateObj) {
			var self = this;
			var unbindCardUrl = APP.openType  == 1 ? 'https://wxapi.shqmxx.com/WXOAuth/AuthReceivePage.aspx?customerId=77&applicationId=2b0ff89f27584e3ab81d44d060a4271e&goUrl=https://h5.shqmxx.com/Template/Resource.aspx?Pri=QM.CSFP.77.DIS.UserManage-Binding' : 'http://alipay.51mch.com/HTML/myCardList.html?userID='+encodeURIComponent(APP.uid);
			self.ready(stateObj, {uid: APP.uid,unbindCardUrl:unbindCardUrl});            
		},
		_todoResult: function (result) {
			var self = this;
			return result
		},
		_startTimeCount: function () {
		  var self = this;
		  self.timeCount = setInterval(function () {
			  APP.router._gotoPage({replace: 1, pageName: 'waiting_doctor'})
		  }, 10000)  
		},
		_endTimeCount: function () {
			var self = this;
			clearInterval(self.timeCount)
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.html('');
			this.$rootDom.removeClass('visibile page-wait-doctor');
			this._endTimeCount();
		}
	}
	
	
	return pageInitObj;
})