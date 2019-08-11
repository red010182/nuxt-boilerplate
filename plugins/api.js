import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/'
})

axiosInstance.interceptors.response.use((response) => {
  return response
}, function (error = {}) {
  const { response: { data: { message } = {}, status } = {} } = error
  if (message) {
    error.message = message
  }
  if (status === 404) {
    const { request: { responseURL = '' } } = error.response
    console.log(error.response, responseURL)
  }
  if (status === 500) {
    error.message = '系統錯誤'
  }
  return Promise.reject(error)
})

const api = {
  get (url, params) {
    return axiosInstance.get(url, { params })
  },
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  setHeader (dict) {
    Object.keys(dict).forEach((key) => {
      axiosInstance.defaults.headers.common[key] = dict[key]
    })
  }
}

Vue.prototype.$api = api

export default api
