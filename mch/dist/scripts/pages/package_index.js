/**
 * Created by wudi on 15/11/30.
 */
 define(['zepto'], function($){  
	
	 var pageInitObj = {
		$rootDom: $('#page_container'),
		ui: {},
		ready: function (stateObj) {
			var html = require('./tpl/package_index.html');
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, this)
				this.show(html)
			}
		},
		show: function (html) {
			APP.tools.pageCount();
			this.$rootDom.addClass('page-package-index visibile');
			this.$rootDom.append(html);
			this.bindUI();
			APP.selectBottomNav(-2)
		},
		bindUI: function () {
			var self = this;
			self.$rootDom.find('.content-item .icon').on('click', function () {
				var pageName = $(this).data('href');
				if (pageName == 'gallery') APP.tools.recordBehavior('/infanthospital/v1/superApply', {applyType: 4})
				if (pageName == 'declare_safety') APP.tools.recordBehavior('/infanthospital/v1/superApply', {applyType: 3})
				APP.router.gotoPage({pageName: pageName})
			})
		},
		init: function (stateObj) {
			this.ready(stateObj)
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.html('');
			this.$rootDom.removeClass('page-package-index visibile');
		} 
	}
	
	return pageInitObj

	
})
