import {
  UpdateSubscriptionPlanMeta,
  UpdateSubscriptionPlanPayload,
} from 'types/store/UpdateSubscriptionPlanState';
import { createAsyncReducer } from 'utils/Redux';

import { updateSubscriptionPlanActions } from '../actions';

export default createAsyncReducer<
  UpdateSubscriptionPlanMeta,
  UpdateSubscriptionPlanPayload
>(updateSubscriptionPlanActions);
