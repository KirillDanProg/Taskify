import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "4c5c13b4-b96c-4659-9867-c3477c73491d"
    }
})

export const securityAPI = {
    getCaptcha: () => {
      return instance.get(`/security/get-captcha-url`)
    }
}