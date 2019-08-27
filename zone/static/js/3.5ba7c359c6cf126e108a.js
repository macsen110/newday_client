(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
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

/* harmony default export */ __webpack_exports__["a"] = (xhr);

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_xhr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9);
/* harmony import */ var _actions_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3);
/* harmony import */ var yao_m_ui__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8);
/* harmony import */ var yao_m_ui__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(yao_m_ui__WEBPACK_IMPORTED_MODULE_10__);











var unLoginCode = '00002';

function mapStateToProps(state, ownProps) {
  return {
    showGood: state.showGood,
    commets: state.commets,
    initData: state.initData
  };
}

var goodsDetail =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(goodsDetail, _Component);

  //static contextTypes = Object.assign({},{history: PropTypes.history});
  function goodsDetail(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, goodsDetail);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(goodsDetail).call(this, props));
    _this.submitComment = _this.submitComment.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.deleteGoods = _this.deleteGoods.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(goodsDetail, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var self = this;
      var promise = new Promise(function (resolve, reject) {
        new _utils_xhr__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]({
          url: '/api/goods/detail/' + self.props.match.params.id,
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
        _this2.props.showGoodAction(obj.detail);

        _this2.props.listCommetsAction(obj.commets);
      }, function (error) {
        return console.log(error);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var goodsObj = this.props.showGood;
      var commets = this.props.commets;

      if (goodsObj) {
        var files = goodsObj.files;
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
          className: "app-detail-page"
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", {
          className: "page-title"
        }, goodsObj.title), files.length > 0 && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("ul", {
          className: "uri-list"
        }, files.map(function (item, index) {
          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Blog_item, {
            key: index,
            item: item,
            category: goodsObj.category
          });
        })), goodsObj.content != '' && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", {
          className: "content"
        }, goodsObj.content), commets.length ? react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
          className: "comments-container"
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", {
          className: "comments-title"
        }, "\u8BC4\u8BBA"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("ul", {
          className: "list"
        }, commets.map(function (item, index) {
          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(CommetItem, {
            goodsId: goodsObj.id,
            history: _this3.props.history,
            user: _this3.props.initData.user,
            author: goodsObj.user,
            C_user: item.C_user,
            deleteCommetAction: _this3.props.deleteCommetAction,
            key: index,
            item: item
          });
        }))) : '', react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
          ref: "wrapComment"
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("textarea", {
          className: "ipt"
        }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("button", {
          onClick: this.submitComment,
          className: "btn"
        }, "\u63D0\u4EA4\u8BC4\u8BBA"))), this.props.initData.user === goodsObj.user && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("button", {
          onClick: this.deleteGoods,
          className: "icon-delete-page"
        }, "x"));
      }

      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", null, this.props.match.params.id);
    }
  }, {
    key: "deleteGoods",
    value: function deleteGoods() {
      var _this4 = this;

      var self = this;
      fetch("https://www.macsen318.com" + '/api/goods/delete/' + self.props.match.params.id, {
        method: 'DELETE',
        credentials: "include"
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }
      }).then(function (obj) {
        if (obj.code === unLoginCode) return Object(yao_m_ui__WEBPACK_IMPORTED_MODULE_10__["showPrompt"])({
          msg: obj.msg,
          cb: function cb() {
            return _this4.props.history.push('/user/login');
          }
        });

        if (obj.code == 0) {
          self.props.history.push('/goods/list');
        }
      });
    }
  }, {
    key: "submitComment",
    value: function submitComment() {
      var _this5 = this;

      var wrap_comment = this.refs.wrapComment;
      var commentEle = wrap_comment.querySelector('textarea');
      var self = this;
      var commentData = JSON.stringify({
        goodsid: self.props.match.params.id,
        comment: commentEle.value.trim()
      });
      fetch("https://www.macsen318.com" + '/api/comments/', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: commentData
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }
      }).then(function (obj) {
        if (obj.code === unLoginCode) return Object(yao_m_ui__WEBPACK_IMPORTED_MODULE_10__["showPrompt"])({
          msg: obj.msg,
          cb: function cb() {
            return _this5.props.history.push('/user/login');
          }
        });
        if (obj.code !== 0) return Object(yao_m_ui__WEBPACK_IMPORTED_MODULE_10__["showPrompt"])({
          msg: obj.msg
        });

        _this5.props.postCommetAction({
          C_content: obj.commet,
          _id: obj._id,
          C_user: obj.C_user
        });

        commentEle.value = '';
      });
    }
  }]);

  return goodsDetail;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

var Blog_item =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Blog_item, _React$Component);

  function Blog_item() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Blog_item);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Blog_item).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Blog_item, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var item = this.props.item;
      var category = this.props.category;
      var itemEle;

      switch (category) {
        case 'image':
          itemEle = react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
            src: '//res.macsen318.com' + item.path,
            width: item.width
          });
          break;

        case 'video':
          itemEle = react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("video", {
            src: '//res.macsen318.com' + item.path,
            controls: "controls",
            autoPlay: true
          });
          break;

        case 'note':
          if (item.url) {
            itemEle = react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, item.content), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
              src: '//res.macsen318.com' + item.path,
              width: item.width / 2
            })));
          } else {
            itemEle = react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, item.content);
          }

          break;

        default:
          break;
      }

      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("li", {
        className: "item"
      }, itemEle);
    }
  }]);

  return Blog_item;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

var CommetItem =
/*#__PURE__*/
function (_Component2) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(CommetItem, _Component2);

  function CommetItem() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CommetItem);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(CommetItem).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CommetItem, [{
    key: "delCommet",
    value: function delCommet(e) {
      var _this6 = this;

      var self = this;
      var item = e.target.parentNode;
      var C_id = item.dataset.id;
      var content = item.firstElementChild.innerHTML;
      var props = this.props;
      var goodsId = props.goodsId;
      new _utils_xhr__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]({
        url: '/api/comments/' + goodsId + '/' + C_id,
        method: 'DELETE',
        done: function done(obj) {
          if (obj.code === 0) self.props.deleteCommetAction(+C_id);
          if (obj.code === unLoginCode) return Object(yao_m_ui__WEBPACK_IMPORTED_MODULE_10__["showPrompt"])({
            msg: obj.msg,
            cb: function cb() {
              return _this6.props.history.push('/user/login');
            }
          });
          if (obj.code !== 0) return Object(yao_m_ui__WEBPACK_IMPORTED_MODULE_10__["showPrompt"])({
            msg: obj.msg
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var props = this.props;
      var item = props.item;
      var goodsid = props.goodsid;
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("li", {
        className: "item",
        "data-id": item._id
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("span", {
        className: "con"
      }, props.C_user + '评论: ' + item.C_content), (props.user == props.author || props.C_user == props.user) && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("span", {
        className: "del",
        onClick: function onClick(e) {
          return _this7.delCommet(e);
        }
      }, "\u5220\u9664"));
    }
  }]);

  return CommetItem;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__[/* connect */ "b"])(mapStateToProps, {
  showGoodAction: _actions_actions__WEBPACK_IMPORTED_MODULE_9__[/* showGoodAction */ "n"],
  listCommetsAction: _actions_actions__WEBPACK_IMPORTED_MODULE_9__[/* listCommetsAction */ "k"],
  postCommetAction: _actions_actions__WEBPACK_IMPORTED_MODULE_9__[/* postCommetAction */ "m"],
  deleteCommetAction: _actions_actions__WEBPACK_IMPORTED_MODULE_9__[/* deleteCommetAction */ "h"]
})(goodsDetail));

/***/ }),

/***/ 8:
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

/***/ })

}]);
//# sourceMappingURL=3.5ba7c359c6cf126e108a.js.map