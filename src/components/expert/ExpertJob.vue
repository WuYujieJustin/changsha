<template>
  <div class="expert_job">
    <div class="title order_title">专家就职信息分布</div>
    <e-charts
      ref="chart"
      @chartclick="chartClick"
      :initOptions="initOptions"
      :options="options"
      v-if="optionData"
    />
    <ul class="ul_box">
      <li class="list_item" v-for="(item, index) in dataList" :key="index">
        <i :style="{backgroundColor: item.color}"></i>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { convertPx } from "@/utils/utils";
import echarts from "echarts";
export default {
  name: "ExpertJob",
  props: {
    expertJob: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      dataList: [],
      colors: ["#CB2D82", "#FFC000", "#2A6DE1"],
      optionData: null,
      sumValue: null,
      initOptions: {
        width: 220 * window.scale,
        height: 220 * window.scale,
      },
      options: {},
      timerJob: null,
      curIndex: -1,
    };
  },
  beforeDestroy() {
    clearInterval(this.timerJob);
  },
  mounted() {
    this.expertJob.forEach((item, index) => {
      item.value = item.expertCount;
      item.name = item.onJobName;
      item.color = this.colors[index];
    });
    this.dataList = this.expertJob;
    // this.expertJob.map((res) => {
    //   this.dataList.map((item) => {
    //     if (item.onJob === res.onJob) {
    //       item.value = res.expertCount;
    //       item.name = res.onJobName;
    //     }
    //   });
    // });
    let arrValue = this.getArrayValue(this.dataList, "value");
    this.sumValue = eval(arrValue.join("+"));
    this.optionData = this.getData(this.dataList);
    this.echartInit();
    this.timerJob = setInterval(() => {
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
        clearInterval(that.timerJob);
      });
      //离开
      myChart.on("mouseout", function (a) {
        clearInterval(that.timerJob);
        that.timerJob = setInterval(() => {
          that.highLight();
        }, 2000);
      });
    }, 0);
  },
  methods: {
    echartInit() {
      this.options = {
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{a}<br>{b}:{c}({d}%)",
        },
        color: ["#CB2D82", "#FFC000", "#2A6DE1"],
        grid: {
          top: "20%",
          bottom: "55%",
          left: "50%",
          containLabel: false,
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              inside: true,
              textStyle: {
                color: "#08EAFA",
                fontSize: convertPx(14),
              },
              show: true,
            },
            data: this.optionData.yAxis,
          },
        ],
        xAxis: [
          {
            show: false,
          },
        ],
        series: this.optionData.series,
      };
    },
    getArrayValue(array, key) {
      var key = key || "value";
      var res = [];
      if (array) {
        array.forEach(function (t) {
          res.push(t[key]);
        });
      }
      return res;
    },
    getData(data) {
      var res = {
        series: [],
        yAxis: [],
      };
      for (let i = 0; i < data.length; i++) {
        res.series.push({
          name: "就职信息",
          type: "pie",
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [65 - i * 15 + "%", 57 - i * 15 + "%"],
          center: ["50%", "55%"],
          label: {
            show: false,
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            borderWidth: 5,
          },
          data: [
            {
              value: data[i].value,
              name: data[i].name,
              onJob: data[i].onJob,
            },
            {
              value: this.sumValue - data[i].value,
              name: "",
              itemStyle: {
                color: "rgba(0,0,0,0)",
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
          ],
        });
        res.series.push({
          name: "",
          type: "pie",
          silent: true,
          z: 1,
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [65 - i * 15 + "%", 57 - i * 15 + "%"],
          center: ["50%", "55%"],
          label: {
            show: false,
          },

          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            borderWidth: 5,
          },
          data: [
            {
              value: 7.5,
              itemStyle: {
                color: "#122B6D",
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
            {
              value: 2.5,
              name: "",
              itemStyle: {
                color: "rgba(0,0,0,0)",
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
          ],
        });
        res.yAxis.push(
          ((data[i].value / this.sumValue) * 100).toFixed(2) + "%"
        );
      }
      return res;
    },
    chartClick(params) {
      this.$router.push({
        name: "expertlist",
        query: { onJob: params.data.onJob },
      });
    },
    highLight() {
      const myChart = this.$refs.chart.chart;
      const dataLen = this.dataList.length;
      // 取消之前高亮的图形
      myChart.dispatchAction({
        type: "downplay",
        dataIndex: this.curIndex,
      });
      this.curIndex = (this.curIndex + 1) % dataLen;
      // 显示提示框
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: this.curIndex * 2,
        dataIndex: 0,
      });
      // 高亮当前图形
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: this.curIndex * 2,
        dataIndex: 0,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.expert_job {
  width: 100%;
  margin-bottom: 40px;
  flex: 1;
  position: relative;
  @include bis("~img/order/right_bg.png");
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .ul_box {
    padding: 0;
    margin: 0;
    width: 80%;
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    bottom: 20px;
    .list_item {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    i {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>