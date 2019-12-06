define(["host", "ui"], function (host, ui) {
  var reqData = {};
  var showError = function (msg) {
    ui.showPrompt(msg);
  };
  var CommonAjax = {
    doCallback: function (callback, response) {
      response = typeof response === "string" ? JSON.parse(response) : response;
      if (!callback) return;
      var callbackFunc = callback.func,
        callbackContext = callback.context;
      callbackFunc &&
        typeof callbackFunc == "function" &&
        callbackFunc.call(callbackContext, response);
    },
    //获取用户信息
    getWechatInfo: function (data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url: host.passport + "/ypassport/get_wechat_info_with_code",
        data: data,
        type: "post",
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response, textStatus) {
          //showError('获取用户信息失败,请稍后再试');
          CommonAjax.doCallback(callback, {
            code: 500,
            msg: "获取用户信息失败,请稍后再试"
          });
        }
      });
    },
    //判断手机号是否已经用过
    checkMobileUsed: function (data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url: host.passport + "/ypassport/check_m",
        data: data,
        type: "get",
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response, textStatus) {
          //showError('获取用户信息失败,请稍后再试');
          CommonAjax.doCallback(callback, {
            code: 500,
            msg: "请求接口失败"
          });
        }
      });
    },
    //判断用户是否绑定过手机号
    mobileIsBind: function (data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url: host.passport + "/ypassport/mobile_is_band",
        data: data,
        type: "get",
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response, textStatus) {
          //showError('获取用户信息失败,请稍后再试');
          CommonAjax.doCallback(callback, {
            code: 500,
            msg: "请求接口失败"
          });
        }
      });
    },
    //获取微信信息
    getWxConfig: function (data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url: host.passport + "/ypassport/getJsConfig",
        data: data,
        type: "post",
        dataType: 'json',
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response) {
          showError("获取微信信息失败");
        }
      });
    },
    //手机号绑定微信
    unionidBindMobile: function (data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url: host.passport + "/ypassport/unionid_band_mobile",
        data: data,
        type: "get",
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response) {
          showError("信息提交失败,请稍后重试");
        }
      });
    },
    //置换token
    getToken: function(data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url: host.passport + "/ypassport/get_t",
        data: data,
        type: "post",
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response) {
          showError("信息提交失败,请稍后重试");
        }
      });
    },
    getAllProvince: function (data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url: host.api + "/manage/api/partners/findAllProvince",
        data: data,
        type: "get",
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response) {
          showError("获取省份信息失败");
        }
      });
    },
    findCityByProvinceId: function (data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url: host.api + "/manage/api/partners/findCityByProvinceId",
        data: data,
        type: "get",
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response) {
          showError("获取城市信息失败");
        }
      });
    },
    findCountyByCityId: function (data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url: host.api + "/manage/api/partners/findCountyByCityId",
        data: data,
        type: "get",
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response) {
          showError("获取城市信息失败");
        }
      });
    },
    addCityPartner: function (data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url: host.api + "/manage/api/partners/addCityPartner",
        data: data,
        type: "post",
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response) {
          showError("保存失败,请稍后重试");
        }
      });
    },
    //获取我的客户接口
    getRegisteredEnterpriseList: function (data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url:
          "//usermanage.yaoex.com/usermanage/api/enterpriseInfo/selectByEnterpriseNameAndInviteCode",
        data: data,
        type: "get",
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response) {
          CommonAjax.doCallback(callback, {
            statusCode: 500,
            msg: "查询失败,请稍后再试"
          });
        }
      });
    },
    //修改手机号保存信息
    savePartnerMobileInfo: function (data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url: host.passport + "/ypassport/save_partner_mobile_info",
        data: data,
        type: "post",
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response) {
          showError("信息提交失败,请稍后重试");
        }
      });
    },
    //修改二维码
    createQrcode: function (data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url: host.passport + "/ypassport/create_qrcode",
        data: data,
        type: "get",
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response) {
          showError("信息提交失败,请稍后重试");
        }
      });
    },
    getOrdersByOrderStatusAndCusId: function (token, data, callback) {
      var data = $.extend(data, reqData);
      $.ajax({
        url:
        host.api+"/order/api/cityPartner/getOrdersByOrderStatusAndCusId",
        data: JSON.stringify(data),
        type: "post",
        contentType: "application/json",
        headers: {
          'token': token
        },
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        }
      });
    },
    savePartnerInfo: function(data, callback){
      var data = $.extend(data, reqData);
      $.ajax({
        url: host.passport + "/ypassport/save_partner_info",
        data: data,
        type: "post",
        success: function (response) {
          CommonAjax.doCallback(callback, response);
        },
        error: function (response) {
          showError("信息提交失败,请稍后重试");
        }
      })
    }
  }
  return CommonAjax;
});
