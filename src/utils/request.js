import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import config from '@/settings'

// create an axios instance
const service = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 6000 // request timeout
})
service.defaults.withCredentials = true

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['pm-report-token'] = '4fd7d22f40054ec284bfc2a62e841d7e';
    // config.headers['crossDomain'] = true;
    // config.headers['withCredentials'] = true;
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.msg.code != '0000') {
      //未登录状态码
      if (res.msg.code == 1005) {
        let pageUrl = window.location.href;
        let targetUrl = config.baseUrl + '/csportalsite/login?redirectUrl=' + encodeURIComponent(pageUrl)
        window.location.replace(targetUrl)
      }
    } else {
      return res
    }
  },
  error => {
    // console.log('err' + error) // for debug
    // Message({
    //   message: error.response.data.msg || '请求错误',
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service