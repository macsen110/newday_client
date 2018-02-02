/**
 * Created by wudi on 15/11/30.
 */
 define(['zepto'], function($){  
	
	 var pageInitObj = {
		$rootDom: $('#page_container'),
		ui: {},
		ready: function (stateObj) {
			var html = require('./tpl/create_safety_share.html');
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, this)
				this.show(stateObj,html)
			}
		},
		show: function (stateObj, html) {
			var self = this;
			APP.tools.pageCount();
			this.$rootDom.addClass('page-create-safety-share visibile');
			this.$rootDom.append(html);
			self.$rootDom.find('.hold-create-img img').attr('src', decodeURIComponent(stateObj.pic));
			this.bindUI(stateObj);
			APP.selectBottomNav(-2)
		},
		bindUI: function (stateObj) {
			var self = this;
		},
		init: function (stateObj) {
			var self = this;
			var img = new Image();
			img.src = decodeURIComponent(stateObj.pic);
			img.onload = function () {
				self.ready(stateObj);
				
			}
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.html('');
			this.$rootDom.removeClass('page-create-safety-share visibile');
		} 
	}
	
	return pageInitObj

	
})
