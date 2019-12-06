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
			self.bindUI();
		},
		bindUI: function () {
			APP.selectBottomNav(1);
			APP.goPointUrl();
		},
		init: function (stateObj) {
			var self = this;
			var html = require('./tpl/salary_detail.html');
			this.show(html);
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
		}
	}

	return pageInitObj;
})