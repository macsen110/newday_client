/**
 * Created by wudi on 15/11/30.
 */
 define(['zepto', 'template'], function($, template) {  
	
	 var pageInitObj = {
		$rootDom: $('#page_container'),
		ui: {},
		ready: function (stateObj, data) {
			var html = require('./tpl/gallery.html');
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, this);
				this.show(html, data)
			}
		},
		show: function (tplScript, data) {
			APP.tools.pageCount();
			this.$rootDom.append(tplScript);
			var html = template('gallery_template', data);
			this.$rootDom.prepend(html);
			this.bindUI();
			APP.selectBottomNav(-2)
		},
		_setPageInfo: function () {
			APP.tools.setPageTitle('B超相册')
		},
		bindUI: function () {
			var self = this;
			self._setPageInfo();
			self.$rootDom.addClass('page-gallery visibile');
		   // self.$rootDom.height(self.$rootDom[0].scrollHeight);
			var $mask = self.$rootDom.find('.mask');
			self.$rootDom.find('.img').on('click', function () {
				var src = $(this).attr('src');
				var time = $(this).data('time');
				$mask.show().find('.img').attr('src', src);
				$mask.find('.date').text(time)
			})
			$mask.find('.icon-close').on('click', function () {
				$mask.hide()
			})
		},
		init: function (stateObj) {
			var self = this;
			var data = {
				request_context: {
					customerId:  APP.profileInfo.customerId,
					appType:  APP.openType,
					uid: APP.uid                    
				},
				access_token: localStorage.getItem('token'),
				system: 'mch'
			};
			$.ajax({
				url : APP.host.api + '/infanthospital/v1/childFirstTime',
				data: JSON.stringify(data),
				type : 'post',
				contentType : 'application/json',
				success: function (res) {
					if(res.ret == 1) {
						var obj = {
							data: self._todoData(res.data)
						}
						self.ready(stateObj, obj)
					}
					else {
						APP.ui.showPrompt(res.msg)
						APP.router.endLoading()
					}
				},
				error: function () {
					APP.ui.showPrompt('网络异常,请稍后重试')
					APP.router.endLoading()
				}
			})
			
		},
		_todoData: function (data) {
			var filterTime = function (time) {
				var arr = time.split('-');
				return arr[1]+'.'+arr[2]
			};
			data.forEach(function (item) {
				item.time = filterTime(item.reportDate)
			})
			return data
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.scrollTop(0);
			this.$rootDom.removeClass('page-gallery visibile');
			this.$rootDom.html('');
		} 
	};
	
	return pageInitObj

	
});
