import { PlaceOrderMeta, PlaceOrderPayload } from 'types/store/PlaceOrderState';
import { createAsyncReducer } from 'utils/Redux';

import { placeOrderActions } from '../actions';

export default createAsyncReducer<PlaceOrderMeta, PlaceOrderPayload>(
  placeOrderActions
);
