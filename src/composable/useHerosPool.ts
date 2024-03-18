import { getHerospool, postHerospool } from "@/api/herospool";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import herosdata from "../../public/herosdata.json"

// const checkedheros=ref([[[],[],[],[],[]],[[],[],[],[],[]]])
// 发送修改好的英雄池表单到后端
export async function useHerosPool(herospool:any) {
  let data={
    "heropool":[
      {"best":[],"good":[],},
      {"best":[],"good":[],},
      {"best":[],"good":[],},
      {"best":[],"good":[],},
      {"best":[],"good":[],},
    ]
  }
  for(let i=0;i<5;++i){
    for(let j=0;j<herospool[0][i].length;++j){
      data.heropool[i].best[j] = herospool[0][i][j]
    }
    for(let j=0;j<herospool[1][i].length;++j){
      data.heropool[i].good[j] = herospool[1][i][j]
    }
  }

  try {
    console.log(data)
    const res = await postHerospool(data)
  } catch (error) {
    ElMessage({
        showClose: true,
        message: '数据保存失败：' + error,
        type: 'error',
    })
  }
}

// 从后端获取英雄池，无图片
export function useGetHerosPool() {
  const data=ref([
    {"best":[],"good":[],},
    {"best":[],"good":[],},
    {"best":[],"good":[],},
    {"best":[],"good":[],},
    {"best":[],"good":[],},
  ])
  const bestheros=ref([[],[],[],[],[]])
  const goodheros=ref([[],[],[],[],[]])
  const checkedheros=ref([[[],[],[],[],[]],[[],[],[],[],[]]])
  onMounted(async () => {
    try {
      const res = await getHerospool();
      // console.log(res.data)
      data.value = res.data
      for(let i=0;i<5;i++) {
        bestheros.value[i]=data.value[i].best
        goodheros.value[i]=data.value[i].good
      }
      checkedheros.value[0]=bestheros.value;
      checkedheros.value[1]=goodheros.value;
    } catch (error) {
      ElMessage({
        showClose: true,
        message: '获取英雄池失败' + error,
        type: 'error',
      })
    }
  })
  return {bestheros,goodheros,checkedheros}
}

// 从后端获取英雄池，从json中获取对应图片
export function useGetHerosPoolwithImg() {
  const data=ref([
    {"best":[],"good":[],},
    {"best":[],"good":[],},
    {"best":[],"good":[],},
    {"best":[],"good":[],},
    {"best":[],"good":[],},
  ])
  const heroslist=herosdata.championMetaList
  const bestimgs = ref([[],[],[],[],[]])
  const goodimgs = ref([[],[],[],[],[]])
  const bestheros=ref([[],[],[],[],[]])
  const goodheros=ref([[],[],[],[],[]])
  const checkedheros=ref([[[],[],[],[],[]],[[],[],[],[],[]]])
  onMounted(async () => {
    try {
      const res = await getHerospool();
      // console.log(res.data)
      data.value = res.data
      for(let i=0;i<5;i++) {
        bestheros.value[i]=data.value[i].best
        goodheros.value[i]=data.value[i].good
      }
      checkedheros.value[0]=bestheros.value;
      checkedheros.value[1]=goodheros.value;
      for (let j=0;j<5;++j){
        for (let k=0;k<bestheros.value[j].length;++k){
          for (let i=0;i<heroslist.length;++i){
            if(heroslist[i].name == bestheros.value[j][k]) {
              bestimgs.value[j].push(heroslist[i].image_url)
            }
          }
        }
        for (let k=0;k<goodheros.value[j].length;++k){
          for (let i=0;i<heroslist.length;++i){
            if(heroslist[i].name == goodheros.value[j][k]) {
              goodimgs.value[j].push(heroslist[i].image_url)
            }
          }
        }
      }
    } catch (error) {
      ElMessage({
        showClose: true,
        message: '获取英雄池失败' + error,
        type: 'error',
      })
    }
  })
  return{bestheros,goodheros,bestimgs,goodimgs} 
}