const app = getApp()
var cartData = require("../../data/cart.js")

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    totalPrice: 0,
    selectedAllStatus: false,
    goodList:''
  },
  onShow() {
    this.getTotalPrice(); //此处若不写，总价无法显示
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
    this.setData({
      goodList: cartData.cartData
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //获取总价
  getTotalPrice() {
    var goodList = this.data.goodList;                // 获取购物车列表
    var total = 0;
    for (var i = 0; i < goodList.length; i++) {         // 循环列表得到每个数据
      if (goodList[i].selected) {                   // 判断选中才会计算价格
        total += goodList[i].count * goodList[i].price;     // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      totalPrice: total
    });
  },

  /* 点击减号 */
  bindMinus: function (e) {
    var index = e.currentTarget.dataset.index;
    var goodList = this.data.goodList;
    var count = goodList[index].count;
    // 如果大于1时，才可以减  
    if (count > 1) {
      count--;
    }

    goodList[index].count = count;
    // 将数值与状态写回  
    this.setData({
      goodList: goodList
    });
    this.getTotalPrice();
  },
  /* 点击加号 */
  bindPlus: function (e) {
    var index = e.currentTarget.dataset.index;
    var goodList = this.data.goodList;
    var count = goodList[index].count;
    // 不作过多考虑自增1  
    count++;

    goodList[index].count = count;
    // 将数值与状态写回  
    this.setData({
      goodList: goodList
    });
    this.getTotalPrice();
  },

  //单选
  bindCheckbox: function (e) {
    var index = e.currentTarget.dataset.index;
    var goodList = this.data.goodList;
    var selected = goodList[index].selected;

    goodList[index].selected = !selected;

    this.setData({
      goodList: goodList
    });
    this.getTotalPrice();
  },

  //全选
  selectAll: function (e) {
    var selectedAllStatus = this.data.selectedAllStatus;
    var goodList = this.data.goodList;
    selectedAllStatus = !selectedAllStatus;

    for (var i = 0; i < goodList.length; i++) {
      goodList[i].selected = selectedAllStatus;
    }

    this.setData({
      goodList: goodList,
      selectedAllStatus: selectedAllStatus
    });
    this.getTotalPrice();
  },


})
