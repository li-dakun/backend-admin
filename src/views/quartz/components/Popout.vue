<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    :before-close="handleClose"
    align-center
  >
  </el-dialog>
</template>
    
<script setup lang='ts'>
import { ref } from "vue-demi";


//弹框的状态
const dialogVisible = ref(false)
//接受父组件传递过来的参数
const openDrawer = (): void => {
  dialogVisible.value = true;
};
////子组件暴露出去
defineExpose({
openDrawer
})
</script>
    
<style>
</style>