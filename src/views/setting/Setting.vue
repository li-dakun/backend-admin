<template>
  <el-card class="main-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="修改信息" name="info">
        <div class="info-container">
          <el-upload
            class="avatar-uploader"
            action="/api/users/avatar"
            :show-file-list="false"
            :on-success="updateAvatar"
            :headers="headers"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <el-form
            label-width="70px"
            :model="infoForm"
            style="width: 320px; margin-left: 3rem"
          >
            <el-form-item label="昵称">
              <el-input v-model="infoForm.nickname" />
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input v-model="infoForm.intro" />
            </el-form-item>
            <el-form-item label="个人网站">
              <el-input v-model="infoForm.website" />
            </el-form-item>
            <el-button
              @click="updateInfo"
              type="primary"
              size="medium"
              style="margin-left: 4.375rem"
            >
              修改
            </el-button>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="password">
        <el-form label-width="70px" :model="passwordForm" style="width: 320px">
          <el-form-item label="旧密码">
            <el-input
              @keyup.enter="updatePassword"
              v-model="passwordForm.newPassword"
              show-password
            />
          </el-form-item>
          <el-form-item label="新密码">
            <el-input
              @keyup.enter="updatePassword"
              v-model="passwordForm.newPassword"
              show-password
            />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              @keyup.enter="updatePassword"
              v-model="passwordForm.confirmPassword"
              show-password
            />
          </el-form-item>
          <el-button
            type="primary"
            style="margin-left: 4.4rem"
            @click="updatePassword"
          >
            修改
          </el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
    
<script setup lang='ts'>
import { ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";

const imageUrl = ref("");
const activeName = reactive("info");
const headers = reactive({
  Authorization: "Bearer " + sessionStorage.getItem("token"),
});
const infoForm = reactive({
  nickname: "",
  intro: "",
  website: "",
});
const passwordForm = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const handleClick = () => {};

const updateAvatar: UploadProps["onSuccess"] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  if (response.flag) {
    this.$message.success(response.message);
    this.$store.commit("updateAvatar", response.data);
  } else {
    this.$message.error(response.message);
  }
};
const updateInfo = () => {
  //   if (this.infoForm.nickname.trim() == "") {
  //     this.$message.error("昵称不能为空");
  //     return false;
  //   }
  //   this.axios.put("/api/users/info", this.infoForm).then(({ data }) => {
  //     if (data.flag) {
  //       this.$notify.success({
  //         title: "成功",
  //         message: "修改成功",
  //       });
  //       this.$store.commit("updateUserInfo", this.infoForm);
  //     } else {
  //       this.$notify.error({
  //         title: "失败",
  //         message: "修改失败",
  //       });
  //     }
  //   });
};
const updatePassword = () => {
  //   if (this.passwordForm.oldPassword.trim() == "") {
  //     this.$message.error("旧密码不能为空");
  //     return false;
  //   }
  //   if (this.passwordForm.newPassword.trim() == "") {
  //     this.$message.error("新密码不能为空");
  //     return false;
  //   }
  //   if (this.passwordForm.newPassword.length < 6) {
  //     this.$message.error("新密码不能少于6位");
  //     return false;
  //   }
  //   if (this.passwordForm.newPassword != this.passwordForm.confirmPassword) {
  //     this.$message.error("两次密码输入不一致");
  //     return false;
  //   }
  //   this.axios
  //     .put("/api/admin/users/password", this.passwordForm)
  //     .then(({ data }) => {
  //       if (data.flag) {
  //         this.passwordForm.oldPassword = "";
  //         this.passwordForm.newPassword = "";
  //         this.passwordForm.confirmPassword = "";
  //         this.$notify.success({
  //           title: "成功",
  //           message: "修改成功",
  //         });
  //       } else {
  //         this.$notify.error({
  //           title: "失败",
  //           message: "修改失败",
  //         });
  //       }
  //     });
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  //   if (rawFile.type !== "image/jpeg") {
  //     ElMessage.error("Avatar picture must be JPG format!");
  //     return false;
  //   } else if (rawFile.size / 1024 / 1024 > 2) {
  //     ElMessage.error("Avatar picture size can not exceed 2MB!");
  //     return false;
  //   }
  //   return true;
};
const avatar = computed(() => {
  // return this.$store.state.userInfo.avatar
});
</script>
    
<style scoped lang ='less'>
@import './index.less';
</style>