import {
  SocketGetAllListingsMeta,
  SocketGetAllListingsPayload,
} from 'types/store/socketGetAllListingsState';
import { createSocketReducer } from 'utils/Redux';

import { socketGetAllListingsActions } from '../actions';

export default createSocketReducer<
  SocketGetAllListingsMeta,
  SocketGetAllListingsPayload
>(socketGetAllListingsActions);
