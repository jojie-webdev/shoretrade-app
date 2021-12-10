import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
  GetSellerOrdersResponseItem,
} from 'types/store/GetSellerOrdersState';
import { createAsyncReducer } from 'utils/Redux';

import { getSellerOrdersPlacedActions } from '../actions';

export default createAsyncReducer<GetSellerOrdersMeta, GetSellerOrdersPayload>(
  getSellerOrdersPlacedActions
);
