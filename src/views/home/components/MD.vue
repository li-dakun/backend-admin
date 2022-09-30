<template>
  <el-row :gutter="20">
    <!-- 访问量 -->
    <el-col :span="6">
      <el-card class="box-card">
        <div class="card-icon-container">
          <el-icon class="el-icon-thumb" style="color: #40c9c6">
            <UserFilled />
          </el-icon>
        </div>
        <div class="card-desc">
          <div class="card-title">访问量</div>
          <div class="card-count">{{ viewsCount }}</div>
        </div>
      </el-card>
    </el-col>
    <!-- 用户量 -->
    <el-col :span="6">
      <el-card class="box-card">
        <div class="card-icon-container">
          <el-icon class="el-icon-user-solid" style="color: #34bfa3">
            <User />
          </el-icon>
        </div>
        <div class="card-desc">
          <div class="card-title">用户量</div>
          <div class="card-count">{{ userCount }}</div>
        </div>
      </el-card>
    </el-col>
    <!-- 文章量 -->
    <el-col :span="6">
      <el-card>
        <div class="card-icon-container">
          <el-icon class="el-icon-document" style="color: #f4516c">
            <Document />
          </el-icon>
        </div>
        <div class="card-desc">
          <div class="card-title">文章量</div>
          <div class="card-count">{{ articleCount }}</div>
        </div>
      </el-card>
    </el-col>
    <!-- 留言量 -->
    <el-col :span="6">
      <el-card>
        <div class="card-icon-container">
          <el-icon class="el-icon-s-comment" style="color: #36a3f7">
            <ChatDotSquare />
          </el-icon>
        </div>
        <div class="card-desc">
          <div class="card-title">留言量</div>
          <div class="card-count">{{ messageCount }}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
    
<script setup lang='ts'>
</script>
    
<style scoped>
.card-icon-container {
  display: inline-block;
  font-size: 3rem;
}
.area-wrapper {
  display: flex;
  justify-content: center;
}
.card-desc {
  font-weight: bold;
  float: right;
}
.card-title {
  margin-top: 0.3rem;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 1rem;
}
.card-count {
  margin-top: 0.75rem;
  color: #666;
  font-size: 1.25rem;
}

</style>