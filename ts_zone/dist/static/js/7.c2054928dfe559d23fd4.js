(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{1:function(e,t,n){"use strict";n.d(t,"d",function(){return r}),n.d(t,"e",function(){return c}),n.d(t,"c",function(){return a}),n.d(t,"g",function(){return i}),n.d(t,"f",function(){return o}),n.d(t,"a",function(){return u}),n.d(t,"b",function(){return s});var r="LOGIN",c="LOGOUT",a="LISTGOODS",i="SHOWGOOD",o="POSTCOMMET",u="DELETECOMMET",s="LISTCOMMETS"},43:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(1);function a(e,t){switch(void 0===e&&(e=[]),t.type){case c.c:return t.value;default:return e}}var i=n(7),o=function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var c in t=arguments[n])Object.prototype.hasOwnProperty.call(t,c)&&(e[c]=t[c]);return e}).apply(this,arguments)},u=r.useReducer,s=r.useEffect;function l(e){return r.createElement("ul",{className:"app-list-page"},e.listGoods.map(function(e,t){return r.createElement(p,{key:e.goodsid,item:e})}))}function m(e){return r.createElement("div",{className:"wrap-uri"},r.createElement("img",{src:"//res.macsen318.com"+e.path,width:e.width,height:e.height}))}function d(e){return r.createElement("div",null)}function f(e){return r.createElement("div",{className:"wrap-uri"},r.createElement("video",{src:"//res.macsen318.com"+e.path,autoPlay:!0}))}function p(e){var t,n,c,a,u=e.item;switch(u.category){case"image":t=m;break;case"note":t=d;break;case"video":t=f}return r.createElement("li",{className:"item"},r.createElement(i.b,{to:"/goods/detail/"+u.goodsid},r.createElement("h2",null,r.createElement("span",{className:"avator"},u.user,"发布了",u.categoryDesc),r.createElement("em",{className:"time"},(a=new Date(u._time)).getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()+"   "+a.getHours()+":"+a.getMinutes()+":"+a.getSeconds())),r.createElement("h3",null,u.title),r.createElement(t,o({},u)),r.createElement("p",{className:"content"},(n=u.content,c=(c="")||100,n.length>c?n.slice(0,c)+"...":n)),r.createElement("p",{className:"more"},r.createElement("i",{className:"i-comment"}),u.comment_count)))}t.default=function(){var e=u(a,[]),t=e[0],n=e[1];return s(function(){fetch("https://www.macsen318.com/api/goods/list",{credentials:"include"}).then(function(e){if(e.ok)return e.json()}).then(function(e){return n({type:c.c,value:e.data})})},[]),r.createElement(l,{listGoods:t})}}}]);
//# sourceMappingURL=7.c2054928dfe559d23fd4.js.map