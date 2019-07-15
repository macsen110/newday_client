(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var useReducer = React.useReducer, useEffect = React.useEffect, useContext = React.useContext, useRef = React.useRef;
var initialState = { count: 0 };
var LanguageContext = React.createContext({ lang: 'en' });
function reducer(state, action) {
    switch (action.type) {
        case 'reset':
            return initialState;
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            return state;
    }
}
function Counter() {
    var _a = React.useState(0), count = _a[0], setCount = _a[1];
    var _b = useReducer(reducer, { count: count }), state = _b[0], dispatch = _b[1];
    var lang = useContext(LanguageContext).lang;
    var inputEl = useRef(null);
    var onButtonClick = function () {
        if (inputEl && inputEl.current) {
            inputEl.current.focus();
        }
    };
    useEffect(function () {
        console.log("hello, " + count);
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null, lang),
        React.createElement("div", null,
            "Count: ",
            state.count),
        React.createElement("div", null,
            React.createElement("button", { onClick: function () { return dispatch({ type: 'reset' }); } }, "Reset")),
        React.createElement("div", null,
            React.createElement("button", { onClick: function () { return dispatch({ type: 'increment' }); } }, "+")),
        React.createElement("div", null,
            React.createElement("button", { onClick: function () { return dispatch({ type: 'decrement' }); } }, "-")),
        React.createElement("div", null,
            React.createElement("input", { ref: inputEl, type: "text" }),
            React.createElement("button", { onClick: onButtonClick }, "Focus the input"))));
}
exports.default = Counter;


/***/ })

}]);
//# sourceMappingURL=11.3c9b714d86c0fee17a45.js.map