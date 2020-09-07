import { CurrentAddressPayload } from 'types/store/CurrentAddressState';
import { createUpdateAction, createClearAction } from 'utils/Redux';

const ns = 'CURRENT_ADDRESS';
const updateAction = createUpdateAction<CurrentAddressPayload>(ns);
const clearAction = createClearAction(ns);

const currentAddressActions = {
  ...updateAction,
  ...clearAction,
};

export default currentAddressActions;
