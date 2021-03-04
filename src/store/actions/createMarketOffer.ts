import {
  CreateMarketOfferMeta,
  CreateMarketOfferPayload,
} from 'types/store/CreateMarketOfferState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'CREATE_MARKET_OFFER';
const asyncAction = createAsyncAction<
  CreateMarketOfferMeta,
  CreateMarketOfferPayload
>(ns);

const createMarketOfferRequestActions = {
  ...asyncAction,
};

export default createMarketOfferRequestActions;
