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
      const company = state.getUser.data?.data.user.companies[0];
      const { data } = yield call(
        getActivePlan,
        { companyId: company?.id || action.meta.companyId },
        state.auth.token
      );
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
    const state: Store = yield select();
    const isCompanyDeactivated =
      state.getUser.data?.data.user.companies[0].status === 'DEACTIVATED';
    const plan = action.payload.data;
    const planStatus = getActivePlanStatus(plan);
    const isPaid = !!action.payload.data.paid_at;
    const planEnded = moment().utc().isSameOrAfter(plan.ends_at);

    yield put(
      subscriptionActions.update({
        status: planStatus,
        interval: plan.subscription_preference.saasInterval,
        isFreeTrial: plan.is_free_trial,
        isAccountDeactivated:
          isCompanyDeactivated ||
          planStatus === 'OVERDUE' ||
          (planStatus === 'CANCELLED' && planEnded) ||
          (planStatus === 'CANCELLED' && !isPaid),
      })
    );
  } else {
    yield put(
      subscriptionActions.update({
        status: 'UNSUBSCRIBED',
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
