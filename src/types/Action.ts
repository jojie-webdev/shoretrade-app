export interface Action<Payload = any> {
  type: string;
  payload: Payload;
}

export interface AsyncAction<Request = any, Payload = any> {
  type: string;
  meta: Request;
  payload: Payload;
  error: string;
}
export interface SocketAction<Meta = any, Payload = any> {
  type: string;
  meta: Meta;
  payload: Payload;
  error: string;
}
