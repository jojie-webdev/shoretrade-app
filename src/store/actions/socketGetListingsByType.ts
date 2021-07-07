import {
  SocketGetListingsByTypeMeta,
  SocketGetListingsByTypePayload,
} from 'types/store/socketGetListingsByTypeState';
import { createSocketAction } from 'utils/Redux';

const ns = 'WEB_SOCKET_UPDATE_REMAINING_BOXES/GET_LISTINGS_BY_TYPE';

const socketAction = createSocketAction<
  SocketGetListingsByTypeMeta,
  SocketGetListingsByTypePayload
>(ns);

const sockgetGetListingsByTypeAction = {
  ...socketAction,
};

export default sockgetGetListingsByTypeAction;
