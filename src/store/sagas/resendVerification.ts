import { put, call, takeLatest, select } from 'redux-saga/effects';
import { resendVerification } from 'services/auth';
import { AsyncAction } from 'types/Action';
import {
  ResendVerificationMeta,
  ResendVerificationPayload,
} from 'types/store/ResendVerificationState';
import { Store } from 'types/store/Store';

import { resendVerificationActions } from '../actions';

function* resendVerificationRequest(
  action: AsyncAction<ResendVerificationMeta, ResendVerificationPayload>
) {
  const state: Store = yield select();
  if (state.login.request) {
    try {
      const { data } = yield call(resendVerification, state.login.request);
      yield put(resendVerificationActions.success(data));
    } catch (e) {
      yield put(resendVerificationActions.failed(e.message));
    }
  } else {
    yield put(resendVerificationActions.failed('Login request not found'));
  }
}

function* resendVerificationWatcher() {
  yield takeLatest(
    resendVerificationActions.REQUEST,
    resendVerificationRequest
  );
}

export default resendVerificationWatcher;
