import {
  GetBuyerOrdersMeta,
  GetBuyerOrdersPayload,
} from 'types/store/GetBuyerOrdersState';
import { createAsyncReducer } from 'utils/Redux';

import { getBuyerOrdersDeliveredActions } from '../actions';

export default createAsyncReducer<GetBuyerOrdersMeta, GetBuyerOrdersPayload>(
  getBuyerOrdersDeliveredActions
);
