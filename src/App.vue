<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
import axios from 'axios'

import generaMenu from './api/menu';
import {onMounted} from "vue-demi";

import useTabStore from "./store/modules/tab";
import {useUserStore} from './store/modules/user';
const userStore = useUserStore();
onMounted(()=>{
  // 刷新页面查询用户菜单
  if (userStore.userInfo!==null) {
    generaMenu();
    // 上传访客信息
    axios.post('/api/report')
  }
})

</script>
