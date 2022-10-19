<template>
  <el-card class="card">
    <div class="title">{{ $route.name }}</div>
    <el-row>
      <el-empty description="description" />
    </el-row>
    <!-- <div class="title">{{ $route.name }}</div>
    <div class="operation-container">
      <el-button type="primary" :icon="Plus" @click="openModel(null)">
        新建相册
      </el-button>
      <div style="margin-left: auto">
        <el-button
          type="text"
          :icon="Delete"
          style="margin-right: 1rem"
          @click="checkDelete"
        >
          回收站
        </el-button>
        <el-input
          v-model="keywords"
          prefix-icon="el-icon-search"
          placeholder="请输入相册名"
          style="width: 200px"
          clearable
        />
        <el-button
          type="primary"
          :icon="Search"
          style="margin-left: 1rem"
          @click="searchAlbums"
        >
          搜索
        </el-button>
      </div>
    </div>

    <el-row>
      <el-empty description="description" />
    </el-row> -->
  </el-card>
</template>
    
<script setup lang='ts'>
import {
  Delete,
  Plus,
  Edit,
  Search,
  Share,
  Upload,
} from "@element-plus/icons-vue";
import { reactive, ref } from "vue-demi";

//点击添加
const openModel = () => {};
//删除
const checkDelete = () => {};
const keywords = ref("");
//搜索
const searchAlbums = () => {};
//懒加载
const loading = reactive(true);
const albums = reactive([]); //图片数组
const checkPhoto = () => {
  //循环数组中的图像
};
</script>
    
<style lang="less" scoped>
.card {
  min-height: calc(100vh - 120px);
  .el-row {
    flex-wrap: wrap;
    position: relative;
    box-sizing: border-box;
  }
}
</style>