import { put, call, takeLatest, select } from 'redux-saga/effects';
import { searchAndCountProductType } from 'services/type';
import { AsyncAction } from 'types/Action';
import {
  SearchAndCountProductTypeMeta,
  SearchAndCountProductTypePayload,
} from 'types/store/SearchAndCountProductTypeState';
import { Store } from 'types/store/Store';

import { searchAndCountProductTypeActions } from '../actions';

function* searchAndCountProductTypeRequest(
  action: AsyncAction<
    SearchAndCountProductTypeMeta,
    SearchAndCountProductTypePayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        searchAndCountProductType,
        action.meta,
        state.auth.token
      );
      yield put(searchAndCountProductTypeActions.success(data));
    } catch (e) {
      yield put(searchAndCountProductTypeActions.failed(e.message));
    }
  } else {
    yield put(searchAndCountProductTypeActions.failed('Token not found'));
  }
}

function* searchAndCountProductTypeWatcher() {
  yield takeLatest(
    searchAndCountProductTypeActions.REQUEST,
    searchAndCountProductTypeRequest
  );
}

export default searchAndCountProductTypeWatcher;
