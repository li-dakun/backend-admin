<template>
  <!-- 一周访问量展示 -->
  <el-card style="margin-top: 1.25rem">
    <div class="e-title">一周访问量</div>
    <div style="height: 350px">
      <v-chart :options="viewCount" v-loading="loading"></v-chart>
    </div>
  </el-card>
</template>
    
<script setup lang='ts'>
</script>
    

<style scoped>
.e-title {
  font-size: 14px;
  color: #202a34;
  font-weight: 700;
}
</style>
