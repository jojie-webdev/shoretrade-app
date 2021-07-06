import {
  SocketHomePageMeta,
  SocketHomePagePayload,
} from 'types/store/socketHomePageState';
import { createSocketAction } from 'utils/Redux';

const ns = 'WEB_SOCKET_UPDATE_REMAINING_BOXES/HOME_PAGE';

const socketAction = createSocketAction<
  SocketHomePageMeta,
  SocketHomePagePayload
>(ns);

const socketHomePageActions = {
  ...socketAction,
};

export default socketHomePageActions;
