import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getBuyerSearchFilters } from 'services/listing';
import { AsyncAction } from 'types/Action';
import {
  GetBuyerSearchFiltersMeta,
  GetBuyerSearchFiltersPayload,
} from 'types/store/GetBuyerSearchFiltersState';
import { Store } from 'types/store/Store';

import { getBuyerSearchFiltersActions } from '../actions';

function* getBuyerSearchFiltersRequest(
  action: AsyncAction<GetBuyerSearchFiltersMeta, GetBuyerSearchFiltersPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getBuyerSearchFilters,
        action.meta,
        state.auth.token
      );
      yield put(getBuyerSearchFiltersActions.success(data));
    } catch (e) {
      yield put(getBuyerSearchFiltersActions.failed(e.message));
    }
  } else {
    yield put(getBuyerSearchFiltersActions.failed('Token not found'));
  }
}

function* getBuyerSearchFiltersWatcher() {
  yield takeLatest(
    getBuyerSearchFiltersActions.REQUEST,
    getBuyerSearchFiltersRequest
  );
}

export default getBuyerSearchFiltersWatcher;
