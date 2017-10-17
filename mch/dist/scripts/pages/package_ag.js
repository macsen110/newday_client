/**
 * Created by wudi on 15/11/30.
 */
 define(['zepto'], function($){  
	
	 var pageInitObj = {
		$rootDom: $('#page_container'),
		ui: {},
		ready: function (stateObj) {
			var html = require('./tpl/package_ag.html');
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, this)
				this.show(html)
			}
		},
		show: function (html) {
			APP.tools.pageCount();
			this.$rootDom.addClass('page-package-ag visibile');
			this.$rootDom.append(html);
			this.bindUI();
			APP.selectBottomNav(-2)
		},
		bindUI: function () {
			var self = this;
		},
		init: function (stateObj) {
			this.ready(stateObj)
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.html('');
			this.$rootDom.removeClass('page-package-ag visibile');
		} 
	}
	
	return pageInitObj

	
})
