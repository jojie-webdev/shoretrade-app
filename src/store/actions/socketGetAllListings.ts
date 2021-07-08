import {
  SocketGetAllListingsMeta,
  SocketGetAllListingsPayload,
} from 'types/store/socketGetAllListingsState';
import { createSocketAction } from 'utils/Redux';

const ns = 'WEB_SOCKET_UPDATE_REMAINING_BOXES/GET_ALL_LISTINGS';

const socketAction = createSocketAction<
  SocketGetAllListingsMeta,
  SocketGetAllListingsPayload
>(ns);

const socketGetAllListingsAction = {
  ...socketAction,
};

export default socketGetAllListingsAction;
