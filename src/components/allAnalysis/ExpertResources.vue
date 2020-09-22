<template>
  <div class="expert-resources" @click="toPath">
    <div class="card-title">专家资源(人数)</div>
    <!-- <div class="unit">
      <div class="circle"></div>
      <div class="desc">专家人数（个）</div>
    </div> -->
    <loading v-if="loading" />
    <e-charts ref="chart" v-else :initOptions="initOptions" :options="options" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { api_expertResources } from '@/api/allProject'
import echarts from 'echarts'
import { plainData, convertPx } from '@/utils/utils'
const width = 470*window.scale
const height = 250*window.scale
const default_data = {
  total: 0,
  list: [
    { name: '暂未公布', num: 0 },
    { name: '暂未公布', num: 0 },
    { name: '暂未公布', num: 0 },
    { name: '暂未公布', num: 0 },
    { name: '暂未公布', num: 0 }
  ]
}
export default {
  name: 'ExpertResources',
  props: {
    industryNo: String
  },
  data () {
    return {
      initOptions: {
        width: `${width}px`,
        height: `${height}px`
      },
      dataLen: 0,
      isBarChart: false,
      curIndex: 0,
      timer: null,
      loading: false,
      options: {
        radar: [
          {
            indicator: [],
            center: ['50%', '50%'],
            radius: '55%',
            name: {
              formatter: function (params, indicator) {
                let text = ''
                if (indicator.value && params !== '暂未公开') {
                  if (!params) {
                    params = '暂未公开'
                  }
                  text = '{value|' + indicator.value + '}' + '\n' + '{name|' + params + '}'
                } else {
                  text = '{name|' + params + '}'
                }
                return text
              },
              rich: {
                value: {
                  align: 'center',
                  fontSize: convertPx(16),
                  color: '#ffbf2a'
                },
                name: {
                  fontSize: convertPx(16),
                  color: 'rgba(255,255,255,1)'
                }
              },
            },
            axisLine: {
              show: false
            },
            splitLine: {
              lineStyle: {
                width: 4,
                color: '#202067'
              }
            },
            splitArea: {
              show: false
            }
          }
        ],
        polar: {
          radius: '55%',  
          center: ['50%', '50%'],
          show: false
        },
        radiusAxis: {
          min: 0,
          max: 0,
          show: false
        },
        angleAxis: {
          show: false,
          type: 'category',
          data: [],
          startAngle: 90,
          clockwise: false
        },
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        series: [
          {
            type: 'radar',
            symbol: 'none',
            symbolSize: 0,
            itemStyle: {
              color: '#FFC100',
              fontSize: convertPx(16)
            },
            data: []
          },
          {
            type: 'line',
            coordinateSystem: 'polar',
            z: 3,
            symbol: 'circle',
            lineStyle: {
              width: 0
            },
            itemStyle: {
              color: '#FFC100',
              fontSize: convertPx(16)
            },
            data: []
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
    this.getExpertResources()
  },
  watch: {
    industryNo (val) {
      if (val) {
        this.clearComInterval()
        this.curIndex = 0
        this.getExpertResources()
      }
    }
  },
  beforeDestroy () {
    this.clearComInterval()
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
    highLight () {
      const dataLen = this.dataLen
      this.options.series[1].data.map(item => {
        item.symbolSize = 10
        return {
          ...item
        }
      })
      let index = 0
      if (this.curIndex === 0) {
        index = this.curIndex
      } else {
        index = dataLen - this.curIndex
      }
      this.options.series[1].data[index].symbolSize = 20
      this.options.series[1].data[index].itemStyle.fontSize = convertPx(16)
      this.curIndex = (this.curIndex + 1) % dataLen
    },
    setData (res) {
        let indicator = []
        let data = []
        let max = 0
        let result = null
        if (!res || !res.list || res.list.length === 0) {
          result = plainData(default_data)
        } else {
          result = plainData(res)
        }
        this.dataLen = res.list.length
        result.list.forEach(item => {
          max = max > item.num ? max : item.num
        })
        if (result.list.length < 3) {
          while(result.list.length < 5) {
            result.list.push({
              name: '暂未公开',
              num: 0,
              isHightLight: false
            })
          }
        }
        let lineData = []
        const hasData = result.list.some(i => i.num > 0)
        result.list.forEach(item => {
          indicator.push({
            text: item.name,
            value: item.num
          })
          data.push(item.num)
          if (hasData) {
            lineData.push({
              value: item.num === 0 ? 0 : item.num / 1.2,
              symbolSize: 10,
              itemStyle: {
                color: '#FFC100',
                fontSize: convertPx(14)
              }
            })
          }
        })
        indicator.forEach(item => {
          item.max = max * 1.2
        })
        this.options.radar[0].indicator = indicator
        this.options.series[0].data = [
          { value: data }
        ]
        this.options.angleAxis.startAngle = (90 / data.length) * (data.length - 2)
        this.options.radiusAxis.max = max
        this.options.series[1].data = lineData
        if (this.timer) {
          clearInterval(this.timer)
        }
        if (hasData) {
          this.highLight()
          this.clearComInterval()
          // this.timer = setInterval(() => {
          //   this.highLight()
          // }, 3000)
        }
    },
    getExpertResources () {
      const { industryNo, allAnalysisData } = this
      if ((industryNo in allAnalysisData) && ('ExpertResource' in allAnalysisData[industryNo])) {
        this.loading = true
        const allData = plainData(allAnalysisData[industryNo]['ExpertResource'])
        this.setData(allData)
        this.loading = false
      } else {  
        this.loading = true
        api_expertResources({ industryNo: this.industryNo })
          .then((res) => {
            this.loading = false
            if (res.data) {
              const list = res.data.list.sort((a, b) => {
                return Number(b.num) - Number(a.num)  
              })
              if (list.length > 6) {
                res.data.list = list.slice(0, 6)
              } else {
                res.data.list = list
              }
            }
            this.storeAllAnalysis({ code: this.industryNo, key: 'ExpertResource', value: res.data })
            this.setData(res.data)
          })
      }
    },
    toPath() {
      this.$router.push({name: 'expert'})
    }
  }
}
</script>

<style scoped lang="scss">
.expert-resources{
  cursor: pointer;
  position: relative;
  width: 490px;
  height: 292px;
  margin: 14px 0 14px;
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
      background:rgba(255,191,42,1);
      // background:rgba(0, 141, 156, 0.8);
      border-radius: 50%;
    }
    .desc{
      font-size: 16px;
      margin-left: 10px;
    }
  }
}
</style>
