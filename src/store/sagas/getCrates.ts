import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getCrates } from 'services/crates';
import { AsyncAction } from 'types/Action';
import { GetCratesMeta, GetCratesPayload } from 'types/store/GetCrates';
import { Store } from 'types/store/Store';

import { getCratesActions } from '../actions';

function* getCratesRequest(
  action: AsyncAction<GetCratesMeta, GetCratesPayload>
) {
  const state: Store = yield select();

  if (state.auth.token) {
    try {
      const { data } = yield call(getCrates, action.meta, state.auth.token);

      yield put(getCratesActions.success(data));
    } catch (e) {
      yield put(getCratesActions.failed(e.message));
    }
  } else {
    yield put(getCratesActions.failed('Token not found'));
  }
}

function* getCratesWatcher() {
  yield takeLatest(getCratesActions.REQUEST, getCratesRequest);
}

export default getCratesWatcher;
