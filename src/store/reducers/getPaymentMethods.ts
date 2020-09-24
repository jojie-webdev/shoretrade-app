import {
  GetPaymentMethodsMeta,
  GetPaymentMethodsPayload,
} from 'types/store/GetPaymentMethodsState';
import { createAsyncReducer } from 'utils/Redux';

import { getPaymentMethodsActions } from '../actions';

export default createAsyncReducer<
  GetPaymentMethodsMeta,
  GetPaymentMethodsPayload
>(getPaymentMethodsActions);
