import axios from 'axios'

const API_ROOT = process.env.API_ROOT

const api = axios.create({
  baseURL: API_ROOT
})

// 接口请求前
api.interceptors.request.use(function (request) {
  return request
})

api.interceptors.response.use(
  function (response) {
    return response.data.data
  },
  function (error) {
    if (!error.response) {
      // console.info('网络请求错误，可能是服务器挂掉了')
      return Promise.reject(error)
    }
    return Promise.reject(error.response)
  }
)

export default api
