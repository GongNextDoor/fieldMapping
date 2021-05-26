import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: 'http://172.18.40.40:20001/',
  timeout: 6000
})

// request过滤器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response过滤器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== '0') {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: '服务器异常',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

/**
 * 这里进一步封装了axios的各种常见请求，如果有接口胡乱接值的情况就直接用service手动写值吧
 */
export default {
  service: service,
  get: (url, params) => {
    return service({
      url: url,
      method: 'get',
      params
    })
  },
  post: (url, data) => {
    return service({
      url: url,
      method: 'post',
      data
    })
  },
  formData: (url, data) => {
    return service({
      url: url,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(data)
    })
  },
  put: (url, data) => {
    return service({
      url: url,
      method: 'put',
      data
    })
  },
  delete: (url, params) => {
    return service({
      url: url,
      method: 'delete',
      params
    })
  }
}
