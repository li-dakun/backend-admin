<template>
  <Tabs v-if="themeConfig.tabs" />
  <el-main>
    <!-- <div class="fade-transform-box">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="$route.fullPath" />
      </transition>
    </div> -->
    <!-- <router-view>

    </router-view> -->

    <router-view v-slot="{ Component, route }">
			<transition appear name="fade-transform" mode="out-in">
				<keep-alive :include="menuStore.keepAliveRouterGet" v-if="isRouterRefresh">
					<component :is="Component" :key="route.path" />
				</keep-alive>
			</transition>
		</router-view>
  </el-main>
</template>
    
<script setup lang='ts'>
import { ref, computed, nextTick, provide, onBeforeUnmount } from "vue";
import { GlobalStore } from "../../store/index";
import Tabs from "../Tabs/index.vue";
import { MenuStore } from "../../store/modules/menu";

const menuStore = MenuStore();
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);
// 刷新当前页面
const isRouterRefresh = ref(true);
const refreshCurrentPage = () => {
  isRouterRefresh.value = false;
  nextTick(function () {
    isRouterRefresh.value = true;
  });
};
provide("refresh", refreshCurrentPage);

// 监听窗口大小变化，折叠侧边栏
// const screenWidth = ref<number>(0);
// const listeningWindow = () => {
//   screenWidth.value = document.body.clientWidth;
//   if (!isCollapse.value && screenWidth.value < 1200)
//     globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: true });
//   if (isCollapse.value && screenWidth.value > 1200)
//     globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: false });
// };
// window.addEventListener("resize", listeningWindow);
// onBeforeUnmount(() => {
//   window.removeEventListener("resize", listeningWindow);
// });
</script>
    



<style scoped lang="less">
@import "./index.less";
</style>