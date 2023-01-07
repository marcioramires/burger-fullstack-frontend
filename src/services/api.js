import axios from "axios"

const apiBurger = axios.create({
    baseURL: 'http://localhost:3001'
})

apiBurger.interceptors.request.use(async config => {
    const userData = await localStorage.getItem('burger:userData')
    const token = userData && JSON.parse(userData).token
    config.headers.authorization = `Bearer ${token}`
    return config
})

export default apiBurger