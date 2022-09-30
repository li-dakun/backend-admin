<template>
  <!-- <div
    class="menu"
    :style="{ width: isCollapse ? '65px' : '220px' }"
    v-loading="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="loadingSvg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.01)"
  > -->
  <div class="menu" :style="{ width: isCollapse ? '65px' : '220px' }">
    <el-menu
      class="side-nav-bar"
      :router="true"
      :collapse="isCollapse"
      :default-active="activeMenu"
      :collapse-transition="false"
      :unique-opened="true"
      background-color="#191a20"
      text-color="#bdbdc0"
      active-text-color="#ffffff"
    >
      <SideBar :menuList="menuList" />
    </el-menu>
  </div>
</template>
    
<script setup lang='ts'>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import MenuStore from "../../stores/modules/menu";
import AuthStore from "../../stores/modules/auth";
import SideBar from "./components/SideBar.vue";

const route = useRoute();
const menuStore = MenuStore();

const activeMenu = computed((): string => route.path);
const isCollapse = computed((): boolean => menuStore.isCollapse);
const menuList = computed((): Menu.MenuOptions[] => menuStore.menuList);

// aside 自适应
const screenWidth = ref<number>(0);
// 监听窗口大小变化，合并 aside
const listeningWindow = () => {
  window.onresize = () => {
    return (() => {
      screenWidth.value = document.body.clientWidth;
      if (isCollapse.value === false && screenWidth.value < 1200)
        menuStore.setCollapse();
      if (isCollapse.value === true && screenWidth.value > 1200)
        menuStore.setCollapse();
    })();
  };
};
listeningWindow();
</script>
    
<style scoped lang="less">
@import "./index.less";
</style>