import {
  SendDisputeMeta,
  SendDisputePayload,
} from 'types/store/SendDisputeState';
import { createAsyncReducer } from 'utils/Redux';

import { sendDisputeActions } from '../actions';

export default createAsyncReducer<SendDisputeMeta, SendDisputePayload>(
  sendDisputeActions
);
