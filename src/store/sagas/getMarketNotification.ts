import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getMarketNotification } from 'services/marketRequest';
import { AsyncAction } from 'types/Action';
import {
  GetMarketNotificationMeta,
  GetMarketNotificationPayload,
} from 'types/store/GetMarketNotificationState';
import { Store } from 'types/store/Store';

import { getMarketNotificationActions } from '../actions';

function* getMarketNotificationRequest(
  action: AsyncAction<GetMarketNotificationMeta, GetMarketNotificationPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getMarketNotification, state.auth.token);
      yield put(getMarketNotificationActions.success(data));
    } catch (e) {
      yield put(getMarketNotificationActions.failed(e.message));
    }
  } else {
    yield put(getMarketNotificationActions.failed('Token not found'));
  }
}

function* getMarketNotificationWatcher() {
  yield takeLatest(
    getMarketNotificationActions.REQUEST,
    getMarketNotificationRequest
  );
}

export default getMarketNotificationWatcher;
