import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import {
  CurrentAddressState,
  CurrentAddressPayload,
} from 'types/store/CurrentAddressState';

import { currentAddressActions } from '../actions';

const DEFAULT_STATE: CurrentAddressState = {
  id: '',
};

const DEFAULT_ACTION: Action<CurrentAddressPayload> = {
  type: '',
  payload: {
    id: '',
  },
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [currentAddressActions.UPDATE]: {
      ...state,
      ...action.payload,
    },
    [currentAddressActions.CLEAR]: DEFAULT_STATE,
  });
};
