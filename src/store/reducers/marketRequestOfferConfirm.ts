import { GenericResponse } from 'types/GenericResponse';
import { OfferConfirm } from 'types/store/MarketOfferState';
import { createAsyncReducer } from 'utils/Redux';

import { marketRequestOfferConfirm } from '../actions';

export default createAsyncReducer<OfferConfirm, GenericResponse>(
  marketRequestOfferConfirm
);
