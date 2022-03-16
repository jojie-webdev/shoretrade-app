import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import { SubscriptionState } from 'types/store/SubscriptionState';

import { subscriptionActions } from '../actions';

const DEFAULT_STATE: SubscriptionState = {
  status: null,
  interval: null,
  isFreeTrial: true,
  isAccountDeactivated: false,
};

const DEFAULT_ACTION: Action<SubscriptionState> = {
  type: '',
  payload: {
    status: null,
    interval: null,
    isFreeTrial: true,
    isAccountDeactivated: false,
  },
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [subscriptionActions.UPDATE]: {
      ...state,
      ...action.payload,
    },
    [subscriptionActions.CLEAR]: {},
  });
};
