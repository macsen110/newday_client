(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var xhr = function () {
	function xhr(opt) {
		_classCallCheck(this, xhr);

		this.method = 'GET';
		this.aysc = true;
		this.sendData = null;
		this.cache = true;
		if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) === 'object') {
			Object.assign(this, opt);
		}
		this.url = "https://www.macsen318.com" + this.url;
		this.send();
	}

	_createClass(xhr, [{
		key: 'send',
		value: function send() {
			var _xhr = new XMLHttpRequest();
			_xhr.timeout = 60000;
			this.withCredentials && (_xhr.withCredentials = true);
			_xhr.withCredentials = true;
			_xhr.open(this.method, this.url, this.aysc);

			if (this.setHeader) {
				_xhr.setRequestHeader("Content-Type", this.setHeader);
			}
			if (!this.cache) {
				_xhr.setRequestHeader("Pragma", "no-cache");
				_xhr.setRequestHeader("Cache-Control", "no-cache");
			}

			_xhr.onload = function () {
				if (_xhr.readyState === 4) {
					if (_xhr.status === 200) {
						var sucData;
						if (_xhr.response) {
							sucData = JSON.parse(_xhr.response);
						}
						this.done(sucData);
					} else {
						var error = new Error("something went wrong");
						this.faild(error);
					}
				}
			}.bind(this);
			_xhr.onerror = function (error) {
				this.faild(error);
			}.bind(this);
			_xhr.send(this.sendData);
		}
	}, {
		key: 'done',
		value: function done(data) {}
	}, {
		key: 'faild',
		value: function faild() {}
	}]);

	return xhr;
}();

/* harmony default export */ __webpack_exports__["a"] = (xhr);

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_xhr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _actions_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






//register views

var logout = function (_React$Component) {
    _inherits(logout, _React$Component);

    function logout() {
        _classCallCheck(this, logout);

        return _possibleConstructorReturn(this, (logout.__proto__ || Object.getPrototypeOf(logout)).apply(this, arguments));
    }

    _createClass(logout, [{
        key: 'componentWillMount',

        //static contextTypes = Object.assign({},{history: PropTypes.history});
        value: function componentWillMount() {
            var self = this;
            new _utils_xhr__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]({
                url: '/api/users/logout',
                done: function done(callData) {
                    if (callData.code == 0) {
                        self.props.initAction({ isLogin: false });
                        self.props.history.push('/');
                    }
                },
                withCredentials: true,
                faild: function faild() {
                    var error = new Error('something wrong');
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', null);
        }
    }]);

    return logout;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[/* connect */ "b"])(null, { initAction: _actions_actions__WEBPACK_IMPORTED_MODULE_3__[/* initAction */ "j"] })(logout));

/***/ })

}]);
//# sourceMappingURL=8.0dd55aeb09d532d69ef6.js.map