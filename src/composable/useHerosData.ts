// 将爬取到的英雄数据发到后端
import herosdata from "../../public/herosdata.json"
import { postHerosBaseData } from "@/api/herosdata";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

// 从爬取到的数据拆出英雄基本数据并发送到后端
export function useHerosBaseData() {
  const heroslist=herosdata.championMetaList
  // console.log(heroslist.length)
  let datalist:any=[];
  for (let i = 0; i<heroslist.length;++i){
    const hero=heroslist[i];
    let position=["",""];
    for (let j=0;j<hero.positions.length;++j){
      position[j]=hero.positions[j].name
    }
    datalist[i]={
      "heroId":hero.id,
      "name":hero.key,
      "position1":position[0],
      "position2":position[1],
    }
  }
  const data={
    "heros":datalist
  }
  onMounted(async()=> {
    try {
      // console.log(data)
      const res = await postHerosBaseData(data)
    } catch (error) {
      ElMessage({
          showClose: true,
          message: '更新英雄数据失败：' + error,
          type: 'error',
      })
    }
  })
}

// 从json文件获取英雄名
export function useHerosName() {
  const heroslist=herosdata.championMetaList;
  let namelist:any=ref([[],[],[],[],[],[]]);
  let imagelist:any=ref([[],[],[],[],[],[]]);
  onMounted(async()=> {
    try {
      for (let i = 0; i<heroslist.length;++i){
        const hero = heroslist[i];
        namelist.value[0][i]=hero.key;
        imagelist.value[0][i]=hero.image_url;
        const positions=["TOP","JUNGLE","MID","ADC","SUPPORT"];
        for (let j=0;j<hero.positions.length;++j){
          for (let k=0;k<5;++k){
            if (hero.positions[j].name == positions[k]) {
              namelist.value[1+k].push(hero.key)
              imagelist.value[1+k].push(hero.image_url);
              break
            }
          }
        }
      }
    } catch (error) {      
      ElMessage({
          showClose: true,
          message: '获取英雄名失败：' + error,
          type: 'error',
      })
    }
  })
  return {namelist,imagelist}
}
