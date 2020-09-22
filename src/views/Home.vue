<template>
  <div :class="['home', $route.path.includes('major') ? 'major-bg-img' : 'is-add-bg-img']">
    <div class="header">
      <clock />
      <!-- <weather /> -->
      <div class="header-center">
        长沙市全生命周期项目驾驶舱
      </div>
      <div class="exit" @click.stop="logout">
        <div class="desc">关闭页面</div>
        <div class="icon-wrapper">
          <img class="icon" :src="exit" alt="退出">
        </div>
      </div>
    </div>
    <div class="menu">
      <div :class="['header-left', { 'active': $route.path.includes('all') }]" @click.stop="switchPage('AllAnalysis')">
        全市项目分析
      </div>
      <img class="panel" :src="right_panel" />
      <img class="panel" :src="left_panel" />
      <div :class="['header-right', { 'active': $route.path.includes('major') }]" @click.stop="switchPage('MajorAnalysis')">
        重点项目分析
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      exit: require('img/bg/close.png'),
      right_panel: require('img/bg/right_panel.png'),
      left_panel: require('img/bg/left_panel.png'),
    }
  },
  created () {
    this.setYearList()
  },
  methods: {
    ...mapActions({
      'setYearList': 'allProject/setYearList',
    }),
    To(){
        this.$router.push({
        name: "expertlist"
      });
    },
    switchPage (routeName) {
      this.$router.push({ name: routeName })
    },
    logout() {
        const isDev = process.env.NODE_ENV === 'development' // 是否本地开发环境
        const baseUrl = isDev ? 'https://csyjdev.jiefanghao.com' : location.protocol + '//' + location.hostname
        localStorage.clear()
        let pageUrl = window.location.origin + '/pmreport';
        let targetUrl = baseUrl + '/csportalsite/login?redirectUrl=' + encodeURIComponent(pageUrl)
        let targetUrl1 = baseUrl + '/csportalsite/logout?redirectUrl=' + encodeURIComponent(targetUrl)
        window.location.replace(targetUrl1)
    }
  }
}
</script>

<style scoped lang="scss">
.is-add-bg-img{
  @include bis('~img/bg/bg.png');
  height: 100vh;
}
.major-bg-img{
  @include bis('~img/bg/major_bg.png');
  height: 100vh;
}
.home{
  ::-webkit-scrollbar {
      width: 6px;
      border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
      // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
      border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
      background: rgba(240, 242, 246, .5);
  }
  .menu{
    display: flex;
    .header-left{
      flex: 1;
      height: 45px;
      line-height: 45px;
      color: $color-white;
      font-size: 24px;
      padding-right: 148px;
      text-align: right;
      box-sizing: border-box;
      @include bis('~img/bg/header_left@2x.png');
      opacity: .5;
      cursor: pointer;
      margin-top: 20px;
    }
    .header-right{
      flex: 1;
      height: 45px;
      line-height: 45px;
      font-size: 24px;
      color: $color-white;
      padding-left: 157px;
      box-sizing: border-box;
      @include bis('~img/bg/header_right@2x.png');
      opacity: .5;
      cursor: pointer;
      margin-top: 20px;
    }
    .active{
      color: $color-blue;
      opacity: 1;
    }
    .panel{
      width: 424px;
      height: 30px;
    }
  }
  .header{
    // margin: 12px 29px 33px;
    display: flex;
    height: 66px;
    align-items: flex-end;
    justify-content: center;
    margin-top: 0;
    padding-top: 12px;
    .header-center{
      width: 919px;
      height: 66px;
      line-height: 66px;
      color: $color-white;
      font-size:28px;
      font-weight:bold;
      text-align: center;
      @include bis('~img/bg/header_center@2x.png');
    }
    .exit{
      cursor: pointer;
      width: 40px;
      height: 40px;
      position: absolute;
      display: flex;
      top: 30px;
      right: 30px;
      width: 200px;
      .desc{
        width: 80px;
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 44px;
        margin-right: 20px;
      }
      .icon-wrapper{
        width: 44px;
        height: 44px;
        background: rgba(216, 216, 216, 0);
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        .icon{
          width: 14px;
          height: 14px;
        }
      }
    }
  }
}
</style>
