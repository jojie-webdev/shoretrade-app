import { put, call, takeLatest, select } from 'redux-saga/effects';
import { readMarketNotification } from 'services/marketRequest';
import { AsyncAction } from 'types/Action';
import {
  ReadMarketNotificationMeta,
  ReadMarketNotificationPayload,
} from 'types/store/ReadMarketNotificationState';
import { Store } from 'types/store/Store';

import {
  readMarketNotificationActions,
  getMarketNotificationActions,
} from '../actions';

function* readMarketNotificationRequest(
  action: AsyncAction<ReadMarketNotificationMeta, ReadMarketNotificationPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        readMarketNotification,
        action.meta,
        state.auth.token
      );
      yield put(readMarketNotificationActions.success(data));
    } catch (e) {
      yield put(readMarketNotificationActions.failed(e.message));
    }
  } else {
    yield put(readMarketNotificationActions.failed('Token not found'));
  }
}

function* readMarketNotificationSuccess(
  action: AsyncAction<ReadMarketNotificationMeta, ReadMarketNotificationPayload>
) {
  yield put(getMarketNotificationActions.request({}));
}

function* readMarketNotificationWatcher() {
  yield takeLatest(
    readMarketNotificationActions.REQUEST,
    readMarketNotificationRequest
  );
  yield takeLatest(
    readMarketNotificationActions.SUCCESS,
    readMarketNotificationSuccess
  );
}

export default readMarketNotificationWatcher;
