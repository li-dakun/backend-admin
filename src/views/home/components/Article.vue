<template>
  <el-row :gutter="20" style="margin-top: 1.25rem">
    <!-- 文章浏览量排行 -->
    <el-col :span="16">
      <el-card>
        <div class="e-title">文章浏览量排行</div>
        <div style="height: 350px">
          <v-chart :options="ariticleRank" v-loading="loading" />
        </div>
      </el-card>
    </el-col>
    <!-- 分类数据统计 -->
    <el-col :span="8">
      <el-card>
        <div class="e-title">文章分类统计</div>
        <div style="height: 350px">
          <v-chart :options="category" v-loading="loading" />
        </div>
      </el-card>
    </el-col>
  </el-row>
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