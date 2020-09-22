<template>
  <div class="workOrderList">
    <outerLayer title="工单列表">
      <div class="content">
        <search :form="searchForm" @search="queryExpertList(1)"></search>
        <ExpertTable
          :config="table.config"
          :data="table.data"
          :page="table.config.page"
          :maxHeight="tableHeight"
          ref="table"
        ></ExpertTable>
      </div>
    </outerLayer>
  </div>
</template>

<script>
import {
  api_getGDdata,
  api_queryWorkTypes,
  api_queryListAndName,
  api_queryMeetingTypes,
} from "@/api/workorder.js";
import config from "@/settings";

const worktype_pathname = {
  workflow_workorder_reply: "replyView", // 批复
  workflow_workorder_meeting: "meetingView", // 会议
  workflow_workorder_unionReview: "reviewView", // 联合评审
  workflow_workorder_tech: "techView", // 技术性检查
  workflow_workorder_yanshouyushen: "acceptanceView", // 验收预审
  workflow_workorder_guanbiaopeixun: "implementationView", // 贯标培训
  workflow_workorder_zhuanbao: "newspaperView", // 专报
  workflow_workorder_fengxian: "riskView", // 风险
  workflow_workorder_qita: "otherView", // 其他类型
  workflow_workorder_newpre: "newpreView", // 预审修订
  workflow_workorder_recombination: "recombinationView", // 复核
};

export default {
  props: {
    echartsData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      timer: null,
      tableHeight: 310 * window.scale,
      searchForm: {
        config: [
          {
            type: "select",
            name: "处理机构",
            placeholder: "全部",
            bind: "buid",
            data: "buList",
          },
          {
            type: "select",
            name: "类型",
            placeholder: "全部",
            bind: "workType",
            data: "workorderTypeList",
            select: "workTypeChange",
          },
        ],
        enum: {
          workorderTypeList: [],
          buList: [],
          meetingTypeList: [],
        },
        form: {
          buid: null,
          workType: null,
        },
      },
      table: {
        data: [],
        config: {
          index: "序号",
          header: [
            { name: "处理机构", prop: "buName" },
            { name: "项目名称", prop: "matterName", width: 300 },
            { name: "类型", prop: "workorderTypeCnName" },
            { name: "发起人", prop: "createName" },
            { name: "发起时间", prop: "createTime" },
            // { name: "处理时长", prop: "statusName" },
          ],
          innerBtn: [
            {
              name: "查看",
              method: "see",
            },
          ],
          page: {
            pageNum: 1,
            pageSize: 10000,
            pages: 1,
          },
        },
      },
    };
  },
  watch: {},
  mounted() {
    this.queryExpertList();
    this.getType();
    this.queryListAndName();
    this.getMeetingTypes();
    this.change();
    this.paly();
    this.$once("hook:beforeDestroy", () => {
      clearInterval(this.timer);
    });
  },
  methods: {
    change() {
      this.table.data.push(this.table.data[0]);
      this.table.data.shift();
    },
    paly() {
      this.timer = setInterval(this.change, 2500);
    },
    workTypeChange(val) {
      if (val == "workflow_workorder_meeting") {
        this.searchForm.config.push({
          type: "select",
          name: "会议类型",
          placeholder: "全部",
          bind: "meetingType",
          data: "meetingTypeList",
        });
      } else if (this.searchForm.config.length > 2) {
        this.searchForm.config.pop();
        this.searchForm.form.meetingType = "";
      }
    },
    async getMeetingTypes() {
      let { data } = await api_queryMeetingTypes();
      if (data && data.length > 0) {
        this.$set(this.searchForm.enum, "meetingTypeList", data);
      }
    },
    async getType() {
      let { data } = await api_queryWorkTypes({ type: 1 });
      if (data && data.length) {
        const types = data.map((item) => {
          item.dataName = item.workTypeName;
          item.dataValue = item.workType;
          return item;
        });
        this.$set(this.searchForm.enum, "workorderTypeList", types);
      }
    },
    async queryListAndName() {
      let { data } = await api_queryListAndName();
      if (data && data.length) {
        const types = data.map((item) => {
          item.dataName = item.buName;
          item.dataValue = item.buid;
          return item;
        });

        this.$set(this.searchForm.enum, "buList", types);
      }
    },
    see(row) {
      if (row.workorderType == "workflow_workorder_prequalification") {
        this.$router.push({
          name: "workorderDetail",
          query: {
            entityId: row.entityId,
            taskId: row.taskId,
          },
        });
      } else {
        if (row.workorderType == "workflow_workorder_meeting") {
          window.open(
            `${config.baseUrl}/#/yunying/meeting/meetingList/${
              worktype_pathname[row.workorderType]
            }?entityId=${row.entityId}&taskId=${row.taskId}&formPmreport=1`
          );
        }
        window.open(
          `${config.baseUrl}/#/yunying/gongdans/gongdanList/${
            worktype_pathname[row.workorderType]
          }?entityId=${row.entityId}&taskId=${row.taskId}&formPmreport=1`
        );
      }
    },
    queryExpertList(pageNum, data) {
      if (pageNum) {
        this.table.config.page.pageNum = pageNum;
      }

      const params = Object.assign(
        this.searchForm.form,
        this.table.config.page
      );
      if (data) {
        this.searchForm.form.buid = data.buid;
        this.searchForm.form.workType = data.workType;
        let params = {
          buid: data.buid,
          workType: data.workType,
          pageNum: this.table.config.page.pageNum,
          pageSize: this.table.config.page.pageSize,
        };
      }
      api_getGDdata(params).then((res) => {
        // console.log(res);
        if (!res || res.msg.code != "0000" || !res.data) return;
        this.table.data = res.data.records;
        // if (pageNum) {
        //   this.table.data = res.data.records;
        // } else {
        //   this.table.data = this.table.data.concat(res.data.records);
        // }
        // this.$set(this.table.config.page, "pages", res.data.pages);
      });
    },
    //获取更多
    getMoreData() {
      this.table.config.page.pageNum++;
      if (this.table.config.page.pageNum <= this.table.config.page.pages) {
        this.queryExpertList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.workOrderList {
  width: 100%;
  // ::v-deep .el-table__body-wrapper {
  //   overflow-y: hidden;
  // }
  // #outerLayer {
  //   height: 100%;
  //   overflow-y: auto;
  //   &::-webkit-scrollbar {
  //     /*滚动条整体样式*/
  //     margin-right: 6px;
  //   }
  //   // 滚动条的宽度
  //   &::-webkit-scrollbar {
  //     width: 5px;
  //     height: 5px;
  //   }
  //   // 滚动条的滑块
  //   &::-webkit-scrollbar-thumb {
  //     width: 4px;
  //     height: 200px;
  //     background: linear-gradient(
  //       180deg,
  //       rgba(10, 239, 251, 0) 0%,
  //       rgba(4, 219, 246, 1) 54%,
  //       rgba(4, 219, 246, 0) 100%
  //     );
  //   }
  // }
}
</style>