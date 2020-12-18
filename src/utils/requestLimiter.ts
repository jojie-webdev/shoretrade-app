/**
 * middle for redux saga's request runners to limit api calls
 * dependent on logRequest store
 */

import { put, select } from 'redux-saga/effects';
import { EXPIRY } from 'store/reducers/logRequest';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';

const REQUEST_LIMIT = 10;

export function* requestLimiter<Meta, Payload>(
  request: (action: AsyncAction<Meta, Payload>) => Generator<any>,
  failed: (reason: string) => { type: string; error: string },
  action: AsyncAction<Meta, Payload>
) {
  const state: Store = yield select();
  const previousRequestCount = state.logRequest.filter((log) => {
    const referenceDate = log.created_at;
    const currentDate = new Date();
    // difference in seconds
    const duration = (currentDate.getTime() - referenceDate.getTime()) / 1000;
    return log.id === action.type && duration < EXPIRY;
  }).length;
  if (previousRequestCount < REQUEST_LIMIT) {
    yield request(action);
  } else {
    yield put(failed('Network Request Limit'));
  }
}
