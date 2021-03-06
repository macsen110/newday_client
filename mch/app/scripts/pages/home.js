/**
 * Created by wudi on 15/11/30.
 */
 define(['zepto'], function($){  
	//初始化page  
	/**
	**@isAgreeAccredit 请求接口,验证是否授权绑卡
	**@ready 验证接口请求完成后,如果未授权调用ready，
	**@bindUI 绑定业务逻辑
	**@reqAccredit 同意授权,请求后端接口
	**@dialog 页面弹框元素,默认为undefined
	***/
	 var pageInitObj = {
		$rootDom: $('#page_container'),
		ui: {},
		ready: function (stateObj) {
			console.log('00ps 1200')
			var html = require('./tpl/home.html');
			if (!APP.router.curPathName || APP.router.curPathName == stateObj.pageName) {
				this.show(html)
			}
		},
		show: function (html) {
			APP.tools.pageCount();
			this.$rootDom.addClass('visibile');
			this.$rootDom.append(html);
			this.bindUI();
			APP.selectBottomNav(-2)
		},
		bindUI: function () {
			var self = this;
			var startIcon =  $('.page-index .icon');
			startIcon.on('click', function () {
				self.ui.dialog = APP.ui.Dialog({
					isMask: true,
					title: '提示',
					className: 'dialog-container',
					// content: '绑定就诊卡,并授权将个人信息同步给1产检,以便我们能更好的为您服务',
					content: '已开放三个院区,使用中有数据展示问题,可以在用户反馈中提交,我们尽快修复,感谢使用1产检',
					foot: '<button class="btn-dialog-ok">同意</button>',
					afterOk: function () {
						self.reqAccredit()
					}    
				});
			})
			;(function () {
				var winWidth = window.innerWidth;
				var winHeight = window.innerHeight;
				var iconHeight = self.$rootDom.find('.content .icon').height();
				var wordsHeight = self.$rootDom.find('.content .words').height();
				self.$rootDom.find('.bg').css('max-height', winHeight -iconHeight - wordsHeight - winWidth * .03 +'px')
			}())        
		},
		init: function (stateObj) {
			

			this.ready(stateObj)
		},
		reqAccredit: function () { 
			var self = this;   
			var postData = {
				request_context: {
					uid: APP.uid,
					appType : APP.openType
				},
				access_token: localStorage.getItem('token'),
				system: 'mch'
			}
			//这边写请求接口逻辑,
			//成功后跳转
			$.ajax({
				url: APP.host.api + '/infanthospital/v1/getCustomerInfo',
				data: JSON.stringify(postData),
				type : 'post',
				contentType : 'application/json',
				success : function(response) {
					//response = JSON.parse(response);
					if (response.ret == 0) {
						var emStatus = response.data.emStatus;
						self.ui.dialog && self.ui.dialog.destory();
						APP.saveProfileInfo(emStatus, response);
						return;
					}
					APP.ui.showPrompt(response.msg)
				},
				error: function () {
					APP.router.endLoading();
					APP.ui.showPrompt('网络错误,<br>请稍后重试')
				}
			})
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.html('');
			this.$rootDom.removeClass('visibile');
		} 
	}
	
	return pageInitObj

	
})
