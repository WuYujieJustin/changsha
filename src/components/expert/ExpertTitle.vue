<template>
  <div class="expert_title">
    <div class="title order_title">专家最高职称分布</div>
    <e-charts ref="chart" @chartclick="chartClick" :initOptions="initOptions" :options="options" />
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

export default {
  name: "ExpertTitle",
  props: {
    expertTitle: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      colors: ["#FFC000", "#CB2D82", "#08EAFA", "#2A6DE1"],
      dataList: [
        {
          name: "助工",
          value: 0,
          positionalTitle: 1,
          color: "#FFC000",
        },
        {
          name: "中级",
          value: 0,
          positionalTitle: 2,
          color: "#CB2D82",
        },
        {
          name: "副高",
          value: 0,
          positionalTitle: 3,
          color: "#08EAFA",
        },
        {
          name: "正高",
          value: 0,
          positionalTitle: 4,
          color: "#2A6DE1",
        },
      ],
      initOptions: {
        width: 400 * window.scale,
        height: 200 * window.scale,
      },
      options: {},
      curIndex: -1,
      timerTitle: null,
    };
  },
  beforeDestroy() {
    clearInterval(this.timerTitle);
  },
  mounted() {
    this.expertTitle.map((item, index) => {
      item.value = item.expertCount;
      item.name = item.positionalTitleName;
      item.color = this.colors[index];
      // this.dataList.map((item) => {
      //   if (item.positionalTitle === res.positionalTitle) {
      //     item.value = res.expertCount;
      //     item.name = res.positionalTitleName;
      //   }
      // });
    });
    this.dataList = this.expertTitle;
    this.echartInit();
    this.timerTitle = setInterval(() => {
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
        clearInterval(that.timerTitle);
      });
      //离开
      myChart.on("mouseout", function (a) {
        clearInterval(that.timerTitle);
        that.timerTitle = setInterval(() => {
          that.highLight();
        }, 2000);
      });
    }, 0);
  },
  methods: {
    echartInit() {
      this.options = {
        color: ["#FFC000", "#CB2D82", "#08EAFA", "#2A6DE1"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        itemStyle: {},
        series: [
          {
            type: "pie",
            name: "最高职称",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: this.dataList,
            label: {
              show: true,
              formatter: "{d}%",
              fontSize: convertPx(16),
            },
          },
        ],
      };
    },
    chartClick(params) {
      this.$router.push({
        name: "expertlist",
        query: { positionalTitle: params.data.positionalTitle },
      });
    },

    highLight() {
      const myChart = this.$refs.chart.chart;
      const dataLen = this.dataList.length;

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
.expert_title {
  width: 100%;
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
    position: absolute;
    bottom: 20px;
    .list_item {
      display: flex;
      align-items: center;
    }
    i {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 8px;
    }
  }
}
</style>