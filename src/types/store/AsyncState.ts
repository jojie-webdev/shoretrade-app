import { Socket } from 'socket.io-client';

export type AsyncState<Meta = any, Payload = any> = {
  request: Meta | null;
  data: Payload | null;
  pending: boolean | null;
  error: string;
};

export type SocketState<Meta = any, Payload = any, SocketInstance = any> = {
  data: Payload | null;
  error: string;
};
