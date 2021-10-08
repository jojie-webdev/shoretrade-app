import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import { GlobalModalState } from 'types/store/GlobalModalState';

import { globalModalActions } from '../actions';

const DEFAULT_STATE: GlobalModalState = {
  type: '',
};

const DEFAULT_ACTION: Action<GlobalModalState> = {
  type: '',
  payload: {
    type: '',
  },
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [globalModalActions.SET]: action.payload,
    [globalModalActions.CLEAR]: DEFAULT_STATE,
  });
};
