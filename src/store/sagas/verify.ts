import { push } from 'connected-react-router';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { verify } from 'services/auth';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import { VerifyMeta, VerifyPayload } from 'types/store/VerifyState';

import { verifyActions, authActions } from '../actions';

function* verifyRequest(action: AsyncAction<VerifyMeta, VerifyPayload>) {
  try {
    const { data } = yield call(verify, action.meta);
    yield put(verifyActions.success(data));
  } catch (e) {
    yield put(verifyActions.failed(e.message));
  }
}

function* verifySuccess(action: AsyncAction<VerifyMeta, VerifyPayload>) {
  const userGroup = pathOr<string>(
    '',
    ['payload', 'data', 'user', 'userGroup'],
    action
  );
  const pathname: string = yield select(
    (state: Store) => state.router.location.pathname
  );
  const isSeller = pathname.includes('seller');
  if (userGroup === 'BUYER_ADMIN' && !isSeller) {
    yield put(
      authActions.update({ token: action.payload.data.token, type: 'buyer' })
    );
  } else if (userGroup === 'SELLER_ADMIN' && isSeller) {
    yield put(
      authActions.update({ token: action.payload.data.token, type: 'seller' })
    );
  }
}

function* verifyWatcher() {
  yield takeLatest(verifyActions.REQUEST, verifyRequest);
  yield takeLatest(verifyActions.SUCCESS, verifySuccess);
}

export default verifyWatcher;
