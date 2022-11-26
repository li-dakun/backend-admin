<template>
  <div class="card content-box">
    <div class="title">{{ $route.name }}</div>
    <div class="title-container">
      <el-input
        v-model="initParam.article.articleTitle"
        clear="elinput"
        placeholder="输入文章标题"
      />
      <el-button
        @click="saveArticleDraft"
        class="save-btn"
        type="danger"
        size="medium"
        v-if="initParam.article.id == null || initParam.article.status == 3"
        >保存草稿</el-button
      >
      <el-button
        @click="openDrawer"
        type="danger"
        size="medium"
        style="margin-left: 10px"
        >发布文章</el-button
      >
      <el-button type="primary" @click="dialogVisible = true"
        >内容预览</el-button
      >
    </div>
    <!-- 富文本编辑器 -->
    <WangEditor
      @imgAdd="uploadImg"
      v-model:value="initParam.article.articleContent"
      height="400px"
    />
    <!-- 富文本编辑器内容预览 -->
    <el-dialog
      v-model="dialogVisible"
      title="富文本内容预览"
      width="1300px"
      top="50px"
    >
      <div class="view" v-html="initParam.article.articleContent"></div>
    </el-dialog>
    <!-- //发布文章 -->
    <ELDrawer ref="drawerRef" :initParam="initParam" />
  </div>
</template>
  
<script setup lang='ts'>
import { ref, reactive, toRefs } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import WangEditor from "./components/WangEditor.vue";
import ELDrawer from "./components/ELDrawer.vue";
import { log } from "console";

//定义数据信息/属性值
const initParam = reactive<any>({
  autoSave: true,
  categoryName: "",
  tagName: "",
  categorys: [],
  tagList: [],
  typeList: [
    {
      type: 1,
      desc: "原创",
    },
    {
      type: 2,
      desc: "转载",
    },
    {
      type: 3,
      desc: "翻译",
    },
  ],
  article: {
    id: null,
    articleTitle: "2020-10-10",
    articleContent: "",
    articleCover: "",
    categoryName: null,
    tagNames: [],
    isTop: 0,
    type: 1,
    status: 1,
  },
  headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
});

//保存草稿
const saveArticleDraft = () => {
  // const { articleTitle } = toRefs(article);
  if (initParam.article.articleTitle == "") ElMessage.error("文章标题不能为空");
  if (initParam.article.articleContent == "") ElMessage.error("文章内容不能为空");
  initParam.article.status = 3;
  axios.post("/api/admin/articles", initParam.article).then(({ data }) => {
    if(data.flag){
      if(initParam.article.id===null){

      }


    }
    console.log(data);
  });
  console.log(111);
};
//富文本编辑器
const content = ref("");
const dialogVisible = ref(false);
//上传图片信息
const uploadImg = (pos, file) => {
  // var formdata = new FormData();
  // if (file.size / 1024 < this.config.UPLOAD_SIZE) {
  //   formdata.append("file", file);
  //   this.axios.post("/api/admin/articles/images", formdata).then(({ data }) => {
  //     this.$refs.md.$img2Url(pos, data.data);
  //   });
  // } else {
  //   imageConversion
  //     .compressAccurately(file, this.config.UPLOAD_SIZE)
  //     .then((res) => {
  //       formdata.append(
  //         "file",
  //         new window.File([res], file.name, { type: file.type })
  //       );
  //       this.axios
  //         .post("/api/admin/articles/images", formdata)
  //         .then(({ data }) => {
  //           this.$refs.md.$img2Url(pos, data.data);
  //         });
  //     });
  // }
};

//发布弹框
const drawerRef = ref();
const openDrawer = (title: string, rowData: string) => {
  let params = {
    rowData: { ...rowData },
    rowData,
  };
  drawerRef.value.openDrawer(params);
  console.log(1111);
};
</script>
  




<style scoped lang="less">
@import "./index.less";
</style>