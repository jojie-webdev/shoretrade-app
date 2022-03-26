import {
  PaySubscriptionMeta,
  PaySubscriptionPayload,
} from 'types/store/PaySubscriptionState';
import { createAsyncReducer } from 'utils/Redux';

import { paySubscriptionActions } from '../actions';

export default createAsyncReducer<PaySubscriptionMeta, PaySubscriptionPayload>(
  paySubscriptionActions
);
