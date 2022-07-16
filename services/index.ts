import axios from 'axios'
import qs from 'qs'

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000
})

// axios初始化配置
api.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
api.defaults.transformRequest = data => {
  return qs.stringify(data, { encode: true })
}

export default api
