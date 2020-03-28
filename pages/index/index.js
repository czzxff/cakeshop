//index.js
//获取应用实例
const app = getApp()
// var bannerData = require("../../data/banner.js")
// var hotGood = require("../../data/hotGood.js")

Page({
  data: {
    motto: 'Hi~~~~~',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hotList: '',
    bannerList: ''  
  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    // this.setData({
    //   //获取本地模拟数据
    //   hotList: hotGood.hotGood,
    //   bannerList:bannerData.bannerList
    // })  
    let that = this;//出错原因经常是这个，需注意


    wx.request({
      url: 'http://127.0.0.1:8080/cake',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          hotList: res.data,
          bannerList: res.data
        })
      },
      fail: function (res) {
        console.log("失败");
      }
    })
  },
  toDetail(e) {
    const index = e.currentTarget.dataset.index;
    console.log(e.currentTarget);
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index,
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
})
