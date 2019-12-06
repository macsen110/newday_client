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
    count: 20
  };
  //init page
  var pageInitObj = {
    $rootDom: APP.config.$rootRouter,
    list: [],
    ready: function(stateObj, data) {
      var tpl = require("./tpl/customer_order.html");
      this.show(tpl, stateObj);
    },
    show: function(tplScript, stateObj) {
      var self = this;
      self.$rootDom.html(tplScript);
      self.bindUI(stateObj);
      
    },
    bindUI: function(stateObj) {
      APP.selectBottomNav(0);
      var self = this;
      self.$rootDom = self.$rootDom.find(".page-customer-order");
      var haedTpl = template("head_tpl", {
        name: decodeURIComponent(stateObj.name),
        type: decodeURIComponent(stateObj.type)
      });
      self.$rootDom.prepend(haedTpl);
      var isLoadMore;
      APP.commonAjax.getToken({
        id: APP.profileInfo.id},
      {
        func: function (res) {
          if (res.code == 0) {
            self.createMescroll(res.data, stateObj)
            
          }
          else return ui.showPrompt(res.msg)
        }
      })
      
    },
    createMescroll: function(token,stateObj, obj) {
      var self = this;
      obj = obj || {};
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
        self.getData(token, stateObj, page)
        
      }
    },
    getData: function(token, stateObj, page) {
      var self = this;
      APP.commonAjax.getOrdersByOrderStatusAndCusId(
        token,
        {
          pageSize: page.size,
          pageNo: page.num,
          param: {
            orderStatus: "",
            custId: stateObj.id,
            registerTime: stateObj.createTime,
            partnerId: APP.profileInfo.id,
            token: token,
            
          }
        },
        {
          func: function(res) {
            if (res.statusCode == 0) {
              var data = res.data;
              if (data.orders && data.orders.resultList.length) {
                var tpl = self.getRenderData(data.orders.resultList);
                self.list = self.list.concat(data.orders.resultList);
                self.mescroll && self.mescroll.endBySize(10, res.data.ordersCount);
                self.renderData(tpl);
              }
              else {
                if (!self.list.length) self.renderData(self.getEmptyData())
              }
            }
          }
        }
      );
    },
    getEmptyData: function() {
      var self= this;
      self.mescroll && self.mescroll.hideUpScroll();
      return '<li class="item empty-item">该客户还没有订单哦,快去联系他下单吧</li>';
    },
    getRenderData: function(list) {
      var tpl = "";
      if (list.length) {
        if (!document.getElementById("render_order_tpl")) return tpl;
        tpl = template("render_order_tpl", { list: list });
      }
      return tpl;
    },
    renderData: function(str) {
      if (!str) return;
      var $body = this.$rootDom.find(".body");
      var $list = $body.find(".list");
      $list.append(str);
      
    },
    init: function(stateObj) {
      var self = this;
      self.ready(stateObj);
    },
    destroy: function() {
      //如果有事件绑定的话, 解除事件绑定
      var self = this;
      self.$rootDom =  APP.config.$rootRouter;
      self.mescroll && window.removeEventListener("touchmove",self.mescroll.bounceTouchmove);
      self.mescroll = null;
    }
  };

  return pageInitObj;
});
