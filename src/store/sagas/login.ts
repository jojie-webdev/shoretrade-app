import { put, call, takeLatest } from 'redux-saga/effects';
import { login } from 'services/auth';
import { AsyncAction } from 'types/Action';
import { LoginMeta, LoginPayload } from 'types/store/LoginState';

import { loginActions } from '../actions';

function* loginRequest(action: AsyncAction<LoginMeta, LoginPayload>) {
  try {
    const { data } = yield call(login, action.meta);
    yield put(loginActions.success(data));
  } catch (e) {
    yield put(loginActions.failed(e.message));
  }
}

function* loginSuccess(action: AsyncAction<LoginMeta, LoginPayload>) {
  // yield navigate(ROUTES.AUTH_VERIFICATION);
}

// function* loginFailed(action: AsyncAction<LoginMeta, LoginPayload>) {}

function* loginWatcher() {
  yield takeLatest(loginActions.REQUEST, loginRequest);
  yield takeLatest(loginActions.SUCCESS, loginSuccess);
  // yield takeLatest(loginActions.FAILED, loginFailed);
}

export default loginWatcher;
