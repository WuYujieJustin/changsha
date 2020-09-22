<template>
  <div class="workorderDetail">
    <div class="info">
      <span class="info_title">工单信息</span>
      <header>
        <img src="~img/workorder/workorder_title.png" />
        <div class="title">
          <h3>{{detail.project? detail.project.title:"--"}}</h3>
          <div class="createInfo">
            <span style="margin-right:6px;">创建人：</span>
            <span>{{detail.project? detail.project.creatorName:"--"}}</span>
            <span style="margin:0 6px 0 30px;">创建时间：</span>
            <span>{{detail.project? detail.project.createTimeStr:"--"}}</span>
          </div>
        </div>
      </header>
      <message title="基础信息">
        <div class="baseInfo">
          <div class="top">
            <div class="fwnr">
              <div class="item_center">
                <img src="~img/workorder/jiantou.png" />
                <span style="margin-left:10px;">服务内容：</span>
              </div>
              <p v-if="detail.field_1">{{detail.field_1 | field_1_filter(contentlist)}}</p>
              <p v-else>暂无</p>
            </div>
            <div class="gzyq">
              <div class="item_center">
                <img src="~img/workorder/jiantou.png" />
                <span style="margin-left:10px;">工作要求：</span>
              </div>
              <p>{{detail.field_2?detail.field_2:'暂无'}}</p>
            </div>
          </div>
          <div class="bottom item_center">
            <img src="~img/workorder/jiantou.png" />
            <span style="margin-right:10px;">开始时间：</span>
            <span>{{detail.field_3?detail.field_3:'--'}}</span>
            <span style="margin:0 10px 0 30px;">结束时间：</span>
            <span>{{detail.field_4?detail.field_4:'--'}}</span>
            <span style="margin:0 10px 0 30px;">手机号：</span>
            <span>{{detail.field_5?detail.field_5:'--'}}</span>
          </div>
        </div>
      </message>
      <message title="附件信息" class="mt30">
        <div class="flieContent" v-if="detail.field_0">
          <fileView
            class="files"
            v-for="(item,index) in detail.field_0"
            :fileInfo="item"
            :key="'p' + index"
          ></fileView>
        </div>
        <div class="flieContent" v-else>
          <span>暂无</span>
        </div>
      </message>
      <message title="工单处理详情" class="mt30">
        <div style="overflow:hidden;" v-if="detail.process && detail.process.meetingUpload">
          <fileView
            v-for="(item, index) in detail.process.meetingUpload"
            :key="'p'+index"
            class="files"
            :fileInfo="item"
          ></fileView>
        </div>
        <div class="remark">
          <div class="inlineblock">
            <img src="~img/workorder/jiantou.png" />
            <span style="margin:0 10px;">备注:</span>
          </div>
          <span class="worlds">{{detail.meetingOpinion}}</span>
        </div>
      </message>

      <message title="评价" class="mt30 pj">
        <div class="rate">
          <div class="rateinner">
            <img src="~img/workorder/jiantou.png" />
            <label>综合评价：</label>
            <el-rate v-model="detail.evaluation" :disabled="isDetails"></el-rate>
          </div>
          <div class="rateinner">
            <img src="~img/workorder/jiantou.png" />
            <label>响应度：</label>
            <el-rate v-model="detail.response" :disabled="isDetails"></el-rate>
          </div>
          <div class="rateinner">
            <img src="~img/workorder/jiantou.png" />
            <label>处理质量：</label>
            <el-rate v-model="detail.quality" :disabled="isDetails"></el-rate>
          </div>
        </div>
      </message>
    </div>
    <div class="trends">
      <span class="info_title">工单动态</span>
      <div class="trendlist" v-if="trends">
        <ul>
          <li v-for="(item, index) in trends" :key="'p' + index">
            <header>
              <img src="~img/workorder/trend_active.png" />
              <h3>{{item.nodeName}}</h3>
              <div v-if="item.roleName" class="box">{{item.roleName}}</div>
            </header>
            <main>
              <div class="handle item_center">
                <span style="margin-right:6px;">操作人:</span>
                <span>{{item.assignee}}</span>
                <span style="margin:0 6px 0 30px;">操作时间:</span>
                <span>{{item.createTime}}</span>
              </div>
            </main>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { api_hiDynamic, requestData } from "@/api/workorder.js";
export default {
  props: {
    isDetails: Boolean,
  },
  filters: {
    field_1_filter(value, contentlist) {
      const found = contentlist.find((item) => item.dataValue == value);
      if (found) {
        return found.dataName;
      }
      return "";
    },
  },
  computed: {
    entityId() {
      return this.$route.query.entityId;
    },
  },
  data() {
    return {
      detail: {
        process: {
          meetingUpload: [],
        },
      },
      trends: [],
      contentlist: [],
    };
  },
  methods: {
    async getContent() {
      let { data } = await requestData("queryContentAndAsk", {
        workType: "workflow_workorder_prequalification",
      });
      this.contentlist = data || [];
    },
    async getTrends() {
      let { data } = await api_hiDynamic({
        processInstanceId: this.entityId + "",
      });
      if (data && data.length) {
        this.trends = data;
      }
    },
    async getDetail() {
      let { data } = await requestData(
        "queryFormInfoByExampleAndTaskId",
        this.$route.query
      );
      if (!data) return;
      const obj = JSON.parse(data);
      // if (obj.field_1) {
      // }
      this.detail = obj;
    },
  },
  mounted() {
    this.getTrends();
    this.getDetail();
    this.getContent();
  },
};
</script>

<style lang="scss" scoped>
.workorderDetail {
  display: flex;
  height: calc(100% - 130px);
  font-size: 19px;
  ::v-deep .info {
    div:nth-of-type(1) {
      .inner {
        height: 178px;
        position: relative;
        .bottom {
          position: absolute;
          bottom: 20px;
        }
      }
    }
    div:nth-of-type(2) {
      .inner {
        height: 99px;
      }
    }
    div:nth-of-type(3) {
      .inner {
        height: 138px;
        position: relative;
      }
    }
  }
  ul {
    margin: 0;
    li {
      list-style: none;
    }
  }
  .info_title {
    position: absolute;
    top: 0;
    left: 0;
    @include bis("~img/bg/card_title@2x.png");
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 18px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
  ::v-deep .el-timeline-item__icon {
    font-size: 27px;
  }

  .pj {
    .inner {
      display: flex;
      align-items: center;
    }
  }
  .flieContent {
    overflow: hidden;
  }
  .flieContent > span {
    font-size: 14px;
  }

  .rate {
    display: flex;

    .rateinner {
      display: flex;
      align-items: center;
      flex: 1;
    }

    label {
      margin: 0 20px 0 10px;

      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .remark {
    .inlineblock {
      display: flex;
      align-items: center;
      float: left;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .worlds {
      float: left;
      width: 86%;
    }
  }
  .files {
    min-width: 33%;
    margin-bottom: 30px;
    float: left;
  }
  .item_center {
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
    }
  }
  .mt30 {
    margin-top: 30px;
  }
  .info {
    flex: 124;
    margin-right: 30px;
    padding: 40px 30px 30px;
    @include bis("~img/workorder/bg_left.png");
    position: relative;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
      /* Chrome Safari */
    }
    scrollbar-width: none;
    /* 火狐 */
    -ms-overflow-style: none;
    .baseInfo {
      .top {
        display: flex;
        .fwnr {
          flex: 1;
          margin-right: 40px;
          p {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }
        }

        .gzyq {
          flex: 1;
          p {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
      .bottom {
        img {
          margin-right: 10px;
        }
        span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
    header {
      display: flex;
      margin: 20px 0;
      margin-bottom: 49px;
      img {
        margin-right: 36px;
        width: 60px;
        height: 67px;
      }
      .title {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        h3 {
          font-size: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          margin: 0;
          margin-left: 10px;
        }
        .createInfo {
          span {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
    }
  }
  .trends {
    position: relative;
    flex: 59;
    padding: 60px 0px 0px 30px;
    @include bis("~img/workorder/bg_right.png");
    .trendlist {
      overflow-y: auto;
      height: 95%;
      ul {
        padding-left: 0;
        li {
          height: 95px;
        }
      }
    }
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      width: 5px;
      height: 267px;
      background: linear-gradient(
        180deg,
        rgba(10, 239, 251, 0) 0%,
        rgba(4, 219, 246, 1) 52%,
        rgba(4, 219, 246, 0) 100%
      );
    }

    header {
      display: flex;
      align-items: center;
      .box {
        padding: 0 20px;
        background: rgba(62, 134, 255, 0.2);
        border-radius: 15px;
        border: 1px solid rgba(62, 134, 255, 1);
        font-size: 16px;
        font-weight: 400;
        color: rgba(123, 172, 255, 1);
        line-height: 22px;
        text-align: center;

        height: 22px;
      }
      h3 {
        margin: 0 10px 0 20px;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
      }
    }
    main {
      height: 120px;
      border-left: 1px dashed rgba(4, 219, 246, 0.5);
      margin-left: 13px;
      .handle {
        margin-top: 14px;
        margin-bottom: 40px;
        padding-left: 30px;
        font-size: 18px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        span:nth-of-type(2) {
          display: inline-block;
          width: 80px;
        }
        span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
}
</style>

