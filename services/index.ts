import axios from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000
})

// axios初始化配置
// api.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
// api.defaults.transformRequest = data => {
//   return qs.stringify(data, { encode: true })
// }

// 响应拦截
api.interceptors.response.use(
  res => {
    if (res.data.code == 200) {
      return Promise.resolve(res.data)
    }
    ElMessage.error(res.data.msg)
    return Promise.reject(res.data)
  },
  error => {
    const errmsg = error.response.data.message
    switch (error?.response.status) {
      case 400: // 客户端请求有误
        ElMessage.error('客户端请求有误，请联系管理员！')
        break
      case 401: // 未授权
        ElMessage.error('未授权，请联系管理员！')
        break
      case 403: // 禁止访问
        ElMessage.error('禁止访问！')
        break
      case 404: // 找不到
        ElMessage.error('访问的资源不存在，请稍后重试！')
        break
      case 502: // bad gateway
      case 503: // service unavailable
      case 504: // gateway timeout
        ElMessage.error('服务器维护中，请稍后重试！')
        break
      case 500: // 服务器内部错误
      default:
        if (errmsg) {
          ElMessage.error(errmsg)
        } else {
          ElMessage.error('系统内部错误！')
        }
        break
    }
  }
)

export class ApiService {
  feature: string
  constructor(feature: string) {
    this.feature = feature
  }
  $get(action: string, params) {
    return api.get(`${this.feature}/${action}`, {
      params
    })
  }
  $post(action: string, params) {
    return api.post(`${this.feature}/${action}`, params)
  }
}
