import {
  GetFreeTrialExpiryMeta,
  GetFreeTrialExpiryPayload,
} from 'types/store/GetFreeTrialExpiryState';
import { createAsyncReducer } from 'utils/Redux';

import { getFreeTrialExpiryActions } from '../actions';

export default createAsyncReducer<
  GetFreeTrialExpiryMeta,
  GetFreeTrialExpiryPayload
>(getFreeTrialExpiryActions);
