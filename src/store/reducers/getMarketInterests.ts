import {
  GetMarketInterestsMeta,
  GetMarketInterestsPayload,
} from 'types/store/GetMarketInterestsState';
import { createAsyncReducer } from 'utils/Redux';

import { getMarketInterestsActions } from '../actions';

export default createAsyncReducer<
  GetMarketInterestsMeta,
  GetMarketInterestsPayload
>(getMarketInterestsActions);
