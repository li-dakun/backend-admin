<template>
  <el-drawer
    v-model="drawerVisible"
    :destroy-on-close="true"
    size="500px"
    title="发布文章"
  >
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :model="props.initParam.article"
      label-width="100px"
    >
      <el-form-item label="文章分类" prop="categoryName">
        <el-tag
          :disable-transitions="false"
          v-show="props.initParam.article.categoryName"
          @close="removeCategory"
          :closable="true"
          type="success"
          size="large"
          style="margin: 0 1rem 0 0"
          >{{ props.initParam.article.categoryName }}</el-tag
        >
        <el-popover
          placement="right"
          width="460"
          trigger="click"
          v-if="!props.initParam.article.categoryName"
        >
          <div class="popover-title">分类</div>
          <el-autocomplete
            :fetch-suggestions="searchCategories"
            placeholder="请输入分类名搜索，enter可添加自定义分类"
            :trigger-on-focus="false"
            v-model="props.initParam.categoryName"
            @keyup.enter="saveCategory"
            @select="handleSelectCategories"
            style="width: 100%"
          >
            <template #default="item">
              <div>{{ item.categoryName }}</div>
            </template>
          </el-autocomplete>
          <div class="popover-container">
            <div
              v-for="item of props.initParam.categorys"
              :key="item.id"
              class="category-item"
              @click="addCategory(item)"
            >
              {{ item.categoryName }}
            </div>
          </div>
          <el-button type="success" plain default="reference" size="small">
            添加分类
          </el-button>
        </el-popover>
      </el-form-item>
      <el-form-item label="文章标签" prop="tagNames">
        <el-tag
          v-for="(item, index) of props.initParam.article.tagNames"
          :key="index"
          @close="removeTag(item)"
          size="large"
          style="margin: 0 1rem 0 0"
          >添加标签</el-tag
        >
        <el-popover
          v-if="props.initParam.article.tagNames.length < 3"
          placement="bottom-start"
          width="460"
          trigger="click"
        >
          <div class="popover-title">标签</div>
          <el-autocomplete
            style="width: 100%"
            v-model="props.initParam.tagName"
            :fetch-suggestions="searchTags"
            placeholder="请输入标签名搜索，enter可添加自定义标签"
            :trigger-on-focus="false"
            @keyup.enter="saveTag"
            @select="handleSelectTag"
          >
            <template #default="item">
              <div>{{ item.tagName }}</div>
            </template>
          </el-autocomplete>
          <div class="popover-container">
            <div style="margin-bottom: 1rem">添加标签</div>
            <el-tag
              v-for="(item, index) of props.initParam.tagList"
              :key="index"
              :class="tagClass(item)"
              @click="addTag(item)"
            >
              {{ item.tagName }}
            </el-tag>
          </div>
          <el-button type="primary" plain default="reference" size="small">
            添加标签
          </el-button>
        </el-popover>
      </el-form-item>
      <el-form-item label="文章类型">
        <el-select v-model="props.initParam.article.type" size="large">
          <el-option
            v-for="item in props.initParam.typeList"
            :key="item.type"
            :label="item.desc"
            :value="item.type"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="原文地址" v-if="props.initParam.article.type != 1">
        <el-input placeholder="请填写原文链接" />
      </el-form-item>
      <el-form-item label="上传封面" prop="articleCover">
        <el-upload
          class="upload-demo"
          drag
          action="/api/admin/articles/images"
          multiple
          :headers="props.initParam.headers"
          :before-upload="beforeUpload"
          :on-success="uploadCover"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div
            v-if="props.initParam.article.articleCover == ''"
            class="el-upload__text"
          >
            将文件拖拽到此处，或<em>点击上传</em>
          </div>
          <el-image
            v-else
            :src="props.initParam.article.articleCover"
            width="360px"
            height="180px"
          />
        </el-upload>
      </el-form-item>
      <el-form-item label="置顶">
        <el-switch
          v-model="props.initParam.article.isTop"
          active-color="#13ce66"
          inactive-color="#F4F4F5"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="推荐">
        <el-switch
          v-model="props.initParam.article.isFeatured"
          active-color="#13ce66"
          inactive-color="#F4F4F5"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="发布形式">
        <el-radio-group v-model="props.initParam.article.status">
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="2">密码</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="props.initParam.article.status == 2" label="访问密码">
        <el-input
          v-model="props.initParam.article.password"
          size="large"
          type="password"
          show-password
          placeholder="请填写文章访问密码"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button
        type="primary"
        v-show="!drawerData.isView"
        @click="saveOrUpdateArticle"
        >发布</el-button
      >
    </template>
  </el-drawer>
</template>
    
<script setup lang='ts'>
import { ref, reactive, computed ,defineExpose} from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import { log } from "console";

const rules = reactive({
  categoryName: [
    { required: true, message: "文章分类不能为空", trigger: "change" },
  ],
  tagNames: [
    { required: true, message: "文章标签不能为空", trigger: "change" },
  ],
  articleCover: [
    { required: true, message: "文章封面不能为空", trigger: "change" },
  ],
});

interface DrawerProps {
  title: string;
  isView: boolean;
  initParam?: any;
  rowData: string | boolean | Array | number;
  apiUrl?: (params: any) => Promise<any>;
  getTableList?: () => Promise<any>;
}
//接收父组件参数
const props = withDefaults(defineProps<DrawerProps>(), {
  initParam: {},
});
// drawer框状态
const drawerVisible = ref<boolean>(false);
const drawerData = ref<DrawerProps>({
  isView: false,
  title: "",
});
//接受父组件传递过来的参数
const openDrawer = (params: DrawerProps): void => {
  drawerData.value = params;
  drawerVisible.value = true;
};

//文章分类-添加标签
const addCategory = (item) => {
  props.initParam.article.categoryName = item.categoryName;
};
const removeCategory = () => {
  props.initParam.article.categoryName = null;
  console.log(111);
  // dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
};
const saveCategory = () => {
  if (props.initParam.categoryName.trim() != "") {
    this.addCategory({
      categoryName: props.initParam.categoryName,
    });
    props.initParam.categoryName = "";
  }
};
const handleSelectCategories = (item) => {
  addCategory({
    categoryName: item.categoryName,
  });
};
const searchCategories = () => {
  //  this.axios
  //       .get('/api/admin/categories/search', {
  //         params: {
  //           keywords: keywords
  //         }
  //       })
  //       .then(({ data }) => {
  //         cb(data.data)
  //       })
};
// 文章标签-添加标签
const removeTag = (item) => {
  const index = props.initParam.article.tagNames.indexOf(item);
  props.initParam.article.tagNames.splice(index, 1);
  // dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
};
const saveTag = () => {
  if (props.initParam.tagName.trim() != "") {
    this.addTag({
      tagName: props.initParam.tagName,
    });
    props.initParam.tagName.tagName = "";
  }
};
const handleSelectTag = (item) => {
  this.addTag({
    tagName: item.tagName,
  });
};
const addTag = (item) => {
  if (props.initParam.article.tagNames.indexOf(item.tagName) == -1) {
    props.initParam.article.tagNames.push(item.tagName);
  }
};
const tagClass = computed((item) => {
  const index = props.initParam.article.tagNames.indexOf(item.tagName);
  return index != -1 ? "tag-item-select" : "tag-item";
});
const searchTags = () => {
  // this.axios
  //   .get("/api/admin/tags/search", {
  //     params: {
  //       keywords: keywords,
  //     },
  //   })
  //   .then(({ data }) => {
  //     cb(data.data);
  //   });
};
////上传封面
const beforeUpload = (file) => {
  // return new Promise((resolve) => {
  //   if (file.size / 1024 < this.config.UPLOAD_SIZE) {
  //     resolve(file);
  //   }
  //   imageConversion
  //     .compressAccurately(file, this.config.UPLOAD_SIZE)
  //     .then((res) => {
  //       resolve(res);
  //     });
  // });
};
const uploadCover = (response) => {
  props.initParam.article.articleCover = response.data;
};
//置顶/推荐
const value1 = ref(true);
//确定提交数据
const ruleFormRef = ref<FormInstance>();
//确定发表文章
const saveOrUpdateArticle = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return;
    try {
      // await drawerData.value.apiUrl!(drawerData.value.rowData);
      // ElMessage.success({ message: `${drawerData.value.title}用户成功！` });
      // drawerData.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

//暴露给父组件
defineExpose({
  openDrawer,
});
</script>
    
<style scoped lang="less">
@import "./index.less";
</style>