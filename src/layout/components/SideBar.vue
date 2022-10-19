<template>
  <el-menu
      class="side-nav-bar"
      :router="true"
      :collapse="isCollapse"
      :default-active="route.path"
      background-color="#304156"
      text-color="#BFCBD9"
      active-text-color="#409EFF"
  >
        <template v-for="item of router.options.routes" :key="item.path">
<!--    <template v-for="item of tabStore.userMenus" :key="item.path">-->
      <!-- 二级菜单 -->
      <template v-if="item.name && item.children && !item.hidden">
        <el-sub-menu :key="item.path" :index="item.path">
          <!-- 二级菜单标题 -->
          <template #title>
            <el-icon>
              <component :is="item.icon"/>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <!-- 二级菜单选项 -->
          <template v-for="(item, index) of item.children" :key="index">
            <el-menu-item v-if="!item.hidden" :key="index" :index="item.path">
              <el-icon>
                <component :is="item.meta.icon"/>
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
            <component :is="item.children[0].meta.icon"/>
          </el-icon>
          <span>{{ item.children[0].name }}</span>
        </el-menu-item>
      </template>
    </template>

    <!-- <template v-for="route of router.options.routes" :key="route.path">
      <el-menu-item v-if="!route.children" :index="route.path">
        <el-icon>
          <component :is="route.icon" />
        </el-icon>
        <span>{{ route.name }}</span>
      </el-menu-item>
      <el-sub-menu v-else :index="route.path">
        <template #title>
          <el-icon>
            <component :is="route.icon" />
          </el-icon>
          <span>{{ route.name }}</span>
        </template>
        <el-menu-item
          v-for="subRoute in route.children"
          :key="subRoute.path"
          :index="subRoute.path"
        >
          <el-icon>
            <component :is="subRoute.icon" />
          </el-icon>
          <span>{{ subRoute.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template> -->
  </el-menu>
</template>

<script setup lang='ts'>

import {ref, computed, onMounted} from "vue";
import {useRouter, useRoute} from "vue-router";
import useTabStore from "../../store/modules/tab";
// import routes from "../../router/index.ts";

const route = useRoute();
const router = useRouter();
const tabStore = useTabStore();

// const path = route.currentRoute;
// console.log(route.currentRoute);

// 菜单加载 loading
// const loading = ref(false);

// onMounted(async () => {
//   try {
//   } finally {
//     // 获取菜单列表
//     loading.value = true;
//   }
// });
const {meta, path} = route;
const activeMenu = computed(() => {
  route.path;
});
const isCollapse = computed((): boolean => tabStore.collapse);
const userMenus = () => tabStore.userMenus;
// const menuList = computed((): any[] => tabStore.userMenuList);
// const routeList = computed(() => {
//   routes.filter((el) => el.children).map((el) => el.children[0]);
// });
// const routeList = computed(
//   () => (router.options.routes as any).find((item: any) => item.path === "/").children[0]
// );
// console.log(route);
// console.log(router.options.routes);

// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
</script>

<style scoped>
.side-nav-bar:not(.el-menu--collapse) {
  width: 210px;
}

.side-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.side-nav-bar i {
  margin-right: 1rem;
}

*::-webkit-scrollbar {
  width: 0.5rem;
  height: 1px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background-color: rgba(144, 147, 153, 0.3);
}
</style>