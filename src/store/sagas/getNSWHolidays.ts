import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getNSWHolidays } from 'services/holidays';
import { AsyncAction } from 'types/Action';
import { GetNSWHolidaysPayload } from 'types/store/GetNSWHolidaysState';
import { Store } from 'types/store/Store';

import { getNSWHolidaysActions } from '../actions';

function* getNSWHolidaysRequest(
  action: AsyncAction<{}, GetNSWHolidaysPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { result } = yield call(getNSWHolidays);

      yield put(getNSWHolidaysActions.success(result));
    } catch (e) {
      yield put(getNSWHolidaysActions.failed(e.message));
    }
  } else {
    yield put(getNSWHolidaysActions.failed('Token not found'));
  }
}

function* getNSWHolidaysWatcher() {
  yield takeLatest(getNSWHolidaysActions.REQUEST, getNSWHolidaysRequest);
}

export default getNSWHolidaysWatcher;
