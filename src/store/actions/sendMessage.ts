import {
  SendMessageMeta,
  SendMessagePayload,
} from 'types/store/SendMessageState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'SEND_MESSAGE';
const asyncAction = createAsyncAction<SendMessageMeta, SendMessagePayload>(ns);

const sendMessageActions = {
  ...asyncAction,
};

export default sendMessageActions;
