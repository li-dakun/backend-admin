<template>
  <div class="card content-box">
    <div class="title">{{ $route.name }}</div>
    <ProTable
      ref="proTable"
      :columns="columns"
      :initParam="initParam"
      :dataCallback="dataCallback"
    >
	<!-- <template #isFeatured="scope">
		<el-switch active-color="#13ce66"
            inactive-color="#F4F4F5"/>
	</template> -->
    <!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
			</template>
    </ProTable>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import {
  CirclePlus,
  Delete,
  EditPen,
  Download,
  Upload,
  View,
  Refresh,
} from "@element-plus/icons-vue";
import ProTable from "../../components/Table/index.vue";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();
// 表格配置项
const columns: Partial<ColumnProps>[] = [
  // { type: "selection", width: 80, fixed: "left" },
	// { type: "index", label: "#", width: 80 },
	// { type: "expand", label: "Expand", width: 100 },
	// { prop: "username", label: "用户姓名", width: 130, search: true,renderHeader },
	// // 😄 enum 可以直接是数组对象，也可以是请求方法(proTable 内部会执行获取 enum 的这个方法)，下面用户状态也同理
	// // 😄 enum 为请求方法时，后台返回的数组对象 key 值不是 label 和 value 的情况，可以在 searchProps 中指定 label 和 value 的 key 值
	// {
	// 	prop: "gender",
	// 	label: "性别",
	// 	width: 120,
	// 	sortable: true,
	// 	search: true,
	// 	searchType: "select",
	// 	searchProps: { label: "genderLabel", value: "genderValue" }
	// },
	// { prop: "idCard", label: "身份证号", search: true },
	// { prop: "email", label: "邮箱", search: true },
	// { prop: "address", label: "居住地址", search: true },
	// {
	// 	prop: "status",
	// 	label: "用户状态",
	// 	sortable: true,
	// 	search: true,
	// 	searchType: "select",
	// 	searchProps: { label: "userLabel", value: "userStatus" }
	// },
	// {
	// 	prop: "createTime",
	// 	label: "创建时间",
	// 	width: 200,
	// 	sortable: true,
	// 	search: true,
	// 	searchType: "datetimerange",
	// 	searchProps: {
	// 		disabledDate: (time: Date) => time.getTime() < Date.now() - 8.64e7
	// 	},
	// 	searchInitParam: ["2022-09-30 00:00:00", "2022-09-20 23:59:59"]
	// },
	// { prop: "operation", label: "操作", width: 330, fixed: "right", renderHeader }

  { type: "selection", width: 55, fixed: "left" },
  { prop: "articleCover", label: "文章封面", width: 180, align: "center" },
  { prop: "articleTitle", label: "标题", width: 160 },
  { prop: "categoryName", label: "分类", width: 140 },
  { prop: "tagDTOs", label: "标签", width: 140 },
  { prop: "viewsCount", label: "浏览量", width: 100 },
  { prop: "type", label: "类型", width: 100 },
  { prop: "createTime", label: "发布时间", width: 160 },
  { prop: "isTop", label: "置顶", width: 120 },
  { prop: "isFeatured", label: "推荐", width: 120 },
  { prop: "operation", label: "操作", width: 330, fixed: "right" }
];
</script>
  
<style scoped lang="less">
@import "./index.less";
</style>