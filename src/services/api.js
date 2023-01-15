import axios from "axios"
import apiURL from '../constants/url'

export const api = axios.create({
    baseURL: apiURL
})

api.interceptors.request.use(async config => {
    const userData = await localStorage.getItem('burger:userData')
    const token = userData && JSON.parse(userData).token
    config.headers.authorization = `Bearer ${token}`
    return config
})