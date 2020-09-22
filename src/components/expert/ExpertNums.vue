<template>
  <div class="expert_nums">
    <div class="title order_title">专家状态人数</div>
    <ul class="num_charts">
      <li v-for="(item, index) in optionsArr" :key="index" @click="toPath(item)">
        <e-charts :initOptions="initOptions" :options="item.options" />
        <div class="status">
          <img :src="wait" v-if="item.status === 2" />
          <img :src="stop" v-else-if="item.status === 1" />
          <img :src="active" v-else />
          <span>{{item.status | statusFilter}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { convertPx } from "@/utils/utils";
let value = 0.4;
let data = [value, value];
export default {
  name: "ExpertNums",
  props: {
    expertStatus: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      wait: require("img/expert/wait.png"),
      active: require("img/expert/active.png"),
      stop: require("img/expert/stop.png"),
      initOptions: {
        width: 128 * window.scale,
        height: 128 * window.scale,
      },
      optionsArr: [],
    };
  },
  mounted() {
    this.echartInit();
  },
  methods: {
    echartInit() {
      this.expertStatus.map((res) => {
        let options = {
          series: [
            {
              type: "liquidFill",
              radius: "90%",
              animation: false,
              data: data,
              color: "rgba(255, 225, 0, 0.4)",
              silent: true,
              label: {
                show: true,
                baseline: "bottom",
                color: "#fff",
                fontSize: convertPx(27),
                position: ["50%", "50%"],
                formatter: function () {
                  return res.expertCount;
                },
              },
              outline: {
                show: true,
                borderDistance: convertPx(10),
                itemStyle: {
                  borderWidth: 2,
                  borderColor: "#FFE100",
                },
              },
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "0px 0px 9px 0px #FFE100",
              },
              backgroundStyle: {
                color: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(255, 225, 0, 0)", // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: "rgba(255, 225, 0, 0)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(255, 225, 0, 0.4)", // 100% 处的颜色
                    },
                  ],
                },
              },
            },
          ],
        };
        if (res.expertStatus === 0) {
          options.series[0].color = "#08EAFA";
          options.series[0].outline.itemStyle.borderColor = "#08EAFA";
          options.series[0].itemStyle.shadowColor = "0px 0px 9px 0px #08EAFA";
          options.series[0].backgroundStyle.color.colorStops = [
            {
              offset: 0,
              color: "rgba(8,234,250, 0)", // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: "rgba(8,234,250, 0)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(8,234,250, 0.4)", // 100% 处的颜色
            },
          ];
        } else if (res.expertStatus === 1) {
          options.series[0].color = "rgba(232,57,92,1)";
          options.series[0].outline.itemStyle.borderColor = "#E8395C";
          options.series[0].itemStyle.shadowColor = "0px 0px 9px 0px #E8395C";
          options.series[0].backgroundStyle.color.colorStops = [
            {
              offset: 0,
              color: "rgba(232,57,92, 0)", // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: "rgba(232,57,92, 0)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(232,57,92, 0.4)", // 100% 处的颜色
            },
          ];
        }
        this.optionsArr.push({
          status: res.expertStatus,
          options,
        });
      });
    },
    toPath(item) {
      this.$router.push({name: 'expertlist', query: {status: item.status}})
    },
  },
  filters: {
    statusFilter: function (value) {
      if (value === 0) {
        return "激活";
      } else if (value === 1) {
        return "停用";
      } else if (value === 2) {
        return "待审核";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.expert_nums {
  flex: 1;
  margin-right: 39px;
  height: 317px;
  position: relative;
  @include bis("~img/bg/zhengzhi_bg.png");
  .num_charts {
    display: flex;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    padding-left: 0;
    li {
      list-style: none;
      display: flex;
      flex-direction: column;
      font-size: 19px;
      cursor: pointer;
      .status {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 19px;
      }
      img {
        width: 24px;
        height: 24px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>