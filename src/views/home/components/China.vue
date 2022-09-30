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
        </div>
      </el-card>
    </el-col>
    <!-- 文章标签统计 -->
    <el-col :span="8">
      <el-card>
        <div class="e-title">文章标签统计</div>
        <div style="height: 350px" v-loading="loading">
          <tag-cloud style="margin-top: 1.5rem" :data="tagDTOs" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
    
<script setup lang='ts'>
</script>
    
<style socped>
</style>