import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import { HistoryState } from 'types/store/HistoryState';

import { historyActions } from '../actions';

const DEFAULT_STATE: HistoryState = {
  buyerRecentSearch: [],
};

const DEFAULT_ACTION: Action<HistoryState> = {
  type: '',
  payload: {
    buyerRecentSearch: [],
  },
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [historyActions.UPDATE]: {
      ...state,
      ...action.payload,
    },
    [historyActions.CLEAR]: {},
  });
};
