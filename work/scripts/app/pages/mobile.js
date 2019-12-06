/**
 * Created by wudi on 15/11/30.
 */
define(['zepto','template', 'common'], function($, template, common) {  
	//init page
	var pageInitObj = {
		$rootDom: APP.config.$rootRouter,
		ready: function (stateObj, data) {
		},
		show: function (tplScript) {
			var self = this;
			
			self.$rootDom.html(tplScript);
			self.setPageInfo();
			self.bindUI(); 
		},
		setPageInfo: function () {
			var self = this;
			var mobile = APP.common.formatPhone(APP.profileInfo.mobile);
			self.$rootDom.find('.more-change').html(mobile);
		},
		bindUI: function () {
			var self = this; 
			$('.common-btn-light').on('click',function(){
				APP.router.go('update_mobile',{});
			})
			APP.setPointBodyData('cellphonenumber');
			APP.goPointUrl();
		},
		
		init: function (stateObj) {
			var self = this;
			var html = require('./tpl/mobile.html');
			this.show(html);
			APP.selectBottomNav(-2);
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
		}
	}

	return pageInitObj;
})