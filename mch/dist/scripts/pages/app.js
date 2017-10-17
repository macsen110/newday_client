/**
 * Created by wudi on 15/11/30.
 */
 define(['security','zepto','../lib/ui'], function(RSAUtils, $, ui) {  
	var APP = {
		version:'1.0.0',
		/**
		 * 选择底部导航高亮
		 * @param i//-2 隐藏底部按钮,-1 reset底部按钮, else 触发当前按钮高亮 
		 */
		selectBottomNav:function (i) {
			if (i == -2) $('#bottom_nav').hide();
			else if (i == -1) {
				$('#bottom_nav').show();
				$("#bottom_nav .item").forEach(function(item,index){
					$(item).addClass('bind-location').removeClass('active')
				});
			}
			else {
				$('#bottom_nav').show()
				$("#bottom_nav .item").forEach(function(item,index){
					if(index == i){
						$(item).addClass('active')
								//.removeClass('bind-location')
					}else{
						$(item).addClass('bind-location').removeClass('active')
					}
				});
			}
		},
		/**
		 * ajax 请求公共方法 
		 * @param url
		 * @param data
		 * @param callback
		 */
		ajaxFunc:function(url, data,callback){
			var self = this;
			var token = localStorage.getItem('token');
			var otherDate = localStorage.getItem('profileInfo')?JSON.parse(localStorage.getItem('profileInfo')):{};
			data.uid = self.uid;
			data.token = token;
			data.appType = self.openType;
			data.cardNo = otherDate.cardNo;
			$.ajax({
				cache:true,
				url : self.host.api + url,
				type : 'post',
				data:JSON.stringify(data),
				contentType : 'application/json',
				success : function(response) {
					if (!callback) return;
					var callbackFunc = callback.func,
						callbackContext = callback.context;
					callbackFunc && typeof(callbackFunc) == 'function' && callbackFunc.call(callbackContext, response);
				},
				error:function (err) {
					console.error(url+'  错误是:'+err);
					APP.router.endLoading();
					APP.ui.showPrompt('网络错误,<br>请稍后重试')
				}
			})
		}
	};
	APP.init = function () {
		var self = this;
		//强制刷新用户个人信息的缓存内容
		if (localStorage.getItem('storeVersion') != 1) {
			localStorage.setItem('storeVersion', 1);
			localStorage.removeItem('profileInfo');
		}
		self.uid = self._getOpenId();
		self.openType = self._getOpenType();
		self.host = {
			api: '//macsen318.com.cn/mch'
		};
		self.ui = ui;
		self._todo();
		self.router.originalUrl = location.href;
		self.bindUI();
		
	}
	
	APP._getOpenType = function () {
		var self = this;
		var openTypeValue = self.tools.getLocationParam(location.search).appType;
		return openTypeValue;
	}
	APP._getOpenId = function () {
		var self = this;
		var openIdValue = decodeURIComponent(self.tools.getLocationParam(location.search).openId);
		return openIdValue;
	}
	APP._todo = function () {
		var self = this;
		self.router.startLoading();
		if (localStorage.getItem('token')) {
			var token = localStorage.getItem('token');
			var data = {
				request_context: {
					uid : self.uid,
					appType : self.openType,
				},
				access_token: token,
				system: 'mch'
			};
			self.getCustomerInfo(data);
		}
		else {
			var data = {
				request_context: {
					uid: self.uid,
					appType: self.openType
				}
			}
			$.ajax({
				url : self.host.api + '/infanthospital/v1/getToken',
				type : 'post',
				contentType : 'application/json',
				data: JSON.stringify(data),
				success : function(response) {
					localStorage.setItem('token', response.data.token);
					self._todo()
				}
			})
		}

		;(function () {
			var obj = APP.tools.getLocationParam(location.search);
			if (obj.shareLink) {
				var type;
				var pageName = obj.pageName;
				if (pageName == 'pregnant_record') {
					type = obj.pregnantStatus;
					APP.tools.recordBehavior('/infanthospital/v1/superShare', {shareType: type, clickType: 2})
				}
			}
		} ())
	}    
	APP.bindUI = function () {
		window.onpopstate = function (event) {
			var stateObj = event.state;
			if (stateObj) {
				stateObj.urlAction = 1;
				APP.router.gotoPage(stateObj)
			}
		}
		//开放调试提醒
		window.onerror = function (msg, url, lineNo, columnNo, error) {
			var string = msg.toLowerCase();
			var substring = "script error";
			if (string.indexOf(substring) > -1){
				alert('Script Error: See Browser Console for Detail');
			} else {
			
			}
			alert(msg, url, lineNo, columnNo, error);
			return false;
		};
		this.tools.bindLocation();
	};
	APP.afterInitConsumerFun = function () {
		//根据医院规定原因 取消引导购买套餐的入口
		return false;
		var msg;
		var funUpdate;
		var btn;
		var funLocation = function () {
			var obj;
			if (APP.profileInfo.superMm == 1) obj = {pageName: 'package_index'}
			else obj = {pageName: 'package_detail'}
			APP.router.gotoPage(obj)
		}
		if (APP.profileInfo.isAboutMm == 1) {
			msg = APP.profileInfo.superMm == 1 ? '恭喜你即将晋级为辣妈' : '恭喜你即将晋级为辣妈<br>升级Super妈咪';
			btn = APP.profileInfo.superMm == 1 ? "回顾我的好孕时光" : '看看孕期那些事';
			funUpdate = function () {
				var data = {
					request_context: {
						"customerId":  APP.profileInfo.customerId,
						"appType":  APP.openType,
						"uid": APP.uid,
						isAboutMm:2
					},
					access_token: localStorage.getItem('token'),
					system: 'mch'
				};
				$.ajax({
					url : APP.host.api + '/infanthospital/v1/updateIsAboutMm',
					data: JSON.stringify(data),
					cache: true,
					type : 'post',
					contentType : 'application/json'
				})
			};
			openDialog(msg, btn, funUpdate, funLocation, 1)
		}
		else if (APP.profileInfo.isPopUp == 0) {
			btn = "升级为Super 妈咪";
			funUpdate = function () {
				var data = {
					request_context: {
						"customerId":  APP.profileInfo.customerId,
						"appType":  APP.openType,
						"uid": APP.uid,
						updateIsPopUp:1
					},
					access_token: localStorage.getItem('token'),
					system: 'mch'
				};
				$.ajax({
					url : APP.host.api + '/infanthospital/v1/updateIsPopUp',
					data: JSON.stringify(data),
					cache: true,
					type : 'post',
					contentType : 'application/json'
				})
			}
			openDialog(msg, btn, funUpdate, funLocation, 2)
		}
		function openDialog(content, btn, update, location, type) {
			if (type == 1) {
				APP.ui.Dialog({
					isMask: true,
					className: 'tip-update-package-dialog',
					title: '<i class="icon sign"></i><i class="icon heart"></i><i class="icon-dialog-cancel"></i>',
					content: '<p>'+content+'</p>',
					foot: '<botton class="btn-dialog-ok btn">'+btn+'</botton>',
					afterOk: function () {
						this.destory();
						update();
						location()
					},
					afterClose: function () {
						update();
					}
				})
			}
			else {
				APP.ui.Dialog({
					isMask: true,
					className: 'createCard-update-package-dialog',
					title: '<i class="icon sign"></i><i class="icon-dialog-cancel"></i>',
					content: '<p class="icon"></p>',
					foot: '<botton class="btn-dialog-ok btn">'+btn+'</botton>',
					afterOk: function () {
						this.destory();
						update();
						location()
					},
					afterClose: function () {
						update();
					}
				})
			}
			

		} 
		
	}
	APP.getCustomerHistory = function () {
		var self = this;
		var data = {
			request_context: {
				"customerId":  APP.profileInfo.customerId || '',  //卡号  (String类型)
				"appType":  self.openType, //渠道号      (String类型)
				"uid": self.uid
			},
			access_token: localStorage.getItem('token'),
			system: 'mch'
		};
		$.ajax({
			url : self.host.api + '/infanthospital/v1/customerHistory',
			data: JSON.stringify(data),
			cache: true,
			type : 'post',
			contentType : 'application/json'
		})
	};
	APP.getCustomerInfo = function (data, successCb) {
		var self = this;
		$.ajax({
			url : self.host.api + '/infanthospital/v1/initCustomer',
			data: JSON.stringify(data),
			type : 'post',
			contentType : 'application/json',
			success : function(response) {
				APP.router.endLoading();
				//response = JSON.parse(response);
				if (response.ret == 1) {
					var emStatus = response.data.emStatus;
					if (emStatus == 0) {
						localStorage.removeItem('profileInfo');
						localStorage.removeItem('reportList');
						APP.router.gotoPage({pageName: 'index'});
						return;
					}
					// else{
					//     APP.getCustomerHistory();
					// }

					//当状态为2时,
					//获取用户信息,并缓存到localStrage,
					if (emStatus == 2 || emStatus == 1) {
						self.saveProfileInfo(emStatus, response, successCb);
					}
				}
				else {
					APP.ui.showPrompt(response.msg)
				}
			},
			error: function () {
				APP.router.endLoading();
				APP.ui.showPrompt('网络错误,<br>请稍后重试')
			}
		})
	};
	APP.tools = {
		pageCount: function(){
			if($('#baiduCount').length){
				$('#baiduCount').remove();
				baiduCount();
			} else{
				baiduCount();
			}
			function baiduCount(){
				var _hmt = _hmt || [];
				(function() {
					var hm = document.createElement("script");
					hm.src = "//hm.baidu.com/hm.js?9512d7f461c346a527354b5e160a67c2";
					hm.id = "baiduCount";
					var s = document.getElementsByTagName("script")[0]; 
					s.parentNode.insertBefore(hm, s);
				})();
			}
		},
		//记录分享,点击之类的打点
		recordBehavior: function (url, args) {
			var request_context = {
				customerId:  APP.profileInfo.customerId,
				appType:  APP.openType,
				uid: APP.uid                   
			}
			for (var i in args) {
				request_context[i] = args[i]
			}
			var data = {
				request_context: request_context,
				access_token: localStorage.getItem('token'),
				system: 'mch'
			}
			$.ajax({
				url : APP.host.api + url,
				data: JSON.stringify(data),
				type : 'post',
				contentType : 'application/json'
			})

		},
		bindLocation: function () {
			var self = this;
			var isMove = false;
			//解决ios 下delegate 不能点击bug
			var tapEvent = 'ontouchstart' in window ? 'touchend' : 'click';
			document.body.addEventListener('touchmove', function () {
				isMove = true;
			});
			document.body.addEventListener(tapEvent, function (e) {
				var bindLocationDom = self.getDomByEle(e.target, '.bind-location');
				if (bindLocationDom) {
					if (bindLocationDom.dataset.href) {
						e.preventDefault();
						e.stopPropagation();
						if (!isMove) {
							var stateObj = {};
							if (bindLocationDom.dataset.options) {
								stateObj = JSON.parse(bindLocationDom.dataset.options);
							}
							stateObj.pageName = bindLocationDom.dataset.href;
							APP.router.gotoPage(stateObj, {})
						}
						else isMove = false;
					}
				}
			})
		},
		getDomByEle: function (curentEl, selector) {
			var sign = selector[0];
			function getId() {
				while (curentEl) {
					if (curentEl.id === selector.slice(1)) return curentEl
						curentEl = curentEl.parentNode;
				}
				return undefined
			}
			function getClass() {
				while (curentEl) {
					if (curentEl.classList && curentEl.classList.contains(selector.slice(1))) return curentEl;
					curentEl = curentEl.parentNode;
				}
				return undefined
			}
			function getEleName() {
				while (curentEl) {
					if (curentEl.tagName === selector.toUpperCase()) return curentEl;
					curentEl = curentEl.parentNode;
				}
				return undefined
			}
			switch (sign) {
				case '.':
				return getClass()
				case '#':
				return getId()
				default:        
				return getEleName();
			}
		},
		formatDate: function () {
			var date = new Date();
			var format = "yyyy-MM-dd HH:mm:ss";
			switch(typeof date) {   
				case "string":   
				date = new Date(date.replace(/-/, "/"));   
				break;   
				case "number":   
				date = new Date(date);   
				break;   
			}    
			if (!date instanceof Date) return;   
			var dict = {   
				"yyyy": date.getFullYear(),   
				"M": date.getMonth() + 1,   
				"d": date.getDate(),   
				"H": date.getHours(),   
				"m": date.getMinutes(),   
				"s": date.getSeconds(),   
				"MM": ("" + (date.getMonth() + 101)).substr(1),   
				"dd": ("" + (date.getDate() + 100)).substr(1),   
				"HH": ("" + (date.getHours() + 100)).substr(1),   
				"mm": ("" + (date.getMinutes() + 100)).substr(1),   
				"ss": ("" + (date.getSeconds() + 100)).substr(1)   
			};       
			return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {   
				return dict[arguments[0]];   
			});
		},
		cbPathObj: function () {
			var query = location.search;
			if ('pageName' in this.getLocationParam(query))  {
				var cbPathObj = this.getLocationParam(query);
				if (cbPathObj.pageName !== 'index') {
					delete cbPathObj.openId;
					delete cbPathObj.appType;
					return cbPathObj;
				}
			}
			return undefined;
		},
		setPath: function (obj) {
			var path = location.pathname;
			delete obj.replace;
			return path + '?openId=' + encodeURIComponent(APP.uid) + '&appType=' + APP.openType + '&' + this.serializeObj(obj)
		},
		serializeObj: function (options) {
			var arr = [];
			for (var i in options) {
				arr.push(i+'='+options[i]);				
			}
			return arr.join('&');
		},
		getLocationParam: function (url) {
			var params = url.toString().slice(1).split("&");
			var returnObject = {};
			for(var i = 0; i != params.length; i++) {
				var index = params[i].indexOf("=");
				returnObject[params[i].slice(0, index)] = params[i].slice(index+1);
			}
			return returnObject;
		},
		selectCardNo: function (list, cb) {
			var self = this;
			var wrapDiv = document.createElement('div');
			wrapDiv.className = 'widget-dialog-selectCardNo';
			var ininerList = '';
			list.forEach(function (val, index) {
				var checked = '';
				if (APP.profileInfo && APP.profileInfo.cardNo == val.cardNumber) {
					checked = "checked";    
				}
				ininerList+='<li class="item">'+
				'<input data-index="'+index+'" '+checked+' id="select-cardNo-'+index+'" name="select-cardNo" type="radio" value="'+val.cardNumber+'">'+
				'<label for="select-cardNo-'+index+'"><em class="key">'+val.name+':</em>'+val.cardNumber+'</label>'+
				'</li>'
			})
			wrapDiv.innerHTML = '<div class="mask"></div>'+
			'<div class="container">'+
			'<p class="title">请选择当前账号下的就诊人</p>'+
			'<ul class="list">'+ininerList+'</ul>'+
			'<p class="btn">确定</p><div>';
			document.body.appendChild(wrapDiv);
			var btn = wrapDiv.querySelector('.btn');
			btn.addEventListener('click', function () {
				var checkEle = wrapDiv.querySelector('[type="radio"]:checked');
				if (!checkEle) {
					alert('请至少勾选一个选型!')
					return false;
				}
				btn.removeEventListener('click', function () {});
				wrapDiv.parentNode.removeChild(wrapDiv);
				cb(list[checkEle.dataset.index]);    
			})
		},
		encryptedString: function (publicKey) {
			var key = RSAUtils.getKeyPair(publicKey.publicExponent, '', publicKey.modulus);
			var current = this.formatDate();
			var openId = APP.uid + ',' + current;
			var token = RSAUtils.encryptedString(key, openId);
			return token;
		},
		//设置页面标题,主要针对ios下的微信端
		setPageTitle: function (title) {
			var $body = $('body');
			document.title = title
			// hack在微信等webview中无法修改document.title的情况
			var $iframe = $('<iframe src="/fav.icon" style="height:0px; width: 0px; visibility: hidden"></iframe>').on('load', function() {
				setTimeout(function() {
					$iframe.off('load').remove()
				}, 0)
			}).appendTo($body) 
		},
		platform: function () {
			var ua = navigator.userAgent;
			var android = ua.match(/(Android)[\s\/]+([\d.]+)/);
			var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
			var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
			var ipod = !ipad && !iphone && ua.match(/(iPod).*OS\s([\d_]+)/);
			if(ipad||iphone||ipod){
				return 2;
			} else {
				return 1;
			}
			
		},
		//日期控件change方法在ios和android下表现不一样
		selectValueChange: function ($dom, cb) {
			var self = this;
			var eventName = self.platform() == 2 ? 'blur' : (self.getEnvironment() == 2 ? 'input' : 'change');
			$dom.on(eventName, function () {
				cb($dom.val())
			})
		},//正则表达式对象
		regExpObj: {
			mobile: /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/
		},
		//判断运行浏览器环境,
		getEnvironment: function () {
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = ua.indexOf('micromessenger') != -1;
			var isApply = ua.indexOf('aliapp') != -1;
			if (isWeixin) return 1;
			if (isApply) return 2;
			return null
		},
		isValidEnvironment: function () {
			var isValidEnvironments = this.getEnvironment();
			var environment = APP._getOpenType();
			if (!isValidEnvironments) {
				if (environment == 1) {//微信环境
					$('#wx_environment_placeholder').show();
					return false;
				}
				if (environment == 2) {//支付宝环境
					$('#apply_environment_placeholder').show();
					return false;
				}
			}
			else {
				if (isValidEnvironments == 1 && environment == 2) {
					$('#apply_environment_placeholder').show();
					return false;
				}
				else if (isValidEnvironments == 2 && environment == 1) {
					$('#wx_environment_placeholder').show();
					return false;
				}
				else {
					$('#wx_environment_placeholder').show();
					return false;
				}
			}
			return true
		}
		  
	};
	APP.profileInfo = {};
	APP.saveProfileInfo = function (status, response, successCb) {
		var self = this;
		//等于1是没有卡
		if (status == 1) {
			localStorage.removeItem('profileInfo');
			localStorage.removeItem('reportList');
			sessionStorage.clear(); 
			self.profileInfo.emStatus = status;
			if (successCb) successCb(status)
			else self.router.initJump();
		}
		else {
			personInfoObj(response.data.customerList[0], 1); 
			function personInfoObj(obj, cardLens) {
				self.profileInfo = obj;
				self.profileInfo.uid = APP.uid;
				self.profileInfo.emChannel = response.emChannel;
				self.profileInfo.emStatus = status;
				//localStorage.setItem('profileInfo', JSON.stringify(self.profileInfo));
				APP.getCustomerHistory();
				if (successCb) successCb(status, cardLens)
				else self.router.initJump();
			}                      
		}
	}  
	APP.changeCardCb = function (status, cardLens) {
		if (status == 1) {
			APP.ui.Dialog({
					isMask: true,
					title: '提示',
					className: 'dialog-container',
					content: '您当前未绑定就诊卡',
					foot: '<button class="btn-dialog-ok">确定</button>',
					afterOk: function () {
						this.close()
						APP.router.gotoPage({pageName: 'antenatal', replace: 1})
					}    
			});
		}
		else {
			if (cardLens == 1) {
				APP.ui.showPrompt('您只有一张就诊卡,<br>无法更换哦', function () {
					APP.router.gotoPage({pageName: APP.router.curPathName, replace: 1})
				})
				return;
			}
			APP.router.gotoPage({pageName: APP.router.curPathName, replace: 1})
		}
	} 

	APP.router = {
		setRouter: function (stateObj, component) {
			if (!('urlAction' in stateObj)) {
				if (stateObj.replace) history.replaceState(stateObj, '', APP.tools.setPath(stateObj));
				else history.pushState(stateObj, '', APP.tools.setPath(stateObj));
			}
			this.updatePageView(component)
		},
		updatePageView: function (component) {
			this.endLoading();
			if (this.curPathWidget) this.curPathWidget.destroy();
			this.curPathWidget = component; 
			//APP.afterInitPageFun()           
		},
		curPathWidget: undefined,
		curPathName: undefined,
		cbPathObj: APP.tools.cbPathObj(),
		gotoPage: function (stateObj) {
			this.curPathName = stateObj.pageName;
			this.startLoading();
			this.pathNew(stateObj.pageName, stateObj);            
		},
		initJump: function () {
			var stateObj = {};
			if (this.cbPathObj) stateObj = this.cbPathObj;
			else stateObj.pageName = 'antenatal';
			stateObj.replace = 1;
			this.gotoPage(stateObj);
			this.cbPath = null;
		},
		startLoading: function (type) {
			var $loading = $('#layout_loading');
			$loading.addClass('visible')
		},
		endLoading: function (type) {
			var $loading = $('#layout_loading');
			$loading.removeClass('visible')
		}

	};
	APP.router.pathNew = function (path, stateObj) {
		var load = require("bundle-loader?lazy&name=[name]!./"+path+".js");
		load(function (path) {
			if (APP.router.curPathName == stateObj.pageName) path.init(stateObj);
		})


	}
	APP.recordsObj = {
		setReqStr: function (obj) {
			var base = {
				cururl: document.location.href.replace(/&/g, '~@~'),
				autumn: 'wap',
				uuid: 'uuid',
				userid: APP.uid,
				refer: APP.appType == 1 ? 'wx' : 'apply',
				tracker_u: APP.appType == 1 ? 'wx100' : 'apply100',
				visitid: 'visitid',
				mall: 'mall',
				original: 'yifuying',
				action: 'none',
			};
			if (obj) {
				for (var i in obj) {
					base[i] = obj[i]
				}
			}
			return APP.tools.serializeObj(base)
		}
	}
	Object.defineProperty(window, 'APP', {
		value: APP
	}) ;
	APP.init();
	return {}
});