import axios from "axios";

//使用promise进行异步网络请求封装方案
export function request(config) {

  // 本身axios返回的就是promise直接return就行
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/h8',
    timeout: 5000
  })

  //axios的拦截器
  //请求拦截器
  //作用：加上请求图标/固定加上token/判断url是否符合服务器
  instance.interceptors.request.use(config=>{
    // console.log(config);
    return config
  },error => {
    console.log(error);
  })
  //响应拦截器

  instance.interceptors.response.use(res=>{
    // console.log(res);
    return res.data
  },error => {
    console.log(error);
  })

  //直接返回网络请求
  return instance(config)

}
