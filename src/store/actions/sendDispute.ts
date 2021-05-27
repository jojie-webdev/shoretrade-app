import {
  SendDisputeMeta,
  SendDisputePayload,
} from 'types/store/SendDisputeState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'SEND_DISPUTE';
const asyncAction = createAsyncAction<SendDisputeMeta, SendDisputePayload>(ns);

const sendDisputeActions = {
  ...asyncAction,
};

export default sendDisputeActions;
