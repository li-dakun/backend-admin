<template>
  <el-row :gutter="20" style="margin-top: 1.25rem">
    <!-- 用户地域分布 -->
    <el-col :span="16">
      <el-card>
        <div class="e-title">用户地域分布</div>
        <div style="height: 350px" v-loading="loading">
          <div class="area-wrapper">
            <el-radio-group v-model="type">
              <el-radio :label="1">用户</el-radio>
              <el-radio :label="2">游客</el-radio>
            </el-radio-group>
          </div>
          <v-chart :options="userAreaMap" />
          <div ref="echartsRef" style="height: 350px"></div>
        </div>
      </el-card>
    </el-col>
    <!-- 文章标签统计 -->
    <el-col :span="8">
      <el-card>
        <div class="e-title">文章标签统计</div>
        <div style="height: 350px" v-loading="loading">
          <tag-cloud  :data="tagDTOs"  width="300" height="300" radius="250" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
    
<script setup lang='ts'>
import { ref, onMounted, reactive } from "vue";
import { Echarts } from "@/hooks/Echarts";
import * as echarts from "echarts";
import "echarts-liquidfill";
// import "@/assets/ts/china";

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
  let option: echarts.EChartsOption = {};
  Echarts(myChart, option);
});

const userAreaMap = reactive({
  tooltip: {
    formatter: function (e) {
      var value = e.value ? e.value : 0;
      return e.seriesName + "<br />" + e.name + "：" + value;
    },
  },
  visualMap: {
    min: 0,
    max: 1000,
    right: 26,
    bottom: 40,
    showLabel: !0,
    pieces: [
      {
        gt: 100,
        label: "100人以上",
        color: "#ED5351",
      },
      {
        gte: 51,
        lte: 100,
        label: "51-100人",
        color: "#59D9A5",
      },
      {
        gte: 21,
        lte: 50,
        label: "21-50人",
        color: "#F6C021",
      },
      {
        label: "1-20人",
        gt: 0,
        lte: 20,
        color: "#6DCAEC",
      },
    ],
    show: !0,
  },
  geo: {
    map: "china",
    zoom: 1.2,
    layoutCenter: ["50%", "50%"],
    itemStyle: {
      normal: {
        borderColor: "rgba(0, 0, 0, 0.2)",
      },
      emphasis: {
        areaColor: "#F5DEB3",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderWidth: 0,
      },
    },
  },
  series: [
    {
      name: "用户人数",
      type: "map",
      geoIndex: 0,
      data: [],
      areaColor: "#0FB8F0",
    },
  ],
});



const tagDTOs = [
	{ name: '01. 人员招聘难', color: '#006666' },
	{ name: '02. 人才复制难', color: '#009999' },
	{ name: '03. 门店管理难', color: '#333333' },
	{ name: '04. 客户引流难', color: '#660099' },
	{ name: '05. 客户不稳定', color: '#990066' },
	{ name: '06. 技术门槛高', color: '#CC0099' },
	{ name: '07. 营销策划能力弱', color: '#CC3300' },
	{ name: '08. 行业内卷利润低', color: '#FF9900' },
	{ name: '09. 产品严重同质化', color: '#006633' },
	{ name: '10. 技术项目被浮夸' } // color 可以不传，默认黑色
]
</script>
    
<style socped>
</style>