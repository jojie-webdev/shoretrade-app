import { createAsyncAction } from 'utils/Redux';
import {
  CreateSellerCounterOfferMeta,
  CreateSellerCounterOfferPayload,
} from 'types/store/CreateSellerCounterOfferState';

const ns = 'CREATE_SELLER_COUNTER_OFFER';
const asyncAction = createAsyncAction<
  CreateSellerCounterOfferMeta,
  CreateSellerCounterOfferPayload
>(ns);

const createSellerCounterOfferActions = {
  ...asyncAction,
};

export default createSellerCounterOfferActions;
