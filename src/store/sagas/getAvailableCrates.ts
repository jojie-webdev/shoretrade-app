import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAvailableCrates } from 'services/crates';
import { AsyncAction } from 'types/Action';
import {
  GetAvailableCratesMeta,
  GetAvailableCratesPayload,
} from 'types/store/GetAvailableCrates';
import { Store } from 'types/store/Store';

import { getAvailableCratesActions } from '../actions';

function* getAvailableCratesRequest(
  action: AsyncAction<GetAvailableCratesMeta, GetAvailableCratesPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getAvailableCrates,
        action.meta,
        state.auth.token
      );

      yield put(getAvailableCratesActions.success(data));
    } catch (e) {
      yield put(getAvailableCratesActions.failed(e.message));
    }
  } else {
    yield put(getAvailableCratesActions.failed('Token not found'));
  }
}

function* getAvailableCratesWatcher() {
  yield takeLatest(
    getAvailableCratesActions.REQUEST,
    getAvailableCratesRequest
  );
}

export default getAvailableCratesWatcher;
