import {
  GetFreeTrialExpiryMeta,
  GetFreeTrialExpiryPayload,
} from 'types/store/GetFreeTrialExpiryState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_FREE_TRIAL_EXPIRY';
const asyncAction = createAsyncAction<
  GetFreeTrialExpiryMeta,
  GetFreeTrialExpiryPayload
>(ns);

const getFreeTrialExpiryActions = {
  ...asyncAction,
};

export default getFreeTrialExpiryActions;
