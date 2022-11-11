import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "1c9ef8d9-3ac4-4a66-8576-25dfbcc182dd"
    }
})

export const securityAPI = {
    getCaptcha: () => {
      return instance.get(`/security/get-captcha-url`)
    }
}