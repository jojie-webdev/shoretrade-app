export type SOCKET_EVENT =
  | 'NEW_ORDER'
  | 'NEW_CREDIT'
  | 'UPDATE_REMAINING_BOXES'
  | 'INAPP_NOTIFICATION'
  | 'INAPP_NOTIFICATION_READ'
  | 'INAPP_NOTIFICATION_DELETED'
  | 'CART_ITEM_ADDED'
  | 'CART_ITEM_REMOVED'
  | 'CART_EXPIRY_WARNING'
  | 'CART_EXPIRY_EXTENDED'
  | 'CART_CLOSED'
  | 'BARCODE_SCANNED'
  | 'WEIGHT_CONFIRMED'
  | 'UPDATE_LISTING';

export type SocketState = {
  connected: boolean;
};
