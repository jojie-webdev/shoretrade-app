import {
  SocketCreditMeta,
  SocketCreditPayload,
} from 'types/store/SocketCreditState';
import { createSocketAction } from 'utils/Redux';

const ns = 'WEB_SOCKET_CREDIT';

const socketAction = createSocketAction<SocketCreditMeta, SocketCreditPayload>(
  ns
);

const socketCreditActions = {
  ...socketAction,
};

export default socketCreditActions;
