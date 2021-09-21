export type SOCKET_EVENT =
  | 'NEW_ORDER'
  | 'NEW_CREDIT'
  | 'UPDATE_REMAINING_BOXES'
  | 'INAPP_NOTIFICATION'
  | 'INAPP_NOTIFICATION_READ'
  | 'INAPP_NOTIFICATION_DELETED';

export type SocketState = {
  connected: boolean;
};
