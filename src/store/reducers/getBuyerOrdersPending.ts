import {
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload,
} from 'types/store/GetAllBuyerOrdersState';
import { createAsyncReducer } from 'utils/Redux';

import { getBuyerOrdersPendingActions } from '../actions';

export default createAsyncReducer<
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload
>(getBuyerOrdersPendingActions);
