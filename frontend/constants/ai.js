import axios from "axios"

export const ai_api = axios.create({
    baseURL:'http://127.0.0.1:5000/api/super_agent'
})
