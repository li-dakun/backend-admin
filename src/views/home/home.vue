<template>
  <div>
    <!--首页数据统计 -->
    <MD />
    <!-- 一周访问量展示 -->
    <Data />
        <!-- 排行榜单 -->
    <Top />
    <!-- 文章贡献统计 -->
    <Article />
    <!-- 地图 -->
    <China />
  </div>
</template>
    
<script setup lang='ts'>
import MD from "./components/MD.vue";
import Data from "./components/Data.vue";
import Article from "./components/Article.vue";
import China from "./components/China.vue";
import Top from "./components/Top.vue";
</script>
    

<style scoped>
.e-title {
  font-size: 14px;
  color: #202a34;
  font-weight: 700;
}
</style>
