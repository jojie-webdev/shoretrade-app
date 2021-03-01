import {
  GetActiveOffersMeta,
  GetActiveOffersPayload,
} from 'types/store/GetActiveOffersState';
import { createAsyncReducer } from 'utils/Redux';

import { getActiveOffersActions } from '../actions';

export default createAsyncReducer<GetActiveOffersMeta, GetActiveOffersPayload>(
  getActiveOffersActions
);
