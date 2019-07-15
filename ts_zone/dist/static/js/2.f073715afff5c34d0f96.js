(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);




var xhr =
/*#__PURE__*/
function () {
  function xhr(opt) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, xhr);

    this.method = 'GET';
    this.aysc = true;
    this.sendData = null;
    this.cache = true;

    if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(opt) === 'object') {
      Object.assign(this, opt);
    }

    this.url = "https://www.macsen318.com" + this.url;
    this.send();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(xhr, [{
    key: "send",
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
    key: "done",
    value: function done(data) {}
  }, {
    key: "faild",
    value: function faild() {}
  }]);

  return xhr;
}();

/* harmony default export */ __webpack_exports__["default"] = (xhr);

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

(function (win, factory) {
  if (true) {
    module.exports = factory();
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
  function TabWidget(args) {
    if (args && "object" == typeof args) {
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

  TabWidget.prototype = {
    constructor: TabWidget,
    init: function () {
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
    change: function (index) {
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

  };

  function Dialog(options) {
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

  Dialog.prototype = {
    constructor: Dialog,
    config: function (options) {
      if (typeof options === 'object') {
        for (var i in options) {
          this[i] = options[i];
        }
      }

      return this;
    },
    handleEvent: function (e) {
      var target = e.target;
      var classList = target.classList; //点击遮罩层,不做任何事情,直接摧毁弹框

      if (classList.contains('dialog-mask-bg')) {
        this.canMaskClose ? this.maskAction ? this.maskAction() : this.close() : null;
        return;
      } //点击确定按钮


      if (classList.contains('btn-dialog-ok')) {
        this.afterOk();
        return;
      } //点击取消按钮,或者关闭的图标


      if (classList.contains('btn-dialog-cancel') || classList.contains('icon-dialog-cancel')) {
        this.close();
      }
    },
    open: function () {
      this.container.className = "widget-dialog " + this.className;
      this.title = this.title ? '<div class="title">' + this.title + '</div>' : '';
      this.content = this.content ? '<div class="content">' + this.content + '</div>' : '';
      this.foot = this.foot ? '<div class="foot">' + this.foot + '</div>' : '';
      this.main = this.title + this.content + this.foot;
      this.container.innerHTML = '<div class="main">' + this.main + '</div>' + this.mask;
      var body = document.body;
      var self = this;
      body.appendChild(this.container); //remeber do not write like this
      //this.container.addEventLister('click', this.close) 
      //this replay for the current object in the event callback functions

      this.afterOpen();
      this.container.addEventListener('click', this);
    },
    afterOpen: function () {//do something after the dialog open;
    },
    afterOk: function () {
      //default event is destory;
      this.destory();
    },
    close: function () {
      this.afterClose();
      this.destory();
    },
    afterClose: function () {//do something after the dialog close;
    },
    destory: function () {
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

  function easyMove(element, options) {
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
    } //判断横向还是竖向滑动,设置相应的宽或高


    if (this.orientation == 1) {
      this.childWidth = options.childWidth || this.child.clientWidth;
      this.parentWidth = options.parentWidth || this.childWidth * this.length;
    } else {
      this.childHeight = options.childHeight || this.child.clientHeight;
      this.parentHeight = options.parentHeight || this.childHeight * this.length;
    }

    this.init();
  }

  easyMove.prototype = {
    constructor: easyMove,
    init: function () {
      var self = this; //设置item和container的宽度

      [].forEach.call(self.element.children, function (item) {
        if (self.orientation == 1) item.style.width = self.childWidth + 'px';else item.style.height = self.childHeight + 'px';
      });
      if (self.orientation == 1) self.element.style.width = self.parentWidth + 'px';else self.element.style.height = self.parentHeight + 'px';
      if (self.orientation == 1) self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(' + -(self.index - self.focusIndex) * self.childWidth + 'px,0,0)';
      if (self.orientation == 2) self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(0,' + -(self.index - self.focusIndex) * self.childHeight + 'px,0)';
      self.move(self.index);
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
      self.start = {
        pageX: e.touches[0].pageX,
        pageY: e.touches[0].pageY
      }; //将动画时间设为0，以便在按下时马上结束尚在进行的动画

      self.element.style.webkitTransition = "-webkit-transform 0ms";
    },
    onTouchMove: function (e) {
      var self = this; //若有多个touch或者被缩放则不滑动		

      if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
      self.deltaX = e.touches[0].pageX - self.start.pageX;
      self.deltaY = e.touches[0].pageY - self.start.pageY; //判断滑动方向
      //横向

      if (self.orientation == 1 && Math.abs(self.deltaX) > Math.abs(self.deltaY)) {
        e.preventDefault();
        if (!self.hasMoved) self.touchMoveCb && self.touchMoveCb(self.index);
        self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(' + (self.deltaX - (self.index - self.focusIndex) * self.childWidth) + 'px,0,0)';
      } //纵向


      if (self.orientation == 2 && Math.abs(self.deltaY) > Math.abs(self.deltaX)) {
        e.preventDefault();
        if (!self.hasMoved) self.touchMoveCb && self.touchMoveCb(self.index);
        self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(0,' + (self.deltaY - (self.index - self.focusIndex) * self.childHeight) + 'px,0)';
      }

      self.hasMoved = true;
    },
    onTouchEnd: function (e) {
      var self = this;

      if (!self.hasMoved) {
        if (self.orientation == 1) self.deltaX = 0; //若没有滑动过，重置值

        if (self.orientation == 2) self.deltaY = 0;
      }

      self.hasMoved = false; //矫正位置到最贴近目标处

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
    transitionEnd: function (e) {
      var self = this;
    },
    autoMove: function (targetIndex) {
      var self = this;
      var style = this.element.style; //var width = self.childWidth;

      style.webkitTransition = "-webkit-transform " + self.speed + "ms";
      if (self.orientation == 1) style.MozTransform = style.webkitTransform = 'translate3d(' + -targetIndex * self.childWidth + 'px,0,0)';
      if (self.orientation == 2) style.MozTransform = style.webkitTransform = 'translate3d(0,' + -targetIndex * self.childHeight + 'px,0)';
      self.index = targetIndex + self.focusIndex;
    },
    move: function (targetIndex) {
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
    limitIndex: function (targetIndex) {
      var self = this;

      if (!self.limitBorder) {
        if (targetIndex < -self.offset) targetIndex = -self.offset;else if (targetIndex > self.length - 1 - self.offset) targetIndex = self.length - 1 - self.offset;
      } else {
        if (targetIndex < 0) targetIndex = 0;else if (targetIndex > self.length - self.showNum + self.focusIndex) targetIndex = self.length - (self.showNum - self.focusIndex);
      }

      return targetIndex - self.focusIndex;
    }
  };

  function showPrompt(args) {
    if (typeof args === 'object') {
      Object.keys(args).forEach(function (key) {
        this[key] = args[key];
      }.bind(this));
    }

    if (typeof args === 'string' || typeof args === 'number') this.msg = args;
    this.init();
  }

  showPrompt.prototype = {
    constructor: showPrompt,
    init: function () {
      this._container = document.querySelector('.widget-prompt');

      if (this._container) {
        this.destory();
      }

      this.open();
    },
    open: function () {
      this._container = document.createElement('div');
      this._container.className = this.className ? this.className + ' widget-prompt' : 'widget-prompt';
      this._container.innerHTML = this.msg;
      document.body.appendChild(this._container);
      this.promptTimer = setTimeout(function () {
        this.destory();
        if (this.cb) this.cb();
      }.bind(this), 3000);
    },
    destory: function () {
      this._container.parentNode.removeChild(this._container);

      this._container = null;
    }
  };

  function Loading(args) {
    if (typeof args === 'object') {
      Object.keys(args).forEach(function (key) {
        this[key] = args[key];
      }.bind(this));
    }

    var tpl = '<div class="mask"></div>' + '<div class="spinner"></div>';
    this.html = this.html || tpl;
    return this;
  }

  Loading.prototype = {
    constructor: Loading,
    start: function () {
      if (!this._container) {
        this._container = document.createElement('div');
        this._container.innerHTML = this.html;
        this._container.className = this.className ? this.className + ' widget-loading' : 'widget-loading';
        document.body.appendChild(this._container);
      }

      this._container.style.display = 'block';
    },
    end: function () {
      this._container && (this._container.style.display = 'none');
    }
  };
  return {
    TabWidget: function (args) {
      return new TabWidget(args);
    },
    Dialog: function (args) {
      return new Dialog(args);
    },
    easyMove: function (dom, args) {
      return new easyMove(dom, args);
    },
    showPrompt: function (args) {
      return new showPrompt(args);
    },
    Loading: function (args) {
      return new Loading(args);
    }
  };
});

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var xhr_1 = __webpack_require__(12);
var actions_1 = __webpack_require__(7);
var yao_m_ui_1 = __webpack_require__(14);
var showGoodTs_1 = __webpack_require__(53);
var commetsTs_1 = __webpack_require__(54);
var useReducer = React.useReducer, useEffect = React.useEffect, useRef = React.useRef;
var unLoginCode = '00002';
function _fetchGoods(id) {
    return new Promise(function (resolve, reject) {
        new xhr_1.default({
            url: '/api/goods/detail/' + id,
            done: function (callData) {
                resolve(callData);
            },
            faild: function () {
                var error = new Error('something wrong');
                reject(error);
            }
        });
    });
}
function _delCommet(C_id, goodsid) {
    return new Promise(function (res, rej) {
        new xhr_1.default({
            url: '/api/comments/' + goodsid + '/' + C_id,
            method: 'DELETE',
            done: function (obj) {
                if (obj.code === 0)
                    res(+C_id);
                if (obj.code === unLoginCode)
                    return yao_m_ui_1.showPrompt({ msg: obj.msg });
                if (obj.code !== 0)
                    return yao_m_ui_1.showPrompt({ msg: obj.msg });
            }
        });
    });
}
function _submitCommet(goodsid, content) {
    var commentData = JSON.stringify({
        goodsid: goodsid,
        content: content
    });
    // @ts-ignore
    return fetch("https://www.macsen318.com" + '/api/comments/', {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: commentData
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        }
    }).then(function (obj) {
        if (obj.code === unLoginCode)
            return yao_m_ui_1.showPrompt({ msg: obj.msg });
        if (obj.code !== 0)
            return yao_m_ui_1.showPrompt({ msg: obj.msg });
    });
}
function _delGoods(id) {
    // @ts-ignore
    return fetch("https://www.macsen318.com" + '/api/goods/delete/' + id, {
        method: 'DELETE',
        credentials: "include"
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        }
    }).then(function (obj) {
        return obj;
        //if (obj.code === unLoginCode) return showPrompt({ msg: obj.msg, cb: () => props.history.push('/user/login') })
        //if (obj.code == 0) {
        //props.history.push('/goods/list')
        //}
    });
}
function GoodsDetail(props) {
    var _a = useReducer(showGoodTs_1.default, {}), state = _a[0], dispatch = _a[1];
    var _b = useReducer(commetsTs_1.default, []), commets = _b[0], dispatchCommets = _b[1];
    var files = state.files || '';
    useEffect(function () {
        _fetchGoods(props.match.params.id).then(function (obj) {
            dispatch({ type: actions_1.SHOWGOOD, value: obj.detail });
            dispatchCommets({ type: actions_1.LISTCOMMETS, value: obj.commets });
        });
    }, []);
    var deleteGoods = function () {
        _delGoods(props.match.params.id);
    };
    if (state.id) {
        return (React.createElement("div", { className: "app-detail-page" },
            React.createElement("p", { className: "page-title" }, state.title),
            files.length > 0 && (React.createElement("ul", { className: "uri-list" }, files.map(function (item, index) { return React.createElement(Blog_item, { key: index, item: item, category: state.category }); }))),
            state.content != '' && (React.createElement("p", { className: "content" }, state.content)),
            React.createElement(Commets, { commets: commets, goodsid: state.id })));
    }
    return (React.createElement("div", null, props.match.params.id));
}
function Blog_item(props) {
    var item = props.item;
    var category = props.category;
    var itemEle;
    switch (category) {
        case 'image':
            itemEle = React.createElement("img", { src: '//res.macsen318.com' + item.path, width: item.width });
            break;
        case 'video':
            itemEle = React.createElement("video", { src: '//res.macsen318.com' + item.path, autoPlay: true });
            break;
        case 'note':
            if (item.url) {
                itemEle = React.createElement("div", null,
                    React.createElement("p", null, item.content),
                    React.createElement("p", null,
                        React.createElement("img", { src: '//res.macsen318.com' + item.path, width: item.width / 2 })));
            }
            else {
                itemEle = React.createElement("p", null, item.content);
            }
            break;
        default:
            break;
    }
    return (React.createElement("li", { className: "item" }, itemEle));
}
function Commets(props) {
    var commets = props.commets, goodsid = props.goodsid;
    if (commets.length) {
        return (React.createElement("div", { className: "commets-container" },
            React.createElement("ul", { className: "commets-list" }, commets.map(function (item, index) { return React.createElement(CommetItem, { goodsid: goodsid, C_content: item.C_content, key: index, C_id: item._id }); })),
            React.createElement(InputContainer, { goodsid: goodsid })));
    }
    return (React.createElement("div", { className: "commets-contain" },
        React.createElement(InputContainer, { goodsid: goodsid })));
}
function CommetItem(props) {
    var C_content = props.C_content, C_id = props.C_id, goodsid = props.goodsid;
    var delCommet = function (e) {
        var item = e.target.parentNode;
        var C_id = item.dataset.id;
        _delCommet(C_id, goodsid);
    };
    return (React.createElement("li", { className: "item", "data-id": C_id },
        React.createElement("span", { className: "con" }, '游客评论: ' + C_content),
        React.createElement("span", { className: "del", onClick: function (e) { return delCommet(e); } }, "\u5220\u9664")));
}
function InputContainer(props) {
    var wrap_comment = useRef(null);
    var submitCommet = function () {
        var commentEle = wrap_comment.current;
        _submitCommet(props.goodsid, commentEle ? commentEle.value : '');
    };
    return (React.createElement("div", { className: "input-container" },
        React.createElement("textarea", { className: "ipt", ref: wrap_comment }),
        React.createElement("p", null,
            React.createElement("button", { onClick: submitCommet, className: "btn" }, "\u63D0\u4EA4\u8BC4\u8BBA"))));
}
exports.default = GoodsDetail;


/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __webpack_require__(7);
function showGood(state, action) {
    switch (action.type) {
        case actions_1.SHOWGOOD:
            return action.value;
        default:
            return state;
    }
}
exports.default = showGood;


/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __webpack_require__(7);
function commets(state, action) {
    switch (action.type) {
        case actions_1.POSTCOMMET:
            state.push(action.value);
            return state.slice();
        case actions_1.LISTCOMMETS:
            return action.value;
        case actions_1.DELETECOMMET:
            var index = void 0;
            for (var i = 0; i < state.length; i++) {
                if (state[i]._id === action.value) {
                    index = i;
                    state.splice(index, 1);
                    break;
                }
            }
            return state.slice();
        default:
            return state.slice();
    }
}
exports.default = commets;


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN = 'LOGIN';
exports.LOGOUT = 'LOGOUT';
exports.LISTGOODS = 'LISTGOODS';
exports.SHOWGOOD = 'SHOWGOOD';
exports.POSTCOMMET = 'POSTCOMMET';
exports.DELETECOMMET = 'DELETECOMMET';
exports.LISTCOMMETS = 'LISTCOMMETS';
exports.DONELOADING = 'DONELOADING';


/***/ })

}]);
//# sourceMappingURL=2.f073715afff5c34d0f96.js.map