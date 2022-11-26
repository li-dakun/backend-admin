<template>
  <!-- 用户选项 -->
  <el-dropdown @command="handleCommand">
    <el-avatar :size="50" :src="circleUrl" />
    <template v-slot:dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="setting"
          ><el-icon><Avatar /></el-icon>个人中心</el-dropdown-item
        >
        <el-dropdown-item command="logout">
          <el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
    
<script setup lang='ts'>
import { reactive, toRefs } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";

const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  squareUrl:
    "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
  sizeList: ["small", "", "large"] as const,
});

const handleCommand = (command) => {
  if (command == "setting") {
    // this.$router.push({ path: "/setting" });
  }
  if (command == "logout") {
    ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(() => {
		// router.push({ name: "login" });
		// globalStore.setToken("");
		ElMessage({
			type: "success",
			message: "退出登录成功！"
		});
	});
    // // 调用注销接口
    // this.axios.post("/api/users/logout").then(({ data }) => {
    //   // 清空用户信息
    //   this.$store.commit("logout");
    //   this.$store.commit("resetTab");
    //   // 清空用户菜单
    //   resetRouter();
    //   this.$router.push({ path: "/login" });
    // });
  }
};
</script>
    

<style scoped lang="less">
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
