<template>
  <div class="expert_nums">
    <div class="title order_title">专家政治面貌</div>
    <div class="expert_face">
      <e-charts ref="chart" @chartclick="chartClick" :initOptions="initOptions" :options="options" />
      <ul class="category">
        <li v-for="(item, index) in arr" :key="index">
          <i class="color_block" :style="{backgroundColor: colorList[index]}"></i>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { convertPx } from "@/utils/utils";
var colorList = [
  "#06E3F8",
  "#FFCC00",
  "#EE5177",
  "#3D88EA",
  "#D8419A",
  "#F9A153",
];
var arr = [
  { value: 103, name: "群众" },
  { value: 100, name: "共青团员" },
  { value: 12, name: "中共党员" },
  { value: 137, name: "民主党派" },
  { value: 109, name: "无党派人士" },
  { value: 111, name: "其他" },
];

export default {
  name: "ExpertFace",
  props: {
    expertbyOrganize: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      arr: [],
      colorList,
      initOptions: {
        width: 600 * window.scale,
        height: 300 * window.scale,
      },
      options: null,
      curIndex: -1,
      timerFace: null,
    };
  },
  mounted() {
    console.log(this.expertbyOrganize);
    this.echartInit();

    this.timerFace = setInterval(() => {
      this.highLight();
    }, 2000);

    let that = this;
    setTimeout(function () {
      const myChart = that.$refs.chart.chart;
      //进入
      myChart.on("mouseover", function (a) {
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: that.curIndex,
        });
        clearInterval(that.timerFace);
      });
      //离开
      myChart.on("mouseout", function (a) {
        clearInterval(that.timerFace);
        that.timerFace = setInterval(() => {
          that.highLight();
        }, 2000);
      });
    }, 0);
  },
  beforeDestroy() {
    clearInterval(this.timerFace);
  },
  methods: {
    echartInit() {
      this.arr = this.expertbyOrganize.map((res, index) => {
        return {
          value: res.expertCount,
          name: res.organizeName,
          organize: res.organize,
        };
      });
    
      this.options = {
        color: colorList,
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["40%", "70%"],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
              normal: {
                borderColor: "rgba(2,14,79,1)",
                borderWidth: 5,
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              fontSize: convertPx(18),
              formatter: "{d}%",
            },
            labelLine: {
              show: true,
              normal: {
                length: 10,
                lineStyle: {
                  width: 1,
                },
              },
            },
            data: this.arr,
          },
        ],
      };
    },
    chartClick(params) {
      // 0830
      this.$router.push({
        name: "expertlist",
        query: { organize: params.data.organize },
      });
    },
    highLight() {
      const myChart = this.$refs.chart.chart;
      const dataLen = this.options.series[0].data.length;
      // 显示提示框
      // myChart.dispatchAction({
      //     type: "showTip",
      //     seriesIndex: 0,
      //     dataIndex: this.curIndex + 1,
      // });
      // 取消之前高亮的图形
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: this.curIndex,
      });
      this.curIndex = (this.curIndex + 1) % dataLen;
      // 高亮当前图形
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: this.curIndex,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.expert_nums {
  flex: 1;
  height: 317px;
  position: relative;
  @include bis("~img/bg/zhengzhi_bg.png");
  .expert_face {
    display: flex;
    align-items: center;
    height: 100%;
    padding-top: 10px;
    .echarts {
      @include bis("~img/expert/pieBg.png");
      background-position: 50% 50%;
      background-size: 40% 78%;
    }
    .category {
      display: flex;
      flex-direction: column;
      list-style: none;
      li {
        margin-bottom: 13px;
        font-size: 18px;
        .color_block {
          display: inline-block;
          font-style: normal;
          width: 26px;
          height: 13px;
          border-radius: 6px;
          margin-right: 13px;
        }
      }
    }
  }
}
</style>