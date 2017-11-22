//index.js
//获取应用实例
const app = getApp()
var screenWidth
wx.getSystemInfo({
  success: function (res) {
    screenWidth = res.windowWidth
  }
})
//获取屏幕高度
var screenHeight
wx.getSystemInfo({
  success: function (res) {
    screenHeight = res.windowHeight
  }
})
Page({
  data: {
    actionSheetHidden: true,
    lat: 31.269459,
    long: 121.466799,
    selectMarker: 0,//当前选中的药箱控件ID
    controls: [
      {
        id: 0,
        iconPath: '/img/当前屏幕位置.png',
        position: {
          left: screenWidth / 2,
          top: screenHeight / 2,
          width: 51 / 2,
          height: 81 / 2,
        },
        clickable: true
      }, {
        id: 1,
        iconPath: '/img/客服.png',
        position: {
          left: screenWidth - 50,
          top: screenHeight - 50,
          width: 35,
          height: 35
        },
        clickable: true
      },
      {
        id: 2,
        iconPath: '/img/定位.png',
        position: {
          left: 20,
          top: screenHeight - 50,
          width: 30,
          height: 30,
        },
        clickable: true
      }],
    markers: [{
      iconPath: "/img/定位标.png",
      id: 0,
      latitude: 31.269459,
      longitude: 121.466799,
      width: 70 / 2,
      height: 81 / 2,
      callout:{
        content:'华为店',
        color:'#fff',
        fontSize:10,
        borderRadius:5,
        bgColor:'#000',
        padding:1,
        display: 'ALWAYS',
      }
    },
    {
      iconPath: "/img/定位标.png",
      id: 1,
      latitude: 31.231459,
      longitude: 121.431799,
      width: 70 / 2,
      height: 81 / 2,
      callout: {
        content: '总部店',
        color: '#fff',
        fontSize: 10,
        borderRadius: 5,
        bgColor: '#000',
        padding: 1,
        display: 'ALWAYS',
      }
    },
    {
      iconPath: "/img/定位标.png",
      id: 2,
      latitude: 31.211459,
      longitude: 121.411799,
      width: 70 / 2,
      height: 81 / 2,
      callout: {
        content: '荣华东道店',
        color: '#fff',
        fontSize: 10,
        borderRadius: 5,
        bgColor: '#000',
        padding: 1,
        display: 'ALWAYS',
      }
    }],
  },
  // 地图中标记药箱点击
  markertap(e) {
    var res = this.data.markers
    res[this.data.selectMarker].iconPath = '/img/定位标.png'
    this.setData({
      markers: res
    })
    for (let i = 0; i < res.length; ++i) {
      if (e.markerId === res[i].id) {
        res[i].iconPath = '/img/选中定位标.png'
        this.setData({
          markers: res,
          selectMarker: i
        })
        break
      }
    }
  },
  // 地图功能键点击
  controltap(e) {
    if (e.controlId === 0) {

    }
    else if (e.controlId === 1) {
      wx.navigateTo({
        url: '../me/me'
      })
    }
    else if (e.controlId === 2) {
      this.resetLocal()
    }
  },
  // 重置位置到用户实时定位点
  resetLocal: function () {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          lat: res.latitude,
          long: res.longitude
        })
      }
    })
  },
  onLoad: function () {
    this.resetLocal()
  },
  // 转发分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.userInfo.nickName + '喊你收藏 24小时无人药店分布图 - 必备神器!',
      path: 'pages/map/map?source=xcx',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败请重试',
          icon: 'loading',
          duration: 1000
        })
      }
    }
  },
  // map滑动回调
  regionchange(e) {
    this.getCenterLocation()
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },
  getCenterLocation: function () {
    let that = this;
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.setData({
          lat: res.latitude,
          long: res.longitude
        })
      }
    })
  },
})
