import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getNotifSettings } from 'services/notifications';
import { AsyncAction } from 'types/Action';
import {
  GetNotificationsSettingsMeta,
  GetNotificationsSettingsPayload,
} from 'types/store/GetNotificationSettingsState';
import { Store } from 'types/store/Store';

import { getNotificationsSettingsActions } from '../actions';

function* getNotificationsSettings(
  action: AsyncAction<
    GetNotificationsSettingsMeta,
    GetNotificationsSettingsPayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getNotifSettings,
        action.meta,
        state.auth.token
      );
      yield put(getNotificationsSettingsActions.success(data));
    } catch (e) {
      yield put(getNotificationsSettingsActions.failed(e.message));
    }
  } else {
    yield put(getNotificationsSettingsActions.failed('Token not found'));
  }
}

function* getNotificationsSettingsWatcher() {
  yield takeLatest(
    getNotificationsSettingsActions.REQUEST,
    getNotificationsSettings
  );
}

export default getNotificationsSettingsWatcher;
