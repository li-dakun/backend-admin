<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <Fullscreen id="fullscreen" />
    </div>
    <Avatar />
  </div>
</template>
    
<script setup lang='ts'>

import Fullscreen from './components/Fullscreen.vue';
import Avatar from './components/Avatar.vue';
</script>
    
<style scoped lang="less">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 30px;
	.header-icon {
		display: flex;
		align-items: center;
		justify-content: space-between;
		// width: 230px;
		margin-right: 22px;
	}
	.username {
		margin: 0 20px 0 0;
		font-size: 15px;
	}
}
</style>
