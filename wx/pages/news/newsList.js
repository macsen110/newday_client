import tools from '../../utils/util.js';
console.log(tools)
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    items: [{ "id": 1, "name":"文章标题", "detial": "文章详情，我是来测试文章以供有几行的，每一行是多少，展示多少合适，是否换行。哈哈哈哈果然自动换行但是能最多两行吗","source":"1药网","count":100 },
      { "id": 1, "name": "文章标题,测试文章长度是否OK，展示是否有问题，", "detial": "文章详情，我是来测试文章以供有几行的，每一行是多少，展示多少合适，是否换行。哈哈哈哈果然自动换行但是能最多两行吗", "source": "1药网", "count": 100 },
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  showDetail(event) {
    console.log(event);
    let id = event.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../newDetail/newDetail?id='+id,
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
