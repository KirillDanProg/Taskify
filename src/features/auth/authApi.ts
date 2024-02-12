import { apiSlice } from "../api/apiSlice";
import { LoginDataType } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponseType, LoginDataType>({
      query: (data: LoginDataType) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: build.mutation<unknown, void>({
      query: () => ({
        url: `/auth/login`,
        method: "DELETE",
      }),
      invalidatesTags: ["Auth"],
    }),
    me: build.query<AuthResponseType, void>({
      query: () => ({
        url: `auth/me`,
      }),
      providesTags: ["Auth"],
    }),
    getCaptcha: build.query<{ url: string }, void>({
      query: () => ({
        url: `/security/get-captcha-url`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useLazyMeQuery,
  useLazyGetCaptchaQuery,
} = authApi;

type AuthResponseType = {
  data: {
    email: string;
    id: number;
    login: string;
  };
  fieldErrors: string[];
  messages: string[];
  resultCode?: number;
};
