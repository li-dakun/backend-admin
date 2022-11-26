<template>
  <div>
    <!-- <span>123qewsdhgbzhjg hbn</span> -->
    <!--首页数据统计 -->
    <MD :initParam="initParam" />
    <!-- 一周访问量展示 -->
    <Data :initParam="initParam" />
    <!-- 排行榜单 -->
    <!-- <Top :initParam="initParam" /> -->
    <!-- 文章贡献统计 -->
    <Article :initParam="initParam" />
    <!-- 地图 -->
    <!-- <China :initParam="initParam" /> -->
  </div>
</template>
    
<script setup lang='ts'>
import { ref, reactive, toRefs } from "vue";

import MD from "./components/MD.vue";
import Data from "./components/Data.vue";
import Article from "./components/Article.vue";
import China from "./components/China.vue";
import Top from "./components/Top.vue";

//定义数据信息/属性值
const initParam = reactive<any>({
  loading: true,
  type: 1,
  viewsCount: 0,
  messageCount: 0,
  userCount: 0,
  articleCount: 0,
  articleStatisticsDTOs: [],
  tagDTOs: [],
  viewCount: {
    tooltip: {
      trigger: "axis",
    },
    color: ["#3888fa"],
    legend: {
      data: ["访问量"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#666",
        },
      },
      data: [],
    },
    yAxis: {
      axisLine: {
        onZero: false,
        lineStyle: {
          color: "#048CCE",
        },
      },
    },
    series: [
      {
        name: "访问量",
        type: "line",
        data: [],
        smooth: true,
      },
    ],
  },
  ariticleRank: {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    color: ["#58AFFF"],
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [],
      axisLine: {
        lineStyle: {
          color: "#666",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        symbol: "arrow",
        lineStyle: {
          type: "dashed",
          color: "#666",
        },
      },
    },
    series: [
      {
        name: "浏览量",
        type: "bar",
        barWidth: "60%",
        data: [],
      },
    ],
  },
  category: {
		tooltip: {
			trigger: "item",
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
     color: ['#7EC0EE', '#FF9F7F', '#FFD700', '#C9C9C9', '#E066FF', '#36dc59', '#C0FF3E'],
		legend: {
			left: "center",
			top: "bottom",
			data: [],
			textStyle: {
				color: "#a1a1a1"
			}
		},
		series: [
			{
				name: "文章分类e",
				type: "pie",
				radius: [10, 100],
				center: ["50%", "40%"],
				roseType: "radius",
				itemStyle: {
					borderRadius: 5
				},
				label: {
					show: true
				},
				emphasis: {
					label: {
						show: true
					}
				},
				data: []
			}
		]
	},
  userAreaMap: {
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
  },
});
</script>
    

<style scoped>
.e-title {
  font-size: 14px;
  color: #202a34;
  font-weight: 700;
}
</style>
