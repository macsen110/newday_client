(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{53:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(9);function r(e,t){switch(void 0===e&&(e=[]),t.type){case c.c:return t.value;default:return e}}var s=n(6),i=function(){return(i=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var c in t=arguments[n])Object.prototype.hasOwnProperty.call(t,c)&&(e[c]=t[c]);return e}).apply(this,arguments)},o=a.useReducer,l=a.useEffect;function u(e){return a.createElement("ul",{className:"app-list-page"},e.listGoods.map(function(e,t){return a.createElement(f,{key:e.goodsid,item:e})}))}function m(e){return a.createElement("div",{className:"wrap-uri"},a.createElement("img",{src:"//res.macsen318.com"+e.path,width:e.width,height:e.height}))}function d(e){return a.createElement("div",null)}function p(e){return a.createElement("div",{className:"wrap-uri"},a.createElement("video",{src:"//res.macsen318.com"+e.path,autoPlay:!0}))}function f(e){var t,n,c,r,o=e.item;switch(o.category){case"image":t=m;break;case"note":t=d;break;case"video":t=p}return a.createElement("li",{className:"item"},a.createElement(s.Link,{to:"/goods/detail/"+o.goodsid},a.createElement("h2",null,a.createElement("span",{className:"avator"},o.user,"发布了",o.categoryDesc),a.createElement("em",{className:"time"},(r=new Date(o._time)).getFullYear()+"-"+(r.getMonth()+1)+"-"+r.getDate()+"   "+r.getHours()+":"+r.getMinutes()+":"+r.getSeconds())),a.createElement("h3",null,o.title),a.createElement(t,i({},o)),a.createElement("p",{className:"content"},(n=o.content,c=(c="")||100,n.length>c?n.slice(0,c)+"...":n)),a.createElement("p",{className:"more"},a.createElement("i",{className:"i-comment"}),o.comment_count)))}t.default=function(){var e=o(r,[]),t=e[0],n=e[1];return l(function(){fetch("https://www.macsen318.com/api/goods/list",{credentials:"include"}).then(function(e){if(e.ok)return e.json()}).then(function(e){return n({type:c.c,value:e.data})})},[]),a.createElement(u,{listGoods:t})}}}]);