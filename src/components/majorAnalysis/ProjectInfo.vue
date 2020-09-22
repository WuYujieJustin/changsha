<template>
    <div class="project-info" >
      <loading v-if="loading" />
      <div class="project-wrapper" v-else>
        <div class="overview">
            <div class="project-title-name" @click.stop="toDetail">
              <div class="title">{{detail.mediumlongProjectName}}</div>
                <el-tooltip class="item" effect="dark" content="查看项目详情" placement="top">
                  <div class="icon"></div>
                </el-tooltip>
            </div>
            <div class="project-desc">{{ detail.introduction }}</div>
            <div class="project-table">
                <div v-for="(data, index) in tableData" :key="index" class="table-row">
                    <div class="table-name">{{data.label}}<span v-if="data.label==='中标金额' || data.label==='项目金额'">(万元)</span></div>
                    <div class="content">{{detail[data.key] || '暂未公布'}}</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="title">项目进展</div>
            <div class="tags">
                <div v-for="tag in tags" :key="tag" :class="['tag', activeTags.includes(tag) ? 'active' : '']">{{tag}}</div>
            </div>
        </div>
        <div class="item">
            <div class="title">项目风险</div>
            <div class="items">
                <div v-for="num in projectRisk" :key="num.class + num" class="row">
                    <div class="indicator" :class="num.class">{{detail[num.key]}}</div>
                    <div class="label">{{num.label}}</div>
                </div>
            </div>
        </div>
          <div class="item">
            <div class="title">项目问题</div>
            <div class="items">
                <div v-for="num in projectProblem" :key="num.class" class="row">
                    <!-- <div class="animation-circle" :class="num.class"></div> -->
                    <div class="indicator" :class="num.class">{{detail[num.key]}}</div>
                    <div class="label">{{num.label}}</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="title">项目质量</div>
            <div class="items">
                <div v-for="num in projectQuality" :key="num.class" class="row">
                    <!-- <div class="animation-circle" :class="num.class"></div> -->
                    <div class="indicator" :class="num.class">{{detail[num.key]}}</div>
                    <div class="label">{{num.label}}</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="title">交付物</div>
            <div class="subtitle">总交付物数量<span class="num">{{detail.deliveryTotal}}</span>（件）</div>
            <div class="process">
              <div class="submmited" :style="{width: detail.deliveryTotal === '--' ||  detail.deliveryTotal === 0 ? 0 : total}"></div>
            </div>
            <div class="subtitle">已提交交付物数量<span class="num">{{ detail.deliveryNum}}</span>（件）</div>
            <div class="process">
              <div class="submmited" :style="{width: detail.deliveryNum === '--' ? 0 : percentTotal }"></div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import { api_getMajorProjectDetail } from '@/api/majorProject'

const project = {
  mediumlongProjectName: '暂未公布',
  introduction: '暂未公布',
  applyUnitName: '暂未公布',
  beginDate: '--',
  winAmount: '--',
  projectAmount: '--',
  qualityLowNum: '--',
  qualityMiddleNum: '--',
  qualityHighNum: '--',
  problemLowNum: '--',
  problemHighNum: '--',
  problemMiddleNum: '--',
  qualityLowNum: '--',
  problemMiddleNum: '--',
  problemHighNum: '--',
  riskLowNum: '--',
  riskMiddleNum:'--',
  riskHighNum: '--',
  deliveryTotal: '--',
  deliveryNum: '--'
}
export default {
  name: 'ProjectInfo',
  props: {
    mediumlongProjectId: Number
  },
  data () {
    return {
      detail: {},
      isEmpty: false,
      total: 0,
      loading: false,
      projectDetail: null,
      items: [
        { name: '年度计划项目数', num: 100 },
        { name: '计划申报数', num: 100 },
        { name: '总计划金额（万元）', num: 100 },
        { name: '建设中项目', num: 100 },
        { name: '已验收项目数', num: 100 }
      ],
      tags: ['启动', '需求', '开发', '测试', '验收'],
      activeTags: ['启动', '需求', '开发'],
      projectRisk: [
          {class: 'indicator-bg-blue', value: 5, label: '轻', key: 'riskLowNum'},
          {class: 'indicator-bg-yellow', value: 5, label: '中', key: 'riskMiddleNum'},
          {class: 'indicator-bg-red', value: 5, label: '高', key: 'riskHighNum'}
      ],
      projectProblem: [
          {class: 'indicator-bg-blue', value: 5, label: '低', key: 'problemLowNum'},
          {class: 'indicator-bg-yellow', value: 5, label: '中', key: 'problemMiddleNum'},
          {class: 'indicator-bg-red', value: 5, label: '高', key: 'problemHighNum'}
      ],
      projectQuality: [
          {class: 'indicator-bg-green', value: 5, label: '良好', key: 'qualityLowNum'},
          {class: 'indicator-bg-yellow', value: 5, label: '一般', key: 'qualityMiddleNum'},
          {class: 'indicator-bg-red', value: 5, label: '较差', key: 'qualityHighNum'}
      ],
      percentTotal: 0,
      tableData: [
          { label: '建设单位', value: 'XXXX', key: 'applyUnitName' },
          { label: '起止年限', value: '2019.1-2020.7', key: 'beginDate' },
          { label:  '中标金额', value: '2.15亿', key: 'winAmount' },
          { label: '项目金额', value: '1.5亿', key: 'projectAmount' },
        ]
    }
  },
  watch: {
    mediumlongProjectId () {
      this.getDetail(this.mediumlongProjectId)
    }
  },
  created () {
    if (this.mediumlongProjectId) {
        this.getDetail(this.mediumlongProjectId)
    } else {
      this.detail = project
      this.isEmpty = true
    }
  },
  methods: {
    toDetail () {
      const id = this.detail.projectId
      const isDev = process.env.NODE_ENV === 'development'
      const origin = isDev ? 'https://csyjtest.jiefanghao.com' : window.location.origin
      const subPath = '/#/diaodu/tongchou/tclist/tcdetail?formPmreport=1&'
      const query = `id=${id}`
      const url = origin + subPath + query
      window.open(url)
    },
    reset () {
      this.detail = project
    },
    async getDetail(mediumlongProjectId) {
        this.loading = true
        const params = {
            mediumlongProjectId
        }
        this.total = 0
        this.percentTotal = 0
        const detail = await api_getMajorProjectDetail(params)
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.detail = detail.data
        if (this.detail) {
          const regex = /-/gi
          if (this.detail.beginDate) {
            this.detail.beginDate = this.detail.beginDate.replace(regex, '.') + '-' + this.detail.endDate.replace(regex, '.')
          }
          if (this.detail.list) {
            this.tags = []
            this.activeTags = []
            this.detail.list.forEach(item => {
              this.tags.push(item.stageName)
              if (item.completionProgress !== '0') {
                this.activeTags.push(item.stageName)
              }
            })
          }
          setTimeout(() => {
            this.total = '100%'
            this.percentTotal = (Number(this.detail.deliveryNum) / Number(this.detail.deliveryTotal)) * 100 + '%'
          }, 1000)
        }
    }
  }
}
</script>

<style scoped lang="scss">
@-webkit-keyframes ripple{
  0% {-webkit-transform:scale(1); }
  50% {-webkit-transform:scale(1.3); opacity:1;}
  100% {-webkit-transform:scale(1.6); opacity:0;}
}

@keyframes ripple{
  0% {transform:scale(1); }
  50% {transform:scale(1.3); opacity:1;}
  100% {transform:scale(1.6); opacity:0;}
}
.project-info-container{
  height: 909px;
  display: flex;
  align-items: center;
}
.project-info{
  font-family:PingFangSC-Medium,PingFang SC;
  width: 322px;
  height: 820px;
  // height: 969px;
  padding: 30px;
  text-align: center; 
  @include bis('~img/bg/major_analysis.png');
  position: relative;
  .project-wrapper{
    height: 100%;
  }
  .overview{
      .project-title-name{
        display: flex;
        align-items: center;
        .title{
          font-size: 18px;
          max-width: 280px;
          white-space: nowrap;
          text-overflow: ellipsis;
          flex: 1;
          font-weight:600;
          color: #00e2df;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
          cursor: pointer;
          text-align: left;
        }
        .icon{
          @include bis('~img/bg/to_project_detail.png');
          width: 28px;
          height: 18px;
          cursor: pointer;
          outline: none;
          margin: 0;
        }
        .icon:hover{
          @include bis('~img/bg/to_project_active.png');
        }
      }
      .project-desc{
          font-size:14px;
          font-weight:500;
          color:rgba(255,255,255,1);
          margin-top: 20px;
          text-align: left;
          overflow: hidden;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
      }
      .project-table{
          margin-top: 15px;
          font-size: 14px;
          .table-row{
              display: flex;
              .table-name{
                  border:1px solid rgba(173,192,231,1);
                  width: 120px;
                  box-sizing: border-box;
                  padding: 5px 0;
                  margin: 0 0 -1px -1px;
                  white-space: nowrap;
              }
              .content{
                  width: 203px;
                  box-sizing: border-box;
                  border:1px solid rgba(173,192,231,1);
                  margin: 0 0 -1px -1px;
                  text-align: center;
                  white-space: nowrap;
                  line-height: 30px;
              }
          }
      }
  }
  .item{
      margin-top: 15px;
      .title{
          color: #00D7E9;
          text-align: left;
      }
      .items{
          margin-top: 10px;
          display: flex;
          justify-content: space-around;
          align-content: center;
          .row{
            position: relative;
          }
          .indicator{
              width:40px;
              height:40px;
              line-height: 40px;
          }
          .indicator:before,
          .indicator:after {
            content:'';
            display:block;
            position:absolute;
            width:40px;
            height:40px;
            top:-1px; right:0; bottom:0; left:-1px;
            border-radius:50%;
            border:1px solid rgba(239, 133, 41, .7);
          }
          .indicator:before {
            animation: ripple 6s linear infinite;
            }
          .indicator:after {
            animation: ripple 6s linear 2s infinite;
            }
          .indicator-bg-blue::before,
          .indicator-bg-blue::after{
              @extend .indicator:before;
              border:1px solid rgba(1, 122, 255, 0.7);
           }
          .indicator-bg-green::before,
          .indicator-bg-green::after{
              @extend .indicator:before;
              border:1px solid rgba(110, 209, 20, 0.7);
           }
        .indicator-bg-red::before,
          .indicator-bg-red::after{
              @extend .indicator:before;
              border:1px solid rgba(232, 57, 93, 0.7);
           }
        //   .animation-circle{
        //       top: -5px;
        //       left: -5px;
        //       width:60px;
        //       height:60px;
        //       position: absolute;
        //       animation: scaleIn 2s infinite cubic-bezier(.36, .11, .89, .32);
        //       animation-fill-mode: forwards;
        //   }
          .label{
              margin-top: 10px;
          }
          .indicator-bg-yellow{
            @include bis('~img/bg/yellow.png');
          }
          .indicator-bg-green{
            @include bis('~img/bg/green.png');
          }
          .indicator-bg-red{
            @include bis('~img/bg/red.png');
          }
          .indicator-bg-blue{
            @include bis('~img/bg/blue.png');
          }
      }
      .tags{
          margin-top: 10px;
          display: flex;
        //   justify-content: space-around;
          flex-wrap: wrap;
          .tag{
              width:auto;
              height:24px;
              border-radius:2px;
              padding: 0 5px;
              border:1px solid rgba(35,122,235,0.7);
              margin: 10px 0 0 5px;
          }
          .active{
              background:rgba(9,61,129,0.72);
              color: #FFFFFF;
              box-shadow:0px 0px 15px 0px rgba(48,123,255,0.58),0px 0px 7px 0px rgba(27,163,255,0.89);
          }
      }
      .subtitle{
          text-align: left;
          margin-top: 10px;
          .num{
              color: #00D7E9;
              color: #FFFFFF;
              font-size: 16px;
              margin: 0 10px;
          }
      }
      .process{
          margin-top: 5px;
          width:300px;
          height:12px;
          background:#364262;
          border-radius:6px;
          position: relative;
          vertical-align: middle;
          .submmited{
              position: absolute;
              border-radius:6px;
              background:#237AEB;
              top: 0;
              height: 100%;
              left: 0;
              transition: width 4s ease;
          }
      }
  }

}
</style>
