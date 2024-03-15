import axios from "axios"

// 内部后端请求示例
export const service=axios.create({
  baseURL:"/api",
  timeout:3000,
})

service.interceptors.response.use(
  function(res){
    if (res && res.data){
      if(res.data.success) {
        return res.data
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