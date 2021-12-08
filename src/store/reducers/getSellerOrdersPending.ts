import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
} from 'types/store/GetSellerOrdersState';
import { createAsyncReducer } from 'utils/Redux';

import { getSellerOrdersPendingActions } from '../actions';

export default createAsyncReducer<GetSellerOrdersMeta, GetSellerOrdersPayload>(
  getSellerOrdersPendingActions
);
