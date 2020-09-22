<template>
  <section class="search">
    <el-form :inline="true" :ref="form.name || 'form'" :model="form.form" label-suffix="：">
      <el-form-item
        v-for="(item, index) in form.config"
        :key="item.bind"
        :label="item.name"
        :prop="item.bind"
        :class="[
              { none: !((index < (form.minNum || 3) && !expand) || expand) },
              item.class,
              {'search_date': item.type.includes('date')}
            ]"
      >
        <!-- input -->
        <el-input
          :class="item.class || 'default_text'"
          v-if="item.type == 'text'"
          size="medium"
          :readonly="item.readonly || false"
          v-model.trim="form.form[item.bind]"
          :placeholder="item.placeholder"
          :maxlength="item.maxlength"
          clearable
        ></el-input>
        <!-- select -->
        <el-select
          v-if="item.type == 'select'"
          @change="
                (res) => {
                  callSuccessFn(item.select, res);
                }
              "
          size="medium"
          v-model="form.form[item.bind]"
          :placeholder="item.placeholder"
          clearable
          :filterable="item.isHave"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="(op, opindex) in form.enum[item.data]"
            :key="'op_' + opindex"
            :label="item.label ? op[item.label] :op.dataName"
            :value="item.value ? op[item.value] :op.dataValue"
          ></el-option>
        </el-select>

        <!-- date -->
        <el-date-picker
          :class="item.class || 'default_date_picker'"
          v-if="item.type == 'date'"
          size="medium"
          v-model="form.form[item.bind]"
          :type="item.showType || 'date'"
          :placeholder="item.placeholder"
          :format="item.format || 'yyyy-MM-dd'"
          :value-format="item.format || 'yyyy-MM-dd'"
          :clearable="true"
        ></el-date-picker>
        <el-date-picker
          :class="item.class || 'default_date_picker'"
          v-if="item.type == 'datetime'"
          size="medium"
          v-model="form.form[item.bind]"
          type="datetime"
          :placeholder="item.placeholder"
          :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
          :value-format="item.format || 'yyyy-MM-dd HH:mm:ss'"
          :clearable="true"
        ></el-date-picker>
        <el-date-picker
          :class="item.class || 'default_date_picker'"
          v-if="item.type == 'daterange'"
          size="medium"
          :start-placeholder="item.startPlaceholder"
          :end-placeholder="item.endPlaceholder"
          v-model="form.form[item.bind]"
          type="daterange"
          :placeholder="item.placeholder"
          :format="item.format || 'yyyy-MM-dd'"
          :value-format="item.format || 'yyyy-MM-dd'"
          :clearable="true"
        ></el-date-picker>
        <el-date-picker
          :class="item.class || 'default_date_picker'"
          v-if="item.type == 'datetimerange'"
          size="medium"
          :start-placeholder="item.startPlaceholder"
          :end-placeholder="item.endPlaceholder"
          v-model="form.form[item.bind]"
          type="datetimerange"
          :placeholder="item.placeholder"
          :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
          :value-format="item.format || 'yyyy-MM-dd HH:mm:ss'"
          :clearable="true"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchFn">搜索</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  name: "Search",
  components: {},
  props: {
    form: {
      type: Object,
    },
  },
  data() {
    return {
      expand: true,
    };
  },
  computed: {},
  created() {
    const keys = Object.keys(this.form.form);
    if (keys.length < 1) {
      this.form.config.forEach((item) => {
        this.$set(this.form.form, item.bind, "");
      });
    }
  },
  destroyed() {
    this.form.form = {};
  },
  methods: {
    callSuccessFn(handle, res) {
      //上传成功回调父组件方法
      console.log(handle, res, this.$parent);
      if (this.$parent[handle]) {
        this.$parent[handle].call(this.$parent, res);
        return;
      }

      if (this.$parent.$parent[handle]) {
        this.$parent.$parent[handle].call(this.$parent.$parent, res);
        return;
      }
      if (this.$parent.$parent.$parent[handle]) {
        this.$parent.$parent.$parent[handle].call(
          this.$parent.$parent.$parent,
          res
        );
      } else {
        console.log("没有写此方法");
      }
    },

    searchFn() {
      this.$emit("search");
    },
    resetForm() {
      this.$refs[this.form.name || "form"].resetFields();
      this.searchFn();
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  margin: 41px 41px 0 31px;
  .el-form {
    display: flex;
    flex-wrap: wrap;
    ::v-deep .el-select:hover {
      box-shadow: 0px 0px 10px 4px rgba(4, 219, 246, 0.5) inset;
      border-radius: 4px;
      border: 1px solid rgba(4, 219, 246, 1);
    }
    ::v-deep .el-select:hover .el-icon-arrow-up {
      color: rgba(4, 219, 246, 1);
    }
    ::v-deep .el-select:hover .el-icon-circle-close {
      color: rgba(4, 219, 246, 1);
    }
    ::v-deep .el-select {
      width: 212px;
      height: 32px;
      line-height: 32px;
      border: 1px solid rgba(4, 219, 246, 0.5);
      border-radius: 4px;
      .el-icon-arrow-up {
        color: rgba(4, 219, 246, 0.5);
      }
      .el-input__icon{
        // line-height: 100%;
      }
      .el-popper {
        position: absolute !important;
        left: 0px !important;
        margin-top: 3px !important;
      }
      .el-input__inner {
        background: transparent;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        border: none;
      }

      .el-select-dropdown {
        background-color: #172652;
        border-radius: 4px;
        box-shadow: 0px 0px 13px 5px rgba(4, 219, 246, 0.5) inset;
        border: 1px solid #04dbf6;
        position: relative;
        left: -20px;
        .popper__arrow {
          display: none;
        }
        .el-select-dropdown__item {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          border: 1px solid transparent;
        }
        .el-select-dropdown__item.selected {
          background: url("../../assets/img/bg/selected.png") no-repeat;
          background-size: 10% 100%;
          background-position-x: 92%;
        }
        .el-select-dropdown__empty {
          color: rgba(255, 255, 255, 0.5);
        }
        .el-select-dropdown__item.hover {
          // border: 1px solid #0092fe;
          background-color: transparent;
        }
      }
    }
    ::v-deep .el-form-item {
      display: flex;
      align-items: center;
    }
    ::v-deep .el-form-item__label {
      width: 120px;
      height: 32px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 32px;
      position: relative;
    }

    .el-button {
      padding: 0;
      margin-left: 30px;
      width: 92px;
      height: 32px;
      font-size: 14px;
      background: rgba(4, 219, 246, 1);
      border-radius: 4px;
      opacity: 0.9;
      border: 1px solid rgba(4, 219, 246, 1);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      ::v-deep .el-icon-search {
        font-size: 18px;
        margin-right: 1px;
      }
    }
  }
}
</style>

