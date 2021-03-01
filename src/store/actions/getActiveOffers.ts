import {
  GetActiveOffersMeta,
  GetActiveOffersPayload,
} from 'types/store/GetActiveOffersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_ACTIVE_OFFERS';
const asyncAction = createAsyncAction<
  GetActiveOffersMeta,
  GetActiveOffersPayload
>(ns);

const getActiveOffersActions = {
  ...asyncAction,
};

export default getActiveOffersActions;
