import qs from 'qs';
import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { readNotificationApi } from 'services/notifications';
import { AsyncAction } from 'types/Action';
import {
  ReadNotificationMetaData,
  ReadNotificationPayload,
} from 'types/store/ReadNotificationState';
import { Store } from 'types/store/Store';

import { readNotificationActions, getNotificationsActions } from '../actions';

function* readNotifRequest(
  action: AsyncAction<ReadNotificationMetaData, ReadNotificationPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    const meta = action.meta;
    try {
      const { data } = yield call(
        readNotificationApi,
        state.auth.token,
        action.meta
      );
      yield put(readNotificationActions.success(data));
    } catch (e) {
      yield put(readNotificationActions.failed(e.message));
    }
  } else {
    yield put(readNotificationActions.failed('Token not found'));
  }
}

function* readNotifSuccess(
  action: AsyncAction<ReadNotificationMetaData, ReadNotificationPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    yield put(getNotificationsActions.request());
  }
}

function* readNotifRequestWatcher() {
  yield takeLatest(readNotificationActions.REQUEST, readNotifRequest);
  yield takeLatest(readNotificationActions.SUCCESS, readNotifSuccess);
}

export default readNotifRequestWatcher;
