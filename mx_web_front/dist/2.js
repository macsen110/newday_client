webpackJsonp([2],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_3_0_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_3_0_vue_loader_lib_template_compiler_index_id_data_v_f52203e0_hasScoped_false_buble_transforms_node_modules_vue_loader_13_3_0_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__ = __webpack_require__(128);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(124)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_3_0_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_3_0_vue_loader_lib_template_compiler_index_id_data_v_f52203e0_hasScoped_false_buble_transforms_node_modules_vue_loader_13_3_0_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f52203e0", Component.options)
  } else {
    hotAPI.reload("data-v-f52203e0", Component.options)
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

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_warm.62587db.png";

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(125);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(52)("f324a64c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.3.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f52203e0\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js?indentedSyntax!../../node_modules/_vue-loader@13.3.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.3.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f52203e0\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js?indentedSyntax!../../node_modules/_vue-loader@13.3.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(51)(undefined);
// imports
exports.i(__webpack_require__(118), "");

// module
exports.push([module.i, "\n@charset \"UTF-8\";\n.common-header {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 1.35185rem;\n  padding-bottom: 0.17593rem;\n  font-weight: normal;\n  background-image: url(" + __webpack_require__(119) + ");\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n}\n.common-header .btn-go-back {\n    float: right;\n    width: 1.7037rem;\n    height: 100%;\n    line-height: 1.18519rem;\n    font-size: 0.31481rem;\n    color: #515151;\n    text-align: center;\n    background: #f7f7f7;\n}\n.page-index {\n  background-color: #132e44;\n  padding: 0rem 0rem 2.22222rem 0rem;\n  overflow: auto;\n  overflow-x: hidden;\n}\n.page-index .bg-header {\n    height: 9.33333rem;\n    background-image: url(" + __webpack_require__(126) + ");\n    background-repeat: no-repeat;\n    background-size: 100% 100%;\n    color: #FF5F28;\n}\n.page-index .section-box {\n    height: 3.88889rem;\n    margin: 0.92593rem 0rem 0rem 0rem;\n    color: #fff;\n    background-image: -webkit-gradient(linear, 0 0, 0 100%, color-stop(0.2, transparent), color-stop(0.2, #FF730D), color-stop(0.96, #FF730D), color-stop(0.96, #C84625));\n}\n.page-index .section-box .list {\n      display: flex;\n      flex-wrap: nowrap;\n      overflow-x: auto;\n}\n.page-index .section-box .item {\n      flex-shrink: 0;\n      width: 3.22222rem;\n      margin-left: 0.44444rem;\n}\n.page-index .section-box .item img {\n        display: block;\n        width: 100%;\n        height: 2.40741rem;\n        margin: 0rem 0rem 0.18519rem 0rem;\n}\n.page-index .section-box .item .item-info-box {\n        display: flex;\n        justify-content: space-between;\n        font-size: 0.25926rem;\n}\n.page-index .section-box .item .price {\n        font-size: 0.37037rem;\n}\n.page-index .section-box .item .price:before {\n          font-size: 0.25926rem;\n          content: '\\A5';\n}\n.page-index .section-box .item .tag {\n        width: 0.92593rem;\n        height: 0.42593rem;\n        line-height: 0.42593rem;\n        text-align: center;\n        background: #FFFFFF;\n        border-radius: 0.5rem;\n        font-size: 0.22222rem;\n}\n.page-index .section-box .item .tag::before {\n          content: '';\n          display: inline-block;\n          width: 0.21296rem;\n          height: 0.25926rem;\n          vertical-align: middle;\n}\n.page-index .section-box .item .tag.hot {\n          color: #F1561B;\n}\n.page-index .section-box .item .tag.hot::before {\n            margin: 0rem 0.07407rem 0rem 0rem;\n            background-image: url(" + __webpack_require__(120) + ");\n            background-repeat: no-repeat;\n            background-size: 100% 100%;\n}\n.page-index .footer {\n    position: fixed;\n    bottom: 0;\n    left: 50%;\n    transform: translate3d(-50%, 0, 0);\n    width: 10rem;\n    height: 2.18519rem;\n    line-height: 2.18519rem;\n    font-size: 0.48148rem;\n    color: #fff;\n    text-align: center;\n    background-image: linear-gradient(-227deg, #13C1FF 0%, #009AFF 100%);\n}\n", ""]);

// exports


/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bg_index_breakfirst.a2cfa0f.gif";

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      randomGoods: [{
        'id': 10,
        url: './tmp/tmp_item_0.png',
        name: '水煮鸡蛋',
        price: '20.00',
        tagName: '暖'

      }, {
        'id': 11,
        url: './tmp/tmp_item_0.png',
        name: '水煮鸡蛋',
        price: '10.00',
        tagName: '暖'
      }, {
        'id': 12,
        url: './tmp/tmp_item_0.png',
        name: '水煮鸡蛋',
        price: '20.10',
        tagName: '暖'
      }]
    };
  },

  methods: {
    goList: function goList() {
      this.$router.push('list');
    }
  }
});

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container page-index", on: { click: _vm.goList } },
    [
      _c("h3", { staticClass: "bg-header" }),
      _vm._v(" "),
      _c("div", { staticClass: "section-box clear" }, [
        _c(
          "ul",
          { staticClass: "list" },
          _vm._l(_vm.randomGoods, function(item) {
            return _c("li", { key: item.id, staticClass: "item" }, [
              _c("img", { attrs: { src: item.url } }),
              _vm._v(" "),
              _c("div", { staticClass: "item-info-box" }, [
                _c("div", { staticClass: "info" }, [
                  _c("p", { staticClass: "name" }, [_vm._v(_vm._s(item.name))]),
                  _vm._v(" "),
                  _c("p", { staticClass: "price" }, [
                    _vm._v(_vm._s(item.price))
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "tag hot" }, [
                  _vm._v(_vm._s(item.tagName))
                ])
              ])
            ])
          })
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "footer" }, [_vm._v("点击屏幕开始点餐")])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-f52203e0", esExports)
  }
}

/***/ })

});