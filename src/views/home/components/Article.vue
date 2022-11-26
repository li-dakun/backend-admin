<template>
  <el-row :gutter="20" style="margin-top: 1.25rem">
    <!-- 文章浏览量排行 -->
    <el-col :span="16">
      <el-card>
        <div class="e-title">文章浏览量排行</div>
        <div ref="echartsRef" style="height: 350px">
          <!-- <v-chart :options="props.initParam.ariticleRank" /> -->
        </div>
      </el-card>
    </el-col>
    <!-- 分类数据统计 -->
    <el-col :span="8">
      <el-card>
        <div class="e-title">文章分类统计</div>
        <div ref="echartsCategoryRef" style="height: 350px">
          <!-- <v-chart :options="props.initParam.category" /> -->
        </div>
      </el-card>
    </el-col>
  </el-row>
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
const echartsCategoryRef = ref<HTMLElement>();
onMounted(() => {
  let myChart: echarts.ECharts = echarts.init(echartsRef.value as HTMLElement);
  let option: echarts.EChartsOption = props.initParam.ariticleRank;
  Echarts(myChart, option);

  let categoryChart: echarts.ECharts = echarts.init(
    echartsCategoryRef.value as HTMLElement
  );
  let category: echarts.EChartsOption =props.initParam.category ;
  Echarts(categoryChart, category);
});
</script>
    
<style socped>
.e-title {
  font-size: 13px;
  color: #202a34;
  font-weight: 700;
}
canvas {
  /* width: 200px !important;
  height: 200px !important; */
}
</style>