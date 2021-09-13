import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getNotificationsData } from 'services/notifications';
import { AsyncAction, Action } from 'types/Action';
import {
  GetNotificationsMeta,
  GetNotificationsPayload,
} from 'types/store/GetNotificationsState';
import { Store } from 'types/store/Store';

import { getNotificationsActions, socketActions } from '../actions';

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

function* getNotificationsPatch(action: Action<any>) {
  const state: Store = yield select();
  const notifications = state.getNotifications.data;
  const newNotification: any | undefined = pathOr(
    undefined,
    ['payload'],
    action
  );

  if (notifications && newNotification) {
    const notificationsData = pathOr(
      [],
      ['data', 'notifications'],
      notifications
    );
    const unreadData = pathOr(0, ['data', 'unread'], notifications);
    const totalData = pathOr(0, ['data', 'total'], notifications);

    const modifiedNotificationsData: GetNotificationsPayload = {
      ...notifications,
      data: {
        ...notifications.data,
        notifications: [newNotification, ...notificationsData],
        total: totalData + 1,
        unread: unreadData + 1,
      },
    };

    yield put(getNotificationsActions.patch(modifiedNotificationsData));
  }
}

function* getNotificationsSettingsWatcher() {
  yield takeLatest(getNotificationsActions.REQUEST, getNotifications);
  yield takeLatest(socketActions.INAPP_NOTIFICATION, getNotificationsPatch);
}

export default getNotificationsSettingsWatcher;
