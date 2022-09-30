<template>
  <Tabs />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <!-- <keep-alive :include="cacheRouter">
							<component :is="Component" :key="route.path"></component>
						</keep-alive> -->
        <keep-alive :include="cacheRouter">
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
  </el-main>

  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="cacheRouter" v-if="isRouterRefresh">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>
    
<script setup lang='ts'>
import { ref, computed, nextTick, provide } from "vue";

import Tabs from "../Tabs/index.vue";
</script>
    
<style scoped lang="less">
@import "./index.less";
</style>