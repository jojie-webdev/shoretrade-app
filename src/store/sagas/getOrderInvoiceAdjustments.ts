import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getOrderInvoiceAdjustments } from 'services/orders';
import { AsyncAction } from 'types/Action';
import {
  GetOrderInvoiceAdjustmentsMeta,
  GetOrderInvoiceAdjustmentsPayload,
} from 'types/store/GetOrderInvoiceAdjustmentsState';
import { Store } from 'types/store/Store';

import { getOrderInvoiceAdjustmentsActions } from '../actions';

function* getOrderInvoiceAdjustmentsRequest(
  action: AsyncAction<
    GetOrderInvoiceAdjustmentsMeta,
    GetOrderInvoiceAdjustmentsPayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getOrderInvoiceAdjustments,
        action.meta,
        state.auth.token
      );
      yield put(getOrderInvoiceAdjustmentsActions.success(data));
    } catch (e) {
      yield put(getOrderInvoiceAdjustmentsActions.failed(e.message));
    }
  } else {
    yield put(getOrderInvoiceAdjustmentsActions.failed('Token not found'));
  }
}

function* getOrderInvoiceAdjustmentsWatcher() {
  yield takeLatest(
    getOrderInvoiceAdjustmentsActions.REQUEST,
    getOrderInvoiceAdjustmentsRequest
  );
}

export default getOrderInvoiceAdjustmentsWatcher;
