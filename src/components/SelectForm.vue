<script setup lang="ts">
import {ref,inject, watch} from 'vue'

const positions=["all","top","jug","mid","adc","sup"];
const heros=[
  ["111","222","333","444","555","666","777","888"],
  ["111","222"],
  ["333","444"],
  ["555","666"],
  ["777"],
  ["888"],
]

const pageact=ref(0)
const posichoose=inject('posichoose')
const checkedheros=ref([[[],[],[],[],[]],[[],[],[],[],[]]])
const degree=inject('degree')
const ischecked = ref(false);

function changePage(i) {
  pageact.value=i
}

function addchecked(hero) {
  const s=checkedheros.value[degree.value][posichoose.value].length
  ischecked.value = false;
  for(let i=0;i<s;++i) {
    if(hero == checkedheros.value[degree.value][posichoose.value][i]) {
      ischecked.value=true;
    } 
  }
  console.log(ischecked.value)
}

// function tryclick() {
//   console.log(posichoose.value)
// }

</script>

<template>
  <div class="selectpart">
    <div class="header">
      <el-button v-for="posi,i in positions" 
      @click="changePage(i)"
      class="posi-button" type="primary" plain>
        {{ posi }}
      </el-button>
    </div>
    <div class="form-box" v-if="degree >=0">
      <div v-for="hero,j in heros[pageact]" class="select-box">
        <input type="checkbox" v-model="checkedheros[degree][posichoose]" 
        :id="j" :value="hero" :checked="ischecked">
        <label :for="j">{{ hero }}</label>
      </div>
    </div>
    <div>{{ checkedheros }}</div>
  </div>
</template>



<style scoped>
.selectpart {
  width: 1200px;
  border: 2px solid #dcdfe6;
  display: flex;
  flex-direction: column;
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


</style>