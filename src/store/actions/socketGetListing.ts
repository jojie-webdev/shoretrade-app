import {
  SocketGetListingMeta,
  SocketGetListingPayload,
} from 'types/store/socketGetListingState';
import { createSocketAction } from 'utils/Redux';

const ns = 'WEB_SOCKET_UPDATE_REMAINING_BOXES/GET_LISTING';

const socketAction = createSocketAction<
  SocketGetListingMeta,
  SocketGetListingPayload
>(ns);

const socketGetListingAction = {
  ...socketAction,
};

export default socketGetListingAction;
