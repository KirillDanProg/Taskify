export type ResponseType<T> = {
  resultCode: number;
  messages: string[];
  data: T;
};

export enum ResultCode {
  OK = 0,
  FAILED = 1,
  CAPTCHA = 10,
}
