<template>
  <!-- 一周访问量展示 -->
  <el-card style="margin-top: 1.25rem">
    <div class="e-title">一周访问量</div>
    <div ref="echartsRef" style="height: 350px">
      <!-- <v-chart :options="props.initParam.viewCount" ></v-chart> -->
      <!-- <div ref="echartsRef" class="card content-box"></div> -->
    </div>
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

const echartsRef = ref<HTMLElement>();
onMounted(() => {
  let myChart: echarts.ECharts = echarts.init(echartsRef.value as HTMLElement);
  let option: echarts.EChartsOption = props.initParam.viewCount;
  Echarts(myChart, option);
});
</script>
    

<style scoped>
.e-title {
  font-size: 14px;
  color: #202a34;
  font-weight: 700;
}
</style>
