<template>
  <div class="expert_tec">
    <div class="title order_title">专家技术方向汇总</div>
    <e-charts
      ref="chart"
      @chartexperteclick="chartClick"
      :initOptions="initOptions"
      :options="options"
      :activeIndex="activeIndex"
    />
  </div>
</template>

<script>
export default {
  name: "ExpertTec",
  props: {
    skillDirection: {
      type: Array,
      default: () => {
        return [];
      },
    },
    expertNum: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      initOptions: {
        width: 650 * window.scale,
        height: 600 * window.scale,
      },
      xData: [],
      yData: [],
      seriesdata_bj: [],
      options: {},
      displayNum: 8, // 每次显示数据条数
      groupNum: null, // 总条数/8
      arr: [],
      arrGroup: [], // 存放数据的数组
      areaGroup: [],
      curIndex: -1,
      timerTec: null,
      activeIndex: null,
    };
  },
  beforeDestroy() {
    clearInterval(this.timerTec);
  },
  mounted() {
    this.skillDirection.map((res) => {
      this.xData.push(res.skillName);
      this.yData.push({
        name: res.skillName,
        value: res.skillNum,
        specialty: res.skillCode,
      });
      this.arr.push({ value: res.skillNum, specialty: res.skillCode });
      this.seriesdata_bj.push(this.expertNum);
    });
    this.groupNum = Math.ceil(this.seriesdata_bj.length / this.displayNum);

    for (var i = 0; i < this.arr.length; i += this.displayNum) {
      //数据按个数分组存储
      this.arrGroup.push(this.arr.slice(i, i + this.displayNum));
    }
    // var areaGroup = [];
    for (var i = 0; i < this.xData.length; i += this.displayNum) {
      //区域名称按个数分组存储
      this.areaGroup.push(this.xData.slice(i, i + this.displayNum));
    }
    this.echartInit();
    this.activeIndex = 0;
    // console.log("当前索引", this.activeIndex);
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
        clearInterval(that.timerTec);
      });
      //离开
      myChart.on("mouseout", function (a) {
        clearInterval(that.timerTec);
        that.timerTec = setInterval(() => {
          that.highLight();
        }, 2000);
      });
    }, 0);
  },
  methods: {
    echartInit() {
      var groupOption = [];
      for (var i = 0; i < this.groupNum; i++) {
        var temp = {
          xAxis: [
            {
              type: "category",
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 14,
                },
                interval: 0,
                rotate: 60,
              },
              data: this.areaGroup[i],
              splitLine: {
                show: false,
              },
            },
          ],
          series: [
            {
              data: this.arrGroup[i],
            },
          ],
        };
        groupOption.push(temp);
      }

      this.options = {
        baseOption: {
          timeline: {
            show: false,
            axisType: "category",
            autoPlay: false,
            playInterval: 4000,
            data: this.areaGroup,
            label: {
              formatter: function (s) {
                return "";
              },
            },
          },
          grid: {
            bottom: 120,
          },
          tooltip: {
            trigger: "axis",
            formatter: function (params) {
              return params[0].name + " : " + params[0].value;
            },
          },
          xAxis: [
            {
              type: "category",
              gridIndex: 0,
              data: this.xData,
              axisTick: {
                alignWithLabel: true,
              },
              nameTextStyle: {
                height: 1000,
              },
              axisLine: {
                lineStyle: {
                  color: "rgba(62, 134, 255, 0.5)",
                },
              },
              axisLabel: {
                show: true,
                color: "#fff",
                rotate: 60,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "",
              nameTextStyle: {
                color: "#fff",
              },
              max: this.expertNum,
              min: 0,
              gridIndex: 0,
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(62, 134, 255, 0.3)",
                  type: "dashed",
                },
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: "rgba(62, 134, 255, 0.5)",
                },
              },
              axisLabel: {
                color: "#fff",
              },
            },
            {
              type: "value",
              gridIndex: 0,
              min: 0,
              max: this.expertNum,
              splitNumber: 12,
              splitLine: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: "专家人数",
              type: "bar",
              barWidth: "10px",
              xAxisIndex: 0,
              yAxisIndex: 0,
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  color: "#07E6F9",
                  label: {
                    show: true,
                    position: "top",
                    textStyle: {
                      color: "#04C7E6",
                      fontSize: 16,
                    },
                  },
                },
              },
              data: this.yData,
              zlevel: 11,
            },
            {
              name: "总比",
              type: "bar",
              barWidth: "10px",
              xAxisIndex: 0,
              yAxisIndex: 1,
              barGap: "-100%",
              data: this.seriesdata_bj,
              itemStyle: {
                normal: {
                  color: "rgba(60, 130, 248, 0.2)",
                },
              },
              zlevel: 9,
            },
          ],
        },
        options: groupOption,
      };
      this.timerTec = setInterval(() => {
        this.highLight();
      }, 2000);
    },
    chartClick(params) {
      this.$router.push({
        name: "expertlist",
        query: { specialty: params.specialty },
      });
    },
    highLight() {
      const myChart = this.$refs.chart.chart;
      const dataLen = this.seriesdata_bj.length;

      // 取消之前高亮的图形
      myChart.dispatchAction({
        type: "downplay",
        dataIndex: this.curIndex,
      });
      this.curIndex = (this.curIndex + 1) % dataLen;
      this.activeIndex = Math.floor(this.curIndex / 8);
      // console.log(this.activeIndex)
      myChart.dispatchAction({
        type: "timelineChange",
        // 时间点的 index
        currentIndex: Math.floor(this.curIndex / 8),
      });
      // 显示提示框
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: this.curIndex % 8,
      });
      // 高亮当前图形
      myChart.dispatchAction({
        type: "highlight",
        dataIndex: this.curIndex % 8,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.expert_tec {
  width: 674px;
  margin-right: 40px;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @include bis("~img/order/left_bg.png");
}
</style>