import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getSellerDashboardTopCategories } from 'services/data';
import { AsyncAction } from 'types/Action';
import {
  GetSellerDashboardTopCategoriesMeta,
  GetSellerDashboardTopCategoriesPayload,
} from 'types/store/GetSellerDashboardTopCategoriesState';
import { Store } from 'types/store/Store';

import { getSellerDashboardTopCategoriesActions } from '../actions';

function* getSellerDashboardTopCategoriesRequest(
  action: AsyncAction<
    GetSellerDashboardTopCategoriesMeta,
    GetSellerDashboardTopCategoriesPayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getSellerDashboardTopCategories,
        action.meta,
        state.auth.token
      );
      yield put(getSellerDashboardTopCategoriesActions.success(data));
    } catch (e) {
      yield put(getSellerDashboardTopCategoriesActions.failed(e.message));
    }
  } else {
    yield put(getSellerDashboardTopCategoriesActions.failed('Token not found'));
  }
}

function* getSellerDashboardTopCategoriesWatcher() {
  yield takeLatest(
    getSellerDashboardTopCategoriesActions.REQUEST,
    getSellerDashboardTopCategoriesRequest
  );
}

export default getSellerDashboardTopCategoriesWatcher;
