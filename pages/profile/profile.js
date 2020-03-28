Page({
  handleShowToast() {
    wx.showToast({
      title: '弹窗测试',
      duration: 3000,
      icon: 'assets/icon/go.png',
      mask: true,
      success: function () {
        console.log('展示弹窗成功')
      },
      fail: function () {
        console.log('展示弹窗失败')
      },
      complete: function () {
        console.log('完成函数的调用')
      }
    })
  },
  handleShowModal() {
    wx.showModal({
      title: '标题',
      content: '内容',
      success: function (res) {
        console.log(res)
        if (res.cancel) {
          console.log('点击取消')
        }
        if (res.confirm) {
          console.log('点击确定')
        }
      }
    })
  },
  handleShowLoading() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
  },
  handleShowAction() {
    wx.showActionSheet({
      itemList: ['相册', '拍照'],
      itemColor: 'grey',
      success: function (res) {
        if (res.tapIndex == 0) {

        }
      }
    })
  }

})