import axios from 'axios'
import { TokenKey } from '../utils/const'

const { VITE_APP_BASE_URL } = import.meta.env
export const request = axios.create({
  timeout: 10000,
  baseURL: VITE_APP_BASE_URL,
})
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TokenKey)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },

)
