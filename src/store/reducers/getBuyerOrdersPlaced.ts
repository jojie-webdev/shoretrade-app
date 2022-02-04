import {
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload,
} from 'types/store/GetAllBuyerOrdersState';
import { createAsyncReducer } from 'utils/Redux';

import { getBuyerOrdersPlacedActions } from '../actions';

export default createAsyncReducer<
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload
>(getBuyerOrdersPlacedActions);
