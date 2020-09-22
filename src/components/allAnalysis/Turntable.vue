<template>
  <div class="turntable">
    <div class="wrapper">
      <div :class="['tabs', tabs.length % 2 === 0 ? 'offset-tabs' : '']">
        <transition-group name="list-complete" tag="div">
            <div
              v-for="(tab, index) in tabs"
              :key="tab.chName"
              @click.stop="switchTabs(index)"
              :class="['turntable-title', 'list-complete-item',
              index === center ? 'active' : ''
              ]"
            >
              {{tab.chName}}
            </div>
          </transition-group>
      </div>
    </div>
    <industry-channel ref="channel" :industryNo="industryNo" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const tab = [{
  chName: "智慧物流",
  childs: null,
  codeId: 12544,
  enName: null,
  fullCnname: null,
  fullEnname: null,
  itemCode: "CSZHWL",
  levelCode: null,
  memo: "行业方向（所属行业）",
  parentCode: null,
  parentId: null,
  sequenceNo: null,
  status: null,
  templFrom: null,
  topic: "INDUSTRY_DIRECTION"
}]

export default {
  name: 'Turntable',
  props: {
    data: Array,
    industryNo: String
  },
  data () {
    return {
      // tab为偶数时 剪切的一个
      extraTab: [],
      curTab: 0,
      center: 1,
      timer: null,
      translatePos: 0,
      defaultPos: 300,
      // 默认往右
      isRight: true,
      dircetionCount: 0,
      tabs: []
    }
  },
  created () {
    this.tabs = this.industryList[0].childs
    this.center = Math.floor(this.tabs.length / 2)
    this.loop()
  },
  computed: {
    styleObj() {
      return { transform: `translateX(${this.translatePos}px)`}
    },
    ...mapGetters([
      'industryList'
    ])
  },
  watch: {
    curTab (newVal, oldVal) {
      if (newVal === 0 && oldVal === this.tabs.length - 1) {
        this.$router.push({ name: 'MajorAnalysis'})
      }
      this.isRight = newVal > oldVal
      if (this.isRight) {
        this.tabs.push(this.tabs.shift())
      } else {
        this.tabs.unshift(this.tabs.pop())
      }
    }
  },
  beforeDestroy () {
    this.clearComInterval()
  },
  methods: {
    clearComInterval () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    switchTabs(index) {
        let { center, curTab } = this
        if (index > center) {
          curTab++
        } else {
          curTab--
        }
        if (index === 0) {
          curTab = 0
        }
        this.curTab = curTab
        this.$emit('tab-change', this.tabs[index].itemCode)
    },
    loop(interval = 20000) {
      this.clearComInterval()
      this.setDefaultInterval(interval)
    },
    setDefaultInterval(interval) {
      this.timer = setInterval(() => {
        if (this.curTab === this.tabs.length - 1) {
          this.curTab = 0
        } else {
          this.curTab++
        }
        const { center } = this
        this.switchTabs(this.center + 1)
      }, interval)
    }

  }
}
</script>

<style scoped lang="scss">
.turntable{
  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
  .turntable-title{
    transform: scale(0.6);
    height: 66px;
    line-height: 66px;
    font-size: 30px;
    font-weight: bold;
    color: $color-blue;
    margin: 0 auto 14px;
    text-align: center;
    @include bis('~img/bg/tab_item.png');
  }
  .wrapper{
    // width: 880px;
    overflow: hidden;
    .tabs{
      div{
        display: flex;
        transition: all 1s;
        height: 100px;
        position: relative;
        justify-content: center;
        align-items: center;
        .turntable-title{
          min-width: 180px;
          padding: 0 20px;
          height: 60px;
          opacity: .5;
          cursor: pointer;
        }
        .active{
          transform: scale(0.8) translateY(20px);
          opacity: 1;
          text-align: center;
          z-index: 20;
          // position: absolute;
          // top: 20px;
          // left: 285px;
        }
        .left{
          z-index: 1;
          position: absolute;
          top: 0;
          left: 0;
        }
        .right{
          z-index: 1;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
    .offset-tabs{
      transform: translateX(-100px);
    }
  }
}
</style>
