<template>
  <div class="messageContent">
    <header v-if="!notitle">
      <img src="~img/workorder/juxing.png" />
      <span>{{title}}</span>
    </header>
    <div class="inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    title: String,
    notitle: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.messageContent {
  font-size: 19px;
  header {
    margin-bottom: 10px;
    span {
      margin-left: 10px;
      font-size: 14px;
    }
  }
  .inner {
    overflow: hidden;
    padding: 20px;
    background: rgba(25, 56, 114, 0.3);
    box-shadow: 0px 0px 21px 8px rgba(55, 121, 234, 0.3) inset;
    border-radius: 8px;
    border: 1px solid rgba(61, 132, 252, 0.5);
    background-image: url(~img/workorder/border1.png),
      url(~img/workorder/border2.png);
    background-repeat: no-repeat, no-repeat;
    background-position: right top, left bottom;
  }
}
</style>