webpackJsonp([0],{116:function(t,e,r){"use strict";function n(t){r(121)}Object.defineProperty(e,"__esModule",{value:!0});var i=r(122),o=r(133),a=r(53),s=n,c=a(i.a,o.a,!1,s,null,null);e.default=c.exports},121:function(t,e){},122:function(t,e,r){"use strict";var n=r(123),i=r.n(n),o=r(132),a=r.n(o),s=r(54);r.n(s),r(58);e.a={data:function(){return{stagnationTime:3e3,stagnationEndCb:null,cartListData:[],cateGoryList:[],curFilterIndex:0,goods:[],pageUxState:{showCartBox:!1,buyBtnDisabled:!1}}},methods:{goPay:function(){var t=this;this.pageUxState.buyBtnDisabled=!0,this.destroyStagnation(),s.showPrompt({msg:"正在创建订单...",cb:function(){return t.$router.push("pay")}})},goBack:function(){history.back()},toggleCartBox:function(t){this.pageUxState.showCartBox=t},reflushStagnation:function(){var t=this;this.destroyStagnation(),this.stagnationEndCb=setTimeout(function(){return t.$router.push({path:"/"})},1e3*this.stagnationTime)},destroyStagnation:function(){this.stagnationEndCb&&clearTimeout(this.stagnationEndCb)},addCart:function(){},reduceCartArr:function(){},filterListByCatId:function(t,e){var r=this;return a()(i.a.mark(function n(){var o;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,APP.utils.http({url:'?cmd=GetPlistByCategoryId&param={"categoryId":"'+t+'","sess":"aaa"}'});case 2:o=n.sent,o=r.filterAjaxData(o),o&&(r.goods=o.goods,r.curFilterIndex=e);case 5:case"end":return n.stop()}},n,r)}))()},initCateGoryList:function(){var t=this;return a()(i.a.mark(function e(){var r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getCateGoryList();case 2:r=e.sent,r=t.filterAjaxData(r),r&&(t.cateGoryList=r.categories,t.filterListByCatId(t.cateGoryList[0].id,0));case 5:case"end":return e.stop()}},e,t)}))()},getCateGoryList:function(){return APP.utils.http({url:'?cmd=GetCategoryList&param={"sess":"aaa"}'})},filterAjaxData:function(t){return"ok"==t.status?t.result:(s.showPrompt(t.msg),!1)}},created:function(){this.initCateGoryList(),this.reflushStagnation()},beforeDestroy:function(){this.destroyStagnation()}}},123:function(t,e,r){(function(e){var n="object"==typeof e?e:"object"==typeof window?window:"object"==typeof self?self:this,i=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,o=i&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,t.exports=r(124),i)n.regeneratorRuntime=o;else try{delete n.regeneratorRuntime}catch(t){n.regeneratorRuntime=void 0}t.exports={default:t.exports,__esModule:!0}}).call(e,r(33))},124:function(t,e,r){"use strict";(function(e,n){var i=r(56).default,o=r(125).default,a=r(128).default,s=r(55).default;!function(e){function r(t,e,r,n){var i=o((e||u).prototype),a=new m(n||[]);return i._invoke=d(t,r,a),i}function c(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}function u(){}function l(){}function f(){}function h(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function p(t){this.arg=t}function v(t){function e(r,n,i,o){var a=c(t[r],t,n);if("throw"!==a.type){var u=a.arg,l=u.value;return l instanceof p?s.resolve(l.arg).then(function(t){e("next",t,i,o)},function(t){e("throw",t,i,o)}):s.resolve(l).then(function(t){u.value=t,i(u)},o)}o(a.arg)}function r(t,r){function n(){return new s(function(n,i){e(t,r,n,i)})}return i=i?i.then(n,n):n()}"object"==typeof n&&n.domain&&(e=n.domain.bind(e));var i;this._invoke=r}function d(t,e,r){var n=S;return function(i,o){if(n===G)throw new Error("Generator is already running");if(n===O){if("throw"===i)throw o;return w()}for(;;){var a=r.delegate;if(a){if("return"===i||"throw"===i&&a.iterator[i]===x){r.delegate=null;var s=a.iterator.return;if(s){var u=c(s,a.iterator,o);if("throw"===u.type){i="throw",o=u.arg;continue}}if("return"===i)continue}var u=c(a.iterator[i],a.iterator,o);if("throw"===u.type){r.delegate=null,i="throw",o=u.arg;continue}i="next",o=x;var l=u.arg;if(!l.done)return n=B,l;r[a.resultName]=l.value,r.next=a.nextLoc,r.delegate=null}if("next"===i)r.sent=n===B?o:x;else if("throw"===i){if(n===S)throw n=O,o;r.dispatchException(o)&&(i="next",o=x)}else"return"===i&&r.abrupt("return",o);n=G;var u=c(t,e,r);if("normal"===u.type){n=r.done?O:B;var l={value:u.arg,done:r.done};if(u.arg!==P)return l;r.delegate&&"next"===i&&(o=x)}else"throw"===u.type&&(n=O,i="throw",o=u.arg)}}}function y(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function g(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function m(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(y,this),this.reset(!0)}function _(t){if(t){var e=t[L];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(C.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=x,e.done=!0,e};return n.next=n}}return{next:w}}function w(){return{value:x,done:!0}}var x,C=Object.prototype.hasOwnProperty,b="function"==typeof i?i:{},L=b.iterator||"@@iterator",E=b.toStringTag||"@@toStringTag",k="object"==typeof t,j=e.regeneratorRuntime;if(j)return void(k&&(t.exports=j));j=e.regeneratorRuntime=k?t.exports:{},j.wrap=r;var S="suspendedStart",B="suspendedYield",G="executing",O="completed",P={},N=f.prototype=u.prototype;l.prototype=N.constructor=f,f.constructor=l,f[E]=l.displayName="GeneratorFunction",j.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===l||"GeneratorFunction"===(e.displayName||e.name))},j.mark=function(t){return a?a(t,f):(t.__proto__=f,E in t||(t[E]="GeneratorFunction")),t.prototype=o(N),t},j.awrap=function(t){return new p(t)},h(v.prototype),j.async=function(t,e,n,i){var o=new v(r(t,e,n,i));return j.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},h(N),N[L]=function(){return this},N[E]="Generator",N.toString=function(){return"[object Generator]"},j.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},j.values=_,m.prototype={constructor:m,reset:function(t){if(this.prev=0,this.next=0,this.sent=x,this.done=!1,this.delegate=null,this.tryEntries.forEach(g),!t)for(var e in this)"t"===e.charAt(0)&&C.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=x)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){function e(e,n){return o.type="throw",o.arg=t,r.next=e,!!n}if(this.done)throw t;for(var r=this,n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],o=i.completion;if("root"===i.tryLoc)return e("end");if(i.tryLoc<=this.prev){var a=C.call(i,"catchLoc"),s=C.call(i,"finallyLoc");if(a&&s){if(this.prev<i.catchLoc)return e(i.catchLoc,!0);if(this.prev<i.finallyLoc)return e(i.finallyLoc)}else if(a){if(this.prev<i.catchLoc)return e(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return e(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&C.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?this.next=i.finallyLoc:this.complete(o),P},complete:function(t,e){if("throw"===t.type)throw t.arg;"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=t.arg,this.next="end"):"normal"===t.type&&e&&(this.next=e)},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),g(r),P}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;g(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:_(t),resultName:e,nextLoc:r},P}}}("object"==typeof e?e:"object"==typeof window?window:"object"==typeof self?self:void 0)}).call(e,r(33),r(34))},125:function(t,e,r){t.exports={default:r(126),__esModule:!0}},126:function(t,e,r){r(127);var n=r(2).Object;t.exports=function(t,e){return n.create(t,e)}},127:function(t,e,r){var n=r(6);n(n.S,"Object",{create:r(35)})},128:function(t,e,r){t.exports={default:r(129),__esModule:!0}},129:function(t,e,r){r(130),t.exports=r(2).Object.setPrototypeOf},130:function(t,e,r){var n=r(6);n(n.S,"Object",{setPrototypeOf:r(131).set})},131:function(t,e,r){var n=r(9),i=r(3),o=function(t,e){if(i(t),!n(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,n){try{n=r(14)(Function.call,r(57).f(Object.prototype,"__proto__").set,2),n(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,r){return o(t,r),e?t.__proto__=r:n(t,r),t}}({},!1):void 0),check:o}},132:function(t,e,r){"use strict";e.__esModule=!0;var n=r(55),i=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=function(t){return function(){var e=t.apply(this,arguments);return new i.default(function(t,r){function n(o,a){try{var s=e[o](a),c=s.value}catch(t){return void r(t)}if(!s.done)return i.default.resolve(c).then(function(t){return n("next",t)},function(t){return n("throw",t)});t(c)}return n("next")})}}},133:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"page-list container",on:{click:t.reflushStagnation}},[r("h3",{staticClass:"common-header header"},[r("span",{staticClass:"btn-go-back",on:{click:t.goBack}},[t._v("取消")])]),t._v(" "),r("div",{staticClass:"body"},[r("ul",{staticClass:"nav"},t._l(t.cateGoryList,function(e,n){return r("li",{key:n,class:n==t.curFilterIndex?"item cur":"item",on:{click:function(r){t.filterListByCatId(e.id,n)}}},[t._v(t._s(e.val))])})),t._v(" "),r("div",{staticClass:"list-container"},[r("h4",{staticClass:"tit"},[t._v("套餐")]),t._v(" "),r("ul",{staticClass:"list clear"},t._l(t.goods,function(e,n){return r("li",{key:n,staticClass:"item"},[r("div",{staticClass:"wrap-img"},[r("img",{attrs:{src:e.pic,alt:""}})]),t._v(" "),r("h5",{staticClass:"price"},[t._v(t._s(e.price))]),t._v(" "),r("div",{staticClass:"wrap-item-info"},[r("p",{staticClass:"name"},[t._v(t._s(e.name))]),t._v(" "),t._m(0,!0)])])}))])]),t._v(" "),r("div",{staticClass:"footer"},[r("div",{staticClass:"wrap-cart-info"},[r("div",{staticClass:"cart-info"},[r("i",{staticClass:"icon-cart",on:{click:function(e){t.toggleCartBox(!0)}}},[r("em",{staticClass:"cart-number"},[t._v("5")])]),t._v(" "),t._m(1)]),t._v(" "),r("button",{staticClass:"btn",attrs:{disabled:t.pageUxState.buyBtnDisabled},on:{click:t.goPay}},[t._v("去结算")])]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.pageUxState.showCartBox,expression:"pageUxState.showCartBox"}],staticClass:"cart-items-box"},[r("h4",{staticClass:"head"},[r("i",{staticClass:"icon close",on:{click:function(e){t.toggleCartBox(!1)}}})]),t._v(" "),t._m(2)])]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.pageUxState.showCartBox,expression:"pageUxState.showCartBox"}],staticClass:"widget-mask",on:{click:function(e){t.toggleCartBox(!1)}}})])},i=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"wrap-sku"},[r("i",{staticClass:"tag hot"},[t._v("暖")]),t._v(" "),r("div",{staticClass:"wrap-actions"},[r("i",{staticClass:"icon icon-reduce"}),t._v(" "),r("em",{staticClass:"numbers"},[t._v("2")]),t._v(" "),r("i",{staticClass:"icon icon-plus"})])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("p",[t._v("共计:"),r("strong",{staticClass:"total-price"},[t._v("0.00")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ul",{staticClass:"item-list"},[r("li",{staticClass:"item"},[r("span",{staticClass:"name"},[t._v("100ml豆浆加1个水煮蛋")]),t._v(" "),r("strong",{staticClass:"price"},[t._v("¥10.00")]),t._v(" "),r("div",{staticClass:"wrap-actions"},[r("i",{staticClass:"icon icon-reduce"}),t._v(" "),r("em",{staticClass:"numbers"},[t._v("2")]),t._v(" "),r("i",{staticClass:"icon icon-plus"})])])])}],o={render:n,staticRenderFns:i};e.a=o}});