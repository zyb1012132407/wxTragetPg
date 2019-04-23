/*
姓名：目标完成（模块）
作者：Yanbo Zhao(zyb1012132407)
GitHub项目: https://github.com/zyb1012132407/wxTarget（目前私有）
版本: 1.0.0
进度: 目标功能完善的差不多了，本地存储，时间判断还没有确定，金币接口待定，给朱敏（儿子）做了注释。
*/
var app = getApp()

//这里不是赋值，而是指向（target改变,全局变量的target也会改变）
var target = app.globalData.target

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //全局变量，用targets指向app的target
    targets:app.globalData.target,
    coinsP:app.globalData.coins,

    //检测输入的变量
    targetText:null,
    targetDays:null,
    //添加按钮是否隐藏
    addButtonHidden:false,

    //遮罩层是否显示
    disp:"none",

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断target的长度是否到5，到5，隐藏添加按钮；不到5,显示添加按钮
    if (target.length == 5) {
      //到5，隐藏添加按钮
      this.setData({
        addButtonHidden: true,
      })
    }else{
      //不到5,显示添加按钮
      this.setData({
        addButtonHidden: false,
      })
    }
    //没有目标的时候，提示添加目标（Modal提示）
    if(target.length == 0){
      wx.showModal({
        title: '还没有目标偶',
        content: '您还没有目标，快添加吧！',
        showCancel:false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  },
  onShow:function(options){
    this.setData({
      coinsP: app.globalData.coins,
    })
  },
  //启动添加函数界面（遮罩层）
  addTargetPageLaunch:function(){
    //设置遮罩层显示
    this.setData({
      disp:"block",
    })
  },

  //监控新建函数内容（完成目标 完成日期）
  inputTarget:function(res){
    //监控目标内容
    if (res.currentTarget.id == "targetText"){
      this.setData({
        targetText: res.detail.value
      })
    //监控目标天数（以后可能会换 到时候弄前端再说吧）
    }else if (res.currentTarget.id == "targetDays"){
      this.setData({
        targetDays: res.detail.value
      })
    }
  },
  //监控新目标输入并提交新目标（输入区缓存未清空）
  inputTargetPush:function(res){
    //定义要添加的目标
    var obj = {
      id: target.length,
      targetText:this.data.targetText,
      targetProgress: 0,
      allDays: this.data.targetDays,
      finishDays:0,
      todayDone: false,
    }

    //将目标添加到target数组中
    target.push(obj)
    
    //添加Toast
    wx.showToast({
      title: '添加成功 金币+20',
      image: "image/check-circle.png",
      duration: 2000,
    })
    //增加金币
    app.globalData.coins += 20;
    //刷新targets(虽然指向，但是只是刷新一下，稳定)
    this.setData({
      targets: target,
      coinsP: app.globalData.coins,
      disp: "none",
    })
    //重载生命周期的onLoad()
    this.onLoad();
  },

  //点击遮罩层以外内容，取消目标添加
  hide: function () {
    //关闭遮罩层，取消添加目标
    this.setData({
      disp: "none"
    })
  },

  // 完成任务，增加进程
  addProgress: function (res) {

    //判断今日目标是否完成
    if (target[res.target.id].todayDone) {
      wx.showToast({
        title: '目标已完成',
        image: "image/close-circle.png",
        duration: 2000,
      })
      return;
    }

    //完成今日目标
    wx.showToast({
      title: '完成今日目标',
      icon: 'success',
      duration: 2000
    })

    //添加进度
    target[res.target.id].finishDays += 1;
    target[res.target.id].targetProgress += (100 / target[res.target.id].allDays);
    target[res.target.id].todayDone = true;

    //定义两个变量，用于解决success闭包问题
    var thispage = this;
    var targetToDel = target[res.target.id].id;

    //判断进度是不是达到或超过100，如果是则提示成功，并删除目标
    if (target[res.target.id].targetProgress >= 100){
      //增加金币
      app.globalData.coins += 50;
      wx.showModal({
        title: '恭喜',
        content: '恭喜完成目标，再接再厉！ 金币+50',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log(targetToDel);
            thispage.delTargetBackground(targetToDel);
          }
        }
      })
    }
    //刷新targets数组
    this.setData({
      targets: target,
      coinsP: app.globalData.coins,
    })
  },

  //根据id号删除Target
  delTargetBackground: function (delNum){
    // 开始删除目标
    target.splice(delNum, 1);

    //删除目标的id号前移
    for (var i = delNum; i < target.length; i++) {
      target[i].id -= 1;
    }
    //刷新targets数组
    this.setData({
      targets: target,
    })
    //重载生命周期的onLoad()
    this.onLoad();
  },
  
  //删除目标（绑定目标长按事件）
  delTarget:function(inputDelTarget){

    //定义两个变量用于解决success闭包问题
    var thispage = this;
    var targetToDel = inputDelTarget;

    //确定是否删除目标（Modal提示）
    wx.showModal({
      title: '确定是否删除？',
      content: '注意删除目标，将会扣除金币！',
      showCancel: true,
      success(res) {
        if (res.confirm) {
          //确认后调用后台删除目标
          thispage.delTargetBackground(targetToDel.currentTarget.id);
          app.globalData.coins -= 50;
          thispage.setData({
            coinsP: app.globalData.coins,
          })
          wx.showToast({
            title: '金币-50',
            image: "image/close-circle.png",
            duration: 2000,
          })

        } else if (res.cancel) {
          //待修改
          // console.log('用户点击取消')
        }
      }
    })
  },
})