export type LoginDataType = {
  email: string;
  password: string;
  captcha?: string;
};

export type AuthResponseType = {
  data: ResponseDataType;
  fieldErrors: string[];
  messages: string[];
  resultCode?: number;
};

export type ResponseDataType = {
  email: string;
  id: number;
  login: string;
};
