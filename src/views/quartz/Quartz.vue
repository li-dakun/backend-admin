<template>
  <div class="card content-box">
    <div class="title">{{ $route.name }}</div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="任务名称" prop="jobName">
        <el-input
          v-model="searchParams"
          placeholder="请输入任务名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="任务组名" prop="jobGroup">
        <el-select
          v-model="searchParams"
          placeholder="请选择任务组名"
          clearable
        >
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务状态">
        <el-select
          v-model="searchParams"
          placeholder="请选择任务状态"
          clearable
        >
          <el-option label="正常" value="shanghai" />
          <el-option label="暂停" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="Refresh">重置</el-button>
        <el-button icon="Search" type="primary">搜索</el-button>
        <!-- <el-button type="primary" @click="onSubmit">Query</el-button> -->
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="tableTop">
      <el-col :span="1.5">
        <el-button type="primary" :icon="Plus" @click="openPopout"
          >新增</el-button
        >
        <el-button type="info" :icon="PieChart">日志</el-button>
        <el-button @click="init" type="danger" :icon="Delete"
          >批量删除</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格分页展示 -->
    <ProTable ref="proTable" :columns="columns"></ProTable>

    <!-- 点击新增 -->
    <Popout ref="drawerRef" />
  </div>
</template>
    
<script setup lang='ts'>
import { ref, reactive } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import {
  CirclePlus,
  Search,
  Delete,
  EditPen,
  Download,
  Upload,
  View,
  Refresh,
  Plus,
  PieChart,
} from "@element-plus/icons-vue";
import ProTable from "../../components/Table/index.vue";
import Popout from "./components/Popout.vue";
import { log } from "console";

////定义数据信息/属性值
const initParam = reactive<any>({
  job: {},
  copyJob: {},
  title: "",
  loading: true,
  isDelete: false,
  current: 1,
  size: 10,
  count: 0,
  dialogFormVisible: false,
  openCron: false,
  expression: "",
  openView: false,
  editOrUpdate: true, // true: 编辑 false: 新增
  searchParams: {},
  jobGroups: [],
  jobs: [],
  jobIds: [],
  rules: {
    jobName: [{ required: true, message: "任务名称不能为空", trigger: "blur" }],
    invokeTarget: [
      { required: true, message: "调用目标字符串不能为空", trigger: "blur" },
    ],
    cronExpression: [
      { required: true, message: "cron执行表达式不能为空", trigger: "blur" },
    ],
  },
});

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();
// 表格配置项
const columns: Partial<ColumnProps>[] = [
  { type: "selection", width: 55, fixed: "left" },
  { prop: "jobName", label: "任务名称", width: 160, align: "center" },
  { prop: "jobGroup", label: "任务组名", width: 120, align: "center" },
  {
    prop: "invokeTarget",
    label: "调用目标字符串",
    width: 180,
    align: "center",
  },
  {
    prop: "cronExpression",
    label: "cron执行表达式",
    width: 180,
    align: "center",
  },
  { prop: "status", label: "状态", width: 80, align: "center" },
  { prop: "createTime", label: "创建时间", width: 160, align: "center" },
  { prop: "comment", label: "备注", width: 160, align: "center" },
  {
    prop: "operation",
    label: "操作",
    width: 280,
    align: "center",
    fixed: "right",
  },
];

//新增数据
const drawerRef = ref();
const openPopout = () => {
  drawerRef.value.openDrawer();
  console.log(1111);
};

////api接口
const init = () => {
  axios.get("/api/admin/jobs").then((data) => {
    console.log(data);
  });
};
</script>

    


<style scoped lang="less">
@import "./index.less";
</style>
    