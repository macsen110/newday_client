(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




function mapStateToProps(state, ownProps) {
    return {
        showGood: state.showGood,
        commets: state.commets,
        initData: state.initData
    };
}

var Communicate = function (_Component) {
    _inherits(Communicate, _Component);

    function Communicate(props, context) {
        _classCallCheck(this, Communicate);

        var _this = _possibleConstructorReturn(this, (Communicate.__proto__ || Object.getPrototypeOf(Communicate)).call(this, props, context));

        _this.state = {
            chatList: [],
            socket: null
        };
        return _this;
    }

    _createClass(Communicate, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _self = this;
            try {
                var Manager = __webpack_require__(66);
                var socket = new Manager("https://www.macsen318.com");
                socket.on('connect', function () {
                    return _self.setState({ socket: socket });
                });
                socket.on('chat', function (obj) {
                    return _self.setChatList.bind(_self)(obj);
                });
            } catch (e) {
                console.log(e);
            }
        }
    }, {
        key: 'sendChat',
        value: function sendChat(data) {
            //loading.start()
            var _self = this;
            var ipt = _self.refs.chat_content;
            _self.setChatList.bind(_self)({ data: ipt.value });
            _self.state.socket && _self.state.socket.emit('chat', { data: ipt.value });
        }
    }, {
        key: 'setChatList',
        value: function setChatList(obj) {
            var _self = this;
            var chatList = _self.state.chatList;
            chatList.push(obj);
            _self.setState({
                chatList: chatList
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var state = this.state;
            var isLogin = null;
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'div',
                { className: 'app-home-page' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    'div',
                    { className: 'chat-container' },
                    function () {
                        if (state.chatList.length) {
                            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                'ul',
                                { className: 'chat-list' },
                                state.chatList.map(function (item, index) {
                                    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                        'li',
                                        { key: index, className: 'item' },
                                        item.data
                                    );
                                })
                            );
                        }
                    }(),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { className: 'chat-box', ref: 'chat_box' }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { type: 'text', ref: 'chat_content', className: 'ipt' }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        'button',
                        { className: 'btn', onClick: function onClick() {
                                return _this2.sendChat();
                            }, ref: 'send_chat_btn' },
                        'submit'
                    ),
                    this.props.initData.isLogin ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        react_router_dom__WEBPACK_IMPORTED_MODULE_1__[/* Link */ "b"],
                        { to: '/user/logout' },
                        '\u6CE8\u9500\u8D26\u53F7'
                    ) : ''
                )
            );
        }
    }]);

    return Communicate;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

;
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[/* connect */ "b"])(mapStateToProps, {})(Communicate));

/***/ }),

/***/ 91:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=6.206393ce26b33c1073a0.js.map