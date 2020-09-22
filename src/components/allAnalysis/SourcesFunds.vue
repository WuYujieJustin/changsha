<template>
  <div class="sources-funds">
    <div class="card-title">资金来源(万元)</div>
    <loading v-if="loading" />
    <e-charts v-else ref="chart" :initOptions="initOptions" :options="options" auto-size />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { api_sourcesFunds } from '@/api/allProject'
import { plainData, convertPx } from '@/utils/utils'
import dateMixins from '@/mixins/dateMixins'
const width = 480*window.scale
const height = 230*window.scale
const mockData = {
  capitalSourceName: '暂未公布资金来源',
  money: 0
}
export default {
  name: 'SourcesFunds',
  mixins: [dateMixins],
  props: {
    industryNo: String
  },
  data () {
    return {
      allData: [],
      colors: ['#3A72FF', '#49B451', '#FFB03A', '#F13D3D', '#8F67D4', '#FF50C9', '#FF813E', '#3EBEFF', '#D8E267', '#AA542E'],
      isEmpty: false,
      loading: false,
      initOptions: {
        width: `${width}px`,
        height: `${height}px`
      },
      funds: [],
      timer: null,
      curIndex: -1,
      options: {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}',
            show: false
        },
        grid: {
          containLabel: true
        },
        color: ['#3A72FF', '#49B451', '#FFB03A', '#F13D3D', '#8F67D4', '#FF50C9', '#FF813E', '#3EBEFF', '#D8E267', '#AA542E'],
        series: [
          {
            type: 'pie',
            radius: ['30%', '60%'],
            center: ['50%', '50%'],
            // roseType: 'area',
            label: {
              formatter: (value) => {
                  let reg = new RegExp('[^\n]{1,'+7+'}','g')
                  let res = value.name.match(reg)
                  if (this.isEmpty) {
                    return `{label|${res.join('\n')}}`
                  } else {
                    return `{value|${
                      this.bigIntFormatter(value.data.money)
                    }}` + '\n' +  `{label|${res.join('\n')}}`
                  }
              },
              rich: {
                label: {
                  color: '#fff',
                  fontSize: convertPx(14),
                  lineHeight: convertPx(22)
                },
                value: {
                  fontSize: convertPx(14),
                  align: 'center',
                  lineHeight: convertPx(22)
                }
              }
            },
            labelLine: {
              length: convertPx(20),
              length2: convertPx(30)
            },
            itemStyle: {
              color: (params) => {
                return this.colors[params.dataIndex]
              }
            },
            emphasis: {
              label:{
                formatter: (value) => {
                    let reg = new RegExp('[^\n]{1,'+7+'}','g')
                    let res = value.name.match(reg)
                    if (this.isEmpty) {
                      return `{label|${res.join('\n')}}`
                    } else {
                      return `{value|${this.bigIntFormatter(value.data.money)}}` + '\n' +  `{label|${res.join('\n')}}`
                    }
                },
                rich: {
                  label: {
                    color: '#fff',
                    fontSize: convertPx(14),
                    lineHeight: convertPx(22)
                  },
                  value: {
                    fontSize: convertPx(14),
                    align: 'center',
                    lineHeight: convertPx(22)
                  }
                }
              }
            },
            data: []
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'allAnalysisData',
      'curYear'
    ])
  },
  created () {
    this.getSourcesFunds()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  watch: {
    industryNo (val) {
        this.clearComInterval()
        this.getSourcesFunds()
    },
    curYear () {
        this.clearComInterval()
        this.getSourcesFunds()
    }
  },
  methods: {
    ...mapActions({
      'storeAllAnalysis': 'allProject/storeAllAnalysis'
    }),
    clearComInterval () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    initMockData () {
      this.isEmpty = true
      this.allData = []
      for (let i = 0; i < 4; i++) {
        this.allData.push(mockData)
      }
    },
    getSourcesFunds () {
      const { industryNo, allAnalysisData, curYear } = this
      const code = industryNo + curYear
      if ((code in allAnalysisData) && ('SourcesFunds' in allAnalysisData[code])) {
        this.loading = true
        this.allData = plainData(allAnalysisData[code]['SourcesFunds'])
        this.setData()
        this.loading = false
      } else {
        this.loading = true
        api_sourcesFunds({ budgetYear: curYear, industryNo  })
          .then(res => {
            this.loading = false
            if (!res) {
              this.initMockData()
              this.setData()
              return
            }
            if (!res.data) {
              this.initMockData()
            } else if (res.data.length === 0) {
              this.initMockData()
            } else {
              this.allData = res.data
              this.storeAllAnalysis({ code, key: 'SourcesFunds', value: res.data })
            }
            this.setData()
          })
      }
    },
    setData () {
      this.funds = []
      this.options.series[0].data = this.allData.reduce((acc, cur) => {
        this.funds.push(cur.money)
        acc.push({
          name: cur.capitalSourceName,
          value: this.isEmpty ? Number(cur.money) : Math.log(Number(cur.money)).toFixed(0),
          money: Number(cur.money).toFixed(0)
        })
        return acc
      }, [])
      this.clearComInterval()
      this.timer = setInterval(() => {
        if (this.allData.length > 1) {
          this.highLight()
        }
      }, 2000)
    },
    highLight () {
      const myChart = this.$refs.chart.chart
      const dataLen = this.options.series[0].data.length
      // 取消之前高亮的图形
      myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.curIndex
      })
      this.curIndex = (this.curIndex + 1) % dataLen
      // 高亮当前图形
      myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.curIndex
      })
    }
  }
}
</script>

<style scoped lang="scss">
.sources-funds{
  position: relative;
  width: 490px;
  height: 280px;
  padding-top: 40px;
  box-sizing: border-box;
  @include bis('~img/bg/all_right_top@2x.png');
}
</style>
