<script setup lang="ts">
const positions=["top","jug","mid","adc","sup"]
const bestheros=[["啊","1"],["啊","2"],["啊","3"],["啊","4"],["啊","5"]]
const goodheros=[["吧","1"],["吧","2"],["吧","3"],["吧","4"],["吧","5"]]
</script>

<template>
  <div class="showpart">
    
    <div class="position-box">
      <div v-for="position,i in positions" class="position">
        <div class="posi-title">{{ position }}</div>
        <div class="best-title">高熟练度：</div>
        <div v-for="besthero in bestheros[i]" class="best-box">
          <div class="best-img"></div>
          <div class="best-text"> {{ besthero }}</div>
        </div>
        <div class="good-title">低熟练度：</div>
        <div v-for="goodhero in goodheros[i]" class="best-box">
          <div class="best-img"></div>
          <div class="best-text"> {{ goodhero }}</div>
        </div>
      </div>      
    </div>
  </div>
</template>



<style scoped>
.showpart {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.position-box {
  padding:20px 0px;
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;  
  border: 2px solid #dcdfe6;
  margin-top: 20px;
}

.position {
  border: 2px solid #66b1ff;
  width: 15%;
  height: fit-content;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
}

.posi-title{
  width: 100%;
  height: 60px;
  text-align: center;
  border-bottom: 2px solid #dcdfe6;
  font-size: 40px;
}

.best-title {
  width: 100%;
  height: 25px;
  margin:5px 0px;
  font-size: 20px;
  text-align: left;
  color:#67C23A;
}

.best-box {
  margin:5px 0px 5px 5px; 
  height: 25px;
  display: flex;
  flex-direction: row;
}
.best-img {
  height: 25px;
  width: 25px;
}


.best-text {
  height: 25px;
  font-size: 20px;
  margin-left: 5px;
  text-align: left;
}

.good-title {
  width: 100%;
  height: 25px;
  margin:5px 0px;
  font-size: 20px;
  text-align: left;
  color:#E6A23C;
  border-top: 2px solid #dcdfe6;
}

</style>