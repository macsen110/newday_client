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
			win.EASY_ROUTER = factory();
	}
})(this, function() {
  var APP = {};
  APP.tools = {
    setPath: function (obj) {
			var path = location.pathname;
			delete obj.replace;
			return path + '?' + this.serializeObj(obj)
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
			var $body = document.body;
			title && (document.title = title);
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
		getType: function (fun) {
			function isFunction(value) { return typeof value == "function" }
			function isWindow(obj)     { return obj != null && obj == obj.window }
			function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
			function isObject(obj)     { return typeof obj == "object" }
			function isPlainObject(obj) {
				return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
			}
			function isArray(value) { return value instanceof Array }
			function likeArray(obj) { return typeof obj.length == 'number' }
			if (isFunction(fun)) return 'function';
			if (isPlainObject(fun)) return 'object';
			return false;
		}
	};
	APP.router = {
		setRouter: function (stateObj, component, title) {
			if (!('urlAction' in stateObj)) {
				if (stateObj.replace) history.replaceState(stateObj, title, APP.tools.setPath(stateObj));
				else history.pushState(stateObj, title, APP.tools.setPath(stateObj));
			}
			APP.tools.setPageTitle(title)
			this.updatePageView(component, stateObj)
		},
		updatePageView: function (component, stateObj) {
			this.endLoading();
			if (this.curPathWidget) this.curPathWidget.destroy && this.curPathWidget.destroy();
			this.curPathWidget = component
		},
		curPathWidget: undefined,
		curPathName: undefined,
		cbPathObj: APP.tools.cbPathObj(),
		go: function (name, query) {
			var stateObj = {};
			var self = this;
			stateObj.pageName = name;
			if (APP.tools.getType(query) === 'object') {
				for (var i in query) stateObj[i] = query[i];
			}
			self._gotoPage(stateObj)
		},
		replace: function (name, query) {
			var stateObj = {};
			var self = this;
			stateObj.pageName = name;
			stateObj.replace = 1;
			if (APP.tools.getType(query) === 'object') {
				for (var i in query) stateObj[i] = query[i];
			}
			self._gotoPage(stateObj)
		},
		_gotoPage: function (stateObj) {
			this.curPathName = stateObj.pageName;
			this._goPathNew(stateObj.pageName, stateObj);            
		},
		initJump: function () {
			var stateObj = {};
			if (this.cbPathObj) stateObj = this.cbPathObj;
			else stateObj.pageName = 'home';
			stateObj.replace = 1;
			this._gotoPage(stateObj);
			this.cbPath = null;
		},
		startLoading: function (type) {
			var $loading = $('#layout_loading');
			$loading.addClass('visible')
		},
		endLoading: function (type) {
			// var $loading = $('#layout_loading');
			// $loading.removeClass('visible')
		},
		_init(config) {
			var self = this;
			self._routerConfigArr = config || [];
			self._registerListener();
			self.initJump()
		},
		_registerListener() {
			var self = this;
			window.onpopstate = function (event) {
				var stateObj = event.state;
				if (stateObj) {
					stateObj.urlAction = 1;
					self._gotoPage(stateObj)
				}
			}
		},
		_goPathNew: function (path, stateObj) {
			var self = this;
			var filterCurRouterObjArr = self._routerConfigArr.filter(
				function (item) {return item.pageName === path}
			)
			if (filterCurRouterObjArr.length) {
				var filterCurRouterObj = filterCurRouterObjArr[0];
				if (!filterCurRouterObj._updateInSide)  {
					self.toDoRouterCb(stateObj, filterCurRouterObj.component, filterCurRouterObj.title)
					self.setRouter(stateObj, filterCurRouterObj.component, filterCurRouterObj.title)
				}
				else self.toDoRouterCb(stateObj, filterCurRouterObj.component,filterCurRouterObj.title)
			}
			else alert(path + '路径尚未配置相关信息')
		},
		toDoRouterCb: function (stateObj, component, title) {
			if (APP.tools.getType(component) === 'function') component(stateObj, this, title)
			else if (APP.tools.getType(component) === 'object') {
				component.init && component.init(stateObj, this, title)
			}
		}
	};
  return APP;
})