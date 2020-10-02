import {
  GetBuyerOrdersMeta,
  GetBuyerOrdersPayload,
} from 'types/store/GetBuyerOrdersState';
import { createAsyncReducer } from 'utils/Redux';

import { getBuyerOrdersTransitActions } from '../actions';

export default createAsyncReducer<GetBuyerOrdersMeta, GetBuyerOrdersPayload>(
  getBuyerOrdersTransitActions
);