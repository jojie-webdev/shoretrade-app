import { put, call, takeLatest, select } from 'redux-saga/effects';
import { updatePlan } from 'services/subscription';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import {
  UpdateSubscriptionPlanMeta,
  UpdateSubscriptionPlanPayload,
} from 'types/store/UpdateSubscriptionPlanState';

import {
  getCompanyPlanActions,
  updateSubscriptionPlanActions,
} from '../actions';

function* updateSubscriptionPlanRequest(
  action: AsyncAction<UpdateSubscriptionPlanMeta, UpdateSubscriptionPlanPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(updatePlan, action.meta, state.auth.token);
      yield put(updateSubscriptionPlanActions.success(data));
    } catch (e) {
      yield put(updateSubscriptionPlanActions.failed(e.message));
    }
  } else {
    yield put(updateSubscriptionPlanActions.failed('Token not found'));
  }
}

function* updateSubscriptionPlanSuccess(
  action: AsyncAction<UpdateSubscriptionPlanMeta, UpdateSubscriptionPlanPayload>
) {
  yield put(
    getCompanyPlanActions.request({
      companyId: action.meta.companyId,
    })
  );
}

function* updateSubscriptionPlanWatcher() {
  yield takeLatest(
    updateSubscriptionPlanActions.REQUEST,
    updateSubscriptionPlanRequest
  );
  yield takeLatest(
    updateSubscriptionPlanActions.SUCCESS,
    updateSubscriptionPlanSuccess
  );
}

export default updateSubscriptionPlanWatcher;
