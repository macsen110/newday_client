webpackJsonp([0],{

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_3_0_vue_loader_lib_selector_type_script_index_0_bustCache_list_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_3_0_vue_loader_lib_template_compiler_index_id_data_v_2ab60860_hasScoped_false_buble_transforms_node_modules_vue_loader_13_3_0_vue_loader_lib_selector_type_template_index_0_bustCache_list_vue__ = __webpack_require__(145);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(129)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_3_0_vue_loader_lib_selector_type_script_index_0_bustCache_list_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_3_0_vue_loader_lib_template_compiler_index_id_data_v_2ab60860_hasScoped_false_buble_transforms_node_modules_vue_loader_13_3_0_vue_loader_lib_selector_type_template_index_0_bustCache_list_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2ab60860", Component.options)
  } else {
    hotAPI.reload("data-v-2ab60860", Component.options)
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

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(22))(7);

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_cross.26689aa.png";

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(22))(1);

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(130);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(52)("32dffe59", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.3.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2ab60860\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../node_modules/_vue-loader@13.3.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./list.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.3.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2ab60860\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../node_modules/_vue-loader@13.3.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(51)(undefined);
// imports
exports.i(__webpack_require__(118), "");

// module
exports.push([module.i, "\n@charset \"UTF-8\";\n.common-header {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 1.35185rem;\n  padding-bottom: 0.17593rem;\n  font-weight: normal;\n  background-image: url(" + __webpack_require__(119) + ");\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n}\n.common-header .btn-go-back {\n    float: right;\n    width: 1.7037rem;\n    height: 100%;\n    line-height: 1.18519rem;\n    font-size: 0.31481rem;\n    color: #515151;\n    text-align: center;\n    background: #f7f7f7;\n}\n.page-list {\n  position: relative;\n  height: 100vh;\n  padding: 1.48148rem 0rem 2.22222rem 0rem;\n  overflow: hidden;\n  background: #fafafa;\n}\n.page-list .body {\n    height: 100%;\n    overflow: auto;\n    padding-left: 2.22222rem;\n}\n.page-list .nav {\n    position: absolute;\n    left: 0;\n    width: 1.74074rem;\n}\n.page-list .nav .item {\n      position: relative;\n      display: block;\n      text-align: center;\n      height: 1.25926rem;\n      line-height: 1.25926rem;\n      font-size: 0.31481rem;\n      background: #fff;\n}\n.page-list .nav .item:before {\n        content: '';\n        position: absolute;\n        left: 0;\n        top: 0;\n        bottom: 0;\n        width: 0.22222rem;\n}\n.page-list .nav .item.cur {\n        background: transparent;\n}\n.page-list .nav .item.cur:before {\n          background: #00AFEC;\n          box-shadow: 0 0 0.11111rem 0 #BBDFEC;\n}\n.page-list .list-container .tit {\n    font-family: PingFangSC-Regular;\n    font-size: 0.2963rem;\n    color: #B4B4B4;\n    margin: 0rem 0rem 0.2037rem 0rem;\n}\n.page-list .list-container .list > .item {\n    float: left;\n    position: relative;\n    width: 3.40741rem;\n    height: 4.61111rem;\n    margin: 0rem 0.37037rem 0.37037rem 0rem;\n    background: #FFFFFF;\n    border-radius: 0.08333rem;\n}\n.page-list .list-container .list .wrap-img {\n    height: 2.57407rem;\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n}\n.page-list .list-container .list .wrap-img > img {\n      display: block;\n      width: 1.75926rem;\n      height: 2.09259rem;\n}\n.page-list .list-container .list .price {\n    position: absolute;\n    top: 2.2963rem;\n    left: 0;\n    width: 1.98148rem;\n    height: 0.55556rem;\n    padding: 0rem 0rem 0rem 0.22222rem;\n    line-height: 0.55556rem;\n    font-size: 0.37037rem;\n    color: #fff;\n    border-radius: 0 0.55556rem 0.55556rem 0;\n    background: #FF5F28;\n}\n.page-list .list-container .list .price:before {\n      font-size: 0.25926rem;\n      content: '\\A5';\n}\n.page-list .list-container .list .wrap-item-info {\n    height: 2.03704rem;\n    padding: 0.27778rem 0.22222rem 0rem 0rem;\n}\n.page-list .list-container .list .wrap-sku {\n    height: 0.83333rem;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n.page-list .list-container .list .wrap-sku > * {\n      display: block;\n}\n.page-list .list-container .list .wrap-sku .tag {\n      font-size: 0.22222rem;\n}\n.page-list .list-container .list .wrap-sku .tag::before {\n        content: '';\n        display: inline-block;\n        width: 0.21296rem;\n        height: 0.25926rem;\n}\n.page-list .list-container .list .wrap-sku .tag.hot {\n        color: #F1561B;\n}\n.page-list .list-container .list .wrap-sku .tag.hot::before {\n          margin-right: 0.07407rem;\n          background-image: url(" + __webpack_require__(120) + ");\n          background-repeat: no-repeat;\n          background-size: 100% 100%;\n}\n.page-list .list-container .list .name {\n    height: 0.92593rem;\n    line-height: 0.46296rem;\n    overflow: hidden;\n    font-family: PingFangSC-Regular;\n    font-size: 0.31481rem;\n    color: #051B28;\n}\n.page-list .footer {\n    z-index: 12;\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 2.22222rem;\n    padding: 0.25926rem 0.51852rem 0.25926rem 1.2963rem;\n    background: #132E44;\n    box-shadow: 0 -0.05556rem 0.24074rem 0 rgba(137, 137, 137, 0.5);\n}\n.page-list .footer .wrap-cart-info {\n      position: relative;\n      height: 100%;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n}\n.page-list .footer .wrap-cart-info > * {\n      display: block;\n      color: #fff;\n}\n.page-list .footer .btn {\n      width: 3.42593rem;\n      height: 1.7037rem;\n      line-height: 1.7037rem;\n      text-align: center;\n      background-image: linear-gradient(-180deg, #13C1FF 0%, #009AFF 100%);\n      border-radius: 0.12963rem;\n      font-size: 0.46296rem;\n}\n.page-list .footer .btn:disabled {\n        background-image: linear-gradient(-180deg, #545D64 5%, #434E57 96%);\n        color: #133149;\n}\n.page-list .footer .cart-info .icon-cart {\n      position: relative;\n      display: block;\n      width: 0.85185rem;\n      height: 0.85185rem;\n      background-image: url(" + __webpack_require__(131) + ");\n      background-repeat: no-repeat;\n      background-size: 100% 100%;\n}\n.page-list .footer .cart-info .icon-cart .cart-number {\n        position: absolute;\n        top: -0.27778rem;\n        right: -0.27778rem;\n        width: 0.61111rem;\n        height: 0.61111rem;\n        line-height: 0.61111rem;\n        border-radius: 50%;\n        text-align: center;\n        font-size: 0.37037rem;\n        background: #FF7B28;\n}\n.page-list .footer .cart-info .total-price {\n      font-size: 0.59259rem;\n}\n.page-list .footer .cart-info .total-price:before {\n        font-size: 0.2963rem;\n        content: '\\A5';\n        margin: 0 0.09259rem 0 0.18519rem;\n}\n.page-list .footer .cart-items-box {\n      position: absolute;\n      left: 0;\n      bottom: 2.22222rem;\n      width: 100%;\n      padding-left: 0.83333rem;\n      background: #FFFFFF;\n      box-shadow: 0 -0.05556rem 0.24074rem 0 rgba(0, 0, 0, 0.13);\n      border-radius: 0.18519rem 0.18519rem 0 0;\n}\n.page-list .footer .cart-items-box.show {\n        display: block;\n}\n.page-list .footer .cart-items-box .head {\n        padding: 0.25926rem;\n        padding-left: 0;\n        padding-bottom: 0;\n        text-align: right;\n}\n.page-list .footer .cart-items-box .head .close {\n          display: inline-block;\n          width: 0.18519rem;\n          height: 0.18519rem;\n          margin-right: 0.07407rem;\n          background-image: url(" + __webpack_require__(122) + ");\n          background-repeat: no-repeat;\n          background-size: 100% 100%;\n}\n.page-list .footer .cart-items-box .item-list {\n        max-height: 4.81481rem;\n        overflow: auto;\n}\n.page-list .footer .cart-items-box .item-list > .item {\n          height: 0.96296rem;\n          padding: 0.25926rem 0.74074rem 0.25926rem 0.14815rem;\n          border-bottom: 1px solid #EDEDED;\n          display: flex;\n          justify-content: space-between;\n          align-items: center;\n          color: #051B28;\n}\n.page-list .footer .cart-items-box .item-list > .item:last-child {\n            border-bottom: 0 none;\n}\n.page-list .footer .cart-items-box .item-list .name,\n        .page-list .footer .cart-items-box .item-list .price,\n        .page-list .footer .cart-items-box .item-list .wrap-actions {\n          display: block;\n}\n.page-list .footer .cart-items-box .item-list .name {\n          width: 4.07407rem;\n}\n.page-list .wrap-actions {\n    height: 0.44444rem;\n}\n.page-list .wrap-actions .icon-reduce,\n    .page-list .wrap-actions .icon-plus {\n      display: inline-block;\n      width: 0.44444rem;\n      height: 0.44444rem;\n      vertical-align: middle;\n}\n.page-list .wrap-actions .icon-reduce {\n      background-image: url(" + __webpack_require__(132) + ");\n      background-repeat: no-repeat;\n      background-size: 100% 100%;\n}\n.page-list .wrap-actions .icon-plus {\n      background-image: url(" + __webpack_require__(133) + ");\n      background-repeat: no-repeat;\n      background-size: 100% 100%;\n}\n.page-list .wrap-actions .numbers {\n      display: inline-block;\n      min-width: 0.74074rem;\n      vertical-align: middle;\n      text-align: center;\n}\n.page-list .wrap-actions .numbers:before {\n        content: '';\n        display: inline-block;\n        width: 0.18519rem;\n        height: 0.18519rem;\n        margin-right: 0.07407rem;\n        background-image: url(" + __webpack_require__(122) + ");\n        background-repeat: no-repeat;\n        background-size: 100% 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_cart.2dd5c2f.png";

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_less.37cc5af.png";

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_more.b29c991.png";

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_yao_m_ui__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_yao_m_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_yao_m_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_xhr__ = __webpack_require__(58);






/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      stagnationTime: 30 * 100,
      stagnationEndCb: null,
      cartListData: [],
      cateGoryList: [],
      curFilterCatIndex: 0,
      curFilterCatTitle: '',
      goods: [],

      pageUxState: {
        showCartBox: false,
        buyBtnDisabled: false
      }
    };
  },
  methods: {
    goPay: function goPay() {
      var _this = this;

      this.pageUxState.buyBtnDisabled = true;
      this.destroyStagnation();
      __WEBPACK_IMPORTED_MODULE_2_yao_m_ui__["showPrompt"]({
        msg: '正在创建订单...',
        cb: function cb() {
          return _this.$router.push('pay');
        }
      });
    },
    goBack: function goBack() {
      history.back();
    },
    toggleCartBox: function toggleCartBox(flag) {
      this.pageUxState.showCartBox = flag;
    },
    reflushStagnation: function reflushStagnation() {
      var _this2 = this;

      this.destroyStagnation();
      this.stagnationEndCb = setTimeout(function () {
        return _this2.$router.push({ path: '/' });
      }, this.stagnationTime * 1000);
    },
    destroyStagnation: function destroyStagnation() {
      this.stagnationEndCb && clearTimeout(this.stagnationEndCb);
    },
    addCart: function addCart() {},
    reduceCartArr: function reduceCartArr() {},
    filterListByCatId: function filterListByCatId(catId, index, catName) {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
        var ajaxData;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return APP.utils.http({
                  url: '?cmd=GetPlistByCategoryId&param={"categoryId":"' + catId + '","sess":"aaa"}'
                });

              case 2:
                ajaxData = _context.sent;

                ajaxData = _this3.filterAjaxData(ajaxData);
                if (ajaxData) {
                  _this3.goods = ajaxData.goods;
                  _this3.curFilterCatIndex = index;
                  _this3.curFilterCatTitle = catName;
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this3);
      }))();
    },
    initCateGoryList: function initCateGoryList() {
      var _this4 = this;

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var ajaxData;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this4.getCateGoryList();

              case 2:
                ajaxData = _context2.sent;

                ajaxData = _this4.filterAjaxData(ajaxData);
                if (ajaxData) {
                  _this4.cateGoryList = ajaxData.categories;
                  _this4.filterListByCatId(_this4.cateGoryList[0].id, 0);
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this4);
      }))();
    },
    getCateGoryList: function getCateGoryList() {
      return APP.utils.http({
        url: '?cmd=GetCategoryList&param={"sess":"aaa"}'
      });
    },
    filterAjaxData: function filterAjaxData(data) {
      if (data.status == 'ok') return data.result;else {
        __WEBPACK_IMPORTED_MODULE_2_yao_m_ui__["showPrompt"](data.msg);
        return false;
      }
    }
  },

  created: function created() {
    this.initCateGoryList();
    this.reflushStagnation();
  },
  beforeDestroy: function beforeDestroy() {
    this.destroyStagnation();
  }
});

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(136);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

module.exports = { "default": module.exports, __esModule: true };

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(123)))

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */



var _Symbol = __webpack_require__(56)["default"];

var _Object$create = __webpack_require__(137)["default"];

var _Object$setPrototypeOf = __webpack_require__(140)["default"];

var _Promise = __webpack_require__(54)["default"];

!(function (global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof _Symbol === "function" ? _Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = _Object$create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (_Object$setPrototypeOf) {
      _Object$setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = _Object$create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function (arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value instanceof AwaitArgument) {
          return _Promise.resolve(value.arg).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return _Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new _Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }
        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(123), __webpack_require__(55)))

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(139);
var $Object = __webpack_require__(2).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(33) });


/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(142);
module.exports = __webpack_require__(2).Object.setPrototypeOf;


/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(6);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(143).set });


/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(9);
var anObject = __webpack_require__(3);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(14)(Function.call, __webpack_require__(57).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(54);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            return step("next", value);
          }, function (err) {
            return step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "page-list container",
      on: { click: _vm.reflushStagnation }
    },
    [
      _c("h3", { staticClass: "common-header header" }, [
        _c("span", { staticClass: "btn-go-back", on: { click: _vm.goBack } }, [
          _vm._v("取消")
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "body" }, [
        _c(
          "ul",
          { staticClass: "nav" },
          _vm._l(_vm.cateGoryList, function(item, index) {
            return _c(
              "li",
              {
                key: index,
                class: index == _vm.curFilterCatIndex ? "item cur" : "item",
                on: {
                  click: function($event) {
                    _vm.filterListByCatId(item.id, index, item.val)
                  }
                }
              },
              [_vm._v(_vm._s(item.val))]
            )
          })
        ),
        _vm._v(" "),
        _c("div", { staticClass: "list-container" }, [
          _c("h4", { staticClass: "tit" }, [
            _vm._v(_vm._s(_vm.curFilterCatTitle))
          ]),
          _vm._v(" "),
          _c(
            "ul",
            { staticClass: "list clear" },
            _vm._l(_vm.goods, function(item, index) {
              return _c("li", { key: index, staticClass: "item" }, [
                _c("div", { staticClass: "wrap-img" }, [
                  _c("img", { attrs: { src: item.pic, alt: "" } })
                ]),
                _vm._v(" "),
                _c("h5", { staticClass: "price" }, [
                  _vm._v(_vm._s(item.price))
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "wrap-item-info" }, [
                  _c("p", { staticClass: "name" }, [_vm._v(_vm._s(item.name))]),
                  _vm._v(" "),
                  _vm._m(0, true)
                ])
              ])
            })
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "footer" }, [
        _c("div", { staticClass: "wrap-cart-info" }, [
          _c("div", { staticClass: "cart-info" }, [
            _c(
              "i",
              {
                staticClass: "icon-cart",
                on: {
                  click: function($event) {
                    _vm.toggleCartBox(true)
                  }
                }
              },
              [_c("em", { staticClass: "cart-number" }, [_vm._v("5")])]
            ),
            _vm._v(" "),
            _vm._m(1)
          ]),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn",
              attrs: { disabled: _vm.pageUxState.buyBtnDisabled },
              on: { click: _vm.goPay }
            },
            [_vm._v("去结算")]
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.pageUxState.showCartBox,
                expression: "pageUxState.showCartBox"
              }
            ],
            staticClass: "cart-items-box"
          },
          [
            _c("h4", { staticClass: "head" }, [
              _c("i", {
                staticClass: "icon close",
                on: {
                  click: function($event) {
                    _vm.toggleCartBox(false)
                  }
                }
              })
            ]),
            _vm._v(" "),
            _vm._m(2)
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.pageUxState.showCartBox,
            expression: "pageUxState.showCartBox"
          }
        ],
        staticClass: "widget-mask",
        on: {
          click: function($event) {
            _vm.toggleCartBox(false)
          }
        }
      })
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "wrap-sku" }, [
      _c("i", { staticClass: "tag hot" }, [_vm._v("暖")]),
      _vm._v(" "),
      _c("div", { staticClass: "wrap-actions" }, [
        _c("i", { staticClass: "icon icon-reduce" }),
        _vm._v(" "),
        _c("em", { staticClass: "numbers" }, [_vm._v("2")]),
        _vm._v(" "),
        _c("i", { staticClass: "icon icon-plus" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v("共计:"),
      _c("strong", { staticClass: "total-price" }, [_vm._v("0.00")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", { staticClass: "item-list" }, [
      _c("li", { staticClass: "item" }, [
        _c("span", { staticClass: "name" }, [_vm._v("100ml豆浆加1个水煮蛋")]),
        _vm._v(" "),
        _c("strong", { staticClass: "price" }, [_vm._v("¥10.00")]),
        _vm._v(" "),
        _c("div", { staticClass: "wrap-actions" }, [
          _c("i", { staticClass: "icon icon-reduce" }),
          _vm._v(" "),
          _c("em", { staticClass: "numbers" }, [_vm._v("2")]),
          _vm._v(" "),
          _c("i", { staticClass: "icon icon-plus" })
        ])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "item" }, [
        _c("span", { staticClass: "name" }, [_vm._v("100ml豆浆加1个水煮蛋")]),
        _vm._v(" "),
        _c("strong", { staticClass: "price" }, [_vm._v("¥10.00")]),
        _vm._v(" "),
        _c("div", { staticClass: "wrap-actions" }, [
          _c("i", { staticClass: "icon icon-reduce" }),
          _vm._v(" "),
          _c("em", { staticClass: "numbers" }, [_vm._v("2")]),
          _vm._v(" "),
          _c("i", { staticClass: "icon icon-plus" })
        ])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "item" }, [
        _c("span", { staticClass: "name" }, [_vm._v("100ml豆浆加1个水煮蛋")]),
        _vm._v(" "),
        _c("strong", { staticClass: "price" }, [_vm._v("¥10.00")]),
        _vm._v(" "),
        _c("div", { staticClass: "wrap-actions" }, [
          _c("i", { staticClass: "icon icon-reduce" }),
          _vm._v(" "),
          _c("em", { staticClass: "numbers" }, [_vm._v("2")]),
          _vm._v(" "),
          _c("i", { staticClass: "icon icon-plus" })
        ])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "item" }, [
        _c("span", { staticClass: "name" }, [_vm._v("100ml豆浆加1个水煮蛋")]),
        _vm._v(" "),
        _c("strong", { staticClass: "price" }, [_vm._v("¥10.00")]),
        _vm._v(" "),
        _c("div", { staticClass: "wrap-actions" }, [
          _c("i", { staticClass: "icon icon-reduce" }),
          _vm._v(" "),
          _c("em", { staticClass: "numbers" }, [_vm._v("2")]),
          _vm._v(" "),
          _c("i", { staticClass: "icon icon-plus" })
        ])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "item" }, [
        _c("span", { staticClass: "name" }, [_vm._v("100ml豆浆加1个水煮蛋")]),
        _vm._v(" "),
        _c("strong", { staticClass: "price" }, [_vm._v("¥10.00")]),
        _vm._v(" "),
        _c("div", { staticClass: "wrap-actions" }, [
          _c("i", { staticClass: "icon icon-reduce" }),
          _vm._v(" "),
          _c("em", { staticClass: "numbers" }, [_vm._v("2")]),
          _vm._v(" "),
          _c("i", { staticClass: "icon icon-plus" })
        ])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "item" }, [
        _c("span", { staticClass: "name" }, [_vm._v("100ml豆浆加1个水煮蛋")]),
        _vm._v(" "),
        _c("strong", { staticClass: "price" }, [_vm._v("¥10.00")]),
        _vm._v(" "),
        _c("div", { staticClass: "wrap-actions" }, [
          _c("i", { staticClass: "icon icon-reduce" }),
          _vm._v(" "),
          _c("em", { staticClass: "numbers" }, [_vm._v("2")]),
          _vm._v(" "),
          _c("i", { staticClass: "icon icon-plus" })
        ])
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-2ab60860", esExports)
  }
}

/***/ })

});