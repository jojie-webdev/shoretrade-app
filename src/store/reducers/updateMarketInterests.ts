import {
  UpdateMarketInterestsMeta,
  UpdateMarketInterestsPayload,
} from 'types/store/UpdateMarketInterestsState';
import { createAsyncReducer } from 'utils/Redux';

import { updateMarketInterestsActions } from '../actions';

export default createAsyncReducer<
  UpdateMarketInterestsMeta,
  UpdateMarketInterestsPayload
>(updateMarketInterestsActions);
