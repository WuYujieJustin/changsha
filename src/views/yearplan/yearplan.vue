<template>
  <div class="back">
    <!-- <div class="bg-body"></div> -->
    <!--选择年份 -->
    <p class="ssnf">所属年份</p>
    <div class="seleYear">
      <img class="edit" src="../../assets/plan/edit.png" />
      <!--  :key="jobnumberKey" -->
      <el-dropdown  trigger="click" @command="handTime">
        <p @click="selectYaear" v-html="obj1.year + '年'"></p>
        <el-dropdown-menu slot="dropdown" class="year-dw">
          <el-dropdown-item
            v-for="(item, index1) in options"
            :key="index1"
            :command="item"
            >{{item+'年'}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 当前的时间 -->
    <div class="now-time1">
      <p class="time-text">
        时间<span class="date">{{ currentDate }}</span>
      </p>
      <span class="time" v-html="currentTime"></span>
    </div>
    <!-- 关闭当前页 -->
    <div class="close" @click="closeCurrent">
      <img src="../../assets/plan/close.png" alt="" />
    </div>
    <p class="closeText1">关闭本页</p>
    <!-- 标题 -->
    <div class="title">
      <img src="../../assets/plan/title.png" alt="" />
    </div>
    <div class="fenge"></div>
    <div class="bg-ball">
      <div class="son"></div>
    </div>
    <!-- 中间主题部分 -->
    <div class="main1">
      <div class="mohu"></div>
      <div class="mohu"></div>
      <div class="mohu"></div>
      <div class="top1">
        <div
          ref="animate"
          v-for="(item, index) in ProjectList"
          :key="index"
          class="top-keji"
          :class="{ active: bool }"
        >
          <div class="keji-img">
            <div class="dayuan">
              <img src="../../assets/plan/dayuan.png" />
            </div>
            <div class="zhongyuan">
              <img src="../../assets/plan/zhongyuan.png" />
            </div>
            <div class="xiaoyuan">
              <img src="../../assets/plan/xiaoyuan.png" />
            </div>
          </div>
          <div class="keji-line"></div>
          <div class="project-text">
            <div class="project-textSon">
              <div class="bg"></div>
              <p class="text" :title="item.mediumlongProjectName">
                {{ item.mediumlongProjectName }}
              </p>
            </div>
            <div class="gaoguang"></div>
            <div
              class="project-status project-status1"
              v-if="item.yearProjectType == 1"
              @click="skip(item)"
            >
              <p class="project-num">年度计划</p>
            </div>
            <div
              class="project-status"
              v-if="item.yearProjectType == 2"
              @click="skip(item)"
            >
              <p class="project-num">储备目录</p>
            </div>
          </div>
        </div>
      </div>
      <div class="middle1"></div>
      <div class="down1"></div>
      <!-- 圆盘 -->
      <div class="disk1">
        <div class="diskSon"></div>
        <div class="pageF ignore">
          <ul class="page ignore" ref="page">
            <li
              v-for="(op, i) in pages"
              class="ignore"
              :key="i"
              :class="{ active: active == i }"
              @click="getPage(i)"
            ></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="btn" @click="hyp">
      <div class="update-icon1"></div>
      <div class="to-update"></div>
    </div>
    <div class="leftList">
      <div class="leftListSon">
        <div class="leftListTitle">
          <img src="../../assets/plan/img.png" />
          <p>年度计划资金情况</p>
          <span>（单位：万元）</span>
        </div>
        <div class="leftListBox">
          <div class="leftListBox1">
            <div class="je">
              <p>核减金额</p>
              <p v-html="obj.cutAmount.toFixed(2)"></p>
            </div>
            <div
              class="pie"
              ref="pie"
              style="height: 100%; z-index: 20; position: relative"
            >
              <e-charts
                v-if="chartBool"
                ref="chart"
                :initOptions="initOptions1"
                :options="options2"
                auto-size
              />
            </div>
          </div>
          <div class="leftListBox2">
            <div class="je1" style="width: 50%">
              <p>已审项目估算/概算金额</p>
              <p v-html="obj.studyAndPreliminaryAmount.toFixed(2)"></p>
            </div>
            <div class="je1" style="width: 50%">
              <p>已审项目计划金额</p>
              <p v-html="obj.applyAmount.toFixed(2)"></p>
            </div>
          </div>
        </div>
        <div class="bgLeft"></div>
        <div class="bgRight"></div>
      </div>
      <div class="leftListSon">
        <div class="leftListTitle">
          <img src="../../assets/plan/img3.png" />
          <p>年度计划项目数量情况</p>
        </div>
        <div class="leftListBox">
          <div
            class="leftListBox2"
            style="width: 45%; height: 100%; float: left"
          >
            <div class="je1" style="height: 50%">
              <p>50w以下</p>
              <p>{{ obj["50Sum"] }}</p>
            </div>
            <div class="je1" style="height: 50%">
              <p>50-1000w</p>
              <p>{{ obj["1005Sum"] }}</p>
            </div>
            <div class="je1" style="height: 50%">
              <p>1000w以上</p>
              <p>{{ obj["1000Sum"] }}</p>
            </div>
            <div class="je1" style="height: 50%">
              <p>试点项目</p>
              <p>{{ obj.trialNum }}</p>
            </div>
          </div>
          <div ref="chartName" class="chartName">
            <e-charts
              v-if="chartBool"
              ref="chart"
              :initOptions="initOptions"
              :options="options1"
            />
          </div>
        </div>
        <div class="bgLeft"></div>
        <div class="bgRight"></div>
      </div>
      <div class="leftListSon">
        <div class="leftListTitle">
          <img src="../../assets/plan/img2.png" />
          <p>采购与实施</p>
        </div>
        <div class="leftListBox">
          <div class="leftListBox3">
            <div class="je1">
              <p>采购中</p>
              <p>{{ obj.purchaseNum }}</p>
            </div>
            <div class="je1">
              <p>实施中</p>
              <p>{{ obj.implementNum }}</p>
            </div>
          </div>
          <div class="leftListBox4" id="leftListBox4"></div>
        </div>
        <div class="bgLeft"></div>
        <div class="bgRight"></div>
      </div>
    </div>
    <div class="rightList">
      <div class="rightListTitle">
        <img src="../../assets/plan/img1.png" />
        <p>各建设单位项目情况</p>
      </div>
      <div class="list ignore" :class="{ active: bool2 }" ref="list">
        <p class="listP" v-if="bool3">暂无数据</p>
        <div class="listPSon" :class="{ marquee_top: animate }">
          <div class="ignore" v-for="(item, i) in items" :key="i">
            <div class="listcontont">
              <span class="span">{{ item.index + 1 }}</span>
              <p class="p">{{ item.creator_bu_name }}</p>
            </div>
            <p class="p1">{{ item["count(1)"] }}</p>
          </div>
        </div>
      </div>
      <div class="bgLeft"></div>
      <div class="bgRight"></div>
    </div>
    <div
      class="yearplanTitle"
      v-html="'长沙市' + obj1.year + '年度计划总览'"
    ></div>
    <div class="yearplanTitle1">
      <div></div>
      <p
        v-html="
          '截止目前共' +
          projectNum +
          '个年度发展规划,储备目录中' +
          projectNum1 +
          '个项目'
        "
      ></p>
    </div>
  </div>
</template>

<script>
document.onmousemove = (e) => {
  var e = e || window.event;
  if (e.pageX || e.pageY) {
    var movex = e.pageX;
    var movey = e.pageY
  }
  var bouncingBall = anime({
    targets: '.son',
    translateX: movex / 90,
    translateY: movey / 90,
    rotateX: -movey / 500,
    rotateY: movex / 500,
    duration: 1500,
    easing: 'easeOutCirc'
  });
}
import config from "@/settings";
import { api_yearplanzl, api_yearplanlist } from '@/api/planOver.js'
import { convertPx } from '@/utils/utils'
import echarts from 'echarts'
import anime from 'animejs/anime.min.js';
export default {
  name: 'planOver',
  components: {
    echarts
  },
  data () {
    return {
      animate: false,
      initOptions1: {
        width: '',
        height: ''
      },
      initOptions: {
        width: '',
        height: ''
      },
      jobnumberKey: '',
      show: false,
      obj1: {
        year: ''
      },
      options1: {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          itemWidth: 10,
          itemHeight: 8,
          orient: 'vertical',
          right: 0,
          top: '',
          textStyle: {
            fontSize: 12,//字体大小
            color: '#ffffff'//字体颜色
          },
          data: []
        },
        series: [
          {
            type: 'pie',
            radius: ['23%', '38%'],
            center: ['25%', '35%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [],
          }
        ],
        color: ['#009900', '#FAAD14', '#FF6477', '#007AFF'],
      },
      options2: {
        title: {
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          itemWidth: 10,
          itemHeight: 8,
          orient: 'vertical',
          right: 0,
          top: '3%',
          textStyle: {
            fontSize: 12,//字体大小
            color: '#ffffff'//字体颜色
          },
          data: []
        },
        series: [
          {
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['50%', '35%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [],
          }
        ],
        color: ['#007AFF', '#FAAD14', '#009900'],
      },
      options: [],
      active: 0,
      obj: {
        studyAndPreliminaryAmount: 0,
        cutAmount: 0,
        applyAmount: 0,
      },
      titleImg: '../../assets/plan/title.png',
      timer: "",//定义一个定时器的变量
      currentTime: '', // 获取当前时间
      currentDate: '', // 当前日期
      title: '长沙市发展规划概览',
      items: [],
      ProjectList: [],
      pages: [],
      chart: null,
      chart1: null,
      params: {
        pageNum: 1,
        pageSize: 10
      },
      sData: [],
      ProjectListMiddle: [
      ],
      chartBool: false,
      bool: true,
      bool1: false,
      bool2: true,
      bool3: true,
      time: null,
      time1: null,
      ProjectListDowm: [],
      cityPlanName: '',
      totalPlan: '',
      projectNum: '',
      projectNum1: '',
      num: 0,
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '0%',
          right: '5%',
          bottom: '10%',
          top: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {       //y轴刻度线
            show: false
          },
          splitLine: {     //网格线
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {       //y轴刻度线
            show: false
          },
          splitLine: {     //网格线
            show: false
          },
          type: 'category',
          data: ['采购中', '实施中', '验收中', '已完成'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#BACAFF'
            }
          }
        },
        series: [{
          data: [],
          type: 'bar',
          itemStyle: {
            normal: {
              color: function (params) {
                return {
                  colorStops: [{
                    offset: 0,   //颜色的开始位置
                    color: '#79C1FF' // 0% 处的颜色
                  }, {
                    offset: 1,    //颜色的结束位置
                    color: '#3D43E8' // 100% 处的颜色
                  }]
                }
              }
            }
          },
          barCategoryGap: '60%',
        }]
      }
    }
  },
  computed: {
    top () {
      return -this.activeIndex * 53 + 'px'
    }
  },
  created () {
    setInterval(() => {
      var y = new Date().getFullYear();
      var m = this.appendZero(new Date().getMonth() + 1);
      var d = this.appendZero(new Date().getDate());
      var ho = this.appendZero(new Date().getHours());
      var mi = this.appendZero(new Date().getMinutes());
      var s = this.appendZero(new Date().getSeconds())
      //修改数据date
      this.currentTime = ho + ':' + mi + ':' + s;
      this.currentDate = y + "-" + m + '-' + d
    }, 1000);
  },
  mounted () {
    let a = document.getElementsByClassName("listPSon");
    a[0].style.width = this.$refs.list.offsetWidth - 2 + 'px'
    this.chartBool = true
    this.initOptions.width = this.$refs.chartName.offsetWidth + 'px'
    this.initOptions.height = (this.$refs.chartName.offsetHeight * 1.4) + 'px'
    this.initOptions1.width = (this.$refs.pie.offsetWidth) + 'px'
    this.initOptions1.height = (this.$refs.pie.offsetHeight * 1.4) + 'px'
    this.getYearId()


  },
  methods: {
    hyp () {
      let page = document.getElementsByClassName("page");
      if (this.params.pageNum >= this.pages.length) {
        this.active = 0
        page[0].style.left = '0px'
        this.params.pageNum = 1
      } else {
        this.num = this.num - 113
        page[0].style.left = this.num + 'px'
        this.params.pageNum++
        this.active++
      }
      this.getyearList()
    },
    skip (item) {
      // console.log(item)
      if (item.busiType == 'jf_cs_project_apply') {
        window.open(config.baseUrl + '/#/shenbao/application/index/view?id=' + item.id,`_blank`)
      } else {
        window.open(config.baseUrl + '/#/shenbao/pilotprojectapplication/pilotprojectapplication/view?id=' + item.id,`_blank`) 
      }
    },
    getyearList () {
      let arr = []
      this.params.budgetYear = this.obj1.year
      this.ProjectList = []
      api_yearplanlist(this.params).then(res => {
        if (res.msg.code == '0000') {
          this.projectNum = res.data.yearPlanNum
          this.projectNum1 = res.data.storeNum
          this.ProjectList = res.data.list.records
          this.totalPlan = res.data.list.total
          arr = Array.apply(1, { length: res.data.list.pages })
          this.totalPlan < 10 ? (this.$refs.page.style.display = "none") : (this.$refs.page.style.display = "inline-block");
          if (this.bool1 == false) {
            arr.forEach((item, index) => {
              this.pages.push(index + 1)
            })
          }
          // console.log(this.pages,this.totalPlan)
          this.bool1 = true
          this.bool = true
        } else {
          this.pages = []
          this.$message.error(res.msg.message);
        }
      })
    },
    showMarquee () {
      this.animate = true
      this.items.push(this.items[0])
      this.time1 = setTimeout(() => {
        this.items.shift()
        this.animate = false
      }, 1500)
    },
    getYearId () {
      let data = {
        budgetYear: this.obj1.year
      }
      this.options = []
      this.options1.series[0].data = []
      this.options2.series[0].data = []
      this.options1.legend.data = []
      this.sData = []
      this.items = []
      this.option.series[0].data = []
      api_yearplanzl(data).then(res => {
        if (res && res.msg.code == '0000') {
          this.obj1.year = res.data.year
          this.options = res.data.budgetYears
          this.obj = res.data
          res.data.projectNumList.forEach((item, index) => {
            this.items.push({ ...item, index: index })
          })
          if (this.items.length != 0) {
            this.bool2 = false
            this.bool3 = false
          }
          if (this.items.length > 18) {
            this.time = setInterval(this.showMarquee, 2000)
          }
          this.getyearList()
          // this.options1.legend.data.push('50w以下','50-1000w','1000w以上','试点项目')
          this.option.series[0].data.push(res.data.purchaseNum, res.data.implementNum, res.data.acceptanceNum, res.data.finishedNum)
          this.options1.series[0].data.push({ name: '50w以下', value: res.data['50Sum'] }, { name: '50-1000w', value: res.data['1005Sum'] }, { name: '1000w以上', value: res.data['1000Sum'] }, { name: '试点项目', value: res.data['trialNum'] })
          this.options1.series[0].data.forEach(item => {
            if (item.value != 0) {
              this.options1.legend.data.push(item.name)
            }
          })
          if (this.options1.legend.data.length == 1) {
            this.options1.legend.top = '30%'
          } else if (this.options1.legend.data.length == 2) {
            this.options1.legend.top = '23%'
          } else if (this.options1.legend.data.length == 3) {
            this.options1.legend.top = '17%'
          } else if (this.options1.legend.data.length == 4) {
            this.options1.legend.top = '12%'
          }
          this.options2.series[0].data.push({ name: '核减金额', value: res.data.cutAmount.toFixed(2) }, { name: '概算金额', value: res.data.studyAndPreliminaryAmount.toFixed(2) }, { name: '计划金额', value: res.data.applyAmount.toFixed(2) })
          this.options2.series[0].data.forEach(item => {
            if (+item.value != 0) {
              this.options2.legend.data.push(item.name)
            }
          })
          this.initChart1()
        } else {
          for (let key in this.obj) {
            this.obj[key] = 0
          }
          this.options1.series[0].data = []
          this.options2.series[0].data = []
          this.sData = []
          this.items = []
          this.option.series[0].data = []
          this.initChart1()
          this.$message.error('该预算年度没有年度计划');
        }
      })
    },
    handTime (index) {
      this.pages = []
      this.bool1 = false
      this.bool = false
      this.obj1.year = index;
      this.params.budgetYear = index
      this.options1.series[0].data = []
      this.options2.series[0].data = []
      this.sData = []
      this.items = []
      this.active =0
      let page = document.getElementsByClassName("page");
      page[0].style.left = 0 + 'px'
      this.option.series[0].data = []
      this.params.pageNum = 1
      this.getYearId()
      clearInterval(this.time)
      clearTimeout(this.time1)
      this.show = !this.show
    },
    selectYaear () {
      this.show = !this.show
    },
    changeSelect () {
      this.getYearId()
    },
    initChart1 () {
      this.chart1 = echarts.init(document.getElementById('leftListBox4'))
      this.chart1.setOption(this.option);
    },
    getPage (i) {
      let page = document.getElementsByClassName("page");
      let newActive = JSON.parse(JSON.stringify(this.active))
      // console.log(newActive)
      this.active = i
      if (i + 1 != this.params.pageNum) {
        this.params.pageNum = i + 1
        if(this.params.pageNum - (newActive + 1)  == 2){
          this.num = this.num - 226
          page[0].style.left = this.num + 'px'
        }else if(this.params.pageNum - (newActive + 1)  == 1){
          this.num = this.num - 113
          page[0].style.left = this.num + 'px'
        }
        // console.log(this.params.pageNum,i)
        this.bool = false
        this.getyearList()
      }
    },
    // 查看专项发展规划
    handleD (id) {
      this.$router.push({
        name: "overView",
        query: {
          id: id,
        },
      });
    },
    // 关闭当前页
    closeCurrent () {
      window.open('about:blank', '_self').close()
    },
    appendZero (obj) {
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
@import "/index.scss";
@import "./animate.css";
.back {
  width: 100%;
  height: 100%;
  background: #000a2b;
  position: relative;
}
.year-dw{
  position: relative;
  z-index:99;
}
</style>

<style lang="scss">
.el-popper .popper__arrow::after {
  content: none !important;
}
.el-popper .popper__arrow {
  border: 0 !important;
}
</style>