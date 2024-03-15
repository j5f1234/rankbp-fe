import { service } from "./request";

// 像后端发送英雄池
export async function postHerospool(data:any) {
  return service({
    method: "post",
    url:"/herospool/change",
    data:data,
  })
}

export async function getHerospool() {
  return service({
    method: "get",
    url:"/herospool/get",
  })
}