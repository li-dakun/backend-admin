<template>
  <div>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      small
      :page-sizes="pageSizesArr"
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="current"
      :page-size="size"
      :total="total"
      :layout="layout"
    />
  </div>
  分页数据展示
</template>
    
<script setup lang='ts'>
import { defineProps, defineEmits, onMounted, reactive } from "vue";

const props = defineProps({
  // 总页数
  total: {
    type: Number,
    // 必传类型
    required: true,
    default: 0,
  },
  // 分页的页容量数组
  pageSizesArr: {
    type: Array,
    default() {
      return [10, 20, 30, 50];
    },
  },
  // 分页的布局
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper",
  },

});

const emits=defineEmits({
    "sizeChange",
    "currentChange"
})
// 页数改变的时候触发的事件
const sizeChange = (val) => {
  emits("sizeChange", val);
};
// 当前页改变的时候触发的事件
const currentChange = (val) => {
  emits("currentChange", val);
};
</script>
    
<style lang="less" scoped>
.pagination {
  float: right;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}
</style>