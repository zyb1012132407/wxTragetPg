var app = getApp();

var usermoney = app.globalData.usermoney;

var addmoney = 0;

//今日的金币(待实行)
var coins = app.globalData.coins
// var coinsTemp = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addmoney:0,
    usermoneyShow:usermoney,
  },
  coinsInput:function(res){
    this.setData({
      addmoney: parseInt(res.detail.value),
    })
  },
  coinPush:function(){
    console.log("这次攒钱:" + this.data.addmoney);
    //用户攒下的所有钱
    usermoney += this.data.addmoney;
    console.log("用户的钱:" + usermoney);
    app.globalData.usermoney = usermoney;
    console.log("用户app钱" + app.globalData.usermoney);

    app.globalData.coins += 20;

    //添加Toast
    wx.showToast({
      title: '攒钱 金币+20',
      image: "../TargetPage/image/check-circle.png",
      duration: 2000,
    })
    console.log("用户金币:" + app.globalData.coins);

    this.setData({
      usermoneyShow: usermoney,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("用户app钱:" + app.globalData.usermoney);
  },

})