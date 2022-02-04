import { createAsyncReducer } from 'utils/Redux';
import {
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload,
} from 'types/store/GetAllBuyerOrdersState';
import { getAllBuyerOrdersActions } from '../actions';

export default createAsyncReducer<
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload
>(getAllBuyerOrdersActions);
