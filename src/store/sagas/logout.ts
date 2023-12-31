import { put, call, select, takeLatest } from 'redux-saga/effects';
import { logout } from 'services/auth';
import { AsyncAction } from 'types/Action';
import { LoginPayload } from 'types/store/LoginState';
import { Store } from 'types/store/Store';

import { logoutActions } from '../actions';

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

    // NOTE: redux state will be cleared after logout
    // See src/store/reducers/index.ts (createRootReducer)
  }
}

function* logoutWatcher() {
  yield takeLatest(logoutActions.REQUEST, logoutRequest);
}

export default logoutWatcher;
