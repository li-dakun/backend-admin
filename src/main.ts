import { createApp } from 'vue';

import App from './App.vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import pinia from './store/index';
import axios from 'axios';
import config from './utils/config/index';
import router from './router/index';
import 'nprogress/nprogress.css';
import './assets/css/index.css';
// iconfont css
// import "./assets/iconfont/iconfont.less";
import "./assets/iconfont/iconfont.css"
// font css
import "./assets/fonts/font.less";
//引入定义的styles样式
import "./styles/theme/element-dark.less";
import "./styles/element.less";
import "./styles/reset.less";
import "./styles/common.less";

import ECharts from 'vue-echarts'
import { use } from "echarts/core";
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
// import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import VueCalendarHeatmap from 'vue3-calendar-heatmap'

// vue i18n
import I18n from "./language/index";
const app = createApp(App);
Object.keys(ElementPlusIconsVue).forEach((key) => {
  app.component(key, ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue]);
});
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

// app.config.globalProperties.$config = config;


axios.interceptors.request.use((config: any) => {
  config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use(
  (response) => {
    switch (response.data.code) {
      case 40001:
        app.config.globalProperties.$message({
          type: 'error',
          message: response.data.message
        })
        router.push({ path: '/login' })
        break
      case 50000:
        app.config.globalProperties.$message({
          type: 'error',
          message: response.data.message
        })
        break
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)





// app.component('v-chart', ECharts);

app.use(router).use(ElementPlus, {
  locale: zhCn,
}).use(I18n).use(pinia).component('v-chart', ECharts).use(VueCalendarHeatmap).component('v-chart', ECharts);;
// component('CalendarHeatmap', CalendarHeatmap);
// app.use(mavonEditor)
app.mount("#app");
