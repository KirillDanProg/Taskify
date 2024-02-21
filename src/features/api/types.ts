export interface ResponseType<T> {
  resultCode: number;
  messages: string[];
  data: T;
}
