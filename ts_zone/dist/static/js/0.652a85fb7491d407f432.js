(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0,12],{

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
var Hello = /** @class */ (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hello.prototype.render = function () {
        return React.createElement("h1", null,
            "Hello from ",
            this.props.compiler,
            " and ",
            this.props.framework,
            "!");
    };
    return Hello;
}(React.Component));
exports.default = Hello;


/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Index; });
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
/* harmony import */ var _hello__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(28);
/* harmony import */ var _hello__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_hello__WEBPACK_IMPORTED_MODULE_6__);








var Index =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Index, _Component);

  function Index() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Index);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Index).call(this));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Index, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "app-home-page"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_hello__WEBPACK_IMPORTED_MODULE_6___default.a, {
        compiler: "TypeScript",
        framework: "React"
      }), ",", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h1", null, "\u968F\u6027\u7684\u8BB0\u5F55"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", null, "\u65B9\u4FBF\u5730\u8BB0\u5F55\u7167\u7247\u3001\u6587\u5B57\u3001\u97F3\u4E50\u3001\u89C6\u9891\uFF0C\u9002\u7528\u4E8EiPhone\u3001iPad\u548CAndroid\u79FB\u52A8\u5BA2\u6237\u7AEF\u53CAPC\u7AEF\uFF0C \u8BA9\u4F60\u968F\u65F6\u968F\u5730\u7684\u8BB0\u5F55\u4E0E\u5206\u4EAB\u3002"));
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);



/***/ })

}]);
//# sourceMappingURL=0.652a85fb7491d407f432.js.map