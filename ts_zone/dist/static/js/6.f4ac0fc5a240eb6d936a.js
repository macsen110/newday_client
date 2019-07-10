(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(13);
var init_1 = __webpack_require__(81);
var actions_1 = __webpack_require__(82);
var useReducer = React.useReducer, useEffect = React.useEffect;
function LogoutHeader() {
    return (React.createElement("div", { className: "wrap-header-container" },
        React.createElement("header", { className: "header" },
            React.createElement("ul", { className: "app-nav-list" },
                React.createElement(Tab, { exact: true, to: "/" }, "\u9996\u9875"),
                React.createElement(Tab, { to: "/goods/list" }, "\u53D1\u73B0"),
                React.createElement(Tab, { to: "/goods/upload" }, "\u4E0A\u4F20"),
                React.createElement(Tab, { to: "/user/login" }, "\u767B\u5F55")))));
}
function LoginHeader() {
    return (React.createElement("div", { className: "wrap-header-container" },
        React.createElement("header", { className: "header" },
            React.createElement("ul", { className: "app-nav-list" },
                React.createElement(Tab, { to: "/" }, "\u9996\u9875"),
                React.createElement(Tab, { to: "/goods/list" }, "\u53D1\u73B0"),
                React.createElement(Tab, { to: "/goods/upload" }, "\u4E0A\u4F20"),
                React.createElement(Tab, { to: "/communicate" }, "\u6211")))));
}
function Tab(props) {
    return (React.createElement("li", { className: "item" },
        React.createElement(react_router_dom_1.NavLink, __assign({}, props, { activeClassName: "active" }))));
}
//home views
function App() {
    var _a = useReducer(init_1.default, { isLogin: false }), state = _a[0], dispatch = _a[1];
    var loginStatus = state.isLogin;
    useEffect(function () {
        // @ts-ignore
        fetch("https://www.macsen318.com" + "/api/home", {
            credentials: 'include'
        })
            // @ts-ignore
            .then(function (res) {
            if (res.ok)
                return res.json();
        })
            .then(function () { return dispatch({ type: actions_1.LOGIN }); })
            .catch(function () { return dispatch({ type: actions_1.LOGOUT }); });
    }, []);
    if (!loginStatus)
        return React.createElement(LogoutHeader, null);
    return React.createElement(LoginHeader, null);
}
;
exports.default = App;


/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var initialState = { isLogin: false };
function reducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return { isLogin: true };
        case 'LOGOUT':
            return { isLogin: false };
        default:
            return initialState;
    }
}
exports.default = reducer;


/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN = 'LOGIN';
exports.LOGOUT = 'LOGOUT';


/***/ })

}]);
//# sourceMappingURL=6.f4ac0fc5a240eb6d936a.js.map