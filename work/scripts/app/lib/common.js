define([], function () {
  var exports = {};
  exports.checkPlatform = function () {
    var ua = navigator.userAgent;
    var android = ua.match(/(Android)[\s\/]+([\d.]+)/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    var ipod = !ipad && !iphone && ua.match(/(iPod).*OS\s([\d_]+)/);
    if (ipad || iphone || ipod) {
      return 2;
    } else {
      return 1;
    }
  };
  /**
   * 格式化 参数
   * @param url
   * @returns {{}}
   */

  exports.getLocationParam = function () {
    var url = window.location.search;
    var returnObject = {};
    if (url) {
      var params = url
        .toString()
        .slice(1)
        .split("&");
      for (var i = 0; i != params.length; i++) {
        var index = params[i].indexOf("=");
        returnObject[params[i].slice(0, index)] = params[i].slice(index + 1);
      }
    }
    return returnObject;
  };
  exports.filterParams = function (obj) {
    var res = [];
    if (typeof obj != "object") return "";
    if (Object.keys(obj).length == 0) return "";
    for (var i in obj) {
      res.push(i + "=" + obj[i]);
    }
    return res.join("&");
  };
  exports.getParam = function (url) {
    url = decodeURIComponent(url);
    var params = url ? url.toString().split("&") : [];
    var returnObject = {};

    for (var i = 0; i != params.length; i++) {
      var canshu = params[i].split("=");
      returnObject[canshu[0]] = canshu[1];
    }
    return returnObject;
  };
  exports.setLocalStorage = function (key, value) {
    if (window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  };
  exports.getLocalStorage = function (key) {
    if (window.localStorage) {
      return window.localStorage.getItem(key);
    }
  };
  exports.formatPhone = function (phone) {
    return phone && phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  };
  exports.checkMobile = function (val) {
    var pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
    if (pattern.test(val)) {
      return true;
    } else {
      return false;
    }
  };
  exports.inWx = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  };

  exports.getQueryName = function (name, params) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURIComponent(params).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  };
  exports.cookie = function (name, value, days) {
    // if value is undefined, get the cookie value
    if (value === undefined) {
      var cookiestring = "; " + window.document.cookie;
      var cookies = cookiestring.split("; " + name + "=");
      if (cookies.length === 2) {
        return decodeURIComponent(
          cookies
            .pop()
            .split(";")
            .shift()
        );
      }
      return null;
    } else {
      // if value is a false boolean, we'll treat that as a delete
      if (value === false) {
        days = -1;
      }
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toGMTString();
      }
      window.document.cookie =
        name +
        "=" +
        encodeURIComponent(value) +
        expires +
        "; path=/;domain=.yaoex.com";
    }
  };
  exports.wxRefresh = function () {
    var replaceQueryParam = function (param, newval, search) {
      var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
      var query = search.replace(regex, "$1").replace(/&$/, "");

      return (
        (query.length > 2 ? query + "&" : "?") +
        (newval ? param + "=" + newval : "")
      );
    };

    window.location.replace(
      location.protocol +
      "//" +
      location.host +
      location.pathname +
      replaceQueryParam("_wxr_", new Date().getTime(), location.search) +
      location.hash
    );
  };
  exports.hideWxOptionMenu = function () {
    wx.config({
      jsApiList: ["hideOptionMenu"]
    });
    wx.ready(function () {
      wx.hideOptionMenu();
    });
  };
  exports.fixBrowerBackReload = function () {
    window.onpageshow = function (event) {
      if (event.persisted) window.location.reload();
    };
  };
  exports.init = function () {
    exports.fixBrowerBackReload();
    exports.hideWxOptionMenu();
  };
  exports.init();
  return exports;
});
