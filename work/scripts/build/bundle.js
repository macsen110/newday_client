/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		12: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + ({"0":"update_mobile","1":"home","2":"userinfo","3":"salary_list","4":"salary_detail","5":"personal_center","6":"my_customer","7":"mobile","8":"invite","9":"edit_userinfo","10":"customer_order","11":"app"}[chunkId]||chunkId) + ".min.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./scripts/build/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

//import { setTimeout } from "core-js/library/web/timers";

// import { setInterval } from "core-js/library/web/timers";
// import { clearInterval } from "timers";

(function (win, factory) {
	if (true) {
			module.exports = factory();
	} 
	else if (typeof define === 'function' && define.amd) {
			define(factory);
	} 
	else {
			win.YAO_M_UI = factory();
	}
})(this, function () {
	//module ...
	/****************
	tab 切换插件
	参数:
	tabNav:表示tab click item
	tabCon: 内容区域显示
	tabNavItems 触发切换的element
	tabConItems  显示区域的内容elements
	curIndex 当前显示的index
	*****/
	function TabWidget(args) {
		if(args && ("object" == typeof args)){
				for(var arg in args){
						this[arg] = args[arg];
				}
		}
		this.tabNavContainer = this.tabNavContainer || document.querySelector('.tab-nav-container');
		this.tabConContainer = this.tabConContainer || document.querySelector('.tab-con-container');
		this.tabNavItems = this.tabNavItems || this.tabNavContainer.children;
		this.tabConItems = this.tabConItems || this.tabConContainer.children;
		this.curIdex = this.curIdex || 0;
		this.activeClass = this.activeClass || 'on'
		this.init()
		return this;
	}

	TabWidget.prototype = {
			constructor: TabWidget,
			init: function () {
					var self = this;
					self.change(this.curIdex);
					var className = this.tabNavItems[0].classList[0];
					if (self.tabNavItems) {
							_degegateDomFun(this.tabNavContainer, '.'+className, 'click', function () {
								self.change([].indexOf.call(self.tabNavItems, this))
							})
					}
			},
			change: function(index) {
					var self = this;
					var activeClass = this.activeClass;
					self.curIdex = index;
					if (self.tabNavItems) {
							[].forEach.call(self.tabNavItems, function (item, i) {
									if (i !== index) {
											item.classList.remove(activeClass);
											self.tabConItems[i].classList.remove(activeClass)
									}
									else {
											item.classList.add(activeClass);
											self.tabConItems[i].classList.add(activeClass)
									}
							})

					}
					else {
							[].forEach.call(self.tabConItems, function (item, i) {
									if (i !== index) item.classList.remove(activeClass)
									else item.classList.add(activeClass)
							})
							
					} 
					if (self.callback) self.callback(index);           
			}
					
	}
	/***
	 * *dialog 页面弹框组件
	 * *
	 * *****/    
	//弹框
	function Dialog(options) {
		this.title = null;
		this.content = null;
		this.foot = null;
		this.canMaskClose = true;
		this.className = ''
		this.type = 'dialog';
		this.container = document.createElement('div');
		this.isMask = true;
		this.config(options);
		this.mask = this.isMask ? '<div class="dialog-mask-bg"></div>' : '';
		this.open();
		return this;
	}
	Dialog.prototype = {
			constructor: Dialog,
			config: function (options) {
					if (typeof options === 'object') {			
							for (var i in options) {
									this[i] = options[i]
							}
					}
					return this;
			},
			handleEvent: function (e) {
					var target = e.target;
					var classList = target.classList;
					
					//点击遮罩层,不做任何事情,直接摧毁弹框
					if (classList.contains('dialog-mask-bg')) {
							this.canMaskClose ? (this.maskAction ? this.maskAction() : this.close()) : null; 			
							return
					}
					//点击确定按钮
					if (classList.contains('btn-dialog-ok')) {
							this.afterOk();
							return
					}
					//点击取消按钮,或者关闭的图标
					if (classList.contains('btn-dialog-cancel') || classList.contains('icon-dialog-cancel')) {
							this.close()
					}
			},
			open: function() {
					this.container.className = "widget-dialog "+this.className;
					this.title = this.title ? '<div class="title">' + this.title + '</div>' :'';
					this.content = this.content ? '<div class="content">' + this.content + '</div>' : '';
					this.foot = this.foot ? '<div class="foot">' + this.foot + '</div>' : ''; 
					this.main = this.title + this.content + this.foot;
					this.container.innerHTML = '<div class="main">' + this.main + '</div>' + this.mask;
					var body = this.parentNode || document.body;
					var self = this;
					body.appendChild(this.container);
					//remeber do not write like this
					//this.container.addEventLister('click', this.close) 
					//this replay for the current object in the event callback functions
			
					this.afterOpen();
			
					this.container.addEventListener('click',this)
			
			},
			afterOpen: function () {
					//do something after the dialog open;
			},
			afterOk: function () {
					//default event is destory;
					this.destory()
			},
			close: function () {
					this.afterClose();
					this.destory();
			
			},
			afterClose: function () {
					//do something after the dialog close;
			},
			destory: function () {
					var body = this.parentNode || document.body;
					if (this.container) {
							body.removeChild(this.container);
							this.container = null;
					}
			}
	};
    /**
     * *easy Move
     * *页面滑动插件
     * *******/
	function easyMove (element, options) {
		var isTouch = 'ontouchstart' in window;
		if (!element) return null; 
		this.element = element;
		this.parentEle = options.parentEle || this.element;
		this.autoPlay = options.autoPlay;
		this.paginationList = options.paginationList;
		this.moveDomArr = [];
		this.originLength = element.children.length;
		this.index = options.index ? options.index : 0;
		this.duration = options.duration || 2000
		if (this.autoPlay) {
			for (var i = 0; i < this.originLength; i++) {
				this.moveDomArr[i+1] = i;
			}
			this.moveDomArr[0] = this.originLength -1;
			this.moveDomArr[this.originLength+1] = 0;
			this.appendDom();
			this.index = this.index + 1;
		}
		this.child = element.children[0]; //选取一个子元素,以便可以随时获取其宽度
		this.length = element.children.length;
		this.focusIndex = options.focusIndex || 0;		
		this.speed = options.speed || 300; //矫正动画时间ms
		this.offset = options.offset || 0; //选中点偏移
		this.limitBorder = options.limitBorder || false; //滑动后是否会回顶到边界，优先级高于offset
		this.showNum = options.showNum || this.length; //显示的元素个数（可选,只在limitBorder为true时需要）
		this.deltaX = 0;
		this.deltaY = 0;
		this.callback = options.callback || function () {}; //矫正动画完成后的回调函数
		this.touchMoveCb = options.touchMoveCb || function () {}; //监听动画滑动
		this.hasMoved = false; //是否触发过onTouchMove，用以区分点击与滑动
		this.orientation = options.orientation || 1; //滑动的方向,1为横向, 2为纵向
		this.distance = options.distance;//自定义滑动距离,

		if (this.parentEle.addEventListener) {
			this.parentEle.addEventListener(isTouch?'touchstart':'mousedown', this, false);
			this.element.addEventListener('webkitTransitionEnd', this, false);
			this.element.addEventListener('transitionend', this, false);
		}
		//判断横向还是竖向滑动,设置相应的宽或高
		if (this.orientation == 1) { 
			this.childWidth = options.childWidth || this.child.clientWidth;
			this.parentWidth = options.parentWidth || this.childWidth * this.length;
		}
		else {
			this.childHeight = options.childHeight || this.child.clientHeight;
			this.parentHeight = options.parentHeight || this.childHeight * this.length;
		}
		setTimeout(this.init.bind(this), 100);
		return this;
	}
	easyMove.prototype = {
		constructor: easyMove,
		init: function () {
			var self = this;
			//设置item和container的宽度
			[].forEach.call(self.element.children, function (item) {
					if (self.orientation == 1) item.style.width = self.childWidth + 'px';
					else item.style.height = self.childHeight + 'px';
			})
			if (self.orientation == 1) self.element.style.width = self.parentWidth + 'px';
			else self.element.style.height = self.parentHeight + 'px';
			if (self.orientation == 1) self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(' + (-(self.index-self.focusIndex) * self.childWidth) + 'px,0,0)';
			if (self.orientation == 2) self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(0,' + (-(self.index-self.focusIndex) * self.childHeight) + 'px,0)';
			self.move(self.index)
			self.paginationList && self.filterPagination(self.index)
			if (this.autoPlay) self._autoPlay()
		},
		appendDom: function () {
			var firstDom = this.element.children[0];
			var firstDomClone = firstDom.cloneNode(true);
			var lastDom = this.element.children[this.element.children.length - 1];
			var lastDomClone = lastDom.cloneNode(true);
			this.element.appendChild(firstDomClone);
			this.element.insertAdjacentElement('afterbegin',lastDomClone);
		},
		handleEvent: function (e) {
			var self = this;
			switch (e.type) {
					case 'mousedown':
						self.element.addEventListener('mousemove', self, false);
						self.element.addEventListener('mouseup', self, false);
						self.element.addEventListener('mouseout', self, false);
						self.onTouchStart(e);
						break;
					case 'mousemove':
						self.onTouchMove(e);
						break;
					case 'mouseup':
						self.element.removeEventListener('mousemove', self, false);
						self.element.removeEventListener('mouseup', self, false);
						self.element.removeEventListener('mouseout', self, false);
						self.onTouchEnd(e);
					break;
				case 'mouseout':
						self.element.removeEventListener('mousemove', self, false);
						self.element.removeEventListener('mouseup', self, false);
						self.element.removeEventListener('mouseout', self, false);
						self.onTouchEnd(e);
						break;
				case 'touchstart':
						self.parentEle.addEventListener('touchmove', self, false);
						self.parentEle.addEventListener('touchend', self, false);
						self.onTouchStart(e);
						break;
					case 'touchmove':
						self.onTouchMove(e);
						break;
					case 'touchend':
						self.parentEle.removeEventListener('touchmove', self, false);
						self.parentEle.removeEventListener('touchend', self, false);
						self.onTouchEnd(e);
						break;
					case 'webkitTransitionEnd':
					case 'msTransitionEnd':
					case 'oTransitionEnd':
					case 'transitionend': 
						self.transitionEnd(e); 
						break;
			}
		},
		onTouchStart: function (e) {
			var self = this;
			if (this.autoMove) this.clearAutoPlay()
			self.start = {
				pageX: e.touches ? e.touches[0].pageX : e.pageX,
				pageY: e.touches ? e.touches[0].pageY : e.pageY
			};
			//将动画时间设为0，以便在按下时马上结束尚在进行的动画
			self.element.style.webkitTransition = "-webkit-transform 0ms";
			self.autoPlay && self.touchStartResetTargetIndex(this.index);
		},
		onTouchMove: function (e) {
			var self = this;
			//若有多个touch或者被缩放则不滑动		
			if(e.touches && (e.touches.length > 1 || e.scale && e.scale !== 1)) return;
			var movePageX = e.touches ? e.touches[0].pageX : e.pageX;
			var movePageY = e.touches ? e.touches[0].pageY : e.pageY;
			self.deltaX = movePageX - self.start.pageX;
			self.deltaY = movePageY - self.start.pageY;
			//判断滑动方向
			//横向
			if (self.orientation == 1 && Math.abs(self.deltaX) > Math.abs(self.deltaY)) {
				e.preventDefault();
				if (!self.hasMoved) self.touchMoveCb &&  self.touchMoveCb(self.index)   
				self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(' + (self.deltaX - (self.index-self.focusIndex) * self.childWidth) + 'px,0,0)';
			}
			//纵向
			if (self.orientation == 2 && Math.abs(self.deltaY) > Math.abs(self.deltaX)) {
				e.preventDefault();
				if (!self.hasMoved) self.touchMoveCb &&  self.touchMoveCb(self.index)   
				self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(0,' + (self.deltaY - (self.index-self.focusIndex) * self.childHeight) + 'px,0)';
			}
			self.hasMoved = true;
            
		},
		onTouchEnd: function (e) {
			var self = this;
			
			if (!self.hasMoved) {
				if (self.orientation == 1)  self.deltaX = 0; //若没有滑动过，重置值
				if (self.orientation == 2) self.deltaY = 0
			}
			self.hasMoved = false;
			//矫正位置到最贴近目标处
			if (self.orientation == 1) {
					var width = self.childWidth;
					var targetIndex;
					if (self.distance) {
							var remainderDistance = self.deltaX - parseInt(self.deltaX/width) * width;
							if (remainderDistance > 0) {
									targetIndex = self.index - (parseInt(self.deltaX/width) + (remainderDistance - self.distance > 0 ? 1 : 0));
							}
							else {
									targetIndex = self.index - (parseInt(self.deltaX/width) + (Math.abs(remainderDistance) - self.distance > 0 ? -1 : 0));
							} 
					}
					else targetIndex = self.index - Math.round(self.deltaX/width);
					
			}
			if (self.orientation == 2) {
				

					var height = self.childHeight;
					var targetIndex;
					if (self.distance) {
							var remainderDistance = self.deltaY - parseInt(self.deltaY/height) * height;
							
							if (remainderDistance > 0) {
									targetIndex = self.index - (parseInt(self.deltaY/height) + (remainderDistance - self.distance > 0 ? 1 : 0));
							}
							else {
									
									targetIndex = self.index - (parseInt(self.deltaY/height) + (Math.abs(remainderDistance) - self.distance > 0 ? -1 : 0));
							} 
					}
					else targetIndex = self.index - Math.round(self.deltaY/height);
					
			}
			targetIndex = self.limitIndex(targetIndex);
			
			self.autoMove(targetIndex);
			if (self.callback) {
				var choseId = self.index + self.offset;
				self.callback(self.index);
			}
			if (self.autoPlay) self._autoPlay()
		},
		transitionEnd: function (e) {
			this.paginationList && this.filterPagination(this.index)
		},
		autoMove: function (targetIndex) {
			
			var self = this;
			var style = this.element.style;			
			style.webkitTransition = "-webkit-transform "+self.speed+"ms";
			if (self.orientation == 1) style.MozTransform = style.webkitTransform = 'translate3d(' + (-targetIndex * self.childWidth) + 'px,0,0)';
			if (self.orientation == 2) style.MozTransform = style.webkitTransform = 'translate3d(0,' + (-targetIndex * self.childHeight) + 'px,0)';
			self.index = targetIndex + self.focusIndex;
		},
		move: function (targetIndex) {
			var self = this;
			targetIndex -= self.offset; 
			targetIndex = self.limitIndex(targetIndex);
			var style = this.element.style;	
			setTimeout(function () {		
				style.webkitTransition = "-webkit-transform "+self.speed+"ms";
				if (self.orientation == 1) style.MozTransform = style.webkitTransform = 'translate3d(' + (-targetIndex * self.childWidth) + 'px,0,0)';
				if (self.orientation == 2) style.MozTransform = style.webkitTransform = 'translate3d(0,' + (-targetIndex * self.childHeight) + 'px,0)';
			}, 0)
			self.index = targetIndex + self.focusIndex;
			if (self.callback) self.callback(self.index);
		},
		limitIndex: function (targetIndex) {
			var self = this;
			
			if (this.autoPlay && targetIndex == this.length) targetIndex = this.autoMoveResetTargetIndex()
			if (!self.limitBorder) {
				if (targetIndex < -self.offset) targetIndex = -self.offset;	
				else if (targetIndex > self.length - 1 - self.offset) targetIndex = self.length - 1 - self.offset;
			} 
			else {
				if (targetIndex < 0) targetIndex = 0;
				else if ((targetIndex > self.length - self.showNum + self.focusIndex)) targetIndex = self.length -(self.showNum - self.focusIndex);
			}
			
			targetIndex = targetIndex - self.focusIndex;
			return targetIndex;
		},
		autoMoveResetTargetIndex: function (targetIndex) {
			var self = this;
			self.resetTransformStyle(1)
			self.index = targetIndex = 2;
			return targetIndex
		},
		resetTransformStyle: function (idx) {
			var self = this;
			var style = this.element.style;
			style.MozTransform = style.webkitTransform = 'translate3d(' + (-idx * self.childWidth) + 'px,0,0)';
			style.webkitTransition = "-webkit-transform "+0+"ms";
		},
		touchStartResetTargetIndex: function (index) {
			if (index == 0) { 
				this.resetTransformStyle(this.length-2) 
				this.index = this.length-2;
			}
			if (index === this.length -1 ) {
				this.resetTransformStyle(1)
				this.index = 1;
			}
			
		},
		clearAutoPlay: function() {
			clearInterval(this.autoPlayId)
		},
		_autoPlay: function () {
			this.autoPlayId = setInterval(function () {this.move(this.index + 1)}.bind(this), this.duration)
		},
		filterPagination: function (index) {
			var curPaginationIndex = this.moveDomArr[index];
			[].forEach.call(this.paginationList.children, function (item, index) {
				item.classList.remove('active');
				if (index === curPaginationIndex) item.classList.add('active')
			})
		},

	}

	function showPrompt(args) {
		if (typeof args === 'object') {
			Object.keys(args).forEach(function (key) {
				this[key] = args[key]
			}.bind(this))			
		}
		if (typeof args === 'string' || typeof args === 'number') this.msg = args;
		this.parentNode = this.parentNode || document.body;
		this.init()
		return this;
	}
	showPrompt.prototype = {
		constructor: showPrompt,
		init: function () {
			this._container =  document.querySelector('.widget-prompt');
			if(this._container) { this.destory() }
			this.open()
		},
		open: function () {
			this._container = document.createElement('div');
			this._container.className = this.className ? this.className + ' widget-prompt' : 'widget-prompt';
			this._container.innerHTML = this.msg;	
			this.parentNode.appendChild(this._container)
			this.promptTimer = setTimeout(function(){
					this.destory();
					if (this.cb) this.cb()
			}.bind(this),this.duration || 3000);
		},
		destory: function () {
			this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container)
			this._container = null;
		}
	}

	function Loading(args) {
		if (typeof args === 'object') {
			Object.keys(args).forEach(function (key) {
				this[key] = args[key]
			}.bind(this))			
		}
		var tpl = '<div class="mask"></div>'+
								'<div class="spinner"></div>'
					
		this.html = this.html || tpl;
		this.parentNode = this.parentNode || document.body;
		return this;
	}
	Loading.prototype = {
		constructor: Loading,
		start: function () {
			if (!this._container) {
				this._container = document.createElement('div');
				this._container.innerHTML = this.html;
				this._container.className = this.className ? this.className + ' widget-loading' : 'widget-loading';
				this.parentNode.appendChild(this._container)
			} 
			this._container.style.display = 'block';
			return this;
		},
		end: function () {
			this._container && (this._container.style.display = 'none');
		}
	}


	/**
	 * private fun
	 * delegate fun
	 */
	function _degegateDomFun(parentEle, selector, eventType, fun) {
		parentEle.addEventListener(eventType, function (e) {
			var targetDom = _getDomByEle(e.target, selector)
			if (targetDom) fun.bind(targetDom)()
		})
	}
	/**
	 * getDombyEle
	 */
	function _getDomByEle(curentEl, selector) {
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
	};
	
	return {
			TabWidget: function (args) {return new TabWidget(args)},
			Dialog: function (args) {return new Dialog(args)},
			easyMove: function (dom, args) { return new easyMove(dom, args)},
			showPrompt: function (args) {return new showPrompt(args)},
			Loading: function (args) { return new Loading(args) },
			
	}
})

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* Zepto v1.1.4 - zepto event ajax form ie - zeptojs.com/license */

!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require, exports, module){


  var Zepto = (function() {
    var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
      document = window.document,
      elementDisplay = {}, classCache = {},
      cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
      fragmentRE = /^\s*<(\w+|!)[^>]*>/,
      singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
      rootNodeRE = /^(?:body|html)$/i,
      capitalRE = /([A-Z])/g,

      // special attributes that should be get/set via method calls
      methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

      adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
      table = document.createElement('table'),
      tableRow = document.createElement('tr'),
      containers = {
        'tr': document.createElement('tbody'),
        'tbody': table, 'thead': table, 'tfoot': table,
        'td': tableRow, 'th': tableRow,
        '*': document.createElement('div')
      },
      readyRE = /complete|loaded|interactive/,
      simpleSelectorRE = /^[\w-]*$/,
      class2type = {},
      toString = class2type.toString,
      zepto = {},
      camelize, uniq,
      tempParent = document.createElement('div'),
      propMap = {
        'tabindex': 'tabIndex',
        'readonly': 'readOnly',
        'for': 'htmlFor',
        'class': 'className',
        'maxlength': 'maxLength',
        'cellspacing': 'cellSpacing',
        'cellpadding': 'cellPadding',
        'rowspan': 'rowSpan',
        'colspan': 'colSpan',
        'usemap': 'useMap',
        'frameborder': 'frameBorder',
        'contenteditable': 'contentEditable'
      },
      isArray = Array.isArray ||
        function(object){ return object instanceof Array }

    zepto.matches = function(element, selector) {
      if (!selector || !element || element.nodeType !== 1) return false
      var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                            element.oMatchesSelector || element.matchesSelector
      if (matchesSelector) return matchesSelector.call(element, selector)
      // fall back to performing a selector:
      var match, parent = element.parentNode, temp = !parent
      if (temp) (parent = tempParent).appendChild(element)
      match = ~zepto.qsa(parent, selector).indexOf(element)
      temp && tempParent.removeChild(element)
      return match
    }

    function type(obj) {
      return obj == null ? String(obj) :
        class2type[toString.call(obj)] || "object"
    }

    function isFunction(value) { return type(value) == "function" }
    function isWindow(obj)     { return obj != null && obj == obj.window }
    function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
    function isObject(obj)     { return type(obj) == "object" }
    function isPlainObject(obj) {
      return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
    }
    function likeArray(obj) { return typeof obj.length == 'number' }

    function compact(array) { return filter.call(array, function(item){ return item != null }) }
    function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
    camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
    function dasherize(str) {
      return str.replace(/::/g, '/')
             .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
             .replace(/([a-z\d])([A-Z])/g, '$1_$2')
             .replace(/_/g, '-')
             .toLowerCase()
    }
    uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

    function classRE(name) {
      return name in classCache ?
        classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
    }

    function maybeAddPx(name, value) {
      return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
    }

    function defaultDisplay(nodeName) {
      var element, display
      if (!elementDisplay[nodeName]) {
        element = document.createElement(nodeName)
        document.body.appendChild(element)
        display = getComputedStyle(element, '').getPropertyValue("display")
        element.parentNode.removeChild(element)
        display == "none" && (display = "block")
        elementDisplay[nodeName] = display
      }
      return elementDisplay[nodeName]
    }

    function children(element) {
      return 'children' in element ?
        slice.call(element.children) :
        $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
    }

    // `$.zepto.fragment` takes a html string and an optional tag name
    // to generate DOM nodes nodes from the given html string.
    // The generated DOM nodes are returned as an array.
    // This function can be overriden in plugins for example to make
    // it compatible with browsers that don't support the DOM fully.
    zepto.fragment = function(html, name, properties) {
      var dom, nodes, container

      // A special case optimization for a single tag
      if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

      if (!dom) {
        if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
        if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
        if (!(name in containers)) name = '*'

        container = containers[name]
        container.innerHTML = '' + html
        dom = $.each(slice.call(container.childNodes), function(){
          container.removeChild(this)
        })
      }

      if (isPlainObject(properties)) {
        nodes = $(dom)
        $.each(properties, function(key, value) {
          if (methodAttributes.indexOf(key) > -1) nodes[key](value)
          else nodes.attr(key, value)
        })
      }

      return dom
    }

    // `$.zepto.Z` swaps out the prototype of the given `dom` array
    // of nodes with `$.fn` and thus supplying all the Zepto functions
    // to the array. Note that `__proto__` is not supported on Internet
    // Explorer. This method can be overriden in plugins.
    zepto.Z = function(dom, selector) {
      dom = dom || []
      dom.__proto__ = $.fn
      dom.selector = selector || ''
      return dom
    }

    // `$.zepto.isZ` should return `true` if the given object is a Zepto
    // collection. This method can be overriden in plugins.
    zepto.isZ = function(object) {
      return object instanceof zepto.Z
    }

    // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
    // takes a CSS selector and an optional context (and handles various
    // special cases).
    // This method can be overriden in plugins.
    zepto.init = function(selector, context) {
      var dom
      // If nothing given, return an empty Zepto collection
      if (!selector) return zepto.Z()
      // Optimize for string selectors
      else if (typeof selector == 'string') {
        selector = selector.trim()
        // If it's a html fragment, create nodes from it
        // Note: In both Chrome 21 and Firefox 15, DOM error 12
        // is thrown if the fragment doesn't begin with <
        if (selector[0] == '<' && fragmentRE.test(selector))
          dom = zepto.fragment(selector, RegExp.$1, context), selector = null
        // If there's a context, create a collection on that context first, and select
        // nodes from there
        else if (context !== undefined) return $(context).find(selector)
        // If it's a CSS selector, use it to select nodes.
        else dom = zepto.qsa(document, selector)
      }
      // If a function is given, call it when the DOM is ready
      else if (isFunction(selector)) return $(document).ready(selector)
      // If a Zepto collection is given, just return it
      else if (zepto.isZ(selector)) return selector
      else {
        // normalize array if an array of nodes is given
        if (isArray(selector)) dom = compact(selector)
        // Wrap DOM nodes.
        else if (isObject(selector))
          dom = [selector], selector = null
        // If it's a html fragment, create nodes from it
        else if (fragmentRE.test(selector))
          dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
        // If there's a context, create a collection on that context first, and select
        // nodes from there
        else if (context !== undefined) return $(context).find(selector)
        // And last but no least, if it's a CSS selector, use it to select nodes.
        else dom = zepto.qsa(document, selector)
      }
      // create a new Zepto collection from the nodes found
      return zepto.Z(dom, selector)
    }

    // `$` will be the base `Zepto` object. When calling this
    // function just call `$.zepto.init, which makes the implementation
    // details of selecting nodes and creating Zepto collections
    // patchable in plugins.
    $ = function(selector, context){
      return zepto.init(selector, context)
    }

    function extend(target, source, deep) {
      for (key in source)
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
          if (isPlainObject(source[key]) && !isPlainObject(target[key]))
            target[key] = {}
          if (isArray(source[key]) && !isArray(target[key]))
            target[key] = []
          extend(target[key], source[key], deep)
        }
        else if (source[key] !== undefined) target[key] = source[key]
    }

    // Copy all but undefined properties from one or more
    // objects to the `target` object.
    $.extend = function(target){
      var deep, args = slice.call(arguments, 1)
      if (typeof target == 'boolean') {
        deep = target
        target = args.shift()
      }
      args.forEach(function(arg){ extend(target, arg, deep) })
      return target
    }

    // `$.zepto.qsa` is Zepto's CSS selector implementation which
    // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
    // This method can be overriden in plugins.
    zepto.qsa = function(element, selector){
      var found,
          maybeID = selector[0] == '#',
          maybeClass = !maybeID && selector[0] == '.',
          nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
          isSimple = simpleSelectorRE.test(nameOnly)
      return (isDocument(element) && isSimple && maybeID) ?
        ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
        (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
        slice.call(
          isSimple && !maybeID ?
            maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
            element.getElementsByTagName(selector) : // Or a tag
            element.querySelectorAll(selector) // Or it's not simple, and we need to query all
        )
    }

    function filtered(nodes, selector) {
      return selector == null ? $(nodes) : $(nodes).filter(selector)
    }

    $.contains = document.documentElement.contains ?
      function(parent, node) {
        return parent !== node && parent.contains(node)
      } :
      function(parent, node) {
        while (node && (node = node.parentNode))
          if (node === parent) return true
        return false
      }

    function funcArg(context, arg, idx, payload) {
      return isFunction(arg) ? arg.call(context, idx, payload) : arg
    }

    function setAttribute(node, name, value) {
      value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
    }

    // access className property while respecting SVGAnimatedString
    function className(node, value){
      var klass = node.className,
          svg   = klass && klass.baseVal !== undefined

      if (value === undefined) return svg ? klass.baseVal : klass
      svg ? (klass.baseVal = value) : (node.className = value)
    }

    // "true"  => true
    // "false" => false
    // "null"  => null
    // "42"    => 42
    // "42.5"  => 42.5
    // "08"    => "08"
    // JSON    => parse if valid
    // String  => self
    function deserializeValue(value) {
      var num
      try {
        return value ?
          value == "true" ||
          ( value == "false" ? false :
            value == "null" ? null :
            !/^0/.test(value) && !isNaN(num = Number(value)) ? num :
            /^[\[\{]/.test(value) ? $.parseJSON(value) :
            value )
          : value
      } catch(e) {
        return value
      }
    }

    $.type = type
    $.isFunction = isFunction
    $.isWindow = isWindow
    $.isArray = isArray
    $.isPlainObject = isPlainObject

    $.isEmptyObject = function(obj) {
      var name
      for (name in obj) return false
      return true
    }

    $.inArray = function(elem, array, i){
      return emptyArray.indexOf.call(array, elem, i)
    }

    $.camelCase = camelize
    $.trim = function(str) {
      return str == null ? "" : String.prototype.trim.call(str)
    }

    // plugin compatibility
    $.uuid = 0
    $.support = { }
    $.expr = { }

    $.map = function(elements, callback){
      var value, values = [], i, key
      if (likeArray(elements))
        for (i = 0; i < elements.length; i++) {
          value = callback(elements[i], i)
          if (value != null) values.push(value)
        }
      else
        for (key in elements) {
          value = callback(elements[key], key)
          if (value != null) values.push(value)
        }
      return flatten(values)
    }

    $.each = function(elements, callback){
      var i, key
      if (likeArray(elements)) {
        for (i = 0; i < elements.length; i++)
          if (callback.call(elements[i], i, elements[i]) === false) return elements
      } else {
        for (key in elements)
          if (callback.call(elements[key], key, elements[key]) === false) return elements
      }

      return elements
    }

    $.grep = function(elements, callback){
      return filter.call(elements, callback)
    }

    if (window.JSON) $.parseJSON = JSON.parse

    // Populate the class2type map
    $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
      class2type[ "[object " + name + "]" ] = name.toLowerCase()
    })

    // Define methods that will be available on all
    // Zepto collections
    $.fn = {
      // Because a collection acts like an array
      // copy over these useful array functions.
      forEach: emptyArray.forEach,
      reduce: emptyArray.reduce,
      push: emptyArray.push,
      sort: emptyArray.sort,
      indexOf: emptyArray.indexOf,
      concat: emptyArray.concat,

      // `map` and `slice` in the jQuery API work differently
      // from their array counterparts
      map: function(fn){
        return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
      },
      slice: function(){
        return $(slice.apply(this, arguments))
      },

      ready: function(callback){
        // need to check if document.body exists for IE as that browser reports
        // document ready when it hasn't yet created the body element
        if (readyRE.test(document.readyState) && document.body) callback($)
        else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
        return this
      },
      get: function(idx){
        return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
      },
      toArray: function(){ return this.get() },
      size: function(){
        return this.length
      },
      remove: function(){
        return this.each(function(){
          if (this.parentNode != null)
            this.parentNode.removeChild(this)
        })
      },
      each: function(callback){
        emptyArray.every.call(this, function(el, idx){
          return callback.call(el, idx, el) !== false
        })
        return this
      },
      filter: function(selector){
        if (isFunction(selector)) return this.not(this.not(selector))
        return $(filter.call(this, function(element){
          return zepto.matches(element, selector)
        }))
      },
      add: function(selector,context){
        return $(uniq(this.concat($(selector,context))))
      },
      is: function(selector){
        return this.length > 0 && zepto.matches(this[0], selector)
      },
      not: function(selector){
        var nodes=[]
        if (isFunction(selector) && selector.call !== undefined)
          this.each(function(idx){
            if (!selector.call(this,idx)) nodes.push(this)
          })
        else {
          var excludes = typeof selector == 'string' ? this.filter(selector) :
            (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
          this.forEach(function(el){
            if (excludes.indexOf(el) < 0) nodes.push(el)
          })
        }
        return $(nodes)
      },
      has: function(selector){
        return this.filter(function(){
          return isObject(selector) ?
            $.contains(this, selector) :
            $(this).find(selector).size()
        })
      },
      eq: function(idx){
        return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
      },
      first: function(){
        var el = this[0]
        return el && !isObject(el) ? el : $(el)
      },
      last: function(){
        var el = this[this.length - 1]
        return el && !isObject(el) ? el : $(el)
      },
      find: function(selector){
        var result, $this = this
        if (!selector) result = []
        else if (typeof selector == 'object')
          result = $(selector).filter(function(){
            var node = this
            return emptyArray.some.call($this, function(parent){
              return $.contains(parent, node)
            })
          })
        else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
        else result = this.map(function(){ return zepto.qsa(this, selector) })
        return result
      },
      closest: function(selector, context){
        var node = this[0], collection = false
        if (typeof selector == 'object') collection = $(selector)
        while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
          node = node !== context && !isDocument(node) && node.parentNode
        return $(node)
      },
      parents: function(selector){
        var ancestors = [], nodes = this
        while (nodes.length > 0)
          nodes = $.map(nodes, function(node){
            if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
              ancestors.push(node)
              return node
            }
          })
        return filtered(ancestors, selector)
      },
      parent: function(selector){
        return filtered(uniq(this.pluck('parentNode')), selector)
      },
      children: function(selector){
        return filtered(this.map(function(){ return children(this) }), selector)
      },
      contents: function() {
        return this.map(function() { return slice.call(this.childNodes) })
      },
      siblings: function(selector){
        return filtered(this.map(function(i, el){
          return filter.call(children(el.parentNode), function(child){ return child!==el })
        }), selector)
      },
      empty: function(){
        return this.each(function(){ this.innerHTML = '' })
      },
      // `pluck` is borrowed from Prototype.js
      pluck: function(property){
        return $.map(this, function(el){ return el[property] })
      },
      show: function(){
        return this.each(function(){
          this.style.display == "none" && (this.style.display = '')
          if (getComputedStyle(this, '').getPropertyValue("display") == "none")
            this.style.display = defaultDisplay(this.nodeName)
        })
      },
      replaceWith: function(newContent){
        return this.before(newContent).remove()
      },
      wrap: function(structure){
        var func = isFunction(structure)
        if (this[0] && !func)
          var dom   = $(structure).get(0),
              clone = dom.parentNode || this.length > 1

        return this.each(function(index){
          $(this).wrapAll(
            func ? structure.call(this, index) :
              clone ? dom.cloneNode(true) : dom
          )
        })
      },
      wrapAll: function(structure){
        if (this[0]) {
          $(this[0]).before(structure = $(structure))
          var children
          // drill down to the inmost element
          while ((children = structure.children()).length) structure = children.first()
          $(structure).append(this)
        }
        return this
      },
      wrapInner: function(structure){
        var func = isFunction(structure)
        return this.each(function(index){
          var self = $(this), contents = self.contents(),
              dom  = func ? structure.call(this, index) : structure
          contents.length ? contents.wrapAll(dom) : self.append(dom)
        })
      },
      unwrap: function(){
        this.parent().each(function(){
          $(this).replaceWith($(this).children())
        })
        return this
      },
      clone: function(){
        return this.map(function(){ return this.cloneNode(true) })
      },
      hide: function(){
        return this.css("display", "none")
      },
      toggle: function(setting){
        return this.each(function(){
          var el = $(this)
          ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
        })
      },
      prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
      next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
      html: function(html){
        return 0 in arguments ?
          this.each(function(idx){
            var originHtml = this.innerHTML
            $(this).empty().append( funcArg(this, html, idx, originHtml) )
          }) :
          (0 in this ? this[0].innerHTML : null)
      },
      text: function(text){
        return 0 in arguments ?
          this.each(function(idx){
            var newText = funcArg(this, text, idx, this.textContent)
            this.textContent = newText == null ? '' : ''+newText
          }) :
          (0 in this ? this[0].textContent : null)
      },
      attr: function(name, value){
        var result
        return (typeof name == 'string' && !(1 in arguments)) ?
          (!this.length || this[0].nodeType !== 1 ? undefined :
            (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
          ) :
          this.each(function(idx){
            if (this.nodeType !== 1) return
            if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
            else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
          })
      },
      removeAttr: function(name){
        return this.each(function(){ this.nodeType === 1 && setAttribute(this, name) })
      },
      prop: function(name, value){
        name = propMap[name] || name
        return (1 in arguments) ?
          this.each(function(idx){
            this[name] = funcArg(this, value, idx, this[name])
          }) :
          (this[0] && this[0][name])
      },
      data: function(name, value){
        var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

        var data = (1 in arguments) ?
          this.attr(attrName, value) :
          this.attr(attrName)

        return data !== null ? deserializeValue(data) : undefined
      },
      val: function(value){
        return 0 in arguments ?
          this.each(function(idx){
            this.value = funcArg(this, value, idx, this.value)
          }) :
          (this[0] && (this[0].multiple ?
             $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
             this[0].value)
          )
      },
      offset: function(coordinates){
        if (coordinates) return this.each(function(index){
          var $this = $(this),
              coords = funcArg(this, coordinates, index, $this.offset()),
              parentOffset = $this.offsetParent().offset(),
              props = {
                top:  coords.top  - parentOffset.top,
                left: coords.left - parentOffset.left
              }

          if ($this.css('position') == 'static') props['position'] = 'relative'
          $this.css(props)
        })
        if (!this.length) return null
        var obj = this[0].getBoundingClientRect()
        return {
          left: obj.left + window.pageXOffset,
          top: obj.top + window.pageYOffset,
          width: Math.round(obj.width),
          height: Math.round(obj.height)
        }
      },
      css: function(property, value){
        if (arguments.length < 2) {
          var element = this[0], computedStyle = getComputedStyle(element, '')
          if(!element) return
          if (typeof property == 'string')
            return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
          else if (isArray(property)) {
            var props = {}
            $.each(isArray(property) ? property: [property], function(_, prop){
              props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
            })
            return props
          }
        }

        var css = ''
        if (type(property) == 'string') {
          if (!value && value !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(property)) })
          else
            css = dasherize(property) + ":" + maybeAddPx(property, value)
        } else {
          for (key in property)
            if (!property[key] && property[key] !== 0)
              this.each(function(){ this.style.removeProperty(dasherize(key)) })
            else
              css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
        }

        return this.each(function(){ this.style.cssText += ';' + css })
      },
      index: function(element){
        return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
      },
      hasClass: function(name){
        if (!name) return false
        return emptyArray.some.call(this, function(el){
          return this.test(className(el))
        }, classRE(name))
      },
      addClass: function(name){
        if (!name) return this
        return this.each(function(idx){
          classList = []
          var cls = className(this), newName = funcArg(this, name, idx, cls)
          newName.split(/\s+/g).forEach(function(klass){
            if (!$(this).hasClass(klass)) classList.push(klass)
          }, this)
          classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
        })
      },
      removeClass: function(name){
        return this.each(function(idx){
          if (name === undefined) return className(this, '')
          classList = className(this)
          funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
            classList = classList.replace(classRE(klass), " ")
          })
          className(this, classList.trim())
        })
      },
      toggleClass: function(name, when){
        if (!name) return this
        return this.each(function(idx){
          var $this = $(this), names = funcArg(this, name, idx, className(this))
          names.split(/\s+/g).forEach(function(klass){
            (when === undefined ? !$this.hasClass(klass) : when) ?
              $this.addClass(klass) : $this.removeClass(klass)
          })
        })
      },
      scrollTop: function(value){
        if (!this.length) return
        var hasScrollTop = 'scrollTop' in this[0]
        if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
        return this.each(hasScrollTop ?
          function(){ this.scrollTop = value } :
          function(){ this.scrollTo(this.scrollX, value) })
      },
      scrollLeft: function(value){
        if (!this.length) return
        var hasScrollLeft = 'scrollLeft' in this[0]
        if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
        return this.each(hasScrollLeft ?
          function(){ this.scrollLeft = value } :
          function(){ this.scrollTo(value, this.scrollY) })
      },
      position: function() {
        if (!this.length) return

        var elem = this[0],
          // Get *real* offsetParent
          offsetParent = this.offsetParent(),
          // Get correct offsets
          offset       = this.offset(),
          parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

        // Subtract element margins
        // note: when an element has margin: auto the offsetLeft and marginLeft
        // are the same in Safari causing offset.left to incorrectly be 0
        offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
        offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

        // Add offsetParent borders
        parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
        parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

        // Subtract the two offsets
        return {
          top:  offset.top  - parentOffset.top,
          left: offset.left - parentOffset.left
        }
      },
      offsetParent: function() {
        return this.map(function(){
          var parent = this.offsetParent || document.body
          while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
            parent = parent.offsetParent
          return parent
        })
      }
    }

    // for now
    $.fn.detach = $.fn.remove

    // Generate the `width` and `height` functions
    ;['width', 'height'].forEach(function(dimension){
      var dimensionProperty =
        dimension.replace(/./, function(m){ return m[0].toUpperCase() })

      $.fn[dimension] = function(value){
        var offset, el = this[0]
        if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
          isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
          (offset = this.offset()) && offset[dimension]
        else return this.each(function(idx){
          el = $(this)
          el.css(dimension, funcArg(this, value, idx, el[dimension]()))
        })
      }
    })

    function traverseNode(node, fun) {
      fun(node)
      for (var i = 0, len = node.childNodes.length; i < len; i++)
        traverseNode(node.childNodes[i], fun)
    }

    // Generate the `after`, `prepend`, `before`, `append`,
    // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
    adjacencyOperators.forEach(function(operator, operatorIndex) {
      var inside = operatorIndex % 2 //=> prepend, append

      $.fn[operator] = function(){
        // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
        var argType, nodes = $.map(arguments, function(arg) {
              argType = type(arg)
              return argType == "object" || argType == "array" || arg == null ?
                arg : zepto.fragment(arg)
            }),
            parent, copyByClone = this.length > 1
        if (nodes.length < 1) return this

        return this.each(function(_, target){
          parent = inside ? target : target.parentNode

          // convert all methods to a "before" operation
          target = operatorIndex == 0 ? target.nextSibling :
                   operatorIndex == 1 ? target.firstChild :
                   operatorIndex == 2 ? target :
                   null

          var parentInDocument = $.contains(document.documentElement, parent)

          nodes.forEach(function(node){
            if (copyByClone) node = node.cloneNode(true)
            else if (!parent) return $(node).remove()

            parent.insertBefore(node, target)
            if (parentInDocument) traverseNode(node, function(el){
              if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
                 (!el.type || el.type === 'text/javascript') && !el.src)
                window['eval'].call(window, el.innerHTML)
            })
          })
        })
      }

      // after    => insertAfter
      // prepend  => prependTo
      // before   => insertBefore
      // append   => appendTo
      $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
        $(html)[operator](this)
        return this
      }
    })

    zepto.Z.prototype = $.fn

    // Export internal API functions in the `$.zepto` namespace
    zepto.uniq = uniq
    zepto.deserializeValue = deserializeValue
    $.zepto = zepto

    return $
  })()

  window.Zepto = Zepto
  window.$ === undefined && (window.$ = Zepto)

  ;(function($){
    var _zid = 1, undefined,
        slice = Array.prototype.slice,
        isFunction = $.isFunction,
        isString = function(obj){ return typeof obj == 'string' },
        handlers = {},
        specialEvents={},
        focusinSupported = 'onfocusin' in window,
        focus = { focus: 'focusin', blur: 'focusout' },
        hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

    function zid(element) {
      return element._zid || (element._zid = _zid++)
    }
    function findHandlers(element, event, fn, selector) {
      event = parse(event)
      if (event.ns) var matcher = matcherFor(event.ns)
      return (handlers[zid(element)] || []).filter(function(handler) {
        return handler
          && (!event.e  || handler.e == event.e)
          && (!event.ns || matcher.test(handler.ns))
          && (!fn       || zid(handler.fn) === zid(fn))
          && (!selector || handler.sel == selector)
      })
    }
    function parse(event) {
      var parts = ('' + event).split('.')
      return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
    }
    function matcherFor(ns) {
      return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
    }

    function eventCapture(handler, captureSetting) {
      return handler.del &&
        (!focusinSupported && (handler.e in focus)) ||
        !!captureSetting
    }

    function realEvent(type) {
      return hover[type] || (focusinSupported && focus[type]) || type
    }

    function add(element, events, fn, data, selector, delegator, capture){
      var id = zid(element), set = (handlers[id] || (handlers[id] = []))
      events.split(/\s/).forEach(function(event){
        if (event == 'ready') return $(document).ready(fn)
        var handler   = parse(event)
        handler.fn    = fn
        handler.sel   = selector
        // emulate mouseenter, mouseleave
        if (handler.e in hover) fn = function(e){
          var related = e.relatedTarget
          if (!related || (related !== this && !$.contains(this, related)))
            return handler.fn.apply(this, arguments)
        }
        handler.del   = delegator
        var callback  = delegator || fn
        handler.proxy = function(e){
          e = compatible(e)
          if (e.isImmediatePropagationStopped()) return
          e.data = data
          var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
          if (result === false) e.preventDefault(), e.stopPropagation()
          return result
        }
        handler.i = set.length
        set.push(handler)
        if ('addEventListener' in element)
          element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    }
    function remove(element, events, fn, selector, capture){
      var id = zid(element)
      ;(events || '').split(/\s/).forEach(function(event){
        findHandlers(element, event, fn, selector).forEach(function(handler){
          delete handlers[id][handler.i]
        if ('removeEventListener' in element)
          element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
        })
      })
    }

    $.event = { add: add, remove: remove }

    $.proxy = function(fn, context) {
      var args = (2 in arguments) && slice.call(arguments, 2)
      if (isFunction(fn)) {
        var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
        proxyFn._zid = zid(fn)
        return proxyFn
      } else if (isString(context)) {
        if (args) {
          args.unshift(fn[context], fn)
          return $.proxy.apply(null, args)
        } else {
          return $.proxy(fn[context], fn)
        }
      } else {
        throw new TypeError("expected function")
      }
    }

    $.fn.bind = function(event, data, callback){
      return this.on(event, data, callback)
    }
    $.fn.unbind = function(event, callback){
      return this.off(event, callback)
    }
    $.fn.one = function(event, selector, data, callback){
      return this.on(event, selector, data, callback, 1)
    }

    var returnTrue = function(){return true},
        returnFalse = function(){return false},
        ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
        eventMethods = {
          preventDefault: 'isDefaultPrevented',
          stopImmediatePropagation: 'isImmediatePropagationStopped',
          stopPropagation: 'isPropagationStopped'
        }

    function compatible(event, source) {
      if (source || !event.isDefaultPrevented) {
        source || (source = event)

        $.each(eventMethods, function(name, predicate) {
          var sourceMethod = source[name]
          event[name] = function(){
            this[predicate] = returnTrue
            return sourceMethod && sourceMethod.apply(source, arguments)
          }
          event[predicate] = returnFalse
        })

        if (source.defaultPrevented !== undefined ? source.defaultPrevented :
            'returnValue' in source ? source.returnValue === false :
            source.getPreventDefault && source.getPreventDefault())
          event.isDefaultPrevented = returnTrue
      }
      return event
    }

    function createProxy(event) {
      var key, proxy = { originalEvent: event }
      for (key in event)
        if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

      return compatible(proxy, event)
    }

    $.fn.delegate = function(selector, event, callback){
      return this.on(event, selector, callback)
    }
    $.fn.undelegate = function(selector, event, callback){
      return this.off(event, selector, callback)
    }

    $.fn.live = function(event, callback){
      $(document.body).delegate(this.selector, event, callback)
      return this
    }
    $.fn.die = function(event, callback){
      $(document.body).undelegate(this.selector, event, callback)
      return this
    }

    $.fn.on = function(event, selector, data, callback, one){
      var autoRemove, delegator, $this = this
      if (event && !isString(event)) {
        $.each(event, function(type, fn){
          $this.on(type, selector, data, fn, one)
        })
        return $this
      }

      if (!isString(selector) && !isFunction(callback) && callback !== false)
        callback = data, data = selector, selector = undefined
      if (isFunction(data) || data === false)
        callback = data, data = undefined

      if (callback === false) callback = returnFalse

      return $this.each(function(_, element){
        if (one) autoRemove = function(e){
          remove(element, e.type, callback)
          return callback.apply(this, arguments)
        }

        if (selector) delegator = function(e){
          var evt, match = $(e.target).closest(selector, element).get(0)
          if (match && match !== element) {
            evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
            return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
          }
        }

        add(element, event, callback, data, selector, delegator || autoRemove)
      })
    }
    $.fn.off = function(event, selector, callback){
      var $this = this
      if (event && !isString(event)) {
        $.each(event, function(type, fn){
          $this.off(type, selector, fn)
        })
        return $this
      }

      if (!isString(selector) && !isFunction(callback) && callback !== false)
        callback = selector, selector = undefined

      if (callback === false) callback = returnFalse

      return $this.each(function(){
        remove(this, event, callback, selector)
      })
    }

    $.fn.trigger = function(event, args){
      event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
      event._args = args
      return this.each(function(){
        // items in the collection might not be DOM elements
        if('dispatchEvent' in this) this.dispatchEvent(event)
        else $(this).triggerHandler(event, args)
      })
    }

    // triggers event handlers on current element just as if an event occurred,
    // doesn't trigger an actual event, doesn't bubble
    $.fn.triggerHandler = function(event, args){
      var e, result
      this.each(function(i, element){
        e = createProxy(isString(event) ? $.Event(event) : event)
        e._args = args
        e.target = element
        $.each(findHandlers(element, event.type || event), function(i, handler){
          result = handler.proxy(e)
          if (e.isImmediatePropagationStopped()) return false
        })
      })
      return result
    }

    // shortcut methods for `.bind(event, fn)` for each event type
    ;('focusin focusout load resize scroll unload click dblclick '+
    'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
    'change select keydown keypress keyup error').split(' ').forEach(function(event) {
      $.fn[event] = function(callback) {
        return callback ?
          this.bind(event, callback) :
          this.trigger(event)
      }
    })

    ;['focus', 'blur'].forEach(function(name) {
      $.fn[name] = function(callback) {
        if (callback) this.bind(name, callback)
        else this.each(function(){
          try { this[name]() }
          catch(e) {}
        })
        return this
      }
    })

    $.Event = function(type, props) {
      if (!isString(type)) props = type, type = props.type
      var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
      if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
      event.initEvent(type, bubbles, true)
      return compatible(event)
    }

  })(Zepto)

  ;(function($){
    var jsonpID = 0,
        document = window.document,
        key,
        name,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        scriptTypeRE = /^(?:text|application)\/javascript/i,
        xmlTypeRE = /^(?:text|application)\/xml/i,
        jsonType = 'application/json',
        htmlType = 'text/html',
        blankRE = /^\s*$/

    // trigger a custom event and return false if it was cancelled
    function triggerAndReturn(context, eventName, data) {
      var event = $.Event(eventName)
      $(context).trigger(event, data)
      return !event.isDefaultPrevented()
    }

    // trigger an Ajax "global" event
    function triggerGlobal(settings, context, eventName, data) {
      if (settings.global) return triggerAndReturn(context || document, eventName, data)
    }

    // Number of active Ajax requests
    $.active = 0

    function ajaxStart(settings) {
      if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
    }
    function ajaxStop(settings) {
      if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
    }

    // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
    function ajaxBeforeSend(xhr, settings) {
      var context = settings.context
      if (settings.beforeSend.call(context, xhr, settings) === false ||
          triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
        return false

      triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
    }
    function ajaxSuccess(data, xhr, settings, deferred) {
      var context = settings.context, status = 'success'
      settings.success.call(context, data, status, xhr)
      if (deferred) deferred.resolveWith(context, [data, status, xhr])
      triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
      ajaxComplete(status, xhr, settings)
    }
    // type: "timeout", "error", "abort", "parsererror"
    function ajaxError(error, type, xhr, settings, deferred) {
      var context = settings.context
      settings.error.call(context, xhr, type, error)
      if (deferred) deferred.rejectWith(context, [xhr, type, error])
      triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
      ajaxComplete(type, xhr, settings)
    }
    // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
    function ajaxComplete(status, xhr, settings) {
      var context = settings.context
      settings.complete.call(context, xhr, status)
      triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
      ajaxStop(settings)
    }

    // Empty function, used as default callback
    function empty() {}

    $.ajaxJSONP = function(options, deferred){
      if (!('type' in options)) return $.ajax(options)

      var _callbackName = options.jsonpCallback,
        callbackName = ($.isFunction(_callbackName) ?
          _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
        script = document.createElement('script'),
        originalCallback = window[callbackName],
        responseData,
        abort = function(errorType) {
          $(script).triggerHandler('error', errorType || 'abort')
        },
        xhr = { abort: abort }, abortTimeout

      if (deferred) deferred.promise(xhr)

      $(script).on('load error', function(e, errorType){
        clearTimeout(abortTimeout)
        $(script).off().remove()

        if (e.type == 'error' || !responseData) {
          ajaxError(null, errorType || 'error', xhr, options, deferred)
        } else {
          ajaxSuccess(responseData[0], xhr, options, deferred)
        }

        window[callbackName] = originalCallback
        if (responseData && $.isFunction(originalCallback))
          originalCallback(responseData[0])

        originalCallback = responseData = undefined
      })

      if (ajaxBeforeSend(xhr, options) === false) {
        abort('abort')
        return xhr
      }

      window[callbackName] = function(){
        responseData = arguments
      }

      script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
      document.head.appendChild(script)

      if (options.timeout > 0) abortTimeout = setTimeout(function(){
        abort('timeout')
      }, options.timeout)

      return xhr
    }

    $.ajaxSettings = {
      // Default type of request
      type: 'GET',
      // Callback that is executed before request
      beforeSend: empty,
      // Callback that is executed if the request succeeds
      success: empty,
      // Callback that is executed the the server drops error
      error: empty,
      // Callback that is executed on request complete (both: error and success)
      complete: empty,
      // The context for the callbacks
      context: null,
      // Whether to trigger "global" Ajax events
      global: true,
      // Transport
      xhr: function () {
        return new window.XMLHttpRequest()
      },
      // MIME types mapping
      // IIS returns Javascript as "application/x-javascript"
      accepts: {
        script: 'text/javascript, application/javascript, application/x-javascript',
        json:   jsonType,
        xml:    'application/xml, text/xml',
        html:   htmlType,
        text:   'text/plain'
      },
      // Whether the request is to another domain
      crossDomain: false,
      // Default timeout
      timeout: 0,
      // Whether data should be serialized to string
      processData: true,
      // Whether the browser should be allowed to cache GET responses
      cache: false
    }

    function mimeToDataType(mime) {
      if (mime) mime = mime.split(';', 2)[0]
      return mime && ( mime == htmlType ? 'html' :
        mime == jsonType ? 'json' :
        scriptTypeRE.test(mime) ? 'script' :
        xmlTypeRE.test(mime) && 'xml' ) || 'text'
    }

    function appendQuery(url, query) {
      if (query == '') return url
      return (url + '&' + query).replace(/[&?]{1,2}/, '?')
    }

    // serialize payload and append it to the URL for GET requests
    function serializeData(options) {
      if (options.processData && options.data && $.type(options.data) != "string")
        options.data = $.param(options.data, options.traditional)
      if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
        options.url = appendQuery(options.url, options.data), options.data = undefined
    }

    $.ajax = function(options){
      var settings = $.extend({}, options || {}),
          deferred = $.Deferred && $.Deferred()
      for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

      ajaxStart(settings)

      if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
        RegExp.$2 != window.location.host

      if (!settings.url) settings.url = window.location.toString()
      serializeData(settings)

      var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
      if (hasPlaceholder) dataType = 'jsonp'

      if (settings.cache === false || (
           (!options || options.cache !== true) &&
           ('script' == dataType || 'jsonp' == dataType)
          ))
        settings.url = appendQuery(settings.url, '_=' + Date.now())

      if ('jsonp' == dataType) {
        if (!hasPlaceholder)
          settings.url = appendQuery(settings.url,
            settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
        return $.ajaxJSONP(settings, deferred)
      }

      var mime = settings.accepts[dataType],
          headers = { },
          setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
          protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
          xhr = settings.xhr(),
          nativeSetHeader = xhr.setRequestHeader,
          abortTimeout

      if (deferred) deferred.promise(xhr)

      if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
      setHeader('Accept', mime || '*/*')
      if (mime = settings.mimeType || mime) {
        if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
        xhr.overrideMimeType && xhr.overrideMimeType(mime)
      }
      if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
        setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

      if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
      xhr.setRequestHeader = setHeader

      xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
          xhr.onreadystatechange = empty
          clearTimeout(abortTimeout)
          var result, error = false
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
            dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
            result = xhr.responseText

            try {
              // http://perfectionkills.com/global-eval-what-are-the-options/
              if (dataType == 'script')    (1,eval)(result)
              else if (dataType == 'xml')  result = xhr.responseXML
              else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
            } catch (e) { error = e }

            if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
            else ajaxSuccess(result, xhr, settings, deferred)
          } else {
            ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
          }
        }
      }

      if (ajaxBeforeSend(xhr, settings) === false) {
        xhr.abort()
        ajaxError(null, 'abort', xhr, settings, deferred)
        return xhr
      }

      if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

      var async = 'async' in settings ? settings.async : true
      xhr.open(settings.type, settings.url, async, settings.username, settings.password)

      for (name in headers) nativeSetHeader.apply(xhr, headers[name])

      if (settings.timeout > 0) abortTimeout = setTimeout(function(){
          xhr.onreadystatechange = empty
          xhr.abort()
          ajaxError(null, 'timeout', xhr, settings, deferred)
        }, settings.timeout)

      // avoid sending empty string (#319)
      xhr.send(settings.data ? settings.data : null)
      return xhr
    }

    // handle optional data/success arguments
    function parseArguments(url, data, success, dataType) {
      if ($.isFunction(data)) dataType = success, success = data, data = undefined
      if (!$.isFunction(success)) dataType = success, success = undefined
      return {
        url: url
      , data: data
      , success: success
      , dataType: dataType
      }
    }

    $.get = function(/* url, data, success, dataType */){
      return $.ajax(parseArguments.apply(null, arguments))
    }

    $.post = function(/* url, data, success, dataType */){
      var options = parseArguments.apply(null, arguments)
      options.type = 'POST'
      return $.ajax(options)
    }

    $.getJSON = function(/* url, data, success */){
      var options = parseArguments.apply(null, arguments)
      options.dataType = 'json'
      return $.ajax(options)
    }

    $.fn.load = function(url, data, success){
      if (!this.length) return this
      var self = this, parts = url.split(/\s/), selector,
          options = parseArguments(url, data, success),
          callback = options.success
      if (parts.length > 1) options.url = parts[0], selector = parts[1]
      options.success = function(response){
        self.html(selector ?
          $('<div>').html(response.replace(rscript, "")).find(selector)
          : response)
        callback && callback.apply(self, arguments)
      }
      $.ajax(options)
      return this
    }

    var escape = encodeURIComponent

    function serialize(params, obj, traditional, scope){
      var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
      $.each(obj, function(key, value) {
        type = $.type(value)
        if (scope) key = traditional ? scope :
          scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
        // handle data in serializeArray() format
        if (!scope && array) params.add(value.name, value.value)
        // recurse into nested objects
        else if (type == "array" || (!traditional && type == "object"))
          serialize(params, value, traditional, key)
        else params.add(key, value)
      })
    }

    $.param = function(obj, traditional){
      var params = []
      params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
      serialize(params, obj, traditional)
      return params.join('&').replace(/%20/g, '+')
    }
  })(Zepto)

  ;(function($){
    $.fn.serializeArray = function() {
      var result = [], el
      $([].slice.call(this.get(0).elements)).each(function(){
        el = $(this)
        var type = el.attr('type')
        if (this.nodeName.toLowerCase() != 'fieldset' &&
          !this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
          ((type != 'radio' && type != 'checkbox') || this.checked))
          result.push({
            name: el.attr('name'),
            value: el.val()
          })
      })
      return result
    }

    $.fn.serialize = function(){
      var result = []
      this.serializeArray().forEach(function(elm){
        result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
      })
      return result.join('&')
    }

    $.fn.submit = function(callback) {
      if (callback) this.bind('submit', callback)
      else if (this.length) {
        var event = $.Event('submit')
        this.eq(0).trigger(event)
        if (!event.isDefaultPrevented()) this.get(0).submit()
      }
      return this
    }

  })(Zepto)

  ;(function($){
    // __proto__ doesn't exist on IE<11, so redefine
    // the Z function to use object extension instead
    if (!('__proto__' in {})) {
      $.extend($.zepto, {
        Z: function(dom, selector){
          dom = dom || []
          $.extend(dom, $.fn)
          dom.selector = selector || ''
          dom.__Z = true
          return dom
        },
        // this is a kludge but works
        isZ: function(object){
          return $.type(object) === 'array' && '__Z' in object
        }
      })
    }

    // getComputedStyle shouldn't freak out when called
    // without a valid element as argument
    try {
      getComputedStyle(undefined)
    } catch(e) {
      var nativeGetComputedStyle = getComputedStyle;
      window.getComputedStyle = function(element){
        try {
          return nativeGetComputedStyle(element)
        } catch(e) {
          return null
        }
      }
    }
  })(Zepto)


  module.exports = $;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 简易路由系统
 * 上手快
 * 配置简单
 */
(function(win, factory) {
  if (true) {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define(factory);
  } else {
    win.EASY_ROUTER = factory();
  }
})(this, function() {
  var APP = {};
  var _tools = {
    setPath: function(obj) {
      var path = location.pathname;
      delete obj._replace;
      return path + "?" + this.serializeObj(obj);
    },
    serializeObj: function(options) {
      var arr = [];
      for (var i in options) {
        arr.push(i + "=" + options[i]);
      }
      return arr.join("&");
    },
    getLocationParam: function(url) {
      var params = url
        .toString()
        .slice(1)
        .split("&");
      var returnObject = {};
      for (var i = 0; i != params.length; i++) {
        var index = params[i].indexOf("=");
        returnObject[params[i].slice(0, index)] = params[i].slice(index + 1);
      }
      return returnObject;
    },
    setPageTitle: function(title) {
      var $body = document.body;
      title && (document.title = title);
    },
    getCbPathObj: function() {
      var query = location.search;
      if ("pageName" in this.getLocationParam(query)) {
        var cbPathObj = this.getLocationParam(query);
        if (cbPathObj.pageName !== "home") {
          delete cbPathObj.openId;
          delete cbPathObj.appType;
          return cbPathObj;
        }
      }
      return undefined;
    },
    getType: function(fun) {
      function isFunction(value) {
        return typeof value == "function";
      }
      function isWindow(obj) {
        return obj != null && obj == obj.window;
      }
      function isDocument(obj) {
        return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
      }
      function isObject(obj) {
        return typeof obj == "object";
      }
      function isPlainObject(obj) {
        return (
          isObject(obj) &&
          !isWindow(obj) &&
          Object.getPrototypeOf(obj) == Object.prototype
        );
      }
      function isArray(value) {
        return value instanceof Array;
      }
      function likeArray(obj) {
        return typeof obj.length == "number";
      }
      if (isFunction(fun)) return "function";
      if (isPlainObject(fun)) return "object";
      return false;
    }
  };
  APP = {
    _config: {
      _rootDom: null,
    },
    setRouter: function(stateObj, component, title) {
      if (!("urlAction" in stateObj)) {
        if (stateObj._replace)
          history.replaceState(stateObj, title, _tools.setPath(stateObj));
        else history.pushState(stateObj, title, _tools.setPath(stateObj));
      }
      _tools.setPageTitle(title);
      this.updatePageView(component, stateObj);
    },
    updatePageView: function(component, stateObj) {
      if (this.curPathWidget)
        this.curPathWidget.destroy && this.curPathWidget.destroy();
        this._config._rootDom && (this._config._rootDom.innerHTML = '')
      this.curPathWidget = component;
    },
    curPathWidget: undefined,
    curPathName: undefined,
    getCbPathObj: _tools.getCbPathObj.bind(_tools),
    go: function(name, query) {
      var stateObj = {};
      var self = this;
      stateObj.pageName = name;
      if (_tools.getType(query) === "object") {
        for (var i in query) stateObj[i] = query[i];
      }
      self._gotoPage(stateObj);
    },
    replace: function(name, query) {
      var stateObj = {};
      var self = this;
      stateObj.pageName = name;
      stateObj._replace = 1;
      if (_tools.getType(query) === "object") {
        for (var i in query) stateObj[i] = query[i];
      }
      self._gotoPage(stateObj);
    },
    _gotoPage: function(stateObj) {
      this.curPathName = stateObj.pageName;
      this._goPathNew(stateObj.pageName, stateObj);
    },
    initJump: function() {
      var stateObj = {};
      if (this.getCbPathObj()) stateObj = this.getCbPathObj();
      else stateObj.pageName = "home";
      stateObj._replace = 1;
      this._gotoPage(stateObj);
      this.cbPath = null;
    },
    _init: function(config) {
      var self = this;
      self._routerConfigArr = config || [];
      self._registerListener();
      self.initJump();
      return this;
    },
    _registerListener:function() {
      var self = this;
      window.onpopstate = function(event) {
        var stateObj = event.state;
        if (stateObj) {
          stateObj.urlAction = 1;
          self._gotoPage(stateObj);
        }
      };
    },
    _goPathNew: function(path, stateObj) {
      var self = this;
      var filterCurRouterObjArr = self._routerConfigArr.filter(function(item) {
        return item.pageName === path;
      });
      if (filterCurRouterObjArr.length) {
        var filterCurRouterObj = filterCurRouterObjArr[0];
        var component = filterCurRouterObj.component;
        if (!filterCurRouterObj._updateInSide) {
          self.toDoRouterCb(
            stateObj,
            filterCurRouterObj.component,
            filterCurRouterObj.title
          );
          if (_tools.getType(component) === "object") {
            if (component._Promise) {
              component._Promise().then(function(res) {
                self.setRouter(stateObj, res, filterCurRouterObj.title);
                self.toDoRouterCb(
                  stateObj,
                  res,
                  filterCurRouterObj.title
                );
              });
              return;
            }
          }
					self.setRouter(stateObj, component, filterCurRouterObj.title);
					self.toDoRouterCb(
						stateObj,
						component,
						filterCurRouterObj.title
					);
        } else self.toDoRouterCb(stateObj, component, filterCurRouterObj.title);
      } else {
        self.toDoRouterCb(stateObj, "", "");
      }
    },
    toDoRouterCb: function(stateObj, component, title) {
      var self = this;
      if (_tools.getType(component) === "function") {
        component(stateObj, this, title);
      } else if (_tools.getType(component) === "object") {
        component.init && component.init(stateObj, this, title);
      }
		}
  };
  return APP;
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;e.openTag="{{",e.closeTag="}}";var z=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a){a=a.replace(/^\s/,"");var b=a.split(" "),c=b.shift(),e=b.join(" ");switch(c){case"if":a="if("+e+"){";break;case"else":b="if"===b.shift()?" if("+b.join(" ")+")":"",a="}else"+b+"{";break;case"/if":a="}";break;case"each":var f=b[0]||"$data",g=b[1]||"as",h=b[2]||"$value",i=b[3]||"$index",j=h+","+i;"as"!==g&&(f="[]"),a="$each("+f+",function("+j+"){";break;case"/each":a="});";break;case"echo":a="print("+e+");";break;case"print":case"include":a=c+"("+b.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(e)){var k=!0;0===a.indexOf("#")&&(a=a.substr(1),k=!1);for(var l=0,m=a.split("|"),n=m.length,o=m[l++];n>l;l++)o=z(o,m[l]);a=(k?"=":"=#")+o}else a=d.helpers[c]?"=#"+c+"("+b.join(",")+");":"="+a}return a}, true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return d}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof exports?module.exports=d:this.template=d}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * mescroll -- 精致的下拉刷新和上拉加载js框架  ( a great JS framework for pull-refresh and pull-up-loading )
 * version 1.3.2
 * 2018-01-01
 * author: wenju < mescroll@qq.com > 文举
 * 
 * 官网:	http://www.mescroll.com
 * 文档:	https://github.com/mescroll/mescroll.git
 * 动态:	https://github.com/mescroll/mescroll-versions
 * 问答:http://www.mescroll.com/qa.html
 * issues: https://github.com/mescroll/mescroll/issues
 * QQ交流群: 633126761
 */
;(function(a,b){var c="function"==="function",d=typeof module!=="undefined"&&module.exports;if(c){!(__WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}else{if(d){module.exports=b()}else{this[a]=b()}}})("MeScroll",function(){var a=function(b,e){var g=this;g.version="1.3.2";g.isScrollBody=(!b||b=="body");g.scrollDom=g.isScrollBody?document.body:g.getDomById(b);if(!g.scrollDom){return}g.options=e||{};var d=navigator.userAgent;var c=!!d.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);var h=typeof window.orientation=="undefined";var f=d.indexOf("Android")>-1||d.indexOf("Adr")>-1;g.os={ios:c,pc:h,android:f};g.isDownScrolling=false;g.isUpScrolling=false;g.initDownScroll();g.initUpScroll();setTimeout(function(){if(g.optDown.use&&g.optDown.auto){if(g.optDown.autoShowLoading){g.triggerDownScroll()}else{g.optDown.callback&&g.optDown.callback(g)}}g.optUp.use&&g.optUp.auto&&!g.isUpAutoLoad&&g.triggerUpScroll()},30)};a.prototype.extendDownScroll=function(b){a.extend(b,{use:true,auto:true,autoShowLoading:false,isLock:false,isBoth:false,offset:80,outOffsetRate:0.2,bottomOffset:20,minAngle:45,hardwareClass:"mescroll-hardware",warpId:null,warpClass:"mescroll-downwarp",resetClass:"mescroll-downwarp-reset",htmlContent:'<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新 </p>',inited:function(d,c){d.downTipDom=c.getElementsByClassName("downwarp-tip")[0];d.downProgressDom=c.getElementsByClassName("downwarp-progress")[0]},inOffset:function(c){if(c.downTipDom){c.downTipDom.innerHTML="下拉刷新"}if(c.downProgressDom){c.downProgressDom.classList.remove("mescroll-rotate")}},outOffset:function(c){if(c.downTipDom){c.downTipDom.innerHTML="释放更新"}},onMoving:function(d,f,c){if(d.downProgressDom){var e=360*f;d.downProgressDom.style.webkitTransform="rotate("+e+"deg)";d.downProgressDom.style.transform="rotate("+e+"deg)"}},beforeLoading:function(d,c){return false},showLoading:function(c){if(c.downTipDom){c.downTipDom.innerHTML="加载中 ..."}if(c.downProgressDom){c.downProgressDom.classList.add("mescroll-rotate")}},callback:function(c){c.resetUpScroll()}})};a.prototype.extendUpScroll=function(b){var c=this.os.pc;a.extend(b,{use:true,auto:true,isLock:false,isBoth:false,isBounce:true,callback:null,page:{num:0,size:10,time:null},noMoreSize:5,offset:100,toTop:{warpId:null,src:null,html:null,offset:1000,warpClass:"mescroll-totop",showClass:"mescroll-fade-in",hideClass:"mescroll-fade-out",duration:300,supportTap:false},loadFull:{use:false,delay:500},empty:{warpId:null,icon:null,tip:"暂无相关数据~",btntext:"",btnClick:null,supportTap:false},clearId:null,clearEmptyId:null,hardwareClass:"mescroll-hardware",warpId:null,warpClass:"mescroll-upwarp",htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',htmlNodata:'<p class="upwarp-nodata">-- END --</p>',inited:function(d,e){},showLoading:function(d,e){e.innerHTML=d.optUp.htmlLoading},showNoMore:function(d,e){e.innerHTML=d.optUp.htmlNodata},onScroll:null,scrollbar:{use:c,barClass:"mescroll-bar"}})};a.extend=function(c,b){if(!c){return b}for(var key in b){if(c[key]==null){c[key]=b[key]}else{if(typeof c[key]=="object"){a.extend(c[key],b[key])}}}return c};a.prototype.initDownScroll=function(){var c=this;c.optDown=c.options.down||{};c.extendDownScroll(c.optDown);c.touchstartEvent=function(d){if(c.isScrollTo){d.preventDefault()}c.startPoint=c.getPoint(d);c.lastPoint=c.startPoint;c.maxTouchmoveY=c.getBodyHeight()-c.optDown.bottomOffset;c.inTouchend=false;if(c.os.pc&&c.getScrollTop()<=0){c.scrollDom.addEventListener("mousemove",c.touchmoveEvent);document.ondragstart=function(){return false}}};c.scrollDom.addEventListener("mousedown",c.touchstartEvent);c.scrollDom.addEventListener("touchstart",c.touchstartEvent);c.touchmoveEvent=function(l){var d=c.getScrollTop();var h=c.getPoint(l);var f=h.y-c.startPoint.y;if(f>0){if(d<=0){if(l.cancelable&&!l.defaultPrevented){l.preventDefault()}if(c.optDown.use&&!c.inTouchend&&!c.isDownScrolling&&!c.optDown.isLock&&(!c.isUpScrolling||(c.isUpScrolling&&c.optUp.isBoth))){var o=Math.abs(c.lastPoint.x-h.x);var n=Math.abs(c.lastPoint.y-h.y);var m=Math.sqrt(o*o+n*n);if(m!=0){var g=Math.asin(n/m)/Math.PI*180;if(g<c.optDown.minAngle){return}}if(c.maxTouchmoveY>0&&h.y>=c.maxTouchmoveY){c.inTouchend=true;c.touchendEvent();return}var p=h.y-c.lastPoint.y;if(!c.downHight){c.downHight=0}if(c.downHight<c.optDown.offset){if(c.movetype!=1){c.movetype=1;c.optDown.inOffset(c);c.downwarp.classList.remove(c.optDown.resetClass);c.scrollDom.classList.add(c.optDown.hardwareClass);c.scrollDom.style.webkitOverflowScrolling="auto";c.isMoveDown=true}c.downHight+=p}else{if(c.movetype!=2){c.movetype=2;c.optDown.outOffset(c);c.downwarp.classList.remove(c.optDown.resetClass);c.scrollDom.classList.add(c.optDown.hardwareClass);c.scrollDom.style.webkitOverflowScrolling="auto";c.isMoveDown=true}if(p>0){c.downHight+=p*c.optDown.outOffsetRate}else{c.downHight+=p}}c.downwarp.style.height=c.downHight+"px";var k=c.downHight/c.optDown.offset;c.optDown.onMoving(c,k,c.downHight)}}}else{if(f<0){var q=c.getScrollHeight();var j=c.getClientHeight();var i=q-j-d;if(!c.optUp.isBounce&&l.cancelable&&!l.defaultPrevented&&i<=0){l.preventDefault()}if(c.optUp.use&&!c.optUp.isLock&&c.optUp.hasNext&&!c.isUpScrolling&&(!c.isDownScrolling||(c.isDownScrolling&&c.optDown.isBoth))&&(j+c.optUp.offset>=q||i<=0)){c.triggerUpScroll()}}}c.lastPoint=h};c.scrollDom.addEventListener("touchmove",c.touchmoveEvent);c.touchendEvent=function(){if(c.optDown.use&&c.isMoveDown){if(c.downHight>=c.optDown.offset){c.triggerDownScroll()}else{c.downwarp.classList.add(c.optDown.resetClass);c.downHight=0;c.downwarp.style.height=0}c.scrollDom.style.webkitOverflowScrolling="touch";c.scrollDom.classList.remove(c.optDown.hardwareClass);c.movetype=0;c.isMoveDown=false}if(c.os.pc){c.scrollDom.removeEventListener("mousemove",c.touchmoveEvent);document.ondragstart=function(){return true}}};c.scrollDom.addEventListener("mouseup",c.touchendEvent);c.scrollDom.addEventListener("mouseleave",c.touchendEvent);c.scrollDom.addEventListener("touchend",c.touchendEvent);c.scrollDom.addEventListener("touchcancel",c.touchendEvent);if(c.optDown.use){c.downwarp=document.createElement("div");c.downwarp.className=c.optDown.warpClass;c.downwarp.innerHTML='<div class="downwarp-content">'+c.optDown.htmlContent+"</div>";var b=c.optDown.warpId?c.getDomById(c.optDown.warpId):c.scrollDom;if(c.optDown.warpId&&b){b.appendChild(c.downwarp)}else{if(!b){b=c.scrollDom}b.insertBefore(c.downwarp,c.scrollDom.firstChild)}setTimeout(function(){c.optDown.inited(c,c.downwarp)},0)}};a.prototype.getPoint=function(b){return{x:b.touches?b.touches[0].pageX:b.clientX,y:b.touches?b.touches[0].pageY:b.clientY}};a.prototype.triggerDownScroll=function(){if(!this.optDown.beforeLoading(this,this.downwarp)){this.showDownScroll();this.optDown.callback&&this.optDown.callback(this)}};a.prototype.showDownScroll=function(){this.isDownScrolling=true;this.optDown.showLoading(this);this.downHight=this.optDown.offset;this.downwarp.classList.add(this.optDown.resetClass);this.downwarp.style.height=this.optDown.offset+"px"};a.prototype.endDownScroll=function(){this.downHight=0;this.downwarp.style.height=0;this.isDownScrolling=false;if(this.downProgressDom){this.downProgressDom.classList.remove("mescroll-rotate")}};a.prototype.lockDownScroll=function(b){if(b==null){b=true}this.optDown.isLock=b};a.prototype.initUpScroll=function(){var c=this;c.optUp=c.options.up||{use:false};c.extendUpScroll(c.optUp);if(c.optUp.scrollbar.use){c.scrollDom.classList.add(c.optUp.scrollbar.barClass)}if(!c.optUp.isBounce){c.setBounce(false)}if(c.optUp.use==false){return}c.optUp.hasNext=true;c.upwarp=document.createElement("div");c.upwarp.className=c.optUp.warpClass;var b;if(c.optUp.warpId){b=c.getDomById(c.optUp.warpId)}if(!b){b=c.scrollDom}b.appendChild(c.upwarp);c.preScrollY=0;c.scrollEvent=function(){var f=c.getScrollTop();var e=f-c.preScrollY>0;c.preScrollY=f;if(!c.isUpScrolling&&(!c.isDownScrolling||(c.isDownScrolling&&c.optDown.isBoth))){if(!c.optUp.isLock&&c.optUp.hasNext){var d=c.getScrollHeight()-c.getClientHeight()-f;if(d<=c.optUp.offset&&e){c.triggerUpScroll()}}var g=c.optUp.toTop;if(g.src||g.html){if(f>=g.offset){c.showTopBtn()}else{c.hideTopBtn()}}}c.optUp.onScroll&&c.optUp.onScroll(c,f,e)};if(c.isScrollBody){window.addEventListener("scroll",c.scrollEvent)}else{c.scrollDom.addEventListener("scroll",c.scrollEvent)}setTimeout(function(){c.optUp.inited(c,c.upwarp)},0)};a.prototype.setBounce=function(b){if(this.isScrollBody||!this.os.ios){return}if(b==false){this.optUp.isBounce=false;window.addEventListener("touchmove",this.bounceTouchmove)}else{this.optUp.isBounce=true;window.removeEventListener("touchmove",this.bounceTouchmove)}};a.prototype.bounceTouchmove=function(h){var j=this;var d=h.target;var f=true;while(d!==document.body&&d!==document){var m=d.classList;if(m){if(m.contains("mescroll")||m.contains("mescroll-touch")){f=false;break}else{if(m.contains("mescroll-touch-x")||m.contains("mescroll-touch-y")){var c=h.touches?h.touches[0].pageX:h.clientX;var b=h.touches?h.touches[0].pageY:h.clientY;if(!j.preWinX){j.preWinX=c}if(!j.preWinY){j.preWinY=b}var l=Math.abs(j.preWinX-c);var k=Math.abs(j.preWinY-b);var i=Math.sqrt(l*l+k*k);j.preWinX=c;j.preWinY=b;if(i!=0){var g=Math.asin(k/i)/Math.PI*180;if((g<=45&&m.contains("mescroll-touch-x"))||(g>45&&m.contains("mescroll-touch-y"))){f=false;break}}}}}d=d.parentNode}if(f&&h.cancelable&&!h.defaultPrevented){h.preventDefault()}};a.prototype.triggerUpScroll=function(){if(!this.isUpScrolling){this.showUpScroll();this.optUp.page.num++;this.isUpAutoLoad=true;this.optUp.callback&&this.optUp.callback(this.optUp.page,this)}};a.prototype.showUpScroll=function(){this.isUpScrolling=true;this.upwarp.classList.add(this.optUp.hardwareClass);this.upwarp.style.visibility="visible";this.optUp.showLoading(this,this.upwarp)};a.prototype.showNoMore=function(){this.upwarp.style.visibility="visible";this.optUp.hasNext=false;this.optUp.showNoMore(this,this.upwarp)};a.prototype.hideUpScroll=function(){this.upwarp.style.visibility="hidden";this.upwarp.classList.remove(this.optUp.hardwareClass);var b=this.upwarp.getElementsByClassName("upwarp-progress")[0];if(b){b.classList.remove("mescroll-rotate")}};a.prototype.endUpScroll=function(b){if(b!=null){if(b){this.showNoMore()}else{this.hideUpScroll()}}this.isUpScrolling=false};a.prototype.resetUpScroll=function(c){if(this.optUp&&this.optUp.use){var b=this.optUp.page;this.prePageNum=b.num;this.prePageTime=b.time;b.num=1;b.time=null;if(!this.isDownScrolling&&c!=false){if(c==null){this.removeEmpty();this.clearDataList();this.showUpScroll()}else{this.showDownScroll()}}this.isUpAutoLoad=true;this.optUp.callback&&this.optUp.callback(b,this)}};a.prototype.setPageNum=function(b){this.optUp.page.num=b-1};a.prototype.setPageSize=function(b){this.optUp.page.size=b};a.prototype.clearDataList=function(){var c=this.optUp.clearId||this.optUp.clearEmptyId;if(c){var b=this.getDomById(c);if(b){b.innerHTML=""}}};a.prototype.endByPage=function(c,e,d){var b;if(this.optUp.use&&e!=null){b=this.optUp.page.num<e}this.endSuccess(c,b,d)};a.prototype.endBySize=function(d,c,e){var b;if(this.optUp.use&&c!=null){var f=(this.optUp.page.num-1)*this.optUp.page.size+d;b=f<c}this.endSuccess(d,b,e)};a.prototype.endSuccess=function(d,b,f){if(this.isDownScrolling){this.endDownScroll()}if(this.optUp.use){var e;if(d!=null){var g=this.optUp.page.num;var c=this.optUp.page.size;if(g==1){this.clearDataList();if(f){this.optUp.page.time=f}}if(d<c||b==false){this.optUp.hasNext=false;if(d==0&&g==1){e=false;this.showEmpty()}else{var h=(g-1)*c+d;if(h<this.optUp.noMoreSize){e=false}else{e=true}this.removeEmpty()}}else{e=false;this.optUp.hasNext=true;this.removeEmpty()}}this.endUpScroll(e);this.loadFull()}};a.prototype.endErr=function(){if(this.isDownScrolling){var b=this.optUp.page;if(b&&this.prePageNum){b.num=this.prePageNum;b.time=this.prePageTime}this.endDownScroll()}if(this.isUpScrolling){this.optUp.page.num--;this.endUpScroll(false)}};a.prototype.loadFull=function(){var b=this;if(b.optUp.loadFull.use&&!b.optUp.isLock&&b.optUp.hasNext&&b.getScrollHeight()<=b.getClientHeight()){setTimeout(function(){if(b.getScrollHeight()<=b.getClientHeight()){b.triggerUpScroll()}},b.optUp.loadFull.delay)}};a.prototype.lockUpScroll=function(b){if(b==null){b=true}this.optUp.isLock=b};a.prototype.showEmpty=function(){var c=this;var d=c.optUp.empty;var b=d.warpId||c.optUp.clearEmptyId;if(b==null){return}var g=c.getDomById(b);if(g){c.removeEmpty();var f="";if(d.icon){f+='<img class="empty-icon" src="'+d.icon+'"/>'}if(d.tip){f+='<p class="empty-tip">'+d.tip+"</p>"}if(d.btntext){f+='<p class="empty-btn">'+d.btntext+"</p>"}c.emptyDom=document.createElement("div");c.emptyDom.className="mescroll-empty";c.emptyDom.innerHTML=f;g.appendChild(c.emptyDom);if(d.btnClick){var e=c.emptyDom.getElementsByClassName("empty-btn")[0];if(d.supportTap){e.addEventListener("tap",function(h){h.stopPropagation();h.preventDefault();d.btnClick()})}else{e.onclick=function(){d.btnClick()}}}}};a.prototype.removeEmpty=function(){this.removeChild(this.emptyDom)};a.prototype.showTopBtn=function(){if(!this.topBtnShow){this.topBtnShow=true;var c=this;var d=c.optUp.toTop;if(c.toTopBtn==null){if(d.html){c.toTopBtn=document.createElement("div");c.toTopBtn.innerHTML=d.html}else{c.toTopBtn=document.createElement("img");c.toTopBtn.src=d.src}c.toTopBtn.className=d.warpClass;if(d.supportTap){c.toTopBtn.addEventListener("tap",function(f){f.stopPropagation();f.preventDefault();c.scrollTo(0,c.optUp.toTop.duration)})}else{c.toTopBtn.onclick=function(){c.scrollTo(0,c.optUp.toTop.duration)}}var b;if(d.warpId){b=c.getDomById(d.warpId)}if(!b){b=document.body}b.appendChild(c.toTopBtn)}c.toTopBtn.classList.remove(d.hideClass);c.toTopBtn.classList.add(d.showClass)}};a.prototype.hideTopBtn=function(){if(this.topBtnShow&&this.toTopBtn){this.topBtnShow=false;this.toTopBtn.classList.remove(this.optUp.toTop.showClass);this.toTopBtn.classList.add(this.optUp.toTop.hideClass)}};a.prototype.scrollTo=function(g,c){var d=this;var f=d.getScrollTop();var b=g;if(b>0){var e=d.getScrollHeight()-d.getClientHeight();if(b>e){b=e}}else{b=0}d.isScrollTo=true;d.getStep(f,b,function(h){d.setScrollTop(h);if(h==b){d.isScrollTo=false}},c)};a.prototype.getStep=function(f,d,k,l,h){var j=d-f;if(l==0||j==0){k&&k(d);return}l=l||300;h=h||30;var g=l/h;var c=j/g;var e=0;var b=window.setInterval(function(){if(e<g-1){f+=c;k&&k(f,b);e++}else{k&&k(d,b);window.clearInterval(b)}},h)};a.prototype.getScrollHeight=function(){return this.scrollDom.scrollHeight};a.prototype.getClientHeight=function(){if(this.isScrollBody&&document.compatMode=="CSS1Compat"){return document.documentElement.clientHeight}else{return this.scrollDom.clientHeight}};a.prototype.getBodyHeight=function(){return document.body.clientHeight||document.documentElement.clientHeight};a.prototype.getScrollTop=function(){if(this.isScrollBody){return document.documentElement.scrollTop||document.body.scrollTop}else{return this.scrollDom.scrollTop}};a.prototype.getToBottom=function(){return this.getScrollHeight()-this.getClientHeight()-this.getScrollTop()};a.prototype.setScrollTop=function(b){if(this.isScrollBody){document.documentElement.scrollTop=b;document.body.scrollTop=b}else{this.scrollDom.scrollTop=b}};a.prototype.getDomById=function(c){var b;if(c){b=document.getElementById(c)}if(!b){console.error('the element with id as "'+c+'" can not be found: document.getElementById("'+c+'")==null')}return b};a.prototype.removeChild=function(c){if(c){var b=c.parentNode;b&&b.removeChild(c);c=null}};a.prototype.destroy=function(){var b=this;b.scrollDom.removeEventListener("touchstart",b.touchstartEvent);b.scrollDom.removeEventListener("touchmove",b.touchmoveEvent);b.scrollDom.removeEventListener("touchend",b.touchendEvent);b.scrollDom.removeEventListener("touchcancel",b.touchendEvent);b.scrollDom.removeEventListener("mousedown",b.touchstartEvent);b.scrollDom.removeEventListener("mousemove",b.touchmoveEvent);b.scrollDom.removeEventListener("mouseup",b.touchendEvent);b.scrollDom.removeEventListener("mouseleave",b.touchendEvent);b.removeChild(b.downwarp);if(b.isScrollBody){window.removeEventListener("scroll",b.scrollEvent)}else{b.scrollDom.removeEventListener("scroll",b.scrollEvent)}b.removeChild(b.upwarp);b.removeChild(b.toTopBtn);b.setBounce(true)};return a});

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(3);
__webpack_require__(7);
__webpack_require__(2);
__webpack_require__(0);
module.exports = __webpack_require__(4);


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*

 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <elfz@laacz.lv>
    http://jsbeautifier.org/


  You are free to use this in any way you want, in case you find this useful or working for you.

  Usage:
    style_html(html_source);

    style_html(html_source, options);

  The options are:
    indent_size (default 4)          — indentation size,
    indent_char (default space)      — character to indent with,
    max_char (default 70)            -  maximum amount of characters per line,
    brace_style (default "collapse") - "collapse" | "expand" | "end-expand"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line.
    unformatted (defaults to inline tags) - list of tags, that shouldn't be reformatted
    indent_scripts (default normal)  - "keep"|"separate"|"normal"

    e.g.

    style_html(html_source, {
      'indent_size': 2,
      'indent_char': ' ',
      'max_char': 78,
      'brace_style': 'expand',
      'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u']
    });
*/

function style_html(html_source, options) {
//Wrapper function to invoke all the necessary constructors and deal with the output.

  var multi_parser,
      indent_size,
      indent_character,
      max_char,
      brace_style,
      unformatted;

  options = options || {};
  indent_size = options.indent_size || 4;
  indent_character = options.indent_char || ' ';
  brace_style = options.brace_style || 'collapse';
  max_char = options.max_char == 0 ? Infinity : options.max_char || 70;
  unformatted = options.unformatted || ['a', 'span', 'bdo', 'em', 'strong', 'dfn', 'code', 'samp', 'kbd', 'var', 'cite', 'abbr', 'acronym', 'q', 'sub', 'sup', 'tt', 'i', 'b', 'big', 'small', 'u', 's', 'strike', 'font', 'ins', 'del', 'pre', 'address', 'dt', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

  function Parser() {

    this.pos = 0; //Parser position
    this.token = '';
    this.current_mode = 'CONTENT'; //reflects the current Parser mode: TAG/CONTENT
    this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
      parent: 'parent1',
      parentcount: 1,
      parent1: ''
    };
    this.tag_type = '';
    this.token_text = this.last_token = this.last_text = this.token_type = '';

    this.Utils = { //Uilities made available to the various functions
      whitespace: "\n\r\t ".split(''),
      single_token: 'br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed,?php,?,?='.split(','), //all the single tags for HTML
      extra_liners: 'head,body,/html'.split(','), //for tags that need a line of whitespace before them
      in_array: function (what, arr) {
        for (var i=0; i<arr.length; i++) {
          if (what === arr[i]) {
            return true;
          }
        }
        return false;
      }
    }

    this.get_content = function () { //function to capture regular content between tags

      var input_char = '',
          content = [],
          space = false; //if a space is needed

      while (this.input.charAt(this.pos) !== '<') {
        if (this.pos >= this.input.length) {
          return content.length?content.join(''):['', 'TK_EOF'];
        }

        input_char = this.input.charAt(this.pos);
        this.pos++;
        this.line_char_count++;

        if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
          if (content.length) {
            space = true;
          }
          this.line_char_count--;
          continue; //don't want to insert unnecessary space
        }
        else if (space) {
          if (this.line_char_count >= this.max_char) { //insert a line when the max_char is reached
            content.push('\n');
            for (var i=0; i<this.indent_level; i++) {
              content.push(this.indent_string);
            }
            this.line_char_count = 0;
          }
          else{
            content.push(' ');
            this.line_char_count++;
          }
          space = false;
        }
        content.push(input_char); //letter at-a-time (or string) inserted to an array
      }
      return content.length?content.join(''):'';
    }

    this.get_contents_to = function (name) { //get the full content of a script or style to pass to js_beautify
      if (this.pos == this.input.length) {
        return ['', 'TK_EOF'];
      }
      var input_char = '';
      var content = '';
      var reg_match = new RegExp('\<\/' + name + '\\s*\>', 'igm');
      reg_match.lastIndex = this.pos;
      var reg_array = reg_match.exec(this.input);
      var end_script = reg_array?reg_array.index:this.input.length; //absolute end of script
      if(this.pos < end_script) { //get everything in between the script tags
        content = this.input.substring(this.pos, end_script);
        this.pos = end_script;
      }
      return content;
    }

    this.record_tag = function (tag){ //function to record a tag and its parent in this.tags Object
      if (this.tags[tag + 'count']) { //check for the existence of this tag type
        this.tags[tag + 'count']++;
        this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
      }
      else { //otherwise initialize this tag type
        this.tags[tag + 'count'] = 1;
        this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
      }
      this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent; //set the parent (i.e. in the case of a div this.tags.div1parent)
      this.tags.parent = tag + this.tags[tag + 'count']; //and make this the current parent (i.e. in the case of a div 'div1')
    }

    this.retrieve_tag = function (tag) { //function to retrieve the opening tag to the corresponding closer
      if (this.tags[tag + 'count']) { //if the openener is not in the Object we ignore it
        var temp_parent = this.tags.parent; //check to see if it's a closable tag.
        while (temp_parent) { //till we reach '' (the initial value);
          if (tag + this.tags[tag + 'count'] === temp_parent) { //if this is it use it
            break;
          }
          temp_parent = this.tags[temp_parent + 'parent']; //otherwise keep on climbing up the DOM Tree
        }
        if (temp_parent) { //if we caught something
          this.indent_level = this.tags[tag + this.tags[tag + 'count']]; //set the indent_level accordingly
          this.tags.parent = this.tags[temp_parent + 'parent']; //and set the current parent
        }
        delete this.tags[tag + this.tags[tag + 'count'] + 'parent']; //delete the closed tags parent reference...
        delete this.tags[tag + this.tags[tag + 'count']]; //...and the tag itself
        if (this.tags[tag + 'count'] == 1) {
          delete this.tags[tag + 'count'];
        }
        else {
          this.tags[tag + 'count']--;
        }
      }
    }

    this.get_tag = function () { //function to get a full tag and parse its type
      var input_char = '',
          content = [],
          space = false,
          tag_start, tag_end;

      do {
        if (this.pos >= this.input.length) {
          return content.length?content.join(''):['', 'TK_EOF'];
        }

        input_char = this.input.charAt(this.pos);
        this.pos++;
        this.line_char_count++;

        if (this.Utils.in_array(input_char, this.Utils.whitespace)) { //don't want to insert unnecessary space
          space = true;
          this.line_char_count--;
          continue;
        }

        if (input_char === "'" || input_char === '"') {
          if (!content[1] || content[1] !== '!') { //if we're in a comment strings don't get treated specially
            input_char += this.get_unformatted(input_char);
            space = true;
          }
        }

        if (input_char === '=') { //no space before =
          space = false;
        }

        if (content.length && content[content.length-1] !== '=' && input_char !== '>'
            && space) { //no space after = or before >
          if (this.line_char_count >= this.max_char) {
            this.print_newline(false, content);
            this.line_char_count = 0;
          }
          else {
            content.push(' ');
            this.line_char_count++;
          }
          space = false;
        }
        if (input_char === '<') {
            tag_start = this.pos - 1;
        }
        content.push(input_char); //inserts character at-a-time (or string)
      } while (input_char !== '>');

      var tag_complete = content.join('');
      var tag_index;
      if (tag_complete.indexOf(' ') != -1) { //if there's whitespace, thats where the tag name ends
        tag_index = tag_complete.indexOf(' ');
      }
      else { //otherwise go with the tag ending
        tag_index = tag_complete.indexOf('>');
      }
      var tag_check = tag_complete.substring(1, tag_index).toLowerCase();
      if (tag_complete.charAt(tag_complete.length-2) === '/' ||
          this.Utils.in_array(tag_check, this.Utils.single_token)) { //if this tag name is a single tag type (either in the list or has a closing /)
        this.tag_type = 'SINGLE';
      }
      else if (tag_check === 'script') { //for later script handling
        this.record_tag(tag_check);
        this.tag_type = 'SCRIPT';
      }
      else if (tag_check === 'style') { //for future style handling (for now it justs uses get_content)
        this.record_tag(tag_check);
        this.tag_type = 'STYLE';
      }
      else if (this.Utils.in_array(tag_check, unformatted)) { // do not reformat the "unformatted" tags
        var comment = this.get_unformatted('</'+tag_check+'>', tag_complete); //...delegate to get_unformatted function
        content.push(comment);
        // Preserve collapsed whitespace either before or after this tag.
        if (tag_start > 0 && this.Utils.in_array(this.input.charAt(tag_start - 1), this.Utils.whitespace)){
            content.splice(0, 0, this.input.charAt(tag_start - 1));
        }
        tag_end = this.pos - 1;
        if (this.Utils.in_array(this.input.charAt(tag_end + 1), this.Utils.whitespace)){
            content.push(this.input.charAt(tag_end + 1));
        }
        this.tag_type = 'SINGLE';
      }
      else if (tag_check.charAt(0) === '!') { //peek for <!-- comment
        if (tag_check.indexOf('[if') != -1) { //peek for <!--[if conditional comment
          if (tag_complete.indexOf('!IE') != -1) { //this type needs a closing --> so...
            var comment = this.get_unformatted('-->', tag_complete); //...delegate to get_unformatted
            content.push(comment);
          }
          this.tag_type = 'START';
        }
        else if (tag_check.indexOf('[endif') != -1) {//peek for <!--[endif end conditional comment
          this.tag_type = 'END';
          this.unindent();
        }
        else if (tag_check.indexOf('[cdata[') != -1) { //if it's a <[cdata[ comment...
          var comment = this.get_unformatted(']]>', tag_complete); //...delegate to get_unformatted function
          content.push(comment);
          this.tag_type = 'SINGLE'; //<![CDATA[ comments are treated like single tags
        }
        else {
          var comment = this.get_unformatted('-->', tag_complete);
          content.push(comment);
          this.tag_type = 'SINGLE';
        }
      }
      else {
        if (tag_check.charAt(0) === '/') { //this tag is a double tag so check for tag-ending
          this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
          this.tag_type = 'END';
        }
        else { //otherwise it's a start-tag
          this.record_tag(tag_check); //push it on the tag stack
          this.tag_type = 'START';
        }
        if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) { //check if this double needs an extra line
          this.print_newline(true, this.output);
        }
      }
      return content.join(''); //returns fully formatted tag
    }

    this.get_unformatted = function (delimiter, orig_tag) { //function to return unformatted content in its entirety

      if (orig_tag && orig_tag.toLowerCase().indexOf(delimiter) != -1) {
        return '';
      }
      var input_char = '';
      var content = '';
      var space = true;
      do {

        if (this.pos >= this.input.length) {
          return content;
        }

        input_char = this.input.charAt(this.pos);
        this.pos++

        if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
          if (!space) {
            this.line_char_count--;
            continue;
          }
          if (input_char === '\n' || input_char === '\r') {
            content += '\n';
            /*  Don't change tab indention for unformatted blocks.  If using code for html editing, this will greatly affect <pre> tags if they are specified in the 'unformatted array'
            for (var i=0; i<this.indent_level; i++) {
              content += this.indent_string;
            }
            space = false; //...and make sure other indentation is erased
            */
            this.line_char_count = 0;
            continue;
          }
        }
        content += input_char;
        this.line_char_count++;
        space = true;


      } while (content.toLowerCase().indexOf(delimiter) == -1);
      return content;
    }

    this.get_token = function () { //initial handler for token-retrieval
      var token;

      if (this.last_token === 'TK_TAG_SCRIPT' || this.last_token === 'TK_TAG_STYLE') { //check if we need to format javascript
       var type = this.last_token.substr(7)
       token = this.get_contents_to(type);
        if (typeof token !== 'string') {
          return token;
        }
        return [token, 'TK_' + type];
      }
      if (this.current_mode === 'CONTENT') {
        token = this.get_content();
        if (typeof token !== 'string') {
          return token;
        }
        else {
          return [token, 'TK_CONTENT'];
        }
      }

      if (this.current_mode === 'TAG') {
        token = this.get_tag();
        if (typeof token !== 'string') {
          return token;
        }
        else {
          var tag_name_type = 'TK_TAG_' + this.tag_type;
          return [token, tag_name_type];
        }
      }
    }

    this.get_full_indent = function (level) {
      level = this.indent_level + level || 0;
      if (level < 1)
        return '';

      return Array(level + 1).join(this.indent_string);
    }


    this.printer = function (js_source, indent_character, indent_size, max_char, brace_style) { //handles input/output and some other printing functions

      this.input = js_source || ''; //gets the input for the Parser
      this.output = [];
      this.indent_character = indent_character;
      this.indent_string = '';
      this.indent_size = indent_size;
      this.brace_style = brace_style;
      this.indent_level = 0;
      this.max_char = max_char;
      this.line_char_count = 0; //count to see if max_char was exceeded

      for (var i=0; i<this.indent_size; i++) {
        this.indent_string += this.indent_character;
      }

      this.print_newline = function (ignore, arr) {
        this.line_char_count = 0;
        if (!arr || !arr.length) {
          return;
        }
        if (!ignore) { //we might want the extra line
          while (this.Utils.in_array(arr[arr.length-1], this.Utils.whitespace)) {
            arr.pop();
          }
        }
        arr.push('\n');
        for (var i=0; i<this.indent_level; i++) {
          arr.push(this.indent_string);
        }
      }

      this.print_token = function (text) {
        this.output.push(text);
      }

      this.indent = function () {
        this.indent_level++;
      }

      this.unindent = function () {
        if (this.indent_level > 0) {
          this.indent_level--;
        }
      }
    }
    return this;
  }

  /*_____________________--------------------_____________________*/

  multi_parser = new Parser(); //wrapping functions Parser
  multi_parser.printer(html_source, indent_character, indent_size, max_char, brace_style); //initialize starting values

  while (true) {
      var t = multi_parser.get_token();
      multi_parser.token_text = t[0];
      multi_parser.token_type = t[1];

    if (multi_parser.token_type === 'TK_EOF') {
      break;
    }

    switch (multi_parser.token_type) {
      case 'TK_TAG_START':
        multi_parser.print_newline(false, multi_parser.output);
        multi_parser.print_token(multi_parser.token_text);
        multi_parser.indent();
        multi_parser.current_mode = 'CONTENT';
        break;
      case 'TK_TAG_STYLE':
      case 'TK_TAG_SCRIPT':
        multi_parser.print_newline(false, multi_parser.output);
        multi_parser.print_token(multi_parser.token_text);
        multi_parser.current_mode = 'CONTENT';
        break;
      case 'TK_TAG_END':
        //Print new line only if the tag has no content and has child
        if (multi_parser.last_token === 'TK_CONTENT' && multi_parser.last_text === '') {
            var tag_name = multi_parser.token_text.match(/\w+/)[0];
            var tag_extracted_from_last_output = multi_parser.output[multi_parser.output.length -1].match(/<\s*(\w+)/);
            if (tag_extracted_from_last_output === null || tag_extracted_from_last_output[1] !== tag_name)
                multi_parser.print_newline(true, multi_parser.output);
        }
        multi_parser.print_token(multi_parser.token_text);
        multi_parser.current_mode = 'CONTENT';
        break;
      case 'TK_TAG_SINGLE':
        // Don't add a newline before elements that should remain unformatted.
        var tag_check = multi_parser.token_text.match(/^\s*<([a-z]+)/i);
        if (!tag_check || !multi_parser.Utils.in_array(tag_check[1], unformatted)){
            multi_parser.print_newline(false, multi_parser.output);
        }
        multi_parser.print_token(multi_parser.token_text);
        multi_parser.current_mode = 'CONTENT';
        break;
      case 'TK_CONTENT':
        if (multi_parser.token_text !== '') {
          multi_parser.print_token(multi_parser.token_text);
        }
        multi_parser.current_mode = 'TAG';
        break;
      case 'TK_STYLE':
      case 'TK_SCRIPT':
        if (multi_parser.token_text !== '') {
          multi_parser.output.push('\n');
          var text = multi_parser.token_text;
          if (multi_parser.token_type == 'TK_SCRIPT') {
            var _beautifier = typeof js_beautify == 'function' && js_beautify;
          } else if (multi_parser.token_type == 'TK_STYLE') {
            var _beautifier = typeof css_beautify == 'function' && css_beautify;
          }

          if (options.indent_scripts == "keep") {
            var script_indent_level = 0;
          } else if (options.indent_scripts == "separate") {
            var script_indent_level = -multi_parser.indent_level;
          } else {
            var script_indent_level = 1;
          }

          var indentation = multi_parser.get_full_indent(script_indent_level);
          if (_beautifier) {
            // call the Beautifier if avaliable
            text = _beautifier(text.replace(/^\s*/, indentation), options);
          } else {
            // simply indent the string otherwise
            var white = text.match(/^\s*/)[0];
            var _level = white.match(/[^\n\r]*$/)[0].split(multi_parser.indent_string).length - 1;
            var reindent = multi_parser.get_full_indent(script_indent_level -_level);
            text = text.replace(/^\s*/, indentation)
                   .replace(/\r\n|\r|\n/g, '\n' + reindent)
                   .replace(/\s*$/, '');
          }
          if (text) {
            multi_parser.print_token(text);
            multi_parser.print_newline(true, multi_parser.output);
          }
        }
        multi_parser.current_mode = 'TAG';
        break;
    }
    multi_parser.last_token = multi_parser.token_type;
    multi_parser.last_text = multi_parser.token_text;
  }
  return multi_parser.output.join('');
}

module.exports = {
  prettyPrint: style_html
};

/***/ })
/******/ ]);