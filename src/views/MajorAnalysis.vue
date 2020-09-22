<template>
  <div class="major-analysis">
    <project-chart :leadUnitList="leadUnitList" ref="chart" @get-detail="getDetail" :details="details" />
  </div>
</template>

<script>
import { api_getMajorProjectList, api_getLeadUnitList } from '@/api/majorProject'
export default {
  data () {
    return {
      testData: {
        nodes: [
          { name: '全市项目' },
          { name: '智慧项目' },
          { name: '智慧交通' },
          { name: '智慧公安' },
          { name: '项目1' },
          { name: '项目2' },
          { name: '项目3' },
          { name: '项目4' },
          { name: '项目5' },
          { name: '牵头单位1' },
          { name: '牵头单位2' },
          { name: '牵头单位3' },
          { name: '牵头单位4' },
          { name: '牵头单位5' },
          { name: '牵头单位6' },
          { name: '牵头单位7' },
        ],
        edges: [
          { source: '全市项目', target: '智慧项目' },
          { source: '全市项目', target: '智慧交通' },
          { source: '全市项目', target: '智慧公安' },
          { source: '智慧项目', target: '' },
          { source: '', target: '' },
          { source: '', target: '' },
          { source: '', target: '' },
          { source: '', target: '' },
          { source: '', target: '' },
          { source: '', target: '' },
          { source: '', target: '' },
          { source: '', target: '' },
          { source: '', target: '' },
          { source: '', target: '' },
          { source: '', target: '' },
          { source: '', target: '' },
          { source: '', target: '' },
          { source: '', target: '' },
        ]
      },
      details: [],
      mediumlongProjectId: null,
      leadUnitList: []
    }
  },
  created () {
    this.init()
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.chart.clearComInterval()
    this.clearInterval()
    next()
  },
  methods: {
    clearInterval () {
      this.$refs.chart.clear()
    },
    async init () {
      const detail = await api_getMajorProjectList()
      const leadUnitList = await api_getLeadUnitList()
      this.leadUnitList = leadUnitList.data
      if (detail) {
        this.details = detail.data
      } else {
        this.details = []
      }
      if (this.details.length > 0) {
        this.mediumlongProjectId = this.details[0].mediumlongProjectId
      }
    },
    getDetail (detail) {
      // todo 重复点击不刷新
      if (detail && detail.mediumlongProjectId) {
        // this.$refs.detail.getDetail(detail.mediumlongProjectId)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.major-analysis{
  display: flex;
  height: calc(100vh - 150px);
  align-items: center;
}
</style>
