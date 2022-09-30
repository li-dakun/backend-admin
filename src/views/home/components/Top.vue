<template>
  <el-card style="margin-top: 1.25rem">
    <div class="e-title">文章贡献统计</div>
    <div v-loading="loading">
      <calendar-heatmap
        :end-date="new Date()"
        :values="articleStatisticsDTOs"
      />
    </div>
  </el-card>
</template>
    
<script setup lang='ts'>
</script>
    
<style socped>
.e-title {
  font-size: 13px;
  color: #202a34;
  font-weight: 700;
}
</style>