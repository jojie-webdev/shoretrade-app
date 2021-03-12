import {
  GetAllMarketRequestFiltersMeta,
  GetAllMarketRequestFiltersPayload,
} from 'types/store/GetAllMarketRequestFiltersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_ALL_MARKET_REQUEST_FILTER';
const asyncAction = createAsyncAction<
  GetAllMarketRequestFiltersMeta,
  GetAllMarketRequestFiltersPayload
>(ns);

const getAllMarketRequestFiltersActions = {
  ...asyncAction,
};

export default getAllMarketRequestFiltersActions;
