import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import { RequestLog, RequestLogState } from 'types/store/LogRequestState';

import { logRequestActions } from '../actions';

// expiry of log requests in seconds
export const EXPIRY = 60;

const DEFAULT_STATE: RequestLogState = [];

const DEFAULT_ACTION: Action<RequestLog> = {
  type: '',
  payload: {
    id: '',
    created_at: new Date(),
  },
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [logRequestActions.ADD]: [
      // filtere old entry for expired requests
      ...state.filter((log) => {
        const referenceDate = log.created_at;
        const currentDate = new Date();
        // difference in seconds
        const duration =
          (currentDate.getTime() - referenceDate.getTime()) / 1000;
        return duration < EXPIRY;
      }),
      // new entry
      action.payload,
    ],
  });
};
