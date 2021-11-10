import {
  GetHistoricalListingsMeta,
  GetHistoricalListingsPayload,
} from 'types/store/GetHistoricalListingsState';
import { createAsyncReducer } from 'utils/Redux';

import { getHistoricalListingsActions } from '../actions';

export default createAsyncReducer<
  GetHistoricalListingsMeta,
  GetHistoricalListingsPayload
>(getHistoricalListingsActions);
