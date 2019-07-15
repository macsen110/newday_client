(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ 24:
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
var react_router_dom_1 = __webpack_require__(9);
var actions_1 = __webpack_require__(5);
var context_1 = __webpack_require__(8);
var useEffect = React.useEffect, useContext = React.useContext;
//const Context = createContext();
// such as https://blog.csdn.net/weixin_42461410/article/details/88650304
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
                React.createElement(Tab, { exact: true, to: "/" }, "\u9996\u9875"),
                React.createElement(Tab, { to: "/goods/list" }, "\u53D1\u73B0"),
                React.createElement(Tab, { to: "/goods/upload" }, "\u4E0A\u4F20"),
                React.createElement(Tab, { to: "/user/logout" }, "\u6CE8\u9500")))));
}
function Tab(props) {
    return (React.createElement("li", { className: "item" },
        React.createElement(react_router_dom_1.NavLink, __assign({}, props, { activeClassName: "active" }))));
}
//home views
function App() {
    var _a = useContext(context_1.FetchesContext), state = _a.state, dispatch = _a.dispatch;
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
            .then(function (obj) { return dispatch({ type: obj.isLogin ? actions_1.LOGIN : actions_1.LOGOUT }); })
            .catch(function () { return dispatch({ type: actions_1.LOGOUT }); });
    }, []);
    if (state.isLogin)
        return React.createElement(LoginHeader, null);
    return React.createElement(LogoutHeader, null);
}
;
exports.default = App;


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN = 'LOGIN';
exports.LOGOUT = 'LOGOUT';
exports.LISTGOODS = 'LISTGOODS';
exports.SHOWGOOD = 'SHOWGOOD';
exports.POSTCOMMET = 'POSTCOMMET';
exports.DELETECOMMET = 'DELETECOMMET';
exports.LISTCOMMETS = 'LISTCOMMETS';
exports.DONELOADING = 'DONELOADING';


/***/ })

}]);
//# sourceMappingURL=7.43133c1f448ef6578f98.js.map