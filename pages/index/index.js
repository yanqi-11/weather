// pages/index/index.js
const {
  config
} = getApp();
Page({
  /**
   * 页面的初始数据
   */

  data: {
    ishei: false,
    nows: {},
    hours:[],
    daily:[]
  },
  fetachData(lat, long) {
    wx.request({
      url: config.url + "/v7/weather/now",
      data: {
        location: long + "," + lat,
        key: config.key
      },
      success:res => {  
        // let now = res.data.now;  
        // console.log(res.data.now)  
        if(res.data.code === "200"){       
          this.setData({
            nows:res.data.now
          })
        }else{

        }
        
      }
    })
  },
  fetachHoursData(lat, long) {
    wx.request({
      url: config.url + "/v7/weather/24h",
      data: {
        location: long + "," + lat,
        key: config.key
      },
      success:res => {  
        console.log(res.data.hourly) 
        if(res.data.code === "200"){       
          this.setData({
            hours:res.data.hourly
          })
          
        }else{

        }
        
      }
    })
  },
  fetachDailyData(lat, long) {
    wx.request({
      url: config.url + "/v7/weather/7d",
      data: {
        location: long + "," + lat,
        key: config.key
      },
      success:res => {  
        console.log(res.data.daily) 
        if(res.data.code === "200"){       
          this.setData({
            daily:res.data.daily
          })
          
        }else{

        }
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      success: res => {
        let {
          latitude,
          longitude
        } = res;
        this.fetachData(latitude, longitude);
        this.fetachHoursData(latitude, longitude);
        this.fetachDailyData(latitude, longitude);
      }
    })
    let now = new Date();
    let hours = now.getHours();
    if (hours >= 18 || hours <= 6) {
      this.setData({
        ishei: true,
        
      })
    }
    // console.log(this.data.nows)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})