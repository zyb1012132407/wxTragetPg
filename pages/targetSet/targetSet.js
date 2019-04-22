Page({

  /**
   * 页面的初始数据
   */
  data: {
    modaltitle:"null1",
    modalcontent:"null2a",

  },
  show:function(){
    wx.showModal({
      title: '友情提示',
      content: '赶快定制自己喜欢的目标吧！',
      showCancel:false,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  
})