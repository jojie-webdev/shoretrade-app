import {
  GetMarketEstimateMeta,
  GetMarketEstimatePayload,
} from 'types/store/GetMarketEstimateState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_MARKET_ESTIMATE';
const asyncAction = createAsyncAction<
  GetMarketEstimateMeta,
  GetMarketEstimatePayload
>(ns);

const getMarketEstimateActions = {
  ...asyncAction,
};

export default getMarketEstimateActions;
