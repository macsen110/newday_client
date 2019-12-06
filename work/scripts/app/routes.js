define([], function() {
  "use strict";
  var arr = [
    {
      pageName: "home",
      title: "首页"
    },
    {
      pageName: "personal_center",
      title: "个人中心"
    },
    {
      pageName: "mobile",
      title: "手机号"
    },
    {
      pageName: "update_mobile",
      title: "手机号"
    },
    {
      pageName: "userinfo",
      title: "基本信息"
    },
    {
      pageName: "edit_userinfo",
      title: "基本信息"
    },
    {
      pageName: "invite",
      title: "我的邀请码"
    },
    {
      pageName: "my_customer",
      title: "我的客户"
    }, 
    {
      pageName: "customer_order",
      title: '客户订单'
    },
    {
      pageName: "salary_list",
      title: '佣金明细'
    },
    {
      pageName: "salary_detail",
      title: '佣金明细'
    }

  ];

  var loadAsync = function(obj) {
    return {
      _Promise: function() {
        return new Promise(function(res, rej) {
          var load = require("bundle-loader?lazy&name=[name]!./pages/" +
            obj.pageName +
            ".js");
          load(function(commponent) {
            res(commponent);
          });
        });
      }
    };
  };
  var arrAsync = [];
  arr.forEach(function(item, idx) {
    item.component = loadAsync(item);
    arrAsync.push(item);
  });

  return arrAsync;
});
