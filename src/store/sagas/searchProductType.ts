import { put, call, takeLatest, select } from 'redux-saga/effects';
import { searchProductType } from 'services/type';
import { AsyncAction } from 'types/Action';
import {
  SearchProductTypeMeta,
  SearchProductTypePayload,
} from 'types/store/SearchProductTypeState';
import { Store } from 'types/store/Store';

import { searchProductTypeActions } from '../actions';

function* searchProductTypeRequest(
  action: AsyncAction<SearchProductTypeMeta, SearchProductTypePayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        searchProductType,
        action.meta,
        state.auth.token
      );
      yield put(searchProductTypeActions.success(data));
    } catch (e) {
      yield put(searchProductTypeActions.failed(e.message));
    }
  } else {
    yield put(searchProductTypeActions.failed('Token not found'));
  }
}

function* searchProductTypeWatcher() {
  yield takeLatest(searchProductTypeActions.REQUEST, searchProductTypeRequest);
}

export default searchProductTypeWatcher;
