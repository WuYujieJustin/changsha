<template>
  <div class="fileView">
    <img src="~img/workorder/view.png" />
    <span class="filename">{{fileInfo.fileName || fileInfo.name}}</span>
    <img @click="download(fileInfo)" class="downloadImg" src="~img/workorder/download.png" />
  </div>
</template>

<script>
import config from "@/settings";
export default {
  name: "FileView",
  props: {
    fileInfo: {
      type: [Object],
      default() {
        return {};
      },
    },
  },
  methods: {
    download(info) {
      if (info.fileId || info.id) {
        window.open(
          `${config.baseUrl}/csportalsite/api/file/download?id=${
            info.fileId || info.id
          }`
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fileView {
  display: flex;
  align-items: center;
  img {
    width: 18px;
    height: 18px;
  }
  .filename {
    max-width: 234px;
    margin: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
  .downloadImg {
    cursor: pointer;
     width: 18px;
    height: 18px;
  }
}
</style>