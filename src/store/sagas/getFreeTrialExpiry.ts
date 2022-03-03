import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getFreeTrialExpiry } from 'services/subscription';
import { AsyncAction } from 'types/Action';
import {
  GetFreeTrialExpiryMeta,
  GetFreeTrialExpiryPayload,
} from 'types/store/GetFreeTrialExpiryState';
import { Store } from 'types/store/Store';

import { getFreeTrialExpiryActions } from '../actions';

function* getFreeTrialExpiryRequest(
  action: AsyncAction<GetFreeTrialExpiryMeta, GetFreeTrialExpiryPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getFreeTrialExpiry, state.auth.token);
      yield put(getFreeTrialExpiryActions.success(data));
    } catch (e) {
      yield put(getFreeTrialExpiryActions.failed(e.message));
    }
  } else {
    yield put(getFreeTrialExpiryActions.failed('Token not found'));
  }
}

function* getFreeTrialExpiryWatcher() {
  yield takeLatest(
    getFreeTrialExpiryActions.REQUEST,
    getFreeTrialExpiryRequest
  );
}

export default getFreeTrialExpiryWatcher;
