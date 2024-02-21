import { apiSlice } from "../api/apiSlice";
import { type AuthResponseType, type LoginDataType, type ResponseDataType } from "./types";

export const authApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<AuthResponseType, LoginDataType>({
      query: (data: LoginDataType) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: build.mutation<unknown, void>({
      query: () => ({
        url: "/auth/login",
        method: "DELETE",
      }),
      invalidatesTags: ["Auth"],
    }),
    me: build.query<ResponseDataType, void>({
      query: () => ({
        url: "auth/me",
      }),
      transformResponse: (response: AuthResponseType) => {
        return response.data;
      },
      providesTags: ["Auth"],
    }),
    getCaptcha: build.query<{ url: string }, void>({
      query: () => ({
        url: "/security/get-captcha-url",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useLazyMeQuery,
  useLazyGetCaptchaQuery,
} = authApi;
