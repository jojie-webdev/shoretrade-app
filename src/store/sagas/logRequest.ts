import { put, select, takeEvery } from 'redux-saga/effects';
import getShippingQuote from 'store/reducers/getShippingQuote';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';

import { getShippingQuoteActions, logRequestActions } from '../actions';

const REQUEST_OVERLOAD_LIMIT = 10;
const REQUEST_OVERLOAD_DURATION = 10;
// blacklist requests that is already handled by requestLimiter
const BLACK_LIST = [getShippingQuoteActions.REQUEST];
// monitorSurgeRequests prevents burst requests from happening
function* monitorSurgeRequests(type: string) {
  if (!BLACK_LIST.includes(type)) {
    const state: Store = yield select();
    const previousRequestCount = state.logRequest.filter((log) => {
      const referenceDate = log.created_at;
      const currentDate = new Date();
      // difference in seconds
      const duration = (currentDate.getTime() - referenceDate.getTime()) / 1000;
      return log.id === type && duration < REQUEST_OVERLOAD_DURATION;
    }).length;
    if (previousRequestCount >= REQUEST_OVERLOAD_LIMIT) {
      window.location.reload();
    }
  }
}

function* logRequest(action: AsyncAction<any, any>) {
  if (action.type.includes('/REQUEST')) {
    yield monitorSurgeRequests(action.type);
    yield put(logRequestActions.add(action.type));
  }
}

function* logRequestWatcher() {
  yield takeEvery('*', logRequest);
}

export default logRequestWatcher;
