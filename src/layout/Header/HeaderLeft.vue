<template>
  <div class="tool-bar-lf">
    <CollapseIcon id="collapseIcon" />
    <Breadcrumb id="breadcrumb"/>
  </div>
</template>
    
<script setup lang='ts'>
import { computed } from "vue";
import CollapseIcon from "./components/CollapseIcon.vue";
import Breadcrumb from "./components/Breadcrumb.vue";




</script>
    
<style scoped lang="less">
.tool-bar-lf {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>