import {
  GetMarketRequestBuyerFiltersMeta,
  GetMarketRequestBuyerFiltersPayload,
} from 'types/store/GetMarketRequestBuyerFiltersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_MARKET_REQUEST_BUYER_FILTERS';
const asyncAction = createAsyncAction<
  GetMarketRequestBuyerFiltersMeta,
  GetMarketRequestBuyerFiltersPayload
>(ns);

const getMarketRequestBuyerFiltersActions = {
  ...asyncAction,
};

export default getMarketRequestBuyerFiltersActions;
