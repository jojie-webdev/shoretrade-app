import {
  DeleteMarketRequestMeta,
  DeleteMarketRequestPayload,
} from 'types/store/DeleteMarketRequestState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'DELETE_MARKET_REQUEST';
const asyncAction = createAsyncAction<
  DeleteMarketRequestMeta,
  DeleteMarketRequestPayload
>(ns);

const deleteMarketRequestActions = {
  ...asyncAction,
};

export default deleteMarketRequestActions;
