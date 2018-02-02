/**
 * Created by knowthis on 16/6/30.
 */

define(['zepto','template'], function($, template) {

	//init page
	var pageInitObj = {
		$rootDom: $('#page_container'),
		hasInput:0,
		ready: function (stateObj, data) {
			var self = this;
			var tplScript = require("./tpl/aboutUs.html");
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, self);
				self.show(tplScript, data)
			}
		},
		show: function (tplScript, data) {
			var self = this;
			APP.tools.pageCount();
			self.$rootDom.html(tplScript);
			data.version = 'v '+APP.version;
			var html = template('advice_us_template', data);
			self.$rootDom.prepend(html);
			self.bindUI(tplScript, data);
		},
		setPageInfo: function () {
			APP.tools.setPageTitle('关于我们')
		},
		bindUI: function (tplScript, data) {
			var self = this;
			self.setPageInfo();
			self.$rootDom.addClass('page-about-us visibile');
			APP.selectBottomNav(-2)
		},
		_getUserInfo: function (stateObj) {
			var self = this;
			self.ready(stateObj, APP.profileInfo);
		},
		init: function (stateObj) {
			
			var self = this;
			self._getUserInfo(stateObj);
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.removeClass('visibile page-about-us');
			this.$rootDom.html('');
			
		}
	};
	return pageInitObj;
});