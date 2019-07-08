(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _actions_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





function mapStateToProps(state) {
    return {
        initData: state.initData
    };
}

var Tab = function (_Component) {
    _inherits(Tab, _Component);

    function Tab(props, context) {
        _classCallCheck(this, Tab);

        return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, props, context));
    }

    _createClass(Tab, [{
        key: 'render',
        value: function render() {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'li',
                { className: 'item' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[/* NavLink */ "c"], _extends({}, this.props, { activeClassName: 'active' }))
            );
        }
    }]);

    return Tab;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

//home views


var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            fetch("https://www.macsen318.com" + "/api/home", {
                credentials: 'include'
            }).then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            }).then(function (obj) {
                return _this3.props.initAction(obj);
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'render',
        value: function render() {
            var initData = this.props.initData;
            if (!initData.isLogin) {
                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    'div',
                    { className: 'wrap-header-container' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        'header',
                        { className: 'header' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            'ul',
                            { className: 'app-nav-list' },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                Tab,
                                { exact: true, to: '/' },
                                '\u9996\u9875'
                            ),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                Tab,
                                { to: '/goods/list' },
                                '\u53D1\u73B0'
                            ),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                Tab,
                                { to: '/goods/upload' },
                                '\u4E0A\u4F20'
                            ),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                Tab,
                                { to: '/user/login' },
                                '\u767B\u5F55'
                            )
                        )
                    )
                );
            } else {
                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    'div',
                    { className: 'wrap-header-container' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        'header',
                        { className: 'header' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            'ul',
                            { className: 'app-nav-list' },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                Tab,
                                { exact: true, to: '/' },
                                '\u9996\u9875'
                            ),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                Tab,
                                { to: '/goods/list' },
                                '\u53D1\u73B0'
                            ),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                Tab,
                                { to: '/goods/upload' },
                                '\u4E0A\u4F20'
                            ),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                Tab,
                                { to: '/communicate' },
                                '\u6211'
                            )
                        )
                    )
                );
            }
        }
    }]);

    return App;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[/* connect */ "b"])(mapStateToProps, { initAction: _actions_actions__WEBPACK_IMPORTED_MODULE_3__[/* initAction */ "j"] })(App));

/***/ })

}]);
//# sourceMappingURL=10.be409d3cf580c02d5522.js.map