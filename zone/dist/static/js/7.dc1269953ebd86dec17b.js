(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

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

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_xhr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _actions_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_5__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







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

var goodslist = function (_Component) {
  _inherits(goodslist, _Component);

  function goodslist(props) {
    _classCallCheck(this, goodslist);

    return _possibleConstructorReturn(this, (goodslist.__proto__ || Object.getPrototypeOf(goodslist)).call(this, props));
  }

  _createClass(goodslist, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var self = this;
      fetch("https://www.macsen318.com" + "/api/goods/list", {
        credentials: "include"
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }
      }).then(function (obj) {
        _this2.props.doneLoadingAction();
        _this2.props.listGoodsAction(obj.data);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var listGoods = this.props.listGoods;
      if (this.props.doneLoading) {
        if (listGoods.length) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            "ul",
            { className: "app-list-page" },
            listGoods.map(function (item, index) {
              return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Blog_item, { key: item.goodsid, item: item });
            })
          );
        }
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          { style: { padding: 2 + "rem", color: "#333" } },
          "\u6682\u65E0\u6570\u636E"
        );
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        { className: "app-list-page" },
        "loading..."
      );
    }
  }]);

  return goodslist;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var Blog_item = function (_React$Component) {
  _inherits(Blog_item, _React$Component);

  function Blog_item() {
    _classCallCheck(this, Blog_item);

    return _possibleConstructorReturn(this, (Blog_item.__proto__ || Object.getPrototypeOf(Blog_item)).apply(this, arguments));
  }

  _createClass(Blog_item, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var item = this.props.item;
      var category = item.category;
      var itemEle;
      var content = item.content ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        null,
        item.content
      ) : "";
      var categoryDesc = '笔记';
      switch (category) {
        case "image":
          categoryDesc = '图文';
          itemEle = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            "div",
            { className: "wrap-uri" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
              src: "//res.macsen318.com" + item.path,
              width: item.width,
              height: item.height
            })
          );
          break;
        case "video":
          categoryDesc = '视频';
          itemEle = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            "div",
            { className: "wrap-uri" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("video", {
              src: "//res.macsen318.com" + item.path,
              controls: "controls",
              autoPlay: true
            })
          );
          break;
        case "note":
          categoryDesc = '笔记';
          itemEle = '';
          break;
        default:
          break;
      }
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "li",
        { className: "item" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          react_router_dom__WEBPACK_IMPORTED_MODULE_4__[/* Link */ "b"],
          { to: "/goods/detail/" + item.goodsid },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            "h2",
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              "span",
              { className: "avator" },
              item.user,
              "\u53D1\u5E03\u4E86",
              categoryDesc
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              "em",
              { className: "time" },
              formatDate(new Date(item._time))
            )
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            "h3",
            null,
            item.title
          ),
          itemEle,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            "p",
            { className: "content" },
            filterContent(item.content)
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            "p",
            { className: "more" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: "i-comment" }),
            item.comment_count
          )
        )
      );
    }
  }]);

  return Blog_item;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[/* connect */ "b"])(mapStateToProps, { listGoodsAction: _actions_actions__WEBPACK_IMPORTED_MODULE_3__[/* listGoodsAction */ "l"], doneLoadingAction: _actions_actions__WEBPACK_IMPORTED_MODULE_3__[/* doneLoadingAction */ "i"] })(goodslist));

/***/ })

}]);
//# sourceMappingURL=7.dc1269953ebd86dec17b.js.map