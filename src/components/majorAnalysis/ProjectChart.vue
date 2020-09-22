<template>
  <div class="project-flow">
    <div class="left-card" :style="{visibility: isShowCards, opacity: isShowCards==='hidden' ? 0 : 1}">
      <div v-for="(card, index) in cards" :key="index" class="card">
        <img class="card-img" :src="card.img">
        <div class="content">
          <div class="title">{{card.title}}</div>
          <span class="num">{{card.num}}</span>
          <span class="unit">{{card.unit}}</span>
        </div>
      </div>
    </div>
    <div class="source">
      <img ref="projectSource" :src="intl_source" alt="全市项目" class="logo">
      <div>全市项目</div>
    </div>
    <transition name="fade">
      <div class="project-type" :style="{visibility: isShowProjectTypes, opacity: isShowProjectTypes==='hidden' ? 0 : 1}">
          <div class="project" v-for="(project, index) in curIndustryList" :key="index">
              <img :class="[curProjectType === project.itemCode ? 'active' : 'default']" @click.stop="switchProjectType(project.itemCode)" :ref="project.itemCode" :src="imgCfg[project.itemCode] || default_icon" :alt="project.chName">
              <div :class="[curProjectType === project.itemCode ? 'active' : 'default']" class="label">{{project.chName}}</div>
          </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="projects" :style="{visibility: isShowProjects,opacity: isShowProjects==='hidden' ? 0 : 1}">
          <div class="module-title">重点项目({{ projectsTotal }}个)</div>
          <div class="wrapper">
            <project-card
              :class="{'active-project': index === curProject}"
              :content="detail"
              v-for="(detail, index) in projects"
              :key="detail.mediumlongProjectName + index"
              :ref="detail.mediumlongProjectName"
              @get-detail="getDetail"
            />
          </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="units" :style="{visibility: isShowLeadUnits, opacity: isShowLeadUnits==='hidden' ? 0 : 1}">
        <div class="module-title">建设单位({{ leadUnitList.length}}个)</div>
        <div class="wrapper"><project-lead-unit-card v-for="unit in leadUnit" :content="unit" :key="unit.uid" :ref="unit.unitName" /></div>
      </div>
    </transition>
    <project-info :style="{transition: 'all 1s linear',visibility: isShowProjectInfo, opacity: isShowProjectInfo === 'hidden' ? 0 : 1}" :mediumlongProjectId="mediumlongProjectId" ref="detail"  />
    <chart-lines :edges="edges" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
const defaultLineStyle = 'stroke:#00D7E9;stroke-width:3'
const activeLineStyle = 'stroke:red;stroke-width:2'
const unit = {
  uid: 1,
  unitName: '暂未公布1',
  projectNum: '--',
  overdueNum: '--',
  normalNum: '--',
  riskHighNum: '--',
  riskMiddleNum: '--',
  riskLowNum: '--'
}
const project = {
  mediumlongProjectName: '暂未公布',
  unitName: '暂未公布',
  mediumlongProjectId: null,
  progressSate: '--',
  overdueDays: '--',
  riskHighNum: '--',
  riskMiddleNum: '--',
  riskLowNum: '--',
  qualityName: '得分',
  qualityFraction: '--',
  stageName: '--',
  stageNum: '--',
  industryNo: '',
  leadUnitList: [{
    unitName: '暂未公布',
    projectNum: '--',
    overdueNum: '--',
    normalNum: '--',
    riskHighNum: '--',
    riskMiddleNum: '--',
    riskLowNum: '--'
  }]
}
export default {
  name: 'ProjectChart',
  data () {
    return {
        // 全市项目分类下标
        curTypeIndex: 0,
        loopCurTypeIndex: 0,
        curTypeTimer: null,
        // 重点项目定时器
        cardTimer: null,
        // 重点项目下标
        curProIndex: 0,
        // 项目类型定时器
        proTimer: null,
        defaultInterval: 10000,
        typesRelation: [],
        isShowProjectInfo: 'hidden',
        curProjectType: null,
        mediumlongProjectId: null,
        projects: [],
        projectsTotal: 0,
        // 项目当前页面
        proPage: 1,
        // 项目是否超过五个
        proNext: true,
        project,
        unit,
        isProjectEmpty: false,
        isLeadUnitEmpty: false,
        default_icon: require('img/bg/intl_tranport.png'),
        isShowProjectTypes: 'hidden',
        isShowProjects: 'hidden',
        isShowLeadUnits: 'hidden',
        isShowCards: 'visible',
        intl_source: require('img/bg/all_project.png'),
        projectTypes: [
            {logo: require('img/bg/intl_tranport.png'), label: '智慧交通', ref: 'transport'},
            {logo: require('img/bg/intl_police.png'), label: '智慧公安', ref: 'policy'}
        ],
        imgCfg: {
            "CSZHJT": require('img/bg/intl_tranport.png'),
            "CSZHGA": require('img/bg/intl_police.png'),
            "CSZHYL": require('img/bg/intl_tranport.png'),
            "H002": require('img/bg/intl_tranport.png')
        },
        edges: [],
        relations: [],
        leadUnit: [],
        curProject: 0,
        timer: null,
        cards: [
          { img: require('img/bg/project_num.png'), title: '项目总数', num: '9', unit: '个' },
          { img: require('img/bg/leadunit_num.png'), title: '单位总数', num: '2', unit: '家' },
          { img: require('img/bg/in_progress.png'), title: '进行总数', num: '9', unit: '个' },
          { img: require('img/bg/safe_num.png'), title: '高风险数', num: '2', unit: '个' },
        ]
    }
  },
  props: {
    details: Array,
    leadUnitList: Array
  },
  beforeDestroy () {
    this.clear()
  },
  created () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  computed: {
    toDetailId (vm) {
      return vm.$route.query.id
    },
    ...mapGetters([
      'industryList'
    ]),
    curIndustryList (vm) {
      const length = vm.industryListByOrder.length
      if (length < 6) {
        return vm.industryListByOrder
      } else if (length > vm.loopCurTypeIndex + 5) {
        return vm.industryListByOrder.slice(vm.loopCurTypeIndex, vm.loopCurTypeIndex + 5)
      } else {
        return vm.industryListByOrder.slice(vm.loopCurTypeIndex, length)
      }
    },
    industryListByOrder (vm) {
      const tabs = vm.industryList[0].childs
      tabs.map(tab => {
        let order = 0
        vm.details.forEach(item => {
          if (item.industryNo === tab.itemCode) {
            order++
          }
        })
        tab.order = order
        return {
          ...tab
        }
      })
      let helper = tabs.sort((a, b) => {
        return b.order - a.order
      })
      // 项目进度跳转详情
      if (vm.toDetailId) {
        helper = this.makeDetailIdFirst(helper)
      }
      return helper
    },
    activeLeadUnit (vm) {
      return vm.relations[this.curProject].target
    }
  },
  watch: {
    'details': {
      handler: 'initRelation'
    },
    curProjectType (cur, pre) {
      if (pre !== null) {
        this.reInitProjectRelation()
      }
    },
    // 重点项目轮播
    curProIndex () {
      this.loopProjectCard()
    }
  },
  methods: {
      clear () {
        clearInterval(this.timer)
        clearInterval(this.proTimer)
        clearInterval(this.cardTimer)
        clearInterval(this.curTypeTimer)
      },
      makeDetailIdFirst (arr) {
        let helper = null
        if (this.details.length > 0) {
          // 把项目放在第一位
          const index = this.details.findIndex(item => Number(item.mediumlongProjectId) === Number(this.toDetailId))
          if (index > -1) {
            helper = this.details[0]
            this.details[0] = this.details[index]
            this.details[index] = helper
            // 把项目类型放在第一位
            const type = this.details[0].industryNo
            const index1 = arr.findIndex(item => item.itemCode === type)
            if (index1 > -1) {
              const helper1 = arr[0]
              arr[0] = arr[index1]
              arr[index1] = helper1
            }
          }
        }
        return arr
      },
      clearComInterval () {
        if (this.proTimer) {
          clearInterval(this.proTimer)
        }
      },
      loopProjectTypes () {
        const length = this.industryListByOrder.length
        let index = this.curIndustryList.findIndex(tab => tab.itemCode === this.curProjectType)
        if (index === this.curIndustryList.length - 1) {
          index = 0
          // // 循环到底部 返回还是下一页
          const nextPage = length >= this.loopCurTypeIndex + 5
          if (nextPage) {
            this.loopCurTypeIndex + 5 > length ? this.loopCurTypeIndex = length : this.loopCurTypeIndex += 5
          } else {
            this.loopCurTypeIndex = 0
            // 返回全市项目分析
            this.$router.push({ name: 'AllAnalysis'})
          }
          // 全市项目到各类别关系
          this.isShowProjectTypes = 'hidden'
          this.edges = []
          this.initProjectTypesRelation()
        } else {
          index++
        }
        this.curProjectType = this.curIndustryList[index].itemCode
      },
      switchProjectType (industryNo) {
        clearInterval(this.proTimer)
        this.curProject = 0
        this.proPage = 1
        this.curProjectType = industryNo
      },
      hideProject () {
        this.isShowProjects = 'hidden'
        this.isShowLeadUnits = 'hidden'
        this.isShowProjectInfo = 'hidden'
        this.leadUnit = []
        if (this.timer) {
          clearInterval(this.timer)
        }
        this.edges = this.edges.filter(edge => edge.sourceName === 'projectSource')
      },
      loopProjectCard () {
        // 重置线和项目数据
        this.reInitProjectRelation()
      },
      reInitProjectRelation () {
        // 重置线和项目数据
        this.hideProject()
        setTimeout(() => {
          this.initProjectRelation()
        }, 1500)
        setTimeout(() => {
            this.initLeadUnitList()
            // this.initCard()
          }, 4000)
        setTimeout(() => {
            this.initProjectInfo()
        }, 7000)
      },
      initCard () {
        const leadUnit = []
        let leadunitNum = 0
        let projectNum = 0
        let riskHighNum = 0
        let processNum = 0
        this.details.forEach(project => {
          projectNum++
          if (project.leadUnitList) {
            this.leadUnitList.forEach(unit => {
              if (leadUnit.length === 0) {
                leadUnit.push(unit)
              } else {
                const isContained = leadUnit.some(ele => ele.unitName === unit.unitName)
                if (!isContained) {
                  leadUnit.push(unit)
                }
              }
            })
            leadunitNum = leadUnit.length
          }
          if (project.riskHighNum > 0) {
            riskHighNum++
          }
          if (project.stageNum <= project.stageTotal && project.stageTotal >= 0) {
            processNum++
          }
        })
        this.cards[0].num = projectNum
        this.cards[1].num = this.leadUnitList.length
        this.cards[2].num = processNum
        this.cards[3].num = 0
        this.leadUnitList.forEach(item => {
          this.cards[3].num += item.riskHighNum
        })
      },
      getDetail (detail) {
        const index = this.projects.findIndex(ele => ele.mediumlongProjectId === detail.mediumlongProjectId)
        if (index !== this.curProject) {
            this.curProject = index
            this.mediumlongProjectId = detail.mediumlongProjectId
        }
      },
      loop (interval = this.defaultInterval) {
          if (this.timer) {
            clearInterval(this.timer)
          }
          this.timer = setInterval(() => {
            // 只有一个 轮播到下一个类型
            if (this.projects.length === 1) {
              this.loopProjectTypes()
              this.curProject = 0
            } else {
              // 是否切换项目类型
              if (!this.proNext) {
                if (this.curProject === this.projects.length - 1) {
                  this.loopProjectTypes()
                  this.curProject = 0
                } else {
                  this.curProject++
                }
              } else {
                if (this.curProject === this.projects.length - 1) {
                  this.reInitProjectRelation()
                  this.curProject = 0
                } else {
                  this.curProject++
                }
              }
            }
            this.mediumlongProjectId = this.projects[this.curProject].mediumlongProjectId
          }, interval)
      },
      initProjectTypesRelation () {
        const relations = []
        this.curIndustryList.forEach(child => {
            relations.push({
                source: 'projectSource',
                target: child.itemCode
            })
        })
        relations.forEach(relation => {
            this.getPosition(relation.source, relation.target)
        })
        this.typesRelation = relations
        setTimeout(() => {
            this.isShowProjectTypes = 'visible'
        }, 1000)
      },
      initProjectRelation () {
          let relations = []
          const projects = this.details.filter(item => item.industryNo === this.curProjectType)
          this.projectsTotal = projects.length
          if (projects.length <= 5) {
            this.projects = projects
            this.proNext = false
            this.proPage = 1
          } else {
            const isNext = projects.length > this.proPage * 5
            const start = (this.proPage - 1) * 5
            const end = start + 5 > this.projects.length ? start + 5 : this.projects.length
            if (isNext) {
              this.proPage++
              this.proNext = true
            } else {
              this.proPage = 1
              this.proNext = false
            }
            this.projects = projects.slice(start, end)
          }
          if (this.projects.length === 0) {
            project.industryNo = this.curProjectType
            this.projects.push(project)
            this.isProjectEmpty = true
            setTimeout(() => {
              this.isShowProjects = 'visible'
            }, 1000)
          } else {
            this.isProjectEmpty = false
          }
          this.projects.forEach((item, index) => {
            relations.push({
                source: item.industryNo,
                target: item.mediumlongProjectName
          })
          relations.forEach(relation => {
              this.getPosition(relation.source, relation.target)
          })
          setTimeout(() => {
              this.isShowProjects = 'visible'
              if (this.projects[0].mediumlongProjectId) {
                this.$refs.detail.getDetail(this.projects[0].mediumlongProjectId)
              } else {
                this.$refs.detail.reset()
              }
          }, 1000)
        })
      },
      initRelation () {
          this.curProjectType = this.curIndustryList[0].itemCode
          this.initProjectTypesRelation()
          this.initCard()
          setTimeout(() => {
            this.initProjectRelation()
          }, 3000)
          setTimeout(() => {
            this.initLeadUnitList()
            // this.initCard()
          }, 6000)
          setTimeout(() => {
            this.initProjectInfo()
          }, 8000)
      },
      initProjectInfo () {
        this.isShowProjectInfo = 'visible'
      },
      initLeadUnitList () {
          const { leadUnitList, projects } = this
          const relations = []
          projects.forEach((item, proIndex) => {
              const index = leadUnitList.findIndex(ele => Number(ele.buid) === Number(item.buid))
              if (index > -1) {
                const source = item.mediumlongProjectName
                const target = leadUnitList[index].unitName
                relations.push({
                  source,
                  target
                })
              }
          })
          this.relations = relations
          this.leadUnit = this.leadUnitList
          relations.forEach(relation => {
            this.getPosition(relation.source, relation.target)
          })
          setTimeout(() => {
              this.isShowLeadUnits = 'visible'
              this.loop()
          }, 1000)
      },
      getPosition(source, target, offset = [0, 0]) {
          this.$nextTick(() => {
              const sourceRect = this.getDomRect(source)
              const targetRect = this.getDomRect(target)
              const edge = {
                sourceName: source,
                targetName: target,
                sourcePos: this.initXY(sourceRect, 'source'),
                targetPos: this.initXY(targetRect, 'target'),
                style: defaultLineStyle
              }
              edge['path'] = `M${edge.sourcePos[0] + offset[0]} ${edge.sourcePos[1] + offset[1]}, L${edge.targetPos[0]} ${edge.targetPos[1]}`
              this.edges.push(edge)
          })
      },
      getDomRect(ref) {
        if (!this.$refs[ref]) {
          return
        }
        if (this.$refs[ref][0] instanceof Vue) {
            // 数组去重
            return this.$refs[ref][0].$el.getBoundingClientRect()
        } else if (Array.isArray(this.$refs[ref])) {
            return this.$refs[ref][0].getBoundingClientRect()
        } else {
            return this.$refs[ref].getBoundingClientRect()
        }
      },
      initXY(rect, type) {
          if (!rect) {
            return
          }
          let x1, x2, y1, y2
          switch(type){
              case 'source':
                  x1 = rect.x + rect.width
                  y1 = rect.y + rect.height / 2
                  return [x1, y1]
                  break
              case 'target':
                  x2 = rect.x
                  y2 = rect.y + rect.height / 2
                  return [x2, y2]
                  break
          }
      }
  }
}
</script>

<style scoped lang="scss">
.project-flow{
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .left-card-bottom{
    bottom: calc(50vh - 420px);
  }
  .left-card{
      // @include bis('~img/bg/left_banner.png');
      transition: opacity 1s linear;
      position: absolute;
      top: calc(50vh - 400px);
      left: 10px;
      width: 150px;
      height: 330px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      box-sizing: border-box;
      font-size: 12px;
      box-shadow:0px 0px 15px 0px rgba(48,123,255,0.58),0px 0px 7px 0px rgba(27,163,255,0.89);
      .card{
        display: flex;
        width: 115px;
        height: 60px;
        // justify-content: space-between;
        align-items: center;
        .card-img{
          width: 30px;
          height: 30px;
          margin-top: 5px;
        }
        .content{
          margin-left: 10px;
          margin-top: 25px;
          .title{
            margin-bottom: 10px;
            margin-top: 6px;
          }
          .num{
            display: inline-block;
            font-size: 16px;
            // font-weight: bold;
            color: #37FFFC;
            color: #ffffff;
            margin-right: 5px;
          }
        }
      }
  }
  width: 100%;
  height: 969px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
    .logo{
       width: 64px;
       height: 64px;
    }
    .projects, .units{
        padding: 20px;
        width: 400px;
        height: 843px;
        transition: all 1s linear;
        @include bis('~img/bg/project_bg.png');
        position: relative;
        .wrapper{
          // position: absolute;
          // width: 90%;
          // height: 90%;
          // top: 0;
          // left: 0;
          // right: 0;
          // bottom: 0;
          // margin: auto;
          // display: flex;
          // flex-wrap: nowrap;
          // align-items: center;
          align-items: center;
        }
        .module-title{
            height:24px;
            font-size:18px;
            font-family:MicrosoftYaqiHei-Bold,MicrosoftYaqiHei;
            font-weight:bold;
            text-align: center;
            margin-bottom: 10px;
            color:rgba(0,226,223,1);
            line-height:24px;
        }
    }
    .project-type{
        transition: opacity 1s linear;
        .project{
            margin-top: 50px;
            text-align: center;
            cursor: pointer;
            .active{
              opacity: 1;
            }
            .default{
              opacity: .6;
            }
        }
    }
    .active-project{
        box-sizing: border-box;
        border: 2px solid rgba(0,226,223,1);
    }
    .source{
      text-align: center;
      margin-left: 50px;
    }
    .project{
      img{
        width: 64px;
        height: 64px;
      }
    }

}
</style>
