<!-- 英雄池选择表单 -->
<script setup lang="ts">
import {ref,inject, watch} from 'vue'
import { useGetHerosPool, useHerosPool } from '@/composable/useHerosPool';
import { useHerosName } from '@/composable/useHerosData';

const positions=["all","top","jug","mid","adc","sup"];
// 同一个位置里英雄名不能有重复
const {namelist,imagelist}=useHerosName()
// console.log(namelist.value)
const pageact=ref(0)
const posichoose=inject('posichoose')

const {bestheros,goodheros,checkedheros} = useGetHerosPool()
// const checkedheros=ref([[[],[],[],[],[]],[[],[],[],[],[]]])
const degree=inject('degree')
const ischecked = ref(true);
const isShow=ref([0,0,0,0,0,0])

function changePage(i) {
  pageact.value=i
  isShow.value=[0,0,0,0,0,0]
  isShow.value[i]=1
}

</script>

<template>
  <div class="selectpart">
    <el-button class="save-button" 
    @click="useHerosPool(checkedheros)" type="success">
      保存全部
    </el-button>
    <div class="header">
      <el-button v-for="posi,i in positions" 
      @click="changePage(i)"
      class="posi-button" :class="{activeselect:isShow[i]}"
      type="primary" plain>
        {{ posi }}
      </el-button>
    </div>
    <div class="form-box" v-if="degree >=0">
      <div v-for="hero,j in namelist[pageact]" class="select-box">
        <img class="img-box" :src="imagelist[pageact][j]">
        <input type="checkbox" v-model="checkedheros[degree][posichoose]" 
        :id="j" :value="hero" >
        <label :for="j">{{ hero }}</label>
      </div>
    </div>
    <!-- <div>{{ checkedheros }}</div> -->
  </div>
</template>



<style scoped>
.selectpart {
  width: 1200px;
  border: 2px solid #dcdfe6;
  display: flex;
  flex-direction: column;
}

.save-button {
  width: 80px;
  height: 40px;
  margin: 10px 60px;
}

.header {
  height: 40px;
  width: 100%;
  border: 2px solid #dcdfe6;
  display: flex;
  margin: -2px 0px 0px -2px;
  flex-direction: row;
}

.posi-button {
  width: 200px;
  margin:0px;
  height:40px;
  font-size: 20px;
}

.activeselect{
  background-color: #409eff;
  color: #FFFFFF;
}

.form-box {
  margin-top: 20px;
  width: 1200px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.select-box {
  margin:5px 10px;
  width: 176px;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:flex-start;
  border: 2px solid #8D9095;
}

.img-box {
  width: 36px;
  height: 36px;

}

</style>