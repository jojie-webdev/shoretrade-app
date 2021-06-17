import { WebSocketMeta, WebSocketPayload } from 'types/store/WebSocketState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'WEB_SOCKET';

const asyncAction = createAsyncAction<WebSocketMeta, WebSocketPayload>(ns);

const webSocketActions = {
  ...asyncAction,
};

export default webSocketActions;
