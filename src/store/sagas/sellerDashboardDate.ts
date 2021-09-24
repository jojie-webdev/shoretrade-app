import pathOr from 'ramda/es/pathOr';
import { put, takeLatest } from 'redux-saga/effects';
import { Action } from 'types/Action';

import {
  getSellerDashboardSalesActions,
  getSellerDashboardTopCategoriesActions,
  sellerDashboardActions,
} from '../actions';

function* sellerDashboardActionsSet(action: Action<any>) {
  const dateFrom = pathOr('', ['payload', 'start', 'isoString'], action);
  const dateTo = pathOr('', ['payload', 'end', 'isoString'], action);
  yield put(getSellerDashboardSalesActions.request({ dateFrom, dateTo }));
  yield put(
    getSellerDashboardTopCategoriesActions.request({ dateFrom, dateTo })
  );
}

function* sellerDashboardDateWatcher() {
  yield takeLatest(sellerDashboardActions.SET, sellerDashboardActionsSet);
}

export default sellerDashboardDateWatcher;
