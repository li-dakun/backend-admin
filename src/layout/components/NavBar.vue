<template>
  <div>
    <!-- 导航栏 -->
    <div class="nav-bar">
      <!-- 折叠按钮 -->
      <div class="hambuger-container">
        <!-- <i :class="isCollapse ? 'expand' : 'fold'" /> -->
        <el-icon class="collapse-icon" @click="tabStore.setCollapse()">
          <component :is="isCollapse ? 'expand' : 'fold'"></component>
        </el-icon>
      </div>
      <!--面包屑-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in breadcrumbList"
          :key="item.path"
          :to="item.path"
          >{{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 右侧菜单 -->
      <div class="right-menu">
        <!-- 全屏按钮 -->
        <div class="screen-full" @click="fullScreen">
          <i class="iconfont el-icon-myicwindowzoom48px" />
        </div>
        <!-- 用户选项 -->
        <el-dropdown @command="handleCommand">
<!--          <el-avatar :size="40" :src="userStore.avatar" />-->
          <el-avatar :size="40" :src="tabStore.updateAvatar" />
          <i class="el-icon-caret-bottom" />
          <el-dropdown-menu slot:dropdown>
            <el-dropdown-item command="setting">
              <i class="el-icon-s-custom" />个人中心
            </el-dropdown-item>
            <el-dropdown-item command="logout" divided>
              <i class="iconfont el-icon-mytuichu" />退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 历史标签栏 -->
    <div class="tabs-view-container">
      <div class="tabs-wrapper">
        <el-tag
          v-for="item of tabStore.tabList"
          :key="item.path"
          :closable="item.name !== '首页'"
          :effect="route.path === item.path ? 'dark' : 'plain'"
          @click="goTo(item)"
        >
          {{ item.name }}
          <i
            class="el-icon-close"
            v-if="item.path != '/'"
            @click.stop="removeTab(item)"
          />
        </el-tag>
      </div>
      <div class="tabs-close-item" style="float: right" @click="closeAllTab">
        全部关闭
      </div>
    </div>
  </div>
</template>
    
<script setup lang='ts'>
import { computed,onMounted, reactive, ref } from "vue-demi";
import { useRouter, useRoute } from "vue-router";
import axios from 'axios'
import useTabStore from "../../store/modules/tab";
import  resetRouter  from '../../router/index'
const route = useRoute();
const router = useRouter();
const tabStore = useTabStore();

/////折叠按钮
const trigger = () => tabStore.setCollapse;
const isCollapse = computed(():  boolean => tabStore.collapse);

let breadcrumbList = reactive([]);
//导航按钮
const getBreadCrumb = () => {
};
onMounted(()=>{
// filter把符合条件的过滤出来，item.name==true
  let matched:any = route.matched.filter((item) => item.name);
  const first = matched[0];
  if (first && first.name !== "首页") {
    // 添加首页进去
    matched = [{ path: "/", name: "首页" }].concat(matched);
  }
  breadcrumbList = matched;
  //保存当前页标签
  tabStore.saveTab(route);
  // this.$store.commit('saveTab', this.$route)
});
////全屏设置
const isFullscreen = ref(false);
const isSupport = document.fullscreenEnabled;
const handleFullscreenchange = () => {
  if (isSupport) {
    document.fullscreenElement
      ? (isFullscreen.value = true)
      : (isFullscreen.value = false);
  }
};
const fullScreen = () => {
  if (isSupport) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      isFullscreen.value = false;
    } else {
      // 这里选择将html元素全屏展示，也可以选择其它元素
      document.documentElement.requestFullscreen();
      isFullscreen.value = true;
    }
  }
};

const handleCommand = (command: string) => {
  if (command == "setting") {
    router.push({ path: "/setting" });
  }
  if (command == "logout") {
    // 后端接口
    // 调用注销接口
    axios.post('/api/users/logout').then(({ data }) => {
      // 清空用户信息
      tabStore.logout();
      tabStore.resetTab();
      // this.$store.commit('logout')
      // this.$store.commit('resetTab')
      // 清空用户菜单
      resetRouter();
      router.push({ path: '/login' })
    })
  }
};

// const isActive = computed((tab) => {
//   if (tab.path === router.path) {
//     return "tabs-view-item-active";
//   }
//   return "tabs-view-item";
// });
//跳转标签
const goTo = (tab: { path: any; }) => router.push({ path: tab.path });
const removeTab = (tab: { path: string; }) => {
  //删除标签
  tabStore.removeTab(tab);
  // tabStore.commit("removeTab", tab);
  //如果删除的是当前页则返回上一标签页
  if (tab.path == route.path) {
    var tabList = tabStore.tabList;
    router.push({ path: tabList[tabList.length - 1].path });
  }
};
const closeAllTab = () => {
  tabStore.resetTab();
  // router.push({ path: "/" });
};
</script>
    
<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 30px;
  height: 50px;
}
.hambuger-container {
  font-size: 1.25rem;
  cursor: pointer;
  margin-right: 24px;
}

.right-menu {
  margin-left: auto;
  display: flex;
  align-items: center;
}
.tabs-view-container {
  /* display: flex;
  position: relative;
  padding: 3px 0 3px 10px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%); */
  display: flex;
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  height: 33px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.tabs-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 95%;
}
.tabs-container .el-tag {
  /* font-size: 13px;
  margin-right: 30px;
  cursor: pointer; */
  display: inline-block;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 5px;
}
.el-tag__content {
  display: inline-block;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  padding: 0 8px;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 5px;
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}
.screen-full {
  cursor: pointer;
  margin-right: 1rem;
  font-size: 1.25rem;
}
.tabs-close-item {
  /* position: absolute;
  height: 32px;
  font-size: 13px;
  right: 10px; */
  position: absolute;
  right: 10px;
  display: inline-block;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 5px;
}
</style>