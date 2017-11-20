(function(window) {

	'use strict';

	var callBackList = [];
	var callNavList=[];
	var baseConfig = {
		scheme: "gl://",
		debuger: true

	}
	function versionCode(){
		if(isApp()){
			var _u ;
			_u = autumn()=="ios"?navigator.userAgent.split("@")[2]:navigator.userAgent.split("@")[3].split(" ")[0];
			if(_u.indexOf('v')>0){
				return "523"
			}
			if(_u*1==NaN){
				return "523"
			}else{
				return _u;
			}
		}else{
			return 0;
		}
	}

	var postUrl = function(strUrl, param, callid) {
		if(navigator.userAgent.match(/app_sdk/i) ? true : false) {
			var c = document.createElement("div")
			c.innerHTML = '<iframe style="display: none;" src="' + baseConfig.scheme +
				strUrl + "?callid=" + callid +
				"&param=" + encodeURIComponent(JSON.stringify(param)) + '"/>'
			document.querySelector("body").appendChild(c)
			setTimeout(function() {
				document.querySelector("body").removeChild(c)
			}, 3000)

		}
	}

	var mergeObjs = function(def, obj) {
		if(!obj) {
			return def;
		} else if(!def) {
			return obj;
		}

		for(var i in obj) {
			if(obj[i] != null && obj[i].constructor == Object) {
				def[i] = mergeObjs(def[i], obj[i]);
			} else if(obj[i] != null && (obj[i] instanceof Array) && obj[i].length > 0) {
				if(obj[i][0].constructor == Object) {
					var newobjs = [];
					var objids = {}
					for(var x = 0, l = def[i].length; x < l; x++) {
						objids[def[i][x].id] = x;
					}

					for(var x = 0, l = obj[i].length; x < l; x++) {
						var newobj = obj[i][x];
						if(objids[newobj.id] !== undefined) {
							def[i][x] = mergeObjs(def[i][x], newobj);
						} else {
							newobjs.push(newobj);
						}
					}

					for(var x = 0, l = newobjs.length; x < l; x++) {
						def[i].push(newobjs[x]);
					}
				} else {
					for(var x = 0; x < obj[i].length; x++) {
						var idxObj = obj[i][x];
						if(def[i].indexOf(idxObj) === -1) {
							def[i].push(idxObj);
						}
					}
				}
			} else {
				def[i] = obj[i];
			}
		}
		return def;
	}

	var jsb = function(target, option, param, cf,f1,f2) {
	console.log(arguments)
		var callid = callBackList.length;
		if(typeof arguments[1] !== "function") {
			param = mergeObjs(param, option)
		}else if(typeof arguments[1] == "function"){
		  cf =arguments[1];
		}
		if(!cf){
		cf =  new Function();
		}
		if(target=="setupNavigation"){
		   param.left.callid = callBackList.length+1;
		   callbackListFunction( param.left.callid, f1);
		   param.right.callid = callBackList.length+1;
		   callbackListFunction( param.right.callid, f2)

		}
		if(navigator.userAgent.match(/Android/i) ? true : false) {
			switch(target) {
				case "getAppCookie":
					callbackListFunction(callid, cf(JSON.parse(Browser.getAppCookie())))
					break;
				case "updateAppStorage":
					callbackListFunction(callid, cf(JSON.parse(Browser.updateAppStorage(JSON.stringify(param)))))
					break;
				case "queryAppStorage":
					callbackListFunction(callid, cf(JSON.parse(Browser.queryAppStorage(JSON.stringify(param)))))
					break;
				case "removeAllAppStorage":
					callbackListFunction(callid, cf(JSON.parse(Browser.removeAllAppStorage())))
					break;
				case "hideTabbar":
					return;
					break;

				default:
					callbackListFunction(callid, cf)
			}
		} else {
			callbackListFunction(callid, cf)
		}

		log(target, param);
		postUrl(target, param, callid)
	}
	var toast = function(option, cf) {
		var param = {
			toast: ""
		}
		jsb("toast", option, param, cf);
	}
	var toNativedetail = function(option, cf) {

		var param = {
			topage: "product",
			animation: 0,
			fixPage: false, //true:去特定页面 false:正常推出一个页面 默认false
			params: {}
		}
		jsb("forward", option, param, cf);

	}

	var openWebView = function(option, cf) {

		var param = {
			topage: "webview",
			animation: 0,
			fixPage: false, //true:去特定页面 false:正常推出一个页面 默认false
			params: {
				url: "",
				backward: false
			}
		}
		jsb("forward", option, param, cf);

	}
	var back = function(option, cf) {
		var param = {
			animation: 0
		}
		jsb("back", option, param, cf);
	}

	var shutDown = function(option, cf) {

		var param = {
			animation: 0
		}
		jsb("shutDown", option, param, cf);

	}
	var isLogin = function(option, cf) {
		jsb("isLogin", option, {}, cf);

	}

	var getUserInfo = function(option, cf) {
		jsb("getUserInfo", option, {}, cf);

	}

	var getNetworkStatus = function(option, cf) {
		jsb("getNetworkStatus", option, {}, cf);

	}
	var getLocationInfo = function(option, cf) {
		jsb("getLocationInfo", option, {}, cf);

	}
	var getAppInfo = function(option, cf) {
		jsb("getAppInfo", option, {}, cf);

	}
	var wxPay = function(option, cf) {
		var param = {
			sign: "8CFB1928B3098513CA917205359D792D",
			timestamp: "1488350950",
			noncestr: "1hl3lw1k1cC7jGAw",
			partnerid: "1221847901",
			prepayid: "wx20170301144909d8287b83680576459167",
			package: "Sign=WXPay"
		}
		jsb("wxPay", option, param, cf);

	}

	var aliPay = function(option, cf) {

		var param = {
			orderInfo: 'partner="2088501903418573"&seller_id="etao@111.com.cn"&out_trade_no="20170301164415605369"&subject="1药网订单"&body="待结算"&total_fee="29.0"&notify_url="http://114.80.125.5:8181/payment/alipay/appTradeNotifyTwo.action"&service="mobile.securitypay.pay"&_input_charset="utf-8"&payment_type="1"&sign_type="RSA"&sign="fXl0L5Oa6AuUixi138%2F4qWBcBGPU4IAZT6T95x6jjfkwgUh5IsBYIJhjhrnAn2bZQlolA470oZMPYkB0D1gdIXtAg8cGQcBJplvE%2FpUbB%2B2xd8QYuM2w%2Fa2ljVV%2FW1RX3NOmm838%2FjkgNk2Dkl%2FANCTTPzGJBOagh4ESQWuPMAo%3D"'
		}
		jsb("aliPay", option, param, cf);

	}
	var linkPay = function(option, cf) {
		var param = {
			orderInfo: '{\"busi_partner\":\"101001\",\"dt_order\":\"20170303105801\",\"money_order\":\"0.01\",\"no_order\":\"20170303105753974138\",\"notify_url\":\"http://114.80.125.5:8181/payment/lianlian/tradeNotifyUrl.action\",\"oid_partner\":\"201408071000001546\",\"risk_item\":\"{\\\"delivery_cycle\\\":\\\"other\\\",\\\"frms_ware_category\\\":\\\"4006\\\",\\\"logistics_mode\\\":\\\"2\\\",\\\"user_info_mercht_userno\\\":147281734}\",\"sign\":\"76395a6b69c8b00ed8f10a98ddd50fa5\",\"sign_type\":\"MD5\",\"user_id\":\"147281734\"}'
		}
		jsb("linkPay", option, param, cf);

	}
	var yiQianBaoPay = function(option, cf) {
		var param = {
			orderInfo: '{"cashierType":"0","protocolInfo":{"orderId":"1703010000460645"},"resultDisplayLevel":"N"}'
		}
		jsb("yiQianBaoPay", option, param, cf);

	}
	var bestPay = function(option, cf) {
		var param = {
			orderInfo: 'SERVICE=mobile.security.pay&MERCHANTID=02440103010150900&MERCHANTPWD=768231&SUBMERCHANTID=&BACKMERCHANTURL=http://114.80.125.5:8181/payment/yizhifu/appTradeNotifyYiZhiFu.action&ORDERSEQ=20170301164415605369&ORDERREQTRANSEQ=20170301164415605369&ORDERTIME=20170301164416&ORDERVALIDITYTIME=&CURTYPE=RMB&ORDERAMOUNT=29.0&SUBJECT=纯支付&PRODUCTID=04&PRODUCTDESC=APP翼支付&CUSTOMERID=20170301164415605369&SWTICHACC=false&SIGN=EDE379054221B625D9A6C772955EEE8D&PRODUCTAMOUNT=29.0&ATTACHAMOUNT=0.00&ATTACH=77&ACCOUNTID=&USERIP=10.6.30.85&BUSITYPE=04&EXTERNTOKEN=NO&SIGNTYPE=MD5'
		}
		jsb("bestPay", option, param, cf);
	}

	/**
	 * add updateLoginToken
	 * @param {*} option 
	 * @param {*} cf 
	 */

	var updateLoginToken = function (option, cf) {
		var param = {
			token:"",
			glToken:""
		}
		jsb('updateLoginToken', option, param, cf)
	}
	/**
	 * call4Phone
	 * @param {*} option 
	 * @param {*} cf 
	 */

	var call4Phone = function (option, cf) {
		jsb('tel', option, {}, cf)
	} 
	var share = function(option, cf) {
		var param = {
			"title": "中药", //分享的标题
			"content": "可以用来养生", //分享的内容
			"imgUrl": "https://eaifjfe.jpg", //分享的小图标url
			"shareUrl": "https://www.baidu.com", //分享落地链接
			//wxfriend:微信好友 wxzone:微信朋友圈 qqfriend:qq好友  qqzone:qq空间
			//weibo:微博 sms:短信分享
			//按传值顺序传几个显示几个
			shareTypes: [
				"wxfriend",
				"qqfriend",
				"weibo"
			],
		}
		jsb("share", option, param, cf);

	}
	var pickImage = function(option, cf) {
		var param = {
			pickType: 0, //pickType 0:让用户选择拍照或选取图片 1:拍照 2:图片
			allowEdit: 0, //0:读取图片后不允许用户编辑  1:允许
			uploadUrl: "https://eaifjfe.com", //网路上传地址
		}
		jsb("pickImage", option, param, cf);

	}

	var forbidPanBack = function(option, cf) {
		var param = {
			forbidPanBack: true,
		}
		jsb("forbidPanBack", option, param, cf);

	}
	var networkReq = function(option, cf) {
		var param = {
			requestUrl: "https://mobi.fangkuaiyi.com", //shceme和host
			param: {
				"content": "东西用的不错",
				"title": "还会再买"
			}
		}
		jsb("networkReq", option, param, cf);

	}
	var hideNavigation = function(option, cf) {
		var param = {
			isHide: true
		}
		jsb("hideNavigation", option, param, cf);
	}
	var setupNavigation = function(option, cf,f1,f2) {
		var param = {
			left: {
				hasBack: true,
				hasShutdown: true,
				callid: 9999
			},
			 isShow:false,     //是否显示原生导航，默认false
			middle: {
				title: ""
			},
			right: //最多有两个数据
				[{
					menuType: 0,
					imgUrl: "",
					buttonName: "",
					callid: 9998
				}]
		}
		jsb("setupNavigation", option, param, cf,f1,f2);

	}

	var getHistoryData = function(option, cf) {
		jsb("getHistoryData", option, {}, cf);

	}
	var getAppCookie = function(option, cf) {
		jsb("getAppCookie", option, {}, cf);

	}
	var scanning = function(option, cf) {
		jsb("scanning", option, {}, cf);

	}
	var setProvince = function(option, cf) {
		var param = {
			provinceName: '上海'
		}
		jsb("setProvince", option, param, cf);

	}
	var synCartNumStatus = function(option, cf) {
		var param = {
			cartnum: 0
		}
		jsb("synCartNumStatus", option, param, cf);

	}
	var autoLogin = function(option, cf) {
		jsb("autoLogin", option, {}, cf);

	}
	var updateAppStorage = function(option, cf) {
		var param = {
			key: "",
			value: "",
			isPersistence:false
		}
		jsb("updateAppStorage", option, param, cf);

	}
	var queryAppStorage = function(option, cf) {
		var param = {
			key: ""
		}
		jsb("queryAppStorage", option, param, cf);
	}
	var removeAllAppStorage = function(option, cf) {
		jsb("removeAllAppStorage", option, {}, cf);
	}
	var hideTabbar = function(option, cf) {
		var param = {
			hide: true //true：隐藏 false:显示
		}
		jsb("hideTabbar", option, param, cf);
	}

	var goPay = function(option, cf) {
		var param = {
			topage: "bank",
			animation: 0,
			fixPage: false, //true:去特定页面 false:正常推出一个页面 默认false
			params: {
				paymentId: "AE233", //支付方式
				isPOSOK: true, //是否支持pos机
				isYiKaTongOK: true, //是否支持一卡通
				isHuoDaoFuKuanOK: true, //是否支持货到付款
				orderID: "883738733", //订单id,一般传nil
				userCoin: "0" //支付金额，一般传0
			}
		}
		jsb("forward", option, param, cf);

	}
	var synDemandNumStatus = function(option, cf) {
		var param = {
			demandnum: 0
		};
		jsb("synDemandNumStatus", option, param, cf);
	}
	var openChat = function(option, cf) {
    	if(versionCode()>"523"){
     	 	jsb("openChat", option, {}, cf);
     	}else{
     		NTKF&&NTKF.im_openInPageChat(option.xnId)
     	}
	}

	var hideLoading = function(option, cf) {
		jsb("hideLoading", option, {}, cf);
	}

	function init() {
				//setupNavigation();
				//hideNavigation();
	}

	function callbackListFunction(callid, cf) {
		callBackList[callid] = cf || new Function();

	}

	function autumn() {
			var u = navigator.userAgent;
			var isAndroid = u.indexOf("android") > -1 ;
			var isiOS =  u.indexOf("iphone") > -1;
			var isWap = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/); /*是否为移动终端*/
			if(isApp()) {
				return isAndroid ? "android" : "ios"
			} else {
				return isWap ? "wap" : "offical"

			}
		}
		function isApp(){
			if(navigator.userAgent.indexOf("app_yiwang") > -1 ) {
				return true;
			}else{
				return false;
			}
		}

	function nativeCallback(result) {
		var res = "";
		if(!navigator.userAgent.match(/Android/i) ? true : false){
		  res = result
		}else{
		  res= JSON.parse(result);
		}
		callBackList[res.callid * 1](res);

	}

	var jsBridge = {
		callback: nativeCallback,
		toast: toast,
		share: share,
		toNativedetail: toNativedetail,
		openWebView: openWebView,
		back: back,
		shutDown: shutDown,
		isLogin: isLogin,
		getNetworkStatus: getNetworkStatus,
		getUserInfo: getUserInfo,
		getLocationInfo: getLocationInfo,
		getAppInfo: getAppInfo,
		wxPay: wxPay,
		aliPay: aliPay,
		linkPay: linkPay,
		yiQianBaoPay: yiQianBaoPay,
		bestPay: bestPay,
		pickImage: pickImage,
		forbidPanBack: forbidPanBack,
		networkReq: networkReq,
		hideNavigation: hideNavigation,
		setupNavigation: setupNavigation,
		getHistoryData: getHistoryData,
		goPay: goPay,
		getAppCookie: getAppCookie,
		scanning: scanning,
		setProvince: setProvince,
		synCartNumStatus: synCartNumStatus,
		synDemandNumStatus: synDemandNumStatus,
		autoLogin: autoLogin,
		updateAppStorage: updateAppStorage,
		queryAppStorage: queryAppStorage,
		removeAllAppStorage: removeAllAppStorage,
		hideTabbar: hideTabbar,
		hideLoading:hideLoading,
		openChat:openChat,
		init: init,
		updateLoginToken: updateLoginToken,
		call4Phone: call4Phone
	};

	function log(name, param) {
		if(baseConfig.debuger) {
			console.log("调用的方法是--->" + name);
			console.log("调用的参数是 --->" + JSON.stringify(param));
		}
		/*	layer.open({
				content: msg,
				time: 2
			});*/

	}
	if(typeof define === 'function' && define.amd) {
		// AMD
		define(jsBridge);
	} else {
		window.jsBridge = jsBridge;
	}

})(window);

function networkStatusChange(o) {
	console.log("网络变化了" + JSON.stringify(o))
}

function userStatusChange(o) {
	console.log("登录状态改变了" + JSON.stringify(o))
}


function fillweb(o) {
	console.log("通知网页取值" + JSON.stringify(o))

}

function webchange() {

}

function nativeBack() {
	console.log("我从native界面返回了 刷新不刷新 看你自己的业务逻辑吧")
}

function callback(o) {
	jsBridge.callback(o)
}
jsBridge.init();

;
/*! layer mobile-v2.0 弹层组件移动版 License LGPL http://layer.layui.com/mobile By 贤心 */
;!function(a){"use strict";var b=document,c="querySelectorAll",d="getElementsByClassName",e=function(a){return b[c](a)},f={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:"scale"},g={extend:function(a){var b=JSON.parse(JSON.stringify(f));for(var c in a)b[c]=a[c];return b},timer:{},end:{}};g.touch=function(a,b){a.addEventListener("click",function(a){b.call(this,a)},!1)};var h=0,i=["layui-m-layer"],j=function(a){var b=this;b.config=g.extend(a),b.view()};j.prototype.view=function(){var a=this,c=a.config,f=b.createElement("div");a.id=f.id=i[0]+h,f.setAttribute("class",i[0]+" "+i[0]+(c.type||0)),f.setAttribute("index",h);var g=function(){var a="object"==typeof c.title;return c.title?'<h3 style="'+(a?c.title[1]:"")+'">'+(a?c.title[0]:c.title)+"</h3>":""}(),j=function(){"string"==typeof c.btn&&(c.btn=[c.btn]);var a,b=(c.btn||[]).length;return 0!==b&&c.btn?(a='<span yes type="1">'+c.btn[0]+"</span>",2===b&&(a='<span no type="0">'+c.btn[1]+"</span>"+a),'<div class="layui-m-layerbtn">'+a+"</div>"):""}();if(c.fixed||(c.top=c.hasOwnProperty("top")?c.top:100,c.style=c.style||"",c.style+=" top:"+(b.body.scrollTop+c.top)+"px"),2===c.type&&(c.content='<i></i><i class="layui-m-layerload"></i><i></i><p>'+(c.content||"")+"</p>"),c.skin&&(c.anim="up"),"msg"===c.skin&&(c.shade=!1),f.innerHTML=(c.shade?"<div "+("string"==typeof c.shade?'style="'+c.shade+'"':"")+' class="layui-m-layershade"></div>':"")+'<div class="layui-m-layermain" '+(c.fixed?"":'style="position:static;"')+'><div class="layui-m-layersection"><div class="layui-m-layerchild '+(c.skin?"layui-m-layer-"+c.skin+" ":"")+(c.className?c.className:"")+" "+(c.anim?"layui-m-anim-"+c.anim:"")+'" '+(c.style?'style="'+c.style+'"':"")+">"+g+'<div class="layui-m-layercont">'+c.content+"</div>"+j+"</div></div></div>",!c.type||2===c.type){var k=b[d](i[0]+c.type),l=k.length;l>=1&&layer.close(k[0].getAttribute("index"))}document.body.appendChild(f);var m=a.elem=e("#"+a.id)[0];c.success&&c.success(m),a.index=h++,a.action(c,m)},j.prototype.action=function(a,b){var c=this;a.time&&(g.timer[c.index]=setTimeout(function(){layer.close(c.index)},1e3*a.time));var e=function(){var b=this.getAttribute("type");0==b?(a.no&&a.no(),layer.close(c.index)):a.yes?a.yes(c.index):layer.close(c.index)};if(a.btn)for(var f=b[d]("layui-m-layerbtn")[0].children,h=f.length,i=0;h>i;i++)g.touch(f[i],e);if(a.shade&&a.shadeClose){var j=b[d]("layui-m-layershade")[0];g.touch(j,function(){layer.close(c.index,a.end)})}a.end&&(g.end[c.index]=a.end)},a.layer={v:"2.0",index:h,open:function(a){var b=new j(a||{});return b.index},close:function(a){var c=e("#"+i[0]+a)[0];c&&(c.innerHTML="",b.body.removeChild(c),clearTimeout(g.timer[a]),delete g.timer[a],"function"==typeof g.end[a]&&g.end[a](),delete g.end[a])},closeAll:function(){for(var a=b[d](i[0]),c=0,e=a.length;e>c;c++)layer.close(0|a[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var a=document.scripts,c=a[a.length-1],d=c.src,e=d.substring(0,d.lastIndexOf("/")+1);c.getAttribute("merge")||""}()}(window);

;
(function(window) {
  var common = {
    init: function(){
      if(!common.isApp()){
        common.showTracelessPop();
        common.unionLogin();
      }
    },
    showTracelessPop: function(){
      if(!common.hasCookie()||!common.hasLocalStorage()||!common.hasSessionStorage()){
        common.msgShow('您的浏览器可能是在无痕/隐私模式下，可以试试关闭无痕/隐私模式后再访问本页面。',10);
      }
    },
    hasLocalStorage: function(){
      var t = '';
      try{
        window.localStorage.setItem('testLocalStorage','true');
        t = window.localStorage.getItem('testLocalStorage');
      } catch (e){
        t = '';
      }
      
      if(t && t=='true'){
        window.localStorage.removeItem('testLocalStorage');
        return true;
      } else {
        console.log('no support localStorage')
        return false;
      }
    },
    hasCookie: function(){
      var t = '';
      common.cookie('testCookie','true',1);
      try {
        t = common.cookie('testCookie');
      } catch(e){
        t = document.cookie || '';
      }
      
      if(t=='true'){
        return true;
      } else {
        console.log('no support cookie')
        return false;
      }
    },
    hasSessionStorage: function(){
      var t = '';
      try {
        window.sessionStorage.setItem('testSessionStorage','true');
        t = window.sessionStorage.getItem('testSessionStorage');
      } catch(e) {
        t = '';
      }
      if(t && t=='true'){
        window.sessionStorage.removeItem('testSessionStorage');
        return true;
      } else {
        console.log('no support sessionStorage')
        return false;
      }
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPod/i) ? true : false;
    },
    isAndroid: function() {
      return navigator.userAgent.match(/Android/i) ? true : false;
    },
    isApp: function() {
      return navigator.userAgent.match(/app_sdk/i) ? true : false;
    },
    isIpad: function() {
      return navigator.userAgent.match(/iPad/i) ? true : false;
    },
    isAndroidpad: function() {
      return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1 && navigator.userAgent.indexOf('pad') > -1;
    },
    isWap: function() {
      return !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/); /*是否为移动终端*/
    },
    getSiteId: function() {
      var siteId = 9;
      var channel = common.cookie('fromWhere');
      if(common.isApp()) {
        if(common.isAndroid()) {
          siteId = 7;
        }
        if(common.isIpad()) {
          siteId = 6;
        }
        if(common.isAndroidpad()) {
          siteId = 7;
        }
        if(common.iOS()) {
          siteId = 3;
        }
      } else {
        if(channel){
          switch(channel){
            case '0':
              siteId = 17;  //百度
              break;
            case '1': 
              siteId = 18;  //哮喘管家
              break;
            case '2': 
              siteId = 22;  //好啦科技
              break;
            case '3': 
              siteId = 23;  //好啦科技
              break;
            case '18': 
              siteId = 19;  //微信卡券
              break;
          }
        } else if(common.isWap()) {
          siteId = 9;
        } else {
          siteId = 0;
        }
      }
      return siteId;
    },

    /**
     *  开始加载
     * @param msg
     * @param time
     */
    msgShow: function(msg, time) {
      //提示
      layer.open({
        content: msg,
        skin: 'msg',
        time: time || 2 //2秒后自动关闭
      });
    },
    autoLogin:function(cf){
      if(common.isApp()) {
        jsBridge.autoLogin(function(res){
           if(res.errcode==0){
            location.reload();
           }else{
            cf();
           }
        })
      }else{
        cf();
      }
    },
    unionLogin:function(){
      if(!common.isApp()) {
        var hashParams = common.getLocationParam("?"+window.location.hash.split('?')[1]);
        if(hashParams.tracker_u){
            common.cookie('tracker_u',hashParams.tracker_u,1);
        }
        if(hashParams.tracker_u == '50000037' && hashParams.asthmaParams){
          var data = {
            tradername: 'yw_app',
            trader:common.isApp()?(common.iOS() ? "iphone" : "androidphone"):"h5",
            closesignature: "yes",
            signature_method: "md5",
            timestamp: new Date().getTime(),
            signature: "****",
            siteid:common.getSiteId(),
            from:"xcgj",
            params:decodeURIComponent(hashParams.asthmaParams),

          }
          var url = '//gateway.fangkuaiyi.com/xpassport/open_login'
          common.Ajax({
            url:url,
            data:data,
            type:'post',
            success:function(res){
              var r = JSON.parse(res);
              if(r && r.rtn_code == '0'){
                common.cookie('UserInfo',r.data.loginStr,1);
                common.cookie('fromWhere','1',1);
                common.cookie('gltoken',r.data.newtoken,1);
              }
            }
          })
        }
      }
    },
    successTip: function(msg, time) {
      layer.open({
        type: 1,
        shadeClose: false,
        time: time || 2, //2秒后自动关闭,
        shade: false,
        content: '  <div class="message_layer_ show_msg"><i class="success_ico"></i><p class="message_name">' + msg || '操作成功！' + '</p></div>'
      });
    },
    loading: function() {
      if(common.isApp()) {
        jsBridge.hideLoading()
      }
      layer.open({
        type: 1,
        shadeClose: false,
        style: 'border:none; background:none;box-shadow: none;',
        shade: true,
        content: '<img style="width:2rem" src="data:image/gif;base64,R0lGODlhbgBkAPf8AODw+TCa1/vLRPi7t+xNQ/7y0QGDzutFO+k5L1+x4OgpHfe0sPrT0QKEzv76+ucmGugsIAqI0PWinQmH0BaO0hSN0vvMS/Sfmvm9FOxPRfP5/fi/vOgwJazX7+j0+9Pq9/m+GaXT7jqf2fGAeWu347Tb8fWgmv/9/eguI//8+/m6Cvm8DyeW1bfc8Y7I6anV7onG6EGj2vSemUSk29zu+N7v+QuI0JLK6v/7+lKr3vF9dvrV0/3il/i+utHp9upEOvzm5QiH0PrW1PrHOBuQ0/zhlf/78uclGCqX1h2R1Obz+uLx+etHPfrFLuk2K77f8/rCJvappOtFOsLh8/713QyJ0PzXcP7y8VWs3vvNTVqv31uv3/m/Gsnl9f7vxRWN0jie2f7012Oz4f724fm8Efm9E/m9Ffz+/vrKQf723v723+kzJ+gtIfrJPv7vxPzj4fm7DfizBvm8EOq2EayoQ/WUCviwBu9nD/75+Wmaee9oDwqFxgGDzfX6/auoRPOLCwaGz16x4P/66+gwF+gqF/zfjfrKQ//89bbc8dnt+PnLyfrJPecnG/nIxf3imGCy4Lnd8u5kW/3r6oDB5/nMyugvJOk5LoTD54LC5+tLQbDZ8M3n9epANrrd8g2GxPzk4vaxrW244yiW1my44/H4/Pzk4/nJxv745fzXcupCOPv9/vzXcfm+F9fs9wWFz/vPUv3q6f734/rHNvavq+tMQvm9EvD4/PvMSu5jWoPD567Y7/OKC/3+//zn5vrJPyaV1a3X7+kyJqrW7xSHvu63DgeGzwKDzHCbc//+/ecoHXGcc/zfjrusN/vQVYuoePC4DjKa1fvPU/izCeu2EegzG/i9ufalKexONvJ+J+gxJvaeFIrG53Gbc/vOU+tGO/DKUfacEpjJ3vrTzzKYyxWKyFus0/C3DvK6E/e1o++4EvvNUO9qEvF5Ix+R0vPHQey3Eeo+LdO3O/W7E/nHdfBvF+XAP/i1CHWdc/m5BeckGACDzv///////wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3YTcxNDJhMy02NjY3LTQ0MDktODA3ZS0zMzA1ZDM5YzNjODUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODBEOEI3N0FEMTY0MTFFNkE0QzNENjk2QkE0RjZBMzgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODBEOEI3NzlEMTY0MTFFNkE0QzNENjk2QkE0RjZBMzgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjdjNjk2NmYtZGUzZS00YjQ0LThhZjMtZGJmN2U4ZWRkYjE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdhNzE0MmEzLTY2NjctNDQwOS04MDdlLTMzMDVkMzljM2M4NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWE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" />'
      });
    },

    /**
     * 结束加载
     */
    loadingClose: function() {
      layer.closeAll();
    },
    xhr: function(url, data, method, callback) {
      url = url || "";
      data = data || {};
      method = method || "";
      callback = callback || function() {};
      var getKeys = function(obj) {
        var keys = [];
        for(var key in obj) {
          if(obj.hasOwnProperty(key)) {
            keys.push(key)
          }
        }
        return keys
      };
      if(typeof data == "object") {
        var queryString = "";
        var keys = getKeys(data);
        for(var i = 0; i < keys.length; i++) {
          queryString += encodeURIComponent(keys[i]) + "=" + encodeURIComponent(data[keys[i]]);
          if(i != keys.length - 1) {
            queryString += "&"
          }
        }
        url += "" + queryString
      } else {
        if(typeof data == "function") {
          method = data;
          callback = method
        }
      }
      if(typeof method == "function") {
        callback = method;
        method = "callback"
      }
      if(!Date.now) {
        Date.now = function() {
          return new Date().getTime()
        }
      }
      var timestamp = Date.now();
      var generatedFunction = "jsonp" + Math.round(timestamp + Math.random() * 1000001);
      window[generatedFunction] = function(json) {
        callback(json);
        try {
          delete window[generatedFunction]
        } catch(e) {
          window[generatedFunction] = undefined
        }
      };
      if(url.indexOf("?") === -1) {
        url = url + "?"
      } else {
        url = url + "&"
      }
      var jsonpScript = document.createElement("script");
      jsonpScript.setAttribute("src", url + method + "=" + generatedFunction);
      document.getElementsByTagName("head")[0].appendChild(jsonpScript)
    },
    /**
     *  字符串的限制长度
     * @param str
     * @param num
     * @returns {*}
     */
    strLimit: function(str, num) {
      if(str && str.length > num) {
        return str.slice(0, num) + '...';
      } else {
        return str;
      }
    },
    localStorage: {
      /**
       * 设置localStorage数据
       * 格式
       * {key:'',value:''}
       *
       * @param data
       */
      setItem: function(key,value){
        if(common.hasLocalStorage()){
          if(typeof(value) == 'object') {
            window.localStorage.setItem(key, JSON.stringify(value));
          } else if(typeof(value) == 'string') {
            window.localStorage.setItem(key, value);
          }
        } else if(!common.isApp()){
          if(typeof(value) == 'object') {
            common.cookie(key, JSON.stringify(value),1);
          } else if(typeof(value) == 'string') {
            common.cookie(key, value,1);
          }
        }
      },
      getItem: function(key){
        if(common.hasLocalStorage()){
          var val = window.localStorage.getItem(key) || "";
          if(val.search(/:/i) > 0) {
            val = JSON.parse(val);
          }
          return val;
        } else if(!common.isApp()){
          return common.cookie(key);
        }
      },
      removeItem: function(key){
        if(common.hasLocalStorage()){
          window.localStorage.removeItem(key);
        } else if(!common.isApp()){
          common.cookie(key,'',-1);
        }
      },
      clear: function(){
        if(common.hasLocalStorage()){
          window.localStorage.clear();
        }
      }
    },
    sessionStorage: {
      /**
       * 设置sessionStorage数据
       * 格式
       * {key:'',value:''}
       *
       * @param data
       */
      setItem: function(key,value){
        if(common.hasSessionStorage()){
          if(typeof(value) == 'object') {
            window.sessionStorage.setItem(key, JSON.stringify(value));
          } else if(typeof(value) == 'string') {
            window.sessionStorage.setItem(key, value);
          }
        } else if(!common.isApp()){
          if(typeof(value) == 'object') {
            common.cookie(key, JSON.stringify(value),0.04); //0.04167为1个小时
          } else if(typeof(value) == 'string') {
            common.cookie(key, value,0.04); //0.04167为1个小时
          }
        }
      },
      getItem: function(key){
        if(common.hasSessionStorage()){
          var val = window.sessionStorage.getItem(key) || "";
          if(val.search(/:/i) > 0) {
            val = JSON.parse(val);
          }
          return val;
        } else if(!common.isApp()){
          return common.cookie(key);
        }
      },
      removeItem: function(key){
        if(common.hasSessionStorage()){
          window.sessionStorage.removeItem(key);
        } else if(!common.isApp()){
          common.cookie(key,'',-1);
        }
      },
      clear: function(){
        if(common.hasSessionStorage()){
          window.sessionStorage.clear();
        }
      }
    },
    /**
     * 设置sessionStorage数据
     * 格式
     * {key:'',value:''}
     *
     * @param data
     */
    setSessionStorage: function(data) {
      if(common.hasSessionStorage()){
        if(typeof(data.value) == 'object') {
          window.sessionStorage.setItem(data.key, JSON.stringify(data.value));
        } else if(typeof(data.value) == 'string') {
          window.sessionStorage.setItem(data.key, data.value);
        }
      }
    },
    /**
     * 设置sessionStorage数据
     * @param key
     * @returns {string}
     */
    getSessionStorage: function(key) {
      if(common.hasSessionStorage()){
        var val = window.sessionStorage.getItem(key) || "";
        if(val.search(/:/i) > 0) {
          val = JSON.parse(val);
        }
        return val;
      } else {
        return '';
      }
    },
    /**
     * 检测对象是否为空
     * 如果对象为空 true ,反之 相反
     * @param obj
     * @returns {boolean}
     */
    checkObjectNull: function(obj) {
      for(var name in obj) {
        if(obj.hasOwnProperty(name)) {
          return false;
        }
      }
      return true;
    },
    /**
     * 获取url参数
     * 使用方式：getLocationParam.key 这里的key是你参数名
     * @returns {{}}
     */
    getLocationParam: function(p) {
      var url = p ? p : window.location.search;
      var params = url.toString().slice(1).split("&");
      var returnObject = {};
      for(var i = 0; i != params.length; i++) {
        var index = params[i].indexOf("=");
        returnObject[params[i].slice(0, index)] = params[i].slice(index + 1);
      }
      return returnObject;
    },
    /**
     * 格式化 参数
     * @param name
     * @returns {{}}
     */

    getCartKey:function(callback){
      var url = "https://gateway.fangkuaiyi.com/shoppingcart/cartkey?tradername=yw_app&trader=h5&closesignature=yes&signature_method=md5&timestamp="+
      new Date().getTime()+"&signature=****&siteid=9"
       common.xhr(url,callback)
    },
    getParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r != null) return unescape(r[2]);
      return null;
    },
    cookie: function(name, value, days) {
      
        // if value is undefined, get the cookie value
        if(value === undefined) {
          var cookiestring = "; " + window.document.cookie;
          var cookies = cookiestring.split("; " + name + "=");
          if(cookies.length === 2) {
            var val = decodeURIComponent(cookies.pop().split(";").shift());
            if(val.search(/:/i) > 0) {
              val = JSON.parse(val);
            }
            if(name == 'UserInfo' && val.indexOf('"')>=0){
              val = val.replace(/"/g,'');
            }
            return val;
          }
          return null;
        } else {
          // if value is a false boolean, we'll treat that as a delete
          if(value === false) {
            days = -1;
          }
          var expires = "";
          if(days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
          }
          window.document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/;domain=111.com.cn";
        }
    },
    /**
     * 格式化手机号
     * @param phone
     * @returns {*|XML|void|string}
     */
    formatPhone: function(phone) {
      return phone && phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    isLogin: function(cf) {
      if(common.isApp()) {
        jsBridge.isLogin({}, function(res) {

          cf(res.data.result);
        })
      } else {
        var token = common.cookie("gltoken") == null ? "" : common.cookie("gltoken");
        if(!token){
          token = common.cookie("token") == null ? "" : common.cookie("token");
          if(!token){
            var userInfo = common.cookie("UserInfo") || "";
            if(userInfo){
              try {
                token = common.getLocationParam("?"+userInfo).Token;
              } catch(e){
                console.log(e);
                token = '';
              }
              
            }
          }
        }
        cf(token ? true : false);
      }
    },
    inWechat: function(){
      var ua = navigator.userAgent.toLowerCase();
      if((ua.match(/MicroMessenger/i)=="micromessenger")) {
          return true;
      } else {
          return false;
      }
    },
    //设置页面标题,主要针对ios下的微信端
    setPageTitle: function(title) {
      if (title === undefined || window.document.title === title) {
        return
      }
      document.title = title
      var mobile = navigator.userAgent.toLowerCase();

      if (/iphone|ipad|ipod/.test(mobile)&& common.inWechat()) {
        var iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        // 替换成站标favicon路径或者任意存在的较小的图片即可
        iframe.setAttribute('src','/favicon.ico')
        var iframeCallback = function () {
          setTimeout(function () {
            iframe.removeEventListener('load', iframeCallback)
            document.body.removeChild(iframe)
          }, 0)
        }
        iframe.addEventListener('load', iframeCallback)
        document.body.appendChild(iframe)
      }
    },
    createUUID: function() {
      var s = [];
      var hexDigits = "ABCDE6709abcdef";
      for(var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    },
    getUUID: function() {
      if(common.isApp()) {
        var ua = navigator.userAgent;
        var ua_ = ua.substring(ua.indexOf("@") - 1);
        if(ua_) {
          return ua_.substring(0, ua_.indexOf("@"))
        } else {
          var uuid = common.createUUID();
          common.cookie("UUID", uuid, 7);
          return uuid;
        }

      } else {
        if(common.cookie("UUID")) {
          return common.cookie("UUID");
        } else {
          var uuid = common.createUUID();
          common.cookie("UUID", uuid, 7);
          return uuid;
        }
      }
    },
    Ajax: function(options) {

        //编码数据
        function setData() {
            //设置对象的遍码
            function setObjData(data, parentName) {
                function encodeData(name, value, parentName) {
                    var items = [];
                    name = parentName === undefined ? name : parentName + "[" + name + "]";
                    if (typeof value === "object" && value !== null) {
                        items = items.concat(setObjData(value, name));
                    } else {
                        name = encodeURIComponent(name);
                        value = encodeURIComponent(value);
                        items.push(name + "=" + value);
                    }
                    return items;
                }
                var arr = [],value;
                if (Object.prototype.toString.call(data) == '[object Array]') {
                    for (var i = 0, len = data.length; i < len; i++) {
                        value = data[i];
                        arr = arr.concat(encodeData( typeof value == "object"?i:"", value, parentName));
                    }
                } else if (Object.prototype.toString.call(data) == '[object Object]') {
                    for (var key in data) {
                        value = data[key];
                        arr = arr.concat(encodeData(key, value, parentName));
                    }
                }
                return arr;
            };
            //设置字符串的遍码，字符串的格式为：a=1&b=2;
            function setStrData(data) {
                var arr = data.split("&");
                for (var i = 0, len = arr.length; i < len; i++) {
                    name = encodeURIComponent(arr[i].split("=")[0]);
                    value = encodeURIComponent(arr[i].split("=")[1]);
                    arr[i] = name + "=" + value;
                }
                return arr;
            }

            if (data) {
                if (typeof data === "string") {
                    data = setStrData(data);
                } else if (typeof data === "object") {
                    data = setObjData(data);
                }
                data = data.join("&").replace("/%20/g", "+");
                //若是使用get方法或JSONP，则手动添加到URL中
                if (type === "get" || dataType === "jsonp") {
                    url += url.indexOf("?") > -1 ? (url.indexOf("=") > -1 ? "&" + data : data) : "?" + data;
                }
            }
        }
        // JSONP
        function createJsonp() {
            var script = document.createElement("script"),
                timeName = new Date().getTime() + Math.round(Math.random() * 1000),
                callback = "JSONP_" + timeName;

            window[callback] = function(data) {
                clearTimeout(timeout_flag);
                document.body.removeChild(script);
                success(data);
            }
            script.src = url + (url.indexOf("?") > -1 ? "&" : "?") + "callback=" + callback;
            script.type = "text/javascript";
            document.body.appendChild(script);
            setTime(callback, script);
        }
        //设置请求超时
        function setTime(callback, script) {
            if (timeOut !== undefined) {
                timeout_flag = setTimeout(function() {
                    if (dataType === "jsonp") {
                        delete window[callback];
                        document.body.removeChild(script);

                    } else {
                        timeout_bool = true;
                        xhr && xhr.abort();
                    }
                    console.log("timeout");

                }, timeOut);
            }
        }

        // XHR
        function createXHR() {
            //由于IE6的XMLHttpRequest对象是通过MSXML库中的一个ActiveX对象实现的。
            //所以创建XHR对象，需要在这里做兼容处理。
            function getXHR() {
                if (window.XMLHttpRequest) {
                    return new XMLHttpRequest();
                } else {
                    //遍历IE中不同版本的ActiveX对象
                    var versions = ["Microsoft", "msxm3", "msxml2", "msxml1"];
                    for (var i = 0; i < versions.length; i++) {
                        try {
                            var version = versions[i] + ".XMLHTTP";
                            return new ActiveXObject(version);
                        } catch (e) {}
                    }
                }
            }
            //创建对象。
            xhr = getXHR();
            xhr.open(type, url, async);
            //设置请求头
            if (type === "post" && !contentType) {
                //若是post提交，则设置content-Type 为application/x-www-four-urlencoded
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            } else if (contentType) {
                xhr.setRequestHeader("Content-Type", contentType);
            }
            //添加监听
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (timeOut !== undefined) {
                        //由于执行abort()方法后，有可能触发onreadystatechange事件，
                        //所以设置一个timeout_bool标识，来忽略中止触发的事件。
                        if (timeout_bool) {
                            return;
                        }
                        clearTimeout(timeout_flag);
                    }
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {

                        success(xhr.responseText);
                    } else {
                        error(xhr.status, xhr.statusText);
                    }
                }
            };
            //发送请求
            xhr.send(type === "get" ? null : data);
            setTime(); //请求超时
        }


        var url = options.url || "", //请求的链接
            type = (options.type || "get").toLowerCase(), //请求的方法,默认为get
            data = options.data || null, //请求的数据
            contentType = options.contentType || "", //请求头
            dataType = options.dataType || "", //请求的类型
            async = options.async === undefined ? true : options.async, //是否异步，默认为true.
            timeOut = options.timeOut, //超时时间。 
            before = options.before || function() {}, //发送之前执行的函数
            error = options.error || function() {}, //错误执行的函数
            success = options.success || function() {}; //请求成功的回调函数
        var timeout_bool = false, //是否请求超时
            timeout_flag = null, //超时标识
            xhr = null; //xhr对角
        setData();
        before();
        if (dataType === "jsonp") {
            createJsonp();
        } else {
            createXHR();
        }
    }

  };
  
  if(typeof define === 'function' && define.amd) {
    // AMD
    define(common);
  } else {
    window.common = common;
  }
})(window)
;
    (function(window) {

    	'use strict';

    	var _point = {
    		pageValue:"",
    		getParam: function(name) {
    			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    			var r = window.location.search.substr(1).match(reg);
    			if(r != null) return unescape(r[2]);
    			return null;
    		},
    		getHashParam: function(name){
    			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    			var p = window.location.hash.split('?')[1];
    			var r = p?p.match(reg):null;
    			if(r != null) return unescape(r[2]);
    			return null;
    		},
    		cookie: function(name, value, days) {
			// if value is undefined, get the cookie value
			if(value === undefined) {
				var cookiestring = "; " + window.document.cookie;
				var cookies = cookiestring.split("; " + name + "=");
				if(cookies.length === 2) {
					return cookies.pop().split(";").shift();
				}
				return null;
			} else {
				// if value is a false boolean, we'll treat that as a delete
				if(value === false) {
					days = -1;
				}
				var expires = "";
				if(days) {
					var date = new Date();
					date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
					expires = "; expires=" + date.toGMTString();
				}
				window.document.cookie = name + "=" + value + expires + "; path=/;domain=111.com.cn";
			}
		},

		xhr: function(url, data, method, callback) {
			url = url || "";
			data = data || {};
			method = method || "";
			callback = callback || function() {};
			var getKeys = function(obj) {
				var keys = [];
				for(var key in obj) {
					if(obj.hasOwnProperty(key)) {
						keys.push(key)
					}
				}
				return keys
			};
			if(typeof data == "object") {
				var queryString = "";
				var keys = getKeys(data);
				for(var i = 0; i < keys.length; i++) {
					queryString += encodeURIComponent(keys[i]) + "=" + encodeURIComponent(data[keys[i]]);
					if(i != keys.length - 1) {
						queryString += "&"
					}
				}
				url += "" + queryString
			} else {
				if(typeof data == "function") {
					method = data;
					callback = method
				}
			}
			if(typeof method == "function") {
				callback = method;
				method = "callback"
			}
			if(!Date.now) {
				Date.now = function() {
					return new Date().getTime()
				}
			}
			var timestamp = Date.now();
			var generatedFunction = "jsonp" + Math.round(timestamp + Math.random() * 1000001);
			window[generatedFunction] = function(json) {
				callback(json);
				try {
					delete window[generatedFunction]
				} catch(e) {
					window[generatedFunction] = undefined
				}
			};
			if(url.indexOf("?") === -1) {
				url = url + "?"
			} else {
				url = url + "&"
			}
			var jsonpScript = document.createElement("script");
			jsonpScript.setAttribute("src", url + method + "=" + generatedFunction);
			document.getElementsByTagName("head")[0].appendChild(jsonpScript)
		},
		autumn: function() {
			var u = navigator.userAgent;
			var isAndroid = u.indexOf("android") > -1 ;
			var isiOS =  u.indexOf("iphone") > -1;
			var isWap = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/); /*是否为移动终端*/
			if(this.isApp()) {
				return isAndroid ? "android" : "ios"
			} else {
				return isWap ? "wap" : "offical"

			}
		},
		// isApp:function(){
		// 	if(navigator.userAgent.indexOf("app_yiwang") > -1 ) {
		// 		return true;
		// 	}else{
		// 		return false;
		// 	}
		// },
		base: function(e,fn) {
		// if(window.location.protocol.toLocaleLowerCase()=="file:"){
			if(window.location.protocol.toLocaleLowerCase().indexOf("file")>-1){
				jsBridge.getAppCookie({}, function(res) {
					var param = {
						autumn: _point.autumn(),
						uuid: _point.getUUID(),
						UserId: _point.cookie("JUD"),
						token: res.data.gltoken,
						osVersion:res.data.osVersion,
						provinceId: res.data.provinceId,
						os:res.data.os,
						version:res.data.appVersion,
						tracker_u: res.data.appChannelName,
						referrer: e ? encodeURIComponent(_point.subStringUrl(e.oldURL)) : encodeURIComponent(_point.subStringUrl(document.referrer)),
						visitid: _point.cookie("visitid"),
						cururl: e ? encodeURIComponent(_point.subStringUrl(e.newURL)) : encodeURIComponent(_point.subStringUrl(document.location.href))
					}
					fn(param)
				})

			}else{
				var u  =navigator.userAgent;
				var param = {
					autumn: _point.autumn(),
					os:_point.autumn(),
					version:"",
					uuid: _point.getUUID(),
					osVersion:u.substring(u.indexOf("(")+1,u.indexOf(")")),
					UserId: _point.cookie("JUD"),
					token: _point.isApp()? _point.cookie("gltoken"):_point.cookie("token"),
					provinceId: _point.cookie("provinceId"),
					tracker_u: _point.isApp()? _point.cookie("appChannelName"):_point.cookie("tracker_u"),
					referrer: e ? encodeURIComponent(this.subStringUrl(e.oldURL)) : encodeURIComponent(this.subStringUrl(document.referrer)),
					visitid: _point.cookie("visitid"),
					cururl: e ? encodeURIComponent(this.subStringUrl(e.newURL)) : encodeURIComponent(this.subStringUrl(document.location.href))
				}
				fn(param)
			}

		},
		subStringUrl: function(url) {
			var str = ["/pay/", "/cart/", "/personalcenter/", "/search/", "/shopdetail/", "/category/", "/home/", "/login/", "/order/"];
			for(var i = 0; i < str.length; i++) {
				if(url.indexOf(str[i]) > 0) {
					return "https://m.111.com.cn/yyw/wap" + url.substring(url.indexOf(str[i]));
				}

			}
			return url;
		},
		_url: function(eventuuid, e) {
			if(eventuuid&&eventuuid.split("_").length==5){
				eventuuid= eventuuid+"_0";
			}
			_point.cookie("cururl", document.location.href, 1)
			this.base(e,function(that){
				var uu = "https://nest.111.com.cn?uuid=" + that.uuid + "&os_version="+that.osVersion+"&action=click&operator=null&autumn=" +
				that.autumn +"&version="+that.version+ "&os=" + that.os +"&brower=" + that.autumn +  "&token=" + that.token + "&userid=" +
				that.UserId + "&refer=" + that.referrer + "&cururl=" +
				that.cururl + "&tracker_u=" + that.tracker_u + "&visitid=" + that.visitid +"&pagecode="+document.getElementsByTagName("body")[0].getAttribute("data-ywid")+
				"&eventuuid=" + eventuuid+"&pagevalue="+_point.pageValue+"&time=" + new Date().getTime();
				_point.xhr(uu);
			});



		},
		createUUID: function() {
			var s = [];
			var hexDigits = "ABCDE6709abcdef";
			for(var i = 0; i < 36; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}
			s[14] = "4";
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
			s[8] = s[13] = s[18] = s[23] = "-";

			var uuid = s.join("");
			return uuid;
		},
		getUUID: function() {
			var uuid = this.createUUID();

			if(this.isApp()) {
				uuid = navigator.userAgent.split("@")[1];
				return uuid;
			} else {
				if(this.cookie("UUID")) {
					this.cookie("UUID");
				} else {
					this.cookie("UUID", uuid, 7);

				}
				return this.cookie("UUID");
			}

		},
		init: function() {
			if(!this.isApp()){
				this.setStatistics4BD();
			}
			var tracker_u = this.getParam("tracker_u") || this.getHashParam("tracker_u");
			_point.pageValue = window.YW_POINT_PAGEVALUE || '';
			if(tracker_u) {
				_point.cookie("tracker_u", tracker_u, 2)
			}

			_point._url()
			document.querySelector("body").addEventListener("click", function(e) {
				var p = e.target;
				var i = 0;
				do
				{
 				  if(p && p.tagName=="HTML")return;
					if( p && p.getAttribute("data-ywpoint")) {
						_point._url(p.getAttribute("data-ywpoint"));
						break;
					//console.log(p.split("_"))
				}
				p = p && p.parentNode;
				i++;
				}
				while (i<5);
			})
		},
		go: function(eventuuid) {
			_point._url(eventuuid)
		},
		isApp: function() {
	      return navigator.userAgent.match(/app_sdk/i) ? true : false;
	    },
		//为百度添加统计
		setStatistics4BD: function(){
			var _hmt = _hmt || [];
			(function() {
			  var hm = document.createElement("script");
			  hm.src = "https://hm.baidu.com/hm.js?2e38bf5ce2344d7ee09541a02f110af0";
			  var s = document.getElementsByTagName("script")[0]; 
			  s.parentNode.insertBefore(hm, s);
			})();
		}
	};
	//cb方法是 jsonp的callback 可以不用处理 这样的写法是为了防止该方法找不到
	window.cb = function(o) {
		return o
	};
	//初始化 的时候  会发出一个界面打点的请求
	//如果界面的元素中 包含这样的 data-ywpoint="home_1_1_1_1_0_0"  会触发坑位打点的请求
	_point.init();
	window.onhashchange = function(e) {
		_point.xhr(_point._url(null, e));
	}

	if(typeof define === 'function' && define.amd) {
		// AMD
		define(_point);
	} else {
		window.ywPoint = _point;
	}

})(window);
