webpackJsonp([1],{

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_3_0_vue_loader_lib_selector_type_script_index_0_bustCache_pay_vue__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_3_0_vue_loader_lib_template_compiler_index_id_data_v_28905c66_hasScoped_false_buble_transforms_node_modules_vue_loader_13_3_0_vue_loader_lib_selector_type_template_index_0_bustCache_pay_vue__ = __webpack_require__(152);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(146)
}
var normalizeComponent = __webpack_require__(53)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_3_0_vue_loader_lib_selector_type_script_index_0_bustCache_pay_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_3_0_vue_loader_lib_template_compiler_index_id_data_v_28905c66_hasScoped_false_buble_transforms_node_modules_vue_loader_13_3_0_vue_loader_lib_selector_type_template_index_0_bustCache_pay_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/pay.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-28905c66", Component.options)
  } else {
    hotAPI.reload("data-v-28905c66", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(51)(undefined);
// imports


// module
exports.push([module.i, "/* reset */\nhtml,\nbody,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\ndiv,\ndl,\ndt,\ndd,\nul,\nol,\nli,\np,\nblockquote,\npre,\nhr,\nfigure,\ntable,\ncaption,\nth,\ntd,\nform,\nfieldset,\nlegend,\ninput,\nbutton,\ntextarea,\nmenu {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  -webkit-overflow-scrolling: touch;\n  user-select: none\n}\nheader,\nfooter,\nsection,\narticle,\naside,\nnav,\nhgroup,\naddress,\nfigure,\nfigcaption,\nmenu,\ndetails {\n  display: block;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ncaption,\nth {\n  text-align: left;\n  font-weight: normal;\n}\nhtml,\nbody,\nfieldset,\nimg,\niframe,\nabbr,\nbutton {\n  border: 0;\n}\nimg {\n  -webkit-user-drag: none;\n  user-drag: none;\n}\ni,\ncite,\nem,\nvar,\naddress,\ndfn {\n  font-style: normal;\n}\n[hidefocus],\nsummary {\n  outline: 0;\n}\nli {\n  list-style: none;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nsmall {\n  font-size: 100%;\n}\nsup,\nsub {\n  font-size: 83%;\n}\npre,\ncode,\nkbd,\nsamp {\n  font-family: inherit;\n}\nq:before,\nq:after {\n  content: none;\n}\ntextarea {\n  overflow: auto;\n  resize: none;\n}\nlabel,\nsummary {\n  cursor: default;\n}\na,\nbutton {\n  cursor: pointer;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nem,\nstrong,\nb {\n  font-weight: normal;\n}\ndel,\nins,\nu,\ns,\na,\na:hover {\n  text-decoration: none;\n}\nbody,\ntextarea,\ninput,\nbutton,\nselect,\nkeygen,\nlegend {\n  font: .3rem/1.14 arial, \\5b8b\\4f53;\n  color: #333;\n  outline: 0;\n}\nbutton {\n  font-size: inherit\n}\n.clearfix{*zoom:1;}\n.clearfix:after{display:block; overflow:hidden; clear:both; height:0; visibility:hidden; content:\".\";}\n/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  \n::-webkit-scrollbar  \n{  \n    width: 0px;  \n    height: 0px;  \n    background-color: #F5F5F5;  \n}  \n  \n/*定义滚动条轨道 内阴影+圆角*/  \n::-webkit-scrollbar-track  \n{  \n    -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);  \n    border-radius: 10px;  \n    background-color: #F5F5F5;  \n}  \n  \n/*定义滑块 内阴影+圆角*/  \n::-webkit-scrollbar-thumb  \n{  \n    border-radius: 10px;  \n    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  \n    background-color: #555;  \n}  \n\n.container {\n  max-width: 1080px;\n  margin: 0 auto;\n  min-height: 100vh;\n}\n\n/**widget**/\n.widget-mask {\n  position: fixed;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 10;\n  background: rgba(36,40,47,0.80);\n}\n\n.widget-dialog {\n  position: absolute;\n  z-index: 100;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.widget-dialog .dialog-mask-bg {\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.3);\n}\n.widget-dialog .main {\n  position: absolute;\n  z-index: 2;\n  top: 50%;\n  left: 50%;\n  width: 75.8%;\n  background-color: #fff;\n  text-align: center;\n  border-radius: 2px;\n  -webkit-transform: translate3d(-50%, -50%, 0);\n  -ms-transform: translate3d(-50%, -50%, 0);\n  transform: translate3d(-50%, -50%, 0);\n  font-size: .38rem;\n}\n.widget-dialog .title {\n  padding: 12px 0;\n}\n.widget-dialog .content {\n  padding: 0 16px 10px;\n}\n.widget-dialog .foot {\n  \n  display: -webkit-box;\n  display: flex;\n  overflow: hidden;\n}\n.widget-dialog .foot button {\n  display: block;\n  height: 100%;\n  \n  -webkit-box-flex: 1;\n  flex: 1;\n  width: 100%;\n  color: #01a0e4;\n  border: 0 none;\n  background: none;\n  \n}\n\n.widget-prompt {\n  position: fixed;\n  z-index: 101;\n  top: 50%;\n  left: 50%;\n  width: 75.8%;;\n  padding: 0.462rem;\n  -webkit-transform: translate3d(-50%, -50%, 0);\n  -ms-transform: translate3d(-50%, -50%, 0);\n  transform: translate3d(-50%, -50%, 0);\n  background: #FFFFFF;\n  box-shadow: 0 0 0.1rem 0 rgba(181,181,181,0.50);\n  border-radius: 0.1rem;\n  color: #333;\n  font-size: 0.372rem;\n  text-align: center;\n  \n}\n\n/****/\n/***业务逻辑处理调用****/\n\n.widget-dialog .content {\n  padding: 1.08rem 0 .45rem;\n}\n.widget-dialog .foot {\n  padding: 0 0.46rem 0.83rem;\n  justify-content: space-between;\n}\n.widget-dialog .foot button {\n  text-align: center;\n  line-height: 1.4rem;\n  width: 47%;\n  \n}\n.widget-dialog .foot button {\n  -webkit-box-flex: none;\n  flex: none;\n  \n  border-radius: 0.09rem;\n}\n.widget-dialog .foot .btn-dialog-cancel {\n  background-image: linear-gradient(-179deg, #F5F5F5 13%, #DADADA 91%);\n  border: 1px solid #979797;\n  border-radius: 0.09rem;\n  color: #616161;\n}\n.widget-dialog .foot .btn-dialog-ok {\n  color: #fff;\n  background-image: linear-gradient(-179deg, #13C1FF 19%, #009AFF 91%);\n}\n/*****/\n\n\n\n/**media**/\n/* @media screen and (min-width: 320px) {\n\tbody {font-size: 18px}\n}\n@media screen and (min-width: 481px) and (max-width:640px) {\n\tbody {font-size: 20px}\n}\n@media screen and (min-width: 641px) and (max-width:800px) {\n\tbody {font-size: 22px}\n}\n@media screen and (min-width: 801px) and (max-width:960px) {\n\tbody {font-size: 24px}\n}\n@media screen and (min-width: 961px) and (max-width:1020px) {\n\tbody {font-size: 26px}\n}\n@media screen and (min-width: 1021px) {\n\tbody {font-size: 28px}\n} */\n", ""]);

// exports


/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bg_list_header.ef722aa.png";

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(22))(7);

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(147);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(52)("4c05460a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.3.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-28905c66\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../node_modules/_vue-loader@13.3.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./pay.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.3.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-28905c66\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../node_modules/_vue-loader@13.3.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./pay.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(51)(undefined);
// imports
exports.i(__webpack_require__(118), "");

// module
exports.push([module.i, "\n.common-header {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 1.35185rem;\n  padding-bottom: 0.17593rem;\n  font-weight: normal;\n  background-image: url(" + __webpack_require__(119) + ");\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n}\n.common-header .btn-go-back {\n    float: right;\n    width: 1.7037rem;\n    height: 100%;\n    line-height: 1.18519rem;\n    font-size: 0.31481rem;\n    color: #515151;\n    text-align: center;\n    background: #f7f7f7;\n}\n.page-pay {\n  position: relative;\n  height: 100vh;\n  padding: 1.48148rem 0rem 0rem 0rem;\n  overflow: hidden;\n  background: #132e44;\n  font-size: 0.37037rem;\n}\n.page-pay .body {\n    color: #fff;\n    height: 100%;\n    overflow: auto;\n    text-align: center;\n    padding-bottom: 0.37037rem;\n}\n.page-pay .body .pay-box-header {\n      height: 2.77778rem;\n      padding-bottom: 0.27778rem;\n      background: url(" + __webpack_require__(148) + ") no-repeat left bottom;\n      background-size: 100% auto;\n      text-align: center;\n}\n.page-pay .body .pay-box-header .price {\n        font-size: 0.90741rem;\n        margin-left: 0.18519rem;\n}\n.page-pay .body .pay-box-header .tit {\n        font-size: 0.46296rem;\n        line-height: 1.8;\n}\n.page-pay .body .pay-box-header .unpay-header,\n      .page-pay .body .pay-box-header .payed-header {\n        height: 100%;\n        display: flex;\n}\n.page-pay .body .pay-box-header .payed-header {\n        flex-direction: column;\n        justify-content: flex-end;\n}\n.page-pay .body .pay-box-header .unpay-header {\n        height: 100%;\n        text-align: left;\n        padding-left: 12.1%;\n        padding-right: 12.1%;\n        justify-content: space-between;\n        align-items: center;\n}\n.page-pay .body .pay-box-header .unpay-header .num {\n          margin-left: 0.18519rem;\n}\n.page-pay .body .pay-result {\n      padding-top: 2.03704rem;\n}\n.page-pay .body .pay-result .remian,\n      .page-pay .body .pay-result .result-text {\n        line-height: 1.8;\n        font-size: 0.46296rem;\n        color: #00AFEC;\n}\n.page-pay .body .pay-result .remian {\n        margin-bottom: 0.55556rem;\n}\n.page-pay .body .pay-result .tip {\n        margin-bottom: 0.37037rem;\n}\n.page-pay .body .pay-result .qrcode {\n        display: block;\n        width: 5.88889rem;\n        height: 5.88889rem;\n        margin: 0 auto;\n        background-size: contain;\n        background-position: center;\n}\n.page-pay .body .pay-result .bg-result-payed,\n      .page-pay .body .pay-result .bg-result-finished {\n        width: 100%;\n        height: 6.74074rem;\n        margin-top: 1.38889rem;\n}\n.page-pay .body .pay-result .bg-result-payed {\n        background-image: url(" + __webpack_require__(149) + ");\n        background-repeat: no-repeat;\n        background-size: 100% 100%;\n}\n.page-pay .body .pay-result .bg-result-finished {\n        background-image: url(" + __webpack_require__(150) + ");\n        background-repeat: no-repeat;\n        background-size: 100% 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bg_payBody_split.805838d.png";

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bg_pay_result_payed.2cae23d.png";

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bg_pay_result_finished.a0d5c81.png";

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yao_m_ui__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yao_m_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_yao_m_ui__);



/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      loopPayTime: 60,
      loopPayTimeId: null,
      loopCloseTime: 5,
      loopCloseTimeId: null,
      mockPayStatus: 1,
      orderInfo: {
        number: 4,
        price: '40.00',
        status: 0
      },
      pageUxState: {
        dialog: null
      }
    };
  },
  methods: {
    openDialog: function openDialog(state) {
      var _this = this;

      this.destoryDialog();
      var msg;
      switch (state) {
        case 4:
          msg = '\u652F\u4ED8\u65F6\u95F4\u8D85\u65F6\uFF0C<em id="loopCloseTimeEle">' + this.loopCloseTime + '</em>\u79D2\u540E\u5C06\u5173\u95ED\u4EA4\u6613';
          this.loopCloseTimeId = setInterval(function () {
            return _this.loopCloseTimeFun();
          }, 1000);
          break;
        case 5:
          msg = '支付异常';
          break;
        default:
          break;

      }
      this.pageUxState.dialog = __WEBPACK_IMPORTED_MODULE_0_yao_m_ui__["Dialog"]({
        parentEle: document.body.querySelector('.container'),
        content: msg,
        foot: '<button class="btn-dialog-cancel">立即关闭</button><button class="btn-dialog-ok">重新支付</button>',
        afterOk: function afterOk() {
          _this.destoryDialog();
          _this.reflushLoopPay();
        },
        afterClose: function afterClose() {
          _this.destoryDialog();
          _this.goHomePage();
        }
      });
    },
    destoryDialog: function destoryDialog() {
      this.pageUxState.dialog && this.pageUxState.dialog.destory();
    },
    reflushLoopPay: function reflushLoopPay() {
      this.destroyCloseTimeLoop();
      this.destroyPayTimeLoop();
      this.loopPayTime = 60;
      this.loopCloseTime = 5;
      this.loopPayTimeId = setInterval(this.loopPayTimeFun, 1000);
    },
    loopPayTimeFun: function loopPayTimeFun() {
      if (this.loopPayTime > 0) this.loopPayTime--;else this.loopPayTimeEndCb();
    },
    loopPayTimeEndCb: function loopPayTimeEndCb() {
      this.destroyPayTimeLoop();
      this.orderInfo.status == 0 ? this.openDialog(4) : null;
    },
    loopCloseTimeFun: function loopCloseTimeFun() {
      if (this.loopCloseTime > 0) {
        var ele = document.getElementById('loopCloseTimeEle');
        ele && (ele.innerText = --this.loopCloseTime);
      } else this.loopCloseTimeEndCb();
    },
    loopCloseTimeEndCb: function loopCloseTimeEndCb() {
      this.destoryDialog();
      this.destroyCloseTimeLoop();
      this.goHomePage();
    },
    destroyPayTimeLoop: function destroyPayTimeLoop() {
      this.loopPayTimeId && clearInterval(this.loopPayTimeId);
    },
    destroyCloseTimeLoop: function destroyCloseTimeLoop() {
      this.loopCloseTimeId && clearInterval(this.loopCloseTimeId);
    },
    toPay: function toPay() {
      var _this2 = this;

      this.orderInfo.status = 1;
      if (this.mockPayStatus) setTimeout(function () {
        return _this2.payOver();
      }, 3000);
      this.mockPayStatus = null;
    },
    payOver: function payOver() {
      var _this3 = this;

      this.orderInfo.status = 2;
      setTimeout(function () {
        return _this3.finish();
      }, 3000);
    },
    finish: function finish() {
      var _this4 = this;

      this.orderInfo.status = 3;
      setTimeout(function () {
        return __WEBPACK_IMPORTED_MODULE_0_yao_m_ui__["showPrompt"]({
          msg: '已完成,正在返回首页...',
          cb: function cb() {
            return _this4.goHomePage();
          }
        });
      }, 3000);
    },
    goHomePage: function goHomePage() {
      this.$router.push({ path: '/' });
    },
    goBack: function goBack() {
      history.back();
    }
  },
  created: function created() {
    this.reflushLoopPay();
  },
  beforeDestroy: function beforeDestroy() {
    this.destroyCloseTimeLoop();
    this.destroyPayTimeLoop();
    this.destoryDialog();
  }
});

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container page-pay" }, [
    _c("h3", { staticClass: "common-header header" }, [
      _c("span", { staticClass: "btn-go-back", on: { click: _vm.goBack } }, [
        _vm._v("取消")
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "body" }, [
      _c("div", { staticClass: "pay-box-header" }, [
        _vm.orderInfo.status <= 1
          ? _c("div", { staticClass: "unpay-header" }, [
              _c("div", { staticClass: "left" }, [
                _vm._v("\n          我的订单"),
                _c("span", { staticClass: "num" }, [
                  _vm._v(_vm._s(_vm.orderInfo.number))
                ]),
                _vm._v("件\n        ")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "right" }, [
                _vm._v("\n          ¥"),
                _c("em", { staticClass: "price" }, [
                  _vm._v(_vm._s(_vm.orderInfo.price))
                ])
              ])
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.orderInfo.status == 2 || _vm.orderInfo.status == 3
          ? _c("div", { staticClass: "payed-header" }, [
              _c("p", { staticClass: "tit" }, [_vm._v("支付成功")]),
              _vm._v(" "),
              _c("p", { staticClass: "sub-tit" }, [_vm._v("感谢惠顾，欢迎下次光临")])
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "pay-result" }, [
        _vm.orderInfo.status <= 1
          ? _c("div", { staticClass: "unpay-result" }, [
              _c("p", { staticClass: "remian" }, [
                _vm._v(_vm._s(_vm.loopPayTime) + "s")
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "result-text" }, [_vm._v("等待支付")]),
              _vm._v(" "),
              _c("p", { staticClass: "tip" }, [_vm._v("请打开盒马App的付款码，对准下方扫码口")]),
              _vm._v(" "),
              _c("span", {
                staticClass: "qrcode",
                style: { backgroundImage: "url(./tmp/qrcode.png)" },
                on: { click: _vm.toPay }
              })
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.orderInfo.status == 2 || _vm.orderInfo.status == 3
          ? _c("div", { staticClass: "payed-result" }, [
              _c("h3", { staticClass: "result-text" }, [
                _vm._v(
                  "\n          " +
                    _vm._s(_vm.orderInfo.status == 2 ? "正在出货…" : "已出货") +
                    "\n        "
                )
              ]),
              _vm._v(" "),
              _c(
                "p",
                {
                  class:
                    "result-sub-text " + _vm.orderInfo.status == 3
                      ? "visibile"
                      : ""
                },
                [_vm._v("请在屏幕下方的取货口提取您的餐食")]
              ),
              _vm._v(" "),
              _vm.orderInfo.status == 3
                ? _c("div", { staticClass: "bg-result-finished" })
                : _c("div", { staticClass: "bg-result-payed" })
            ])
          : _vm._e()
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-28905c66", esExports)
  }
}

/***/ })

});