import { put, call, takeLatest, select } from 'redux-saga/effects';
import { cancelPlan } from 'services/subscription';
import { AsyncAction } from 'types/Action';
import {
  CancelSubscriptionPlanMeta,
  CancelSubscriptionPlanPayload,
} from 'types/store/CancelSubscriptionPlanState';
import { Store } from 'types/store/Store';

import {
  cancelSubscriptionPlanActions,
  getCompanyPlanActions,
} from '../actions';

function* cancelSubscriptionPlanRequest(
  action: AsyncAction<CancelSubscriptionPlanMeta, CancelSubscriptionPlanPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(cancelPlan, action.meta, state.auth.token);
      yield put(cancelSubscriptionPlanActions.success(data));
    } catch (e) {
      yield put(cancelSubscriptionPlanActions.failed(e.message));
    }
  } else {
    yield put(cancelSubscriptionPlanActions.failed('Token not found'));
  }
}

function* cancelSubscriptionPlanSuccess(
  action: AsyncAction<CancelSubscriptionPlanMeta, CancelSubscriptionPlanMeta>
) {
  yield put(
    getCompanyPlanActions.request({
      companyId: action.meta.companyId,
    })
  );
}

function* cancelSubscriptionPlanWatcher() {
  yield takeLatest(
    cancelSubscriptionPlanActions.REQUEST,
    cancelSubscriptionPlanRequest
  );

  yield takeLatest(
    cancelSubscriptionPlanActions.SUCCESS,
    cancelSubscriptionPlanSuccess
  );
}

export default cancelSubscriptionPlanWatcher;
