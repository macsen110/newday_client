webpackJsonp([1],{16:function(t,s,a){"use strict";function i(t){a(21)}Object.defineProperty(s,"__esModule",{value:!0});var n=a(22),e=a(23),c=a(4),o=i,r=c(n.a,e.a,!1,o,null,null);s.default=r.exports},21:function(t,s){},22:function(t,s,a){"use strict";var i=a(5);a.n(i);s.a={data:function(){return{stagnationTime:30,stagnationEndCb:null,cartListData:[],goods:[{url:"./tmp/tmp_item_0.png",name:"100ml豆浆加1个水煮鸡蛋"},{url:"./tmp/tmp_item_0.png",name:"100ml豆浆加1个水煮鸡蛋"},{url:"./tmp/tmp_item_0.png",name:"100ml豆浆加1个水煮鸡蛋"}],pageUxState:{showCartBox:!1,buyBtnDisabled:!1}}},methods:{goPay:function(){var t=this;this.pageUxState.buyBtnDisabled=!0,this.destroyStagnation(),i.showPrompt({msg:"正在创建订单...",cb:function(){return t.$router.push("pay")}})},goBack:function(){history.back()},filterList:function(t){console.log(t)},toggleCartBox:function(t){this.pageUxState.showCartBox=t},reflushStagnation:function(){var t=this;this.destroyStagnation(),this.stagnationEndCb=setTimeout(function(){return t.$router.push({path:"/"})},1e3*this.stagnationTime)},destroyStagnation:function(){this.stagnationEndCb&&clearTimeout(this.stagnationEndCb)},addCart:function(){},reduceCartArr:function(){}},created:function(){this.reflushStagnation()},beforeDestroy:function(){this.destroyStagnation()}}},23:function(t,s,a){"use strict";var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"page-list container",on:{click:t.reflushStagnation}},[a("h3",{staticClass:"common-header header"},[a("span",{staticClass:"btn-go-back",on:{click:t.goBack}},[t._v("取消")])]),t._v(" "),a("div",{staticClass:"body"},[a("ul",{staticClass:"nav"},[a("li",{staticClass:"item cur",on:{click:function(s){t.filterList("sd")}}},[t._v("套餐")]),t._v(" "),a("li",{staticClass:"item",on:{click:function(s){t.filterList("ds")}}},[t._v("食品")]),t._v(" "),a("li",{staticClass:"item",on:{click:function(s){t.filterList("ds")}}},[t._v("饮品")])]),t._v(" "),a("div",{staticClass:"list-container"},[a("h4",{staticClass:"tit"},[t._v("套餐")]),t._v(" "),a("ul",{staticClass:"list clear"},t._l(t.goods,function(s,i){return a("li",{key:i,staticClass:"item"},[a("div",{staticClass:"wrap-img"},[a("img",{attrs:{src:s.url,alt:""}})]),t._v(" "),a("h5",{staticClass:"price"},[t._v("10.00")]),t._v(" "),a("div",{staticClass:"wrap-item-info"},[a("p",{staticClass:"name"},[t._v(t._s(s.name))]),t._v(" "),t._m(0,!0)])])}))])]),t._v(" "),a("div",{staticClass:"footer"},[a("div",{staticClass:"wrap-cart-info"},[a("div",{staticClass:"cart-info"},[a("i",{staticClass:"icon-cart",on:{click:function(s){t.toggleCartBox(!0)}}},[a("em",{staticClass:"cart-number"},[t._v("5")])]),t._v(" "),t._m(1)]),t._v(" "),a("button",{staticClass:"btn",attrs:{disabled:t.pageUxState.buyBtnDisabled},on:{click:t.goPay}},[t._v("去结算")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.pageUxState.showCartBox,expression:"pageUxState.showCartBox"}],staticClass:"cart-items-box"},[a("h4",{staticClass:"head"},[a("i",{staticClass:"icon close",on:{click:function(s){t.toggleCartBox(!1)}}})]),t._v(" "),t._m(2)])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.pageUxState.showCartBox,expression:"pageUxState.showCartBox"}],staticClass:"widget-mask",on:{click:function(s){t.toggleCartBox(!1)}}})])},n=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"wrap-sku"},[a("i",{staticClass:"tag hot"},[t._v("暖")]),t._v(" "),a("div",{staticClass:"wrap-actions"},[a("i",{staticClass:"icon icon-reduce"}),t._v(" "),a("em",{staticClass:"numbers"},[t._v("2")]),t._v(" "),a("i",{staticClass:"icon icon-plus"})])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("共计:"),a("strong",{staticClass:"total-price"},[t._v("0.00")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ul",{staticClass:"item-list"},[a("li",{staticClass:"item"},[a("span",{staticClass:"name"},[t._v("100ml豆浆加1个水煮蛋")]),t._v(" "),a("strong",{staticClass:"price"},[t._v("¥10.00")]),t._v(" "),a("div",{staticClass:"wrap-actions"},[a("i",{staticClass:"icon icon-reduce"}),t._v(" "),a("em",{staticClass:"numbers"},[t._v("2")]),t._v(" "),a("i",{staticClass:"icon icon-plus"})])])])}],e={render:i,staticRenderFns:n};s.a=e}});