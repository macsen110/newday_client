/**
 * Created by wudi on 15/11/30.
 */
 define(['zepto'], function($){  
	
	 var pageInitObj = {
		$rootDom: $('#page_container'),
		ui: {},
		ready: function (stateObj) {
			var html = require('./tpl/select_pregnant_status.html');
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, this);
				this.show(stateObj, html)
			}
		},
		show: function (stateObj, html) {
			APP.tools.pageCount();
			this.$rootDom.addClass('page-select-pregnant visibile');
			this.$rootDom.append(html);
			this.bindUI(stateObj);
			APP.selectBottomNav(-2)
		},
		bindUI: function (stateObj) {
			var self = this;
			//点击十月皇后
			self.$rootDom.find('.select-pregnant').on('click', function () {
				$(this).find('input').attr('checked', true);
				setTimeout(function () {
					if (APP.router.curPathName == stateObj.pageName) {
						APP.router._gotoPage({pageName: 'pregnant_record', pregnantStatus: 1})
					}
				}, 1000)
				sessionStorage.setItem('select_pregnant_status', 1)
				
				APP.tools.recordBehavior('/infanthospital/v1/superApply', {applyType: 1})
			})
			//点击新晋辣妈
			self.$rootDom.find('.select-mother').on('click', function () {
				if (APP.profileInfo.childState == 0) {
					APP.ui.showPrompt('等宝宝出生后再来试试吧~')
					return;
				}
				sessionStorage.setItem('select_pregnant_status', 2)
				$(this).find('input').attr('checked', true);
				APP.router._gotoPage({pageName: 'declare_safety', pregnantStatus: 2})
				APP.tools.recordBehavior('/infanthospital/v1/superApply', {applyType: 2})
			})
		},
		init: function (stateObj) {
			this.ready(stateObj)
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.html('');
			this.$rootDom.removeClass('page-select-pregnant visibile');
		} 
	};
	
	return pageInitObj

	
});
