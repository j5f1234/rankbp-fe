import axios from "axios"

// 内部后端请求
export const service=axios.create({
  baseURL:"/api",
  timeout:3000,
})

service.interceptors.response.use(
  function(res){
    if (res && res.data){
      if(res.data.succsee) {
        return res.data.data
      } else {
        return Promise.reject(res.data.error)
      }
    } else {
      return Promise.reject("response error")
    }
    
  },
  function(error) {
  return Promise.reject(error)
})

// opgg爬取资源
export const serviceopgg=axios.create({
  baseURL:"https://www.op.gg",
  timeout:3000
})