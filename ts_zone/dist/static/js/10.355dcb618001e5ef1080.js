(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{40:function(e,t,n){"use strict";n.r(t);var u=n(0),c=u.useReducer,r=u.useEffect,l=u.useContext,o=u.useRef,a={count:0},i=u.createContext({lang:"en"});function s(e,t){switch(t.type){case"reset":return a;case"increment":return{count:e.count+1};case"decrement":return{count:e.count-1};default:return e}}t.default=function(){var e=u.useState(0),t=e[0],n=(e[1],c(s,{count:t})),a=n[0],m=n[1],f=l(i).lang,d=o(null);return r(function(){console.log("hello, "+t)}),u.createElement(u.Fragment,null,u.createElement("div",null,f),u.createElement("div",null,"Count: ",a.count),u.createElement("div",null,u.createElement("button",{onClick:function(){return m({type:"reset"})}},"Reset")),u.createElement("div",null,u.createElement("button",{onClick:function(){return m({type:"increment"})}},"+")),u.createElement("div",null,u.createElement("button",{onClick:function(){return m({type:"decrement"})}},"-")),u.createElement("div",null,u.createElement("input",{ref:d,type:"text"}),u.createElement("button",{onClick:function(){d&&d.current&&d.current.focus()}},"Focus the input")))}}}]);
//# sourceMappingURL=10.355dcb618001e5ef1080.js.map