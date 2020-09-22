<template>
  <div class="expertDetail">
    <span class="Title">专家信息</span>
    <div class="expertInfo">
      <div class="expertPhoto">
        <div class="photoCen">
          <img
            v-if="Expert.base.photoUrl"
            class="tx"
            :src="config.imgBaseUrl + Expert.base.photoUrl"
          />
          <img v-else class="tx" src="@/assets/img/bg/expert_tou.png" />
        </div>
      </div>
      <div class="expertTxt">
        <p class="NameandMob">
          <span class="name">{{Expert.base.name?Expert.base.name:'--'}}</span>
          <span class="mobel">{{Expert.base.mobile?Expert.base.mobile:'--'}}</span>
        </p>
        <p class="expertTit">
          <span v-for="(item ,index) in Expert.expertLabelName" :key="index" class="Tit">{{item}}</span>
        </p>
        <p class="personInfo">
          <span>性别：{{Expert.base.sex?Expert.base.sex=='1'?'男':'女':'--'}}</span>
          <span>政治面貌：{{Expert.base.organizeName?Expert.base.organizeName:'--'}}</span>
          <span>出生日期：{{Expert.base.birthDate?Expert.base.birthDate:'--'}}</span>
          <span>工作年限：{{Expert.base.workinglife?Expert.base.workinglife:'--'}}</span>
          <span>常住地：{{Expert.base.city?Expert.base.city:'--'}}</span>
        </p>
      </div>
    </div>
    <div class="infoList">
      <transition name="el-zoom-in-center">
        <div class="list transition-box" v-show="show2">
          <p class="title">
            <span class="Icon"></span>
            <span class="Text">最高职称认证</span>
          </p>
          <section class="content">
            <img class="bottom" src="@/assets/img/bg/left_bottom.png" alt />
            <img class="top" src="@/assets/img/bg/top_right.png" alt />
            <p class="info">
              <img src="@/assets/img/bg/arrows.png" alt />
              <!-- "positionalTitle": 1, //职称 (1 初级职称 2 中级职称 3 副高职称 4 正高职称) -->
              <span>
                职称：
                {{Expert.base.positionalTitle?Expert.base.positionalTitle==1?'初级职称':Expert.base.positionalTitle==2?'中级职称':Expert.base.positionalTitle==3?'副高级职称':'正高职称':'--'}}
              </span>
            </p>
            <p class="info">
              <img src="@/assets/img/bg/arrows.png" alt />
              <span>评定时间：{{Expert.base.positionalTitleTime?Expert.base.positionalTitleTime:'--'}}</span>
            </p>
          </section>
        </div>
      </transition>
      <transition name="el-zoom-in-center">
        <div class="list transition-box" v-show="show2">
          <p class="title">
            <span class="Icon"></span>
            <span class="Text">职业资格认证</span>
          </p>
          <section class="content">
            <img class="bottom" src="@/assets/img/bg/left_bottom.png" alt />
            <img class="top" src="@/assets/img/bg/top_right.png" alt />
            <p class="info">
              <img src="@/assets/img/bg/arrows.png" alt />
              <span>
                专业资格：
                {{Expert.qualifications.name?Expert.qualifications.name:'--'}}
              </span>
            </p>
            <p class="info">
              <img src="@/assets/img/bg/arrows.png" alt />
              <span>获得时间：{{Expert.qualifications.time?Expert.qualifications.time:'--'}}</span>
            </p>
            <p class="info">
              <img src="@/assets/img/bg/arrows.png" alt />
              <span>注册号：{{Expert.qualifications.regNum?Expert.qualifications.regNum:'--'}}</span>
            </p>
          </section>
        </div>
      </transition>
      <transition name="el-zoom-in-center">
        <div class="list transition-box" v-show="show2">
          <p class="title">
            <span class="Icon"></span>
            <span class="Text">专业技术资格证书</span>
          </p>
          <section class="content">
            <img class="bottom" src="@/assets/img/bg/left_bottom.png" alt />
            <img class="top" src="@/assets/img/bg/top_right.png" alt />
            <p class="info">
              <img src="@/assets/img/bg/arrows.png" alt />
              <span>
                职业资格：
                {{Expert.professionalCertificate.name?Expert.professionalCertificate.name:'--'}}
              </span>
            </p>
            <p class="info">
              <img src="@/assets/img/bg/arrows.png" alt />
              <span>评定时间：{{Expert.professionalCertificate.time?Expert.professionalCertificate.time:'--'}}</span>
            </p>
          </section>
        </div>
      </transition>
      <transition name="el-zoom-in-center">
        <div class="list transition-box" v-show="show2">
          <p class="title">
            <span class="Icon"></span>
            <span class="Text">专业相关工作经历</span>
          </p>
          <section class="content">
            <img class="bottom" src="@/assets/img/bg/left_bottom.png" alt />
            <img class="top" src="@/assets/img/bg/top_right.png" alt />
            <p class="info">
              <img src="@/assets/img/bg/arrows.png" alt />
              <span>
                工作单位：
                {{Expert.works.companyName?Expert.works.companyName:'--'}}
              </span>
            </p>
            <p class="info">
              <img src="@/assets/img/bg/arrows.png" alt />
              <span>
                职务：
                {{Expert.works.positionName?Expert.works.positionName:'--'}}
              </span>
            </p>
            <p class="info">
              <img src="@/assets/img/bg/arrows.png" alt />
              <span>起止时间：{{Expert.works.startTime?Expert.works.startTime +'-'+ Expert.works.endTime:'--'}}</span>
            </p>
            <p class="info">
              <img src="@/assets/img/bg/arrows.png" alt />
              <span>单位性质：{{Expert.works.unitNatureName?Expert.works.unitNatureName:'--'}}</span>
            </p>
          </section>
        </div>
      </transition>
    </div>
    <transition name="el-zoom-in-top">
      <div class="personHave transition-box" v-show="show2">
        <p class="title">
          <span class="Icon"></span>
          <span class="Text">个人成果</span>
        </p>
        <div class="content">
          <img class="bottom" src="@/assets/img/bg/left_bottom.png" alt />
          <img class="top" src="@/assets/img/bg/top_right.png" alt />
          <section>
            <p class="headTitle">
              <img src="@/assets/img/bg/arrows.png" alt />
              <span>工作内容及成果</span>
            </p>
            <p
              class="headContent"
            >{{Expert.base.personalAchievement?Expert.base.personalAchievement:'暂无'}}</p>
          </section>
          <section>
            <p class="headTitle">
              <img src="@/assets/img/bg/arrows.png" alt />
              <span>参与评审的项目</span>
            </p>
            <p class="headContent">{{Expert.base.reviewContent?Expert.base.reviewContent:'暂无'}}</p>
          </section>
        </div>
      </div>
    </transition>
    <transition name="el-zoom-in-top">
      <div class="Form transition-box" v-show="show2">
        <p class="title">
          <span class="Icon"></span>
          <span class="Text">评审记录</span>
        </p>
        <Table
          :config="table.config"
          :data="table.data"
          :page="table.config.page"
          :maxHeight="tableHeight"
          ref="table"
        ></Table>
      </div>
    </transition>
  </div>
</template>

<script>
import Table from "@/components/expert/ExpertTable.vue";
import { getExpertInfo, getExpertReviewRecordList } from "@/api/expert.js";
import config from "@/settings.js";
export default {
  components: {
    Table,
  },
  data() {
    return {
      tableHeight: 240 * window.scale,
      config,
      show2: false,
      timer: null,
      table: {
        data: [],
        config: {
          header: [
            // 表格列配置
            { name: "评审活动名称", prop: "content" },
            { name: "会议时间", prop: "startTime" },
            { name: "发起人", prop: "creatorName" },
            { name: "事项", prop: "matter" },
            { name: "地点", prop: "address" },
          ],
          page: {
            pageNum: 1,
            pages: 1,
          },
        },
      },
      Expert: {
        base: {},
        expertLabelName: [],
        expertQualificationSpeciality: {},
        positionsName: [],
        professionalCertificate: {},
        qualifications: {},
        works: {},
      },
    };
  },
  computed: {
    jfid() {
      return this.$route.query.jfid;
    },
  },
  mounted() {
    this.show2 = true;
    this.getExpertDetail();
    this.getExpertRecordList();
    this.change();
    this.paly();
  },
  methods: {
    change() {
      this.table.data.push(this.table.data[0]);
      this.table.data.shift();
    },
    paly() {
      this.timer = setInterval(this.change, 2500);
    },
    //获取专家详情
    getExpertDetail() {
      let params = {
        expertJfId: this.jfid,
      };
      getExpertInfo(params).then((res) => {
        // console.log(res);
        if (res.msg.message == "SUCCESS") {
          this.$set(this, "Expert", res.data);
        }
      });
    },
    //获取专家评审记录列表
    getExpertRecordList() {
      let params = {
        expertJfId: this.jfid,
        pageNum: this.table.config.page.pageNum,
        pageSize: 10,
      };
      getExpertReviewRecordList(params).then((res) => {
        if (res.msg.message == "SUCCESS") {
          this.table.data = res.data.list.records;
          this.$set(this.table.config.page, "pages", res.data.list.pages);
        }
      });
    },
    // //获取更多
    // getMoreData() {
    //   this.table.config.page.pageNum++;
    //   if (this.table.config.page.pageNum <= this.table.config.page.pages) {
    //     this.getExpertRecordList();
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.expertDetail {
  width: 100%;
  height: calc(100% - 130px);
  border-radius: 8px;
  margin-top: 28px;
  background: url("../../../assets/img/bg/expertlistBorder.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  padding-bottom: 20px;
  .Title {
    display: inline-block;
    width: 74px;
    height: 26px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 26px;
    margin-left: 35px;
    margin-top: 2px;
  }
  .expertInfo {
    margin: 30px 27px 32px 30px;
    display: flex;
    align-items: center;
    .expertPhoto {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90px;
      height: 90px;
      background: url("../../../assets/img/bg/expertout.png") no-repeat;
      background-size: 100% 100%;
      .photoCen {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 75px;
        height: 75px;
        background: url("../../../assets/img/bg/expertcenter.png") no-repeat;
        background-size: 100% 100%;
        img {
          width: 70px;
          height: 70px;
        }
      }
    }
    .expertTxt {
      margin-left: 27px;
      .NameandMob {
        margin: 0;
        .name {
          width: 86px;
          font-size: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          display: inline-block;
        }
        .mobel {
          width: 97px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          margin-left: 21px;
          display: inline-block;
        }
      }
      .expertTit {
        margin-top: 6px;
        margin-bottom: 12px;
        .Tit {
          text-align: center;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(4, 219, 246, 1);
          line-height: 24px;
          display: inline-block;
          padding: 4px 22px;
          height: 24px;
          background: url("../../../assets/img/bg/title_bg.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 10px;
        }
      }
      .personInfo {
        margin: 0;
        span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 27px;
          margin-right: 67px;
        }
      }
    }
  }
  .infoList {
    height: 222px;
    display: block;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0px 30px 30px 30px;
    .list:nth-last-child(1) {
      margin-right: 0px;
    }
    .list {
      margin-right: 31px;
      vertical-align: top;
      width: 480px;
      .title {
        width: 250px;
        margin-left: 0;
        margin-bottom: 10px;
        margin-top: 0;
        .Icon {
          width: 27px;
          height: 13px;
          background: linear-gradient(
            90deg,
            rgba(62, 134, 255, 1) 0%,
            rgba(60, 129, 246, 0) 100%
          );
          border-radius: 7px;
          display: inline-block;
          margin-right: 10px;
        }
        .Text {
          width: 200px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
        }
      }
      .content:hover {
        cursor: pointer;
        box-shadow: 0px 0px 61px 28px rgba(55, 121, 234, 0.3) inset;
      }
      .content {
        background: transparent;
        box-shadow: 0px 0px 61px 8px rgba(55, 121, 234, 0.3) inset;
        border-radius: 8px;
        border: 1px solid rgba(61, 132, 252, 0.5);
        position: relative;
        padding: 20px 20px;
        height: 152px;
        .bottom {
          width: 129px;
          height: 121px;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        .top {
          width: 129px;
          height: 121px;
          position: absolute;
          top: 0;
          right: 0;
        }

        .info {
          margin-top: 0;
          margin-bottom: 10px;
          img {
            width: 25px;
            height: 13px;
            margin-right: 10px;
            position: relative;
            top: 2px;
          }
          span {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            display: inline-block;
            vertical-align: top;
          }
        }
      }
    }
  }
  .personHave {
    margin: 0px 30px 30px 30px;
    .title {
      width: 250px;
      margin-left: 0;
      margin-bottom: 10px;
      margin-top: 0;
      .Icon {
        width: 27px;
        height: 13px;
        background: linear-gradient(
          90deg,
          rgba(62, 134, 255, 1) 0%,
          rgba(60, 129, 246, 0) 100%
        );
        border-radius: 7px;
        display: inline-block;
        margin-right: 10px;
      }
      .Text {
        width: 200px;
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
    }
    .content:hover {
      cursor: pointer;
      box-shadow: 0px 0px 61px 28px rgba(55, 121, 234, 0.3) inset;
    }
    .content {
      height: 138px;
      background: transparent;
      box-shadow: 0px 0px 21px 8px rgba(55, 121, 234, 0.3) inset;
      border-radius: 8px;
      border: 1px solid rgba(61, 132, 252, 0.5);
      position: relative;
      padding: 20px 27px;
      .bottom {
        width: 129px;
        height: 121px;
        position: absolute;
        left: 0;
        bottom: 0;
      }
      .top {
        width: 129px;
        height: 121px;
        position: absolute;
        top: 0;
        right: 0;
      }
      section:nth-of-type(1) {
        margin-right: 3%;
      }
      section {
        width: 48%;
        display: inline-block;
        vertical-align: top;
        .headTitle {
          margin: 0;
          img {
            width: 25px;
            height: 13px;
            margin-right: 10px;
          }
          span {
            width: 131px;
            height: 27px;
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            line-height: 27px;
          }
        }
        .headContent {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 29px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .Form {
    .title {
      width: 250px;
      margin: 0px auto 0 30px;

      .Icon {
        width: 27px;
        height: 13px;
        background: linear-gradient(
          90deg,
          rgba(62, 134, 255, 1) 0%,
          rgba(60, 129, 246, 0) 100%
        );
        border-radius: 7px;
        display: inline-block;
        margin-right: 10px;
      }
      .Text {
        width: 200px;
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>