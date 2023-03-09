import {
  GetCartByEmployeeIdAndNegotiationIdMeta,
  GetCartByEmployeeIdAndNegotiationIdPayload,
} from 'types/store/GetCartByEmployeeIdAndNegotiationIdState';
import { createAsyncReducer } from 'utils/Redux';

import { getCartByEmployeeIdAndNegotiationIdActions } from '../actions';

export default createAsyncReducer<
  GetCartByEmployeeIdAndNegotiationIdMeta,
  GetCartByEmployeeIdAndNegotiationIdPayload
>(getCartByEmployeeIdAndNegotiationIdActions);
