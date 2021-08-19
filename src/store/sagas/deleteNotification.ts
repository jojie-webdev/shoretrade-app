import qs from 'qs';
import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { deleteNotificationApi } from 'services/notifications';
import { AsyncAction } from 'types/Action';
import {
  DeleteNotificationMetaData,
  DeleteNotificationPayload,
} from 'types/store/DeleteNotificationState';
import { Store } from 'types/store/Store';

import { deleteNotificationActions, getNotificationsActions } from '../actions';

function* deleteNotifRequest(
  action: AsyncAction<DeleteNotificationMetaData, DeleteNotificationPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    const meta = action.meta;
    try {
      const { data } = yield call(
        deleteNotificationApi,
        state.auth.token,
        action.meta
      );
      yield put(deleteNotificationActions.success(data));
    } catch (e) {
      yield put(deleteNotificationActions.failed(e.message));
    }
  } else {
    yield put(deleteNotificationActions.failed('Token not found'));
  }
}

function* deleteNotifSuccess(
  action: AsyncAction<DeleteNotificationMetaData, DeleteNotificationPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    yield put(getNotificationsActions.request());
  }
}

function* deleteNotifRequestWatcher() {
  yield takeLatest(deleteNotificationActions.REQUEST, deleteNotifRequest);
  yield takeLatest(deleteNotificationActions.SUCCESS, deleteNotifSuccess);
}

export default deleteNotifRequestWatcher;
