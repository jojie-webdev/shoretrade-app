import {
  SocketAllBuyerListingsMeta,
  SocketAllBuyerListingsPayload,
} from 'types/store/socketAllBuyerListingsState';
import { createSocketReducer } from 'utils/Redux';

import { socketAllBuyerListingsActions } from '../actions';

export default createSocketReducer<
  SocketAllBuyerListingsMeta,
  SocketAllBuyerListingsPayload
>(socketAllBuyerListingsActions);
