import {
  SocketCreditMeta,
  SocketCreditPayload,
} from 'types/store/SocketCreditState';
import { createSocketReducer } from 'utils/Redux';

import { socketCreditActions } from '../actions';

export default createSocketReducer<SocketCreditMeta, SocketCreditPayload>(
  socketCreditActions
);
