import moment from 'moment';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getActivePlan } from 'services/subscription';
import { AsyncAction } from 'types/Action';
import {
  GetActivePlanMeta,
  GetActivePlanPayload,
} from 'types/store/GetActivePlanState';
import { Store } from 'types/store/Store';
import { getActivePlanStatus } from 'utils/SubscriptionPlan/getActivePlanStatus';

import { getActivePlanActions, subscriptionActions } from '../actions';

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

function* getActivePlanSuccess(
  action: AsyncAction<GetActivePlanMeta, GetActivePlanPayload>
) {
  if (action.payload.data) {
    const plan = action.payload.data;
    const planStatus = getActivePlanStatus(plan);
    const planEnded = moment().utc().isSameOrAfter(plan.ends_at);

    yield put(
      subscriptionActions.update({
        status: planStatus,
        interval: plan.subscription_preference.saasInterval,
        isFreeTrial: plan.is_free_trial,
        isAccountDeactivated:
          planStatus === 'OVERDUE' || (planStatus === 'CANCELLED' && planEnded),
      })
    );
  } else {
    yield put(
      subscriptionActions.update({
        status: 'EXPIRED',
        interval: null,
        isFreeTrial: false,
        isAccountDeactivated: false,
      })
    );
  }
}

function* getActivePlanWatcher() {
  yield takeLatest(getActivePlanActions.REQUEST, getActivePlanRequest);
  yield takeLatest(getActivePlanActions.SUCCESS, getActivePlanSuccess);
}

export default getActivePlanWatcher;
