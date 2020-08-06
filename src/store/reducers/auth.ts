import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import { AuthState } from 'types/store/AuthState';

import { authActions } from '../actions';

const DEFAULT_STATE: AuthState = {
  token: null,
};

const DEFAULT_ACTION: Action<AuthState> = {
  type: '',
  payload: {
    token: null,
  },
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [authActions.UPDATE]: {
      ...state,
      ...action.payload,
    },
    [authActions.CLEAR]: {},
  });
};
