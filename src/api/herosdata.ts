import { service } from "./request";

// 像后端发送英雄基础数据
export async function postHerosBaseData(data:any) {
  return service({
    method: "post",
    url:"/herosdata/base",
    data:data,
  })
}