import { put, call, takeLatest } from 'redux-saga/effects';
import { forgotPassword } from 'services/auth';
import { AsyncAction } from 'types/Action';
import {
  ForgotPasswordMeta,
  ForgotPasswordPayload,
} from 'types/store/ForgotPasswordState';

import { forgotPasswordActions } from '../actions';

function* forgotPasswordRequest(
  action: AsyncAction<ForgotPasswordMeta, ForgotPasswordPayload>
) {
  try {
    const { data } = yield call(forgotPassword, {
      email: action.meta.email,
      service: 'EMAIL',
    });
    yield put(forgotPasswordActions.success(data));
  } catch (e) {
    yield put(forgotPasswordActions.failed(e.message));
  }
}

function* forgotPasswordWatcher() {
  yield takeLatest(forgotPasswordActions.REQUEST, forgotPasswordRequest);
}

export default forgotPasswordWatcher;
