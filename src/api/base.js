import axios from 'axios'

const { VITE_APP_BASE_URL } = import.meta.env


const service = axios.create({ baseURL: VITE_APP_BASE_URL })

export { service }

