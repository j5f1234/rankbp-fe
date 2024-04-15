<!-- 英雄池展示界面 -->

<script setup lang="ts">
import router from "@/router";
import FivePosiShow from "../components/FivePosiShow.vue"
import { useHerosBaseData } from "../composable/useHerosData"

function moveToChange() {
  router.push("/change");
}

function moveToBP() {
  router.push("/BP");
}

useHerosBaseData()
</script>

<template>
  <div class="header">
    <el-button @click="moveToChange()" type="primary" class="change-button">修改</el-button>
    <el-button @click="moveToBP()" type="primary" class="change-button">去BP</el-button>
  </div>
  <FivePosiShow></FivePosiShow>
</template>

<style scoped>
.header {
  margin-top:20px;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
}

.change-button {
  height:40px;
  width:80px;
  margin-left: 10%;
}
</style>