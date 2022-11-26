<template>
  <el-card style="margin-top: 1.25rem">
    <div class="e-title">文章贡献统计</div>
    <!-- <div class="heatmapTop"> -->
 <calendar-heatmap :max="10" :end-date="new Date()" :values="props.initParam.articleStatisticsDTOs" class="calendar"/>
    <!-- </div> -->
  </el-card>
</template>
    
<script setup lang='ts'>

import { ref, onMounted } from "vue";
import { Echarts } from "@/hooks/Echarts";
import * as echarts from "echarts";
import "echarts-liquidfill";

interface DrawerProps {
  initParam?: any;
}
//接收父组件参数
const props = withDefaults(defineProps<DrawerProps>(), {
  initParam: {},
});


</script>
    
<style lang="less" socped>
.e-title {
  font-size: 13px;
  color: #202a34;
  font-weight: 700;
}
.heatmapTop{
  margin-top: 20px;
  height: 400px;
  .calendar{
    width: 1120px;
    height: 200px;
  }
}
</style>