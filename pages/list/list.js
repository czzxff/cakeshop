// var cakeList = require("../../data/cake.js")

Page({
  data: {
    "list": ''
  },
  toDetail(e){
    const index = e.currentTarget.dataset.index;
    console.log(e.currentTarget);
    wx.navigateTo({
      url: '/pages/detail/detail?index='+index,
    })
  },
  onLoad:function(){
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
          list: res.data
        })
      },
      fail: function (res) {
        console.log("失败");
      }
    })
    
  }
})
 

  