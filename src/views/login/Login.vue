<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">管理员登录</div>
      <!------------------------------登录表单--------------------------------->
      <el-form
        ref="ruleFormRef"
        :model="loginForm"
        status-icon
        class="login-form"
        :rules="loginRules"
      >
        <!--用户名输入框-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名">
            <template #prefix
              ><el-icon class="el-input__icon"><user /></el-icon> </template
          ></el-input>
        </el-form-item>
        <!--密码输入框-->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            show-password
            autocomplete="new-password"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <!-- 重置 -->
        <el-button
          :icon="CircleClose"
          round
          @click="resetForm(ruleFormRef)"
          size="large"
          >重置</el-button
        >
        <!-- 登录按钮 -->
        <el-button
          :icon="UserFilled"
          @click="submitForm(ruleFormRef)"
          size="large"
          type="primary"
          :loading="loading"
          >登录
        </el-button>
        <!-- <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录
        </el-button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  Plus,
  Delete,
  Search,
  InfoFilled,
  Download,
  Upload,
  Lock,
  UserFilled,
  CircleClose,
} from "@element-plus/icons-vue";
import { ElForm, FormInstance, ElMessage, ElNotification } from "element-plus";
import axios from "axios";
import { GlobalStore } from "../../store/index";
import { MenuStore } from "../../store/modules/menu";
import { TabsStore } from "../../store/modules/tabs";
import { useUserStore } from "../../store/modules/user";
import { getTimeState } from "../../utils/util";
import generaMenu from "../../api/menu";
import { th } from "element-plus/es/locale";
const globalStore = GlobalStore();
const menuStore = MenuStore();
const userStore = useUserStore();
const tabStore = TabsStore();

// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const ruleFormRef = ref<FormInstance>();
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
// 登录表单数据
const loginForm = reactive({
  username: "admin@163.com",
  password: "123456",
});

const loading = ref(false);
const router = useRouter();
// 重置登录信息
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
///登录
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      ///192474631
      var captcha = new TencentCaptcha("2091489673", (res: any) => {
        if (res.ret === 0) {
          loading.value = true;
          let param = new URLSearchParams();
          param.append("username", loginForm.username);
          param.append("password", loginForm.password);
          axios.post("/api/users/login", param).then(({ data }) => {
            console.log(data);
            if (data.flag) {
              // 登录后保存用户信息
              // console.log(menuStore.login(data.data));
              // menuStore.login(data.data);
              // MenuStore('login',data.data);
              // store.commit('login', data.data)
              // generaMenu();
              // ElMessage.success({
              //   message: "登录成功!",
              // });
              // router.push({ path: "/" });

              userStore.userInfo = data.data;
              sessionStorage.setItem('token', data.data.token);
              // localStorage.setItem('token', data.data.token);
              userStore.token = data.data.token;

              generaMenu();
              // ElMessage.success({
              //   message: "登录成功!",
              // });
              ElNotification({
                title: getTimeState(),
                message: "欢迎登录 两米半",
                type: "success",
                duration: 3000,
              });
              router.push({ path: "/" });
            } else {
              ElMessage.error(data.message);
            }
          });
        }
      });
      // 显示验证码
      captcha.show();
    } else {
      return false;
    }
  });
};

onMounted(() => {
  // 监听enter事件（调用登录）
  document.onkeydown = (e: any) => {
    e = window.event || e;
    if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
      if (loading.value) return;
      login(ruleFormRef.value);
    }
  };
});
</script>


<style scoped lang="less">
@import "./index.less";
</style>