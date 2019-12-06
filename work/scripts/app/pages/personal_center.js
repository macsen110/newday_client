/**
 * Created by wudi on 15/11/30.
 */
define(['zepto', 'template', 'ui'], function ($, template, ui) {
	//init page
	var pageInitObj = {
		$rootDom: APP.config.$rootRouter,
		ready: function (stateObj, data) {
		},
		show: function (tplScript) {
			var self = this;
			self.$rootDom.html(tplScript);
			APP.profileInfo && self.setPageInfo();
			self.bindUI();
		},
		setPageInfo: function () {
			var self = this;
			var mobile = APP.common.formatPhone(APP.profileInfo.mobile);
			self.$rootDom.find('.myphone').html(mobile);
		},
		bindUI: function () {
			APP.selectBottomNav(2);
			var self = this;
			$('.mobile').on('click',function(){
				APP.router.go('mobile');
			})
			$('.invite').on('click',function(){
				APP.router.go('invite');
			})
			$('.userinfo').on('click',function(){
				APP.router.go('userinfo');
			})
			APP.setPointBodyData('personalcenter');
			APP.goPointUrl();
		},
		init: function (stateObj) {
			var self = this;
			var html = require('./tpl/personal_center.html');
			this.show(html);
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
		}
	}

	return pageInitObj;
})