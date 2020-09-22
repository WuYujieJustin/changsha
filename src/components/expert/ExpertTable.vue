<template>
  <div class="Form">
    <el-table
      :data="data"
      style="width: 100%"
      :header-row-class-name="tableRowClassName"
      :max-height="maxHeight"
    >
      <el-table-column
        v-if="config.index"
        align="left"
        type="index"
        width="100"
        :label="config.index"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in config.header"
        :key="item.name+index"
        :label="item.name"
        :prop="item.prop"
        :width="item.width || 'auto'"
        align="left"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="!item.haveHTML" class="hid">{{scope.row[item.prop] || "-"}}</div>
          <div class="hid" v-else v-html="fmt(scope.row, item.prop, scope.row[item.prop])"></div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="config.innerBtn"
        :label="tableLabelName"
        align="center"
        :fixed="right"
        width="100"
      >
        <template slot-scope="scope">
          <div>
            <template v-for="(item, index) in config.innerBtn">
              <el-button
                v-if="!item.bind || scope.row[item.bind] != item.value"
                :key="item.name+index"
                type="text"
                size="big"
                @click="callFn(item, scope.row,item.name)"
              >{{ item.name }}</el-button>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "ExpertTable",
  // 指令（滚动加载）
  // directives: {
  //   loadmore: {
  //     bind(el, binding) {
  //       const selectWrap = el.querySelector(".el-table__body-wrapper");
  //       selectWrap.addEventListener("scroll", function () {
  //         const scrollDistance =
  //           this.scrollHeight - this.scrollTop - this.clientHeight;
  //         if (scrollDistance <= 0) {
  //           binding.value();
  //         }
  //       });
  //     },
  //   },
  // },
  data() {
    return {
      right: null,
    };
  },
  props: {
    maxHeight: {
      type: Number,
      default() {
        return 0;
      },
    },
    config: {
      type: Object,
      default() {
        return {};
      },
    },
    page: {
      type: Object,
      default() {
        return {
          pageNum: 1,
          pages: 1,
        };
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    formatter: {
      type: Function,
    },
    tableLabelName: {
      type: String,
      default: "操作",
    },
    tableLabelNamesec: {
      type: String,
      default: "审核",
    },
  },
  mounted() {},
  methods: {
    // loadMore() {
    //   this.$emit("getMoreData");
    // },
    callFn(item, row, name, index) {
      if (item.method && item.method.constructor == Function) {
        item.method(item, row, name, index);
        return;
      }
      let sum = 0;
      let obj = this.getDeepMethod(this.$parent, item.method, sum, 10);
      if (obj.parent && obj.method) {
        obj.method.call(obj.parent, row, name, index);
      }
    },
    getDeepMethod(parent, method, sum, limit) {
      sum++;
      if (!parent) {
        console.log("父组件没有写此方法");
        return {};
      } else if (sum == limit) {
        console.log("父组件没有写此方法");
        return {};
      } else if (parent[method]) {
        return {
          parent,
          method: parent[method],
        };
      } else {
        return this.getDeepMethod(parent.$parent, method);
      }
    },
    fmt(row, column, value) {
      if (this.formatter) {
        let key = column.property ? column.property : column;
        let v = this.formatter(key, value, row, this.dataLists);
        if (v) {
          return v;
        }
      }
      return value;
    },
    AddClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        return "columnClass";
      }
      return "";
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "tableHeaderColor";
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.Form {
  margin: 10px 31px 41px 31px;
  ::v-deep .el-table__header-wrapper {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  ::v-deep .el-table,
  .el-table__expanded-cell {
    background-color: transparent;
  }
  ::v-deep .el-table .cell {
    padding-right: 0;
    padding-left: 30px;
  }
  .el-table::before {
    height: 0 !important;
  }
  ::v-deep .el-table {
    color: white;

    .el-table__empty-text {
      font-size: 16px !important;
      color: white;
    }
    tr {
      background-color: transparent !important;
    }
    th {
      background-color: #193872 !important;
      border-bottom: none;
    }
    td {
      border: 1px solid transparent;
      border-left: none;
      border-right: none;
    }
    td:nth-last-child(1) {
      border-right: 1px solid transparent;
    }
    .el-button {
      width: 37px;
      height: 27px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(4, 219, 246, 1);
      position: relative;
      top: -6px;
      // right: 30px;
    }
    td:nth-child(1) {
      border: 1px solid transparent;
    }
    .successName {
      background: rgba(25, 56, 114, 0.3) !important;
    }
    .tableHeaderColor {
      border-bottom: solid 1px transparent !important;
      height: 56px !important;
      font-size: 16px !important;
      font-family: PingFangSC-Medium, PingFang SC !important;
      font-weight: 500 !important;
      color: rgba(255, 255, 255, 1) !important;
    }
    // 滚动条的宽度
    .el-table__body-wrapper::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    // 滚动条的滑块
    .el-table__body-wrapper::-webkit-scrollbar-thumb {
      width: 4px;
      height: 200px;
      background: linear-gradient(
        180deg,
        rgba(10, 239, 251, 0) 0%,
        rgba(4, 219, 246, 1) 54%,
        rgba(4, 219, 246, 0) 100%
      );
    }
    tbody {
      tr.current-row > td {
        background: transparent;
      }
      tr.current-row {
        background-color: transparent !important;
        box-shadow: 0px 0px 13px 10px rgba(4, 219, 246, 0.5) inset !important;
      }
      tr:hover {
        background-color: transparent !important;
        box-shadow: 0px 0px 13px 10px rgba(4, 219, 246, 0.5) inset !important;
      }
      tr:hover > td {
        background-color: transparent !important;
      }
      tr:hover > td:nth-child(1) {
        border-left: 1px solid transparent;
        border-right: none;
      }
      tr:hover > td:nth-last-child(1) {
        border-right: 1px solid transparent;
      }
      .el-table__row:nth-child(even) {
        background: rgba(25, 56, 114, 0.3) !important;
      }
      .el-table__row {
        height: 56px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        .stop {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: rgba(232, 57, 92, 1);
          border-radius: 50%;
          margin-right: 15px;
        }
        .live {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: rgba(8, 234, 250, 1);
          border-radius: 50%;
          margin-right: 15px;
        }
        .wait {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: rgba(255, 225, 0, 1);
          border-radius: 50%;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-tooltip__popper {
  font-size: 18px !important;
  max-width: 50% !important;
  color: rgb(255, 255, 255) !important;
  background: #035085 !important;
  box-shadow: 0px 0px 61px 8px rgba(55, 121, 234, 0.3) inset !important;
  border-radius: 8px !important;
  border: 1px solid rgba(61, 132, 252, 0.5) !important;
  .popper__arrow {
    display: none !important;
  }
}
</style>