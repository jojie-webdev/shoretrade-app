import { push } from 'connected-react-router';
import { SELLER_ROUTES, BUYER_ROUTES, MAIN_ROUTES } from 'consts';
import { put, call, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { logout } from 'services/auth';
import { AsyncAction } from 'types/Action';
import { LoginPayload } from 'types/store/LoginState';
import { Store } from 'types/store/Store';

import { logoutActions, authActions, cartActions, editableListingActions } from '../actions';

function* logoutRequest(action: AsyncAction<string, LoginPayload>) {
  try {
    const { data } = yield call(logout, action.meta);
    yield put(logoutActions.success(data));
  } catch (e) {
    yield put(logoutActions.failed(e.message));
  }
}

function* logoutSuccess(action: AsyncAction<string, LoginPayload>) {
  if (action.type.includes('/FAILED')) {
    if (action.error === 'Request failed with status code 401') {
      yield put(authActions.clear());
      yield put(cartActions.clear());
      yield put(editableListingActions.clear());
    }
  }
}

function* logoutWatcher() {
  yield takeLatest(logoutActions.REQUEST, logoutRequest);
  yield takeLatest('*', logoutSuccess);
}

export default logoutWatcher;
