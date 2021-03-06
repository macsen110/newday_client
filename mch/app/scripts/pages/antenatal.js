/**
 * Created by wudi on 15/11/30.
 */
 define(['template'], function(template){
	/**
	 **pageInitObj,
	 **页面初始化对象,
	 **包含每个页面的名称(以dom Id的值唯一标识)
	 **@params isBindCard 产检
	 **@params ready 选择模板套数据
	 **@params swipe 页面滚动对象
	 **@parans _fillData循环填充数据
	 **@params _todoResult 针对返回数据,再包装,供模版嵌套
	 ***/
	 var pageInitObj = {
		$rootDom:  $('#page_container'),
		ready: function (stateObj, data) {
			var self = this;
			var tplScript = require('./tpl/antenatal.html');
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, self);
				self.show(tplScript, data)
			}         
		},
		show: function (tplScript, data) {
			var self = this;
			APP.tools.pageCount();
			self.$rootDom.append(tplScript);
			var html;
			self.isBindCard = APP.profileInfo.emStatus == 1 ? false : true;
			if (self.weekPregnantListAll) data.isLoaded = true;
			if (self.isBindCard) {
				if (data.length) html = template('antenatal_care_bind_template', data);
				else {
					data.isBindCard = 1;
					html = template('antenatal_care_unbind_template', data)
				}
			}
			else html = template('antenatal_care_unbind_template', data)
			self.$rootDom.prepend(html);
			if (self.isBindCard && data.length) self._fillData(data);
			APP.selectBottomNav(0);
			self.bindUI();
			;(function () {
				var updatingDataSign = sessionStorage.getItem('updaingDataSign');
				var updatedDataSign = sessionStorage.getItem('updatedDataSign');
				if (self.weekPregnantList && !updatingDataSign) {
					sessionStorage.setItem('updaingDataSign', 1);
					APP.ui.showPrompt('正在更新您的数据')
				}
				if (self.weekPregnantListAll && !updatedDataSign) {
					sessionStorage.setItem('updatedDataSign', 1);
					APP.ui.showPrompt('数据更新成功');
					
				}
			}())
		},
		_appendNoData: function () {
			this.$rootDom.addClass('page-antenatal-care visibile');
			this.$rootDom.children('script').remove();
			this.$rootDom.children('.bind-card-box').remove();
			var div = document.createElement('div');
			div.className = 'none-data-container';
			div.innerHTML = '<i class="icon"></i><p class="tip">亲，您当前还未产检过~</p>';
			this.$rootDom[0].appendChild(div);
		},
		_fillData: function (weekPregnantList) {
			var self = this;
			if (!weekPregnantList.length) {
				self._appendNoData();
				return; 
			}
			var moveItemsHtml = '';
			var testItemsHtml = '';
			var tipItemsHtml = '';
			var pregnantStatusHtml = '';
			var reportItemsHtml = '';
			var adviceTipItemsHtml = '';
			
			weekPregnantList.forEach(function (item, idx) {
					
				moveItemsHtml += getMoveItemHtml(item);
				pregnantStatusHtml += getPregnantStatusHtml(item);
				testItemsHtml += getTestItemsHtml(item.itemList);
				tipItemsHtml += getTipItemsHtml(item.itemList);
				reportItemsHtml += getReportItemsHtml()
				adviceTipItemsHtml += getAdviceTipsHtml()
			});
			//apendDom to targetDom
			this.$pregnantStatusList = this.$rootDom.find('.header .tab-con-container');
			this.$easyMoveList = this.$rootDom.find('.easy-move-container');
			this.$testList = this.$rootDom.find('.test-list');
			this.$tipList = this.$rootDom.find('.tip-list');
			this.$reportList = this.$rootDom.find('.report-list');
			this.$adviceTipList = this.$rootDom.find('.advice-tip-list');
			
			this.$pregnantStatusList.html(pregnantStatusHtml);
			this.$easyMoveList.html(moveItemsHtml);
			this.$testList.html(testItemsHtml);
			this.$tipList.html(tipItemsHtml);
			this.$reportList.html(reportItemsHtml);
			this.$adviceTipList.html(adviceTipItemsHtml);
			
			var lastWeekIndex = this.$rootDom.find('.easy-move-container').find('.item').last().data('times');
			if (lastWeekIndex < 40) self._appendAdviceHtml(lastWeekIndex);
			function getMoveItemHtml(item) {
				var arrTime = item.checkDate.split('-');
				var statusObj = getStatusObj(item.status);
				return '<li class="item bind-item '+statusObj.className+'" data-times="'+item.weekPregnant+'">'+
				'<div class="box">'+
				'<p>'+arrTime[0]+'</p>'+
				'<p>'+arrTime[1]+'.'+arrTime[2]+'</p>'+
				((item.weekPregnant > 42 ||　item.weekPregnant < 2) ? '<p style="visibility: hidden">孕'+item.weekPregnant+'周</p>' : '<p>孕'+item.weekPregnant+'周</p>')+
				'</div>'+
				'</li>' 
			}
			function getPregnantStatusHtml(item) {
				var statusObj = getStatusObj(item.status);
				return '<li class="item">'+
				'<p>'+ statusObj.text +'</p>'+
				'<p><i class="icon"></i>'+item.checkWeek+' '+item.checkTime+'</p>'+
				'</li>'
			}
			function getTestItemsHtml(list) {
				var html = '<li class="item">';

				list.forEach(function (item, idx) {
					html += '<p>' + (idx + 1) + '.' + item.name + '</p>'
				})
				return html + '</li>';
			}
			function getTipItemsHtml(list) {
				var html = '<li class="item">';
				var index = 0;
				list.forEach(function (item, idx) {
					if (item.tip != '') html += '<p>'+ (++index) + '.' + item.tip +'</p>'
				})
				return html + '</li>';
			}
			function getReportItemsHtml(list) {
				return '<li class="item"></li>';
			}
			function getAdviceTipsHtml() {
				return '<li class="item"></li>'
			}
			function getStatusObj(code) {
				var obj = {};
				//1:已完成  2:今日产检 3:已预约
				switch(code) {
					case '1':
						obj.text = '历史产检';
						obj.className = 'finished';
						break;
					case '2':
						obj.text = '今日产检';
						obj.className = 'unstart';
						break;
					case '3':
					default:
						obj.text = '下次产检';
						obj.className = 'unstart'
				}
				return obj;
			}
			
			
		},
		_appendAdviceHtml: function (index) {
			var self = this;
			var html = template('antenatal_care_unbind_template', {});
			var $unbindCardHolder =  $('#antenaltal_unbind_card_holder');
			$unbindCardHolder.html(html);
			var $unBindMovelist = $unbindCardHolder.find('.easy-move-container .item').filter(function () {
				return $(this).data('times') > index;
				
			})
			var leftLen = $unBindMovelist.length;
			$unBindMovelist.each(function () {
				self.$easyMoveList.append(this)
			})
			var $unBindTestList = $unbindCardHolder.find('.test-list .item').filter(function () {
				return $(this).data('times') > index;
			})
			var leftLen2 = $unBindTestList.length;
			$unBindTestList.each(function (item) {
				self.$testList.append(this)
			})
			var $unBindTipList = $unbindCardHolder.find('.tip-list .item').filter(function () {
				return $(this).data('times') > index;
			})
			$unBindTipList.each(function (item) {
				self.$tipList.append(this)
			})
			var leftReportItems = '';
			var leftWeekItems = '';
			var leftAdviceTipList = '';
			for (var i = 0; i < leftLen; i++) {
				leftReportItems += '<li class="item"></li>';
				leftWeekItems += '<li class="item advice-item"><p>建议产检流</p></li>';
				leftAdviceTipList += '<li class="item advice-tip-item"><p>建议产检流仅供参考，具体<strong>以医院预约为准</strong></p></li>'
			}
			this.$pregnantStatusList.append(leftWeekItems);
			this.$reportList.append(leftReportItems);
			this.$adviceTipList.append(leftAdviceTipList);
			if (index < 14) {
				$unbindCardHolder.find('.inner-tab-nav-list').insertBefore('.content');
			}
			$unbindCardHolder.remove()
		}, 
		setPageInfo: function () {
			APP.tools.setPageTitle('我的产检')
		},
		bindUI: function () {
			var self = this;
			self.setPageInfo();
			self.$rootDom.addClass('page-antenatal-care visibile');            
			$('.unbind-card-box .widget-tip-box').on('click',function(){
				var hrefvalue = $(this).attr('data-href');
				if (hrefvalue) {
					setTimeout(function(){
						window.location.href = hrefvalue;
					},800)
					return;
				}
			})
			//创建滑动实例
			var $moveBoxDom = $('.easy-move-container').eq(0);
			if (!$moveBoxDom.length) return;
			;(function () {
				var winHeight = window.innerHeight; 
				var topHeight = $('header').height();
				var $content = $('section').find('.content');
				$('body').addClass('overflow-hidden h-100');
				$content.height(winHeight - topHeight -20); 
			}())
			var $MoveBoxItems = $moveBoxDom.find('.item');
			var easyMoveIndex;
			if (sessionStorage.getItem('antenatalCurIndex')) easyMoveIndex = +sessionStorage.getItem('antenatalCurIndex')   
			else easyMoveIndex = $moveBoxDom.find('.unstart').length ? $moveBoxDom.find('.unstart').eq(0).index() : 0;
			self.swipe.moveContainer = $moveBoxDom[0];
			var easyMoveEle = APP.ui.easyMove($moveBoxDom[0], {
				parentEle: $moveBoxDom.parent()[0],
				index: easyMoveIndex,
				focusIndex: 2,
				childWidth: $moveBoxDom.width() / 5,
				showNum:3,
				limitBorder: true,
				touchMoveCb: function (index) {
					self.swipe.touchMoveCb(index);
				},
				callback: function (index) {
					self.swipe.easyMoveEnd(index);
				}
			});
			self.easyMove = easyMoveEle;
			$MoveBoxItems.click(function () {
				var index = $(this).index();
				if (easyMoveEle.index != index) easyMoveEle.move(index)
			})
			var tabContainers = document.querySelectorAll('.tab-con-container');
			if (tabContainers.length) {
				[].forEach.call(tabContainers, function (item) {
					this.swipe._tabContainerStore.push(APP.ui.TabWidget({
						tabConContainer: item,
						callback: function (index) {
							var curTabConItem = this.tabConContainer.children[index];
							var tipNameDom = document.querySelectorAll('.nav-item-name')[1];
							var reportNameDom = document.querySelectorAll('.nav-item-name')[2]
							if (!curTabConItem || !curTabConItem.children.length) {
							   try {
								   	
									if (curTabConItem && curTabConItem.parentNode && curTabConItem.parentNode.previousElementSibling && curTabConItem.parentNode.previousElementSibling.classList.contains('nav-item-name')) {
										curTabConItem.parentNode.previousElementSibling.classList.add('hidden');
									}  
								}
								catch (e) {
									console.error(curTabConItem)
									console.error(e)
								}    
							}
							else {
								if (curTabConItem.parentNode.previousElementSibling && curTabConItem.parentNode.previousElementSibling.classList.contains('nav-item-name')) {
									curTabConItem.parentNode.previousElementSibling.classList.remove('hidden');     
								}
							}
						}
					}))    
				}, self)
			}
						
			self.swipe.curentIndex = easyMoveEle.index;
			//周期表14-18周这一个区间时,分为经早孕门诊和未经早孕门诊
			if (self.$rootDom.find('.inner-tab-nav-list')[0]) {
				APP.ui.TabWidget({
					tabNavContainer: self.$rootDom.find('.inner-tab-nav-list')[0],
					tabConContainer: self.$rootDom.find('.inner-tab-con-list')[0],
					callback: function (index) {
						var $innerTipConList =  self.$rootDom.find('.inner-tip-con-list');
						$innerTipConList.children().hide();
						$innerTipConList.children().eq(index).show();   
					}
				})
			}
			//刷新页面时,记录当前滑动item的index
			window.onbeforeunload = function () {
				sessionStorage.setItem('antenatalCurIndex', self.easyMove.index)
			}
		},
		init: function (stateObj) {
			var self = this;
			var profileInfo = APP.profileInfo;
			self.stateObj = stateObj;
			if (profileInfo.emStatus == 1) self.unbindCard(stateObj) 
			if (profileInfo.emStatus == 2) self.bindCard(stateObj);
		},
		bindCard: function (stateObj) {
			var self = this;
			self.isBindCard = true;
			//获取总的产检周期
			self.weekPregnantListAll = sessionStorage.getItem('weekPregnantListAll') ? JSON.parse(sessionStorage.getItem('weekPregnantListAll')) : null;
			if (!self.weekPregnantListAll) {
				self.weekPregnantList = sessionStorage.getItem('weekPregnantList') ? JSON.parse(sessionStorage.getItem('weekPregnantList')) : null;
				self.weekPregnantListNew = sessionStorage.getItem('weekPregnantListNew') ? JSON.parse(sessionStorage.getItem('weekPregnantListNew')) : null;
			}
			
			//初始化检查报告
			//self.reportList = localStorage.getItem('reportList') ? JSON.parse(localStorage.getItem('reportList')) : null;
			var profileInfo = APP.profileInfo;
			var appendProfileDom = function () {
				var profileHtml = undefined;
				var aptId= document.getElementById('antenatal_profile_template');
				if (profileInfo && aptId) {
					profileHtml = template('antenatal_profile_template', profileInfo);
					$('.section .content').prepend(profileHtml)
				}  
				if (self.$rootDom.find('.profile-box').length == 0 && profileHtml) {
					self.$rootDom.find('.section .content').prepend(profileHtml)    
				}
			}
			var postData = {
				request_context: {
					uid: APP.uid,
					customerId: profileInfo.customerId,
					appType : APP.openType,
				},
				access_token: localStorage.getItem('token'),
				system: 'mch'
			}
			//获取总的报告
			var getAllReportList = function () {
				$.ajax({
					url: APP.host.api+'/infanthospital/v1/getAllReportList',
					type: 'post',
					data: JSON.stringify(postData),
					contentType: 'application/json',
					success: function (res) {
						if (res.ret == 1) {
							if (res.data.reportLists.length > 0) {
								self.reportList = res.data.reportLists;
								self._todoReportList();
							}
						}
					}
				})
			}
			//获取最新的预约周期
			var getNewBookInfo = function () {
				$.ajax({
					url: APP.host.api+'/infanthospital/v1/getBookInfoInterface',
					type: 'post',
					data: JSON.stringify(postData),
					contentType: 'application/json',
					success: function (res) {
						if (res.ret == 1 && APP.router.curPathName == 'antenatal') {
							if (!res.data.weekPregnantList.length) getAllReportList();
							self._storeBookInfoNew(res.data.weekPregnantList)
						}
					},
					error: function (xhr) {
						if (xhr.status == 504) getNewBookInfo()
						else {
							if (APP.router.curPathName == 'antenatal') APP.ui.showPrompt('更新失败, 请稍后再试')
						}
					}
				})
			}
			//var storePregnantList = self.weekPregnantListAll ? self.weekPregnantListAll : (self.weekPregnantList)
			if (self.weekPregnantListAll) {
				self.ready(stateObj, self.weekPregnantListAll);
				appendProfileDom();
				//请求报告列表的接口,拿到结果后把报告list筛选push到相应的位置处
				getAllReportList()
				return;
			}
			if (self.weekPregnantList) {
				self.ready(stateObj, self.weekPregnantList);
				appendProfileDom();
				//请求报告列表的接口,拿到结果后把报告list筛选push到相应的位置处
				//getAllReportList();
				//请求最新的孕周列表
				if (!self.weekPregnantListNew) getNewBookInfo()
				return;
			}
			//请求预约信息接口
			if (!self.weekPregnantList) {
				$.ajax({
					url: APP.host.api+'/infanthospital/v1/getBookInfo',
					type: 'post',
					data: JSON.stringify(postData),
					contentType: 'application/json',
					success: function (res) {
						if (res.ret == 1) {
							res = self._todoResult(res.data.weekPregnantList);
							self._storeBookInfo(res);
							//self.ready(stateObj, res);
							self._todoReportList();
							appendProfileDom();
							getNewBookInfo()
						}
					},
					error: function () {
						APP.router.endLoading();
						APP.ui.showPrompt('网络错误,<br>请稍后重试')
					}
				})
			}
			
			
		},
		_storeBookInfo: function (data) {
			var self = this;
			self.weekPregnantList = data;
			sessionStorage.setItem('weekPregnantList', JSON.stringify(data))
			self._storeBookInfoALl(1, data);
		},
		_storeBookInfoNew: function (data) {
			var self = this;
			self.weekPregnantListNew = data;
			sessionStorage.setItem('weekPregnantListNew', JSON.stringify(data));
			self._storeBookInfoALl(2, data, 1);
		},
		_storeBookInfoALl: function (type, data, isUpdate) {
			/**
			 * *合并存储最新的数据,如果有新数据的话,刷新页面,更新数据
			 * *******/
			var self = this;
			if (type == 1) {
				if (self.weekPregnantListNew) {
					self.weekPregnantListAll = self.weekPregnantListNew.concat(data);
					sessionStorage.removeItem('weekPregnantList');
					sessionStorage.removeItem('weekPregnantListNew');
					sessionStorage.setItem('weekPregnantListAll', JSON.stringify(self.weekPregnantListAll));
					//渲染页面
					self.ready(self.stateObj, self.weekPregnantListAll);
				}
				else self.ready(self.stateObj, data);
			}
			else {
				if (self.weekPregnantList) {
					self.weekPregnantListAll = self.weekPregnantList.concat(data);
					sessionStorage.removeItem('weekPregnantList');
					sessionStorage.removeItem('weekPregnantListNew');
					sessionStorage.setItem('weekPregnantListAll', JSON.stringify(self.weekPregnantListAll));
					if (data.length) APP.router._gotoPage({pageName: 'antenatal', replace: 1})
					else {
						var updatedDataSign = sessionStorage.getItem('updatedDataSign');
						if (self.weekPregnantListAll && !updatedDataSign) {
							sessionStorage.setItem('updatedDataSign', 1);
							APP.ui.showPrompt('数据更新成功');
							
						}
					}
				}
			}
			
		},
		_todoReportList: function () {
			var self = this;
			if (self.weekPregnantListAll && self.weekPregnantListAll.length && self.reportList) {
				self.reportList.reverse();
				self.reportList.forEach(function (item, index) {
					self._appendReport(item.reportList, index)
				})
				
			}
		},
		_diffReportList: function (reportListArr) {
			var self = this;
			if (self.newReportList) {
				var addArr = [];
				self.newReportList.forEach(function (item, index) {
					var isExit = undefined;
					var newItemName = item.repNo || item.applyNo;
					for (var i = 0, len = reportListArr.length; i < len; i++) {
						var itemName = reportListArr[i].repNo || reportListArr[i].applyNo;
						if (newItemName == itemName) {
							isExit = true;
							break;
						}
					}
					if (!isExit) {
						addArr.push(item)        
					}
				})
				if (addArr.length) self.reportList = self.reportList.concat(addArr);
				self._todoReportList(self.reportList);
			}            
		},
		_appendReport: function (reportListArr, itemIdx) {
			var self = this;
			var $reportDom = self.$rootDom.find('.report-list');
			var reportNavName = document.querySelector('.report-nav-name');
			self.$easyMove = $('.easy-move-container');
			if (reportListArr.length) {
				var html = '';
				var unReports = 0;
				reportListArr.forEach(function (item, index) {
						var hasReadClass = item.readStatus == 1 ? 'readed' : '';
						(item.readStatus == 1 ?  null : ++unReports);
						html += '<p class="bind-location '+hasReadClass+'" data-href="report"' +
							' data-options={"repType":"'+item.reportType+'","weekPregnant":"'+self.weekPregnantListAll[itemIdx].weekPregnant+'","reportName":"'+item.reportName+'","reportId":"'+item.reportId+'"}>'+ (index + 1) + '.' + item.reportName +'<i class="icon-sign-right fr"></i><em class="fr time">'+item.reportDate.split(' ')[0]+'</em></p>'
				});
				if (self.weekPregnantListAll.length > itemIdx) $reportDom.find('.item').eq(itemIdx).html(html);
				if (unReports > 0) self._showWeekListSign(itemIdx); 
			}
			
			var reportEleCurlength = reportNavName && reportNavName.nextElementSibling && reportNavName.nextElementSibling.querySelector('.on').children.length
			if (reportEleCurlength) reportNavName.classList.remove('hidden') 
		},
		_showWeekListSign: function (idx) {
			var self = this;
			if (!self.$easyMove.find('.item').eq(idx).hasClass('un-read-item')) {
				var unReadBox = '<p><i class="icon"></i><em>看报告</em></p>'
				self.$easyMove.find('.item').eq(idx).addClass('un-read-item').find('.box').append(unReadBox);
			}
		},
		unbindCard: function (stateObj) {
			var self = this;
			self.isBindCard = false;
			var unbindCardUrl = APP.openType  == 1 ? 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe9b29693633b2e6f&redirect_uri=https%3A%2F%2Fh5.shqmxx.com%2FResource.aspx%3FCustomerId%3D77%26Pri%3D2F6242724A346747504136312B2F53773568446C4A4A504F754B3467667775574351314D4262352B564236576444514158486E4150664155726172343274686A665537303654587444435274424B4832347530415032654B58655A7A61376B3551534958757666477474314F4B42704E704F64624C3333756B5358783476722B54756A64366B3657346B576C63636A2F6455784C56673D3D%26UiServiceId%3Dgh_f6090761f9dc%26UItype%3Dwx%26IsMenu%3D1%26Version%3D1.1%26ForwardUIUserId%3DoTqovuCyWUNksPVsdOzvIGaUhnOk&response_type=code&scope=snsapi_base&state=d3hlOWIyOTY5MzYzM2IyZTZmJTJjYTAxMjk3YjExYmZmZTI2YzE4ZTcxZjQyNGQ3YWUwNmMlMmMw#wechat_redirect' : 'http://alipay.51mch.com/HTML/myCardList.html?userID='+encodeURIComponent(APP.uid);
			self.ready(stateObj, {uid: APP.uid,unbindCardUrl:unbindCardUrl})
		},
		_todoResult: function (result) {
			var self = this;
			self.weekPregnantList = result;
			//if (result.length > 0) sessionStorage.setItem('weekPregnantList', JSON.stringify(result))
			return result
		},
		swipe: {
			_tabContainerStore: [],
			pushTabStore: function (instance) {
				this._tabContainerStore.push(instance)
			},
			_curentIndex : 1,
			get curentIndex() {
				return this._curentIndex;
			},
			set curentIndex(index) {
				this._curentIndex = index; 
				var curEle = this.moveContainer.children[index];
				curEle.classList.add('on');
				if (curEle.previousElementSibling) curEle.previousElementSibling.classList.add('prev');
				if (curEle.nextElementSibling) curEle.nextElementSibling.classList.add('next');
				this._tabContainerStore.forEach(function (item,idx) {
					item.change(index);
				})
				//用户未绑卡,
				//针对静态页面的dom交互
				;(index == 2 ? $('.inner-tab-nav-list').show() : $('.inner-tab-nav-list').hide()) 
			},
			easyMoveEnd: function (index) {
				var prevCurEle = this.moveContainer.children[this.curentIndex];
				if (prevCurEle.previousElementSibling) prevCurEle.previousElementSibling.classList.remove('prev');
				if (prevCurEle.nextElementSibling) prevCurEle.nextElementSibling.classList.remove('next');
				prevCurEle.classList.remove('on');
				this.curentIndex = index;             
			},
			touchMoveCb: function (index) {
				var curEle = this.moveContainer.children[index];
				if (curEle.previousElementSibling) curEle.previousElementSibling.classList.remove('prev');
				if (curEle.nextElementSibling) curEle.nextElementSibling.classList.remove('next');
				curEle.classList.remove('on');
			},
		},
		destroy: function () {
			var self = this;
			//如果有事件绑定的话, 解除事件绑定
			sessionStorage.setItem('antenatalCurIndex', this.easyMove.index)
			$('body').removeClass('overflow-hidden h-100');
			this.$rootDom.removeClass('visibile page-antenatal-care');  
			this.$rootDom.html('');
			Object.keys(this).forEach(function (key) {
				if (typeof self[key] != 'function' && typeof self[key] != 'object' && key != '$rootDom') delete self[key];
			})
		}
	}
	//默认
	return pageInitObj;
	
	
})