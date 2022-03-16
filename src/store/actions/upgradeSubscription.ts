import {
  UpgradeSubscriptionMeta,
  UpgradeSubscriptionPayload,
} from 'types/store/UpgradeSubscriptionState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPGRADE_SUBSCRIPTION';
const asyncAction = createAsyncAction<
  UpgradeSubscriptionMeta,
  UpgradeSubscriptionPayload
>(ns);

const upgradeSubscriptionActions = {
  ...asyncAction,
};

export default upgradeSubscriptionActions;
