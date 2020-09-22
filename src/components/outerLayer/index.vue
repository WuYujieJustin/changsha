<template>
  <div id="outerLayer">
    <span class="title order_title">{{title}}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "OuterLayer",
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
#outerLayer {
  padding: 40px 20px 1px;
  border-radius: 8px;
  margin-top: 28px;
  @include bis("~img/order/left_bg.png");
  background-size: 100% 100%;
  position: relative;
  .title {
    display: flex;
    left: 0px;
    align-items: center;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>