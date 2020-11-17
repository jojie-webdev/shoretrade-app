import {
  SendMessageMeta,
  SendMessagePayload,
} from 'types/store/SendMessageState';
import { createAsyncReducer } from 'utils/Redux';

import { sendMessageActions } from '../actions';

export default createAsyncReducer<SendMessageMeta, SendMessagePayload>(
  sendMessageActions
);
