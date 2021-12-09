import { put, call, takeLatest, select } from 'redux-saga/effects';
import { changePassword } from 'services/user';
import { AsyncAction } from 'types/Action';
import {
  ChangePasswordMeta,
  ChangePasswordPayload,
} from 'types/store/ChangePasswordState';
import { Store } from 'types/store/Store';

import { changePasswordActions } from '../actions';

function* changePasswordRequest(
  action: AsyncAction<ChangePasswordMeta, ChangePasswordPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        changePassword,
        action.meta,
        state.auth.token
      );
      yield put(changePasswordActions.success(data));
    } catch (e) {
      yield put(changePasswordActions.failed(e.message));
    }
  } else {
    yield put(changePasswordActions.failed('Token not found'));
  }
}

function* changePasswordWatcher() {
  yield takeLatest(changePasswordActions.REQUEST, changePasswordRequest);
}

export default changePasswordWatcher;
