import {
  GetAllMarketRequestMeta,
  GetAllMarketRequestPayload,
} from 'types/store/GetAllMarketRequestState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_ALL_MARKET_REQUESTS';
const asyncAction = createAsyncAction<
  GetAllMarketRequestMeta,
  GetAllMarketRequestPayload
>(ns);

const getAllMarketRequestsActions = {
  ...asyncAction,
};

export default getAllMarketRequestsActions;
