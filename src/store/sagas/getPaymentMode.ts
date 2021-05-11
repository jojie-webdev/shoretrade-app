import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getPaymentMode } from 'services/payment';
import { AsyncAction } from 'types/Action';
import {
  GetPaymentModeMeta,
  GetPaymentModePayload,
} from 'types/store/GetPaymentMode';
import { Store } from 'types/store/Store';

import { getPaymentModeActions } from '../actions';

function* getPaymentMethodsRequest(
  action: AsyncAction<GetPaymentModeMeta, GetPaymentModePayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getPaymentMode,
        action.meta,
        state.auth.token
      );
      yield put(getPaymentModeActions.success(data));
    } catch (e) {
      yield put(getPaymentModeActions.failed(e.message));
    }
  } else {
    yield put(getPaymentModeActions.failed('Token not found'));
  }
}

function* getPaymentMethodsWatcher() {
  yield takeLatest(getPaymentModeActions.REQUEST, getPaymentMethodsRequest);
}

export default getPaymentMethodsWatcher;
