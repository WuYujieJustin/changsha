<template>
<div class="back">
    <div class="bg-body">
    </div>
    <!-- 当前的时间 -->
    <div class="now-time">
      <p class="time-text">时间</p>
      <span class="time" v-html="currentTime"></span>
      <span class="date" v-html="currentDate"></span>
    </div>
    <!-- 关闭当前页 -->
    <div class="close" @click="closeCurrent">
      <img src="../../assets/plan/close.png" alt="">
    </div>
    <p class="closeText">关闭本页</p>
    <!-- 标题 -->
    <div class="title">
      <img src="../../assets/plan/title1.png" alt="">
    </div>
    <div class="fenge"></div>
    <div class="bg-ball">
      <div class="son"></div>
    </div>
     <!-- 中间主题部分 -->
      <div class="main">
        <div class="mohu"></div>
        <div class="mohu"></div>
        <div class="mohu"></div>
        <div class="top">
          <div ref="animate" 
            v-for="(item,index) in ProjectList" 
            :key="index" class="top-keji" 
            :class="{'active':bool}"
            >

            <div class="keji-img">
              <div class="dayuan">
                <img src="../../assets/plan/dayuan.png">
              </div>
              <div class="zhongyuan">
                <img src="../../assets/plan/zhongyuan.png">
              </div>
              <div class="xiaoyuan">
                <img src="../../assets/plan/xiaoyuan.png">
              </div>
            </div>
            <div class="keji-line"></div>
            <div class="project-text">
              <div class="project-textSon">
                <div class="bg"></div> 
              <p class="text" :title="item.mediumlongProjectName">{{item.mediumlongProjectName}}</p>
              </div>
              <div class="gaoguang"></div>
              <div class="project-status"  @click="skip(item)">
                <div class="project-num">{{item.status}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="middle">
          <!-- <div class="cityPlanName">{{cityPlanName}}</div>
          <div class="totalPlan">截止目前共{{totalPlan}}个专项发展规划</div> -->
        </div>
        <div class="down">
        </div>
        <!-- 圆盘 -->
        <div class="disk">
          <div></div>
          <ul class="page" ref="page">
            <li v-for="(op,i) in pages" :key="i" :class="{'active':active == i}" @click="getPage(i)"></li>
          </ul>
        </div>
      </div>
    <!-- 按钮 -->
    <div class="btnBox">
      <div class="btn2" @click="handleD">
        <div class="update-icon"></div>
        <div class="to-update"></div>
      </div>
      <div class="btn1">
        <div class="update-icon1"></div>
        <div class="to-update"></div>
      </div>
    </div>
 </div>
</template>

<script>
import config from "@/settings";
import { api_queryMediumlongProjec} from '@/api/planOver.js'
import anime from 'animejs/anime.min.js';
export default {
  name: 'overView',
  data(){
    return{
      bool1:false,
      active:0,
      titleImg:'../../assets/plan/title.png',
      timer: "",//定义一个定时器的变量
      currentTime: '', // 获取当前时间
      currentDate:'', // 当前日期
      title:'长沙市发展规划概览',
      ProjectList:[],
      pages:[],
      params:{
        specialPlanId:'',
        pageNum:1,
        pageSize:10
      },
      ProjectListMiddle:[
      ],
      bool: false,
      ProjectListDowm:[],
      cityPlanName:'',
      totalPlan:'',
      projectNum:'',
      movex:0,
      movey:0,
    }
  },
  created(){
    setInterval(() => {
      var y = new Date().getFullYear();
      var m = this.appendZero(new Date().getMonth() + 1);
      var d = this.appendZero(new Date().getDate());
      var ho = this.appendZero(new Date().getHours());
      var mi = this.appendZero(new Date().getMinutes());
      var s = this.appendZero(new Date().getSeconds())
        //修改数据date
        this.currentTime =  ho + ':' + mi + ':' + s;
        this.currentDate = y + "-" + m + '-' + d
    }, 1000);
  },
  mounted(){
    document.onmousemove = (e)=> {
      var e = e || window.event;
      if (e.pageX || e.pageY) {
        var movex = e.pageX;
        var movey = e.pageY
      }
      anime({
        targets: '.son',
        translateX: movex / 90,
        translateY: movey / 90,
        rotateX: -movey / 500,
        rotateY: movex / 500,
        duration: 2000,
        easing: 'easeOutCirc'
      });
    }
    if(this.$route.query.id != undefined){
      this.params.specialPlanId = this.$route.query.id
    }
    this.$refs.page.style.display = "none"
    this.getProjectTotal()
  },
  methods:{
    handleD(){
      this.$router.push({
        name: "viewPlan",
      });
    },
    getPage(i){
      this.active = i
      if(i+1 != this.params.pageNum){
        this.params.pageNum = i+1
        this.bool = false
        this.getProjectTotal()
      }
    },
    skip(item){
      window.open(config.baseUrl + '/#/projectPlan/zhongchangqi/zcqDList/detail?id=' + item.id,`_blank`)
    },
    // 获取数据
    getProjectTotal(){
      let arr = []
      api_queryMediumlongProjec(this.params).then(res => {
        if(res.msg.code == '0000'){
          console.log(res)
          arr = Array.apply(1,{length:res.data.pages})
          if(this.bool1 == false){
            arr.forEach((item,index)=>{
              this.pages.push(index+1)
            })
          }
          // this.cityPlanName = res.data.cityProject.cityPlanName
          this.totalPlan = res.data.total
          this.totalPlan <= 10
            ? (this.$refs.page.style.display = "none")
            : (this.$refs.page.style.display = "block");
          this.ProjectList = res.data.records
          this.bool = true
          this.bool1 = true
        }
      })
    },
    // 关闭当前页
    closeCurrent(){
      window.open('about:blank','_self').close()  
    },
    appendZero(obj) {
      if (obj < 10) {
          return "0" + obj;
      } else {
          return obj;
      }
    },
  }
}
</script> 
<style lang="scss" scoped>
@import '/index.scss';
@import './animate.css';
.back{
  width:100%;
  height:100%;
  background:#000A2B;
  position: relative;
  
}
</style>