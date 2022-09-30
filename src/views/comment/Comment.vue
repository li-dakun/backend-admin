<template>
  评论管理
  <el-card class="main-card">
    <div class="title">{{ this.$route.name }}</div>

    <!-- 文章状态 -->
    <div class="article-status-menu">
      <span :style="{ marginRight: '8px' }">状态</span>
      <a-checkable-tag v-model:checked="checked1" @change="handleChange"
        >全部</a-checkable-tag
      >
      <a-checkable-tag v-model:checked="checked2" @change="handleChange"
        >正常</a-checkable-tag
      >
      <a-checkable-tag v-model:checked="checked3" @change="handleChange"
        >审核中</a-checkable-tag
      >
    </div>
    <!-- 表格、分页展示 -->
    <CommonTable
      :tableData="tableData"
      :tableHeader="tableHeader"
      :isOperate="isOperate"
      :total="total"
      :operateWidth="operateWidth"
      @handleSizeChange="sizeChange"
      @handleCurrentChange="currentChange"
    >
      <template v-slot:Title>
        <!-- <slot v-if="item.slot" :name="item.slot" :scopeData="scope"> </slot> -->
        <span v-if="articleTitle">{{ articleTitle.articleTitle }}</span>
        <span v-else>1234dqw</span>
      </template>
      <!-- <template v-slot:avatar>
        <el-image
          :src="getAssetsImages(avatar)"
          fit="contain"
          style="width: 100px; height: 100px"
        />
      </template> -->
      <!-- <template v-slot:articleTitle>
        <span v-if="articleTitle">
          {{ articleTitle }}
        </span>
        <span v-else>无</span>
      </template> -->
      <!-- <template v-slot:commentContent>
        <span v-html="commentContent" class="comment-content" />
      </template> -->
      <!-- <template v-slot:createTime>
        <el-icon><Clock />{{ createTime }}</el-icon>
      </template> -->
      <!-- 状态 -->
      <template v-slot:isReview>
        <el-tag v-if="isReview == 0" type="warning">审核中</el-tag>
        <el-tag v-if="isReview == 1" type="success">正常</el-tag>
      </template>
      <!-- 来源 -->
      <!-- <template v-slot:state>
        <el-tag v-if="state == 1">文章</el-tag>
        <el-tag v-if="state == 2" type="danger">留言</el-tag>
        <el-tag v-if="state == 3" type="success">关于我</el-tag>
        <el-tag v-if="state == 4" type="warning">友链</el-tag>
        <el-tag v-if="state == 5" type="warning">说说</el-tag>
      </template> -->
      <!-- 操作 -->
      <!-- <template v-slot:action>
        <el-button
          v-if="action == 0"
          size="mini"
          type="success"
          @click="updateCommentReview(scope.row.id)"
        >
          通过
        </el-button>
        <el-popconfirm
          style="margin-left: 10px"
          title="确定删除吗？"
          @confirm="deleteComments(scope.row.id)"
        >
          <el-button size="mini" type="danger"> 删除 </el-button>
        </el-popconfirm>
      </template> -->
      <!-- <template #default="scope">
        <span>{{ scope.row.isReview }}</span>
      </template> -->
    </CommonTable>
  </el-card>
</template>
    
<script setup lang='ts'>
import {
  getComments,
  deleteComment,
  updateCommentCheck,
} from "../../api/Comment";
import { reactive, ref, onMounted, computed } from "vue-demi";
import CommonTable from "../../components/Table/CommonTable.vue";
import { defineStore } from "pinia";
import { Button, Image } from "element-ui";
// const store = defineStore();

const url =
  "https://img2.baidu.com/it/u=1035356506,3713698341&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
// 表格所需的数据
const tableData = reactive([
  {
    avatar:
      "https://img2.baidu.com/it/u=1035356506,3713698341&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    // nickname: "东东",
    // replyNickname: "无",
    articleTitle: "啊啦啦啦啦啦",
    commentContent: "test1",
    createTime: " 2022-09-25",
    // isReview: "状态",
  },
  // {
  //   avatar:
  //     "https://img2.baidu.com/it/u=1035356506,3713698341&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  //   nickname: "不离世间觉",
  //   replyNickname: "无",
  //   // articleTitle: "",
  //   commentContent: "test2",
  //   createTime: " 2022-09-25",
  //   // isReview: "状态",
  // }
]);
//表头数据  辅助tableData的数据 这里是自己定义
const tableHeader = reactive([
  {
    prop: "avatar",
    fixed: "left",
    label: "头像",
    width: "130px",
    align: "center", // 对齐方式
    slot: "avatar", //定义插槽名称可自定义
    template: true, //确认使用插槽时给布尔值
  },
  {
    prop: "nickname",
    label: "评论人",
    width: "130px",
    align: "center", // 对齐方式
  },

  {
    prop: "articleTitle",
    label: "文章标题",
    width: "130px",
    align: "left", // 对齐方式
    slot: "Title",
    template: true,
  },
  {
    prop: "replyNickname",
    label: "回复人",
    width: "130px",
    align: "left", // 对齐方式
  },
  {
    prop: "commentContent",
    label: "评论内容",
    width: "130px",
    align: "left", // 对齐方式
    slot: "commentContent",
    template: true,
  },
  {
    prop: "createTime",
    label: "评论时间",
    width: "130px",
    align: "left", // 对齐方式
    slot: "createTime",
    template: true,
  },
  {
    prop: "isReview", //prop
    label: "状态", //label
    slot: "isReview", //插槽根据需求显示
    width: "90px", //宽度
    align: "left", // 对齐方式
    fixed: "right", //固定左侧或右侧？true/flase
    template: true,
  },
  {
    label: "来源",
    slot: "state",
    width: "130px",
    align: "left", // 对齐方式
    fixed: "right",
    width: "90px", //宽度
    template: true,
  },
  {
    label: "操作",
    slot: "action",
    fixed: "right",
    width: "130px",
    align: "center", // 对齐方式
    template: true,
  },
]);

const operateWidth = ref(160); // 操作列宽度
const isOperate = ref(true); // 操作列是否显示
const pageSize = ref(10); // 每页显示条数
const pageNum = ref(1); // 当前页码
const total = ref(50); // 总条数

const remove = ref(false); //取消
const options = reactive([
  {
    value: 1,
    label: "文章",
  },
  {
    value: 2,
    label: "留言",
  },
  {
    value: 3,
    label: "关于我",
  },
  {
    value: 4,
    label: "友链",
  },
]); //数据筛选内容
const comments = reactive([]); //表格数据展示
const commentIds = reactive([]); //批量操作
const keywords = ref(""); //搜索
const isReview = ref(0); //
const state = ref(1); //状态
const action = ref(0);

//解决图片加载失败问题
const getAssetsImages = (avatar: string) => {
  return new URL(`${avatar}.jpeg`, import.meta.url).href; //本地文件路径
};

//通过
const updateCommentReview = () => {};
//删除
const deleteComments = () => {};

// const isReview=ref(null);
// 分页改变事件
const sizeChange = (val) => {
  pageSize.value = val;
  // getData(); 以上数据来自接口，这里是模拟数据，如果是真实数据页数变了，需要再次调用请求后台的接口，重新刷新页面
};
// 当前页改变事件
const currentChange = (val) => {
  pageNum.value = val;
  // getData(); 以上数据来自接口，这里是模拟数据，如果是真实数据页数变了，需要再次调用请求后台的接口，重新刷新页面
};
</script>


    
<style lang="less" scoped>
.article-status-menu {
  font-size: 14px;
  margin-top: 16px;
  color: #999;
}
.table {
  margin-top: 10px;
  .option-box {
    margin-top: 1.5rem;
    .el-select {
      margin-right: 1.5rem;
    }
    .search {
      margin-top: 0.5rem;
    }
  }
  .operation-container {
    display: flex;
    align-items: center;
    // margin-bottom: 1.25rem;
    // margin-top: 1.25rem;
  }
}
.el-table {
  margin-top: 1rem;
}
</style>
    
