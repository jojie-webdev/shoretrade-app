import { SocketState, SOCKET_EVENT } from 'types/store/SocketState';
import { createUpdateAction, createClearAction } from 'utils/Redux';

const ns = 'SOCKET';
const eventNS = 'SOCKET_EVENT';
const updateAction = createUpdateAction<Partial<SocketState>>(ns);
const clearAction = createClearAction(ns);

export const SocketEvents: Record<SOCKET_EVENT, string> = {
  NEW_ORDER: `${eventNS}/NEW_ORDER`,
  NEW_CREDIT: `${eventNS}/NEW_CREDIT`,
  UPDATE_REMAINING_BOXES: `${eventNS}/UPDATE_REMAINING_BOXES`,
  INAPP_NOTIFICATION: `${eventNS}/INAPP_NOTIFICATION`,
  INAPP_NOTIFICATION_READ: `${eventNS}/INAPP_NOTIFICATION_READ`,
  INAPP_NOTIFICATION_DELETED: `${eventNS}/INAPP_NOTIFICATION_DELETED`,
  CART_ITEM_ADDED: `${eventNS}/CART_ITEM_ADDED`,
  CART_ITEM_REMOVED: `${eventNS}/CART_ITEM_REMOVED`,
  CART_EXPIRY_WARNING: `${eventNS}/CART_EXPIRY_WARNING`,
  CART_EXPIRY_EXTENDED: `${eventNS}/CART_EXPIRY_EXTENDED`,
  CART_CLOSED: `${eventNS}/CART_CLOSED`,
  UPDATE_LISTING: `${eventNS}/UPDATE_LISTING`,
  BARCODE_SCANNED: `${eventNS}/BARCODE_SCANNED`,
  WEIGHT_CONFIRMED: `${eventNS}/WEIGHT_CONFIRMED`,
};

const socketActions = {
  ...updateAction,
  ...clearAction,
  triggerEvent: (event: SOCKET_EVENT, payload: any) => ({
    type: `${eventNS}/${event}`,
    payload,
  }),
  ...SocketEvents,
};

export default socketActions;
