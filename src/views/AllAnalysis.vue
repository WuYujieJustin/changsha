<template>
  <div class="all-analysis">
    <div class="left-container">
      <year-plan class="left-part1" ref="yearPlan" :industryNo="curIndustry" />
      <project-progress class="left-part2" ref="projectProgress" :industryNo="curIndustry" />
    </div>
    <div class="center-container">
      <turntable class="center-part1"  ref="turnTable" @tab-change="changeIndustry" :industryNo="curIndustry"/>
      <all-counts class="center-part2" ref="allCounts" :industryNo="curIndustry"/>
    </div>
    <div class="right-container">
      <sources-funds class="right-part1" ref="sourceFunds" :industryNo="curIndustry"/>
      <expert-resources class="right-part2" ref="exportResources" :industryNo="curIndustry"/>
      <work-order class="right-part3" ref="workOrder" :industryNo="curIndustry"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      curIndustry: null,
      ComList: ['yearPlan', 'projectProgress', 'turnTable', 'allCounts', 'sourceFunds', 'exportResources', 'workOrder']
    }
  },
  computed: {
    ...mapGetters([
      'industryList'
    ])
  },
  created () {
    this.init()
  },
  // watch: {
  //   '$route' () {
  //     this.clear()
  //   }
  // },
  beforeRouteLeave (to, from, next) {
    this.clear()
    next()
  },
  methods: {
    clear () {
      this.$refs.yearPlan.clearComInterval()
      this.$refs.projectProgress.clearComInterval()
      this.$refs.turnTable.clearComInterval()
      this.$refs.allCounts.clearComInterval()
      this.$refs.sourceFunds.clearComInterval()
      this.$refs.exportResources.clearComInterval()
      this.$refs.workOrder.clearComInterval()
    },
    changeIndustry (industryCode) {
      this.curIndustry = industryCode
    },
    init () {
      this.curIndustry = this.industryList[0].childs[2].itemCode
    }
  }
}
</script>

<style scoped lang="scss">
.all-analysis{
  display: flex;
  align-items: center;
  padding: 0 30px;
  height: calc(100vh - 150px);
  .left-container{
    /*display: flex;*/
    /*flex-direction: column;*/
    /*height: 100%;*/
    /*.left-part1, .left-part2{*/
      /*flex: 1;*/
    /*}*/
  }
  .center-container{
    // flex: 1;
    width: calc(100% - 980px);
    /*display: flex;*/
    /*flex-direction: column;*/
    /*height: 100%;*/
  }
  .right-container{
    /*display: flex;*/
    /*flex-direction: column;*/
    /*height: 100%;*/
    /*.right-part1, .right-part2, .right-part3{*/
      /*flex: 1;*/
    /*}*/
  }
}
</style>
