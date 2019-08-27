(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

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

/***/ 60:
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
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_xhr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var _actions_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(12);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(108);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_10__);












function formatDate(now) {
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
}

function filterContent(words, num) {
  num = num || 100;
  return words.length > num ? words.slice(0, num) + '...' : words;
}

function mapStateToProps(state, ownProps) {
  return {
    listGoods: state.listGoods,
    doneLoading: state.doneLoading
  };
}

var goodslist =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(goodslist, _Component);

  function goodslist(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, goodslist);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(goodslist).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(goodslist, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      var self = this;
      fetch("https://www.macsen318.com" + "/api/goods/list", {
        credentials: "include"
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }
      }).then(function (obj) {
        _this.props.doneLoadingAction();

        _this.props.listGoodsAction(obj.data);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var listGoods = this.props.listGoods;

      if (this.props.doneLoading) {
        if (listGoods.length) {
          return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("ul", {
            className: "app-list-page"
          }, listGoods.map(function (item, index) {
            return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Blog_item, {
              key: item.goodsid,
              item: item
            });
          }));
        }

        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          style: {
            padding: 2 + "rem",
            color: "#333"
          }
        }, "\u6682\u65E0\u6570\u636E");
      }

      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "app-list-page"
      }, "loading...");
    }
  }]);

  return goodslist;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

var Blog_item =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Blog_item, _React$Component);

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
      var category = item.category;
      var itemEle;
      var content = item.content ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, item.content) : "";
      var categoryDesc = '笔记';

      switch (category) {
        case "image":
          categoryDesc = '图文';
          itemEle = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            className: "wrap-uri"
          }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("img", {
            src: "//res.macsen318.com" + item.path,
            width: item.width,
            height: item.height
          }));
          break;

        case "video":
          categoryDesc = '视频';
          itemEle = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            className: "wrap-uri"
          }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("video", {
            src: "//res.macsen318.com" + item.path,
            controls: "controls",
            autoPlay: true
          }));
          break;

        case "note":
          categoryDesc = '笔记';
          itemEle = '';
          break;

        default:
          break;
      }

      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("li", {
        className: "item"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__[/* Link */ "b"], {
        to: "/goods/detail/" + item.goodsid
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h2", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "avator"
      }, item.user, "\u53D1\u5E03\u4E86", categoryDesc), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("em", {
        className: "time"
      }, formatDate(new Date(item._time)))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h3", null, item.title), itemEle, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", {
        className: "content"
      }, filterContent(item.content)), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", {
        className: "more"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("i", {
        className: "i-comment"
      }), item.comment_count)));
    }
  }]);

  return Blog_item;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_7__[/* connect */ "b"])(mapStateToProps, {
  listGoodsAction: _actions_actions__WEBPACK_IMPORTED_MODULE_8__[/* listGoodsAction */ "l"],
  doneLoadingAction: _actions_actions__WEBPACK_IMPORTED_MODULE_8__[/* doneLoadingAction */ "i"]
})(goodslist));

/***/ })

}]);
//# sourceMappingURL=8.e3edf2a34d3da015c382.js.map