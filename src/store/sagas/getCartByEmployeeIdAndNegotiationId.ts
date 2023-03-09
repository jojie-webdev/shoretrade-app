import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { AsyncAction } from 'types/Action';
import {
  GetCartByEmployeeIdAndNegotiationIdMeta,
  GetCartByEmployeeIdAndNegotiationIdPayload,
} from 'types/store/GetCartByEmployeeIdAndNegotiationIdState';
import { Store } from 'types/store/Store';

import { getCartByEmployeeIdAndNegotiationIdActions } from '../actions';

const dummyService = (
  data: GetCartByEmployeeIdAndNegotiationIdMeta,
  token: string
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {},
      });
    }, 2000);
  });
};

function* getCartByEmployeeIdAndNegotiationIdRequest(
  action: AsyncAction<
    GetCartByEmployeeIdAndNegotiationIdMeta,
    GetCartByEmployeeIdAndNegotiationIdPayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(dummyService, action.meta, state.auth.token);
      yield put(getCartByEmployeeIdAndNegotiationIdActions.success(data));
    } catch (e) {
      yield put(getCartByEmployeeIdAndNegotiationIdActions.failed(e.message));
    }
  } else {
    yield put(
      getCartByEmployeeIdAndNegotiationIdActions.failed('Token not found')
    );
  }
}

function* getCartByEmployeeIdAndNegotiationIdWatcher() {
  yield takeLatest(
    getCartByEmployeeIdAndNegotiationIdActions.REQUEST,
    getCartByEmployeeIdAndNegotiationIdRequest
  );
}

export default getCartByEmployeeIdAndNegotiationIdWatcher;
