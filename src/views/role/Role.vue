<template>
  <el-card class="card">
    <div class="title">{{ $route.name }}</div>
    <div class="operation-container">
      <el-button type="primary" :icon="Plus" @click="openMenuModel"
        >新增</el-button
      >
      <el-button type="danger" :icon="(isDelete = true)">批量删除</el-button>
      <div style="margin-left: auto">
        <el-input
          v-model="keywords"
          placeholder="请输入角色名"
          :prefix-icon="Search"
          style="width: 200px"
          clearable
        ></el-input>
        <el-button
          @click="searchRoles"
          :icon="Search"
          type="primary"
          class="button"
          >搜索</el-button
        >
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed type="selection" width="55" />
      <el-table-column prop="roleName" label="角色名" align="center" />
      <el-table-column prop="roleLabel" label="权限标签" align="center">
        <template #default="scope">
          <el-tag>{{ scope.row.roleName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150">
        <template #default="scope">
          <el-icon style="margin-right: 5px"><timer /></el-icon>
          <el-tag>{{ scope.row.roleName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template #default="scope">
          <el-button
            @click="openMenuModel(scope.row)"
            :icon="Edit"
            type="text"
            size="mini"
            >菜单权限</el-button
          >
          <el-button
            @click="openResourceModel(scope.row)"
            :icon="FolderChecked"
            type="text"
            size="mini"
            >资源权限</el-button
          >
          <el-popconfirm
            @confirm="deleteRoles(scope.row.id)"
            title="确定删除吗？"
            style="margin-left: 10px"
          >
            <template #reference>
              <el-button :icon="Delete" type="text" size="mini">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-container"
      background
      @size-change="sizeChange"
      @current-change="currentChange"
      :currentPage="current"
      :page-size="size"
      :total="count"
      :page-sizes="[10, 20, 30]"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </el-card>
</template>
        
<script setup lang='ts'>
import {
  Delete,
  Edit,
  Search,
  FolderChecked,
  Share,
  Upload,
  Plus,
} from "@element-plus/icons-vue";
import { reactive, ref } from "vue-demi";

//新增内容/菜单权限
const openMenuModel = () => {};
//批量删除
const isDelete = reactive(false);

//搜索内容
const keywords = ref("");
const searchRoles = () => {};

//table表格数据
const tableData = [
  {
    roleName: "2016-05-03",
    roleLabel: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
//资源权限
const openResourceModel = () => {};
//删除
const deleteRoles = () => {};

///////////分页数据
const current = ref(4);
const size = ref(10);
const count=ref(10)

const sizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const currentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>
        
<style scoped lang='less'>
@import "./index.less";
</style>