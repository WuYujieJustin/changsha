import moment from 'moment'
const dateFormatStr = 'HH:mm:ss'
const dayFormatStr = 'YYYY-MM-DD'
export default {
  data () {
    return {
      timer: null,
      time: null,
      date: null,
      week: null,
      formateKeys: ['approvalInvestment', 'changeInvestment', 'winAmount']
    }
  },
  methods: {
    bigIntFormatter (val) {
      if (val > (1000 * 1000 * 1000 * 1000)) {
          return (val / (1000 * 1000 * 1000 * 1000)).toFixed(4) + '万亿'
      } else if ( val > (1000 * 1000 * 100)) {
          return (val / (1000 * 1000 * 100)).toFixed(2) + '亿'
      } else if (val > (1000 * 10)) {
          return (val / (1000 * 10)).toFixed(2) + '万'
      } else {
          return val
      }
    },
    setTime () {
      let that = this
      if (that.timer) {
        clearInterval(that.timer)
      }
      that.time = moment().format(dateFormatStr)
      that.timer = setInterval(() => {
        that.time = moment().format(dateFormatStr)
      }, 1000)
    },
    setDate () {
      this.date = moment().format(dayFormatStr)
      let day = moment().day()
      switch (day) {
        case 1:
          day = '星期一'
          break
        case 2:
          day = '星期二'
          break
        case 3:
          day = '星期三'
          break
        case 4:
          day = '星期四'
          break
        case 5:
          day = '星期五'
          break
        case 6:
          day = '星期六'
          break
        case 0:
          day = '星期日'
          break
      }
      this.week = day
    }
  }
}
