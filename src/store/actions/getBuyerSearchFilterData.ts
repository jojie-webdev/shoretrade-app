import {
  GetBuyerSearchFilterDataMeta,
  GetBuyerSearchFilterDataPayload,
} from 'types/store/GetBuyerSearchFilterDataState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_BUYER_SEARCH_FILTER_DATA';
const asyncAction = createAsyncAction<
  GetBuyerSearchFilterDataMeta,
  GetBuyerSearchFilterDataPayload
>(ns);

const getBuyerSearchFilterDataActions = {
  ...asyncAction,
};

export default getBuyerSearchFilterDataActions;
