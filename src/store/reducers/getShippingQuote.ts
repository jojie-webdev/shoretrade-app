import {
  GetShippingQuoteMeta,
  GetShippingQuotePayload,
} from 'types/store/GetShippingQuoteState';
import { createAsyncReducer } from 'utils/Redux';

import { getShippingQuoteActions } from '../actions';

export default createAsyncReducer<
  GetShippingQuoteMeta,
  GetShippingQuotePayload
>(getShippingQuoteActions, (state, action, defaultState) => ({
  [getShippingQuoteActions.CLEAR]: defaultState,
}));
