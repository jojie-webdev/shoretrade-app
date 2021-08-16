import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getNotificationsData } from 'services/notifications';
import { AsyncAction } from 'types/Action';
import {
  GetNotificationsMeta,
  GetNotificationsPayload,
} from 'types/store/GetNotificationsState';
import { Store } from 'types/store/Store';

import { getNotificationsActions } from '../actions';

function* getNotifications(
  action: AsyncAction<GetNotificationsMeta, GetNotificationsPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getNotificationsData, state.auth.token);
      yield put(getNotificationsActions.success(data));
    } catch (e) {
      yield put(getNotificationsActions.failed(e.message));
    }
  } else {
    yield put(getNotificationsActions.failed('Token not found'));
  }
}

function* getNotificationsSettingsWatcher() {
  yield takeLatest(getNotificationsActions.REQUEST, getNotifications);
}

export default getNotificationsSettingsWatcher;
