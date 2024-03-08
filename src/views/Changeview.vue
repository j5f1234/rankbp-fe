<script setup lang="ts">
import router from "@/router";
import FivePosiChange from "@/components/FivePosiChange.vue"

function moveToShow() {
  router.push("/");
}
</script>

<template>
  <div class="header">
    <el-button @click="moveToShow()" type="primary" class="change-button">返回</el-button>
  </div>
  <FivePosiChange></FivePosiChange>
</template>

<style scoped>
.header {
  margin-top:20px;
  width: 100%;
  height: 40px;
  border-bottom: 2px solid #dcdfe6;
  padding-bottom: 20px;
}

.change-button {
  height:40px;
  width:80px;
  margin-left: 10%;
}
</style>