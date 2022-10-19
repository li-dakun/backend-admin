<template></template>


    
<script setup lang='ts'>
import { useRouter } from "vue-router";

defineProps<{ menuList: Menu.MenuOptions[] }>();

const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.isLink) window.open(subItem.isLink, "_blank");
  router.push(subItem.path);
};
</script>
    
<style>
</style>