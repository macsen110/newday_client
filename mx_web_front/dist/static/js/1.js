webpackJsonp([1],{15:function(t,e,i){"use strict";function n(t){i(21)}Object.defineProperty(e,"__esModule",{value:!0});var s=i(22),a=i(23),o=i(4),c=n,r=o(s.a,a.a,!1,c,null,null);e.default=r.exports},17:function(t,e,i){!function(e,i){t.exports=i()}(0,function(){function t(t){if(t&&"object"==typeof t)for(var e in t)this[e]=t[e];this.tabNavContainer=this.tabNavContainer||document.querySelector(".tab-nav-container"),this.tabConContainer=this.tabConContainer||document.querySelector(".tab-con-container"),this.tabNavContainer&&(this.tabNavItems=this.tabNavItems||this.tabNavContainer.children),this.tabConContainer&&(this.tabConItems=this.tabConItems||this.tabConContainer.children),this.curIdex=this.curIdex||0,this.init()}function e(t){return this.title=null,this.content=null,this.foot=null,this.canMaskClose=!0,this.className="",this.type="dialog",this.container=document.createElement("div"),this.isMask=!0,this.config(t),this.mask=this.isMask?'<div class="dialog-mask-bg"></div>':"",this.open(),this}function i(t,e){var i="ontouchstart"in window;if(!t)return null;this.element=t,this.parentEle=e.parentEle||this.element,this.child=t.children[0],this.length=t.children.length,this.focusIndex=e.focusIndex||0,this.index=e.index||0,this.speed=e.speed||300,this.offset=e.offset||0,this.limitBorder=e.limitBorder||!1,this.showNum=e.showNum||this.length,this.deltaX=0,this.deltaY=0,this.callback=e.callback||function(){},this.touchMoveCb=e.touchMoveCb||function(){},this.hasMoved=!1,this.orientation=e.orientation||1,this.distance=e.distance,this.parentEle.addEventListener&&(this.parentEle.addEventListener(i?"touchstart":"mousedown",this,!1),this.element.addEventListener("webkitTransitionEnd",this,!1),this.element.addEventListener("transitionend",this,!1)),1==this.orientation?(this.childWidth=e.childWidth||this.child.clientWidth,this.parentWidth=e.parentWidth||this.childWidth*this.length):(this.childHeight=e.childHeight||this.child.clientHeight,this.parentHeight=e.parentHeight||this.childHeight*this.length),this.init()}function n(t){"object"==typeof t&&Object.keys(t).forEach(function(e){this[e]=t[e]}.bind(this)),"string"!=typeof t&&"number"!=typeof t||(this.msg=t),this.init()}function s(t){"object"==typeof t&&Object.keys(t).forEach(function(e){this[e]=t[e]}.bind(this));return this.html=this.html||'<div class="mask"></div><div class="spinner"></div>',this}return t.prototype={constructor:t,init:function(){var t=this;t.change(this.curIdex),t.tabNavItems&&[].forEach.call(t.tabNavItems,function(e,i){e.addEventListener("click",function(){t.change(i)})})},change:function(t){var e=this;e.curIdex=t,e.tabNavItems?[].forEach.call(e.tabNavItems,function(i,n){n!==t?(i.classList.remove("on"),e.tabConItems[n].classList.remove("on")):(i.classList.add("on"),e.tabConItems[n].classList.add("on"))}):[].forEach.call(e.tabConItems,function(e,i){i!==t?e.classList.remove("on"):e.classList.add("on")}),e.callback&&e.callback(t)}},e.prototype={constructor:e,config:function(t){if("object"==typeof t)for(var e in t)this[e]=t[e];return this},handleEvent:function(t){var e=t.target,i=e.classList;return i.contains("dialog-mask-bg")?void(this.canMaskClose&&(this.maskAction?this.maskAction():this.close())):i.contains("btn-dialog-ok")?void this.afterOk():void((i.contains("btn-dialog-cancel")||i.contains("icon-dialog-cancel"))&&this.close())},open:function(){this.container.className="widget-dialog "+this.className,this.title=this.title?'<div class="title">'+this.title+"</div>":"",this.content=this.content?'<div class="content">'+this.content+"</div>":"",this.foot=this.foot?'<div class="foot">'+this.foot+"</div>":"",this.main=this.title+this.content+this.foot,this.container.innerHTML='<div class="main">'+this.main+"</div>"+this.mask;var t=document.body;t.appendChild(this.container),this.afterOpen(),this.container.addEventListener("click",this)},afterOpen:function(){},afterOk:function(){this.destory()},close:function(){this.afterClose(),this.destory()},afterClose:function(){},destory:function(){var t=document.body;this.container&&(t.removeChild(this.container),this.container=null)}},i.prototype={constructor:i,init:function(){var t=this;[].forEach.call(t.element.children,function(e){1==t.orientation?e.style.width=t.childWidth+"px":e.style.height=t.childHeight+"px"}),1==t.orientation?t.element.style.width=t.parentWidth+"px":t.element.style.height=t.parentHeight+"px",1==t.orientation&&(t.element.style.MozTransform=t.element.style.webkitTransform="translate3d("+-(t.index-t.focusIndex)*t.childWidth+"px,0,0)"),2==t.orientation&&(t.element.style.MozTransform=t.element.style.webkitTransform="translate3d(0,"+-(t.index-t.focusIndex)*t.childHeight+"px,0)"),t.move(t.index)},handleEvent:function(t){var e=this;switch(t.type){case"mousedown":e.element.addEventListener("mousemove",e,!1),e.element.addEventListener("mouseup",e,!1),e.element.addEventListener("mouseout",e,!1),e.onTouchStart(t);break;case"mousemove":e.onTouchMove(t);break;case"mouseup":case"mouseout":e.element.removeEventListener("mousemove",e,!1),e.element.removeEventListener("mouseup",e,!1),e.element.removeEventListener("mouseout",e,!1),e.onTouchEnd(t);break;case"touchstart":e.parentEle.addEventListener("touchmove",e,!1),e.parentEle.addEventListener("touchend",e,!1),e.onTouchStart(t);break;case"touchmove":e.onTouchMove(t);break;case"touchend":e.parentEle.removeEventListener("touchmove",e,!1),e.parentEle.removeEventListener("touchend",e,!1),e.onTouchEnd(t);break;case"webkitTransitionEnd":case"msTransitionEnd":case"oTransitionEnd":case"transitionend":e.transitionEnd(t)}},onTouchStart:function(t){var e=this;e.start={pageX:t.touches[0].pageX,pageY:t.touches[0].pageY},e.element.style.webkitTransition="-webkit-transform 0ms"},onTouchMove:function(t){var e=this;t.touches.length>1||t.scale&&1!==t.scale||(e.deltaX=t.touches[0].pageX-e.start.pageX,e.deltaY=t.touches[0].pageY-e.start.pageY,1==e.orientation&&Math.abs(e.deltaX)>Math.abs(e.deltaY)&&(t.preventDefault(),e.hasMoved||e.touchMoveCb&&e.touchMoveCb(e.index),e.element.style.MozTransform=e.element.style.webkitTransform="translate3d("+(e.deltaX-(e.index-e.focusIndex)*e.childWidth)+"px,0,0)"),2==e.orientation&&Math.abs(e.deltaY)>Math.abs(e.deltaX)&&(t.preventDefault(),e.hasMoved||e.touchMoveCb&&e.touchMoveCb(e.index),e.element.style.MozTransform=e.element.style.webkitTransform="translate3d(0,"+(e.deltaY-(e.index-e.focusIndex)*e.childHeight)+"px,0)"),e.hasMoved=!0)},onTouchEnd:function(t){var e=this;if(e.hasMoved||(1==e.orientation&&(e.deltaX=0),2==e.orientation&&(e.deltaY=0)),e.hasMoved=!1,1==e.orientation){var i,n=e.childWidth;if(e.distance){var s=e.deltaX-parseInt(e.deltaX/n)*n;i=s>0?e.index-(parseInt(e.deltaX/n)+(s-e.distance>0?1:0)):e.index-(parseInt(e.deltaX/n)+(Math.abs(s)-e.distance>0?-1:0))}else i=e.index-Math.round(e.deltaX/n)}if(2==e.orientation){var i,a=e.childHeight;if(e.distance){var s=e.deltaY-parseInt(e.deltaY/a)*a;i=s>0?e.index-(parseInt(e.deltaY/a)+(s-e.distance>0?1:0)):e.index-(parseInt(e.deltaY/a)+(Math.abs(s)-e.distance>0?-1:0))}else i=e.index-Math.round(e.deltaY/a)}if(i=e.limitIndex(i),e.autoMove(i),e.callback){e.index,e.offset;e.callback(e.index)}},transitionEnd:function(t){},autoMove:function(t){var e=this,i=this.element.style;i.webkitTransition="-webkit-transform "+e.speed+"ms",1==e.orientation&&(i.MozTransform=i.webkitTransform="translate3d("+-t*e.childWidth+"px,0,0)"),2==e.orientation&&(i.MozTransform=i.webkitTransform="translate3d(0,"+-t*e.childHeight+"px,0)"),e.index=t+e.focusIndex},move:function(t){var e=this;t-=e.offset,t=e.limitIndex(t);var i=this.element.style;i.webkitTransition="-webkit-transform "+e.speed+"ms",1==e.orientation&&(i.MozTransform=i.webkitTransform="translate3d("+-t*e.childWidth+"px,0,0)"),2==e.orientation&&(i.MozTransform=i.webkitTransform="translate3d(0,"+-t*e.childHeight+"px,0)"),e.index=t+e.focusIndex,e.callback&&e.callback(e.index)},limitIndex:function(t){var e=this;return e.limitBorder?t<0?t=0:t>e.length-e.showNum+e.focusIndex&&(t=e.length-(e.showNum-e.focusIndex)):t<-e.offset?t=-e.offset:t>e.length-1-e.offset&&(t=e.length-1-e.offset),t-e.focusIndex}},n.prototype={constructor:n,init:function(){this._container=document.querySelector(".widget-prompt"),this._container&&this.destory(),this.open()},open:function(){this._container=document.createElement("div"),this._container.className=this.className?this.className+" widget-prompt":"widget-prompt",this._container.innerHTML=this.msg,document.body.appendChild(this._container),this.promptTimer=setTimeout(function(){this.destory(),this.cb&&this.cb()}.bind(this),3e3)},destory:function(){this._container.parentNode.removeChild(this._container),this._container=null}},s.prototype={constructor:s,start:function(){this._container||(this._container=document.createElement("div"),this._container.innerHTML=this.html,this._container.className=this.className?this.className+" widget-loading":"widget-loading",document.body.appendChild(this._container)),this._container.style.display="block"},end:function(){this._container&&(this._container.style.display="none")}},{TabWidget:function(e){return new t(e)},Dialog:function(t){return new e(t)},easyMove:function(t,e){return new i(t,e)},showPrompt:function(t){return new n(t)},Loading:function(t){return new s(t)}}})},21:function(t,e){},22:function(t,e,i){"use strict";var n=i(17);i.n(n);e.a={data:function(){return{stagnationTime:30,stagnationEndCb:null,cartListData:[],goods:[{url:"./tmp/tmp_item_0.png",name:"100ml豆浆加1个水煮鸡蛋"},{url:"./tmp/tmp_item_0.png",name:"100ml豆浆加1个水煮鸡蛋"},{url:"./tmp/tmp_item_0.png",name:"100ml豆浆加1个水煮鸡蛋"}],pageUxState:{showCartBox:!1,buyBtnDisabled:!1}}},methods:{goPay:function(){var t=this;this.pageUxState.buyBtnDisabled=!0,this.destroyStagnation(),n.showPrompt({msg:"正在创建订单...",cb:function(){return t.$router.push("pay")}})},goBack:function(){history.back()},filterList:function(t){console.log(t)},toggleCartBox:function(t){this.pageUxState.showCartBox=t},reflushStagnation:function(){var t=this;this.destroyStagnation(),this.stagnationEndCb=setTimeout(function(){return t.$router.push({path:"/"})},1e3*this.stagnationTime)},destroyStagnation:function(){this.stagnationEndCb&&clearTimeout(this.stagnationEndCb)},addCart:function(){},reduceCartArr:function(){}},created:function(){this.reflushStagnation()},beforeDestroy:function(){this.destroyStagnation()}}},23:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-list container",on:{click:t.reflushStagnation}},[i("h3",{staticClass:"header"},[i("span",{staticClass:"btn-go-back",on:{click:t.goBack}},[t._v("取消")])]),t._v(" "),i("div",{staticClass:"body"},[i("ul",{staticClass:"nav"},[i("li",{staticClass:"item cur",on:{click:function(e){t.filterList("sd")}}},[t._v("套餐")]),t._v(" "),i("li",{staticClass:"item",on:{click:function(e){t.filterList("ds")}}},[t._v("食品")]),t._v(" "),i("li",{staticClass:"item",on:{click:function(e){t.filterList("ds")}}},[t._v("饮品")])]),t._v(" "),i("div",{staticClass:"list-container"},[i("h4",{staticClass:"tit"},[t._v("套餐")]),t._v(" "),i("ul",{staticClass:"list clear"},t._l(t.goods,function(e,n){return i("li",{key:n,staticClass:"item"},[i("div",{staticClass:"wrap-img"},[i("img",{attrs:{src:e.url,alt:""}})]),t._v(" "),i("h5",{staticClass:"price"},[t._v("10.00")]),t._v(" "),i("div",{staticClass:"wrap-item-info"},[i("p",{staticClass:"name"},[t._v(t._s(e.name))]),t._v(" "),t._m(0,!0)])])}))])]),t._v(" "),i("div",{staticClass:"footer"},[i("div",{staticClass:"wrap-cart-info"},[i("div",{staticClass:"cart-info"},[i("i",{staticClass:"icon-cart",on:{click:function(e){t.toggleCartBox(!0)}}},[i("em",{staticClass:"cart-number"},[t._v("5")])]),t._v(" "),t._m(1)]),t._v(" "),i("button",{staticClass:"btn",attrs:{disabled:t.pageUxState.buyBtnDisabled},on:{click:t.goPay}},[t._v("去结算")])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.pageUxState.showCartBox,expression:"pageUxState.showCartBox"}],staticClass:"cart-items-box"},[i("h4",{staticClass:"head"},[i("i",{staticClass:"icon close",on:{click:function(e){t.toggleCartBox(!1)}}})]),t._v(" "),t._m(2)])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.pageUxState.showCartBox,expression:"pageUxState.showCartBox"}],staticClass:"widget-mask",on:{click:function(e){t.toggleCartBox(!1)}}})])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wrap-sku"},[i("i",{staticClass:"tag hot"},[t._v("暖")]),t._v(" "),i("div",{staticClass:"wrap-actions"},[i("i",{staticClass:"icon icon-reduce"}),t._v(" "),i("em",{staticClass:"numbers"},[t._v("2")]),t._v(" "),i("i",{staticClass:"icon icon-plus"})])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("p",[t._v("共计:"),i("strong",{staticClass:"total-price"},[t._v("0.00")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",{staticClass:"item-list"},[i("li",{staticClass:"item"},[i("span",{staticClass:"name"},[t._v("100ml豆浆加1个水煮蛋")]),t._v(" "),i("strong",{staticClass:"price"},[t._v("¥10.00")]),t._v(" "),i("div",{staticClass:"wrap-actions"},[i("i",{staticClass:"icon icon-reduce"}),t._v(" "),i("em",{staticClass:"numbers"},[t._v("2")]),t._v(" "),i("i",{staticClass:"icon icon-plus"})])])])}],a={render:n,staticRenderFns:s};e.a=a}});