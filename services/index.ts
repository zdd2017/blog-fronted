import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000
})
