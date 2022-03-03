import {
  GetBuyerSearchFiltersMeta,
  GetBuyerSearchFiltersPayload,
} from 'types/store/GetBuyerSearchFiltersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_BUYER_SEARCH_FILTERS';
const asyncAction = createAsyncAction<
  GetBuyerSearchFiltersMeta,
  GetBuyerSearchFiltersPayload
>(ns);

const getBuyerSearchFiltersActions = {
  ...asyncAction,
};

export default getBuyerSearchFiltersActions;
