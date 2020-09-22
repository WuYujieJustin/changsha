<template>
  <div class="echarts"></div>
</template>

<script>
/* eslint-disable */
// import ECharts from '../plugins/echarts/echarts.min'
const ECharts = require("echarts");
import { debounce } from "lodash";
import echarts from "echarts";
import "echarts-liquidfill";
import { warn } from "@/utils/warn";

const ACTION_EVENTS = [
  "legendselectchanged",
  "legendselected",
  "legendunselected",
  "datazoom",
  "datarangeselected",
  "timelinechanged",
  "timelineplaychanged",
  "restore",
  "dataviewchanged",
  "magictypechanged",
  "geoselectchanged",
  "geoselected",
  "geounselected",
  "pieselectchanged",
  "pieselected",
  "pieunselected",
  "mapselectchanged",
  "mapselected",
  "mapunselected",
  "axisareaselected",
  "brush",
  "brushselected",
];

const MOUSE_EVENTS = [
  "experteclick",
  "click",
  "dblclick",
  "mouseover",
  "mouseout",
  "mousedown",
  "mouseup",
  "globalout",
];
export default {
  name: "ECharts",
  props: {
    options: Object,
    theme: String,
    autoResize: Boolean,
    initOptions: Object,
    activeIndex: Number, //(专家技术方向汇总才有)
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {},
  methods: {
    // provide a explicit merge option method
    mergeOptions(options) {
      this._delegateMethod("setOption", options);
    },
    // just delegates ECharts methods to Vue component
    // use explicit params to reduce transpiled size for now
    resize(options) {
      this._delegateMethod("resize", options);
    },
    dispatchAction(payload) {
      this._delegateMethod("dispatchAction", payload);
    },
    convertToPixel(finder, value) {
      return this._delegateMethod("convertToPixel", finder, value);
    },
    convertFromPixel(finder, value) {
      return this._delegateMethod("convertFromPixel", finder, value);
    },
    containPixel(finder, value) {
      return this._delegateMethod("containPixel", finder, value);
    },
    showLoading(type, options) {
      this._delegateMethod("showLoading", type, options);
    },
    hideLoading() {
      this._delegateMethod("hideLoading");
    },
    getDataURL(options) {
      return this._delegateMethod("getDataURL", options);
    },
    getConnectedDataURL(options) {
      return this._delegateMethod("getConnectedDataURL", options);
    },
    clear() {
      this._delegateMethod("clear");
    },
    dispose() {
      this._delegateMethod("dispose");
    },
    init() {
      if (this.chart) return;
      let chart = ECharts.init(this.$el, this.theme, this.initOptions, {
        renderer: "svg",
        devicePixelRatio: window.devicePixelRatio,
      });
      chart.setOption(this.options);
      ACTION_EVENTS.forEach((event) => {
        chart.on(event, (params) => {
          this.$emit(event, params);
        });
      });

      MOUSE_EVENTS.forEach((event) => {
        if (event == "experteclick") {
          chart.getZr().on("click", (params) => {
            let pointInPixel = [params.offsetX, params.offsetY];
            if (chart.containPixel("grid", pointInPixel)) {
              let xIndex = chart.convertFromPixel({ seriesIndex: 1 }, [
                params.offsetX,
                params.offsetY,
              ])[0];
              var ds = this.options.options[this.activeIndex].series[0].data[
                xIndex
              ];
              this.$emit("chart" + event, ds);
            }
          });
        } else {
          chart.on(event, (params) => {
            this.$emit("chart" + event, params);
          });
        }
      });
      if (this.autoResize) {
        this.__resizeHanlder = debounce(
          () => {
            chart.resize();
          },
          100,
          { leading: true }
        );
        window.addEventListener("resize", this.__resizeHanlder);
      }
      this.chart = chart;
    },
    delegatedMethod(name, ...args) {
      if (!this.chart) {
        warn(
          `Cannot call [${name}] before the chart is initialized. Set prop [options] first.`,
          this
        );
        return;
      }
      return this.chart[name](...args);
    },
  },
  mounted() {
    if (this.options) {
      this.init();
    }
  },
  watch: {
    options: {
      handler(options) {
        if (!this.chart && options) {
          this.init();
        } else {
          this.chart.setOption(this.options, "notMerge");
        }
      },
      deep: true,
    },
  },
  registerMap(...args) {
    ECharts.registerMap(...args);
  },
  registerTheme(...args) {
    ECharts.registerTheme(...args);
  },
};
/* eslint-enable */
</script>

<style>
.echarts {
  /* width: 100%; */
  /* height: 100%; */
}
</style>
