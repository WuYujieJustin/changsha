<template>
  <div class="project-progress">
    <div class="card-title">项目进度</div>
    <loading v-if="loading" />
    <div class="project-content" v-else>
      <transition-group :name="isAnimation ? 'list-animation' : 'list'" tag="div">
        <div @click.stop="toDetail(item)" class="project-item list-animation-item" v-for="(item, index) in projects" :key="item.id">
          <div class="project-item-row">
            <span class="project-item-title">{{ item.mediumlongProjectName || '项目名称暂未公布' }}</span>
            <span class="project-item-nature"> {{ item.natureCodeName || '类型' }}</span>
          </div>
          <div class="project-item-progress">
            <!-- <e-charts class="project-item-progress" ref="chart" :initOptions="initOptions" :options="item.option" /> -->
            <div class="project-progress-scale" :style="{ width: item.stageNum / item.stageTotal * 100 + '%' }"></div>
          </div>
          <div class="project-item-row project-item-info">
            <div class="name">{{ item.stageName || '无项目状态' }}</div>
            <div class="project-item-risk">风险：{{ item.riskLevel || '无' }}</div>
            <div class="project-item-date">周期：{{ item.beginDate || '---' }} ~ {{ item.endDate || '--' }}</div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { plainData } from '@/utils/utils'
import { api_projectProgress } from '@/api/allProject'
const project = {
  beginDate: null,
  endDate: null,
  mediumlongProjectName: null,
  natureCodeName: null,
  projectId: null,
  riskLevel: null,
  stageName: null,
  stageNum: 5,
  stageTotal: 6
}
const width = 424*window.scale
const height = 15*window.scale
export default {
  name: 'ProjectProgress',
  props: {
    industryNo: String
  },
  data () {
    return {
      projects: [],
      timer: null,
      helperArr: [],
      isAnimation: true,
      loading: false,
      initOptions: {
        width: `${width}px`,
        height: `${height}px`
      },
      testData: [
        {
          "mediumlongProjectName": "xx项目",//项目名称
          "beginDate": "2020-12",//计划开始日期
          "endDate": null,//计划结束日期
          "natureCodeName": "1",//建设性质:1新建；2续建
          "stageName": "规划阶段",//项目当前阶段
          "stageNum": 9,//项目当前阶段数
          "stageTotal": 10,//项目阶段总数
          "riskLevel": "低"//风险等级
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'allAnalysisData',
      'curYear'
    ])
  },
  created () {
    this.getProjectProgress()
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  watch: {
    industryNo () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.getProjectProgress()
    },
    curYear (val) {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.getProjectProgress()
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
    loop (interval = 7000) {
      this.timer = setInterval(() => {
        if (this.projects.length > 6) {
          this.helperArr.push(this.projects.shift())
        } else {
          this.helperArr.push(this.projects.shift())
          setTimeout(() => {
            this.projects.push(this.helperArr.shift())
          }, 100)
        }
      }, interval)
    },
    setData (res) {
      this.projects = []
      this.helperArr = []
      this.projects = res.map((item, index) => {
        let category= [{
          name: "管控",
          value: item.stageNum === 0 || item.stageNum === null ? 1 : item.stageNum
        }]
        let total = item.stageTotal
        let datas = []
        category.forEach(value => {
          datas.push(value.value)
        })
        const option = {
          xAxis: {
            max: total,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 0,
            top: 0, // 设置条形图的边距
            right: 0,
            bottom: 0
          },
          yAxis: [{
            type: "category",
            inverse: false,
            data: category,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }],
          series: [{
            // 内
            type: "bar",
            barWidth: 18,
            legendHoverLink: false,
            silent: true,
            itemStyle: {
              normal: {
                color: function(params) {
                  var color;
                  if(params.dataIndex==19){
                    color = {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: "#EB5118" // 0% 处的颜色
                      },
                        {
                          offset: 1,
                          color: "#F21F02" // 100% 处的颜色
                        }
                      ]
                    }
                  }else if(params.dataIndex==18){
                    color = {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: "#FFA048" // 0% 处的颜色
                      },
                        {
                          offset: 1,
                          color: "#B25E14" // 100% 处的颜色
                        }
                      ]
                    }
                  }else if(params.dataIndex==17){
                    color = {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: "#F8E972" // 0% 处的颜色
                      },
                        {
                          offset: 1,
                          color: "#E5C206" // 100% 处的颜色
                        }
                      ]
                    }
                  }else{
                    color = {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: "#1588D1" // 0% 处的颜色
                      },
                        {
                          offset: 1,
                          color: "#0F4071" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                  return color;
                },
              }
            },
            data: category,
            z: 1,
            animationEasing: "elasticOut"
          },
            {
              // 分隔
              type: "pictorialBar",
              itemStyle: {
                normal:{
                  color:"#061348"
                }
              },
              symbolRepeat: "fixed",
              symbolMargin: 6,
              symbol: "rect",
              symbolClip: true,
              symbolSize: [1, 21],
              symbolPosition: "start",
              symbolOffset: [1, -1],
              symbolBoundingData: this.total,
              data: category,
              z: 2,
              animationEasing: "elasticOut"
            }
          ]
        }
        item.option = option
        return {
          id: index,
          ...item
        }
      })
      this.projects = this.projects.length > 8 ? this.projects.slice(0, 7) : this.projects
      this.loading = false
      this.isAnimation = true
      if (this.projects.length > 5) {
        this.clearComInterval()
        this.loop()
      }
    },
    toDetail (item) {
      const id = item.projectId
      if (id) {
        this.$router.push({ name: 'MajorAnalysis', query: { id }})
      }
    },
    getProjectProgress () {
      this.isAnimation = false
      const { industryNo, allAnalysisData, curYear } = this
      const code = industryNo + curYear
      if (code in allAnalysisData && 'ProjectProgress' in allAnalysisData[code]) {
        this.loading = true
        const allData = plainData(allAnalysisData[code]['ProjectProgress'])
        this.setData(allData)
        this.loading = false
      } else {
      this.loading = true
      api_projectProgress({ budgetYear: this.curYear, industryNo: this.industryNo })
        .then((res) => {
            this.loading = false
            if (!res) {
              res = {}
              res.data = []
              res.data.push(project)
            } else if (res.data.length === 0) {
                res.data.push(project)
            } else {
              this.storeAllAnalysis({ code, key: 'ProjectProgress', value: res.data })
            }
            this.setData(res.data.slice(0, 15))
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.project-progress{
  position: relative;
  font-family:MicrosoftYaqiHei;
  width: 490px;
  height: 422px;
  box-sizing: border-box;
  margin-top: 26px;
  @include bis('~img/bg/all_left_bottom@2x.png');
  .project-content{
    padding: 60px 10px 10px;
    overflow-y: hidden;
    box-sizing: border-box;
    height: 400px;
    /*height: 100%;*/
  }
  .project-item{
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;
    height: 88px;
    cursor: pointer;
    .project-item-row{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    .project-item-title{
      max-width: 350px;
      overflow: hidden;
      height: 21px;
      line-height: 21px;
    }
    .project-item-progress{
      width: 424px;
      height: 15px;
      /*margin: 15px 0;*/
      // @include bis('~img/bg/progress_bg@2x.png');
      .project-progress-scale{
        height: 100%;
        @include bis('~img/bg/progress@2x.png');
      }
    }
    .project-item-nature{
      border:1px solid rgba(35,122,235,0.7);
      background:rgba(35,122,235,0.3);
      border-radius:2px;
      font-size: 12px;
      padding: 2px 7px;
      margin-left: 11px;
    }
    .project-item-info{
      font-size: 12px;
      white-space: nowrap;
      height: auto;
      margin-bottom: 11px;
      width: 100%;
    }
    .name{
      /*flex: 1;*/
    }
    .project-item-risk{
      margin-left: 10px;
      margin-right: 10px;
      font-size: 12px;
      white-space: nowrap;
    }
    .project-item-date{
      text-align: right;
      font-size: 12px;
      line-height: 12px;
      white-space: nowrap;
      flex: 1;
    }
  }
}
</style>