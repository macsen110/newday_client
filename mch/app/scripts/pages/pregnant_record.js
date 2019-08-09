/**
 * Created by knowthis on 16/6/30.
 */

define(['zepto','template'], function($, template) {
	//init page
	var pageInitObj = {
		$rootDom: $('#page_container'),
		hasInput:0,
		ready: function (stateObj, data) {
			var self = this;
			var tplScript = require("./tpl/pregnant_record.html");
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, self);
				self.show(tplScript, data)
			}
		},
		show: function (tplScript, data) {
			var self = this;
			APP.tools.pageCount();
			self.$rootDom.html(tplScript);
			data.host = APP.host.api;
			var html = self.pregnantStatus == 1 ? template('pregnant_unborn_record_template', data) : template('pregnant_born_record_template', data);
			self.$rootDom.prepend(html);
			self.bindUI(tplScript, data);
		},
		setPageInfo: function () {
			var self = this;
			APP.tools.setPageTitle('怀孕日记')
		},
		bindUI: function (tplScript, data) {
			var self = this;
			$('body').addClass('fixed')
			self.setPageInfo();
			self.$rootDom.addClass('page-pregnant-record visibile');
			APP.selectBottomNav(-2);
			var $list = self.$rootDom.find('.page-list');
			var $item = self.$rootDom.find('.page-item');
			var $arrowSign = self.$rootDom.find('.arrow-down');
			var fullPageUi = APP.ui.easyMove($list[0], {
				limitBorder: true,
				orientation: 2,
				showNum: 1,
				childHeight: $item.height(),
				distance: 30,
				callback: function (index) {
					$item.removeClass('on').eq(index).addClass('on');
					if (index == this.length -1) {$arrowSign.addClass('over')}
					else $arrowSign.removeClass('over')
				}
			})
			var $voiceBtn = self.$rootDom.find('.icon-music');
			self.audio = self.$rootDom.find('.voice-audio')[0];
			
			self.$rootDom.find('.first-saw-scene .change-btn').on('click', function () {
				var $img = self.$rootDom.find('.first-saw-scene .img-box');
				var isLoading = $(this).data('loading');
				var $this = $(this);
				if (isLoading != 1) {
					$this.data('loading', 1);
					var index = $this.data('index');
					var data = {
						request_context: {
							customerId:  APP.profileInfo.customerId,
							appType:  APP.openType,
							uid: APP.uid,
							index: index+1
						},
						access_token: localStorage.getItem('token'),
						system: 'mch'
					};
					$.ajax({
						url : APP.host.api + '/infanthospital/v1/selectImage',
						data: JSON.stringify(data),
						type : 'post',
						contentType : 'application/json',
						success : function(response) {
							APP.router.endLoading();
							if (response.ret == 1) {
								$this.data('index', response.data.index);
								$this.data('loading', 0)
								$img.attr('src', response.data.imageUrlInit)
							}
							else APP.ui.showPrompt(response.msg)
						}
					})
					
				}
				

			});

			$voiceBtn.on('click', function () {
				if(self.audio.paused){
					self.audio.play();
					$(this).removeClass('stop')
				}else{
					$(this).addClass('stop');
					self.audio.pause();
				}
			})
			//播放胎心10s
			var isPalying;
			var ms;
			var timer;
			var taixinMusic = self.$rootDom.find('.first-heard-scene .taixin-voice-audio')[0];
			var $timer = self.$rootDom.find('.first-heard-scene .time');
			var $ms = self.$rootDom.find('.first-heard-scene .ms');
			var resetMs = 60;
			self.$rootDom.find('.first-heard-scene .btn').on('click', function () {
				var $text = $(this).find('.text');
				
				if (!isPalying) {
					$text.text('暂停播放');
					isPalying = 1;
					taixinMusic.play();
					self.audio.pause();
					$voiceBtn.addClass('stop')
					$ms.text(60);
					$timer.text(9);
					self.$rootDom.find('.first-heard-scene .focus').addClass('on');
					var timerNum = self.$rootDom.find('.first-heard-scene .time').text();
					timer = setInterval(function () {
						if (timerNum > 0) {
							resetMs = 60;
							$timer.text(--timerNum);
						}
						else {
							isPalying = 0;
							self._resetTime($timer, $ms, timer, ms, taixinMusic, $voiceBtn);
						}
					}, 1000);
					ms = setInterval(function () {
						resetMs--;
						if (resetMs >= 0) $ms.text(resetMs)
					}, 1000 / 60)
				}
				else {
					self.$rootDom.find('.first-heard-scene .focus').removeClass('on');
					$text.text('点击播放')
					isPalying = 0;
					self._resetTime($timer, $ms, timer, ms, taixinMusic, $voiceBtn);
				}
			})
			//if (APP.openType == 2) self.$rootDom.find('.share-btn').hide();
			//点击分享
			self.$rootDom.find('.share-btn').on('click', function () {
				self.$rootDom.find('.share-container-shadow').show();
				self._cbShareSuc()
			})
			self.$rootDom.find('.share-container-shadow').on('click', function () {
				$(this).hide();
			})
			self._initShareObj();
		},
		_initShareObj: function () {
			var self = this;
			self.shareObj = {};
			self.shareObj.title = self.pregnantStatus == 1 ? '十个月的皇后期就要结束，新生命即将到来' : self.babyObj.dateBorn + ' 我家 '+self.babyObj.sex+' 在一妇婴诞生啦~生啦~啦~';
			self.shareObj.imgUrl = self.pregnantStatus == 1 ? location.origin+'/images/icon_share_common.jpg' : self.babyObj.babyPictures;
			self.shareObj.link = location.href;
			if (!APP.tools.getLocationParam(location.search).shareLink) self.shareObj.link = self.shareObj.link + '&shareLink=shareLink'
			if (APP.openType == 2) self._applyShare()
			else self._initWXshare()
		},
		_weixinShare: function () {
			var self = this;
			//1是十月皇后, 2是新晋辣妈
			var title = self.shareObj.title;
			var imgUrl = self.shareObj.imgUrl;
			var link = self.shareObj.link;
			wx.ready(function () {
				self.audio.play();
				wx.showOptionMenu();
				wx.onMenuShareTimeline({
					title: title, // 分享标题
					link: link, // 分享链接
					imgUrl: imgUrl, // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					success: function () { 
						// 用户确认分享后执行的回调函数
					   // self._cbShareSuc()
					},
					cancel: function () { 
						// 用户取消分享后执行的回调函数
					}
				});
				wx.onMenuShareAppMessage({
					title: title, // 分享标题
					desc: '', // 分享描述
					link: link, // 分享链接
					imgUrl: imgUrl, // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function () { 
						// 用户确认分享后执行的回调函数
					   // self._cbShareSuc()
					},
					cancel: function () { 
						// 用户取消分享后执行的回调函数
					}
				});
			})
			wx.error(function (e) {
				//alert(e)
			})
			
		},
		_resetTime: function ($timer, $ms, timer, ms, taixinMusic, $voiceBtn) {
			var self = this;
			$timer.text(10);
			$ms.text('00');
			clearInterval(timer);
			clearInterval(ms);
			if (self.audio && self.audio.paused) self.audio.play();
			$voiceBtn.removeClass('stop')
			taixinMusic.pause();
			self.$rootDom.find('.first-heard-scene .focus').removeClass('on');
		},
		init: function (stateObj) {
			
			var self = this;
			//1是十月皇后, 2是新晋辣妈
			self.pregnantStatus = stateObj.pregnantStatus;
			self._todoPregnant(stateObj)
		},
		_todoPregnant: function (stateObj) {
			var self = this;
			var data = {
				request_context: {
					customerId:  APP.profileInfo.customerId,
					appType:  APP.openType,
					uid: APP.uid,
					motherStatus: stateObj.pregnantStatus
				},
				access_token: localStorage.getItem('token'),
				system: 'mch'
			};
			$.ajax({
				url : APP.host.api + '/infanthospital/v1/motherNote',
				data: JSON.stringify(data),
				type : 'post',
				contentType : 'application/json',
				success: function (res) {
					if (res.ret == 1) {
						self.ready(stateObj, self._todoData(res.data));
					}
				}
			})
		},
		_cbShareSuc: function () {
			var self = this;
			APP.tools.recordBehavior('/infanthospital/v1/superShare', {shareType: self.pregnantStatus, clickType:1})
		},
		_initWXshare: function () {
			var self = this;
			var reqUrl = APP.router.originalUrl.indexOf('pregnant_record') != -1 ? APP.router.originalUrl : 'https://www.macsen318.com';
			var postData = {
				request_context: {
					system:'ios',
					app_version:'9',
					access_token:'123',
					system_version:'7.0',
					phone_model:'iphone6',
					meid:'SASDASDSD',
					p_version:'1.1.2',
					url:APP.router.originalUrl
				},
				access_token: localStorage.getItem('token'),
				system: 'mch'
			}
			
			$.ajax({
				url:APP.host.api + '/infanthospital/v1/getTicket',
				type: 'POST',
				data: JSON.stringify(postData),
				contentType : 'application/json',
				success: function (response) {
					//response = JSON.parse(response);
					if (+response.ret == 1) {
						var data = response.data.data;
						wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: data.appid, // 必填，公众号的唯一标识
							timestamp: data.timestamp, // 必填，生成签名的时间戳
							nonceStr: data.nonceStr, // 必填，生成签名的随机串
							signature: data.signature,// 必填，签名，见附录1
							jsApiList: [
								'showOptionMenu',
								'onMenuShareTimeline',
								'onMenuShareAppMessage'
							]
						});
						setTimeout(function () {
							self._weixinShare.bind(self)();
						}, 1000)
					}
				}
			})
		},
		_applyShare: function () {
			var self = this;
			//支付宝分享
			document.addEventListener('AlipayJSBridgeReady', function () {
				self.audio.play();
				AlipayJSBridge.call("showOptionMenu");
				var alipayVersion = Ali.alipayVersion.slice(0,3);
				document.addEventListener('optionMenu', function () {
					 //ALPContactType 必选参数,目前支持支持"1001","1002","1003"格式，分别为小图linkCard，大图linkCard，大图无标题linkCard
					var ALPContactType = alipayVersion < 9 ? '1001' : 'url';
					var commShareParam = {
						title: self.shareObj.title,
						content: self.shareObj.title,
						imageUrl: self.shareObj.imgUrl,
						captureScreen: true, //分享当前屏幕截图(和imageUrl同时存在时，优先imageUrl)
						url: self.shareObj.link //分享跳转的url，当添加此参数时，分享的图片大小不能超过32K
					}
					AlipayJSBridge.call('share', {
						'bizType':"testShareBizType",   // 标示业务类型，埋点时使用，不需要埋业务参数，可以设空
						'keepOrder':true, // 保持分享渠道的顺序,android 9.1 换新的分享组件以后不支持
						'channels': [
							{
								name: 'Weibo', //新浪微博
								param: commShareParam
							}, 
							{
								name: 'LaiwangTimeline', //来往动态
								param: commShareParam
							},
							{
								name: 'Weixin', //微信
								param: commShareParam
							}, 
							{
								name: 'WeixinTimeLine', //微信朋友圈
								param: commShareParam
							},
							{
								name: 'CopyLink', //复制链接
								param: {
									url: self.shareObj.link
								}
							},
							{
								name: 'ALPContact',   //支付宝联系人,9.0版本
								param: {   //请注意，支付宝联系人仅支持一下参数
									contentType: ALPContactType,    //必选参数,目前支持支持"text","image","url"格式
									content: self.shareObj.title,    //必选参数,分享描述
									iconUrl:self.shareObj.imgUrl,   //必选参数,缩略图url，发送前预览使用,
									imageUrl:self.shareObj.title, //图片url
									url:self.shareObj.link,   //必选参数，卡片跳转连接
									title:self.shareObj.title,    //必选参数,分享标题
									memo:"快来看我的怀孕日记",   //透传参数,分享成功后，在联系人界面的通知提示。
								}
							}]
						},function(result){
							//self._cbShareSuc()
					});
				}, false);
			}, false);
		},
		_todoData: function (data) {
			var self = this;
			if(data.goodWeather > 0) data.goodWeatherArr = new Array(+data.goodWeather);
			if(data.earlyWarning > 0) data.earlyWarningArr = new Array(+data.earlyWarning);
			if(data.rainWeather > 0) data.rainWeatherArr = new Array(+data.rainWeather);
			if (data.dateChildbirth) data.dateChildbirth = data.dateChildbirth.replace(/-/g, '.');
			if (data.firstCheckDate) data.firstCheckDate = data.firstCheckDate.replace(/-/g, '.');
			if (data.child) {
				data.child.dateBorn = data.child.dateBorn.replace(/-/g, '.');
				self.babyObj = data.child;
			}
			data.isShare = (APP.tools.getLocationParam(location.search).shareLink || !sessionStorage.getItem('select_pregnant_status'))  ? 1 : 0;
			return data;
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			$('body').removeClass('fixed')
			var self = this;
			if (this.audio && this.audio.paused) this.audio.pause()
			this.$rootDom.removeClass('visibile page-pregnant-record');
			this.$rootDom.html('');
			Object.keys(this).forEach(function (key) {
				if (typeof self[key] != 'function' && typeof self[key] != 'object' && key != '$rootDom') delete self[key];
			})
			//离开页面,关闭分享入口
			wx.ready(function () {
				wx.hideOptionMenu();
			})
			document.addEventListener('AlipayJSBridgeReady', function () {
				AlipayJSBridge.call("hideOptionMenu");
			}, false);
		}
	};
	return pageInitObj;
});