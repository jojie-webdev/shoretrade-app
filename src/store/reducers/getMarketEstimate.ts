import {
  GetMarketEstimateMeta,
  GetMarketEstimatePayload,
} from 'types/store/GetMarketEstimateState';
import { createAsyncReducer } from 'utils/Redux';

import { getMarketEstimateActions } from '../actions';

export default createAsyncReducer<
  GetMarketEstimateMeta,
  GetMarketEstimatePayload
>(getMarketEstimateActions);
