(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9);
/* harmony import */ var _actions_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3);











function mapStateToProps(state) {
  return {
    initData: state.initData
  };
}

var Tab =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Tab, _Component);

  function Tab(props, context) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Tab);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Tab).call(this, props, context));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Tab, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("li", {
        className: "item"
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[/* NavLink */ "c"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
        activeClassName: "active"
      })));
    }
  }]);

  return Tab;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]); //home views


var App =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(App, _React$Component);

  function App(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, App);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(App).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      fetch("https://www.macsen318.com" + "/api/home", {
        credentials: 'include'
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }
      }).then(function (obj) {
        return _this.props.initAction(obj);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "render",
    value: function render() {
      var initData = this.props.initData;

      if (!initData.isLogin) {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
          className: "wrap-header-container"
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("header", {
          className: "header"
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("ul", {
          className: "app-nav-list"
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Tab, {
          exact: true,
          to: "/"
        }, "\u9996\u9875"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Tab, {
          to: "/goods/list"
        }, "\u53D1\u73B0"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Tab, {
          to: "/goods/upload"
        }, "\u4E0A\u4F20"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Tab, {
          to: "/user/login"
        }, "\u767B\u5F55"))));
      } else {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
          className: "wrap-header-container"
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("header", {
          className: "header"
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("ul", {
          className: "app-nav-list"
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Tab, {
          exact: true,
          to: "/"
        }, "\u9996\u9875"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Tab, {
          to: "/goods/list"
        }, "\u53D1\u73B0"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Tab, {
          to: "/goods/upload"
        }, "\u4E0A\u4F20"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Tab, {
          to: "/communicate"
        }, "\u6211"))));
      }
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__[/* connect */ "b"])(mapStateToProps, {
  initAction: _actions_actions__WEBPACK_IMPORTED_MODULE_9__[/* initAction */ "j"]
})(App));

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ })

}]);
//# sourceMappingURL=6.4bea32db9ae54d4935c3.js.map