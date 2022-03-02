import {
  GetSubscriptionPlansMeta,
  GetSubscriptionPlansPayload,
} from 'types/store/GetSubscriptionPlansState';
import { createAsyncReducer } from 'utils/Redux';

import { getSubscriptionPlansActions } from '../actions';

export default createAsyncReducer<
  GetSubscriptionPlansMeta,
  GetSubscriptionPlansPayload
>(getSubscriptionPlansActions);
