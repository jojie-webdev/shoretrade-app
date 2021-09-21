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
  const notificationsData = state.getNotifications.data;
  const newNotification: any | undefined = pathOr(
    undefined,
    ['payload'],
    action
  );

  if (notificationsData && newNotification) {
    const notifications = pathOr(
      [],
      ['data', 'notifications'],
      notificationsData
    );
    const unreadData = pathOr(0, ['data', 'unread'], notificationsData);
    const totalData = pathOr(0, ['data', 'total'], notificationsData);

    const modifiedNotificationsData: GetNotificationsPayload = {
      ...notificationsData,
      data: {
        ...notificationsData.data,
        notifications: [newNotification, ...notifications],
        total: totalData + 1,
        unread: unreadData + 1,
      },
    };

    yield put(getNotificationsActions.patch(modifiedNotificationsData));
  }
}

function* getNotificationsReadPatch(action: Action<any>) {
  const state: Store = yield select();
  const notificationsData = state.getNotifications.data;
  const targetNotification: any | undefined = pathOr(
    undefined,
    ['payload'],
    action
  );

  if (notificationsData && targetNotification) {
    const notifications = pathOr<any[]>(
      [],
      ['data', 'notifications'],
      notificationsData
    );

    const modifiedNotifications = notifications.map((a) => {
      if (a.id === targetNotification.id) {
        return {
          ...a,
          read_at: targetNotification.read_at,
        };
      }
      return a;
    });

    const unreadData = pathOr(0, ['data', 'unread'], notificationsData);

    const modifiedNotificationsData: GetNotificationsPayload = {
      ...notificationsData,
      data: {
        ...notificationsData.data,
        notifications: modifiedNotifications,
        // avoid subtracting if the notification is already marked as unread
        unread:
          notifications.findIndex(
            (a) => a.id === targetNotification.id && a.read_at === null
          ) !== -1
            ? unreadData - 1
            : unreadData,
      },
    };

    yield put(getNotificationsActions.patch(modifiedNotificationsData));
  }
}

function* getNotificationsDeletePatch(action: Action<any>) {
  const state: Store = yield select();
  const notificationsData = state.getNotifications.data;
  const targetNotification: any | undefined = pathOr(
    undefined,
    ['payload'],
    action
  );

  if (notificationsData && targetNotification) {
    const notifications = pathOr<any[]>(
      [],
      ['data', 'notifications'],
      notificationsData
    );

    const modifiedNotifications = notifications.filter(
      (a) => a.id !== targetNotification.id
    );

    const unreadData = pathOr(0, ['data', 'unread'], notificationsData);
    const totalData = pathOr(0, ['data', 'total'], notificationsData);

    const modifiedNotificationsData: GetNotificationsPayload = {
      ...notificationsData,
      data: {
        ...notificationsData.data,
        notifications: modifiedNotifications,
        // avoid subtracting if the notification is already deleted
        total:
          notifications.findIndex((a) => a.id === targetNotification.id) !== -1
            ? totalData - 1
            : totalData,
        // avoid subtracting if the notification is already marked as unread
        unread:
          notifications.findIndex(
            (a) => a.id === targetNotification.id && a.read_at === null
          ) !== -1
            ? unreadData - 1
            : unreadData,
      },
    };

    yield put(getNotificationsActions.patch(modifiedNotificationsData));
  }
}

function* getNotificationsSettingsWatcher() {
  yield takeLatest(getNotificationsActions.REQUEST, getNotifications);
  yield takeLatest(socketActions.INAPP_NOTIFICATION, getNotificationsPatch);
  yield takeLatest(
    socketActions.INAPP_NOTIFICATION_READ,
    getNotificationsReadPatch
  );
  yield takeLatest(
    socketActions.INAPP_NOTIFICATION_DELETED,
    getNotificationsDeletePatch
  );
}

export default getNotificationsSettingsWatcher;
