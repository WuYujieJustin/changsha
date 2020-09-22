<template>
  <div class="order_nums">
    <div class="title order_title">工单数量统计</div>
    <ul class="category" v-if="echartData.bizUnits">
      <li class="list_item" v-for="(item, index) in echartData.bizUnits" :key="'li'+index">
        <i class="color_block" :style="{backgroundColor: orderType[index].color}"></i>
        <span>{{item.buName}}</span>
      </li>
    </ul>
    <div class="num_title">
      <span>共计：{{orderTotal}}个工单类型</span>
    </div>
    <example :datas="echartData.datas" @GetType="GetTypes" v-if="echartData.datas" />
  </div>
</template>

<script>
import { cockpitPanel } from "@/api/expert";
import example from "@/views/workOrder/example.vue";
import { api_queryWorkTypes } from "@/api/workorder.js";

export default {
  name: "OrderNums",
  components: {
    example,
  },
  data() {
    return {
      orderTotal: 0,
      echartData: {},
      orderType: [
        {
          color: "#06E3F8",
          name: "服务工单",
        },
        {
          color: "#3D88EA",
          name: "会议工单",
        },
        {
          color: "#D8419A",
          name: "其他",
        },
      ],
    };
  },
  computed: {
    prequalificationTotal() {
      let found = {};
      if (this.echartData.datas) {
        found = this.echartData.datas.find(
          (item) => item.workType === "workflow_workorder_prequalification"
        );
      }
      return found.totalWorkOrderNumber || 0;
    },
  },
  mounted() {
    this.getType();
    cockpitPanel().then((res) => {
      if (res.msg.code == "0000") {
        res.data.datas.forEach((ele) => {
          ele.items.forEach((item) => {
            item.workType = ele.workType;
            item.totalWorkOrderNumber = ele.totalWorkOrderNumber;
            item.value = item.workOrderNumber;
            item.name = item.buName;
            if (item.workOrderNumber != 0) {
              item.percentage = `${(
                (item.workOrderNumber / item.totalWorkOrderNumber) *
                100
              ).toFixed(0)}%`;
            } else {
              item.percentage = `0%`;
            }
          });
        });
        this.echartData = res.data;
        console.log(res.data.datas);
      }
    });
  },
  methods: {
    GetTypes(data) {
      this.$emit("GetType", data);
    },
    async getType() {
      let { data } = await api_queryWorkTypes({ type: 1 });
      if (data && data.length) {
        this.orderTotal = data.length;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.order_nums {
  width: 100%;
  flex: 1;
  height: 377px;
  position: relative;
  padding-top: 34px;
  box-sizing: border-box;
  overflow: hidden;
  @include bis("~img/order/left_bg.png");

  .num_title {
    display: flex;
    justify-content: center;
    span {
      display: inline-block;
      @include bis("~img/order/bg.png");
      width: 317px;
      height: 29px;
      text-align: center;
      font-size: 16px;
      line-height: 29px;
    }
  }
  .category {
    margin: 0;
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: flex-end;
    padding-right: 30px;
    .list_item {
      margin-bottom: 13px;
      margin-left: 40px;
      font-size: 18px;
      display: flex;
      align-items: center;

      .color_block {
        display: inline-block;
        font-style: normal;
        width: 26px;
        height: 13px;
        border-radius: 6px;
        margin-right: 13px;
      }
    }
    .list_item :nth-last-child(1) {
      margin-right: 0px;
    }
  }
}
</style>
