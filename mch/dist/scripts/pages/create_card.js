/**
 * Created by 梁玉森 on 11/7/30.
 */

define(['zepto','template'], function($, template) {

	//init page
	var pageInitObj = {
		$rootDom: $('#page_container'),
		ready: function (stateObj, data) {
			var self = this;
			var tplScript = require("./tpl/create_card.html");
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, self);
				self.show(tplScript, data)
			}
		},
		show: function (tplScript, data) {
			var self = this;
			APP.tools.pageCount();
			self.$rootDom.html(tplScript);
			var html = template('create_card_template', data);
			self.$rootDom.prepend(html);
			self.bindUI();

		},
		setPageInfo: function () {
			APP.tools.setPageTitle('建卡预约单')
		},
		bindUI: function () {
			var self = this;
			self.setPageInfo();
			self.$rootDom.addClass('page-create-card visibile');
		},
		init: function (stateObj) {
			var self = this;
			self.ready(stateObj, APP.profileInfo);
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.removeClass('visibile page-profile');
			this.$rootDom.html('');
		}
	};
	return pageInitObj;
});