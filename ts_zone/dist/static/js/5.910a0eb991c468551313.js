(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);




var xhr =
/*#__PURE__*/
function () {
  function xhr(opt) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, xhr);

    this.method = 'GET';
    this.aysc = true;
    this.sendData = null;
    this.cache = true;

    if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(opt) === 'object') {
      Object.assign(this, opt);
    }

    this.url = "https://www.macsen318.com" + this.url;
    this.send();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(xhr, [{
    key: "send",
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
    key: "done",
    value: function done(data) {}
  }, {
    key: "faild",
    value: function faild() {}
  }]);

  return xhr;
}();

/* harmony default export */ __webpack_exports__["default"] = (xhr);

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var xhr_1 = __webpack_require__(12);
var actions_1 = __webpack_require__(7);
var context_1 = __webpack_require__(10);
var useEffect = React.useEffect, useContext = React.useContext;
//register views
function Logout(props) {
    var _a = useContext(context_1.FetchesContext), state = _a.state, dispatch = _a.dispatch;
    useEffect(function () {
        new xhr_1.default({
            url: '/api/users/logout',
            done: function (callData) {
                if (callData.code == 0) {
                    dispatch({ type: actions_1.LOGOUT });
                    props.history.replace({ pathname: '/' });
                }
            },
            withCredentials: true,
            faild: function () {
                var error = new Error('something wrong');
            }
        });
    }, []);
    return (React.createElement(React.Fragment, null));
}
exports.default = Logout;


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
//# sourceMappingURL=5.910a0eb991c468551313.js.map