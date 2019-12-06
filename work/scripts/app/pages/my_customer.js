/**
 * Created by wudi on 15/11/30.
 */
define(["zepto", "template", "ui", "template", "MeScroll"], function(
  $,
  template,
  ui,
  template,
  MeScroll
) {
  var _config = {
    scrollToBottom: false,
    loadOver: false,
    page: 1,
    count: 10,
    _initList: [],
    enterpriseName: ''
  };
  //init page
  var pageInitObj = {
    $rootDom: APP.config.$rootRouter,
    ready: function(stateObj, data) {
      var tpl = require("./tpl/my_customer.html");
      this.show(tpl);
    },
    show: function(tplScript) {
      var self = this;
      self.$rootDom.html(tplScript);
      self.bindUI();
    },
    bindUI: function() {
      APP.selectBottomNav(0);
      var self = this;
      self.$rootDom = self.$rootDom.find(".page-my-customer");
      var $form = this.$rootDom.find(".search-form-container");
      $form.on(
        "submit",
        function(e) {
          e.preventDefault();
          this.submit($form);
        }.bind(this)
      );
      self.$rootDom.delegate(".item", "click", function() {
        var id = $(this).data("id");
        var name = $(this).data("enterprise_name");
        var type = $(this).data("type");
        var createTime = $(this).data("createtime");
        APP.router.go("customer_order", {
          id: id,
          name: encodeURIComponent(name),
          type: encodeURIComponent(type),
          createTime: createTime
        });
      });
      this.submit($form, 1);
    },
    submit: function($form, withoutIpt) {
      _config._initList = [];
      $form[0].search_ipt.blur();
      var ipt = $form[0].search_ipt.value;
      if (!$.trim(ipt) && !withoutIpt) return ui.showPrompt("请填写内容");
      var $list = this.$rootDom.find(".list");
      $list.html("");
      var obj = this.getRequestParams();
      obj.page = 1;
      obj.enterpriseName = _config.enterpriseName = $.trim(ipt);
      this.createMescroll(obj, $form);
    },
    createMescroll: function(obj, $form) {
      var self = this;
      var requestObj = {
        enterpriseName: obj.enterpriseName,
        inviteCode:APP.profileInfo.referralCode
      };
      if (self.mescroll) return self.mescroll.resetUpScroll();
      self.mescroll = new MeScroll("my_customer_body", {
        down: {
          use: false
        },
        up: {
          htmlNodata: '<p class="upwarp-nodata">-- 数据加载完毕 --</p>',
          auto: true, //是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
          isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
          callback: upCallback //上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        }
      });

      /*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
      function upCallback(page) {
        requestObj.page = page.num;
        requestObj.enterpriseName = _config.enterpriseName;
        self.getData(requestObj, $form, 1);
      }
    },
    getRequestParams: function(isLoadMore) {
      var obj = {
        count: _config.count,
        inviteCode: APP.profileInfo.referralCode
      };
      return obj;
    },
    resetPageScrollInfo: function() {
      _config.loadOver = false;
      _config.page = 1;
      scrollToBottom: false;
    },
    getData: function(data, isLoadMore) {
      var self = this;
      APP.commonAjax.getRegisteredEnterpriseList(data, {
        func: function(res) {
          if (res.statusCode == 1 && _config._initList.length == 0)
            return self.renderData(self.getEmptyData(), isLoadMore);
          if (res.statusCode == 0 && res.list.length > 0) {
            _config._initList = _config._initList.concat(res.list);
            self.mescroll && self.mescroll.endBySize(10, res.total);
            self.renderData(self.getRenderData(res.list), isLoadMore);
          } else {
            ui.showPrompt(res.msg);
          }
        }
      });
    },
    getEmptyData: function() {
      var self = this;
      self.mescroll && self.mescroll.hideUpScroll();
      return '<li class="empty-item">您还没有客户哦, 您可在"<a href="//m.yaoex.com/web/h5/city_partner/search.html">查可拓客户</a>"中搜索您要发展的客户,快去查询并邀请吧</li>';
    },
    getRenderData: function(list) {
      var tpl = "";
      if (list.length) {
        if (!document.getElementById("render_item_html")) return "";
        tpl = template("render_item_html", { list: this.filterData(list) });
      }
      return tpl;
    },
    filterData: function(list) {
      var mapStatus = {
        0: "未提交资质",
        1: "待审核",
        2: "审核通过",
        3: "审核不通过",
        4: "变更"
      };
      list.forEach(function(element) {
        element.statusDesc = mapStatus[element.isCheck];
      });
      return list;
    },
    renderData: function(str, isLoadMore) {
      if (!str) return;
      var $body = this.$rootDom.find(".body");
      var $list = $body.find(".list");
      if (isLoadMore) $list.append(str);
    },
    init: function(stateObj) {
      var self = this;
      self.ready();
    },
    destroy: function() {
      var self = this;
      self.$rootDom = APP.config.$rootRouter;
      self.mescroll && window.removeEventListener("touchmove",self.mescroll.bounceTouchmove);
      self.mescroll = null;
      //如果有事件绑定的话, 解除事件绑定
    }
  };

  return pageInitObj;
});
