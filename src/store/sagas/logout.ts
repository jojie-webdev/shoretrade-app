import { put, call, select, takeLatest } from 'redux-saga/effects';
import { logout } from 'services/auth';
import { AsyncAction } from 'types/Action';
import { LoginPayload } from 'types/store/LoginState';
import { Store } from 'types/store/Store';

import {
  logoutActions,
  authActions,
  cartActions,
  editableListingActions,
  subscriptionActions,
} from '../actions';

function* logoutRequest(action: AsyncAction<string, LoginPayload>) {
  const state: Store = yield select();
  const token = state.auth.token;
  if (token) {
    try {
      const { data } = yield call(logout, token);
      yield put(logoutActions.success(data));
    } catch (e) {
      yield put(logoutActions.failed(e.message));
    }
  }
}

function* logoutFinished(action: AsyncAction<string, LoginPayload>) {
  yield put(authActions.clear());
  yield put(cartActions.clear());
  yield put(editableListingActions.clear());
  yield put(subscriptionActions.clear());
}

function* logoutWatcher() {
  yield takeLatest(logoutActions.REQUEST, logoutRequest);
  yield takeLatest(logoutActions.SUCCESS, logoutFinished);
  yield takeLatest(logoutActions.FAILED, logoutFinished);
}

export default logoutWatcher;
