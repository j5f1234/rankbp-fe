<script setup lang="ts">
import router from "@/router";
import FivePosiShow from "../components/FivePosiShow.vue"

function moveToChange() {
  router.push("/change");
}
</script>

<template>
  <div class="header">
    <el-button @click="moveToChange()" type="primary" class="change-button">修改</el-button>
  </div>
  <FivePosiShow></FivePosiShow>

</template>

<style scoped>
.header {
  margin-top:20px;
  width: 100%;
  height: 40px;
}

.change-button {
  height:40px;
  width:80px;
  margin-left: 10%;
}
</style>