import {
  CancelSubscriptionPlanMeta,
  CancelSubscriptionPlanPayload,
} from 'types/store/CancelSubscriptionPlanState';
import { createAsyncReducer } from 'utils/Redux';

import { cancelSubscriptionPlanActions } from '../actions';

export default createAsyncReducer<
  CancelSubscriptionPlanMeta,
  CancelSubscriptionPlanPayload
>(cancelSubscriptionPlanActions);
