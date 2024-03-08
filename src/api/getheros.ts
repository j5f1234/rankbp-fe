import {serviceopgg} from "./request"

export async function getHerosData() {
  return serviceopgg({
    method:"get",
    url:"/champions"
  })
}