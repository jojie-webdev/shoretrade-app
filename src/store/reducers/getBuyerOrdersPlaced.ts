import {
  GetBuyerOrdersMeta,
  GetBuyerOrdersPayload,
} from 'types/store/GetBuyerOrdersState';
import { createAsyncReducer } from 'utils/Redux';

import { getBuyerOrdersPlacedActions } from '../actions';

export default createAsyncReducer<GetBuyerOrdersMeta, GetBuyerOrdersPayload>(
  getBuyerOrdersPlacedActions
);
