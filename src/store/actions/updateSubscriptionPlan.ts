import {
  UpdateSubscriptionPlanMeta,
  UpdateSubscriptionPlanPayload,
} from 'types/store/UpdateSubscriptionPlanState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPDATE_SUBSCRIPTION_PLAN';
const asyncAction = createAsyncAction<
  UpdateSubscriptionPlanMeta,
  UpdateSubscriptionPlanPayload
>(ns);

const updateSubscriptionPlanActions = {
  ...asyncAction,
};

export default updateSubscriptionPlanActions;
