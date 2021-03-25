import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import { NotificationType, NotifyState } from 'types/store/NotifyState';

import { notifyActions } from '../actions';

const DEFAULT_STATE: NotifyState = {
  current: '',
};

const DEFAULT_ACTION: Action<NotificationType> = {
  type: '',
  payload: '',
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [notifyActions.ADD]: {
      current: action.payload,
    },
    [notifyActions.CLEAR]: {
      current: '',
    },
  });
};
