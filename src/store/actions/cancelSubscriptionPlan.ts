import {
  CancelSubscriptionPlanMeta,
  CancelSubscriptionPlanPayload,
} from 'types/store/CancelSubscriptionPlanState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'CANCEL_SUBSCRIPTION_PLAN';
const asyncAction = createAsyncAction<
  CancelSubscriptionPlanMeta,
  CancelSubscriptionPlanPayload
>(ns);

const cancelSubscriptionPlanActions = {
  ...asyncAction,
};

export default cancelSubscriptionPlanActions;
