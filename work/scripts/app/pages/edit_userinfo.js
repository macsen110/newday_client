/**
 * Created by wudi on 15/11/30.
 */
define(["zepto", "template", "ui"], function($, template, ui) {
  /**
   * *初始化页面交互的dom
   * *@choosePlaceBtn 触发选择地区的dom
   * *@dialogPlaceDom 页面弹框dom
   * *@tabChangePlace tab切换的对象
   * *@savePlaceBtn 保存按钮
   * @selectPlaceIpts 页面中隐藏的文本框信息
   * */
  var _profileInfo = {};
  var initPageObj = {
    dialogPlaceDom: "",
    savePlaceBtn: "",
    selectPlaceIpts: "",
    tabChangePlace: null,
    selectAllPlaceObj: null,
    hasSlectPlace: false,
    scrollToBottom: false,
    loadOver: false,
    page: 1,
    count: 20
  };
  //初始化将地址数据转化为html,
  function mapDataToHtml(data, type) {
    var html = "";
    var preSign = "";
    if (type == "provice") {
      preSign = "省";
    }
    if (type == "city") {
      preSign = "市";
    }
    if (type == "country") {
      preSign = "区";
    }
    html +=
      '<div class="place-item" data-type="' +
      type +
      '" data-infoCode="-2">全部' +
      preSign +
      "</div>";
    if (!Array.isArray(data)) return html;

    data.forEach(function(item, index) {
      if (type == "provice") {
        html +=
          '<div class="place-item" data-type="' +
          type +
          '" data-infoCode="' +
          item.provinceId +
          '">' +
          item.provinceName +
          "</div>";
      } else if (type == "city") {
        html +=
          '<div class="place-item" data-type="' +
          type +
          '" data-infoCode="' +
          item.cityId +
          '">' +
          item.cityName +
          "</div>";
      } else {
        html +=
          '<div class="place-item" data-type="' +
          type +
          '" data-infoCode="' +
          item.countyId +
          '">' +
          item.countyName +
          "</div>";
      }
    });
    return '<div class="wrap-place-item">' + html + "</div>";
  }
  /****loadCity
   **根据选择的地点,
   **load下一级地区
   **触发type为省,从本地变量加载
   **否则异步加载
   **@selectPlaceIpts 模板中对应的地区隐藏文本框
   **/
  function loadAsyncPlaces(target, type) {
    if (type == "city") {
      type = "country";
      pageInitObj.ipts[1].value = target.dataset.infocode;
    } else if (type === "provice") {
      type = "city";
      pageInitObj.ipts[0].value = target.dataset.infocode;
    } else pageInitObj.ipts[2].value = target.dataset.infocode;
    var curIdex = initPageObj.tabChangePlace.curIdex;
    var tabNavs = initPageObj.tabChangePlace.tabNavContainer;
    var tabCons = initPageObj.tabChangePlace.tabConContainer;
    var selectPlaceIpts = initPageObj.selectPlaceIpts;
    tabNavs.children[curIdex].innerHTML = target.innerHTML;
    tabNavs.children[curIdex].dataset.infocode = target.dataset.infocode;

    if (curIdex !== tabNavs.children.length - 1) {
      loopResetNext(curIdex);
    }
    var data = target.dataset;
    callBack(initPageObj.selectAllPlaceObj, type, curIdex, target);
  }

  /***
   ***tabNav Item 值变动,
   ***循环下一级 nav值变为初始值
   ***清除下一级的地区items
   ***/

  function loopResetNext(index) {
    var tabNavs = initPageObj.tabChangePlace.tabNavContainer;
    var tabCons = initPageObj.tabChangePlace.tabConContainer;
    var selectPlaceIpts = initPageObj.selectPlaceIpts;
    for (var i = index + 1; i < tabNavs.children.length; i++) {
      tabNavs.children[i].innerHTML = tabNavs.children[i].dataset.defaultval;
      tabNavs.children[i].dataset.infocode = "";
      if (
        tabCons.children[i] &&
        tabCons.children[i].children[0] &&
        tabCons.children[i].children[0].classList.contains("wrap-place-item")
      ) {
        tabCons.children[i].removeChild(tabCons.children[i].children[0]);
        tabCons.children[i] &&
          tabCons.children[i].lastElementChild &&
          tabCons.children[i].lastElementChild.classList.remove("hidden");
      }

      selectPlaceIpts[i].value = "";
    }
  }

  /****
   **操作成功,
   **获取到数据,
   **回调
   * *******/

  function callBack(data, type, index, target) {
    var nextIndex = index + 1;
    var nextPlaceNode =
      initPageObj.tabChangePlace.tabConContainer.children[nextIndex];
    nextPlaceNode && (nextPlaceNode.innerHTML = mapDataToHtml(data, type));

    nextPlaceNode &&
      nextPlaceNode.lastElementChild &&
      nextPlaceNode.lastElementChild.classList.add("hidden");
    initPageObj.tabChangePlace.tabConContainer.children[index].classList.remove(
      "on"
    );
    $(".popup-mask").hide();
    changeDomClass(target);
  }

  //改变选择的item 的class ,
  function changeDomClass(target) {
    var items = target.parentNode.children;
    [].forEach.call(items, function(item) {
      item.classList.remove("select");
      target.classList.add("select");
    });
  }

  //init page
  var pageInitObj = {
    config: {
      weChatKey: APP.profileInfo.unionId || "",
      sms: {
        glAppId: "1138",
        templateId: "1182",
        tag: "citypartner",
        length: "6",
        glCaptchaToken: ""
      }
    },
    $rootDom: APP.config.$rootRouter,
    ready: function(stateObj, data) {},
    show: function(tplScript) {
      var self = this;
      self.$rootDom.html(tplScript);
      self.ipts = document.querySelectorAll(".select-place-ipt");
      self.bindUI();
    },
    pageShow: function() {
      this.$rootDom.show();
      this.setPlaceInfo();
    },
    setPlaceInfo: function() {
      var arr = _profileInfo.arr;
      $(".province").html(arr[0].provinceName);
      $(".city").html(arr[1].cityName);
      $(".county").html(arr[2].countyName);
      this.ipts[0].value = arr[0].provinceId;
      this.ipts[1].value = arr[1].cityId;
      this.ipts[2].value = arr[2].countyId;
    },
    bindUI: function() {
      var self = this;
      var form = self.$rootDom.find("#submit_scene_form")[0];
      //地址联动
      $(".tab-nav-list li")
        .eq(0)
        .on("click", function() {
          self.addressBindUI();
        });
      //合作属性
      $(".teamwork").on("click", function() {
        var data = [
          {
            text: "个人合伙人",
            id: "9"
          },
          {
            text: "企业合伙人",
            id: "8"
          }
        ];
        var _that = this;
        self.selectShow(_that, data);
      });
      //终端客户
      $(".appuser").on("click", function() {
        var data = [
          {
            text: "是",
            id: "1"
          },
          {
            text: "否",
            id: "0"
          }
        ];
        var _that = this;
        self.selectShow(_that, data);
      });
      //保存
      $("#submit_city_partner_btn").on("click", function() {
        self.savePartnerInfo();
      });
      $(".popup-content").on("click", "li", function(e) {
        e.preventDefault();
        e.stopPropagation();
        var selectText = $(this).html();
        var updateText = $(this)
          .parents(".common-list")
          .find("h3");
        var selectId = $(this).attr("data-id");
        updateText.html(selectText);
        updateText.attr("data-id", selectId);
        $(".popup-mask").hide();
        $(this)
          .parents(".popup-content")
          .removeClass("popup-content-show");
      });
      $(".popup-mask").on("click", function() {
        $(".tab-con-list li").removeClass("on");
        $(".popup-content").removeClass("popup-content-show");

        $(this).hide();
      });
    },
    profileInfoRenderUI: function() {
      var self = this;
      //var tpl = template("edit_profile_tpl", _profileInfo);
      //self.$rootDom.prepend(tpl);

      var info = APP.profileInfo;
      var $appuser = $(".appuser");
      var $teamwork = $(".teamwork");
      //终端 8企业 9个人
      if (info.teamworkType == 8) {
        $teamwork.find("h3").html("企业合伙人");
      } else {
        $teamwork.find("h3").html("个人合伙人");
      }
      $teamwork.find("h3").attr("data-id", info.teamworkType);
      //合作属性 1终端 0非
      if (info.isTerminalUser == 1) {
        $appuser.find("h3").html("是");
      } else {
        $appuser.find("h3").html("否");
      }
      $appuser.find("h3").attr("data-id", info.isTerminalUser);
      $(".company-name").val(info.companyName);
      $(".address").val(info.companyAddress);
      //省市区
    },
    selectShow: function(_that, data) {
      var html = "";
      $(".popup-mask").show();
      data.forEach(function(item) {
        html += "<li data-id=" + item.id + ">" + item.text + "</li>";
      });
      $(_that)
        .find(".popup-content")
        .addClass("popup-content-show")
        .html(html);
    },
    savePartnerInfo: function() {
      var self = this;
      var province = $(".tab-nav-list li").html();
      var city = $(".tab-nav-list li")
        .eq(1)
        .html();
      var county = $(".tab-nav-list li")
        .eq(2)
        .html();
      if (province == "省") {
        return ui.showPrompt("请选择省份");
      }
      if (city == "市") {
        return ui.showPrompt("请选择市");
      }
      if (county == "县区") {
        return ui.showPrompt("请选择县区");
      }
      var serviceZone = province + city + county;
      var teamworkType = $(".teamwork")
        .find("h3")
        .attr("data-id");
      var isTerminalUser = $(".appuser")
        .find("h3")
        .attr("data-id");
      var companyName = $(".company-name").val();
      var companyAddress = $(".address").val();
      var data = {
        serviceZone: serviceZone,
        teamworkType: teamworkType,
        isTerminalUser: isTerminalUser,
        unionId: self.config.weChatKey,
        companyName: companyName,
        companyAddress: companyAddress,
        serviceZoneCode: self.getServiceZoneCode()
      };
      APP.commonAjax.savePartnerInfo(data, {
        func: function(res) {
          if (res.code == 0) {
            var data = res.data;
            //APP.profileInfo = data;
            APP.profileInfo.companyAddress = data.companyAddress
              ? data.companyAddress
              : "";
            APP.profileInfo.companyName = data.companyName
              ? data.companyName
              : "";
            APP.profileInfo.isTerminalUser = data.isTerminalUser;
            APP.profileInfo.serviceZoneCode = data.serviceZoneCode;
            APP.profileInfo.serviceZone = data.serviceZone;
            APP.profileInfo.teamworkType = data.teamworkType;
            APP.profileInfo.unionId = data.unionId;
            APP.profileInfo.updateDate = data.updateDate;

            return ui.showPrompt({
              msg: res.msg,
              cb: function() {
                APP.router.go("personal_center");
              }
            });
          }
          return ui.showPrompt(res.msg);
        }
      });
    },
    getServiceZoneCode: function() {
      var self = this;
      var code = [];
      [].forEach.call(self.ipts, function(item) {
        code.push(item.value ? item.value : "-2");
      });
      return code.join();
    },
    initConfig: function() {
      var self = this;
      for (var i in APP.profileInfo) {
        _profileInfo[i] = APP.profileInfo[i];
      }
      _profileInfo.arr = [];
      var arr = (_profileInfo.arr = _profileInfo.serviceZoneCode.split(","));
      if (arr) {
        if (arr[0] != -2 && arr[0] && arr[0] != 'undefined') {
          self.getAllProvince(arr[0]);
        } else {
          _profileInfo.arr[0] = {
            proviceId: "-2",
            provinceName: "全部"
          };
          _profileInfo.arr[1] = {
            cityId: "-2",
            cityName: "全部"
          };
          _profileInfo.arr[2] = {
            countyId: "-2",
            countyName: "全部"
          };
          self.getAllProvince();
          self.pageShow();
        }
      }
    },
    getProvinceName: function() {},
    getCityName: function() {},
    getCountryName: function() {},
    init: function(stateObj) {
      var self = this;
      self.$rootDom.hide();
      APP.setPointBodyData("modifyingbasicinformation");
      APP.goPointUrl();
      var html = require("./tpl/edit_userinfo.html");
      this.show(html);
      APP.selectBottomNav(-2);
      self.initConfig();
      initPageObj = {
        dialogPlaceDom: document.getElementById("wp_address_dialog_container"),
        savePlaceBtn: document.getElementById("save_place_btn"),
        selectPlaceIpts: document.querySelectorAll(".select-place-ipt")
      };
      self.profileInfoRenderUI();
    },
    destroy: function() {
      //如果有事件绑定的话, 解除事件绑定
      this.$rootDom.removeClass("visibile page-profile");
      _profileInfo = {};
    },
    addressBindUI: function() {
      var self = this;
      $(".popup-mask").show();
      //初始化弹框内切换省市的tab 对象
      initPageObj.tabChangePlace =
        initPageObj.tabChangePlace ||
        new ui.TabWidget({
          tabNavContainer: initPageObj.dialogPlaceDom.querySelector(
            ".tab-nav-list"
          ),
          tabConContainer: initPageObj.dialogPlaceDom.querySelector(
            ".tab-con-list"
          )
          //canToggle: false
        });
      //模拟事件代理,根据地址弹框中不同dom,响应不同
      initPageObj.dialogPlaceDom.addEventListener(
        "click",
        function(e) {
          $(".popup-mask").show();
          var target = e.target;
          var classList = target.classList;
          if (classList.contains("place-item")) {
            var type = target.dataset.type;
            var infocode = e.target.getAttribute("data-infocode");
            if (type == "provice") {
              self.getAllCity(infocode, target, type);
            } else if (type == "city") {
              self.getAllAreas(infocode, target, type);
            } else {
              loadAsyncPlaces(target, type);
            }
          }
        },
        false
      );
    },
    //省
    getAllProvince: function(id) {

      var that = this;
      var todoResult = function(res) {
        if (res.statusCode == 0) {
          if (id && id != 'undefined') {
            var filterData = res.data.filter(function(item) {
              return item.provinceId == id;
            });
            _profileInfo.arr[0] = filterData[0];
            if (_profileInfo.arr[1] && _profileInfo.arr[1] != -2)
              that.getAllCity(id, 1, 1, _profileInfo.arr[1]);
            else {
              _profileInfo.arr[1] = {
                cityId: "-2",
                cityName: "全部"
              };
              _profileInfo.arr[2] = {
                countyId: "-2",
                countyName: "全部"
              };
              that.pageShow();
            }
          }
          var proviceHTML = mapDataToHtml(res.data, "provice");
          $(".provice").html(proviceHTML);
        } else ui.showPrompt(res.message);
      };
      APP.commonAjax.getAllProvince(
        {},
        {
          func: todoResult
        }
      );
    },
    //市
    getAllCity: function(proviceId, target, type, cityId) {
      var that = this;
      var todoResult = function(res) {
        if (res.statusCode == 0) {
          if (cityId) {
            var filterData = res.data.filter(function(item) {
              return item.cityId == cityId;
            });
            _profileInfo.arr[1] = filterData[0];
            if (_profileInfo.arr[2] && _profileInfo.arr[2] != -2)
              that.getAllAreas(cityId, 1, 1, _profileInfo.arr[2]);
            else {
              _profileInfo.arr[2] = {
                countyId: "-2",
                countyName: "全部"
              };
              that.pageShow();
            }
            return false;
          }
          initPageObj.selectAllPlaceObj = res.data;
          loadAsyncPlaces(target, type);
        } else ui.showPrompt(res.message);
      };
      APP.commonAjax.findCityByProvinceId(
        { provinceId: proviceId },
        {
          func: todoResult
        }
      );
    },
    //区
    getAllAreas: function(cityId, target, type, countyId) {
      var that = this;
      var todoResult = function(res) {
        if (res.statusCode == 0) {
          if (countyId) {
            var filterData = res.data.filter(function(item) {
              return item.countyId == countyId;
            });
            _profileInfo.arr[2] = filterData[0];
            that.pageShow();
            return false;
          }
          initPageObj.selectAllPlaceObj = res.data;
          loadAsyncPlaces(target, type);
        } else ui.showPrompt(res.message);
      };
      APP.commonAjax.findCountyByCityId(
        { cityId: cityId },
        { func: todoResult }
      );
    }
  };

  return pageInitObj;
});
