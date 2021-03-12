import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAllMarketRequestFilters } from 'services/marketRequest';
import { AsyncAction } from 'types/Action';
import {
  GetAllMarketRequestFiltersMeta,
  GetAllMarketRequestFiltersPayload,
} from 'types/store/GetAllMarketRequestFiltersState';
import { Store } from 'types/store/Store';

import { getAllMarketRequestFiltersActions } from '../actions';

function* getAllMarketRequestFiltersRequest(
  action: AsyncAction<
    GetAllMarketRequestFiltersMeta,
    GetAllMarketRequestFiltersPayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getAllMarketRequestFilters,
        action.meta,
        state.auth.token
      );
      yield put(getAllMarketRequestFiltersActions.success(data));
    } catch (e) {
      yield put(getAllMarketRequestFiltersActions.failed(e.message));
    }
  } else {
    yield put(getAllMarketRequestFiltersActions.failed('Token not found'));
  }
}

function* getAllMarketRequestFiltersWatcher() {
  yield takeLatest(
    getAllMarketRequestFiltersActions.REQUEST,
    getAllMarketRequestFiltersRequest
  );
}

export default getAllMarketRequestFiltersWatcher;
