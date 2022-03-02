import {
  GetSubscriptionPlansMeta,
  GetSubscriptionPlansPayload,
} from 'types/store/GetSubscriptionPlansState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SUBSCRIPTION_PLANS';
const asyncAction = createAsyncAction<
  GetSubscriptionPlansMeta,
  GetSubscriptionPlansPayload
>(ns);

const getSubscriptionPlansActions = {
  ...asyncAction,
};

export default getSubscriptionPlansActions;
