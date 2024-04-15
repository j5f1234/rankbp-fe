<!-- 分路选择组件 -->

<script setup lang="ts">
import {ref,provide} from 'vue'
import SelectForm from './SelectForm.vue'
const positions=["top","jug","mid","adc","sup"]
const isShow=ref([1,1,1,1,1])
const posichoose=ref(-1)
const degree=ref(-1)
const isact=ref([0,0])

function displaySelect(i) {
  isShow.value=[1,1,1,1,1]
  isShow.value[i]=0;
  // console.log(isShow.value)
  posichoose.value=i;
  degree.value=-1
  isact.value=[0,0]
}

function clickBest() {
  degree.value=0
  isact.value=[1,0]
}
function clickGood() {
  degree.value=1
  isact.value=[0,1]
}


provide('posichoose', posichoose)
provide('degree', degree)


</script>

<template>
  <div class="changepart">
    <div class="change-posi">
      <div v-for="(posi,i) in positions" class="five-box">
        <el-button @click="displaySelect(i)" class="five-box-name">
          {{ posi }}
        </el-button>
        <div class="two-select" :class="{activeselect:isShow[i]}">
          <el-button class="select-button" type="success" @click="clickBest()"
          :class="{bestcolor:isact[0]}" plain>
            高熟练度
          </el-button>
          <el-button class="select-button" type="warning" @click="clickGood()"
          :class="{goodcolor:isact[1]}" plain>
            低熟练度
          </el-button>
        </div>
      </div>
    </div>
    <SelectForm></SelectForm>
  </div>
</template>



<style scoped>

.changepart {
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  margin:auto;
}

.change-posi {
  display: flex;
  flex-direction: column;
  width: 350px;
  height: fit-content;
  margin-top: 60px;
  border: 2px solid #dcdfe6;
}

.five-box {
  margin: 10px 0px 10px 50px;
  height: 100px;
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.five-box-name {
  display: flex;
  height: 100px;
  width: 150px;
  border: 2px solid #409EFF;
  align-items: center;
  text-align: center;
  font-size: 40px;
}

.two-select {
  width: 150px;
  height: 100px;
  display: flex;
  flex-direction: column;
}

.activeselect {
  visibility: hidden;
}


.select-button {
  margin: 0px;
  width: 150px;
  height: 50px;
  font-size: 18px;
}

.bestcolor {
  background-color: #67C23A;
  color: #ffffff;
}

.goodcolor {
  background-color: #E6A23C;
  color: #ffffff;
}
</style>