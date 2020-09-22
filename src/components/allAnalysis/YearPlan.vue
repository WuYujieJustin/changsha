<template>
  <div class="year-plan">
    <div class="card-title">年度计划总汇</div>
    <div class="indicator" @click.stop="showList">
      {{curYear}}年
      <img :class="['arrow', dropVisible ? 'arrow_up' : 'arrow_down']" :src="arrow" />
    </div>
    <loading v-if="loading" />
    <div class="plan-list" v-else>
      <div class="wrapper">
        <transition-group ref="plans" :name="isAnimationMode ? 'list-animation' : 'list'" tag="div">
          <div @mouseout="startAnimation"  @mouseover="stopAnimation" class="plan-item list-animation-item" v-for="(item, index) in plans" :key="item.id">
            <!-- <e-charts :initOptions="initOptions" :options="item.option" /> -->
            <div class="year-icon">
              <!-- <img class="year-plan-num" :src="yearPlan" > -->
              <div class="num">{{item.num}}项</div>
            </div>
            <div class="plan-item-content">
              <div class="plan-item-title">
                {{ item.applyUnitName || '暂未公布' }}
              </div>
              <div class="wrapper">
                <div class="plan-item-nums" v-for="(child, chindIndex) in item.list.length > 0 ? item.list : mockList" :key="chindIndex">
                <div class="name">{{ child.name }}</div>
                <div class="value">{{ child.num }}<div class="unit">个</div></div>
              </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <div v-show="dropVisible" class="drop-menu">
      <div @click.stop="changeYear(year)" :class="['item', curYear === year ? 'active' : '']" v-for="(year, index) in yearList" :key="index">
        {{year}}年
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { api_yearPlanSummary, api_yearList  } from '@/api/allProject'
import { plainData, convertPx } from '@/utils/utils'
const width = 80*window.scale
const height = 80*window.scale
const plan = {
  applyUnitName: '单位暂未公布',
  num: 0,
  list: [{
    name: '新建',
    num: '--'
  },{
    name: '续建',
    num: '--'
  }]
}
const mockList = [{
    name: '新建',
    num: '--'
  },{
    name: '续建',
    num: '--'
  }]
export default {
  name: 'YearPlan',
  props: {
    industryNo: String
  },
  data () {
    return {
      isAnimationMode: true,
      arrow: require('img/bg/arrow.png'),
      yearPlan: require('img/bg/year_plan.gif'),
      isEmpty: false,
      timer: null,
      loading: false,
      mockList,
      helperArr: [],
      plans: [],
      initOptions: {
        width: `${width}px`,
        height: `${height}px`
      },
      allData: [],
      dropVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'allAnalysisData',
      'yearList',
      'curYear'
    ])
  },
  created () {
    this.getYearPlanSummary()
  },
  watch: {
    curYear () {
      this.clearComInterval()
      this.getYearPlanSummary()
    },
    industryNo (val) {
      if (val) {
        this.clearComInterval()
        this.getYearPlanSummary()
      }
    }
  },
  beforeDestroy () {
    this.clearComInterval()
  },
  methods: {
    ...mapActions({
      'storeAllAnalysis': 'allProject/storeAllAnalysis',
      'setYearList': 'allProject/setYearList',
      'setCurYear': 'allProject/setCurYear',
    }),
    showList () {
      this.dropVisible = !this.dropVisible
    },
    clearComInterval () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    startAnimation () {
      this.isAnimationMode = true
    },
    stopAnimation () {
      this.isAnimationMode = false
    },
    changeYear (year) {
      this.setCurYear(year)
      this.dropVisible = false
    },
    initMockData () {
      this.isEmpty = true
      this.allData = []
      plan.id = 0
      this.allData.push(plan)
    },
    async getYearPlanSummary () {
      this.clearComInterval()
      this.helperArr = []
      this.plans = []
      const { industryNo, allAnalysisData, curYear } = this
      const code = industryNo + curYear
      if ((code in allAnalysisData) && ('YearPlan' in allAnalysisData[code])) {
        this.loading = true
        this.allData = plainData(allAnalysisData[code]['YearPlan'])
        this.setData()
        this.loading = false
      } else {
        this.loading = true
        api_yearPlanSummary({ budgetYear: curYear, industryNo: industryNo })
          .then((res) => {
              this.loading = false
              if (!res.data) {
                this.initMockData()
              } else if (res.data.length === 0) {
                this.initMockData()
              } else {
                this.allData = res.data.sort((a, b) => {
                  return b.num - a.num
                })
                this.storeAllAnalysis({ code, key: 'YearPlan', value: res.data })
              }
              this.setData()
            })
      }
    },
    setData () {
      let total = 0
      this.allData.forEach(item => {
        total += item.num
      })
      this.plans = this.allData.map((item, index) => {
        const option = {
          series: [{
            type: 'liquidFill',
            radius: '90%',
            animation: false,
            data: [],
            color: ['#00E1FB'],
            silent: true,
            label: {
              show: true,
              baseline: 'bottom',
              color: '#fff',
              fontSize: convertPx(14),
              position: ['50%', '85%']
            },
            outline:{
              show: true,
              borderDistance: 4,
              itemStyle: {
                borderWidth : 2,
                borderColor: '#00E1FB'
              }
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: '0px 0px 9px 0px rgba(0,225,251,1)'
            },
            backgroundStyle: {
              color: '#13326C'
            }
          }]
        }
        option.series[0].data.push(0.5, 0.5)
        option.series[0].label.formatter = function() { return item.num + '个'}
        return {
          ...item,
          id: index,
          option
        }
      })
      this.loading = false
      if (this.plans.length > 4 ) {
        this.loop()
      }
    },
    loop (interval = 6000) {
      this.timer = setInterval(() => {
        if (this.plans.length > 5) {
          const item = this.plans.shift()
          this.helperArr.push(item)
        } else {
          const item = this.plans.shift()
          this.helperArr.push(item)
          this.plans.push(this.helperArr.shift())
        }
      }, interval)
    }
  }
}
</script>

<style lang="scss">
.list-animation-item {
  transition: opacity .1s;
}
.list-animation-enter, .list-animation-leave-to
/* .list-animation-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
.list-animation-leave-active {
  position: absolute;
  opacity: 0;
}
.list-animation-move{
  transition: transform 1s;
  z-index: 1;
}
.year-plan{
  width: 490px;
  height: 449px;
  @include bis('~img/bg/all_left_top@2x.png');
  position: relative;
  .indicator{
    position: absolute;
    font-size: 16px;
    left: 150px;
    top: 5px;
    border: 1px solid rgba(35, 121, 235, 0.5);
    padding: 3px 20px;
    width: 90px;
    cursor: pointer;
    text-align: center;
    .arrow{
      width: 10px;
      height: 10px;
      transition: all 0.5s;
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .arrow_up{
      transform: rotate(180deg)
    }
  }
  .drop-menu{
    position: absolute;
    left: 150px;
    top: 40px;
    font-size: 16px;
    text-align: center;
    height: 100px;
    overflow-y: auto;
    z-index: 10;
    background: rgb(0, 8, 42);
    .item{
      margin-top: 5px;
      padding: 3px 20px;
      width: 90px;
      cursor: pointer;
    }
    .active{
      color: rgba(0, 226, 223, 1);
    }
    .item:hover{
      background: rgba(255, 255, 255, 0.1);
    }
  }
  .plan-list{
    height: 100%;
    // overflow-y: auto;
    padding: 54px 19px 20px 19px;
    box-sizing: border-box;
    .wrapper{
      height: 100%;
      overflow: hidden;
    }
  }
  .plan-item{
    display: flex;
    margin-bottom: 16px;
    cursor: pointer;
    .year-icon{
      position: relative;
      width: 75px;
      height: 75px;
      display: flex;
      justify-content: center;
      @include bis('~img/bg/year_plan.gif');
      .year-plan-num{
        width: 75px;
        height: 75px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .num{
        margin-top: 40px;
        font-weight: bold;
      }
    }
    .plan-item-icon{
      width: 80px;
      height: 80px;
      text-align: center;
      padding-top: 42px;
      box-sizing: border-box;
      @include bis('~img/bg/year_plan_num@2x.png');
    }
    .plan-item-content{
      width:344px;
      height:80px;
      padding: 12px 15px;
      box-sizing: border-box;
      background:rgba(3,123,255,0.1);
      margin-left: 23px;
      .plan-item-title{
        // font-weight: bold;
        font-size: 16px;
        margin-bottom: 10px;
      }
      .wrapper{
        display: flex;
        height: 30px;
        line-height: 30px;
        .plan-item-nums{
          font-size: 14px;
          align-items: center;
          display: flex;
          flex: 1;
          .name{
            width: 50px;
            margin-right: 10px;
          }
          .value{
            // margin: 0 53px 0 12px;
            display: inline-block;
            // width: 50px;
            font-size: 20px;
            // font-weight: bold;
            // color: #00E1FB;
            color: #ffffff;
            .unit{
              display: inline-block;
              font-size: 14px;
              color: #ffffff;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
