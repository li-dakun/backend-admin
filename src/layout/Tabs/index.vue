<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs
        v-model="tabsMenuValue"
        type="card"
        @tab-click="tabClick"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :label="item.name"
          :name="item.path"
          :closable="item.close"
        >
          <template #label>
            <el-icon class="tabs-icon" v-if="item.icon && themeConfig.tabsIcon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.name }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <MoreButton />
    </div>
  </div>
</template>
    
<script setup lang='ts'>
import { get } from "js-cookie";
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TabsStore } from "../../store/modules/tabs";
import { GlobalStore } from "../../store/index";
import MoreButton from "./components/MoreButton.vue";

const route = useRoute();
const router = useRouter();
const tabStore = TabsStore();
const globalStore = GlobalStore();
const tabsMenuList = computed(() => tabStore.tabsMenuList);
const themeConfig = computed(() => globalStore.themeConfig);

const tabsMenuValue = ref(route.path);
// const tabsMenuValue = computed({
//   get: () => {
//     return tabStore.tabsMenuValue;
//   },
//   set: (val) => {
//     tabStore.setTabsMenuValue(val);
//   },
// });

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.path,
  () => {
    tabsMenuValue.value = route.path;
    const params = {
      //   name: route.name as string,
      //   path: route.path,
      //   close: true,
      icon: route.icon as string,
      name: route.name as string,
      path: route.path,
      close: !route.meta.isAffix,
    };
    tabStore.addTabs(params);
  },
  {
    immediate: true,
  }
);

const tabClick = (tabItem: TabsPaneContext) => {
  let path = tabItem.props.name as string;
  router.push(path);
};
const removeTab = (activeTabPath: string) => {
  tabStore.removeTabs(activeTabPath);
};
</script>
    

<style scoped lang="less">
@import "./index.less";
</style>