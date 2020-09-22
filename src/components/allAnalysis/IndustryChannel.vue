<template>
  <div class="industry-channel">
    <div :class="['wrapper', isAnimation ? 'circle-animation' : 'circle']">
      <img ref="animate" src="~img/bg/circle_1.png" />
      <img src="~img/bg/circle_2.png" />
      <img src="~img/bg/circle_3.png" />
      <img src="~img/bg/circle_4.png" />
      <img src="~img/bg/circle_5.png" />
      <img src="~img/bg/circle_6.png" />
      <img src="~img/bg/circle_7.png" />
      <img src="~img/bg/circle_8.png" />
      <img src="~img/bg/circle_9.png" />
      <img src="~img/bg/circle_10.png" />
      <img src="~img/bg/circle_11.png" />
      <img src="~img/bg/circle_12.png" />
      <img src="~img/bg/circle_13.png" />
      <div class="center-container">
        <div class="center-info">
          <animated-number class="number" :formatValue="formatToPrice" :value="total" :duration="100000"/>
          <div class="center-info-name">大数据资源</div>
        </div>
        <div class="line" v-for="(item, index) in data" :key="index">
          <div class="expand">
            <div class="expand-text" :class="userAgent?'mac-expand-text':'win-expand-text'">
              <div class="label">{{item.label}}</div>
              <div class="value">
                <div class="content" v-for="(item, index) in item.value">
                  {{ item || '暂无项目' }}
                </div>
              </div>
              <div class="count">共{{item.count}}个{{itemName(item.label)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import { plainData } from '@/utils/utils'
  import { api_stageData } from '@/api/allProject'
  import AnimatedNumber from "animated-number-vue"
  const mockData = [
    {
      mediumlongProjectName: '规划暂未公布',
      stageName: '规划',
      num: 0,
    },
    {
      mediumlongProjectName: '申报暂未公布',
      stageName: '申报',
      num: 0,
    },
    {
      mediumlongProjectName: '建设暂未公布',
      stageName: '建设',
      num: 0,
    },
    {
      mediumlongProjectName: '验收暂未公布',
      stageName: '验收',
      num: 0,
    }
  ]
  export default {
    name: 'IndustryChannel',
    props: {
      industryNo: String,
    },
    components: {
      AnimatedNumber
    },
    computed: {
      ...mapGetters([
        'allAnalysisData',
        'curYear'
      ]),
      userAgent(){
        return navigator.userAgent.indexOf('Mac OS X') !== -1
      },
    },
    data () {
      return {
        data: [],
        total: 0,
        isAnimation: true,
        allData: []
      }
    },
    watch: {
      industryNo (val) {
        if (val) {
          setTimeout(() => {
            this.getStageData()
          }, 500)
        }
      },
      curYear () {
          setTimeout(() => {
            this.getStageData()
          }, 500)
      }
    },
    created () {
      this.getStageData();
    },
    methods: {
      ...mapActions({
        'storeAllAnalysis': 'allProject/storeAllAnalysis'
      }),
      itemName (label) {
        if (label === '规划') {
          return '规划'
        } else {
          return '项目'
        }
      },
      numFormat(num) {
        const res=num.toString().replace(/\d+/, function(n){ // 先提取整数部分
          return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
            return $1+","
          });
        })
        return res
      },
      formatToPrice(value) {
        return `<div class="center-info-count">${this.numFormat(Number(value).toFixed(0))} M</div>`
      },
      initMockData () {
        this.allData = mockData
      },
      setData () {
        let data = []
        this.allData.list.forEach(item => {
          let value = []
          // value.push(item.mediumlongProjectName)
          if (item.mediumlongProjectName) {
            item.mediumlongProjectName.split(',').forEach((name, index) => {
              if (index < 2) {
                value.push(name)
              }
            })
          } else {
            value.push('暂无数据')
          }
          data.push({
            label: item.stageName,
            value,
            count: item.num
          })
        })
        this.data = data
        this.total = this.allData.fileSize
        setTimeout(() => {
          this.isAnimation = false
        }, 6000)
      },
      getStageData () {
        this.isAnimation = true
        const { industryNo, allAnalysisData, curYear} = this
        const code = industryNo + curYear
        if ((code in allAnalysisData) && ('IndustryChannel' in allAnalysisData[code])) {
          this.loading = true
          this.allData = plainData(allAnalysisData[code]['IndustryChannel'])
          this.setData()
          this.loading = false
        } else {
          api_stageData({ industryNo, budgetYear: this.curYear })
                  .then((res) => {
                    if (!res.data) {
                      this.initMockData()
                    } else if (res.data.length === 0) {
                      this.initMockData()
                    } else {
                      this.storeAllAnalysis({ code, key: 'IndustryChannel', value: res.data })
                      this.allData = res.data
                    }
                    this.setData()
                  })
        }
      }
    }
  }
</script>
<style lang="scss">
  .industry-channel {
    flex: 1;
    display: flex;
    align-items: center;
    $line-color: #00ACCA;
    $line-length: 160px;
    $line-translate: $line-length / 2 + 118px;
    $line-translate1: $line-length / 2 + 117px;
    .line {
      position: absolute;
      width: $line-length;
      height: 0;
      border-bottom: 1px solid $line-color;
      .expand {
        width: 200px;
        height: 0;
        border-bottom: 1px solid $line-color;
        transform-origin: 0 0;
        position: relative;
        font-size: 20px;
        &::before,
        &::after {
          position: absolute;
          top: -2px;
          right: 0;
          content: '';
          display: block;
          width: 20px;
          height: 5px;
          background: $line-color;
        }
        &::before {
          width: 50px;
          right: 30px;
        }
      }
      .expand-text {
        position: absolute;
        right: 0;
        opacity: 1;
        text-align: right;
        width: 100%;
        /*line-height: 40px;*/
        .label{
          font-size: 20px;
          color: $color-blue;
        }
        .value {
          width: 100%;
          font-size: 14px;
          color: $color-white;
          margin-top: 20px;
          background: RGBA(0, 0, 0, 0);
          -webkit-font-smoothing: subpixel-antialiased;
          .content{
            white-space: nowrap;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            width: 100%;
          }
        }
        .count{
          font-size: 14px;
          color: $color-yellow;
        }
      }
    }
    // line前面有个span标签, 需要偏移一位
    $offset: 1;
    .line:nth-child(#{$offset+1}) {
      transform: rotate3d(0,0,1, -45deg) translate3d($line-translate1, 0, 0);
      .expand {
        transform: translate3d($line-length, 0, 0) rotate3d(0,0,1, 45deg);
      }
      .expand-text {
        opacity: 1;
        top: -40px;
      }
    }
    .line:nth-child(#{$offset+2}) {
      transform: rotate3d(0,0,1, 45deg) translate3d($line-translate + 1, 0, 0);
      .expand {
        transform: translate3d($line-length, 0, 0) rotate3d(0,0,1, -45deg);
      }
      .expand-text {
        opacity: 1;
        top: -40px;
      }
    }
    .line:nth-child(#{$offset+3}) {
      transform: rotate3d(0,0,1, 135deg) translate3d($line-translate, 0, 0);
      .expand {
        transform: translate3d($line-length, 0, 0) rotate3d(0,0,1, 45deg);
      }
      .expand-text {
        transform-origin: center center;
        transform: rotate3d(0, 0, 1, 180deg);
        text-align: left;
        bottom: -45px;
      }
      .win-expand-text{
        bottom: -42px !important;
      }
    }
    .line:nth-child(#{$offset+4}) {
      transform: rotate3d(0,0,1, 225deg) translate3d($line-translate1, 0, 0);
      .expand {
        transform: translate3d($line-length, 0, 0) rotate3d(0,0,1, -45deg);
      }
      .expand-text {
        transform-origin: center center;
        transform: rotate3d(0, 0, 1, 180deg);
        text-align: left;
        bottom: -45px;
        .value{
          // height: 55px;
          .content{
            white-space: nowrap;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
        }
      }
      .win-expand-text{
        bottom: -42px !important;
      }
    }
    .center-container {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      .center-info{
        text-align: center;
        .number{
          font-size: 20px;
        }
        // display: flex;
      }
      .center-info-count{
        color: $color-light-yellow;
        font-size: 36px;
      }
      // .unit{
      //   color: red;
      // }
    }
    .circle {
      width: 520px;
      height: 520px;;
      position: relative;
      margin: 0 auto;
      img {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        transform-origin: center center;
        animation-fill-mode: both;
      }
    }
    .circle-animation {
      @extend .circle;
      img:nth-child(1),
      img:nth-child(2),
      img:nth-child(3) {
        animation: circle 6s  linear;
      }
      img:nth-child(4),
      img:nth-child(5),
      img:nth-child(6),
      img:nth-child(7) {
        animation: circle 6s  linear reverse;
      }
      img:nth-child(8),
      img:nth-child(9),
      img:nth-child(10) {
        animation: circle 6s  linear ;
      }
      img:nth-child(11),
      img:nth-child(12) {
        animation: circle 6s  linear reverse;
      }
    }
  }

  @keyframes circle {
    from {
      transform: rotate3d(0, 0, 1, 0);
    }
    10% { transform: rotate3d(0, 0, 1, 180deg); }
    20% { transform: rotate3d(0, 0, 1, 180deg); }
    30% { transform: rotate3d(0, 0, 1, 30deg); }
    40% { transform: rotate3d(0, 0, 1, 30deg); }
    50% { transform: rotate3d(0, 0, 1, 30deg); }
    60% { transform: rotate3d(0, 0, 1, 270deg); }
    70% { transform: rotate3d(0, 0, 1, 270deg); }
    80% { transform: rotate3d(0, 0, 1, 270deg); }
    90% { transform: rotate3d(0, 0, 1, 270deg); }
    to {
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
</style>