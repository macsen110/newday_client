/**
 * Created by wudi on 15/11/30.
 */
 define(['zepto', 'template'], function($, template) {  
	
	 var pageInitObj = {
		$rootDom: $('#page_container'),
		ready: function (stateObj) {
			var html = require('./tpl/advice_superMother_detail.html');
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, this);
				this.show(html, stateObj.qid)
			}
		},
		show: function (tplScript, qid) {
			APP.tools.pageCount();
			this.$rootDom.append(tplScript);
			this.bindUI(qid);
			APP.selectBottomNav(-2)
		},
		_setPageInfo: function () {
			APP.tools.setPageTitle('常见问题')
		},
		bindUI: function (qid) {
			var self = this;
			self._setPageInfo();
			self.$rootDom.addClass('page-advice-superMother-detail visibile');
			self.$rootDom.find('.q-list .box').eq(qid-1).show()
			self.$rootDom.find('.a-list .box').eq(qid-1).show()
		},
		init: function (stateObj) {
			var self = this;
			self.ready(stateObj)
		},
		_getPageData: function (qid) {

			return pageData[qid];
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.html('');
			this.$rootDom.removeClass('page-advice-superMother-detail visibile');
		} 
	};
	
	return pageInitObj

	
});
