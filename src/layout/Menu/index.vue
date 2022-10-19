<template>
  <div class="menu" :style="{ width: isCollapse ? '65px' : '220px' }">
    <el-scrollbar>
      <el-menu
        class="side-nav-bar"
        :router="true"
        :collapse="isCollapse"
        :default-active="activeMenu"
        :collapse-transition="false"
        :unique-opened="true"
        background-color="#304156"
        text-color="#BFCBD9"
        active-text-color="#409EFF"
      >
        <!-- <SideBar :menuList="menuList" /> -->

        <template v-for="item of router.options.routes" :key="item.path">
          <!-- 二级菜单 -->
          <template v-if="item.name && item.children && !item.hidden">
            <el-sub-menu :key="item.path" :index="item.path">
              <!-- 二级菜单标题 -->
              <template #title>
                <el-icon>
                  <component :is="item.icon" />
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
              <!-- 二级菜单选项 -->
              <template v-for="(item, index) of item.children" :key="index">
                <el-menu-item
                  v-if="!item.hidden"
                  :key="index"
                  :index="item.path"
                >
                  <el-icon>
                    <component :is="item.meta.icon" />
                  </el-icon>
                  <span>{{ item.name }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <!-- 一级菜单 -->
          <template v-else-if="!item.hidden">
            <el-menu-item :index="item.path" :key="item.path">
              <el-icon>
                <component :is="item.children[0].meta.icon" />
              </el-icon>
              <span>{{ item.children[0].name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
    
<script setup lang='ts'>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { MenuStore } from "../../store/modules/menu";
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

const router = useRouter();
const { meta, path } = router;
</script>
    
<style scoped lang="less">
@import "./index.less";
</style>