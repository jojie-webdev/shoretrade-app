import {
  GetPaymentModePayload,
  GetPaymentModeMeta,
} from 'types/store/GetPaymentMode';
import { createAsyncReducer } from 'utils/Redux';

import { getPaymentModeActions } from '../actions';

export default createAsyncReducer<GetPaymentModeMeta, GetPaymentModePayload>(
  getPaymentModeActions
);
