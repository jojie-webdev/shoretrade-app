import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getPlans } from 'services/subscription';
import { AsyncAction } from 'types/Action';
import {
  GetSubscriptionPlansMeta,
  GetSubscriptionPlansPayload,
} from 'types/store/GetSubscriptionPlansState';
import { Store } from 'types/store/Store';

import { getSubscriptionPlansActions } from '../actions';

function* getSubscriptionPlansRequest(
  action: AsyncAction<GetSubscriptionPlansMeta, GetSubscriptionPlansPayload>
) {
  try {
    const { data } = yield call(getPlans);
    yield put(getSubscriptionPlansActions.success(data));
  } catch (e) {
    yield put(getSubscriptionPlansActions.failed(e.message));
  }
}

function* getSubscriptionPlansWatcher() {
  yield takeLatest(
    getSubscriptionPlansActions.REQUEST,
    getSubscriptionPlansRequest
  );
}

export default getSubscriptionPlansWatcher;
