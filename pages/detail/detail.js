// pages/detail/detail.js
var cakeList = require("../../data/cake.js")
Page({
  data: {
    list: '',
    count:0
  },

 onLoad:function (option){
   
   const index = option.index;
   
   const dl = cakeList.cakeList[index];
   console.log(dl)
   this.setData({
     id:dl.id,
     name:dl.name,
     price:dl.price,
     num:dl.num,
     img:dl.img,
     imglist:dl.imglist
   })
   
 },


  /* 点击减号 */
  bindMinus: function () {
    var count = this.data.count;
    // 如果大于1时，才可以减  
    if (count > 1) {
      count--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  

    // 将数值与状态写回  
    this.setData({
      count: count
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var count = this.data.count;
    // 不作过多考虑自增1  
    count++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  

    // 将数值与状态写回  
    this.setData({
      count: count
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var count = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      count: count,
    });
  }  
})