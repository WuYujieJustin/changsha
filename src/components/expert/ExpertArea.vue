<template>
  <div class="expert_area">
    <div class="title order_title">专家行业领域汇总</div>
    <ul class="infinite-list" style="overflow:auto">
      <li
        @click="handleClick(i)"
        v-for="(i, index) in Industry"
        class="infinite-list-item"
        :key="index"
      >
        <div class="name">
          <span class="IndustryName">{{i.positionName}}</span>
        </div>
        <div class="progress">
          <el-progress :show-text="false" :percentage="i.percentage"></el-progress>
        </div>
        <div class="nums">{{i.positionNum}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ExpertArea",
  props: {
    positionField: {
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
      Industry: [],
      timer: null,
    };
  },
  created() {},
  destroyed() {
    clearInterval(this.timer);
  },
  mounted() {
    this.Industry = this.positionField.map((res) => {
      res.percentage = (res.positionNum / this.expertNum) * 100;
      return res;
    });
    this.timer = setInterval(() => {
      this.Industry.push(this.Industry[0]);
      this.Industry.shift();
    }, 2000);
  },
  methods: {
    handleClick(item) {
      this.$router.push({
        name: "expertlist",
        query: { positionCode: item.positionCode },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.expert_area {
  box-sizing: border-box;
  width: 674px;
  height: 100%;
  margin-right: 40px;
  position: relative;
  padding: 40px;
  padding-top: 74px;
  @include bis("~img/order/left_bg.png");
  .infinite-list {
    height: calc(100% - 0px);
    list-style: none;
    padding: 0;
    margin: 0;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
      /* Chrome Safari */
    }

    scrollbar-width: none;
    /* 火狐 */
    -ms-overflow-style: none;
    /* IE */
    .infinite-list-item {
      height: 34px;
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      font-size: 18px;
      cursor: pointer;
      &:last-of-type {
        margin-bottom: 0;
      }
      .IndustryName {
        width: 100%;
        padding: 0 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
    }
    .name {
      width: 192px;
      height: 33px;
      display: flex;
      align-items: center;
      justify-content: center;
      @include bis("~img/expert/nameBg.png");
    }
    .progress {
      flex: 1;
      margin-left: 5px;
      margin-right: 13px;
    }
    .nums {
      @include bis("~img/expert/numBg.png");
      width: 58px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 5px;
    }
  }
}
::v-deep .el-progress-bar__outer {
  border-radius: initial !important;
  background-color: rgba(62, 134, 255, 0.2);
  height: 10px;
}
::v-deep .el-progress-bar__inner {
  border-radius: initial !important;
  background: linear-gradient(90deg, #2a6ee1 10%, #07e6f9 100%) !important;
  height: 10px;
}
</style>