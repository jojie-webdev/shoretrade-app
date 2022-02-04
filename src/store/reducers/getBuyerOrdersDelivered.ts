import {
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload,
} from 'types/store/GetAllBuyerOrdersState';
import { createAsyncReducer } from 'utils/Redux';

import { getBuyerOrdersDeliveredActions } from '../actions';

export default createAsyncReducer<
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload
>(getBuyerOrdersDeliveredActions);
