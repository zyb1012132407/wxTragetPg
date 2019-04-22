//app.js
App({
  onLaunch: function () {

  },
  globalData: {
    userinfo:null,
    coins:50,
    usermoney:50,
    target:[
      {
        id: 0,
        targetText: "我要学习0！",
        targetProgress: 0,
        allDays: 1,
        finishDays: 0,
        todayDone: false,
      },
      {
        id: 1,
        targetText: "我要学习1！",
        targetProgress: 0,
        allDays: 7,
        finishDays: 0,
        todayDone: false,
      },
      {
        id: 2,
        targetText: "我要学习2！",
        targetProgress: 0,
        allDays: 7,
        finishDays: 0,
        todayDone: false,
      },
      {
        id: 3,
        targetText: "我要学习3！",
        targetProgress: 0,
        allDays: 1,
        finishDays: 0,
        todayDone: false,
      },
      {
        id: 4,
        targetText: "我要学习4！",
        targetProgress: 0,
        allDays: 1,
        finishDays: 0,
        todayDone: false,
      }
    ],   
  }
})