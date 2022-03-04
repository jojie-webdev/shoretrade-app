import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getActivePlan } from 'services/subscription';
import { AsyncAction } from 'types/Action';
import {
  GetActivePlanMeta,
  GetActivePlanPayload,
} from 'types/store/GetActivePlanState';
import { Store } from 'types/store/Store';

import { getActivePlanActions } from '../actions';

function* getActivePlanRequest(
  action: AsyncAction<GetActivePlanMeta, GetActivePlanPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getActivePlan, action.meta, state.auth.token);
      yield put(getActivePlanActions.success(data));
    } catch (e) {
      yield put(getActivePlanActions.failed(e.message));
    }
  } else {
    yield put(getActivePlanActions.failed('Token not found'));
  }
}

function* getActivePlanWatcher() {
  yield takeLatest(getActivePlanActions.REQUEST, getActivePlanRequest);
}

export default getActivePlanWatcher;
