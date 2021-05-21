import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getMarketRequestBuyerFilters } from 'services/marketRequest';
import { AsyncAction } from 'types/Action';
import {
  GetMarketRequestBuyerFiltersMeta,
  GetMarketRequestBuyerFiltersPayload,
} from 'types/store/GetMarketRequestBuyerFiltersState';
import { Store } from 'types/store/Store';

import { getMarketRequestBuyerFiltersActions } from '../actions';

function* getMarketRequestBuyerFiltersRequest(
  action: AsyncAction<
    GetMarketRequestBuyerFiltersMeta,
    GetMarketRequestBuyerFiltersPayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getMarketRequestBuyerFilters,
        action.meta,
        state.auth.token
      );
      yield put(getMarketRequestBuyerFiltersActions.success(data));
    } catch (e) {
      yield put(getMarketRequestBuyerFiltersActions.failed(e.message));
    }
  } else {
    yield put(getMarketRequestBuyerFiltersActions.failed('Token not found'));
  }
}

function* getMarketRequestBuyerFiltersWatcher() {
  yield takeLatest(
    getMarketRequestBuyerFiltersActions.REQUEST,
    getMarketRequestBuyerFiltersRequest
  );
}

export default getMarketRequestBuyerFiltersWatcher;
