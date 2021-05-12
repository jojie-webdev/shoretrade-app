import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getPaymentMethods } from 'services/payment';
import { AsyncAction } from 'types/Action';
import {
  GetPaymentMethodsMeta,
  GetPaymentMethodsPayload,
} from 'types/store/GetPaymentMethodsState';
import { Store } from 'types/store/Store';

import { getPaymentMethodsActions } from '../actions';

function* getPaymentMethodsRequest(
  action: AsyncAction<GetPaymentMethodsMeta, GetPaymentMethodsPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getPaymentMethods,
        action.meta,
        state.auth.token
      );
      yield put(getPaymentMethodsActions.success(data));
    } catch (e) {
      yield put(getPaymentMethodsActions.failed(e.message));
    }
  } else {
    yield put(getPaymentMethodsActions.failed('Token not found'));
  }
}

function* getPaymentMethodsWatcher() {
  yield takeLatest(getPaymentMethodsActions.REQUEST, getPaymentMethodsRequest);
}

export default getPaymentMethodsWatcher;
