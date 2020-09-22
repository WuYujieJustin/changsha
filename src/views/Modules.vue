<template>
  <div :class="['home', $route.path.includes('major') ? 'major-bg-img' : 'is-add-bg-img']">
    <div class="header">
      <div class="opera">
        <div
          :class="['header-left', 'header-com', { 'active': $route.path.includes('all') }]"
          @click.stop="switchPage('-1')"
        >
          <img class="operateImg" :src="back" />
        </div>
        <span>返回</span>
      </div>

      <div class="header-center">长沙市全生命周期项目驾驶舱</div>
      <div class="opera">
        <span>关闭本页</span>
        <div
          :class="['header-right', 'header-com', { 'active': $route.path.includes('major') }]"
          @click.stop="switchPage('AllAnalysis')"
        >
          <img class="operateImg" :src="close" />
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      exit: require("img/bg/exit.png"),
      back: require("img/bg/fanhui.png"),
      close: require("img/bg/guanbi.png"),
    };
  },
  methods: {
    switchPage(routeName) {
      if (routeName == -1) {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: routeName });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.is-add-bg-img {
  @include bis("~img/bg/bg.png");
  height: 100vh;
}
.major-bg-img {
  // @include bis("~img/bg/major_bg.png");
  height: 100vh;
}
.home {
  padding: 27px;
  padding-top: 0;
  ::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(240, 242, 246, 0.5);
  }
  .header {
    display: flex;
    height: 69px;
    align-items: center;
    margin-top: 0;
    justify-content: space-between;
    margin-bottom: 28px;
    .opera {
      display: flex;
      align-items: center;
      span {
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .header-left {
      margin-right: 10px;
    }
    .header-right {
      margin-left: 10px;
    }
    .header-com {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      background: rgba(216, 216, 216, 0);
      cursor: pointer;
      border: 1px solid #233c70;
      img {
        width: 14px;
        height: 15px;
      }
      // &:hover {
      //   box-shadow: 0px 0px 13px 5px rgba(4, 219, 246, 0.5) inset;
      //   border: 1px solid rgba(4, 219, 246, 1);
      // }
    }
    .header-center {
      width: 1016px;
      height: 69px;
      line-height: 69px;
      color: $color-white;
      font-size: 25px;
      font-weight: bold;
      text-align: center;
      @include bis("~img/bg/header_center@2x.png");
    }
    .operateImg {
      width: 32px;
      height: 32px;
    }
    .active {
      color: $color-blue;
      opacity: 1;
    }
  }
}
</style>
