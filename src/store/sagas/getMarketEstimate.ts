import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getMarketEstimate } from 'services/listing';
import { AsyncAction } from 'types/Action';
import {
  GetMarketEstimateMeta,
  GetMarketEstimatePayload,
} from 'types/store/GetMarketEstimateState';
import { Store } from 'types/store/Store';

import { getMarketEstimateActions } from '../actions';

function* getMarketEstimateRequest(
  action: AsyncAction<GetMarketEstimateMeta, GetMarketEstimatePayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getMarketEstimate,
        action.meta,
        state.auth.token
      );
      yield put(getMarketEstimateActions.success(data));
    } catch (e) {
      yield put(getMarketEstimateActions.failed(e.message));
    }
  } else {
    yield put(getMarketEstimateActions.failed('Token not found'));
  }
}

function* getMarketEstimateWatcher() {
  yield takeLatest(getMarketEstimateActions.REQUEST, getMarketEstimateRequest);
}

export default getMarketEstimateWatcher;
