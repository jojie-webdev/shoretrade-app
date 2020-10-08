import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';

import { sellerDashboardActions } from '../actions';

const DEFAULT_STATE: any = null;

const DEFAULT_ACTION: Action<any> = {
  type: '',
  payload: {},
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [sellerDashboardActions.SET]: {
      ...state,
      ...action.payload,
    },
  });
};
