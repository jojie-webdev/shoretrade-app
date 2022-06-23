import moment from 'moment';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getCompanyPlan } from 'services/subscription';
import { AsyncAction } from 'types/Action';
import {
  GetCompanyPlanMeta,
  GetCompanyPlanPayload,
} from 'types/store/GetCompanyPlanState';
import { Store } from 'types/store/Store';
import { getCompanyPlanStatus } from 'utils/SubscriptionPlan/getCompanyPlanStatus';

import { getCompanyPlanActions, subscriptionActions } from '../actions';

function* getActivePlanRequest(
  action: AsyncAction<GetCompanyPlanMeta, GetCompanyPlanPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const companyId = state.getUser.data?.data.user.companies[0].id;

      if (action.meta.companyId || companyId) {
        const { data } = yield call(
          getCompanyPlan,
          { companyId: action.meta.companyId || companyId },
          state.auth.token
        );
        yield put(getCompanyPlanActions.success(data));
      }
    } catch (e) {
      yield put(getCompanyPlanActions.failed(e.message));
    }
  } else {
    yield put(getCompanyPlanActions.failed('Token not found'));
  }
}

function* getActivePlanSuccess(
  action: AsyncAction<GetCompanyPlanMeta, GetCompanyPlanPayload>
) {
  const state: Store = yield select();
  const isCompanyDeactivated =
    state.getUser.data?.data.user.companies[0].status === 'DEACTIVATED';

  if (action.payload.data) {
    const plan = action.payload.data;
    const planStatus = getCompanyPlanStatus(plan);
    const isPaid = !!action.payload.data.paid_at;
    const endsAt = moment(plan.ends_at).utc();
    const planEnded = moment().utc().isSameOrAfter(endsAt);

    yield put(
      subscriptionActions.update({
        status: planStatus,
        interval: 'MONTHLY',
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
        isAccountDeactivated: isCompanyDeactivated,
      })
    );
  }
}

function* getCompanyPlanWatcher() {
  yield takeLatest(getCompanyPlanActions.REQUEST, getActivePlanRequest);
  yield takeLatest(getCompanyPlanActions.SUCCESS, getActivePlanSuccess);
}

export default getCompanyPlanWatcher;
