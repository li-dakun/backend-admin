<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
import axios from 'axios'
import generaMenu from './utils/menu';
import {onMounted} from "vue-demi";

// import useTabStore from "./stores/modules/tab";
// const tabStore = useTabStore();
// onMounted(()=>{
//   // 刷新页面查询用户菜单
//   if (tabStore.userInfo != null) {
//     generaMenu();
//     // 上传访客信息
//     axios.post('/api/report')
//   }
// })

</script>
