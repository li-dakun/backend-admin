<template>
  <div class="card content-box">
    <div class="title">{{ $route.name }}</div>
    <div class="operation-container">
      <el-button type="primary" :icon="Plus" @click="openMenuModel"
        >新增</el-button
      >
      <el-button type="danger" :icon="Delete">批量删除</el-button>
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
    <ProTable ref="proTable" :columns="columns" :dataCallback="dataCallback">
      <template #createTime="scope">
        <div>
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px"> {{ scope.row.createTime }}</span>
        </div>
      </template>
    </ProTable>
    <DialogVisible ref="dialogVisible" :initParam="initParam" />
  </div>
</template>
  
<script setup lang='ts'>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  Plus,
  Timer,
} from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import ProTable from "../../components/Table/index.vue";
import DialogVisible from "./components/DialogVisible.vue";
import { log } from "console";
//定义数据信息/属性值
const initParam = reactive<any>({
  isDelete: false,
  loading: true,
  addOrEdit: false,
  keywords: null,
  categoryIds: [],
  categories: [],
  categoryForm: {
    // id: null,
    categoryName: "",
  },
  current: 1,
  size: 10,
  count: 0,
});
// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();
// 表格头部配置项
const columns: Partial<ColumnProps>[] = [
  { type: "selection", width: 55, fixed: "left" },
  { prop: "categoryName", label: "分类名", align: "center" },
  { prop: "articleCount", label: "文章量", align: "center" },
  { prop: "createTime", label: "创建时间", align: "center" },
  { prop: "operation", label: "操作", width: 330 },
];
/**
 * 表格数据
 */
const dataCallback = (data: any) => {
  return {
    datalist: data.datalist,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
  };
};
// const listCategories = () => {
//   axios.get('/api/admin/categories').then(({ data })) => {
//     console.log(data);
    
//   });
// };

/**
 * 新增、弹框新增
 */
const dialogVisible = ref();
const openMenuModel = () => {
  dialogVisible.value.openMenuModel();
};
</script>
  

<style scoped lang="less">
@import "./index.less";
</style>