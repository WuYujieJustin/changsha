<template>
  <div class="work-order" @click="toPath">
    <div class="card-title">工单统计(个数)</div>
    <!-- <div class="unit">
      <div class="circle"></div>
      <div class="desc">工单数量（个）</div>
    </div> -->
    <loading v-if="loading" />
    <e-charts v-else ref="chart" :initOptions="initOptions" :options="options" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { api_workOrder } from '@/api/allProject'
import { plainData, convertPx } from '@/utils/utils'
const width = 470*window.scale
const height = 280*window.scale
const workorder = {
  name: null,
  num: null
}
export default {
  name: 'WorkOrder',
  props: {
    industryNo: String
  },
  data () {
    return {
      curIndex: -1,
      isEmpty: false,
      loading: false,
      timer: null,
      initOptions: {
        width: `${width}px`,
        height: `${height}px`
      },
      options: {
        grid: {
          top: '20%',
          left: '20%',
          bottom: '25%',
          right: '20%'
        },
        tooltip:{
          show: false
        },
        xAxis: {
          offset: 10,
          data: ['中电', '中软', '其他'],
          axisLabel: {
            show: true,
            barCategoryGap: '40%',
            textStyle: {
              color: '#fff',
              fontSize: convertPx(14)
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#40EAFF',
              width: 2
            }
          }
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: 'pictorialBar',
            animation: true,
            hoverAnimation: false,
            barCategoryGap: '-100%',
            color: 'rgba(0, 141, 156, 0.8)',
            symbol: 'path://M0,10 L10,10 C4.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            data: [84, 92, 88],
            label: {
              show: !this.isEmpty,
              position: 'top',
              color: '#fff',
              fontSize: convertPx(16),
              formatter: (params) => this.isEmpty ? '--' :  params.data
            },
            emphasis: {
              itemStyle: {
                color: '#00E2DF'
              },
              label: {
                fontSize: convertPx(16)
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'allAnalysisData'
    ])
  },
  created () {
    this.getWorkOrder()
  },
  beforeDestroy () {
    this.clearComInterval()
  },
  watch: {
    industryNo (val) {
      if (val) {
        this.clearComInterval()
        this.getWorkOrder()
      }
    }
  },
  methods: {
    ...mapActions({
      'storeAllAnalysis': 'allProject/storeAllAnalysis'
    }),
    highLight () {
      if (!this.$refs.chart) {
        return
      }
      const myChart = this.$refs.chart.chart
      const dataLen = this.options.series[0].data.length
      // 取消之前高亮的图形
      myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.curIndex
      })
      this.curIndex = (this.curIndex + 1) % dataLen
      myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.curIndex
      })
      // 显示 tooltip
      myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: this.curIndex
      })
    },
    clearComInterval () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    setData (res) {
      const xAxisData = []
      const chartData = []
      res.forEach((item) => {
        xAxisData.push(item.name || '暂未公开')
        chartData.push(item.num || 10)
      })
      this.options.xAxis.data = xAxisData
      this.options.series[0].data = chartData
      this.clearComInterval()
      this.timer = setInterval(() => {
        this.highLight()
      }, 2000)
    },
    getWorkOrder () {
      const { industryNo, allAnalysisData } = this
      if ((industryNo in allAnalysisData) && ('WorkOrder' in allAnalysisData[industryNo])) {
        this.loading = true
        const allData = plainData(allAnalysisData[industryNo]['WorkOrder'])
        this.setData(allData)
        this.loading = false
      } else {
        this.loading = true
        api_workOrder({ industryNo })
          .then((res) => {
            if (res) {
              this.loading = false
              if (res.data.length === 0) {
                this.isEmpty = true
                for(let i = 0; i< 3; i++) {
                  res.data.push(workorder)
                }
              } else {
                this.storeAllAnalysis({ code: industryNo, key: 'WorkOrder', value: res.data })
              }
              this.setData(res.data)
            }
          })
      }
    },
    toPath() {
      this.$router.push({name: 'workOrder'})
    }
  }
}
</script>

<style scoped lang="scss">
.work-order{
  cursor: pointer;
  position: relative;
  width: 490px;
  height: 300px;
  // margin: 14px 0 26px;
  padding-top: 40px;
  box-sizing: border-box;
  @include bis('~img/bg/all_right_center@2x.png');
  .unit{
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    .circle{
      width:10px;
      height:10px;
      background:rgba(0, 141, 156, 0.8);
      border-radius: 50%;
    }
    .desc{
      font-size: 16px;
      margin-left: 10px;
    }
  }
}
</style>
