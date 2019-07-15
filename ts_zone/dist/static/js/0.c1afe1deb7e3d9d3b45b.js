(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0,9],{

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var hello_1 = __webpack_require__(17);
exports.default = (function () {
    return (React.createElement("div", { className: "app-home-page" },
        React.createElement(hello_1.default, { compiler: "TypeScript", framework: "React" }),
        React.createElement("h1", null, "\u968F\u6027\u7684\u8BB0\u5F55"),
        React.createElement("p", null, "\u65B9\u4FBF\u5730\u8BB0\u5F55\u7167\u7247\u3001\u6587\u5B57\u3001\u97F3\u4E50\u3001\u89C6\u9891\uFF0C\u9002\u7528\u4E8EiPhone\u3001iPad\u548CAndroid\u79FB\u52A8\u5BA2\u6237\u7AEF\u53CAPC\u7AEF\uFF0C \u8BA9\u4F60\u968F\u65F6\u968F\u5730\u7684\u8BB0\u5F55\u4E0E\u5206\u4EAB\u3002")));
});


/***/ }),

/***/ 17:
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


/***/ })

}]);
//# sourceMappingURL=0.c1afe1deb7e3d9d3b45b.js.map