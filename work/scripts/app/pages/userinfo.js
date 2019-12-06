/**
 * Created by wudi on 15/11/30.
 */
define(['zepto','template'], function($, template) {  
	//init page
	var pageInitObj = {
		$rootDom: APP.config.$rootRouter,
		ready: function (stateObj, data) {
		},
		show: function (tplScript) {
			var self = this;
			self.$rootDom.html(tplScript)
			self.bindUI(); 
		},
		setPageInfo: function () {
			APP.tools.setPageTitle('基本信息')
		},
		bindUI: function () {
			var self = this; 

			$('.common-btn-light').on('click',function(){
				APP.router.go('edit_userinfo');
			})

			APP.setPointBodyData('basicinformation');
			APP.goPointUrl();
		},
		profileInfoRenderUI: function(){
            var self = this;
            var info = APP.profileInfo;
            var $appuser = $('.appuser');
            var $teamwork = $('.teamwork');
            //终端 8企业 9个人
            if(info.teamworkType == 8){
                $teamwork.find('h3').html('企业合伙人');
            } else{
                $teamwork.find('h3').html('个人合伙人');
            }
            $teamwork.find('h3').attr('data-id',info.teamworkType);
            //合作属性 1终端 0非
            if(info.isTerminalUser == 1){
                $appuser.find('h3').html('是');
            } else{
                $appuser.find('h3').html('否');
            }
            $appuser.find('h3').attr('data-id',info.isTerminalUser);
            $('.company-name').html(info.companyName);
            $('.address').html(info.companyAddress);
            $('.service-zone').html(info.serviceZone);
            
        },
		init: function (stateObj) {
			APP.selectBottomNav(-2);
			var self = this;
			var html = require('./tpl/userinfo.html');
			this.show(html)
			this.profileInfoRenderUI();
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
		}
	}

	return pageInitObj;
})