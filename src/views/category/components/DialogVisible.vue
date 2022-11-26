<template>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%">
    <!-- <div class="dialog-title-container" slot="title" ref="categoryTitle" /> -->
    <el-from
      ref="ruleFormRef"
      :rules="rules"
      label-width="160px"
      :model="props.initParam.categoryForm"
    >
      <el-form-item label="分类名" prop="categoryName">
        <el-input
          v-model="props.initParam.categoryForm.categoryName"
          style="width: 220px"
          autocomplete="off"
          placeholder="请输入分类名"
        />
      </el-form-item>
    </el-from>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addOrEditCategory"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
    
<script setup lang='ts'>
import { ref, reactive, computed, defineExpose } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import axios from "axios";
import { log } from "console";
const rules = reactive({
  categoryName: [
    { required: true, message: "文章分类不能为空", trigger: "change" },
  ],
});

interface DrawerProps {
  initParam?: any;
}
////弹框状态
const dialogVisible = ref<boolean>(false);
//接受父组件传递过来的参数
const openMenuModel = () => {
  dialogVisible.value = true;
};
//接收父组件参数
const props = withDefaults(defineProps<DrawerProps>(), {
  initParam: {},
});
/**
 * 新增
 */
// const ruleFormRef = ref<FormInstance>();
const ruleFormRef = ref<FormInstance>();
const addOrEditCategory = () => {
  if (props.initParam.categoryForm.categoryName == "") {
    ElMessage({
      showClose: true,
      message: "分类名不能为空",
      type: "error",
    });
    return false;
  }
  axios
    .post("/api/admin/categories", props.initParam.categoryForm)
    .then(({ data }) => {
      if (data.flag) {
        dialogVisible.value = false;
        ElMessage({
          showClose: true,
          message: "添加成功",
          type: "success",
        });
      } else {
        ElMessage({
          showClose: true,
          message: "添加失败",
          type: "error",
        });
      }
    });
};

//暴露给父组件
defineExpose({
  openMenuModel,
});
</script>
    



<style scoped>
.el-form-item {
  display: flex;
  font-size: 14px;
  /* margin-bottom: 18px;
  margin-left: 30px; */
  margin: 30px 0 20px 30px;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>