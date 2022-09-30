import { createApp } from 'vue';

import App from './App.vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from './stores/index'
import router from './router/index'
// import './assets/css/index.css'
// iconfont css
import "./assets/iconfont/iconfont.less";
// font css
import "./assets/fonts/font.less";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import axios from 'axios';
import 'nprogress/nprogress.css'
const app = createApp(App)
//引入定义的styles样式
import "./styles/theme/element-dark.less";
import "./styles/element.less"
import "./styles/reset.less";
import "./styles/common.less";
//icon图标全局引入

Object.keys(ElementPlusIconsVue).forEach((key) => {
  app.component(key, ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue]);
});


app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(pinia)
app.use(Antd)
// app.use(mavonEditor)
app.mount("#app")
