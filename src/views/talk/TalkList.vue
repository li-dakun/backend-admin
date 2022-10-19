<template>
  <el-card class="main-card">
    <div class="title">{{ $route.name }}</div>
    <div class="status-menu">
      <span>状态</span>
      <span @click="changeStatus(null)" :class="isActive">全部</span>
      <span> 公开 </span>
      <span> 私密 </span>
    </div>
  </el-card>
</template>
    
<script setup lang='ts'>
import { computed, reactive } from "vue-demi";

const current = reactive(1);
const previews = reactive([]);
const status = reactive('');
const isActive = computed(() => {
  //   return this.status == status ? "active-status" : "status";
  status.value == status ? "active-status" : "status";
});
const changeStatus = (status) => {
  this.current = 1;
  this.previews = [];
  this.status = status;
  this.listTalks();
};
</script>
    
<style lang="less" scoped>
@import "./index.less";
</style>