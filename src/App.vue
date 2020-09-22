<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { init } from '@/utils/flexible.js'

export default {
  name: 'App',
  mounted() {
    init(16 / 9)
  }
}
</script>
<style lang="scss">
body{
  -webkit-font-smoothing: subpixel-antialiased;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
#app{
  overflow: hidden;
  height: 100vh;
  font-size: 14px;
}
@media (aspect-ratio: 16/10) {
  .header{
    // margin: auto;
  }
  .left-container{
    .project-progress{
      margin-top: 60px !important;
      height: 470px !important;
    }
  }
  .center-container{
    // .industry-channel{
    //   $offset: 1;
    //   $line-length: 160px;
    //   $line-translate: $line-length / 2 + 116px;
    //   .line:nth-child(#{$offset+3}) {
    //     transform: rotate3d(0,0,1, 135deg) translate3d($line-translate, 0, 0);
    //     .expand {
    //       transform: translate3d($line-length, 0, 0) rotate3d(0,0,1, 45deg);
    //     }
    //     .expand-text {
    //       top: -49px !important;
    //       transform-origin: center center;
    //       transform: rotate3d(0, 0, 1, 180deg); 
    //       text-align: left;
    //     }
    //   }
    //   .line:nth-child(#{$offset + 4}) {
    //     .expand-text {
    //       top: -49px !important;
    //     }
    //   }
    // }
    .all-counts{
      margin-top: 120px !important;
    }
  }
  .right-container{
    .expert-resources{
      margin-top: 50px !important;
      margin-bottom: 50px !important;
    }
  }
  .major-bg-img{
    .header{
      margin-bottom: 0px !important;
    }
    .project-flow{
      height: 1110px !important;
    }
    // .project-info{
    //   margin-top: 50px;
    // }
  }
}
</style>
