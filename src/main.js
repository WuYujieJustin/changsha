import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import './components'
import filters from './filters'
import './styles/index.scss'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Es6Promise from "es6-promise";

Es6Promise.polyfill();
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

for (let key in filters) {
  Vue.filter(key, filters[key])
}

function vue_init() {
  console.log('vue_init')
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

store.dispatch('allProject/getProjectList').then(() => {
  vue_init()
})
