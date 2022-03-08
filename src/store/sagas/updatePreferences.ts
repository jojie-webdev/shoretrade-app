import { lensPath, set } from 'ramda';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { updatePreferences } from 'services/user';
import { AsyncAction } from 'types/Action';
import { GetUserPayload } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';
import {
  UpdatePreferencesMeta,
  UpdatePreferencesPayload,
} from 'types/store/UpdatePreferencesState';

import {
  getBuyerHomepageActions,
  updatePreferencesActions,
  getUserActions,
} from '../actions';

function* updatePreferencesRequest(
  action: AsyncAction<UpdatePreferencesMeta, UpdatePreferencesPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        updatePreferences,
        action.meta,
        state.auth.token
      );
      yield put(updatePreferencesActions.success(data));
    } catch (e) {
      yield put(updatePreferencesActions.failed(e.message));
    }
  } else {
    yield put(updatePreferencesActions.failed('Token not found'));
  }
}

function* updatePreferencesSuccess(
  action: AsyncAction<UpdatePreferencesMeta, UpdatePreferencesPayload>
) {
  const state: Store = yield select();
  const getUser = state.getUser.data;
  if (getUser) {
    const preferencesLens = lensPath(['data', 'user', 'preferences']);
    const modifiedGetUser: GetUserPayload = set(
      preferencesLens,
      action.payload.data,
      getUser
    );
    yield put(getUserActions.patch(modifiedGetUser));
  }
  yield put(getBuyerHomepageActions.request());
}

function* updatePreferencesWatcher() {
  yield takeLatest(updatePreferencesActions.REQUEST, updatePreferencesRequest);
  yield takeLatest(updatePreferencesActions.SUCCESS, updatePreferencesSuccess);
}

export default updatePreferencesWatcher;
