export interface LoginDataType {
  email: string;
  password: string;
  captcha?: string;
}

export interface AuthResponseType {
  data: ResponseDataType;
  fieldErrors: string[];
  messages: string[];
  resultCode?: number;
}

export interface ResponseDataType {
  email: string;
  id: number;
  login: string;
}
