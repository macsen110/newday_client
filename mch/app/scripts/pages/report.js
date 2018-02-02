define(['zepto', 'template'], function ($, template) {
	var pageInitObj = {
		$rootDom: $('#page_container'),
		init: function (stateObj) {
			var self = this;
			var url = '/infanthospital/v1/getReportListDetail';
			var data;
			var repType = stateObj.repType;
			var reportName = stateObj.reportName;
			var objData = {
				request_context: {
					uid: APP.uid,
					repType:repType,
					customerId: APP.profileInfo.customerId,
					reportId: stateObj.reportId,
					appType : APP.openType,
					weekPregnant: stateObj.weekPregnant,
				},
				access_token: localStorage.getItem('token'),
				system: 'mch'
			};
			function oAjax(url){
				$.ajax({
					url:APP.host.api + url,
					data:JSON.stringify(objData),
					cache:true,
					type:'POST',
					contentType:'application/json',
					success:function(response){
						if (response.ret == 1) {
							response.data.repType = repType;
							response.data.reportName = reportName;
							self.ready(stateObj, response.data);
						}
						else {
							APP.ui.showPrompt(response.msg);
							APP.router.endLoading();
						}
					},
					error: function () {
						APP.router.endLoading();
						APP.ui.showPrompt('网络错误,<br>请稍后重试')
					}
				})
			}
			oAjax(url)
		},
		ready: function (stateObj, data) {
			var tplScript = require("./tpl/report.html");
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, this)
				this.show(stateObj,tplScript, data)
			}
		},
		show: function (stateObj, tplScript, data) {
			var self = this;
			APP.tools.pageCount();
			self.$rootDom.html(tplScript); 
			data.isPayed =  APP.profileInfo.superMm; 
			data.host = APP.host.api;         
			var html = template('report_template', data);
			self.$rootDom.prepend(html);
			self.bindUI(stateObj); 
		},
		bindUI: function (stateObj) {
			var self = this;
			self.setPageInfo(stateObj);
			self.$rootDom.addClass('page-report visibile'); 
			var $voiceBtn = self.$rootDom.find('.icon-voice-baby');
			var audio = self.$rootDom.find('.voice-audio')[0];
			
			$voiceBtn.on('click', function () {
				if(audio.paused){
					audio.play();
				}else{
					audio.pause();
				}
			});
			 //B超图片显示
			self.$rootDom.find('.b-photos-box .item').on('click', function () {
				var src = $(this).find('img').attr('src');
				self._showLargeImg(src)
			})
			self.$rootDom.find('.larger-img-container').on('click', function () {
				$(this).hide()
			})
			   
		},
		 _showLargeImg: function (src) {
			var self = this;
			self.$rootDom.find('.larger-img-container')
				.show()
				.find('img')
				.attr('src', src)
		},   
		setPageInfo: function (stateObj) {
			function getTitleById(id) {
				var title;
				switch (id) {
					case '01':
						title = '唐氏报告详情'
						break;
					case '02': 
						title = '超声报告详情';
						break;
					case '04': 
						title = '病理报告详情';
						break;
					case '05'://检验报告
					default:
						title = '检验报告详情';
				   
				}
				return title;
			}
			APP.tools.setPageTitle(getTitleById(stateObj.repType))
		},
		destroy: function () {
				//如果有事件绑定的话, 解除事件绑定            
				this.$rootDom.removeClass('page-report visibile');
				this.$rootDom.html('');
			}
		}
		return pageInitObj;

	})