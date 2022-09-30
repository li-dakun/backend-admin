<template>
  <el-card class="main-card">
    <div class="title">{{ this.$route.name }}</div>
    <!-- 文章状态 -->
    <div class="article-status-menu">
      <span :style="{ marginRight: '8px' }">状态</span>
      <a-checkable-tag v-model:checked="checked1" @change="handleChange"
        >全部</a-checkable-tag
      >
      <a-checkable-tag v-model:checked="checked2" @change="handleChange"
        >公开</a-checkable-tag
      >
      <a-checkable-tag v-model:checked="checked3" @change="handleChange"
        >私密</a-checkable-tag
      >
      <a-checkable-tag v-model:checked="checked3" @change="handleChange"
        >草稿箱</a-checkable-tag
      >
      <a-checkable-tag v-model:checked="checked3" @change="handleChange"
        >回收站</a-checkable-tag
      >
    </div>
    <!-- 表格操作 -->
    <div class="table">
      <div class="option-box">
        <!-- 文章类型 -->
        <el-select
          size="small"
          v-model="type"
          filterable
          clearable
          placeholder="请选择文章类型"
        >
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- 分类 -->
        <el-select
          size="small"
          v-model="categoryId"
          filterable
          clearable
          placeholder="请选择分类"
        >
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- 标签 -->
        <el-select
          size="small"
          v-model="categoryId"
          filterable
          clearable
          placeholder="请选择标签"
        >
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- 文章名 -->
        <el-input
          size="small"
          v-model="keywords"
          placeholder="请输入文章名"
          style="width: 200px"
          :prefix-icon="Search"
        />
        <el-button
          size="small"
          type="primary"
          :icon="Search"
          style="margin-left: 1rem"
          @click="searchCategory"
        >
          搜索</el-button
        >
        <div class="search">
          <el-button type="danger" size="small" :icon="Delete"
            >批量删除</el-button
          >
          <el-button
            type="primary"
            size="small"
            :icon="Download"
            @click="openModel(null)"
            >批量导出</el-button
          >
          <el-button
            type="primary"
            size="small"
            :icon="Upload"
            @click="openModel(null)"
            >批量导入</el-button
          >
        </div>
      </div>
    </div>
    <!-- 表格展示 -->
    <CommonTable></CommonTable>
    <!-- 分页 -->
    <!-- 批量逻辑删除对话框 -->
    <!-- 批量彻底删除对话框 -->
  </el-card>
</template>
    
<script setup lang='ts'>
import {
  Plus,
  Delete,
  Search,
  InfoFilled,
  Download,
  Upload,
} from "@element-plus/icons-vue";
import { CloudDownloadOutlined } from "@ant-design/icons-vue";
import { reactive, toRefs, ref } from "vue";
import CommonTable from "../../components/Table/CommonTable.vue";

// const state = ref({
//   tags: ["Movies", "Books", "Music", "Sports"],
//   selectedTags: [] as string[],
// });

//状态
const handleChange = (checked: boolean) => {
  console.log(checked);
};
//条件选择器
// 文章类型
const type = ref("");
const types = [
  {
    value: 1,
    label: "原创",
  },
  {
    value: 2,
    label: "转载",
  },
  {
    value: 3,
    label: "翻译",
  },
];
//分类
const categoryId = ref("");
const categories = [
  {
    value: 1,
    label: "原创",
  },
  {
    value: 2,
    label: "转载",
  },
  {
    value: 3,
    label: "翻译",
  },
];
//标签
const tagId = ref("");
const tags = [
  {
    value: 1,
    label: "原创",
  },
  {
    value: 2,
    label: "转载",
  },
  {
    value: 3,
    label: "翻译",
  },
];
//搜索
const keywords = ref("");

//表格操作
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
];
////表格标题展示
const tableHeader=reactive([
  {
    prop: "articleCover",
    fixed: "left",
    label: "文章封面",
    width: "130px",
    align: "center", // 对齐方式
    slot: "avatar",
  },
  {
    prop: "articleTitle",
    fixed: "left",
    label: "标题",
    width: "130px",
    align: "center", // 对齐方式
    slot: "avatar",
  },
  {
    prop: "categoryName",
    fixed: "left",
    label: "分类",
    width: "130px",
    align: "center", // 对齐方式
    slot: "avatar",
  },
  {
    prop: "tagDTOs",
    fixed: "left",
    label: "标签",
    width: "130px",
    align: "center", // 对齐方式
    slot: "avatar",
  },
  {
    prop: "viewsCount",
    fixed: "left",
    label: "浏览量",
    width: "130px",
    align: "center", // 对齐方式
    slot: "avatar",
  },
  {
    prop: "type",
    fixed: "left",
    label: "类型",
    width: "130px",
    align: "center", // 对齐方式
    slot: "avatar",
  },
  {
    prop: "createTime",
    fixed: "left",
    label: "发表时间",
    width: "130px",
    align: "center", // 对齐方式
    slot: "avatar",
  },
  {
    prop: "isTop",
    fixed: "left",
    label: "置顶",
    width: "130px",
    align: "center", // 对齐方式
    slot: "avatar",
  },
  {
    prop: "isFeatured",
    fixed: "left",
    label: "推荐",
    width: "130px",
    align: "center", // 对齐方式
    slot: "avatar",
  },
    {
    fixed: "left",
    label: "操作",
    width: "130px",
    align: "center", // 对齐方式
    slot: "avatar",
  }
])
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

</script>
    
<style lang="less"  scoped>
.article-status-menu {
  font-size: 14px;
  margin-top: 16px;
  color: #999;
}
.table {
  margin-top: 10px;
  .option-box {
    margin-top: 1.5rem;
    .el-select {
      margin-right: 1.5rem;
    }
    .search {
      margin-top: 0.5rem;
    }
  }
  .operation-container {
    display: flex;
    align-items: center;
    // margin-bottom: 1.25rem;
    // margin-top: 1.25rem;
  }
}
.el-table {
  margin-top: 1rem;
}
</style>
    
