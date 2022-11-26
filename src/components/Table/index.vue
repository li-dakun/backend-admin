<template>
  <div class="card table">
    <!-- 表格主体 -->
    <el-table
      ref="tableRef"
      :data="tableData"
      :border="border"
      @selection-change="selectionChange"
      :row-key="getRowKeys"
      :stripe="stripe"
      :tree-props="{ children: childrenName }"
    >
      <template v-for="item in tableColumns" :key="item">
        <!-- selection || index -->
        <el-table-column
          v-if="item.type == 'selection' || item.type == 'index'"
          :type="item.type"
          :reserve-selection="item.type == 'selection'"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :align="item.align ?? 'center'"
        >
        </el-table-column>
        <!-- expand（展开自定义详细信息，请使用作用域插槽） -->
        <el-table-column
          v-if="item.type == 'expand'"
          :type="item.type"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :align="item.align ?? 'center'"
          v-slot="scope"
        >
          <slot :name="item.type" :row="scope.row"></slot>
        </el-table-column>
        <!-- other -->
        <el-table-column
          v-if="!item.type && item.prop && item.isShow"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.prop !== 'operation'"
          :resizable="true"
          :fixed="item.fixed"
          :align="item.align ?? 'center'"
        >
          <!-- 自定义 header (使用组件渲染 tsx 语法) -->
          <template #header v-if="item.renderHeader">
            <component :is="item.renderHeader" :row="item"> </component>
          </template>

          <!-- 自定义配置每一列 slot（使用作用域插槽） -->
          <template #default:scope>
            <slot :name="item.prop" :row="scope.row">
              <!-- tag 标签（自带格式化内容） -->
              <el-tag
                v-if="item.tag"
                :type="
                  filterEnum(
                    scope.row[item.prop],
                    item.enum,
                    item.searchProps,
                    'tag'
                  )
                "
              >
                {{
                  item.enum?.length
                    ? filterEnum(
                        scope.row[item.prop],
                        item.enum,
                        item.searchProps
                      )
                    : formatValue(scope.row[item.prop])
                }}
              </el-tag>
              <!-- 文字（自带格式化内容） -->
              <span v-else>
                {{
                  item.enum?.length
                    ? filterEnum(
                        scope.row[item.prop],
                        item.enum,
                        item.searchProps
                      )
                    : formatValue(scope.row[item.prop])
                }}
              </span>
            </slot>
          </template>
        </el-table-column>
      </template>

      <template #empty>
        <div class="table-empty">
          <img src="../../assets/images/notData.png" alt="notData" />
          <div>暂无数据</div>
        </div>
      </template>
    </el-table>
    <!-- 分页组件 -->
    <Pagination
      v-if="pagination"
      :pageable="pageable"
      :handleSizeChange="handleSizeChange"
      :handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>
    
<script setup lang='ts' name="proTable">
import { ref, watch, computed } from "vue";
import { ElTable } from "element-plus";
import { useTable } from "../../hooks/useTable";
import { useSelection } from "../../hooks/useSelection";
import { Refresh, Printer, Operation, Search } from "@element-plus/icons-vue";
import { ColumnProps } from "./interface/index";
import { filterEnum, formatValue } from "../../utils/util";
import Pagination from "./components/Pagination.vue";
import printJS from "print-js";


interface ProTableProps {
	columns: Partial<ColumnProps>[]; // 列配置项
	requestApi: (params: any) => Promise<any>; // 请求表格数据的api ==> 必传
	dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理
	pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
	initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}，必须是 reactive 包裹的）
	border?: boolean; // 表格是否显示边框 ==> 非必传（默认为true）
	stripe?: boolean; // 是否带斑马纹表格 ==> 非必传（默认为false）
	toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
	childrenName?: string; // 当数据存在 children 时，指定 children key 名字 ==> 非必传（默认为"children"）
	selectId?: string; // 当表格可以多选时，所指定的 id ==> 非必传（默认为 id）
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
	columns: () => [],
	pagination: true,
	initParam: {},
	border: true,
	stripe: false,
	toolButton: true,
	childrenName: "children",
	selectId: "id"
});

// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof ElTable>>();
// 表格多选 Hooks
const { selectionChange, getRowKeys, selectedList, selectedListIds, isSelected } = useSelection(props.selectId);
// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection();

// 表格操作 Hooks
const { tableData, pageable, searchParam, searchInitParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
	useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback);

// 监听页面 initParam 改化，重新获取表格数据
watch(
	() => props.initParam,
	() => {
		getTableList();
	},
	{ deep: true }
);

// 表格列配置项处理（添加 isShow 属性，控制显示/隐藏）
const tableColumns = ref<Partial<ColumnProps>[]>();
tableColumns.value = props.columns.map(item => {
	return {
		...item,
		isShow: item.isShow ?? true
	};
});

// 如果当前 enum 为后台数据 需要请求数据，则调用该请求接口，获取enum数据
tableColumns.value.forEach(async item => {
	if (item.enum && typeof item.enum === "function") {
		const { data } = await item.enum();
		item.enum = data;
	}
});

// 过滤需要搜索的配置项
const searchColumns = tableColumns.value.filter(item => item.search);
// 设置搜索表单的默认值
searchColumns.forEach(column => {
	if (column.searchInitParam !== undefined && column.searchInitParam !== null) {
		searchInitParam.value[column.prop!] = column.searchInitParam;
	}
});

// // 列设置
// const colRef = ref();
// // 过滤掉不需要设置显隐的列
// const colSetting = tableColumns.value.filter((item: Partial<ColumnProps>) => {
// 	return (
// 		item.type !== "selection" &&
// 		item.type !== "index" &&
// 		item.type !== "expand" &&
// 		item.prop !== "operation" &&
// 		item.isShow !== false
// 	);
// });
// const openColSetting = () => {
// 	colRef.value.openColSetting();
// };

// 处理打印数据（把后台返回的字典值根据 enum 做转换）
const printData = computed(() => {
	let printDataList = JSON.parse(JSON.stringify(selectedList.value.length ? selectedList.value : tableData.value));
	let colEnumList = colSetting.filter(item => item.enum);
	colEnumList.forEach(colItem => {
		printDataList.forEach((tableItem: any) => {
			tableItem[colItem.prop!] = filterEnum(tableItem[colItem.prop!], colItem.enum, colItem.searchProps);
		});
	});
	return printDataList;
});

// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({ searchParam, getTableList, clearSelection });
</script>

    
<style lang="less" socped>
</style>