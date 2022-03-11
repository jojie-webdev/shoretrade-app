import { push } from 'connected-react-router';
import { MAIN_ROUTES } from 'consts';
import { put, call, takeLatest } from 'redux-saga/effects';
import { resetPassword } from 'services/auth';
import { AsyncAction } from 'types/Action';
import {
  ResetPasswordMeta,
  ResetPasswordPayload,
} from 'types/store/ResetPasswordState';

import { resetPasswordActions } from '../actions';

function* resetPasswordRequest(
  action: AsyncAction<ResetPasswordMeta, ResetPasswordPayload>
) {
  try {
    const { data } = yield call(resetPassword, action.meta);
    yield put(resetPasswordActions.success(data));
  } catch (e) {
    yield put(resetPasswordActions.failed(e.message));
  }
}

function* resetPasswordSuccess(
  action: AsyncAction<ResetPasswordMeta, ResetPasswordPayload>
) {
  yield put(push(MAIN_ROUTES.LANDING));
}

function* resetPasswordWatcher() {
  yield takeLatest(resetPasswordActions.REQUEST, resetPasswordRequest);
  // yield takeLatest(resetPasswordActions.SUCCESS, resetPasswordSuccess);
}

export default resetPasswordWatcher;
