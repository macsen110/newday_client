/**
 * Created by wudi on 15/11/30.
 */
 define(['zepto', 'template'], function($, template) {  
	
	 var pageInitObj = {
		$rootDom: $('#page_container'),
		ready: function (stateObj) {
			var html = require('./tpl/advice_superMother_list.html');
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, this);
				this.show(html)
			}
		},
		show: function (tplScript) {
			APP.tools.pageCount();
			this.$rootDom.append(tplScript);
			this.bindUI();
			APP.selectBottomNav(-2)
		},
		_setPageInfo: function () {
			APP.tools.setPageTitle('常见问题')
		},
		bindUI: function () {
			var self = this;
			self._setPageInfo();
			self.$rootDom.addClass('page-advice-list visibile');
		},
		init: function (stateObj) {
			var self = this;
			self.ready(stateObj)
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.html('');
			window.scrollTo(0, 0)
			this.$rootDom.removeClass('page-advice-list visibile');
		} 
	};
	
	return pageInitObj

	
});
