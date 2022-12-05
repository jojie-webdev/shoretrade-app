import {
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload,
} from 'types/store/GetAllBuyerOrdersState';
import { createAsyncReducer } from 'utils/Redux';

import { getAllBuyerOrdersActions } from '../actions';

export default createAsyncReducer<
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload
>(getAllBuyerOrdersActions);
