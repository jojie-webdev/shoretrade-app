export type SOCKET_EVENT =
  | 'NEW_ORDER'
  | 'NEW_CREDIT'
  | 'UPDATE_REMAINING_BOXES'
  | 'INAPP_NOTIFICATION';

export type SocketState = {
  connected: boolean;
};
