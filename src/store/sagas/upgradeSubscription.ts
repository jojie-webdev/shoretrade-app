import { put, call, takeLatest, select } from 'redux-saga/effects';
import { updatePlan } from 'services/subscription';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import {
  UpgradeSubscriptionMeta,
  UpgradeSubscriptionPayload,
} from 'types/store/UpgradeSubscriptionState';

import { upgradeSubscriptionActions } from '../actions';

function* upgradeSubscriptionRequest(
  action: AsyncAction<UpgradeSubscriptionMeta, UpgradeSubscriptionPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const params = {
        ...action.meta,
      };

      const { data } = yield call(updatePlan, params, state.auth.token);
      yield put(upgradeSubscriptionActions.success(data));
    } catch (e) {
      yield put(upgradeSubscriptionActions.failed(e.message));
    }
  } else {
    yield put(upgradeSubscriptionActions.failed('Token not found'));
  }
}

function* upgradeSubscriptionWatcher() {
  yield takeLatest(
    upgradeSubscriptionActions.REQUEST,
    upgradeSubscriptionRequest
  );
}

export default upgradeSubscriptionWatcher;
