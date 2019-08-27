(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ 105:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 58:
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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);









function mapStateToProps(state, ownProps) {
  return {
    showGood: state.showGood,
    commets: state.commets,
    initData: state.initData
  };
}

var Communicate =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Communicate, _Component);

  function Communicate(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Communicate);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Communicate).call(this, props, context));
    _this.state = {
      chatList: [],
      socket: null
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Communicate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _self = this;

      try {
        var Manager = __webpack_require__(80);

        var socket = new Manager("https://www.macsen318.com");
        socket.on('connect', function () {
          return _self.setState({
            socket: socket
          });
        });
        socket.on('chat', function (obj) {
          return _self.setChatList.bind(_self)(obj);
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: "sendChat",
    value: function sendChat(data) {
      //loading.start()
      var _self = this;

      var ipt = _self.refs.chat_content;

      _self.setChatList.bind(_self)({
        data: ipt.value
      });

      _self.state.socket && _self.state.socket.emit('chat', {
        data: ipt.value
      });
    }
  }, {
    key: "setChatList",
    value: function setChatList(obj) {
      var _self = this;

      var chatList = _self.state.chatList;
      chatList.push(obj);

      _self.setState({
        chatList: chatList
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.state;
      var isLogin = null;
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "app-home-page"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "chat-container"
      }, function () {
        if (state.chatList.length) {
          return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("ul", {
            className: "chat-list"
          }, state.chatList.map(function (item, index) {
            return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("li", {
              key: index,
              className: "item"
            }, item.data);
          }));
        }
      }(), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "chat-box",
        ref: "chat_box"
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        type: "text",
        ref: "chat_content",
        className: "ipt"
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("button", {
        className: "btn",
        onClick: function onClick() {
          return _this2.sendChat();
        },
        ref: "send_chat_btn"
      }, "submit"), this.props.initData.isLogin ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[/* Link */ "b"], {
        to: "/user/logout"
      }, "\u6CE8\u9500\u8D26\u53F7") : ''));
    }
  }]);

  return Communicate;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_7__[/* connect */ "b"])(mapStateToProps, {})(Communicate));

/***/ })

}]);
//# sourceMappingURL=7.9c45b3fb051047998890.js.map