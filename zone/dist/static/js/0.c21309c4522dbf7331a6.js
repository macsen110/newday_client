(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0,12],{

/***/ 22:
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
exports.Hello = Hello;


/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hello__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _hello__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hello__WEBPACK_IMPORTED_MODULE_1__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Index = function (_Component) {
  _inherits(Index, _Component);

  function Index() {
    _classCallCheck(this, Index);

    return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this));
  }

  _createClass(Index, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        { className: "app-home-page" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hello__WEBPACK_IMPORTED_MODULE_1__["Hello"], { compiler: "TypeScript", framework: "React" }),
        ",",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "h1",
          null,
          "\u968F\u6027\u7684\u8BB0\u5F55"
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "p",
          null,
          "\u65B9\u4FBF\u5730\u8BB0\u5F55\u7167\u7247\u3001\u6587\u5B57\u3001\u97F3\u4E50\u3001\u89C6\u9891\uFF0C\u9002\u7528\u4E8EiPhone\u3001iPad\u548CAndroid\u79FB\u52A8\u5BA2\u6237\u7AEF\u53CAPC\u7AEF\uFF0C \u8BA9\u4F60\u968F\u65F6\u968F\u5730\u7684\u8BB0\u5F55\u4E0E\u5206\u4EAB\u3002"
        )
      );
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ })

}]);
//# sourceMappingURL=0.c21309c4522dbf7331a6.js.map