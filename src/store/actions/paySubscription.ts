import {
  PaySubscriptionMeta,
  PaySubscriptionPayload,
} from 'types/store/PaySubscriptionState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'PAY_SUBSCRIPTION';
const asyncAction = createAsyncAction<
  PaySubscriptionMeta,
  PaySubscriptionPayload
>(ns);

const paySubscriptionActions = {
  ...asyncAction,
};

export default paySubscriptionActions;
