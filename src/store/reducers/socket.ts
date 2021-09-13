import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import { SocketState } from 'types/store/SocketState';

import { socketActions } from '../actions';

const DEFAULT_STATE: SocketState = {
  connected: false,
};

const DEFAULT_ACTION: Action<Partial<SocketState>> = {
  type: '',
  payload: {},
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [socketActions.UPDATE]: {
      ...state,
      ...action.payload,
    },
    [socketActions.CLEAR]: {},
  });
};
