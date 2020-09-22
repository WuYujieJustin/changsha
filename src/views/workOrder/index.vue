<template>
  <div class="workOrder">
    <div class="header">
      <order-nums @GetType="GetType" />
      <!-- <order-invalid /> -->
    </div>
    <div class="content">
      <list ref="list"></list>
    </div>
  </div>
</template>

<script>
import list from "./children/list";
export default {
  data() {
    return {};
  },
  components: {
    list,
  },

  methods: {
    GetType(data) {
      this.$refs.list.queryExpertList(1, data);
    },
  },
};
</script>

<style lang="scss" scoped>
.workOrder {
  display: flex;
  height: calc(100% - 130px);
  flex-direction: column;
  padding-bottom: 28px;
  .header {
    display: flex;
    flex-wrap: nowrap;
    height: 317px;
    margin-bottom: 40px;
  }
  .content {
    flex: 1;
    display: flex;
    margin-top: 40px;
    overflow: hidden;
    .expert_fenbu {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
  ::v-deep .title {
    position: absolute;
    left: 20px;
    top: 0px;
    font-size: 18px;
  }
  ::v-deep .order_title {
    @include bis("~img/bg/card_title@2x.png");
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 18px;
    left: 0;
  }
}
</style>