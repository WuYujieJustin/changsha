<template>
  <div :id="id" ref="ChartRoot" style="width: 0;height: 0" />
</template>

<script>
import { isEmpty, debounce, mergeWith, cloneDeep } from 'lodash'
const queue = []
let seed = 0
const echarts = require('echarts')
function registerChart (componentInstance) {
  if (!queue.includes(componentInstance)) {
    queue.push(componentInstance)
  }
}
function redraw () {
  // 当浏览器改变大小时, 所有已经绘制的图表都需要重绘
  queue.forEach((comp) => {
    comp.chart.resize()
  })
}
function logoutChart (component) {
  const i = queue.indexOf(component)
  if (i > -1) {
    queue.splice(i, 1)
  }
}
const isServer = typeof window === 'undefined'
if (!isServer) {
  window.addEventListener('resize', debounce(redraw, 300))
}
setInterval(() => {
  queue.forEach((comp) => {
    comp.cacheSize(comp.$el.parentNode)
  })
}, 100)
export default {
  name: 'ZbChart',
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    width: {
      type: String,
      default () {
        return '100%'
      }
    },
    height: {
      type: String,
      default () {
        return '100%'
      }
    }
  },
  data () {
    return {
      id: 'zb-chart-' + (seed++),
      chart: null,
      chart_width: null,
      chart_height: null
    }
  },
  computed: {
    container_size () {
      if (this.chart_width) {
        return {
          width: this.chart_width,
          height: this.chart_height
        }
      } else {
        return {}
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler: 'setOption'
    }
  },
  mounted () {
    this.chart = echarts.init(this.$el, null, { devicePixelRatio: window.devicePixelRatio })
    if (!isEmpty(this.options)) {
      this.setOption()
    }
    // 注册表单
    registerChart(this)
  },
  beforeDestroy () {
    // 注销表单
    logoutChart(this)
  },
  methods: {
    setOption () {
      this.chart.clear()
      function customizer (objValue, srcValue, key, object, source, stack) {

      }
      this.chart.setOption(mergeWith({}, cloneDeep(this.options), customizer))
    },
    // 缓存图表当前容器宽高.
    // 当图表容器的宽高变更时重绘图表
    cacheSize (container) {
      if (
        this.chart_width !== container.offsetWidth ||
        this.chart_height !== container.offsetHeight
      ) {
        this.chart_width = container.offsetWidth
        this.chart_height = container.offsetHeight

        this.chart.resize(this.container_size)
      }
    },
    getDataURL (opts = {
      type: 'png',
      pixelRatio: window.devicePixelRatio,
      backgroundColor: '#FFFFFF',
      excludeComponents: []
    }) {
      return this.chart.getDataURL(opts)
    },
    listenEvent (event) {
      this.chart.on(event, (ev) => {
        this.$emit('echart-event', ev)
      })
    }
  }
}
</script>
