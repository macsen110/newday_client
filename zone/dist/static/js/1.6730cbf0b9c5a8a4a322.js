(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var xhr = function () {
	function xhr(opt) {
		_classCallCheck(this, xhr);

		this.method = 'GET';
		this.aysc = true;
		this.sendData = null;
		this.cache = true;
		if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) === 'object') {
			Object.assign(this, opt);
		}
		this.url = "https://www.macsen318.com" + this.url;
		this.send();
	}

	_createClass(xhr, [{
		key: 'send',
		value: function send() {
			var _xhr = new XMLHttpRequest();
			_xhr.timeout = 60000;
			this.withCredentials && (_xhr.withCredentials = true);
			_xhr.withCredentials = true;
			_xhr.open(this.method, this.url, this.aysc);

			if (this.setHeader) {
				_xhr.setRequestHeader("Content-Type", this.setHeader);
			}
			if (!this.cache) {
				_xhr.setRequestHeader("Pragma", "no-cache");
				_xhr.setRequestHeader("Cache-Control", "no-cache");
			}

			_xhr.onload = function () {
				if (_xhr.readyState === 4) {
					if (_xhr.status === 200) {
						var sucData;
						if (_xhr.response) {
							sucData = JSON.parse(_xhr.response);
						}
						this.done(sucData);
					} else {
						var error = new Error("something went wrong");
						this.faild(error);
					}
				}
			}.bind(this);
			_xhr.onerror = function (error) {
				this.faild(error);
			}.bind(this);
			_xhr.send(this.sendData);
		}
	}, {
		key: 'done',
		value: function done(data) {}
	}, {
		key: 'faild',
		value: function faild() {}
	}]);

	return xhr;
}();

/* harmony default export */ __webpack_exports__["a"] = (xhr);

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (win, factory) {
		if (( false ? undefined : _typeof(exports)) === 'object') {
				module.exports = factory();
		} else if (true) {
				!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {}
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
		function _TabWidget(args) {
				if (args && "object" == (typeof args === 'undefined' ? 'undefined' : _typeof(args))) {
						for (var arg in args) {
								this[arg] = args[arg];
						}
				}
				this.tabNavContainer = this.tabNavContainer || document.querySelector('.tab-nav-container');
				this.tabConContainer = this.tabConContainer || document.querySelector('.tab-con-container');
				this.tabNavContainer && (this.tabNavItems = this.tabNavItems || this.tabNavContainer.children);
				this.tabConContainer && (this.tabConItems = this.tabConItems || this.tabConContainer.children);
				this.curIdex = this.curIdex || 0;
				this.init();
		}

		_TabWidget.prototype = {
				constructor: _TabWidget,
				init: function init() {
						var self = this;
						self.change(this.curIdex);
						if (self.tabNavItems) {
								[].forEach.call(self.tabNavItems, function (item, index) {
										item.addEventListener('click', function () {
												self.change(index);
										});
								});
						}
				},
				change: function change(index) {
						var self = this;
						self.curIdex = index;
						if (self.tabNavItems) {
								[].forEach.call(self.tabNavItems, function (item, i) {
										if (i !== index) {
												item.classList.remove('on');
												self.tabConItems[i].classList.remove('on');
										} else {
												item.classList.add('on');
												self.tabConItems[i].classList.add('on');
										}
								});
						} else {
								[].forEach.call(self.tabConItems, function (item, i) {
										if (i !== index) item.classList.remove('on');else item.classList.add('on');
								});
						}
						if (self.callback) self.callback(index);
				}
				/***
     * *dialog 页面弹框组件
     * *
     * *****/
				//弹框
		};function _Dialog(options) {
				this.title = null;
				this.content = null;
				this.foot = null;
				this.canMaskClose = true;
				this.className = '';
				this.type = 'dialog';
				this.container = document.createElement('div');
				this.isMask = true;
				this.config(options);
				this.mask = this.isMask ? '<div class="dialog-mask-bg"></div>' : '';
				this.open();
				return this;
		}
		_Dialog.prototype = {
				constructor: _Dialog,
				config: function config(options) {
						if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
								for (var i in options) {
										this[i] = options[i];
								}
						}
						return this;
				},
				handleEvent: function handleEvent(e) {
						var target = e.target;
						var classList = target.classList;

						//点击遮罩层,不做任何事情,直接摧毁弹框
						if (classList.contains('dialog-mask-bg')) {
								this.canMaskClose ? this.maskAction ? this.maskAction() : this.close() : null;
								return;
						}
						//点击确定按钮
						if (classList.contains('btn-dialog-ok')) {
								this.afterOk();
								return;
						}
						//点击取消按钮,或者关闭的图标
						if (classList.contains('btn-dialog-cancel') || classList.contains('icon-dialog-cancel')) {
								this.close();
						}
				},
				open: function open() {
						this.container.className = "widget-dialog " + this.className;
						this.title = this.title ? '<div class="title">' + this.title + '</div>' : '';
						this.content = this.content ? '<div class="content">' + this.content + '</div>' : '';
						this.foot = this.foot ? '<div class="foot">' + this.foot + '</div>' : '';
						this.main = this.title + this.content + this.foot;
						this.container.innerHTML = '<div class="main">' + this.main + '</div>' + this.mask;
						var body = document.body;
						var self = this;
						body.appendChild(this.container);
						//remeber do not write like this
						//this.container.addEventLister('click', this.close) 
						//this replay for the current object in the event callback functions

						this.afterOpen();

						this.container.addEventListener('click', this);
				},
				afterOpen: function afterOpen() {
						//do something after the dialog open;
				},
				afterOk: function afterOk() {
						//default event is destory;
						this.destory();
				},
				close: function close() {
						this.afterClose();
						this.destory();
				},
				afterClose: function afterClose() {
						//do something after the dialog close;
				},
				destory: function destory() {
						var body = document.body;
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
		function _easyMove(element, options) {
				var isTouch = 'ontouchstart' in window;
				if (!element) return null;
				this.element = element;
				this.parentEle = options.parentEle || this.element;
				this.child = element.children[0]; //选取一个子元素,以便可以随时获取其宽度
				this.length = element.children.length;
				this.focusIndex = options.focusIndex || 0;
				this.index = options.index || 0; //初始选中元素序号
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
				this.distance = options.distance; //自定义滑动距离,
				if (this.parentEle.addEventListener) {
						this.parentEle.addEventListener(isTouch ? 'touchstart' : 'mousedown', this, false);
						this.element.addEventListener('webkitTransitionEnd', this, false);
						this.element.addEventListener('transitionend', this, false);
				}
				//判断横向还是竖向滑动,设置相应的宽或高
				if (this.orientation == 1) {
						this.childWidth = options.childWidth || this.child.clientWidth;
						this.parentWidth = options.parentWidth || this.childWidth * this.length;
				} else {
						this.childHeight = options.childHeight || this.child.clientHeight;
						this.parentHeight = options.parentHeight || this.childHeight * this.length;
				}
				this.init();
		}
		_easyMove.prototype = {
				constructor: _easyMove,
				init: function init() {
						var self = this;
						//设置item和container的宽度
						[].forEach.call(self.element.children, function (item) {
								if (self.orientation == 1) item.style.width = self.childWidth + 'px';else item.style.height = self.childHeight + 'px';
						});
						if (self.orientation == 1) self.element.style.width = self.parentWidth + 'px';else self.element.style.height = self.parentHeight + 'px';

						if (self.orientation == 1) self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(' + -(self.index - self.focusIndex) * self.childWidth + 'px,0,0)';
						if (self.orientation == 2) self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(0,' + -(self.index - self.focusIndex) * self.childHeight + 'px,0)';
						self.move(self.index);
				},
				handleEvent: function handleEvent(e) {
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
				onTouchStart: function onTouchStart(e) {
						var self = this;
						self.start = {
								pageX: e.touches[0].pageX,
								pageY: e.touches[0].pageY
						};
						//将动画时间设为0，以便在按下时马上结束尚在进行的动画
						self.element.style.webkitTransition = "-webkit-transform 0ms";
				},
				onTouchMove: function onTouchMove(e) {
						var self = this;

						//若有多个touch或者被缩放则不滑动		
						if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
						self.deltaX = e.touches[0].pageX - self.start.pageX;
						self.deltaY = e.touches[0].pageY - self.start.pageY;
						//判断滑动方向
						//横向
						if (self.orientation == 1 && Math.abs(self.deltaX) > Math.abs(self.deltaY)) {
								e.preventDefault();
								if (!self.hasMoved) self.touchMoveCb && self.touchMoveCb(self.index);
								self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(' + (self.deltaX - (self.index - self.focusIndex) * self.childWidth) + 'px,0,0)';
						}
						//纵向
						if (self.orientation == 2 && Math.abs(self.deltaY) > Math.abs(self.deltaX)) {
								e.preventDefault();
								if (!self.hasMoved) self.touchMoveCb && self.touchMoveCb(self.index);
								self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(0,' + (self.deltaY - (self.index - self.focusIndex) * self.childHeight) + 'px,0)';
						}
						self.hasMoved = true;
				},
				onTouchEnd: function onTouchEnd(e) {
						var self = this;
						if (!self.hasMoved) {
								if (self.orientation == 1) self.deltaX = 0; //若没有滑动过，重置值
								if (self.orientation == 2) self.deltaY = 0;
						}
						self.hasMoved = false;
						//矫正位置到最贴近目标处
						if (self.orientation == 1) {
								var width = self.childWidth;
								var targetIndex;
								if (self.distance) {
										var remainderDistance = self.deltaX - parseInt(self.deltaX / width) * width;
										if (remainderDistance > 0) {
												targetIndex = self.index - (parseInt(self.deltaX / width) + (remainderDistance - self.distance > 0 ? 1 : 0));
										} else {
												targetIndex = self.index - (parseInt(self.deltaX / width) + (Math.abs(remainderDistance) - self.distance > 0 ? -1 : 0));
										}
								} else targetIndex = self.index - Math.round(self.deltaX / width);
						}
						if (self.orientation == 2) {
								var height = self.childHeight;
								var targetIndex;
								if (self.distance) {
										var remainderDistance = self.deltaY - parseInt(self.deltaY / height) * height;
										if (remainderDistance > 0) {
												targetIndex = self.index - (parseInt(self.deltaY / height) + (remainderDistance - self.distance > 0 ? 1 : 0));
										} else {
												targetIndex = self.index - (parseInt(self.deltaY / height) + (Math.abs(remainderDistance) - self.distance > 0 ? -1 : 0));
										}
								} else targetIndex = self.index - Math.round(self.deltaY / height);
						}

						targetIndex = self.limitIndex(targetIndex);
						self.autoMove(targetIndex);
						if (self.callback) {
								var choseId = self.index + self.offset;
								self.callback(self.index);
						}
				},
				transitionEnd: function transitionEnd(e) {
						var self = this;
				},
				autoMove: function autoMove(targetIndex) {
						var self = this;
						var style = this.element.style;
						//var width = self.childWidth;
						style.webkitTransition = "-webkit-transform " + self.speed + "ms";
						if (self.orientation == 1) style.MozTransform = style.webkitTransform = 'translate3d(' + -targetIndex * self.childWidth + 'px,0,0)';
						if (self.orientation == 2) style.MozTransform = style.webkitTransform = 'translate3d(0,' + -targetIndex * self.childHeight + 'px,0)';
						self.index = targetIndex + self.focusIndex;
				},
				move: function move(targetIndex) {
						var self = this;
						targetIndex -= self.offset;
						targetIndex = self.limitIndex(targetIndex);
						var style = this.element.style;
						style.webkitTransition = "-webkit-transform " + self.speed + "ms";
						if (self.orientation == 1) style.MozTransform = style.webkitTransform = 'translate3d(' + -targetIndex * self.childWidth + 'px,0,0)';
						if (self.orientation == 2) style.MozTransform = style.webkitTransform = 'translate3d(0,' + -targetIndex * self.childHeight + 'px,0)';
						self.index = targetIndex + self.focusIndex;
						if (self.callback) self.callback(self.index);
				},
				limitIndex: function limitIndex(targetIndex) {
						var self = this;
						if (!self.limitBorder) {
								if (targetIndex < -self.offset) targetIndex = -self.offset;else if (targetIndex > self.length - 1 - self.offset) targetIndex = self.length - 1 - self.offset;
						} else {
								if (targetIndex < 0) targetIndex = 0;else if (targetIndex > self.length - self.showNum + self.focusIndex) targetIndex = self.length - (self.showNum - self.focusIndex);
						}
						return targetIndex - self.focusIndex;
				}
		};

		function _showPrompt(args) {
				if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object') {
						Object.keys(args).forEach(function (key) {
								this[key] = args[key];
						}.bind(this));
				}
				if (typeof args === 'string' || typeof args === 'number') this.msg = args;
				this.init();
		}
		_showPrompt.prototype = {
				constructor: _showPrompt,
				init: function init() {
						this._container = document.querySelector('.widget-prompt');
						if (this._container) {
								this.destory();
						}
						this.open();
				},
				open: function open() {
						this._container = document.createElement('div');
						this._container.className = this.className ? this.className + ' widget-prompt' : 'widget-prompt';
						this._container.innerHTML = this.msg;
						document.body.appendChild(this._container);
						this.promptTimer = setTimeout(function () {
								this.destory();
								if (this.cb) this.cb();
						}.bind(this), 3000);
				},
				destory: function destory() {
						this._container.parentNode.removeChild(this._container);
						this._container = null;
				}
		};

		function _Loading(args) {
				if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object') {
						Object.keys(args).forEach(function (key) {
								this[key] = args[key];
						}.bind(this));
				}
				var tpl = '<div class="mask"></div>' + '<div class="spinner"></div>';

				this.html = this.html || tpl;
				return this;
		}
		_Loading.prototype = {
				constructor: _Loading,
				start: function start() {
						if (!this._container) {
								this._container = document.createElement('div');
								this._container.innerHTML = this.html;
								this._container.className = this.className ? this.className + ' widget-loading' : 'widget-loading';
								document.body.appendChild(this._container);
						}
						this._container.style.display = 'block';
				},
				end: function end() {
						this._container && (this._container.style.display = 'none');
				}
		};
		return {
				TabWidget: function TabWidget(args) {
						return new _TabWidget(args);
				},
				Dialog: function Dialog(args) {
						return new _Dialog(args);
				},
				easyMove: function easyMove(dom, args) {
						return new _easyMove(dom, args);
				},
				showPrompt: function showPrompt(args) {
						return new _showPrompt(args);
				},
				Loading: function Loading(args) {
						return new _Loading(args);
				}
		};
});

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_xhr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _actions_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var yao_m_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3);
/* harmony import */ var yao_m_ui__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(yao_m_ui__WEBPACK_IMPORTED_MODULE_5__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







function Example() {
    // Declare a new state variable, which we'll call "count"
    var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
        _useState2 = _slicedToArray(_useState, 2),
        count = _useState2[0],
        setCount = _useState2[1];

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'div',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'p',
            null,
            'You clicked ',
            count,
            ' times'
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'button',
            { onClick: function onClick() {
                    return setCount(count + 1);
                } },
            'Click me'
        )
    );
}

var Login = function (_React$Component) {
    _inherits(Login, _React$Component);

    //static contextTypes = Object.assign({},{history: PropTypes.history});

    function Login(props, context) {
        _classCallCheck(this, Login);

        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props, context));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(Login, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            var form = this.refs.registerForm;
            if (!form['username'].value) {
                Object(yao_m_ui__WEBPACK_IMPORTED_MODULE_5__["showPrompt"])('请填写用户名!');
                return false;
            }
            if (!form['password'].value) {
                Object(yao_m_ui__WEBPACK_IMPORTED_MODULE_5__["showPrompt"])('请填写密码');
                return false;
            }
            var senddata = JSON.stringify({
                username: form['username'].value,
                password: form['password'].value,
                test: null
            });

            var url = form.action;
            var promise = new Promise(function (resolve, reject) {
                new _utils_xhr__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]({
                    setHeader: 'application/json',
                    sendData: senddata,
                    method: 'POST',
                    url: '/api/users/validuser',
                    done: function done(callData) {
                        resolve(callData);
                    },
                    faild: function faild() {
                        var error = new Error('something wrong');
                        reject(error);
                    }

                });
            });
            promise.then(function (obj) {
                if (obj.code == 0) {
                    Object(yao_m_ui__WEBPACK_IMPORTED_MODULE_5__["showPrompt"])({
                        msg: obj.msg,
                        cb: function cb() {
                            _this2.props.initAction({
                                isLogin: obj.isLogin,
                                user: obj.user
                            });
                            _this2.props.history.push({ pathname: '/goods/upload' });
                        }
                    });
                } else Object(yao_m_ui__WEBPACK_IMPORTED_MODULE_5__["showPrompt"])(obj.msg);
            }, function (error) {
                return console.log(error);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'div',
                { id: 'register_page', className: 'app-register-page' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    'p',
                    { className: 'page-title' },
                    '\u767B\u5F55'
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    'form',
                    { method: 'post', action: '/api/users/validuser', className: 'form1', ref: 'registerForm', onSubmit: this.handleSubmit },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        'p',
                        { className: 'pt20' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { type: 'text', name: 'username', className: 'ipt', placeholder: '\u7528\u6237\u540D' })
                    ),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        'p',
                        { className: 'pt20' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { type: 'password', name: 'password', className: 'ipt', placeholder: '\u5BC6\u7801' })
                    ),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        'p',
                        { className: 'pt20' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { type: 'submit', className: 'btn' })
                    ),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        'p',
                        { className: 'pt10' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            react_router_dom__WEBPACK_IMPORTED_MODULE_2__[/* Link */ "b"],
                            { to: '/user/register' },
                            '\u6CE8\u518C'
                        )
                    )
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Example, null)
            );
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.location !== this.props.location) {
                // navigated!
            }
        }
    }]);

    return Login;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[/* connect */ "b"])(null, { initAction: _actions_actions__WEBPACK_IMPORTED_MODULE_4__[/* initAction */ "j"] })(Login));

/***/ })

}]);
//# sourceMappingURL=1.6730cbf0b9c5a8a4a322.js.map