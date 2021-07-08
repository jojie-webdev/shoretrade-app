import {
  SocketGetListingMeta,
  SocketGetListingPayload,
} from 'types/store/socketGetListingState';
import { createSocketReducer } from 'utils/Redux';

import { socketGetListingActions } from '../actions';

export default createSocketReducer<
  SocketGetListingMeta,
  SocketGetListingPayload
>(socketGetListingActions);
