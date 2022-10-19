<template>
  <el-dropdown trigger="click">
    <el-button size="small" type="primary">
      <span>{{ $t("tabs.more") }}</span>
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="refresh">
          <el-icon><Refresh /></el-icon>{{ $t("tabs.refresh") }}
        </el-dropdown-item>
        <el-dropdown-item @click="closeCurrentTab">
          <el-icon><Remove /></el-icon>{{ $t("tabs.closeCurrent") }}
        </el-dropdown-item>
        <el-dropdown-item @click="closeOtherTab">
          <el-icon><CircleClose /></el-icon>{{ $t("tabs.closeOther") }}
        </el-dropdown-item>
        <el-dropdown-item @click="closeAllTab">
          <el-icon><Delete /></el-icon>{{ $t("tabs.closeAll") }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
    
<script setup lang='ts'>
import { get } from "js-cookie";
import { computed, watch, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TabsStore } from "../../../store/modules/tabs";
import { ElMessage } from "element-plus";
import { HOME_URL, TABS_WHITE_LIST } from "../../../config/config";
const tabStore = TabsStore();

const reload: Function = inject("refresh") as Function;
//刷新
const refresh = () => {
  ElMessage({ type: "success", message: "刷新当前页面 🚀" });
  reload();
};
// 关闭当前
const closeCurrentTab = () => {
  if (tabStore.tabsMenuValue === HOME_URL) return;
  tabStore.removeTabs(tabStore.tabsMenuValue);
};

// 关闭其他
const closeOtherTab = () => {
  tabStore.closeMultipleTab(tabStore.tabsMenuValue);
};

// 全部关闭
const closeAllTab = () => {
  tabStore.closeMultipleTab();
  tabStore.goHome();
};
</script>
    
<style scoped lang="less">
@import "../index.less";
</style>