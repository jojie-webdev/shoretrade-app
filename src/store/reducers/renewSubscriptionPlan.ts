import {
  RenewSubscriptionPlanMeta,
  RenewSubscriptionPlanPayload,
} from 'types/store/RenewSubscriptionPlanState';
import { createAsyncReducer } from 'utils/Redux';

import { renewSubscriptionPlanActions } from '../actions';

export default createAsyncReducer<
  RenewSubscriptionPlanMeta,
  RenewSubscriptionPlanPayload
>(renewSubscriptionPlanActions);
