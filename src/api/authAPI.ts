// import axios from "axios";
// // import {AuthInitialStateType, LoginDataType} from "../state/reducers/auth-reducer/auth-reduser";
// import {ResponseType} from "./todolists-api";
//
// const instance = axios.create({
//     baseURL: "https://social-network.samuraijs.com/api/1.1",
//     withCredentials: true,
//     headers: {
//         "API-KEY": "1c9ef8d9-3ac4-4a66-8576-25dfbcc182dd"
//     }
// })
//
// export const authAPI = {
//     login: (data: LoginDataType) => {
//         return instance.post<ResponseType<{userId: number}>>(`/auth/login`, data)
//     },
//     logout: () =>  {
//         return instance.delete<ResponseType<{}>>(`/auth/login`)
//     },
//     me: () => {
//         return instance.get<ResponseType<AuthInitialStateType>>(`auth/me`)
//     }
// }
export {}