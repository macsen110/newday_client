webpackJsonp([2],{111:function(t,s,i){"use strict";function a(t){i(116)}Object.defineProperty(s,"__esModule",{value:!0});var e=i(117),n=i(118),c=i(51),r=a,o=c(e.a,n.a,!1,r,null,null);s.default=o.exports},116:function(t,s){},117:function(t,s,i){"use strict";s.a={data:function(){return{randomGoods:[{id:10,url:"./tmp/tmp_item_0.png",name:"水煮鸡蛋",price:"20.00",tagName:"暖"},{id:11,url:"./tmp/tmp_item_0.png",name:"水煮鸡蛋",price:"10.00",tagName:"暖"},{id:12,url:"./tmp/tmp_item_0.png",name:"水煮鸡蛋",price:"20.10",tagName:"暖"}]}},methods:{goList:function(){this.$router.push("list")}}}},118:function(t,s,i){"use strict";var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"container page-index",on:{click:t.goList}},[i("h3",{staticClass:"bg-header"}),t._v(" "),i("div",{staticClass:"section-box clear"},[i("ul",{staticClass:"list"},t._l(t.randomGoods,function(s){return i("li",{key:s.id,staticClass:"item"},[i("img",{attrs:{src:s.url}}),t._v(" "),i("div",{staticClass:"item-info-box"},[i("div",{staticClass:"info"},[i("p",{staticClass:"name"},[t._v(t._s(s.name))]),t._v(" "),i("p",{staticClass:"price"},[t._v(t._s(s.price))])]),t._v(" "),i("div",{staticClass:"tag hot"},[t._v(t._s(s.tagName))])])])}))]),t._v(" "),i("div",{staticClass:"footer"},[t._v("点击屏幕开始点餐")])])},e=[],n={render:a,staticRenderFns:e};s.a=n}});