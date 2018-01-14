/**
 * 简易路由系统适用于几
 * 个简单的活动页面
 */
(function (win, factory) {
	if (typeof exports === 'object') {
			module.exports = factory();
	} 
	else if (typeof define === 'function' && define.amd) {
			define(factory);
	} 
	else {
			win.MINI_PAGE = factory();
	}
})(this, function () {
  var APP = {};
  APP._init = function () {
    var self = this;
    window.onpopstate = function (event) {
			var stateObj = event.state;
			if (stateObj) {
				stateObj.urlAction = 1;
				self.router.gotoPage(stateObj)
			}
		}
  }
  APP._tools = {
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
  }
  return APP;
}())