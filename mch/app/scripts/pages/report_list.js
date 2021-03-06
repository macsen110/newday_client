define(['zepto', 'template'], function ($, template) {
	var isFirstReq;
	var yfySessionReportObj;
	var pageInitObj = {
		$rootDom: $('#page_container'),
		setReportStore: function (obj) {
			var filter = yfySessionReportObj.filter(function (item) {
				return item.repType == obj.repType
			})
			var filterData = yfySessionReportObj[yfySessionReportObj.indexOf(filter[0])];
			filterData.page = obj.data.page;
			filterData.total = obj.data.total;
			filterData.data.push(obj.data);
			sessionStorage.setItem('yfySessionReportObj', JSON.stringify(yfySessionReportObj));
		}, 
		isReportStroe: function (obj) {
			if (!yfySessionReportObj) {
				yfySessionReportObj = [{
					repType: obj.repType,
					data: [],
					page: 1
				}]
				return {
					yfyReportStore: 0,
					page: 1
				}
			}
			else {
				var filter = yfySessionReportObj.filter(function (item) {
					return item.repType == obj.repType
				})
				if (filter.length) {
					var filterData = yfySessionReportObj[yfySessionReportObj.indexOf(filter[0])];
					if (obj.page) {
						filterData.page = obj.page;
						sessionStorage.setItem('yfySessionReportObj', JSON.stringify(yfySessionReportObj));
						var filterItem = filterData.data.filter(function (item) {
							return item.page == obj.page
						})
						if (filterItem.length) {
							var filterItemData = filterData.data[filterData.data.indexOf(filterItem[0])];
							var typeItemData = {};
							typeItemData.data = filterItemData;
							typeItemData.data.page = filterItemData.page;
							typeItemData.data.total = filterItemData.total;
							typeItemData.data.repType = filterData.repType;
							return {
								yfyReportStore: 1,
								typeStore: 1,
								typeItemStore: 1,
								typeItemData: typeItemData.data,
							}
						}
						else {
							return {
								yfyReportStore: 1,
								typeStore: 1,
								typeItemStore: 0,
								page: filterData.page,
							};
						}
					}
					else {
						var typeItemData = {};
						typeItemData.data = filterData.data[0];
						typeItemData.data.page = filterData.page;
						typeItemData.data.total = filterData.total;
						typeItemData.data.repType = filterData.repType;
						return {
							yfyReportStore: 1,
							typeStore: 1,
							typeItemStore: 1,
							typeItemData: typeItemData.data,
						}
					}
				}
				else {
					yfySessionReportObj.push({
						repType: obj.repType,
						data: [],
						page: 1
					})
					return {
						yfyReportStore: 1,
						typeStore: 0,
						page: 1
					}
				}
			}
		},
		init: function (stateObj) {
			yfySessionReportObj  = sessionStorage.getItem('yfySessionReportObj') ? JSON.parse(sessionStorage.getItem('yfySessionReportObj')) : null;
			var self = this;
			self.beforeAjax(stateObj, {});
		},
		beforeAjax: function (stateObj, obj, action) {
			var self = this;
			var repType = stateObj.repType;
			var url;
			var reportStroe = self.isReportStroe({
				repType: repType,
				page: obj.page ? obj.page : 0
			});
			if (reportStroe.typeItemStore == 1) {
				self.ready(stateObj, reportStroe.typeItemData, action);
				return;
			}
			self.ajaxConfig = {
				data: {
					request_context: {
						page: obj.page || reportStroe.page, 
						repType: repType,
						customerId: APP.profileInfo.customerId,
						uid: APP.uid,
						appType : APP.openType,
					},
					access_token: localStorage.getItem('token'),
					system: 'mch'

				}
			};
			// switch (repType) {
			//     case '01' : //唐式
			//         url = '/infanthospital/getTSReportDetail';
			//         break;
			//     case '04' : //病理报告
			//         url = '/infanthospital/getPathReportDetail';
			//         break; 
			//     case '05'://检验报告
			//         url = '/infanthospital/getINSReportDetail';
			//         break; 
			//     default : //超声报告
			//         url = '/infanthospital/getUSReportDetail';
			//         break;    
			// }
			self.ajaxConfig.url = '/infanthospital/v1/getReportListDetail';
			self.oAjax(self.ajaxConfig, stateObj, action);
		},
		oAjax: function(config, stateObj, action) {
			var self = this;
			$.ajax({
				url:APP.host.api + config.url,
				data:JSON.stringify(config.data),
				cache:true,
				type:'POST',
				contentType:'application/json',
				success:function(response) {
					if (response.ret == 1) {
						response.data.page = config.data.request_context.page;
						response.repType = config.data.request_context.repType;
						self.setReportStore(response);
						response.data.repType = config.data.request_context.repType;
						self.ready(stateObj, response.data, action)
					}
					else {
						APP.ui.showPrompt(response.msg);
						APP.router.endLoading();
					}
				},
				error: function () {
					APP.ui.showPrompt('网络错误,<br>请稍后重试');
					APP.router.endLoading();
				}
			})
		},
		ready: function (stateObj, data, action) {
			var tplScript = require("./tpl/report_list.html");
			if (action) {
				this.show(stateObj, tplScript, data);
				return
			}
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, this);
				this.show(stateObj, tplScript, data);
			}
		},
		show: function (stateObj, tplScript, data) {
			var self = this;
			APP.tools.pageCount();
			self.$rootDom.html(tplScript);
			data.reportName = decodeURI(stateObj.reportName);

			var html = template('report_list_template', data);
			self.$rootDom.prepend(html);
			self.bindUI(stateObj); 
		},
		decodeUTF8 : function (str){
			return str.replace(/(\\u)(\w{4}|\w{2})/gi, function($0,$1,$2){
				return String.fromCharCode(parseInt($2,16));
			});
		},
		bindUI: function (stateObj) {
			var self = this;
			self.setPageInfo(stateObj);
			self.$rootDom.addClass('page-report-list visibile');
			var reportList = $('.report-list');
			var $curNum = $('.cur-num');
			var $totalNum = $('.total-num');
			$('.icon-sign-left').on('click',function(){
				var curNum = $curNum.text();
				if (curNum == 1) return;
				--curNum;
				$curNum.text(curNum);
				self.beforeAjax(stateObj, {page: curNum}, 1)
			})
			$('.icon-sign-right').on('click',function(){
				var curNum = $curNum.text();
				var totalNum = $totalNum.text();
				if (curNum == totalNum) return;
				++curNum;
				$curNum.text(curNum);
				self.beforeAjax(stateObj, {page: curNum}, 1)
			})
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
		setPageInfo: function () {
			APP.tools.setPageTitle('报告列表')
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			isFirstReq = false;
			sessionStorage.removeItem('yfySessionReportObj')
			this.$rootDom.removeClass('page-report-list visibile') 
			this.$rootDom.html('');
		}
	}
	return pageInitObj;

})