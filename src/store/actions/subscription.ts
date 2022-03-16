import { SubscriptionState } from 'types/store/SubscriptionState';
import { createUpdateAction, createClearAction } from 'utils/Redux';

const ns = 'SUBSCRIPTION';
const updateAction = createUpdateAction<SubscriptionState>(ns);
const clearAction = createClearAction(ns);

const subscriptionActions = {
  ...updateAction,
  ...clearAction,
};

export default subscriptionActions;
