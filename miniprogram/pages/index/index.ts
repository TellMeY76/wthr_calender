
const app = getApp<IAppOption>()
import { ApiList, GET_WTHR_KEY } from "../../configs/api";
import { CalendarDay } from "../../configs/calender";
import { HeWeather } from "../../configs/weather"

let dateWthr: CalendarDay[] = [];

Page({
  hasLocation: false,
  data: {
    formatter: (day: CalendarDay) => {
      return day;
    },
    showView: false,
    hasLocation: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  onLoad() {
    this.showLoadingModal();
    this.getLocation();
  },

  getLocation: function () {
    const _this = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        _this.getWthr(res.latitude, res.longitude);
      },
      fail() {
        _this.getLocationFail()
      }
    })
  },

  getLocationFail() {
    this.setData({
      showView: true,
      formatter: (day: CalendarDay) => {
        return day;
      },
    })
    wx.hideLoading()
  },

  showLoadingModal() {
    wx.showLoading({
      title: '日历生成中。。。'
    })
  },

  resetFormatter() {
    const formatter = (day: CalendarDay) => {
      const currDay = new Date();
      const wthrDayLen = dateWthr.length || 0;
      if (wthrDayLen) {
        const difValue = Math.ceil((day.date.getTime() - currDay.getTime()) / (1000 * 60 * 60 * 24));
        if (difValue >= 0 && difValue + 1 <= wthrDayLen) {
          day.topInfo = dateWthr[difValue].topInfo
          day.bottomInfo = dateWthr[difValue].bottomInfo
        }
      }
      return day;
    }
    this.setData({
      hasLocation: true,
      showView: true,
      formatter
    })
    wx.hideLoading()
  },

  getWthr(lat: number, lon: number) {
    const _this = this;
    const url = `${ApiList.GET_WTHR}?location=${lon},${lat}&key=${GET_WTHR_KEY}`
    app.fetchApi.fetch("GET", url).then((res: HeWeather) => {
      const forecastList = res.HeWeather6[0].daily_forecast;
      dateWthr = <CalendarDay[]>forecastList.map(item => {
        const topInfo = item.cond_txt_n
        const bottomInfo = `${item.tmp_min}℃~${item.tmp_max}℃`
        return { topInfo, bottomInfo }
      })
      _this.resetFormatter()
    })
  },

  openSetting: function () {
    const _this = this
    wx.openSetting({
      success(res) {
        const auth = res.authSetting
        console.log('userLocation', auth["scope.userLocation"])
        if (auth["scope.userLocation"]) {
          _this.getLocation();
        } else {
          _this.getLocationFail()
        }
      }
    })
  }

})
