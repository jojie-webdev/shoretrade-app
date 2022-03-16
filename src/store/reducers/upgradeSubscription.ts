import {
  UpgradeSubscriptionMeta,
  UpgradeSubscriptionPayload,
} from 'types/store/UpgradeSubscriptionState';
import { createAsyncReducer } from 'utils/Redux';

import { upgradeSubscriptionActions } from '../actions';

export default createAsyncReducer<
  UpgradeSubscriptionMeta,
  UpgradeSubscriptionPayload
>(upgradeSubscriptionActions);
