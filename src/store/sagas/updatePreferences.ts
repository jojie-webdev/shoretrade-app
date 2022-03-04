import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { updatePreferences } from 'services/user';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import {
  UpdatePreferencesMeta,
  UpdatePreferencesPayload,
} from 'types/store/UpdatePreferencesState';

import { getBuyerHomepageActions, updatePreferencesActions } from '../actions';

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

function* updatePreferencesSuccess() {
  yield put(getBuyerHomepageActions.request());
}

function* updatePreferencesWatcher() {
  yield takeLatest(updatePreferencesActions.REQUEST, updatePreferencesRequest);
  yield takeLatest(updatePreferencesActions.SUCCESS, updatePreferencesSuccess);
}

export default updatePreferencesWatcher;
