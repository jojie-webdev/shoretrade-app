import {
  RenewSubscriptionPlanMeta,
  RenewSubscriptionPlanPayload,
} from 'types/store/RenewSubscriptionPlanState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'RENEW_SUBSCRIPTION_PLAN';
const asyncAction = createAsyncAction<
  RenewSubscriptionPlanMeta,
  RenewSubscriptionPlanPayload
>(ns);

const renewSubscriptionPlanActions = {
  ...asyncAction,
};

export default renewSubscriptionPlanActions;
