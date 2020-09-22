<template>
  <div class="all-counts">
    <loading v-if="loading" />
    <div v-if="!loading" class="count-item" v-for="(item, index) in items" :key="index">
      <e-charts auto-resize :initOptions="item.initOptions" :options="item.options" />
    </div>
    <div v-if="!loading" class="count-content">
      <div class="count-info">
        <div v-if="!isEmpty && total.approvalInvestment" class="count-info-value">{{total.approvalInvestment}}</div>
        <div v-else class="count-info-value">{{total.approvalInvestment || '暂无数据'}}</div>
        <div class="count-info-name">批复估算/概算</div>
      </div>
      <div class="count-info-sp">|</div>
      <div class="count-info">
        <div v-if="!isEmpty && total.winAmount" class="count-info-value">{{total.winAmount}}</div>
        <div v-else class="count-info-value">{{total.winAmount || '暂无数据'}}</div>
        <div class="count-info-name">项目中标金额</div>
      </div>
      <div class="count-info-sp">|</div>
      <div class="count-info">
        <div v-if="!isEmpty && total.changeInvestment" class="count-info-value">{{total.changeInvestment}}</div>
        <div v-else class="count-info-value">{{total.changeInvestment || '暂无数据'}}</div>
        <div class="count-info-name">累计核减金额</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dateMixins from '@/mixins/dateMixins'
import { plainData, convertPx } from '@/utils/utils'
import { api_projetData } from '@/api/allProject'
import echarts from 'echarts'
const mockData = {
  approvalInvestment: '暂无数据',
  changeInvestment: '暂无数据',
  yearPlanNum: '暂无数据',
  winAmount: '暂无数据',
  projectApplyNum: '暂无数据',
  planTotalMoney: '暂无数据',
  projectBuildNum: '暂无数据',
  projectCheckNum: '暂无数据'
}
export default {
  name: 'AllCounts',
  mixins: [dateMixins],
  props: {
    industryNo: String
  },
  data () {
    return {
      value: null,
      curIndex: 0,
      loading: false,
      timer: null,
      options: {},
      items: [
        { splitNumber: 15, name: '年计划项目数(个)', num: 100, key: 'yearPlanNum', initOptions: { width: `${130*window.scale}px`,height: `${120*window.scale}px`}, length: 8, options: {}, realData: 0 },
        { splitNumber: 20, name: '计划申报数(个)', num: 100, key: 'projectApplyNum', initOptions: { width: `${150*window.scale}px`,height: `${150*window.scale}px`}, length: 10, options: {},realData: 0 },
        { splitNumber: 30, name: '总计划金额(万元)', num: 100, key: 'planTotalMoney', initOptions: { width: `${200*window.scale}px`,height: `${200*window.scale}px`}, length: 15, options: {}, realData: 0  },
        { splitNumber: 20, name: '建设中项目(个)', num: 100, key: 'projectBuildNum', initOptions: { width: `${150*window.scale}px`,height: `${150*window.scale}px`}, length: 10, options: {}, realData: 0  },
        { splitNumber: 15, name: '已验收项目数(个)', num: 100, key: 'projectCheckNum', initOptions: { width: `${130*window.scale}px`,height: `${120*window.scale}px`}, length: 8, options: {}, realData: 0  }
      ],
      total: '',
      allData: {},
      isEmpty: false
    }
  },
  computed: {
    ...mapGetters([
      'allCountData',
      'curYear'
    ])
  },
  created () {
    this.getStageData()
  },
  watch: {
    curYear (val) {
      if (val) {
        if (this.timer) {
          clearInterval(this.timer)
        }
        this.getStageData()
      }
    }
  },
  methods: {
    ...mapActions({
      'storeAllCount': 'allProject/storeAllCount'
    }),
    animatePointer () {
      this.items = this.items.map(item => {
        item.options.series[0].data = 0
        item.options.series[0].axisLine.lineStyle.color[0][0] = 0
        item.options.series[1].axisLine.lineStyle.color[0][0] = 0
        return {
          ...item
        }
      })
    },
    initMockData () {
      this.allData = mockData
    },
    clearComInterval () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    reset () {
      this.items.forEach((item, index) => {
          item.options.series[0].data = [{name: item.label, value: 0 }]
          setTimeout(() => {
            item.options.series[0].data = [{name: item.label, value: item.realData * 100 }]
          }, index * 2000 + 1000)
      })
    },
    initOpt () {
      this.items.map((item, index) => {
        const options = {
          grid: {
            bottom: '50px'
          },
          series: [
            {
              name: '统计',
              type: 'gauge',
              splitNumber: 15, // 刻度数量
              radius: '90%', // 图表尺寸
              center: ['50%', '50%'],
              startAngle: 195, // 刻度起始
              endAngle: -15, // 刻度结束
              axisLine: {
                show: true,
                lineStyle: {
                  width: 0,
                  shadowBlur: 0,
                  color: [
                    [0.8, "#00E2DF"],
                    [1, "#2C3638"]
                  ],
                }
              },
              animation: true,
              animationDuration: 3000,
              // animationDelay: function (index) {
              //   return (index + 1) * 1000
              // },
              axisTick: {
                show: true,
                lineStyle: {
                  color: 'auto',
                  width: 4
                },
                length: 15,
                splitNumber: 2
              },
              splitLine: {
                show: false,
                length: 30,
                lineStyle: {
                  color: 'auto'
                }
              },
              axisLabel: {
                show: false
              },
              pointer: { // 仪表盘指针
                show: true,
                length: '70%',
                width: 4
              },
              detail: {
                borderColor: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 2,
                offsetCenter: [0, '3%'], // x, y，单位px
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  color: '#fff',
                  fontSize: convertPx(12),
                  fontWeight: 'bold'  
                },
                padding: [60, 0, 0, 0],
                rich: {
                  label: {
                    color: '#00DDF8',
                    fontSize: convertPx(12),
                    padding: [convertPx(5), 0, 0 , 0]
                  },
                  value: {
                    color: '#fff',
                    fontSize: convertPx(12),
                  }
                }
              },
              data: []
            },
              {
                name: item.name,
                type: 'gauge',
                radius: '60.10%',
                startAngle: 195, // 刻度起始
                endAngle: -15, // 刻度结束
                min: 0,
                max: 100,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 150,
                        color: [
                            [
                                0.6, new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0, [{
                                            offset: 0,
                                            color: 'rgba(69, 161, 255,0)',
                                        }, {
                                            offset: 0,
                                            color: 'rgba(69, 161, 255,0)',
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(69, 161, 255,0.7)',
                                        }
                                    ]
                                )
                            ],
                            [
                                1, 'rgba(28,128,245,.0)'
                            ]
                        ],
                    }
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: 0,
                },
                axisLabel: {
                    show: 0
                },
                pointer: {
                    show: false,
                    length: '100%'
                },
                detail: {
                    show: false,
                    // offsetCenter: [1, '1%'],
                    textStyle: {
                        fontSize: 90,
                        color: '#0AFCE0'
                    },

                },
                itemStyle: {
                    color: 'rgba(28, 128, 245,.3)',
                    borderColor: 'rgba(28, 128, 245,1)',
                }
            },
            ,{
                type: 'gauge',
                radius: '100%',
                splitNumber: 10,
                splitLine: {
                    show: false
                },
                min: 0,
                max: 100,
                startAngle: 195, // 刻度起始
                endAngle: -15, // 刻度结束
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        shadowBlur: 0,
                        color: [
                            [0.05, '#00DDF8'],
                            [0.10, '#00DDF8'],
                            [0.15, '#00DDF8'],
                            [0.20, '#00DDF8'],
                            [0.25, '#00DDF8'],
                            [0.30, '#00DDF8'],
                            [0.35, '#00DDF8'],
                            [0.40, '#00DDF8'],
                            [0.45, '#00DDF8'],
                            [0.50, '#00DDF8'],
                            [0.55, '#00DDF8'],
                            [0.60, '#00DDF8'],
                            [0.65, '#00DDF8'],
                            [0.70, '#00DDF8'],
                            [0.75, '#00DDF8'],
                            [0.80, '#00DDF8'],
                            [0.85, '#00DDF8'],
                            [0.90, '#00DDF8'],
                            [0.95, '#00DDF8'],
                            [1, '#00DDF8']
                        ],

                    }

                },
                pointer: {
                    show: 0
                },
                axisTick: {
                    show: false
                },
                detail: {
                    show: false
                }

            }
          ]
        }
        let value = 0.5
        if (!this.isEmpty) {
          if (this.total[item.key]) {
            value = this.total[item.key] / (this.total[item.key] + 30 + this.total[item.key] * 0.1)
          }
        }
        this.value = value
        options.series[0].data = [{name: item.label, value: this.value *100 }]
        options.series[0].axisLine.lineStyle.color[0][0] = this.value
        options.series[1].axisLine.lineStyle.color[0][0] = this.value
        options.series[0].title = item.name
        options.series[0].axisTick.length = item.length
        options.series[0].splitNumber = item.splitNumber
        options.series[0].animationDelay = 3000 * index
        options.series[0].detail.formatter = () => {
          if (this.isEmpty) {
            return  '{label|暂无数据}' + '\n' +  `{value|${item.name}}`
          } else {
            const data = item.key === 'planTotalMoney' ? this.bigIntFormatter(this.total[item.key])  : this.total[item.key]
            return  `{label|${data}}` + '\n' +  `{value|${item.name}}`
          }
        }
        item.realData = value
        item.options = options
        return {
          ...item
        }
      })
    },
    getStageData () {
      const { industryNo, allCountData } = this
      // if (allCountData) {
      //   // const allData = plainData(allAnalysisData[industryNo]['ProjectProgress'])
      //   this.total = plainData(allCountData)
      //   this.initOpt()
      // } else {
        this.loading = true
        api_projetData({ budgetYear: this.curYear })
          .then((res) => {
            if (!res.data) {
              this.isEmpty = true
              this.initMockData()
            } else if (res.data.length === 0) {
              this.isEmpty = true
              this.initMockData()
            } else {
              this.storeAllCount(res.data)
              this.allData = res.data
            }
            const helper = {}
            Object.keys(this.allData).forEach(key => {
              if (this.formateKeys.includes(key)) {
                helper[key] = this.bigIntFormatter(Number(this.allData[key]))
              } else {
                helper[key] = this.allData[key]
              }
            })
            this.total = helper
            this.initOpt()
            this.clearComInterval()
            // this.timer = setInterval(() => {
            //     this.reset()
            // }, 15000)
            this.loading = false
          })
      }
    // }
  }
}
</script>

<style scoped lang="scss">
.all-counts{
  // position: fixed;
  // left: 520px;
  // top: 700px;
  // bottom: 0;
  // transform: translateX(-50%);
  position: relative;
  margin-top: 20px;
  // width: 880px;
  height: 261px;
  @include bis('~img/bg/all_center.png');
  .count-item{
    position: absolute;
    text-align: center;
    .count-item-num{
      color: $color-blue;
    }
    &:nth-of-type(5n + 1) {
      left: 30px;
      bottom: 0px;
      .count-item-num{
        width: 94px;
        height: 59px;
        font-size: 16px;
        padding-top: 33px;
        box-sizing: border-box;
        @include bis('~img/bg/count_small@2x.png');
      }
      .count-item-name{
        font-size: 12px;
      }
    }
    &:nth-of-type(5n + 2) {
      bottom: 30px;
      left: 27%;
      transform: translateX(-50%);
      .count-item-num{
        width: 142px;
        height: 89px;
        font-size: 20px;
        padding-top: 48px;
        box-sizing: border-box;
        @include bis('~img/bg/count_small@2x.png');
      }
      .count-item-name{
        font-size: 14px;
      }
    }
    &:nth-of-type(5n + 3) {
      left: 50%;
      top: 20px;
      transform: translateX(-50%);
      .count-item-num{
        width: 190px;
        height: 119px;
        font-size: 26px;
        padding-top: 63px;
        box-sizing: border-box;
        @include bis('~img/bg/count_small@2x.png');
      }
      .count-item-name{
        font-size: 18px;
      }
    }
    &:nth-of-type(5n + 4) {
      left: 73%;
      bottom: 30px;
      transform: translateX(-50%);
      .count-item-num{
        width: 142px;
        height: 89px;
        font-size: 20px;
        padding-top: 48px;
        box-sizing: border-box;
        @include bis('~img/bg/count_small@2x.png');
      }
      .count-item-name{
        font-size: 14px;
      }
    }
    &:nth-of-type(5n) {
      right: 30px;
      bottom: 0px;
      .count-item-num{
        width: 94px;
        height: 59px;
        font-size: 16px;
        padding-top: 33px;
        box-sizing: border-box;
        @include bis('~img/bg/count_small@2x.png');
      }
      .count-item-name{
        font-size: 12px;
      }
    }
  }
  .count-content{
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%);
    display: flex;
    text-align: center;
    font-size: 12px;
    align-items: center;
    .count-info{
      margin-right: 8px;
      .count-info-value{
        color: $color-dark-yellow;
        font-size: 16px;
      }
      .count-info-name{
        font-size: 14px;
      }
      .count-info-unit{
        font-size: 12px;
        // transform: scale(0.83);
      }
    }
    .count-info-sp{
      margin-right: 8px;
      margin-top: 20px;
    }
  }
}
</style>
