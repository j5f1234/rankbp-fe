<script setup lang="ts">
import { inject, watch, type Ref, ref, onMounted, nextTick } from 'vue';
import winrate from "../../public/winrate.json"
import { getHerospool } from '@/api/herospool';
import { ElMessage } from 'element-plus';

const teamhero:Ref=inject('checkedhero') as Ref;
// const isAnalyse:Ref = inject('isAnalyse') as Ref
const showrate=ref([0.5,0.5,0.5,0.5,0.5])
const isInPool=ref([0,0,0,0,0])

const data=ref([
  {"best":[],"good":[],},
  {"best":[],"good":[],},
  {"best":[],"good":[],},
  {"best":[],"good":[],},
  {"best":[],"good":[],},
])
const bestheros=ref([[],[],[],[],[]])
const goodheros=ref([[],[],[],[],[]])


function freshwinrate(teamhero:Ref) {
  for(let i=0;i<5;++i) {
    let hero0:string=teamhero.value[0][i];
    let hero1:string=teamhero.value[1][i];
    let winset=winrate.winrate[hero0];
    for (let j=0;j<winset.length;++j){
      let keys=Object.keys(winset[j]);
      if(keys[0] == hero1) {
        showrate.value[i]=winset[j][hero1].toFixed(3)
        break
      }
    }    
  }
}

function freshIsInPool(teamhero:Ref, bestheros:Ref, goodheros:Ref) {
  for(let i=0;i<5;++i){
    if (bestheros.value[i].indexOf(teamhero.value[0][i]) != -1) {
      isInPool.value[i]=2
    } else if (goodheros.value[i].indexOf(teamhero.value[0][i]) != -1) {
      isInPool.value[i]=1
    }
  }
  // console.log(isInPool.value)
}

onMounted(async ()=> {
  freshwinrate(teamhero);

  try {
    const res = await getHerospool();
    // console.log(res.data)
    data.value = res.data
    for(let i=0;i<5;i++) {
      bestheros.value[i]=data.value[i].best
      goodheros.value[i]=data.value[i].good
    }
    freshIsInPool(teamhero, bestheros, goodheros);
  } catch (error) {
    ElMessage({
      showClose: true,
      message: '获取英雄池失败' + error,
      type: 'error',
    })
  }
})

</script>

<template>
  <div class="analyse-part">
    <div class="compare">
      <div v-for="hero,i in teamhero[0]" class="one-posi">
        <div class="hero-name" 
        :class="{
          hero_name_normal:isInPool[i]==0,
          hero_name_good:isInPool[i]==1,
          hero_name_best:isInPool[i]==2,
          }">
          {{ teamhero[0][i] }}
        </div>
        <div class="win-rate">
          对局胜率：{{ showrate[i] }}
        </div>
        <div class="hero-name">
          {{ teamhero[1][i] }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.analyse-part {
  width: 1420px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  margin:auto;
  border-top: 2px solid #dcdfe6;
}

.compare{
  margin-top: 20px;
  width: 1420px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border: 2px solid #dcdfe6;
}

.one-posi {
  height: 40px;
  width: 1400px;
  margin: 5px 10px;
  display: flex;
  flex-direction: row;
  border: 2px solid #409EFF;
  justify-content: space-between;
}

.hero-name {
  height: 40px;
  width: 300px;
  
  text-align: center;
  font-size: 25px;
  line-height: 40px;
}

.hero_name_normal{
  background-color: beige;
}

.hero_name_good{
  background-color: #E6A23C;
}

.hero_name_best{
  background-color: #67C23A;
}

.win-rate {
  height: 40px;
  width: 150px;
  text-align: center;
  font-size: 15px;
  line-height: 40px;
}

</style>