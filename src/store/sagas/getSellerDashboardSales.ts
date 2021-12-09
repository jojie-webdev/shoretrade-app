import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getSellerDashboardSales } from 'services/data';
import { AsyncAction } from 'types/Action';
import {
  GetSellerDashboardSalesMeta,
  GetSellerDashboardSalesPayload,
} from 'types/store/GetSellerDashboardSalesState';
import { Store } from 'types/store/Store';

import { getSellerDashboardSalesActions } from '../actions';

function* getSellerDashboardSalesRequest(
  action: AsyncAction<
    GetSellerDashboardSalesMeta,
    GetSellerDashboardSalesPayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getSellerDashboardSales,
        action.meta,
        state.auth.token
      );
      yield put(getSellerDashboardSalesActions.success(data));
    } catch (e) {
      yield put(getSellerDashboardSalesActions.failed(e.message));
    }
  } else {
    yield put(getSellerDashboardSalesActions.failed('Token not found'));
  }
}

function* getSellerDashboardSalesWatcher() {
  yield takeLatest(
    getSellerDashboardSalesActions.REQUEST,
    getSellerDashboardSalesRequest
  );
}

export default getSellerDashboardSalesWatcher;
