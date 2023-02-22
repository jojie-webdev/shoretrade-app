import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import { ShowNegotiableState } from 'types/store/ShowNegotiableState';

import { showNegotiableActions } from '../actions';

const DEFAULT_STATE: ShowNegotiableState = {
  showNegotiable: false,
};

const DEFAULT_ACTION: Action<Partial<ShowNegotiableState>> = {
  type: '',
  payload: {
    showNegotiable: false,
  },
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [showNegotiableActions.UPDATE]: {
      ...state,
      ...action.payload,
    },
    [showNegotiableActions.CLEAR]: {},
  });
};
