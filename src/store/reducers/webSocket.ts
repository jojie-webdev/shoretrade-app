import { WebSocketMeta, WebSocketPayload } from 'types/store/WebSocketState';
import { createAsyncReducer } from 'utils/Redux';

import { webSocketActions } from '../actions';

export default createAsyncReducer<WebSocketMeta, WebSocketPayload>(
  webSocketActions
);
