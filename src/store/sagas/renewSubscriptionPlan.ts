import { put, call, takeLatest, select } from 'redux-saga/effects';
import { renewPlan } from 'services/subscription';
import { AsyncAction } from 'types/Action';
import {
  RenewSubscriptionPlanMeta,
  RenewSubscriptionPlanPayload,
} from 'types/store/RenewSubscriptionPlanState';
import { Store } from 'types/store/Store';

import { renewSubscriptionPlanActions } from '../actions';

function* renewSubscriptionPlanRequest(
  action: AsyncAction<RenewSubscriptionPlanMeta, RenewSubscriptionPlanPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(renewPlan, action.meta, state.auth.token);
      yield put(renewSubscriptionPlanActions.success(data));
    } catch (e) {
      yield put(renewSubscriptionPlanActions.failed(e.message));
    }
  } else {
    yield put(renewSubscriptionPlanActions.failed('Token not found'));
  }
}

function* renewSubscriptionPlanWatcher() {
  yield takeLatest(
    renewSubscriptionPlanActions.REQUEST,
    renewSubscriptionPlanRequest
  );
}

export default renewSubscriptionPlanWatcher;
