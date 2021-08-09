import { push } from 'connected-react-router';
import { SELLER_ROUTES } from 'consts';
import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { updateNotifSettings } from 'services/notifications';
import { uploadImageData } from 'services/upload';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import {
  UpdateNotificationSettingsMetaData,
  UpdateNotificationSettingsPayload,
} from 'types/store/UpdateNotificationSettingsState';
import { base64ToFile } from 'utils/File';
import { editableListingToUpdateListing } from 'utils/Listing/editableListingToUpdateListing';

import {
  updateNotificationSettingsActions,
  getNotificationsSettingsActions,
} from '../actions';

function* updateNotifSettingsRequest(
  action: AsyncAction<
    UpdateNotificationSettingsMetaData,
    UpdateNotificationSettingsPayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token) {
    const payload = action.meta;
    try {
      const { data } = yield call(
        updateNotifSettings,
        payload,
        state.auth.token
      );
      yield put(updateNotificationSettingsActions.success(data));
    } catch (e) {
      yield put(updateNotificationSettingsActions.failed(e.message));
    }
  } else {
    yield put(updateNotificationSettingsActions.failed('Token not found'));
  }
}

function* updateNotifSettingsSuccess(
  action: AsyncAction<
    UpdateNotificationSettingsMetaData,
    UpdateNotificationSettingsPayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token) {
    //   yield put(editableListingActions.clear());
    const companyId = state.getUser.data?.data.user.companies[0].id || '';
    yield put(getNotificationsSettingsActions.request({ companyId }));
    yield put(push(SELLER_ROUTES.SELLING));
  }
}

function* updateNotifSettingsWatcher() {
  yield takeLatest(
    updateNotificationSettingsActions.REQUEST,
    updateNotifSettingsRequest
  );
  yield takeLatest(
    updateNotificationSettingsActions.SUCCESS,
    updateNotifSettingsSuccess
  );
}

export default updateNotifSettingsWatcher;
