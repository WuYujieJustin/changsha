<template>
  <div class="expertList">
    <div class="title">专家列表</div>
    <search :form="searchForm" @search="queryExpertList(1)"></search>
    <Table
      :config="table.config"
      :data="table.data"
      :page="table.config.page"
      :formatter="formatter"
      :maxHeight="tableHeight"
      ref="table"
    ></Table>
  </div>
</template>

<script>
import Table from "@/components/expert/ExpertTable.vue";
import {
  getIndustryFieldList,
  getTechnicalList,
  queryListExpertBase,
} from "@/api/expert.js";
export default {
  components: {
    Table,
  },
  data() {
    return {
      pageType: null,
      tableHeight: 780 * window.scale,
      timer: null,
      searchForm: {
        config: [
          {
            type: "select",
            name: "政治面貌",
            placeholder: "全部",
            bind: "organize",
            data: "OrganizeList",
          },
          {
            type: "select",
            name: "技术方向",
            placeholder: "全部",
            bind: "specialty",
            data: "TechnicalList",
          },
          {
            type: "select",
            name: "行业领域",
            placeholder: "全部",
            bind: "code",
            data: "IndustryFieldList",
          },
          {
            type: "select",
            name: "专家状态",
            placeholder: "全部",
            bind: "expertStatus",
            data: "ExpertStatusList",
          },
        ],
        enum: {
          ExpertStatusList: [
            {
              dataName: "激活",
              dataValue: 0,
            },
            {
              dataName: "停用",
              dataValue: 1,
            },
            {
              dataName: "待审核",
              dataValue: 2,
            },
          ],
          OrganizeList: [
            {
              dataName: "群众",
              dataValue: 0,
            },
            {
              dataName: "共青团员",
              dataValue: 1,
            },
            {
              dataName: "中共党员",
              dataValue: 2,
            },
            {
              dataName: "民主党派",
              dataValue: 3,
            },
            {
              dataName: "无党派人士",
              dataValue: 4,
            },
            {
              dataName: "其他",
              dataValue: 5,
            },
          ],
          TechnicalList: [],
          IndustryFieldList: [],
        },
        form: {
          specialty: null,
          code: null,
          expertStatus: null,
          organize: null,
          expertAbnormal: null,
        },
      },
      table: {
        data: [],
        config: {
          header: [
            // 表格列配置
            { name: "专家姓名", prop: "name", width: 130 },
            { name: "手机号码", prop: "mobile", width: 130 },
            { name: "政治面貌", prop: "organize", haveHTML: true, width: 130 },
            { name: "技术方向", prop: "tname" },
            { name: "行业领域", prop: "codeName" },
            { name: "就职信息", prop: "onJob", haveHTML: true, width: 130 },
            { name: "最高职称", prop: "positionalName", width: 130 },
            {
              name: "专家状态",
              prop: "expertStatus",
              width: 130,
              haveHTML: true,
            },
          ],
          innerBtn: [
            {
              name: "查看",
              method: "view",
            },
          ],
          page: {
            pageNum: 1,
            pages: 1,
            pageSize: 10000,
          },
        },
      },
    };
  },
  computed: {
    //专家状态
    status() {
      return this.$route.query.status;
    },
    //政治面貌
    organize() {
      return this.$route.query.organize;
    },
    //行业领域
    positionCode() {
      return this.$route.query.positionCode;
    },
    //就职信息
    onJob() {
      return this.$route.query.onJob;
    },
    //最高职称
    positionalTitle() {
      return this.$route.query.positionalTitle;
    },
    // 技术方向
    specialty() {
      return this.$route.query.specialty;
    },
  },
  watch: {},
  mounted() {
    this.searchForm.form = {
      code: this.positionCode,
      expertStatus: this.status == undefined ? "" : parseInt(this.status),
      organize: this.organize == undefined ? "" : parseInt(this.organize),
      specialty: this.specialty,
    };
    this.init();
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    init() {
      this.getTechnical();
      this.getIndustryField();
      this.queryExpertList();
      this.change();
      this.paly();
    },
    change() {
      this.table.data.push(this.table.data[0]);
      this.table.data.shift();
    },
    paly() {
      this.timer = setInterval(this.change, 2500);
    },
    // 技术方向
    getTechnical() {
      getTechnicalList().then((res) => {
        if (res.msg.message == "SUCCESS") {
          let arr = [];
          res.data.forEach((item) => {
            let obj = {};
            if (item.codeId) {
              obj.dataValue = item.itemCode;
              obj.dataName = item.chName;
              arr.push(obj);
            }
          });
          this.$set(this.searchForm.enum, "TechnicalList", arr);
        }
      });
    },
    //行业领域
    getIndustryField() {
      getIndustryFieldList().then((res) => {
        if (res.msg.message == "SUCCESS") {
          let arr = [];
          res.data.forEach((item) => {
            let obj = {};
            if (item.id) {
              obj.dataValue = item.code;
              obj.dataName = item.name;
              arr.push(obj);
            }
          });
          this.$set(this.searchForm.enum, "IndustryFieldList", arr);
        }
      });
    },
    //获取专家列表
    queryExpertList(page) {
      // 路由传参查询
      let params = {
        specialty: this.specialty,
        positionalTitle: this.positionalTitle,
        code: this.positionCode,
        organize: this.organize,
        onJob: this.onJob,
        expertStatus: null,
        pageNum: this.table.config.page.pageNum,
        pageSize: this.table.config.page.pageSize,
      };
      if (
        this.specialty ||
        this.positionalTitle ||
        this.positionCode ||
        this.organize ||
        this.organize == 0 ||
        this.onJob||this.onJob==0
      ) {
        params.expertStatus = 0;
      } else if (this.status || this.status == 0) {
        params = {
          expertStatus: this.status,
          pageNum: this.table.config.page.pageNum,
          pageSize: this.table.config.page.pageSize,
        };
      }

      //自定义查询
      if (page) {
        this.table.data = [];
        this.pageType = 1;
        this.table.config.page.pageNum = 1;
        params.pageNum = page;
        (params.code = this.searchForm.form.code),
          (params.organize = this.searchForm.form.organize),
          (params.specialty = this.searchForm.form.specialty),
          (params.expertStatus = this.searchForm.form.expertStatus);
      }
      queryListExpertBase(params).then((res) => {
        if (!res || res.msg.code != "0000" || !res.data) return;
        this.table.data = res.data.list;
        this.$set(this.table.config.page, "pages", res.data.pages);
      });
    },
    tableclassname({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "successName";
      }
      return "";
    },
    view(row) {
      this.$router.push({
        name: "expertdetail",
        query: {
          jfid: row.jfid,
        },
      });
    },
    //"organize": 0, //政治面貌 (0 群众 1共青团员 2 中共党员 3 民主党派 4 无党派人士 5 其他)
    //expertStatus：0 激活 1停用 2待审核
    //"onJob": "0", // 是否在职 0.否 1.是 2.个人
    formatter(key, val, row) {
      if (key === "expertStatus") {
        if (row["expertStatus"] == 0) {
          return "<span class='live'></span><span>激活</span>";
        } else if (row["expertStatus"] == 1) {
          return "<span class='stop'></span><span>停用</span>";
        } else if (row["expertStatus"] == 2) {
          return "<span class='wait'></span><span>待审核</span>";
        }
      } else if (key === "organize") {
        if (row["organize"] == 0) {
          return "<span>群众</span>";
        } else if (row["organize"] == 1) {
          return "<span>共青团员</span>";
        } else if (row["organize"] == 2) {
          return "<span>中共党员</span>";
        } else if (row["organize"] == 3) {
          return "<span>民主党派</span>";
        } else if (row["organize"] == 4) {
          return "<span>无党派人士</span>";
        } else if (row["organize"] == 5) {
          return "<span>其他</span>";
        }
      } else if (key === "onJob") {
        if (row["onJob"] == 0) {
          return "<span>离退休</span>";
        } else if (row["onJob"] == 1) {
          return "<span>就职</span>";
        } else if (row["onJob"] == 2) {
          return "<span>个人</span>";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.expertList {
  width: 100%;
  height: calc(100% - 130px);
  border-radius: 8px;
  margin-top: 28px;
  background: url("../../../assets/img/bg/expertlistBorder.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  .title {
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

  .search {
    margin: 41px 41px 0 15px;
    ::v-deep .el-form {
      .el-button {
        margin-left: 30px;
      }
      .el-select {
        width: 262px;
      }
    }
  }
}
</style>