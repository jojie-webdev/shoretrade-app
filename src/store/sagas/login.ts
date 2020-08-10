import { push } from 'connected-react-router';
import { SELLER_ROUTES, BUYER_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { login } from 'services/auth';
import { AsyncAction } from 'types/Action';
import { LoginMeta, LoginPayload } from 'types/store/LoginState';
import { Store } from 'types/store/Store';

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
  const pathname: string = yield select(
    (state: Store) => state.router.location.pathname
  );
  const isSeller = pathname.includes('seller');
  if (isSeller) {
    yield put(push(SELLER_ROUTES.VERIFY2FA));
  } else {
    yield put(push(BUYER_ROUTES.VERIFY2FA));
  }
}

function* loginWatcher() {
  yield takeLatest(loginActions.REQUEST, loginRequest);
  yield takeLatest(loginActions.SUCCESS, loginSuccess);
}

export default loginWatcher;
