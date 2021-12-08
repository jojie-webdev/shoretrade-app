import {
  GetAllSellerOrdersMeta,
  GetAllSellerOrdersPayload,
} from 'types/store/GetAllSellerOrdersState';
import { createAsyncReducer } from 'utils/Redux';

import { getAllSellerOrdersActions } from '../actions';

export default createAsyncReducer<
  GetAllSellerOrdersMeta,
  GetAllSellerOrdersPayload
>(getAllSellerOrdersActions);
