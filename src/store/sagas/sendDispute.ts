import { put, call, takeLatest, select } from 'redux-saga/effects';
import { sendDispute } from 'services/orders';
import { AsyncAction } from 'types/Action';
import {
  SendDisputeMeta,
  SendDisputePayload,
} from 'types/store/SendDisputeState';
import { Store } from 'types/store/Store';

import { sendDisputeActions } from '../actions';

function* sendDisputeRequest(
  action: AsyncAction<SendDisputeMeta, SendDisputePayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(sendDispute, action.meta, state.auth.token);
      yield put(sendDisputeActions.success(data));
    } catch (e) {
      yield put(sendDisputeActions.failed(e.message));
    }
  } else {
    yield put(sendDisputeActions.failed('Token not found'));
  }
}

function* sendDisputeWatcher() {
  yield takeLatest(sendDisputeActions.REQUEST, sendDisputeRequest);
}

export default sendDisputeWatcher;
