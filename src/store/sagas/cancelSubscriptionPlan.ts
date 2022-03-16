import { put, call, takeLatest, select } from 'redux-saga/effects';
import { updatePlan } from 'services/subscription';
import { AsyncAction } from 'types/Action';
import {
  CancelSubscriptionPlanMeta,
  CancelSubscriptionPlanPayload,
} from 'types/store/CancelSubscriptionPlanState';
import { Store } from 'types/store/Store';

import { cancelSubscriptionPlanActions } from '../actions';

function* cancelSubscriptionPlanRequest(
  action: AsyncAction<CancelSubscriptionPlanMeta, CancelSubscriptionPlanPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    const params = {
      ...action.meta,
      isSaasSubscribed: false,
    };

    try {
      const { data } = yield call(updatePlan, params, state.auth.token);
      yield put(cancelSubscriptionPlanActions.success(data));
    } catch (e) {
      yield put(cancelSubscriptionPlanActions.failed(e.message));
    }
  } else {
    yield put(cancelSubscriptionPlanActions.failed('Token not found'));
  }
}

function* cancelSubscriptionPlanWatcher() {
  yield takeLatest(
    cancelSubscriptionPlanActions.REQUEST,
    cancelSubscriptionPlanRequest
  );
}

export default cancelSubscriptionPlanWatcher;
