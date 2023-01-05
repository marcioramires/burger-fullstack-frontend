import axios from "axios"

const apiBurger = axios.create({
    baseURL: 'http://localhost:3001'
})

export default apiBurger