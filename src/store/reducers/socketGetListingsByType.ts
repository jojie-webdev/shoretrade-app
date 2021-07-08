import {
  SocketGetListingsByTypeMeta,
  SocketGetListingsByTypePayload,
} from 'types/store/socketGetListingsByTypeState';
import { createSocketReducer } from 'utils/Redux';

import { sockgetGetListingsByTypeActions } from '../actions';

export default createSocketReducer<
  SocketGetListingsByTypeMeta,
  SocketGetListingsByTypePayload
>(sockgetGetListingsByTypeActions);
