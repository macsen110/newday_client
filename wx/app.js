//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let _self = this;
    //获取用户的当前设置
    //返回值是用户对小程序的权限
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          //授权获取用户信息
          wx.authorize({
            scope: 'scope.userInfo',
            success(res) {
              _self.getUserInfo()
              // 用户已经同意小程序使用用户信息功能，后续调用 wx.startRecord 接口不会
            },
            complete(){
              if (!res.authSetting['scope.userLocation']) {
                wx.authorize({
                  scope: 'scope.userLocation',
                  success() {
                    // 用户已经同意小程序使用定位功能，后续调用 wx.startRecord 接口不会
                  }
                })
              }
            },
            fail() {
              _self.bindMobile()
            }
          })
        }
        else {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          _self.getUserInfo()
        }
      }
    })
    // 登录
    wx.login({
      success: res => {
        //console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
  },
  bindMobile() {
    console.log('bind mobile')
  },
  getUserInfo() {
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        this.userInfoReadyCallback && this.userInfoReadyCallback(res.userInfo)
      }
    })
  },
  userInfoReadyCallback(userInfo) {
    this.globalData.userInfo = userInfo
  },
  globalData: {
    userInfo: null
  }
})