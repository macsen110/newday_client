(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ 33:
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
var actions_1 = __webpack_require__(7);
var listGoodsTs_1 = __webpack_require__(55);
var react_router_dom_1 = __webpack_require__(11);
var useReducer = React.useReducer, useEffect = React.useEffect;
function formatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return (year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second);
}
function filterContent(words, num) {
    num = num || 100;
    return words.length > num ? words.slice(0, num) + '...' : words;
}
function List(props) {
    return (React.createElement("ul", { className: "app-list-page" }, props.listGoods.map(function (item, index) { return (React.createElement(Blog_item, { key: item.goodsid, item: item })); })));
}
function Goodslist() {
    var _a = useReducer(listGoodsTs_1.default, []), state = _a[0], dispatch = _a[1];
    useEffect(function () {
        // @ts-ignore
        fetch("https://www.macsen318.com" + "/api/goods/list", {
            credentials: "include"
        })
            // @ts-ignore
            .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
            .then(function (res) { return dispatch({ type: actions_1.LISTGOODS, value: res.data }); });
    }, []);
    return (React.createElement(List, { listGoods: state }));
}
function Blog_Item_Image(props) {
    return (React.createElement("div", { className: "wrap-uri" },
        React.createElement("img", { src: "//res.macsen318.com" + props.path, width: props.width, height: props.height })));
}
function Blog_Item_Note(props) {
    return (React.createElement("div", null));
}
function Blog_Item_Video(props) {
    return (React.createElement("div", { className: "wrap-uri" },
        React.createElement("video", { src: "//res.macsen318.com" + props.path, autoPlay: true })));
}
function Blog_item(props) {
    var item = props.item;
    var category = item.category;
    var RenderItemComponent;
    switch (category) {
        case 'image':
            RenderItemComponent = Blog_Item_Image;
            break;
        case "note":
            RenderItemComponent = Blog_Item_Note;
            break;
        case 'video':
            RenderItemComponent = Blog_Item_Video;
            break;
        default:
            break;
    }
    return (React.createElement("li", { className: "item" },
        React.createElement(react_router_dom_1.Link, { to: "/goods/detail/" + item.goodsid },
            React.createElement("h2", null,
                React.createElement("span", { className: "avator" },
                    item.user,
                    "\u53D1\u5E03\u4E86",
                    item.categoryDesc),
                React.createElement("em", { className: "time" }, formatDate(new Date(item._time)))),
            React.createElement("h3", null, item.title),
            React.createElement(RenderItemComponent, __assign({}, item)),
            React.createElement("p", { className: "content" }, filterContent(item.content, '')),
            React.createElement("p", { className: "more" },
                React.createElement("i", { className: "i-comment" }),
                item.comment_count))));
}
exports.default = Goodslist;


/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __webpack_require__(7);
function listGoods(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case actions_1.LISTGOODS:
            return action.value;
        default:
            return state;
    }
}
exports.default = listGoods;


/***/ }),

/***/ 7:
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
//# sourceMappingURL=6.a4ed3cf037d82abd9786.js.map