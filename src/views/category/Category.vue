<template>
  <el-card class="main-card">
    <!-- 标题 -->
    <div class="title">{{ $route.name }}</div>
    <!-- 表格操作 -->
    <div class="operation-container">
      <el-button type="primary" :icon="Plus" @click="openModel(null)"
        >新增</el-button
      >
      <el-button type="danger" :icon="Delete">批量删除</el-button>
      <div style="margin-left: auto">
        <el-input
          v-model="keyword"
          placeholder="请输入分类名"
          style="width: 200px"
          :prefix-icon="Search"
        />
        <el-button
          type="primary"
          :icon="Search"
          style="margin-left: 1rem"
          @click="searchCategory"
        >
          搜索</el-button
        >
      </div>
    </div>
    <!-- 表格展示 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="categoryName" label="分类名" align="center">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.classname }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="articleCount" label="文章量" align="center">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.total }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template #default="scope">
          <el-button type="primary" @click="openModel(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="Are you sure to delete this?"
            @confirm="confirmEvent"
            @cancel="cancelEvent"
          >
            <template #reference>
              <el-button
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination-container"
      small
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="current"
      :page-size="size"
      :total="count"
      :page-sizes="[10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
    />

    <!--编辑对话框-->
    <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
      <span>It's a draggable Dialog</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 批量删除对话框 -->
  </el-card>
</template>
    
<script setup lang='ts'>
import { Plus, Delete, Search, InfoFilled } from "@element-plus/icons-vue";
import { ref } from "vue-demi";

interface User {
  date: string;
  name: string;
  address: string;
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData: User[] = [
  {
    classname: "java",
    total: 4,
    date: "2016-05-03",
    address: "No. 189, Grove St, Los Angeles",
  },
];

//搜索框
const keyword = ref("");

//新增、编辑对话框
const confirmEvent = () => {
  console.log("confirm!");
};
const cancelEvent = () => {
  console.log("cancel!");
};
const openModel = () => {};

const dialogVisible = ref(false);



// 分页数据展示
const current=ref(1);
const size=ref(10);
const count=ref(0);
const sizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const currentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
    
<style  scoped>
</style>
    
