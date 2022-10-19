<template>
  <Tabs v-if="themeConfig.tabs" />
  <el-main>
    <!-- <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="cacheRouter">
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view> -->
    <router-view v-slot="{ Component ,route}">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive v-if="isRouterRefresh">
          <component :is="Component" :key="route.path" ></component>
        </keep-alive>
      </transition>
    </router-view>
  </el-main>

  <!-- <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="cacheRouter" v-if="isRouterRefresh">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main> -->
</template>
    
<script setup lang='ts'>
import { ref, computed, nextTick, provide } from "vue";
import { GlobalStore } from "../../store/index";
import Tabs from "../Tabs/index.vue";

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

// 刷新当前页面
const isRouterRefresh = ref(true);
const refreshCurrentPage = () => {
  isRouterRefresh.value = false;
  nextTick(function () {
    isRouterRefresh.value = true;
  });
};
provide("refresh", refreshCurrentPage);
</script>
    



<style scoped lang="less">
@import "./index.less";
</style>