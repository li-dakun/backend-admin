<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">管理员登录</div>
      <!------------------------------登录表单--------------------------------->
      <el-form
          ref="ruleFormRef"
          :model="loginForm"
          status-icon
          class="login-form">
        <!--用户名输入框-->
        <el-form-item prop="username" :rules="[{required: true, message: '用户名不能为空', trigger: 'blur'}]">
          <el-input v-model="loginForm.username" :prefix-icon="UserFilled" placeholder="请输入用户名"
                    clearable/>
        </el-form-item>
        <!--密码输入框-->
        <el-form-item prop="password" :rules="[{required: true, message: '密码不能为空', trigger: 'blur'}]">
          <el-input v-model="loginForm.password" :prefix-icon="Lock" placeholder="请输入密码" autocomplete="off" clearable/>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-button type="primary" @click="submitForm(ruleFormRef)">登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang='ts'>
// import type { ElForm,ElMessage,ElMessageBox } from "element-plus";
import {Plus, Delete, Search, InfoFilled, Download, Upload, Lock, UserFilled} from "@element-plus/icons-vue";
import axios from 'axios'
// import router from '../../router/index'
import config from '../../assets/js/config'
import {useRouter, useRoute} from "vue-router";
import generaMenu from '../../utils/menu';
import useTabStore from "../../store/modules/tab";
import {reactive, onMounted, getCurrentInstance, ref} from "vue";

const tabStore = useTabStore();
const route = useRoute();
const router = useRouter();

import {FormInstance, ElMessage} from 'element-plus'
///model绑定属性
const loginForm = reactive({
  username: '', //admin@163.com
  password: ''  //123456
});
const ruleFormRef = ref<FormInstance>()
const submitForm = (formEl: FormInstance | undefined) => {
  // let captchaId = 'TENCENT_CAPTCHA';
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      var captcha = new TencentCaptcha(config.TENCENT_CAPTCHA, (res: any) => {
        if (res.ret === 0) {
          let param = new URLSearchParams();
          param.append('username', loginForm.username);
          param.append('password', loginForm.password);
          axios.post('/api/users/login', param).then((data) => {
            console.log(data.data);
            console.log()
            if (data.data.flag) {
              // 登录后保存用户信息
              console.log(tabStore.login(data.data));
              tabStore.login(data.data);
              generaMenu();
              ElMessage.success({
                message: '登录成功!'
              });
              // this.$message.success('登录成功')
              router.push({path: "/"});
              // router.push({path: '/home'})
            } else {
              ElMessage.error(data.message);
              // this.$message.error(data.message)
              console.log('error submit!')
            }
          })
    
    
        }
      })
      // 显示验证码
      captcha.show()
      console.log('submit!')
    } else {
      // console.log('error submit!')
      return false
    }
  })
}
</script>
<style scoped>
.login-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: url(https://img2.baidu.com/it/u=2445092696,211284077&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800) no-repeat fixed;
  background-size: cover;
}

.login-card {
  display: flex;
  position: relative;
  width: 380px;
  height: 380px;
  flex-direction: column;
  padding: 40px;
  /*text-align: center;*/
  margin-right: 200px;
  z-index: 1;
  background: inherit;
  border-radius: 18px;
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  width: calc(100% + 20px);
  /* + 两边各有一个空格  否则 无效*/
  height: calc(100% + 20px);
  background: inherit;
  box-shadow: 0 0 0 200px rgba(255, 255, 255, .2) inset;
  z-index: -1;
  filter: blur(6px);
  overflow: hidden;
}

.login-title {
  font-size: 1rem;
  font-weight: 400;
  color: #3d5245;
  text-align: center;
  margin-bottom: 0.5rem;
  /*color: #303133;*/
}

.el-form-item {
  margin: 1.5rem 0;
}

.login-card button, .login-form {
  height: 40px;
  border: none;
  border-radius: 6px;
  color: #3d5245;
  margin-top: 1.2rem;
}

.login-form input::placeholder {
  color: #3d5245;
}

.login-card button {
  margin-top: 1rem;
  width: 100%;
  position: relative;
  /*margin-top: 80px;*/
  background-color: rgba(57, 88, 69, .4);
  color: #ffffff;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s;
}

.login-card button:hover {
  background-color: rgba(12, 88, 38, 0.67);
}

.login-card button::before,
.login-card button::after {
  content: '';
  display: block;
  width: 80px;
  height: 100%;
  background-color: rgba(179, 255, 210, .5);
  opacity: 0.5s;
  position: absolute;
  left: 0;
  top: 0;
  transform: skewX(-15deg);
  filter: blur(30px);
  overflow: hidden;
  transform: translateX(-100px);
}

.login-card button::after {
  width: 40px;
  background-color: rgba(179, 255, 210, .3);
  left: 60px;
  filter: blur(5px);
  opacity: 0;
}

.login-card button:hover::before {
  transition: all 1s;
  transform: translateX(320px);
  opacity: 0.7;
}

.login-card button:hover::after {
  transition: all 1s;
  transform: translateX(320px);
  opacity: 1;
}


</style>