/**
 * Created by wudi on 15/11/30.
 */
 define(['zepto', 'template'], function($, template){  
	
	 var pageInitObj = {
		$rootDom: $('#page_container'),
		ui: {},
		ready: function (stateObj) {
			var tplScript = require('./tpl/baby_first_seen.html');
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, this);
				this.show(tplScript)
			}
		},
		show: function (tplScript) {
			var self = this;
			APP.tools.pageCount();
			this.$rootDom.addClass('page-first-seen visibile');
			this.$rootDom.html(tplScript);
			var html = APP.profileInfo.superMm == 1 ? template('payed_template', {})
			:template('un_payed_template', {});
			self.$rootDom.prepend(html);
			this.bindUI();
			APP.selectBottomNav(-2);
			APP.tools.setPageTitle('健康日记')
		},
		bindUI: function () {
			var self = this;
			$('body').addClass('bg-body-linner');
			
		},
		init: function (stateObj) {
			this.ready(stateObj)
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.html('');
			this.$rootDom.removeClass('page-first-seen visibile');
			$('body').removeClass('bg-body-linner');
		} 
	};
	return pageInitObj
});
