import {
  DeleteMarketRequestOfferMeta,
  DeleteMarketRequestOfferPayload,
} from 'types/store/DeleteMarketRequestOfferState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'DELETE_MARKET_REQUEST_OFFER';
const asyncAction = createAsyncAction<
  DeleteMarketRequestOfferMeta,
  DeleteMarketRequestOfferPayload
>(ns);

const deleteMarketRequestOfferActions = {
  ...asyncAction,
};

export default deleteMarketRequestOfferActions;
