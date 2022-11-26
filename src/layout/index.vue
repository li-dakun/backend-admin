<template>
  <el-container class="layout-vertical">
    <!-- 侧边栏 -->
    <el-aside>
      <Menu />
    </el-aside>
    <el-container>
      <!-- 导航栏 -->
      <el-header>
        <HeaderLeft/>
        <HeaderRight/>
      </el-header>
      <!-- 内容 -->
      <Main/>
    </el-container>
  </el-container>
</template>
    
<script setup lang='ts'>
import { computed } from "vue";
import Menu from "./Menu/index.vue";
import HeaderLeft from './Header/HeaderLeft.vue';
import HeaderRight from './Header/HeaderRight.vue';
import Main from './Main/index.vue';

// import NavBar from "./components/NavBar.vue";
// import SideBar from "./components/SideBar.vue";
// import useTabStore from "../store/modules/tab";
// const tabStore = useTabStore();
// const isHide = computed(() => (tabStore.collapse ? "hideSideBar" : ""));
</script>
    
<style scoped lang="less">
@import "./index.less";

.vertical {
  .el-menu,
  .el-menu--popup {
    .el-menu-item {
      &.is-active {
        background: #060708;
        &::before {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 4px;
          content: "";
          background: var(--el-color-primary);
        }
      }
    }
  }
}
</style>