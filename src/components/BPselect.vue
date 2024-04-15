<script setup lang="ts">
import { useHerosName } from '@/composable/useHerosData';
import { ElMessage } from 'element-plus';
import { nextTick, provide, ref } from 'vue';
import BPanalyse from '@/components/BPanalyse.vue'

const positions=["all","top","jug","mid","adc","sup"];
const teamposi=["top","jug","mid","adc","sup"];
const teamposichoose=ref([[0,0,0,0,0],[0,0,0,0,0]]);
// const checkedhero=ref([["","","","",""],["","","","",""]])
const checkedhero=ref([ [ "aatrox", "brand", "hwei", "draven", "pantheon" ], [ "volibear", "xinzhao", "yone", "samira", "nautilus" ] ])
const isShow=ref([0,0,0,0,0,0])

// 同一个位置里英雄名不能有重复
const {namelist,imagelist}=useHerosName()
const posichoose=ref(-1)
const team=ref(-1)
const pageact=ref(-1)
const isAnalyse=ref(0)


function changePage(i:number,teamchoose:number,posi:number) {
  pageact.value=i;
  isShow.value=[0,0,0,0,0,0];
  isShow.value[i]=1;

  nextTick(()=> {
    for (let j=0;j<namelist.value[i].length;++j){
      let heroname=namelist.value[i][j]
      let proj=document.getElementById(heroname) as HTMLInputElement;
      if (proj && checkedhero.value[teamchoose][posi] && (heroname != checkedhero.value[teamchoose][posi])){
        proj.checked = false;
      } 
      if (proj && heroname == checkedhero.value[teamchoose][posi]){
        proj.checked = true;
      }
    }
  })
}

function chooseposi(i:number,teamchoose:number) {
  teamposichoose.value=[[0,0,0,0,0],[0,0,0,0,0]];
  teamposichoose.value[teamchoose][i]=1;
  posichoose.value=i;
  team.value=teamchoose;
}

function notshowAnalyse() {
  isAnalyse.value=0;
}

function checkinghero() {
  isAnalyse.value=0;
  for(let i=0;i<5;++i) {
    if ((checkedhero.value[0][i] == "") || (checkedhero.value[1][i] == "")){
      ElMessage({
        showClose: true,
        message: '未完整选择双方阵容',
        type: 'error',
      })
      return
    }
  }
  const ary=checkedhero.value[0].concat(checkedhero.value[1])
  for (var i = 0; i < ary.length; i++) {
    if(ary.indexOf(ary[i]) != i) {
      ElMessage({
        showClose: true,
        message: '存在重复英雄，请重新选择阵容',
        type: 'error',
      })
      return
    }
  }
  isAnalyse.value=1;
}

provide("checkedhero",checkedhero);
// provide("isAnalyse",isAnalyse)
</script>

<template>
  <div class="BPpart">
    <div class="teampart">
      <div v-for="(posi,i) in teamposi" class="five-box">
        <div class="choosename">
          {{ checkedhero[0][i] }}
        </div>
        <el-button  class="five-box-name"
        @click="chooseposi(i,0)" :class="{actselectposi:teamposichoose[0][i]}">
          {{ posi }}
        </el-button>
      </div>
    </div>
    <div class="heroselect">
      <el-button class="sure-button" 
      @click="checkinghero()" type="success">
        确定
      </el-button>
      <div class="select-tip">
        {{ checkedhero }}，注：左边为我方，右边为敌方。后面所有分析均针对我方
      </div>
      <div class="header">
        <el-button v-for="posi,i in positions" 
        @click="changePage(i,team,posichoose)"
        class="posi-button" :class="{actposi:isShow[i]}"
        type="primary" plain>
          {{ posi }}
        </el-button>
      </div>
      <div class="form-box" v-if="team >=0 && pageact >= 0">
        <div v-for="hero,j in namelist[pageact]" class="select-box" @click="notshowAnalyse()">
          <label :for="hero" class="input-box">
            <p class="text-box"> {{ hero }}</p>
            <img class="img-box" :src="imagelist[pageact][j]">
          </label>
          <input type="radio" v-model="checkedhero[team][posichoose]" 
          :id="hero" :value="hero">
        </div>
      </div>
    </div>
    <div class="teampart">
      <div v-for="(posi,i) in teamposi" class="five-box">
        <div class="choosename">
          {{ checkedhero[1][i] }}
        </div>
        <el-button class="five-box-name" 
        @click="chooseposi(i,1)" :class="{actselectposi:teamposichoose[1][i]}">
          {{ posi }}
        </el-button>
      </div>
    </div>
  </div>
  <BPanalyse v-if="isAnalyse"></BPanalyse>
</template>

<style scoped>
.BPpart {
  width: 1420px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  margin:auto;
  margin-top: -2px;
  border-top: 2px solid #dcdfe6;
}

.teampart {
  width: 250px;
  height: 600px;
  display: flex;
  flex-direction: column;
  border: 2px solid #dcdfe6;
  margin: 88px 0px 0px 0px;
}

.five-box {
  margin: 10px 50px 10px 50px;
  height: 100px;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.five-box-name {
  display: flex;
  height: 50px;
  width: 150px;
  border: 2px solid #409EFF;
  align-items: center;
  text-align: center;
  font-size: 35px;
  display: flex;
  flex-direction: column;
}

.actselectposi{
  background-color: #c6e2ff;
}

.choosename{
  height: 50px;
  width: 148px;
  border: 2px solid #dcdfe6;
  border-radius: 5px;
  text-align: center;
  font-size: 25px;
}

.heroselect {
  width: 920px;
  height: fit-content;
  border: 2px solid #dcdfe6;
  display: flex;
  flex-direction: column;
}

.sure-button{
  width: 80px;
  height: 40px;
  margin: 10px 60px;
}

.select-tip {
  height: 30px;
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
  width: 150px;
  margin:0px;
  height:40px;
  font-size: 20px;
}

.actposi{
  background-color: #409eff;
  color: #FFFFFF;
}

.form-box {
  margin-top: 20px;
  width: 920px;
  height: 600px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: hidden;
}

.select-box {
  margin:5px 10px;
  width: 130px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:flex-start;
  /* border: 2px solid #8D9095; */
}

.input-box{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.img-box {
  width: 90px;
  height: 90px;
}

.text-box {
  margin: 0px;
  text-align: center;
}
</style>