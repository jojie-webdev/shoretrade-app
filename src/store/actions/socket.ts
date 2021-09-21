import { SocketState, SOCKET_EVENT } from 'types/store/SocketState';
import { createUpdateAction, createClearAction } from 'utils/Redux';

const ns = 'SOCKET';
const eventNS = 'SOCKET_EVENT';
const updateAction = createUpdateAction<Partial<SocketState>>(ns);
const clearAction = createClearAction(ns);

const socketActions = {
  ...updateAction,
  ...clearAction,
  triggerEvent: (event: SOCKET_EVENT, payload: any) => ({
    type: `${eventNS}/${event}`,
    payload,
  }),
  NEW_ORDER: `${eventNS}/NEW_ORDER`,
  NEW_CREDIT: `${eventNS}/NEW_CREDIT`,
  UPDATE_REMAINING_BOXES: `${eventNS}/UPDATE_REMAINING_BOXES`,
  INAPP_NOTIFICATION: `${eventNS}/INAPP_NOTIFICATION`,
  INAPP_NOTIFICATION_READ: `${eventNS}/INAPP_NOTIFICATION_READ`,
  INAPP_NOTIFICATION_DELETED: `${eventNS}/INAPP_NOTIFICATION_DELETED`,
};

export default socketActions;
