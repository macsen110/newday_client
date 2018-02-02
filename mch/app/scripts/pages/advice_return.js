/**
 * Created by knowthis on 16/6/29.
 */

define(['zepto','template'], function($, template) {

	//init page
	var pageInitObj = {
		$rootDom: $('#page_container'),
		ready: function (stateObj, data) {
			var self = this;
			var tplScript = require("./tpl/advice.html");
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, self);
				self.show(tplScript, data)
			}
			
		},
		show: function (tplScript, data) {
			var self = this;
			APP.tools.pageCount();
			self.$rootDom.html(tplScript);
			var html = template('advice_template', data);
			self.$rootDom.prepend(html);
			self.bindUI();
		},
		setPageInfo: function () {
			APP.tools.setPageTitle('用户反馈')
		},
		bindUI: function () {
			var self = this;
			self.setPageInfo();
			APP.selectBottomNav(-2);
			self.$rootDom.addClass('page-advice-list visibile'); 
		},
		init: function (stateObj) {
			var self = this;
			self.ready(stateObj, {})
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.removeClass('page-advice-list visibile');
			this.$rootDom.html('');
		}
	};
	return pageInitObj;
});